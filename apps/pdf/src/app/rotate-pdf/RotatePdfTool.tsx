"use client";

import { useState, useCallback } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { Dropzone, DownloadButton, ProgressBar } from "@peregrine/ui";
import { downloadFile, readFileAsArrayBuffer, formatFileSize } from "@/lib/download";

type RotationAngle = 90 | 180 | 270;
type PageMode = "all" | "specific";

interface UploadedFile {
  name: string;
  size: number;
  buffer: ArrayBuffer;
}

const ROTATION_OPTIONS: { value: RotationAngle; label: string }[] = [
  { value: 90, label: "90\u00B0 clockwise" },
  { value: 180, label: "180\u00B0" },
  { value: 270, label: "270\u00B0 clockwise (90\u00B0 counter-clockwise)" },
];

export function RotatePdfTool() {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [angle, setAngle] = useState<RotationAngle>(90);
  const [pageMode, setPageMode] = useState<PageMode>("all");
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
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
      setPageMode("all");
      setSelectedPages(new Set());
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

  const togglePage = useCallback((page: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(page)) {
        next.delete(page);
      } else {
        next.add(page);
      }
      return next;
    });
  }, []);

  const handleRotate = useCallback(async () => {
    if (!file) return;

    const pagesToRotate =
      pageMode === "all"
        ? Array.from({ length: totalPages }, (_, i) => i)
        : Array.from(selectedPages).map((p) => p - 1);

    if (pagesToRotate.length === 0) return;

    setIsProcessing(true);
    setProgress(10);
    setError(null);
    setResult(null);

    try {
      const pdf = await PDFDocument.load(file.buffer);
      setProgress(40);

      for (const pageIndex of pagesToRotate) {
        const page = pdf.getPage(pageIndex);
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + angle));
      }
      setProgress(70);

      const output = await pdf.save();
      setResult(output);
      setProgress(100);
    } catch {
      setError("Something went wrong while rotating your PDF. Please check your file and try again.");
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  }, [file, totalPages, angle, pageMode, selectedPages]);

  const handleDownload = useCallback(() => {
    if (result && file) {
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadFile(result, `${baseName}_rotated.pdf`);
    }
  }, [result, file]);

  const resetTool = useCallback(() => {
    setFile(null);
    setTotalPages(0);
    setAngle(90);
    setPageMode("all");
    setSelectedPages(new Set());
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

      {/* File loaded — rotation options */}
      {file && (
        <div className="space-y-5">
          {/* File info header */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">{file.name}</p>
              <p className="text-xs text-slate-500">
                {formatFileSize(file.size)} &middot; {totalPages}{" "}
                {totalPages === 1 ? "page" : "pages"}
              </p>
            </div>
            <button
              type="button"
              onClick={resetTool}
              className="ml-4 shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              Change file
            </button>
          </div>

          {/* Rotation angle selector */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Rotation angle
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              {ROTATION_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none ${
                    angle === opt.value
                      ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] font-medium"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="rotation-angle"
                    value={opt.value}
                    checked={angle === opt.value}
                    onChange={() => {
                      setAngle(opt.value);
                      setResult(null);
                    }}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Page selection mode */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Pages to rotate
            </label>
            <div className="flex gap-4">
              <label
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none ${
                  pageMode === "all"
                    ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] font-medium"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="page-mode"
                  value="all"
                  checked={pageMode === "all"}
                  onChange={() => {
                    setPageMode("all");
                    setResult(null);
                  }}
                  className="sr-only"
                />
                All pages
              </label>
              <label
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none ${
                  pageMode === "specific"
                    ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] font-medium"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="page-mode"
                  value="specific"
                  checked={pageMode === "specific"}
                  onChange={() => {
                    setPageMode("specific");
                    setResult(null);
                  }}
                  className="sr-only"
                />
                Select specific pages
              </label>
            </div>
          </div>

          {/* Page checkboxes — shown only when "specific" mode is selected */}
          {pageMode === "specific" && (
            <div className="space-y-2">
              <span className="text-xs text-slate-500">
                {selectedPages.size} of {totalPages} selected
              </span>
              <div className="max-h-72 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3">
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <label
                      key={page}
                      className={`flex cursor-pointer items-center justify-center rounded-md border px-2 py-2 text-sm transition-colors select-none ${
                        selectedPages.has(page)
                          ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] font-medium"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPages.has(page)}
                        onChange={() => togglePage(page)}
                        className="sr-only"
                      />
                      {page}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action button */}
          {!result ? (
            <button
              type="button"
              onClick={handleRotate}
              disabled={
                isProcessing ||
                (pageMode === "specific" && selectedPages.size === 0)
              }
              className="w-full rounded-lg bg-[color:var(--color-accent)] py-3 font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[color:var(--color-accent)]"
            >
              {isProcessing ? "Rotating..." : "Rotate PDF"}
            </button>
          ) : (
            <DownloadButton
              onClick={handleDownload}
              label="Download Rotated PDF"
              className="w-full"
            />
          )}
        </div>
      )}
    </div>
  );
}
