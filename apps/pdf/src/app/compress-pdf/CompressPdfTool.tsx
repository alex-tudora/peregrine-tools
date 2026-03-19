"use client";

import { useState, useCallback } from "react";
import { Dropzone, DownloadButton, ProgressBar } from "@peregrine/ui";
import { compressPdf, type CompressionQuality } from "@/lib/compress";
import { downloadFile, formatFileSize, readFileAsArrayBuffer } from "@/lib/download";

interface PdfFile {
  buffer: ArrayBuffer;
  name: string;
  size: number;
}

const QUALITY_OPTIONS: {
  value: CompressionQuality;
  label: string;
  description: string;
}[] = [
  {
    value: "low",
    label: "Low compression",
    description: "Higher quality, less reduction",
  },
  {
    value: "medium",
    label: "Medium compression",
    description: "Balanced",
  },
  {
    value: "high",
    label: "High compression",
    description: "Lower quality, maximum reduction",
  },
];

export default function CompressPdfTool() {
  const [file, setFile] = useState<PdfFile | null>(null);
  const [quality, setQuality] = useState<CompressionQuality>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);
    setResult(null);
    setResultSize(0);
    setProgress(0);

    try {
      const buffer = await readFileAsArrayBuffer(selected);
      setFile({ buffer, name: selected.name, size: selected.size });
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  const handleCompress = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setResult(null);
    setResultSize(0);
    setError(null);

    try {
      // Simulate progress since compressPdf is synchronous-ish
      setProgress(20);

      // Use a microtask break so the UI can repaint with the progress bar
      await new Promise((resolve) => setTimeout(resolve, 50));
      setProgress(50);

      const compressed = await compressPdf(file.buffer, quality);

      setProgress(90);
      await new Promise((resolve) => setTimeout(resolve, 50));

      setResult(compressed);
      setResultSize(compressed.byteLength);
      setProgress(100);
    } catch {
      setError("Compression failed. The file may be corrupted or unsupported.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, quality]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;

    const baseName = file.name.replace(/\.pdf$/i, "");
    downloadFile(result, `${baseName}-compressed.pdf`);
  }, [result, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setQuality("medium");
    setIsProcessing(false);
    setProgress(0);
    setResult(null);
    setResultSize(0);
    setError(null);
  }, []);

  const reductionPercent =
    file && resultSize > 0
      ? Math.round(((file.size - resultSize) / file.size) * 100)
      : 0;

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
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          {/* Uploaded file summary */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {formatFileSize(file.size)}
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

          {/* Quality selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-slate-700">
              Compression level
            </legend>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {QUALITY_OPTIONS.map((option) => {
                const isSelected = quality === option.value;
                return (
                  <label
                    key={option.value}
                    className={`
                      flex cursor-pointer flex-col rounded-lg border-2 px-4 py-3 transition-all
                      ${
                        isSelected
                          ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] ring-1 ring-sky-500/20"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="quality"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => setQuality(option.value)}
                      className="sr-only"
                    />
                    <span
                      className={`text-sm font-semibold ${
                        isSelected ? "text-[color:var(--color-accent)]" : "text-slate-800"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="mt-0.5 text-xs text-slate-500">
                      {option.description}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Progress bar */}
          {isProcessing && (
            <div className="mt-5">
              <ProgressBar progress={progress} />
              <p className="mt-1.5 text-center text-xs text-slate-500">
                Compressing...
              </p>
            </div>
          )}

          {/* Compress button */}
          {!result && (
            <button
              onClick={handleCompress}
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
                  Compressing...
                </>
              ) : (
                "Compress PDF"
              )}
            </button>
          )}

          {/* Results */}
          {result && (
            <div className="mt-5 space-y-4">
              {/* Size comparison */}
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Original size</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Compressed size</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(resultSize)}
                  </span>
                </div>
                <div className="mt-3 border-t border-slate-200 pt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    Reduction
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      reductionPercent > 0
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {reductionPercent > 0
                      ? `Reduced by ${reductionPercent}%`
                      : reductionPercent === 0
                        ? "No size change"
                        : `Increased by ${Math.abs(reductionPercent)}%`}
                  </span>
                </div>
              </div>

              {/* Download + reset actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Compressed PDF"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Compress another
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
