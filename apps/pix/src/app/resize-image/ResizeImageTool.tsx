"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { Dropzone, DownloadButton, BeforeAfterComparison, logActivity, usePreference } from "@peregrine/ui";
import { resizeImage, type ResizeOptions } from "@/lib/resize";
import { downloadBlob, downloadAsZip, formatFileSize, readFileAsDataUrl, loadImage } from "@/lib/download";

type ResizeMode = "dimensions" | "percentage";
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
  originalWidth: number;
  originalHeight: number;
  resultBlob: Blob | null;
  resultPreview: string | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export default function ResizeImageTool() {
  const [entries, setEntries] = useState<FileEntry[]>([]);

  const [mode, setMode] = useState<ResizeMode>("dimensions");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [percentage, setPercentage] = useState(50);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [format, setFormat] = usePreference<OutputFormat>("resize-image-format", "jpeg");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Aspect ratio derived from the first entry (used for linked dimension inputs)
  const firstEntry = entries[0] ?? null;
  const aspectRatio =
    firstEntry && firstEntry.originalWidth > 0 && firstEntry.originalHeight > 0
      ? firstEntry.originalWidth / firstEntry.originalHeight
      : 1;

  const handleFiles = useCallback(async (files: File[]) => {
    setError(null);

    const newEntries: FileEntry[] = [];
    for (const file of files) {
      try {
        const dataUrl = await readFileAsDataUrl(file);
        const img = await loadImage(dataUrl);
        newEntries.push({
          file,
          preview: dataUrl,
          originalWidth: img.width,
          originalHeight: img.height,
          resultBlob: null,
          resultPreview: null,
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

    setEntries((prev) => {
      const combined = [...prev, ...newEntries];
      // When the first file is added, seed width/height from it
      if (prev.length === 0 && newEntries.length > 0) {
        setWidth(newEntries[0].originalWidth);
        setHeight(newEntries[0].originalHeight);
      }
      return combined;
    });
  }, []);

  const handleWidthChange = useCallback(
    (newWidth: number) => {
      setWidth(newWidth);
      if (maintainAspectRatio && newWidth > 0) {
        setHeight(Math.round(newWidth / aspectRatio));
      }
    },
    [maintainAspectRatio, aspectRatio],
  );

  const handleHeightChange = useCallback(
    (newHeight: number) => {
      setHeight(newHeight);
      if (maintainAspectRatio && newHeight > 0) {
        setWidth(Math.round(newHeight * aspectRatio));
      }
    },
    [maintainAspectRatio, aspectRatio],
  );

  // When aspect ratio is toggled on, recalculate height from current width
  useEffect(() => {
    if (maintainAspectRatio && mode === "dimensions" && width > 0) {
      setHeight(Math.round(width / aspectRatio));
    }
  }, [maintainAspectRatio]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleResize = useCallback(async () => {
    setIsProcessing(true);
    setError(null);

    for (let i = 0; i < entries.length; i++) {
      if (entries[i].status === "done") continue;

      setEntries((prev) =>
        prev.map((e, j) => (j === i ? { ...e, status: "processing" } : e))
      );

      try {
        const blob = await resizeImage(entries[i].file, {
          ...(mode === "percentage"
            ? { percentage }
            : { width, height }),
          maintainAspectRatio,
          format,
          quality: 0.9,
        });

        const resultPreview = URL.createObjectURL(blob);
        setEntries((prev) =>
          prev.map((e, j) =>
            j === i ? { ...e, resultBlob: blob, resultPreview, status: "done" } : e
          )
        );
      } catch {
        setEntries((prev) =>
          prev.map((e, j) =>
            j === i ? { ...e, status: "error", error: "Resize failed" } : e
          )
        );
      }
    }

    setIsProcessing(false);
  }, [entries, mode, width, height, percentage, maintainAspectRatio, format]);

  const doneEntries = useMemo(() => entries.filter((e) => e.status === "done"), [entries]);
  const allDone = entries.length > 0 && doneEntries.length === entries.length;
  const hasMultiple = entries.length > 1;

  const handleDownload = useCallback(
    (entry: FileEntry) => {
      if (!entry.resultBlob) return;
      const baseName = entry.file.name.replace(/\.[^.]+$/, "");
      const ext = FORMAT_EXTENSIONS[format];
      downloadBlob(entry.resultBlob, `${baseName}-resized.${ext}`);
      logActivity({ tool: "Resize Image", toolHref: "/resize-image", description: "Resized images" });
    },
    [format]
  );

  const handleDownloadAll = useCallback(async () => {
    const ext = FORMAT_EXTENSIONS[format];
    const files = doneEntries.map((entry) => ({
      data: entry.resultBlob!,
      name: `${entry.file.name.replace(/\.[^.]+$/, "")}-resized.${ext}`,
    }));
    await downloadAsZip(files, "resized-images.zip");
    logActivity({ tool: "Resize Image", toolHref: "/resize-image", description: "Resized images" });
  }, [doneEntries, format]);

  const handleReset = useCallback(() => {
    // Revoke all object URLs
    for (const entry of entries) {
      if (entry.resultPreview) URL.revokeObjectURL(entry.resultPreview);
    }
    setEntries([]);
    setWidth(0);
    setHeight(0);
    setPercentage(50);
    setMaintainAspectRatio(true);
    setMode("dimensions");
    setIsProcessing(false);
    setError(null);
  }, [entries]);

  const handleRemove = useCallback((index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone -- always visible to add more files */}
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
                      {formatFileSize(entry.file.size)} &middot; {entry.originalWidth} &times; {entry.originalHeight} px
                      {entry.status === "done" && entry.resultBlob && (
                        <span className="text-emerald-600">
                          {" → "}{formatFileSize(entry.resultBlob.size)}
                        </span>
                      )}
                      {entry.status === "processing" && (
                        <span className="text-violet-500"> Resizing...</span>
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

          {/* Resize mode selector */}
          {!allDone && (
            <fieldset className="mt-5">
              <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
                Resize mode
              </legend>
              <div className="grid grid-cols-2 gap-2.5">
                {(["dimensions", "percentage"] as const).map((m) => {
                  const isSelected = mode === m;
                  return (
                    <label
                      key={m}
                      className={`
                        flex cursor-pointer items-center justify-center rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all
                        ${
                          isSelected
                            ? "border-violet-500 bg-violet-50/60 text-violet-700 ring-1 ring-violet-500/20"
                            : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] hover:border-[color:var(--color-border-hover)]"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="resizeMode"
                        value={m}
                        checked={isSelected}
                        onChange={() => setMode(m)}
                        className="sr-only"
                      />
                      {m === "dimensions" ? "By Dimensions" : "By Percentage"}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Dimension inputs */}
          {!allDone && mode === "dimensions" && (
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="resize-width"
                    className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
                  >
                    Width (px)
                  </label>
                  <input
                    id="resize-width"
                    type="number"
                    min={1}
                    value={width}
                    onChange={(e) =>
                      handleWidthChange(parseInt(e.target.value, 10) || 0)
                    }
                    className="w-full rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="resize-height"
                    className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
                  >
                    Height (px)
                  </label>
                  <input
                    id="resize-height"
                    type="number"
                    min={1}
                    value={height}
                    onChange={(e) =>
                      handleHeightChange(parseInt(e.target.value, 10) || 0)
                    }
                    className="w-full rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="h-4 w-4 rounded border-[color:var(--color-border-hover)] text-violet-500 focus:ring-violet-500"
                />
                Maintain aspect ratio
              </label>
            </div>
          )}

          {/* Percentage input */}
          {!allDone && mode === "percentage" && firstEntry && (
            <div className="mt-5">
              <label
                htmlFor="resize-percentage"
                className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
              >
                Scale percentage
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="resize-percentage"
                  type="number"
                  min={1}
                  max={500}
                  value={percentage}
                  onChange={(e) =>
                    setPercentage(parseInt(e.target.value, 10) || 50)
                  }
                  className="w-28 rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
                {!hasMultiple && (
                  <span className="text-sm text-[color:var(--color-text-muted)]">
                    %&ensp;&rarr;&ensp;
                    {Math.round(firstEntry.originalWidth * (percentage / 100))} &times;{" "}
                    {Math.round(firstEntry.originalHeight * (percentage / 100))} px
                  </span>
                )}
                {hasMultiple && (
                  <span className="text-sm text-[color:var(--color-text-muted)]">%</span>
                )}
              </div>
            </div>
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
                            ? "border-violet-500 bg-violet-50/60 text-violet-700 ring-1 ring-violet-500/20"
                            : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] hover:border-[color:var(--color-border-hover)]"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="outputFormat"
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

          {/* Resize button */}
          {!allDone && (
            <button
              onClick={handleResize}
              disabled={isProcessing || entries.length === 0}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-violet-500/25 transition-all duration-200 hover:bg-violet-600 hover:shadow-md hover:shadow-violet-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-violet-500"
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
                  Resizing {doneEntries.length + 1} of {entries.length}...
                </>
              ) : (
                `Resize ${entries.length} Image${entries.length !== 1 ? "s" : ""}`
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
                    {entries.length} file{entries.length !== 1 ? "s" : ""} resized
                  </span>
                  <span className="font-medium text-[color:var(--color-text-primary)]">
                    {mode === "dimensions"
                      ? `${width} × ${height} px`
                      : `${percentage}%`}
                    {" · "}{format.toUpperCase()}
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
                    label="Download Resized Image"
                    className="flex-1"
                  />
                )}
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  Resize more
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
