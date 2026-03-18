"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Dropzone, DownloadButton, ProgressBar } from "@peregrine/ui";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { downloadFile, readFileAsArrayBuffer, formatFileSize } from "@/lib/download";

type SignatureMode = "draw" | "type";
type SignaturePosition =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top-right"
  | "top-left";

interface PdfFile {
  buffer: ArrayBuffer;
  name: string;
  size: number;
  pageCount: number;
}

const POSITION_OPTIONS: { value: SignaturePosition; label: string }[] = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
];

const FONT_STYLES: { value: string; label: string; className: string }[] = [
  { value: "cursive-1", label: "Elegant", className: "italic" },
  { value: "cursive-2", label: "Formal", className: "italic font-bold" },
  { value: "cursive-3", label: "Casual", className: "italic font-light" },
  { value: "cursive-4", label: "Classic", className: "italic font-semibold tracking-wide" },
];

export function SignPdfTool() {
  const [file, setFile] = useState<PdfFile | null>(null);
  const [mode, setMode] = useState<SignatureMode>("draw");
  const [typedName, setTypedName] = useState("");
  const [fontStyle, setFontStyle] = useState("cursive-1");
  const [targetPage, setTargetPage] = useState(1);
  const [position, setPosition] = useState<SignaturePosition>("bottom-right");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const hasDrawnRef = useRef(false);

  // Set up canvas for drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || mode !== "draw") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    hasDrawnRef.current = false;
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

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
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

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { x, y } = getCanvasCoords(canvas, e.clientX, e.clientY);
      ctx.lineTo(x, y);
      ctx.stroke();
    },
    []
  );

  const handlePointerUp = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  const handleClearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hasDrawnRef.current = false;
  }, []);

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const buffer = await readFileAsArrayBuffer(selected);
      const pdf = await PDFDocument.load(buffer);
      const pageCount = pdf.getPageCount();

      setFile({ buffer, name: selected.name, size: selected.size, pageCount });
      setTargetPage(pageCount); // Default to last page
    } catch {
      setError("Failed to read the selected PDF. The file may be corrupted or password-protected.");
    }
  }, []);

  const handleReset = useCallback(() => {
    setFile(null);
    setMode("draw");
    setTypedName("");
    setFontStyle("cursive-1");
    setTargetPage(1);
    setPosition("bottom-right");
    setIsProcessing(false);
    setProgress(0);
    setResult(null);
    setError(null);
    hasDrawnRef.current = false;
  }, []);

  const handleSign = useCallback(async () => {
    if (!file) return;

    if (mode === "draw" && !hasDrawnRef.current) {
      setError("Please draw your signature on the canvas first.");
      return;
    }

    if (mode === "type" && !typedName.trim()) {
      setError("Please type your name for the signature.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      setProgress(20);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const pdf = await PDFDocument.load(file.buffer);
      const pages = pdf.getPages();
      const pageIndex = Math.max(0, Math.min(targetPage - 1, pages.length - 1));
      const page = pages[pageIndex];
      const { width: pageWidth, height: pageHeight } = page.getSize();

      setProgress(40);

      const margin = 40;

      if (mode === "draw") {
        // Get canvas data as PNG
        const canvas = canvasRef.current;
        if (!canvas) throw new Error("Canvas not available");

        const pngDataUrl = canvas.toDataURL("image/png");
        const pngBase64 = pngDataUrl.split(",")[1];
        const pngBytes = Uint8Array.from(atob(pngBase64), (c) => c.charCodeAt(0));

        const sigImage = await pdf.embedPng(pngBytes);

        // Scale the signature to a reasonable size (max 200px wide, proportional)
        const maxWidth = 200;
        const maxHeight = 100;
        const scale = Math.min(maxWidth / sigImage.width, maxHeight / sigImage.height, 1);
        const sigWidth = sigImage.width * scale;
        const sigHeight = sigImage.height * scale;

        setProgress(60);

        const { x, y } = calculatePosition(
          position,
          pageWidth,
          pageHeight,
          sigWidth,
          sigHeight,
          margin
        );

        page.drawImage(sigImage, {
          x,
          y,
          width: sigWidth,
          height: sigHeight,
        });
      } else {
        // Typed signature
        const font = await pdf.embedFont(StandardFonts.TimesRomanItalic);
        const fontSize = 24;
        const text = typedName.trim();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const textHeight = fontSize;

        setProgress(60);

        const { x, y } = calculatePosition(
          position,
          pageWidth,
          pageHeight,
          textWidth,
          textHeight,
          margin
        );

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
    } catch {
      setError("Something went wrong while signing the PDF. Please check your file and try again.");
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  }, [file, mode, typedName, targetPage, position]);

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

      {/* File info + signature controls */}
      {file && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          {/* Uploaded file summary */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {formatFileSize(file.size)} &middot; {file.pageCount} page
                {file.pageCount !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={handleReset}
              disabled={isProcessing}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Change file
            </button>
          </div>

          {/* Signature mode tabs */}
          <div className="mt-5">
            <div className="flex rounded-lg border border-slate-200 p-1">
              <button
                onClick={() => setMode("draw")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "draw"
                    ? "bg-sky-500 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Draw Signature
              </button>
              <button
                onClick={() => setMode("type")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  mode === "type"
                    ? "bg-sky-500 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Type Signature
              </button>
            </div>
          </div>

          {/* Draw mode */}
          {mode === "draw" && (
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Draw your signature below
              </label>
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="w-full max-w-[600px] cursor-crosshair touch-none rounded-lg border-2 border-dashed border-slate-300 bg-white"
                style={{ aspectRatio: "2 / 1" }}
              />
              <button
                onClick={handleClearCanvas}
                className="mt-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
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
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Type your name
                </label>
                <input
                  id="signature-text"
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              {/* Font style selector */}
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-slate-700">
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
                            ? "border-sky-500 bg-sky-50/60 ring-1 ring-sky-500/20"
                            : "border-slate-200 bg-white hover:border-slate-300"
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
                        <span className={`text-xs text-slate-500`}>
                          {style.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Typed signature preview */}
              {typedName.trim() && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-1 text-xs text-slate-500">Preview</p>
                  <p
                    className={`text-2xl text-slate-800 ${currentFontStyle?.className ?? "italic"}`}
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {typedName}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Page selector */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="target-page"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Place on page
              </label>
              <select
                id="target-page"
                value={targetPage}
                onChange={(e) => setTargetPage(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                {Array.from({ length: file.pageCount }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Page {i + 1}
                    {i + 1 === file.pageCount ? " (last)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="position"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Position
              </label>
              <select
                id="position"
                value={position}
                onChange={(e) =>
                  setPosition(e.target.value as SignaturePosition)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                {POSITION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Progress bar */}
          {isProcessing && (
            <div className="mt-5">
              <ProgressBar progress={progress} />
              <p className="mt-1.5 text-center text-xs text-slate-500">
                Signing...
              </p>
            </div>
          )}

          {/* Sign button */}
          {!result && (
            <button
              onClick={handleSign}
              disabled={isProcessing}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all duration-200 hover:bg-sky-600 hover:shadow-md hover:shadow-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-sky-500"
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
            <div className="mt-5 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Signed PDF"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
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
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}

/**
 * Calculate x/y coordinates for a given position on the page.
 * Coordinates are in PDF coordinate space (origin at bottom-left).
 */
function calculatePosition(
  position: SignaturePosition,
  pageWidth: number,
  pageHeight: number,
  elementWidth: number,
  elementHeight: number,
  margin: number
): { x: number; y: number } {
  switch (position) {
    case "bottom-right":
      return {
        x: pageWidth - elementWidth - margin,
        y: margin,
      };
    case "bottom-left":
      return {
        x: margin,
        y: margin,
      };
    case "bottom-center":
      return {
        x: (pageWidth - elementWidth) / 2,
        y: margin,
      };
    case "top-right":
      return {
        x: pageWidth - elementWidth - margin,
        y: pageHeight - elementHeight - margin,
      };
    case "top-left":
      return {
        x: margin,
        y: pageHeight - elementHeight - margin,
      };
  }
}
