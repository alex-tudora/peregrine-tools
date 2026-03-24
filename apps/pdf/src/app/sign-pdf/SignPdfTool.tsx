"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Dropzone, DownloadButton, ProgressBar } from "@peregrine/ui";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import {
  downloadFile,
  readFileAsArrayBuffer,
  formatFileSize,
} from "@/lib/download";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

type SignatureMode = "draw" | "type";

interface PdfFile {
  buffer: ArrayBuffer;
  name: string;
  size: number;
  pageCount: number;
}

interface SignaturePlacement {
  pageIndex: number;
  // Position as fraction of page dimensions (0–1), anchored at top-left of signature
  xRatio: number;
  yRatio: number;
}

const FONT_STYLES: { value: string; label: string; className: string }[] = [
  { value: "cursive-1", label: "Elegant", className: "italic" },
  { value: "cursive-2", label: "Formal", className: "italic font-bold" },
  { value: "cursive-3", label: "Casual", className: "italic font-light" },
  {
    value: "cursive-4",
    label: "Classic",
    className: "italic font-semibold tracking-wide",
  },
];

export function SignPdfTool() {
  const [file, setFile] = useState<PdfFile | null>(null);
  const [mode, setMode] = useState<SignatureMode>("draw");
  const [typedName, setTypedName] = useState("");
  const [fontStyle, setFontStyle] = useState("cursive-1");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  // PDF preview state
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [pageDimensions, setPageDimensions] = useState<
    { width: number; height: number }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Signature canvas
  const sigCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const hasDrawnRef = useRef(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);

  // Placement state — the signature overlay on the PDF
  const [placement, setPlacement] = useState<SignaturePlacement | null>(null);
  const isDraggingRef = useRef(false);
  const isResizingRef = useRef(false);
  const didDragRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ width: 0, height: 0, clientX: 0, clientY: 0 });
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const sigWidthRef = useRef(0.25);
  const sigHeightRef = useRef(0.08);

  // Signature size as fraction of page dimensions (resizable) — state drives re-renders
  const [sigWidthRatio, setSigWidthRatio] = useState(0.25);
  const [sigHeightRatio, setSigHeightRatio] = useState(0.08);

  // ─── PDF rendering ────────────────────────────────────────────────
  const renderPages = useCallback(async (buffer: ArrayBuffer) => {
    // Copy so pdfjs worker doesn't detach the original ArrayBuffer
    const data = new Uint8Array(buffer.slice(0));
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    const images: string[] = [];
    const dims: { width: number; height: number }[] = [];
    const scale = 1.5;

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx, viewport }).promise;
      images.push(canvas.toDataURL("image/png"));
      dims.push({ width: viewport.width, height: viewport.height });
    }

    setPageImages(images);
    setPageDimensions(dims);
  }, []);

  // ─── Signature canvas setup ───────────────────────────────────────
  useEffect(() => {
    const canvas = sigCanvasRef.current;
    if (!canvas || mode !== "draw") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Transparent canvas — the visual white bg comes from CSS bg-[color:var(--color-bg-card)]
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    hasDrawnRef.current = false;
    setSignatureDataUrl(null);
  }, [mode, file]);

  const getCanvasCoords = (
    canvas: HTMLCanvasElement,
    clientX: number,
    clientY: number
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleSigPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = sigCanvasRef.current;
      if (!canvas) return;
      canvas.setPointerCapture(e.pointerId);
      isDrawingRef.current = true;
      hasDrawnRef.current = true;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { x, y } = getCanvasCoords(canvas, e.clientX, e.clientY);
      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    []
  );

  const handleSigPointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) return;
      const canvas = sigCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { x, y } = getCanvasCoords(canvas, e.clientX, e.clientY);
      ctx.lineTo(x, y);
      ctx.stroke();
    },
    []
  );

  const handleSigPointerUp = useCallback(() => {
    isDrawingRef.current = false;
    // Capture the drawn signature as a data URL
    const canvas = sigCanvasRef.current;
    if (canvas && hasDrawnRef.current) {
      setSignatureDataUrl(canvas.toDataURL("image/png"));
    }
  }, []);

  const handleClearCanvas = useCallback(() => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawnRef.current = false;
    setSignatureDataUrl(null);
    setPlacement(null);
  }, []);

  // ─── Typed signature data URL ─────────────────────────────────────
  const typedSignatureDataUrl = useMemo(() => {
    const text = typedName.trim();
    if (!text) return null;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const fontSize = 48;
    ctx.font = `italic ${fontSize}px Georgia, "Times New Roman", serif`;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize * 1.4;

    canvas.width = textWidth + 20;
    canvas.height = textHeight + 10;

    // Re-set font after resize
    ctx.font = `italic ${fontSize}px Georgia, "Times New Roman", serif`;
    ctx.fillStyle = "#1e293b";
    ctx.textBaseline = "top";
    ctx.fillText(text, 10, 8);

    return canvas.toDataURL("image/png");
  }, [typedName]);

  const activeSignatureUrl =
    mode === "draw" ? signatureDataUrl : typedSignatureDataUrl;

  // ─── File handling ────────────────────────────────────────────────
  const handleFiles = useCallback(
    async (files: File[]) => {
      const selected = files[0];
      if (!selected) return;

      setError(null);
      setResult(null);
      setProgress(0);
      setPlacement(null);

      try {
        const buffer = await readFileAsArrayBuffer(selected);
        const pdf = await PDFDocument.load(buffer);
        const pageCount = pdf.getPageCount();
        setFile({ buffer, name: selected.name, size: selected.size, pageCount });
        setCurrentPage(0);
        await renderPages(buffer);
      } catch {
        setError(
          "Failed to read the selected PDF. The file may be corrupted or password-protected."
        );
      }
    },
    [renderPages]
  );

  const handleReset = useCallback(() => {
    setFile(null);
    setMode("draw");
    setTypedName("");
    setFontStyle("cursive-1");
    setIsProcessing(false);
    setProgress(0);
    setResult(null);
    setError(null);
    setPageImages([]);
    setPageDimensions([]);
    setCurrentPage(0);
    setPlacement(null);
    setSignatureDataUrl(null);
    setSigWidthRatio(0.25);
    setSigHeightRatio(0.08);
    hasDrawnRef.current = false;
  }, []);

  // Keep refs in sync with state for use in event handlers
  useEffect(() => {
    sigWidthRef.current = sigWidthRatio;
  }, [sigWidthRatio]);
  useEffect(() => {
    sigHeightRef.current = sigHeightRatio;
  }, [sigHeightRatio]);

  // ─── Click to place signature on PDF preview ──────────────────────
  const handlePageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Skip click if it came from a drag/resize that just ended
      if (didDragRef.current) {
        didDragRef.current = false;
        return;
      }
      if (!activeSignatureUrl) return;
      const container = pageContainerRef.current;
      if (!container) return;

      const w = sigWidthRef.current;
      const h = sigHeightRef.current;
      const rect = container.getBoundingClientRect();
      const xRatio = (e.clientX - rect.left) / rect.width - w / 2;
      const yRatio = (e.clientY - rect.top) / rect.height - h / 2;

      setPlacement({
        pageIndex: currentPage,
        xRatio: Math.max(0, Math.min(1 - w, xRatio)),
        yRatio: Math.max(0, Math.min(1 - h, yRatio)),
      });
    },
    [activeSignatureUrl, currentPage]
  );

  // ─── Drag overlay ─────────────────────────────────────────────────
  const handleOverlayPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);

      const container = pageContainerRef.current;
      if (!container) return;

      const overlayRect = e.currentTarget.getBoundingClientRect();
      dragOffsetRef.current = {
        x: e.clientX - overlayRect.left,
        y: e.clientY - overlayRect.top,
      };
      isDraggingRef.current = true;
    },
    []
  );

  const handleOverlayPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const container = pageContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const w = sigWidthRef.current;
      const h = sigHeightRef.current;
      const xRatio =
        (e.clientX - rect.left - dragOffsetRef.current.x) / rect.width;
      const yRatio =
        (e.clientY - rect.top - dragOffsetRef.current.y) / rect.height;

      setPlacement((prev) =>
        prev
          ? {
              ...prev,
              xRatio: Math.max(0, Math.min(1 - w, xRatio)),
              yRatio: Math.max(0, Math.min(1 - h, yRatio)),
            }
          : null
      );
    },
    []
  );

  const handleOverlayPointerUp = useCallback(() => {
    if (isDraggingRef.current || isResizingRef.current) {
      didDragRef.current = true;
    }
    isDraggingRef.current = false;
    isResizingRef.current = false;
  }, []);

  // ─── Resize handle ────────────────────────────────────────────────
  const handleResizePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);

      const container = pageContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      resizeStartRef.current = {
        width: sigWidthRef.current * containerRect.width,
        height: sigHeightRef.current * containerRect.height,
        clientX: e.clientX,
        clientY: e.clientY,
      };
      isResizingRef.current = true;
    },
    []
  );

  const handleResizePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isResizingRef.current) return;
      const container = pageContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const start = resizeStartRef.current;
      const dx = e.clientX - start.clientX;
      const dy = e.clientY - start.clientY;

      const newWidthPx = Math.max(40, start.width + dx);
      const newHeightPx = Math.max(20, start.height + dy);

      const newW = Math.min(1, newWidthPx / containerRect.width);
      const newH = Math.min(1, newHeightPx / containerRect.height);

      sigWidthRef.current = newW;
      sigHeightRef.current = newH;
      setSigWidthRatio(newW);
      setSigHeightRatio(newH);

      setPlacement((prev) =>
        prev
          ? {
              ...prev,
              xRatio: Math.min(prev.xRatio, 1 - newW),
              yRatio: Math.min(prev.yRatio, 1 - newH),
            }
          : null
      );
    },
    []
  );

  // ─── Sign PDF ─────────────────────────────────────────────────────
  const handleSign = useCallback(async () => {
    if (!file || !placement || !activeSignatureUrl) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      setProgress(20);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const pdf = await PDFDocument.load(file.buffer.slice(0));
      const pages = pdf.getPages();
      const page = pages[placement.pageIndex];
      const { width: pageWidth, height: pageHeight } = page.getSize();

      setProgress(40);

      if (mode === "draw") {
        const canvas = sigCanvasRef.current;
        if (!canvas) throw new Error("Canvas not available");

        const pngDataUrl = canvas.toDataURL("image/png");
        const pngBase64 = pngDataUrl.split(",")[1];
        const pngBytes = Uint8Array.from(atob(pngBase64), (c) =>
          c.charCodeAt(0)
        );

        const sigImage = await pdf.embedPng(pngBytes);

        const sigWidth = pageWidth * sigWidthRatio;
        const sigHeight = pageHeight * sigHeightRatio;

        // Convert from top-left screen coordinates to PDF bottom-left origin
        const x = placement.xRatio * pageWidth;
        const y =
          pageHeight - placement.yRatio * pageHeight - sigHeight;

        setProgress(60);

        page.drawImage(sigImage, {
          x,
          y,
          width: sigWidth,
          height: sigHeight,
        });
      } else {
        const font = await pdf.embedFont(StandardFonts.TimesRomanItalic);
        const text = typedName.trim();

        // Calculate font size to fit the signature box
        const sigWidth = pageWidth * sigWidthRatio;
        const fontSize = Math.min(24, (sigWidth / font.widthOfTextAtSize(text, 24)) * 24);
        const textHeight = fontSize;

        const x = placement.xRatio * pageWidth;
        const y =
          pageHeight - placement.yRatio * pageHeight - textHeight;

        setProgress(60);

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.12, 0.15, 0.18),
        });
      }

      setProgress(80);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const signedBytes = await pdf.save();
      setResult(signedBytes);
      setProgress(100);
    } catch (err) {
      console.error("Sign PDF error:", err);
      setError(
        "Something went wrong while signing the PDF. Please check your file and try again."
      );
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  }, [file, mode, typedName, placement, activeSignatureUrl, sigWidthRatio, sigHeightRatio]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.pdf$/i, "");
    downloadFile(result, `${baseName}-signed.pdf`);
  }, [result, file]);

  const currentFontStyle = FONT_STYLES.find((f) => f.value === fontStyle);

  return (
    <div className="space-y-6">
      {/* Dropzone — only visible when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".pdf"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your PDF file here"
        />
      )}

      {/* Main UI after file upload */}
      {file && (
        <div className="space-y-5">
          {/* File info */}
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">
                  {file.name}
                </p>
                <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                  {formatFileSize(file.size)} &middot; {file.pageCount} page
                  {file.pageCount !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={handleReset}
                disabled={isProcessing}
                className="shrink-0 rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Change file
              </button>
            </div>
          </div>

          {/* Step 1: Create signature */}
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)]">
              1. Create your signature
            </h3>

            {/* Mode tabs */}
            <div className="mt-3">
              <div className="flex rounded-lg border border-[color:var(--color-border)] p-1">
                <button
                  onClick={() => setMode("draw")}
                  className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    mode === "draw"
                      ? "bg-[color:var(--color-accent)] text-white shadow-sm"
                      : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
                  }`}
                >
                  Draw Signature
                </button>
                <button
                  onClick={() => setMode("type")}
                  className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    mode === "type"
                      ? "bg-[color:var(--color-accent)] text-white shadow-sm"
                      : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
                  }`}
                >
                  Type Signature
                </button>
              </div>
            </div>

            {/* Draw mode */}
            {mode === "draw" && (
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-[color:var(--color-text-secondary)]">
                  Draw your signature below
                </label>
                <canvas
                  ref={sigCanvasRef}
                  width={600}
                  height={200}
                  onPointerDown={handleSigPointerDown}
                  onPointerMove={handleSigPointerMove}
                  onPointerUp={handleSigPointerUp}
                  onPointerLeave={handleSigPointerUp}
                  className="w-full max-w-[600px] cursor-crosshair touch-none rounded-lg border-2 border-dashed border-[color:var(--color-border-hover)] bg-[color:var(--color-bg-card)]"
                  style={{ aspectRatio: "3 / 1" }}
                />
                <button
                  onClick={handleClearCanvas}
                  className="mt-2 rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Type mode */}
            {mode === "type" && (
              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="signature-text"
                    className="mb-2 block text-sm font-medium text-[color:var(--color-text-secondary)]"
                  >
                    Type your name
                  </label>
                  <input
                    id="signature-text"
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-[color:var(--color-border-hover)] px-4 py-2.5 text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
                  />
                </div>

                {/* Font style selector */}
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-[color:var(--color-text-secondary)]">
                    Font style
                  </legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {FONT_STYLES.map((style) => {
                      const isSelected = fontStyle === style.value;
                      return (
                        <label
                          key={style.value}
                          className={`flex cursor-pointer flex-col items-center rounded-lg border-2 px-3 py-2.5 transition-all ${
                            isSelected
                              ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] ring-1 ring-sky-500/20"
                              : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] hover:border-[color:var(--color-border-hover)]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="font-style"
                            value={style.value}
                            checked={isSelected}
                            onChange={() => setFontStyle(style.value)}
                            className="sr-only"
                          />
                          <span className="text-xs text-[color:var(--color-text-muted)]">
                            {style.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Typed signature preview */}
                {typedName.trim() && (
                  <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4">
                    <p className="mb-1 text-xs text-[color:var(--color-text-muted)]">Preview</p>
                    <p
                      className={`text-2xl text-[color:var(--color-text-primary)] ${currentFontStyle?.className ?? "italic"}`}
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {typedName}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Place signature on document */}
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)]">
              2. Click on the document to place your signature
            </h3>

            {!activeSignatureUrl && (
              <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                {mode === "draw"
                  ? "Draw your signature above first, then click on the page to place it."
                  : "Type your name above first, then click on the page to place it."}
              </p>
            )}

            {activeSignatureUrl && !placement && (
              <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                Click anywhere on the page below to place your signature. You
                can drag it to reposition.
              </p>
            )}

            {placement && (
              <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                Drag the signature to reposition it. Click elsewhere to move it.
              </p>
            )}

            {/* Page navigation */}
            {file.pageCount > 1 && (
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.max(0, p - 1));
                    if (placement?.pageIndex !== currentPage - 1)
                      setPlacement(null);
                  }}
                  disabled={currentPage === 0}
                  className="rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-xs text-[color:var(--color-text-muted)]">
                  Page {currentPage + 1} of {file.pageCount}
                </span>
                <button
                  onClick={() => {
                    setCurrentPage((p) =>
                      Math.min(file.pageCount - 1, p + 1)
                    );
                    if (placement?.pageIndex !== currentPage + 1)
                      setPlacement(null);
                  }}
                  disabled={currentPage === file.pageCount - 1}
                  className="rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {/* PDF page preview with signature overlay */}
            {pageImages[currentPage] && (
              <div
                ref={pageContainerRef}
                onClick={activeSignatureUrl ? handlePageClick : undefined}
                className={`relative mt-3 overflow-hidden rounded-lg border border-[color:var(--color-border)] shadow-sm ${
                  activeSignatureUrl
                    ? "cursor-crosshair"
                    : "cursor-default"
                }`}
              >
                {/* Rendered PDF page */}
                <img
                  src={pageImages[currentPage]}
                  alt={`Page ${currentPage + 1}`}
                  className="block w-full select-none"
                  draggable={false}
                />

                {/* Signature overlay */}
                {placement && placement.pageIndex === currentPage && activeSignatureUrl && (
                  <div
                    onPointerDown={handleOverlayPointerDown}
                    onPointerMove={handleOverlayPointerMove}
                    onPointerUp={handleOverlayPointerUp}
                    onPointerLeave={handleOverlayPointerUp}
                    className="absolute touch-none border-2 border-dashed border-blue-400 cursor-grab active:cursor-grabbing"
                    style={{
                      left: `${placement.xRatio * 100}%`,
                      top: `${placement.yRatio * 100}%`,
                      width: `${sigWidthRatio * 100}%`,
                      height: `${sigHeightRatio * 100}%`,
                    }}
                  >
                    <img
                      src={activeSignatureUrl}
                      alt="Signature"
                      className="h-full w-full object-contain pointer-events-none"
                      draggable={false}
                    />
                    {/* Resize handle — bottom-right corner */}
                    <div
                      onPointerDown={handleResizePointerDown}
                      onPointerMove={handleResizePointerMove}
                      onPointerUp={handleOverlayPointerUp}
                      onPointerLeave={handleOverlayPointerUp}
                      className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 cursor-nwse-resize rounded-sm border-2 border-blue-500 bg-[color:var(--color-bg-card)] touch-none"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress bar */}
          {isProcessing && (
            <div>
              <ProgressBar progress={progress} />
              <p className="mt-1.5 text-center text-xs text-[color:var(--color-text-muted)]">
                Signing...
              </p>
            </div>
          )}

          {/* Sign button */}
          {!result && (
            <button
              onClick={handleSign}
              disabled={isProcessing || !placement || !activeSignatureUrl}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md hover:shadow-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-[color:var(--color-accent)]"
            >
              {isProcessing ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing...
                </>
              ) : (
                "Sign PDF"
              )}
            </button>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Signed PDF"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Sign another
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="rounded-lg bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}
