"use client";

import { useState, useCallback, useMemo } from "react";
import { Dropzone, DownloadButton, BeforeAfterComparison, logActivity } from "@peregrine/ui";
import { compressImage, type CompressOptions } from "@/lib/compress";
import { downloadBlob, downloadAsZip, formatFileSize, readFileAsDataUrl } from "@/lib/download";

type OutputFormat = "jpeg" | "png" | "webp";

const FORMAT_OPTIONS: { value: OutputFormat; label: string }[] = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
];

const FORMAT_EXTENSIONS: Record<OutputFormat, string> = {
  jpeg: "jpg",
  png: "png",
  webp: "webp",
};

interface FileEntry {
  file: File;
  preview: string;
  resultBlob: Blob | null;
  resultPreview: string | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export default function CompressImageTool() {
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState<OutputFormat>("jpeg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    setError(null);

    const newEntries: FileEntry[] = [];
    for (const file of files) {
      try {
        const preview = await readFileAsDataUrl(file);
        newEntries.push({ file, preview, resultBlob: null, resultPreview: null, status: "pending" });
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

    const options: CompressOptions = { quality, format };

    for (let i = 0; i < entries.length; i++) {
      if (entries[i].status === "done") continue;

      setEntries((prev) =>
        prev.map((e, j) => (j === i ? { ...e, status: "processing" } : e))
      );

      try {
        const result = await compressImage(entries[i].file, options);
        const resultPreview = URL.createObjectURL(result.blob);
        setEntries((prev) =>
          prev.map((e, j) =>
            j === i ? { ...e, resultBlob: result.blob, resultPreview, status: "done" } : e
          )
        );
      } catch {
        setEntries((prev) =>
          prev.map((e, j) =>
            j === i ? { ...e, status: "error", error: "Compression failed" } : e
          )
        );
      }
    }

    setIsProcessing(false);
  }, [entries, quality, format]);

  const doneEntries = useMemo(() => entries.filter((e) => e.status === "done"), [entries]);
  const allDone = entries.length > 0 && doneEntries.length === entries.length;
  const hasResults = doneEntries.length > 0;

  const totalReduction = useMemo(() => {
    if (doneEntries.length === 0) return 0;
    const originalTotal = doneEntries.reduce((sum, e) => sum + e.file.size, 0);
    const compressedTotal = doneEntries.reduce((sum, e) => sum + (e.resultBlob?.size ?? 0), 0);
    return Math.round(((originalTotal - compressedTotal) / originalTotal) * 100);
  }, [doneEntries]);

  const handleDownload = useCallback(
    (entry: FileEntry) => {
      if (!entry.resultBlob) return;
      const baseName = entry.file.name.replace(/\.[^.]+$/, "");
      const ext = FORMAT_EXTENSIONS[format];
      downloadBlob(entry.resultBlob, `${baseName}-compressed.${ext}`);
      logActivity({ tool: "Compress Image", toolHref: "/compress-image", description: "Compressed images" });
    },
    [format]
  );

  const handleDownloadAll = useCallback(async () => {
    const ext = FORMAT_EXTENSIONS[format];
    const files = doneEntries.map((entry) => ({
      data: entry.resultBlob!,
      name: `${entry.file.name.replace(/\.[^.]+$/, "")}-compressed.${ext}`,
    }));
    await downloadAsZip(files, "compressed-images.zip");
    logActivity({ tool: "Compress Image", toolHref: "/compress-image", description: "Compressed images" });
  }, [doneEntries, format]);

  const handleReset = useCallback(() => {
    setEntries([]);
    setQuality(0.7);
    setFormat("jpeg");
    setIsProcessing(false);
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
          accept={[".jpg", ".jpeg", ".png", ".webp"]}
          multiple={true}
          onFiles={handleFiles}
          label={entries.length === 0 ? "Drop your image files here" : "Drop more images to add"}
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
                  <img
                    src={entry.preview}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-[color:var(--color-text-primary)]">{entry.file.name}</p>
                    <p className="text-[10px] text-[color:var(--color-text-muted)]">
                      {formatFileSize(entry.file.size)}
                      {entry.status === "done" && entry.resultBlob && (
                        <span className="text-emerald-600">
                          {" → "}{formatFileSize(entry.resultBlob.size)}
                          {" ("}-{Math.round(((entry.file.size - entry.resultBlob.size) / entry.file.size) * 100)}%{")"}
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

          {/* Quality slider */}
          {!allDone && (
            <fieldset className="mt-5">
              <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
                Quality: {quality.toFixed(1)}
              </legend>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-[color:var(--color-accent)]"
              />
              <div className="mt-1 flex justify-between text-xs text-[color:var(--color-text-muted)]">
                <span>Smaller file</span>
                <span>Higher quality</span>
              </div>
            </fieldset>
          )}

          {/* Output format selector */}
          {!allDone && (
            <fieldset className="mt-5">
              <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
                Output format
              </legend>
              <div className="grid grid-cols-3 gap-2.5">
                {FORMAT_OPTIONS.map((option) => {
                  const isSelected = format === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`
                        flex cursor-pointer items-center justify-center rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all
                        ${
                          isSelected
                            ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] ring-1 ring-[color:var(--color-accent-glow)]"
                            : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] hover:border-[color:var(--color-border-hover)]"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="format"
                        value={option.value}
                        checked={isSelected}
                        onChange={() => setFormat(option.value)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Compress button */}
          {!allDone && (
            <button
              onClick={handleCompress}
              disabled={isProcessing || entries.length === 0}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {isProcessing ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Compressing {doneEntries.length + 1} of {entries.length}...
                </>
              ) : (
                `Compress ${entries.length} Image${entries.length !== 1 ? "s" : ""}`
              )}
            </button>
          )}

          {/* Results */}
          {allDone && (
            <div className="mt-5 space-y-4">
              {/* Before/after for single file */}
              {entries.length === 1 && entries[0].resultPreview && (
                <BeforeAfterComparison
                  beforeSrc={entries[0].preview}
                  afterSrc={entries[0].resultPreview}
                  beforeSize={formatFileSize(entries[0].file.size)}
                  afterSize={formatFileSize(entries[0].resultBlob!.size)}
                />
              )}

              {/* Total summary */}
              <div className="rounded-lg bg-[color:var(--color-bg-elevated)] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">
                    {entries.length} file{entries.length !== 1 ? "s" : ""} compressed
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      totalReduction > 0 ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {totalReduction > 0
                      ? `Reduced by ${totalReduction}%`
                      : "No size change"}
                  </span>
                </div>
              </div>

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
                    label="Download Compressed Image"
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
