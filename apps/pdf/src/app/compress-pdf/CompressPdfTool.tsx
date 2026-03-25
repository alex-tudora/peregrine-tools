"use client";

import { useState, useCallback, useMemo } from "react";
import { Dropzone, DownloadButton, ProgressBar, logActivity } from "@peregrine/ui";
import { compressPdf, type CompressionQuality } from "@/lib/compress";
import { downloadFile, downloadAsZip, formatFileSize, readFileAsArrayBuffer } from "@/lib/download";

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

interface FileEntry {
  file: { buffer: ArrayBuffer; name: string; size: number };
  resultBytes: Uint8Array | null;
  resultSize: number;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export default function CompressPdfTool() {
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [quality, setQuality] = useState<CompressionQuality>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    setError(null);

    const newEntries: FileEntry[] = [];
    for (const file of files) {
      try {
        const buffer = await readFileAsArrayBuffer(file);
        newEntries.push({
          file: { buffer, name: file.name, size: file.size },
          resultBytes: null,
          resultSize: 0,
          status: "pending",
        });
      } catch {
        // skip unreadable files
      }
    }

    if (newEntries.length === 0) {
      setError("Failed to read the selected files. Please try again.");
      return;
    }

    setEntries((prev) => [...prev, ...newEntries]);
  }, []);

  const handleCompress = useCallback(async () => {
    setIsProcessing(true);
    setError(null);
    setProgress(0);

    const total = entries.length;

    for (let i = 0; i < total; i++) {
      if (entries[i].status === "done") continue;

      setEntries((prev) =>
        prev.map((e, j) => (j === i ? { ...e, status: "processing" } : e))
      );

      // Update progress: show which file we're on
      setProgress(Math.round(((i) / total) * 100));

      // Give UI a chance to repaint
      await new Promise((resolve) => setTimeout(resolve, 50));

      try {
        const compressed = await compressPdf(entries[i].file.buffer, quality);

        setEntries((prev) =>
          prev.map((e, j) =>
            j === i
              ? { ...e, resultBytes: compressed, resultSize: compressed.byteLength, status: "done" }
              : e
          )
        );
      } catch {
        setEntries((prev) =>
          prev.map((e, j) =>
            j === i
              ? { ...e, status: "error", error: "Compression failed" }
              : e
          )
        );
      }

      setProgress(Math.round(((i + 1) / total) * 100));
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setProgress(100);
    setIsProcessing(false);
  }, [entries, quality]);

  const doneEntries = useMemo(() => entries.filter((e) => e.status === "done"), [entries]);
  const allDone = entries.length > 0 && doneEntries.length === entries.length;
  const processingIndex = useMemo(
    () => entries.findIndex((e) => e.status === "processing"),
    [entries]
  );

  const totalReduction = useMemo(() => {
    if (doneEntries.length === 0) return 0;
    const originalTotal = doneEntries.reduce((sum, e) => sum + e.file.size, 0);
    const compressedTotal = doneEntries.reduce((sum, e) => sum + e.resultSize, 0);
    return Math.round(((originalTotal - compressedTotal) / originalTotal) * 100);
  }, [doneEntries]);

  const handleDownload = useCallback((entry: FileEntry) => {
    if (!entry.resultBytes) return;
    const baseName = entry.file.name.replace(/\.pdf$/i, "");
    downloadFile(entry.resultBytes, `${baseName}-compressed.pdf`);
    logActivity({ tool: "Compress PDF", toolHref: "/compress-pdf", description: "Compressed a PDF" });
  }, []);

  const handleDownloadAll = useCallback(async () => {
    const files = doneEntries.map((entry) => ({
      data: entry.resultBytes!,
      name: `${entry.file.name.replace(/\.pdf$/i, "")}-compressed.pdf`,
    }));
    await downloadAsZip(files, "compressed-pdfs.zip");
    logActivity({ tool: "Compress PDF", toolHref: "/compress-pdf", description: "Compressed PDFs" });
  }, [doneEntries]);

  const handleReset = useCallback(() => {
    setEntries([]);
    setQuality("medium");
    setIsProcessing(false);
    setProgress(0);
    setError(null);
  }, []);

  const handleRemove = useCallback((index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone — always visible to add more files */}
      {!isProcessing && !allDone && (
        <Dropzone
          accept={[".pdf"]}
          multiple={true}
          onFiles={handleFiles}
          label={entries.length === 0 ? "Drop your PDF files here" : "Drop more PDFs to add"}
        />
      )}

      {/* Files + controls */}
      {entries.length > 0 && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
          {/* File list */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[color:var(--color-text-primary)]">
                {entries.length} file{entries.length !== 1 ? "s" : ""}
              </p>
              {!isProcessing && (
                <button
                  onClick={handleReset}
                  className="shrink-0 rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1.5">
              {entries.map((entry, i) => (
                <div
                  key={`${entry.file.name}-${i}`}
                  className="flex items-center gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-3 py-2"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[color:var(--color-bg-card)]">
                    <svg className="h-4 w-4 text-[color:var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-[color:var(--color-text-primary)]">{entry.file.name}</p>
                    <p className="text-[10px] text-[color:var(--color-text-muted)]">
                      {formatFileSize(entry.file.size)}
                      {entry.status === "done" && entry.resultSize > 0 && (
                        <span className="text-emerald-600">
                          {" → "}{formatFileSize(entry.resultSize)}
                          {" ("}-{Math.round(((entry.file.size - entry.resultSize) / entry.file.size) * 100)}%{")"}
                        </span>
                      )}
                      {entry.status === "processing" && (
                        <span className="text-[color:var(--color-accent)]"> Compressing...</span>
                      )}
                      {entry.status === "error" && (
                        <span className="text-red-500"> Failed</span>
                      )}
                    </p>
                  </div>
                  {!isProcessing && entry.status !== "processing" && (
                    <button
                      onClick={() => entry.status === "done" ? handleDownload(entry) : handleRemove(i)}
                      className="shrink-0 text-xs font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]"
                    >
                      {entry.status === "done" ? "↓" : "✕"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quality selector */}
          {!allDone && (
            <fieldset className="mt-5">
              <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
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
                            : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] hover:border-[color:var(--color-border-hover)]"
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
                          isSelected ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-text-primary)]"
                        }`}
                      >
                        {option.label}
                      </span>
                      <span className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                        {option.description}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Progress bar */}
          {isProcessing && (
            <div className="mt-5">
              <ProgressBar progress={progress} />
              <p className="mt-1.5 text-center text-xs text-[color:var(--color-text-muted)]">
                Compressing {processingIndex >= 0 ? processingIndex + 1 : doneEntries.length + 1} of {entries.length}...
              </p>
            </div>
          )}

          {/* Compress button */}
          {!allDone && (
            <button
              onClick={handleCompress}
              disabled={isProcessing || entries.length === 0}
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
                  Compressing {doneEntries.length + 1} of {entries.length}...
                </>
              ) : (
                `Compress ${entries.length} PDF${entries.length !== 1 ? "s" : ""}`
              )}
            </button>
          )}

          {/* Results */}
          {allDone && (
            <div className="mt-5 space-y-4">
              {/* Size comparison for single file */}
              {entries.length === 1 && (
                <div className="rounded-lg bg-[color:var(--color-bg-elevated)] p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[color:var(--color-text-secondary)]">Original size</span>
                    <span className="font-medium text-[color:var(--color-text-primary)]">
                      {formatFileSize(entries[0].file.size)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-[color:var(--color-text-secondary)]">Compressed size</span>
                    <span className="font-medium text-[color:var(--color-text-primary)]">
                      {formatFileSize(entries[0].resultSize)}
                    </span>
                  </div>
                  <div className="mt-3 border-t border-[color:var(--color-border)] pt-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-[color:var(--color-text-secondary)]">
                      Reduction
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        totalReduction > 0
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      {totalReduction > 0
                        ? `Reduced by ${totalReduction}%`
                        : totalReduction === 0
                          ? "No size change"
                          : `Increased by ${Math.abs(totalReduction)}%`}
                    </span>
                  </div>
                </div>
              )}

              {/* Total summary for multiple files */}
              {entries.length > 1 && (
                <div className="rounded-lg bg-[color:var(--color-bg-elevated)] p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[color:var(--color-text-secondary)]">
                      {entries.length} files compressed
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        totalReduction > 0 ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      {totalReduction > 0
                        ? `Reduced by ${totalReduction}%`
                        : totalReduction === 0
                          ? "No size change"
                          : `Increased by ${Math.abs(totalReduction)}%`}
                    </span>
                  </div>
                </div>
              )}

              {/* Download actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                {entries.length > 1 ? (
                  <DownloadButton
                    onClick={handleDownloadAll}
                    label="Download All as ZIP"
                    className="flex-1"
                  />
                ) : (
                  <DownloadButton
                    onClick={() => handleDownload(entries[0])}
                    label="Download Compressed PDF"
                    className="flex-1"
                  />
                )}
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Compress more
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
