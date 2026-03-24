"use client";

import { useState, useCallback } from "react";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import { Dropzone, DownloadButton, ProgressBar } from "@peregrine/ui";
import { downloadFile, readFileAsArrayBuffer, formatFileSize } from "@/lib/download";

type WatermarkPosition = "diagonal" | "center";

interface UploadedFile {
  name: string;
  size: number;
  buffer: ArrayBuffer;
}

interface ColorOption {
  name: string;
  value: [number, number, number];
}

const COLOR_OPTIONS: ColorOption[] = [
  { name: "Gray", value: [0.5, 0.5, 0.5] },
  { name: "Red", value: [0.8, 0.1, 0.1] },
  { name: "Blue", value: [0.1, 0.1, 0.8] },
  { name: "Black", value: [0, 0, 0] },
];

export function WatermarkPdfTool() {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(50);
  const [opacity, setOpacity] = useState(0.3);
  const [color, setColor] = useState<[number, number, number]>([0.5, 0.5, 0.5]);
  const [position, setPosition] = useState<WatermarkPosition>("diagonal");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const incoming = files[0];
    if (!incoming) return;

    setError(null);
    setResult(null);
    setIsProcessing(true);
    setProgress(10);

    try {
      const buffer = await readFileAsArrayBuffer(incoming);
      setProgress(40);

      const pdf = await PDFDocument.load(buffer);
      const count = pdf.getPageCount();
      setProgress(80);

      setFile({ name: incoming.name, size: incoming.size, buffer });
      setTotalPages(count);
      setProgress(100);
    } catch {
      setError("Could not read the PDF. The file may be corrupted or password-protected.");
      setFile(null);
      setTotalPages(0);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 500);
    }
  }, []);

  const handleWatermark = useCallback(async () => {
    if (!file || !text.trim()) return;

    setIsProcessing(true);
    setProgress(10);
    setError(null);
    setResult(null);

    try {
      const pdf = await PDFDocument.load(file.buffer);
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      setProgress(30);

      const pages = pdf.getPages();
      const watermarkText = text.trim();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();

        const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
        const textHeight = fontSize;

        if (position === "diagonal") {
          // Position the text at the center of the page with a 45-degree rotation
          const x = (width - textWidth * Math.cos(Math.PI / 4) + textHeight * Math.sin(Math.PI / 4)) / 2;
          const y = (height - textWidth * Math.sin(Math.PI / 4) - textHeight * Math.cos(Math.PI / 4)) / 2;

          page.drawText(watermarkText, {
            x,
            y,
            size: fontSize,
            font,
            color: rgb(color[0], color[1], color[2]),
            opacity,
            rotate: degrees(45),
          });
        } else {
          // Center position — horizontal text in the middle of the page
          const x = (width - textWidth) / 2;
          const y = (height - textHeight) / 2;

          page.drawText(watermarkText, {
            x,
            y,
            size: fontSize,
            font,
            color: rgb(color[0], color[1], color[2]),
            opacity,
          });
        }

        // Update progress proportionally as we process pages
        setProgress(30 + Math.round((i / pages.length) * 50));
      }

      setProgress(85);
      const output = await pdf.save();
      setResult(output);
      setProgress(100);
    } catch {
      setError("Something went wrong while adding the watermark. Please check your file and try again.");
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  }, [file, text, fontSize, opacity, color, position]);

  const handleDownload = useCallback(() => {
    if (result && file) {
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadFile(result, `${baseName}_watermarked.pdf`);
    }
  }, [result, file]);

  const resetTool = useCallback(() => {
    setFile(null);
    setTotalPages(0);
    setText("CONFIDENTIAL");
    setFontSize(50);
    setOpacity(0.3);
    setColor([0.5, 0.5, 0.5]);
    setPosition("diagonal");
    setIsProcessing(false);
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="space-y-5">
      {/* Error banner */}
      {error && (
        <div className="rounded-lg bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]" role="alert">
          {error}
        </div>
      )}

      {/* Dropzone — shown when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".pdf"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your PDF here"
        />
      )}

      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* File loaded — watermark options */}
      {file && (
        <div className="space-y-5">
          {/* File info header */}
          <div className="flex items-center justify-between rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">{file.name}</p>
              <p className="text-xs text-[color:var(--color-text-muted)]">
                {formatFileSize(file.size)} &middot; {totalPages}{" "}
                {totalPages === 1 ? "page" : "pages"}
              </p>
            </div>
            <button
              type="button"
              onClick={resetTool}
              className="ml-4 shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-muted)] transition-colors hover:bg-slate-100 hover:text-[color:var(--color-text-secondary)]"
            >
              Change file
            </button>
          </div>

          {/* Watermark text */}
          <div>
            <label
              htmlFor="watermark-text"
              className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
            >
              Watermark text
            </label>
            <input
              id="watermark-text"
              type="text"
              placeholder="e.g. CONFIDENTIAL, DRAFT, DO NOT COPY"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setResult(null);
              }}
              className="w-full rounded-lg border border-[color:var(--color-border-hover)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
            />
          </div>

          {/* Font size slider */}
          <div>
            <label
              htmlFor="font-size"
              className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
            >
              Font size: {fontSize}px
            </label>
            <input
              id="font-size"
              type="range"
              min={20}
              max={100}
              step={1}
              value={fontSize}
              onChange={(e) => {
                setFontSize(Number(e.target.value));
                setResult(null);
              }}
              className="w-full accent-[color:var(--color-accent)]"
            />
            <div className="mt-1 flex justify-between text-xs text-[color:var(--color-text-muted)]">
              <span>20px</span>
              <span>100px</span>
            </div>
          </div>

          {/* Opacity slider */}
          <div>
            <label
              htmlFor="opacity"
              className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
            >
              Opacity: {Math.round(opacity * 100)}%
            </label>
            <input
              id="opacity"
              type="range"
              min={0.1}
              max={1.0}
              step={0.1}
              value={opacity}
              onChange={(e) => {
                setOpacity(Number(e.target.value));
                setResult(null);
              }}
              className="w-full accent-[color:var(--color-accent)]"
            />
            <div className="mt-1 flex justify-between text-xs text-[color:var(--color-text-muted)]">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Color selector */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
              Color
            </label>
            <div className="flex flex-wrap gap-3">
              {COLOR_OPTIONS.map((opt) => (
                <label
                  key={opt.name}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none ${
                    color[0] === opt.value[0] &&
                    color[1] === opt.value[1] &&
                    color[2] === opt.value[2]
                      ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] font-medium"
                      : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-border-hover)] hover:bg-[color:var(--color-bg-elevated)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="watermark-color"
                    checked={
                      color[0] === opt.value[0] &&
                      color[1] === opt.value[1] &&
                      color[2] === opt.value[2]
                    }
                    onChange={() => {
                      setColor(opt.value);
                      setResult(null);
                    }}
                    className="sr-only"
                  />
                  <span
                    className="inline-block h-3.5 w-3.5 rounded-full border border-[color:var(--color-border-hover)]"
                    style={{
                      backgroundColor: `rgb(${Math.round(opt.value[0] * 255)}, ${Math.round(opt.value[1] * 255)}, ${Math.round(opt.value[2] * 255)})`,
                    }}
                  />
                  {opt.name}
                </label>
              ))}
            </div>
          </div>

          {/* Position selector */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
              Position
            </label>
            <div className="flex gap-4">
              <label
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none ${
                  position === "diagonal"
                    ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] font-medium"
                    : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-border-hover)] hover:bg-[color:var(--color-bg-elevated)]"
                }`}
              >
                <input
                  type="radio"
                  name="watermark-position"
                  value="diagonal"
                  checked={position === "diagonal"}
                  onChange={() => {
                    setPosition("diagonal");
                    setResult(null);
                  }}
                  className="sr-only"
                />
                Diagonal (45\u00B0)
              </label>
              <label
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none ${
                  position === "center"
                    ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] font-medium"
                    : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-border-hover)] hover:bg-[color:var(--color-bg-elevated)]"
                }`}
              >
                <input
                  type="radio"
                  name="watermark-position"
                  value="center"
                  checked={position === "center"}
                  onChange={() => {
                    setPosition("center");
                    setResult(null);
                  }}
                  className="sr-only"
                />
                Center (horizontal)
              </label>
            </div>
          </div>

          {/* Action button */}
          {!result ? (
            <button
              type="button"
              onClick={handleWatermark}
              disabled={isProcessing || !text.trim()}
              className="w-full rounded-lg bg-[color:var(--color-accent)] py-3 font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[color:var(--color-accent)]"
            >
              {isProcessing ? "Adding Watermark..." : "Add Watermark"}
            </button>
          ) : (
            <DownloadButton
              onClick={handleDownload}
              label="Download Watermarked PDF"
              className="w-full"
            />
          )}
        </div>
      )}
    </div>
  );
}
