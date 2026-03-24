"use client";

import { useState, useCallback } from "react";
import { Dropzone, DownloadButton, ProgressBar } from "@peregrine/ui";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { downloadFile, readFileAsArrayBuffer, formatFileSize } from "@/lib/download";

type NumberPosition =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "top-right";

type NumberFormat = "simple" | "page-n" | "n-of-total" | "dash";

interface PdfFile {
  buffer: ArrayBuffer;
  name: string;
  size: number;
  pageCount: number;
}

const POSITION_OPTIONS: { value: NumberPosition; label: string }[] = [
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "top-center", label: "Top Center" },
  { value: "top-left", label: "Top Left" },
  { value: "top-right", label: "Top Right" },
];

const FORMAT_OPTIONS: { value: NumberFormat; label: string; example: string }[] = [
  { value: "simple", label: "1, 2, 3...", example: "3" },
  { value: "page-n", label: "Page 1, Page 2...", example: "Page 3" },
  { value: "n-of-total", label: "1 of N, 2 of N...", example: "3 of 10" },
  { value: "dash", label: "- 1 -, - 2 -...", example: "- 3 -" },
];

export function AddPageNumbersTool() {
  const [file, setFile] = useState<PdfFile | null>(null);
  const [position, setPosition] = useState<NumberPosition>("bottom-center");
  const [format, setFormat] = useState<NumberFormat>("simple");
  const [startNumber, setStartNumber] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [skipFirst, setSkipFirst] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    } catch {
      setError("Failed to read the selected PDF. The file may be corrupted or password-protected.");
    }
  }, []);

  const handleReset = useCallback(() => {
    setFile(null);
    setPosition("bottom-center");
    setFormat("simple");
    setStartNumber(1);
    setFontSize(12);
    setSkipFirst(false);
    setIsProcessing(false);
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  const handleAddNumbers = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      setProgress(10);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const pdf = await PDFDocument.load(file.buffer);
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      const totalPages = pages.length;
      const margin = 30;

      setProgress(30);

      for (let i = 0; i < totalPages; i++) {
        // Skip first page if the option is enabled
        if (skipFirst && i === 0) continue;

        const page = pages[i];
        const { width: pageWidth, height: pageHeight } = page.getSize();

        // Calculate the display number
        const displayNumber = skipFirst
          ? startNumber + i - 1
          : startNumber + i;

        // Format the page number text
        const text = formatPageNumber(format, displayNumber, totalPages, startNumber);

        const textWidth = font.widthOfTextAtSize(text, fontSize);

        // Calculate position
        const { x, y } = calculateNumberPosition(
          position,
          pageWidth,
          pageHeight,
          textWidth,
          fontSize,
          margin
        );

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.2, 0.2, 0.2),
        });

        // Update progress proportionally
        setProgress(30 + Math.round(((i + 1) / totalPages) * 55));
      }

      setProgress(90);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const numberedBytes = await pdf.save();
      setResult(numberedBytes);
      setProgress(100);
    } catch {
      setError("Something went wrong while adding page numbers. Please check your file and try again.");
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  }, [file, position, format, startNumber, fontSize, skipFirst]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;

    const baseName = file.name.replace(/\.pdf$/i, "");
    downloadFile(result, `${baseName}-numbered.pdf`);
  }, [result, file]);

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

      {/* File info + controls */}
      {file && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
          {/* Uploaded file summary */}
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

          {/* Position selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Position
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {POSITION_OPTIONS.map((option) => {
                const isSelected = position === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all ${
                      isSelected
                        ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] ring-1 ring-sky-500/20"
                        : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-border-hover)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="position"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => setPosition(option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Format selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Format
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {FORMAT_OPTIONS.map((option) => {
                const isSelected = format === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer flex-col items-center rounded-lg border-2 px-3 py-2.5 transition-all ${
                      isSelected
                        ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] ring-1 ring-sky-500/20"
                        : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] hover:border-[color:var(--color-border-hover)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => setFormat(option.value)}
                      className="sr-only"
                    />
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-text-secondary)]"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                      e.g. {option.example}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Additional options */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Starting number */}
            <div>
              <label
                htmlFor="start-number"
                className="mb-2 block text-sm font-medium text-[color:var(--color-text-secondary)]"
              >
                Starting number
              </label>
              <input
                id="start-number"
                type="number"
                min={1}
                value={startNumber}
                onChange={(e) =>
                  setStartNumber(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
                className="w-full rounded-lg border border-[color:var(--color-border-hover)] bg-[color:var(--color-bg-card)] px-4 py-2.5 text-sm text-[color:var(--color-text-primary)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
              />
            </div>

            {/* Font size */}
            <div>
              <label
                htmlFor="font-size"
                className="mb-2 block text-sm font-medium text-[color:var(--color-text-secondary)]"
              >
                Font size: {fontSize}pt
              </label>
              <input
                id="font-size"
                type="range"
                min={8}
                max={24}
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="mt-1.5 w-full accent-[color:var(--color-accent)]"
              />
              <div className="mt-1 flex justify-between text-xs text-[color:var(--color-text-muted)]">
                <span>8pt</span>
                <span>24pt</span>
              </div>
            </div>
          </div>

          {/* Skip first page */}
          <div className="mt-4">
            <label className="inline-flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={skipFirst}
                onChange={(e) => setSkipFirst(e.target.checked)}
                className="h-4 w-4 rounded border-[color:var(--color-border-hover)] text-[color:var(--color-accent)] focus:ring-[color:var(--color-accent)]"
              />
              <span className="text-sm text-[color:var(--color-text-secondary)]">
                Skip first page (useful for title pages)
              </span>
            </label>
          </div>

          {/* Progress bar */}
          {isProcessing && (
            <div className="mt-5">
              <ProgressBar progress={progress} />
              <p className="mt-1.5 text-center text-xs text-[color:var(--color-text-muted)]">
                Adding page numbers...
              </p>
            </div>
          )}

          {/* Action button */}
          {!result && (
            <button
              onClick={handleAddNumbers}
              disabled={isProcessing}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md hover:shadow-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-[color:var(--color-accent)]"
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
                  Adding page numbers...
                </>
              ) : (
                "Add Page Numbers"
              )}
            </button>
          )}

          {/* Results */}
          {result && (
            <div className="mt-5 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Numbered PDF"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Number another
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

/**
 * Format a page number according to the selected format.
 */
function formatPageNumber(
  format: NumberFormat,
  number: number,
  totalPages: number,
  startNumber: number
): string {
  const totalDisplay = totalPages + startNumber - 1;
  switch (format) {
    case "simple":
      return `${number}`;
    case "page-n":
      return `Page ${number}`;
    case "n-of-total":
      return `${number} of ${totalDisplay}`;
    case "dash":
      return `- ${number} -`;
  }
}

/**
 * Calculate x/y coordinates for page number placement.
 * Coordinates are in PDF coordinate space (origin at bottom-left).
 */
function calculateNumberPosition(
  position: NumberPosition,
  pageWidth: number,
  pageHeight: number,
  textWidth: number,
  textHeight: number,
  margin: number
): { x: number; y: number } {
  switch (position) {
    case "bottom-center":
      return {
        x: (pageWidth - textWidth) / 2,
        y: margin,
      };
    case "bottom-left":
      return {
        x: margin,
        y: margin,
      };
    case "bottom-right":
      return {
        x: pageWidth - textWidth - margin,
        y: margin,
      };
    case "top-center":
      return {
        x: (pageWidth - textWidth) / 2,
        y: pageHeight - textHeight - margin,
      };
    case "top-left":
      return {
        x: margin,
        y: pageHeight - textHeight - margin,
      };
    case "top-right":
      return {
        x: pageWidth - textWidth - margin,
        y: pageHeight - textHeight - margin,
      };
  }
}
