"use client";

import { useState, useCallback, useMemo } from "react";
import { Dropzone, DownloadButton, logActivity, usePreference } from "@peregrine/ui";
import { downloadBlob, downloadAsZip, formatFileSize, readFileAsDataUrl, loadImage } from "@/lib/download";

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

type ResizeMode = "dimensions" | "percentage";

interface FileEntry {
  file: File;
  preview: string;
  resultBlob: Blob | null;
  resultPreview: string | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export default function BatchProcessTool() {
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pipeline toggles
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [compressEnabled, setCompressEnabled] = useState(true);
  const [convertEnabled, setConvertEnabled] = useState(false);

  // Resize settings
  const [resizeMode, setResizeMode] = usePreference<ResizeMode>("batch-resize-mode", "dimensions");
  const [targetWidth, setTargetWidth] = usePreference("batch-resize-width", 1920);
  const [targetHeight, setTargetHeight] = usePreference("batch-resize-height", 1080);
  const [percentage, setPercentage] = usePreference("batch-resize-percentage", 50);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);

  // Compress settings
  const [quality, setQuality] = usePreference("batch-compress-quality", 0.7);

  // Convert settings
  const [outputFormat, setOutputFormat] = usePreference<OutputFormat>("batch-convert-format", "webp");

  const anyStepEnabled = resizeEnabled || compressEnabled || convertEnabled;

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

  const handleProcess = useCallback(async () => {
    if (!anyStepEnabled) {
      setError("Enable at least one pipeline step before processing.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    for (let i = 0; i < entries.length; i++) {
      if (entries[i].status === "done") continue;

      setEntries((prev) =>
        prev.map((e, j) => (j === i ? { ...e, status: "processing" } : e))
      );

      try {
        const dataUrl = entries[i].preview;
        const img = await loadImage(dataUrl);

        // Determine target dimensions
        let w = img.width;
        let h = img.height;

        if (resizeEnabled) {
          if (resizeMode === "percentage") {
            const scale = percentage / 100;
            w = Math.round(img.width * scale);
            h = Math.round(img.height * scale);
          } else if (lockAspectRatio) {
            if (targetWidth && targetHeight) {
              const ratioW = targetWidth / img.width;
              const ratioH = targetHeight / img.height;
              const scale = Math.min(ratioW, ratioH);
              w = Math.round(img.width * scale);
              h = Math.round(img.height * scale);
            } else if (targetWidth) {
              const scale = targetWidth / img.width;
              w = targetWidth;
              h = Math.round(img.height * scale);
            } else if (targetHeight) {
              const scale = targetHeight / img.height;
              w = Math.round(img.width * scale);
              h = targetHeight;
            }
          } else {
            w = targetWidth || img.width;
            h = targetHeight || img.height;
          }
        }

        // Create canvas and draw at target dimensions
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Failed to get canvas 2d context");
        ctx.drawImage(img, 0, 0, w, h);

        // Determine output mime type and quality
        const mimeType = convertEnabled
          ? `image/${outputFormat}`
          : `image/${entries[i].file.type.split("/")[1] === "png" ? "png" : entries[i].file.type.split("/")[1] === "webp" ? "webp" : "jpeg"}`;

        const blobQuality = compressEnabled ? quality : undefined;

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => {
              if (b) resolve(b);
              else reject(new Error("Canvas toBlob returned null"));
            },
            mimeType,
            blobQuality
          );
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
            j === i ? { ...e, status: "error", error: "Processing failed" } : e
          )
        );
      }
    }

    setIsProcessing(false);
  }, [entries, anyStepEnabled, resizeEnabled, resizeMode, targetWidth, targetHeight, percentage, lockAspectRatio, compressEnabled, quality, convertEnabled, outputFormat]);

  const doneEntries = useMemo(() => entries.filter((e) => e.status === "done"), [entries]);
  const allDone = entries.length > 0 && doneEntries.length === entries.length;
  const totalSummary = useMemo(() => {
    if (doneEntries.length === 0) return null;
    const originalTotal = doneEntries.reduce((sum, e) => sum + e.file.size, 0);
    const processedTotal = doneEntries.reduce((sum, e) => sum + (e.resultBlob?.size ?? 0), 0);
    const reductionPct = originalTotal > 0 ? Math.round(((originalTotal - processedTotal) / originalTotal) * 100) : 0;
    return { count: doneEntries.length, originalTotal, processedTotal, reductionPct };
  }, [doneEntries]);

  const getOutputExtension = useCallback(
    (entry: FileEntry) => {
      if (convertEnabled) return FORMAT_EXTENSIONS[outputFormat];
      const ext = entry.file.name.split(".").pop()?.toLowerCase();
      if (ext === "jpg" || ext === "jpeg") return "jpg";
      if (ext === "webp") return "webp";
      if (ext === "png") return "png";
      return "jpg";
    },
    [convertEnabled, outputFormat]
  );

  const handleDownload = useCallback(
    (entry: FileEntry) => {
      if (!entry.resultBlob) return;
      const baseName = entry.file.name.replace(/\.[^.]+$/, "");
      const ext = getOutputExtension(entry);
      downloadBlob(entry.resultBlob, `${baseName}-processed.${ext}`);
      logActivity({ tool: "Batch Image Processor", toolHref: "/batch-process", description: "Batch processed images" });
    },
    [getOutputExtension]
  );

  const handleDownloadAll = useCallback(async () => {
    const files = doneEntries.map((entry) => ({
      data: entry.resultBlob!,
      name: `${entry.file.name.replace(/\.[^.]+$/, "")}-processed.${getOutputExtension(entry)}`,
    }));
    await downloadAsZip(files, "batch-processed-images.zip");
    logActivity({ tool: "Batch Image Processor", toolHref: "/batch-process", description: "Batch processed images" });
  }, [doneEntries, getOutputExtension]);

  const handleReset = useCallback(() => {
    setEntries([]);
    setIsProcessing(false);
    setError(null);
  }, []);

  const handleRemove = useCallback((index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      {!isProcessing && !allDone && (
        <Dropzone
          accept={[".jpg", ".jpeg", ".png", ".webp"]}
          multiple={true}
          onFiles={handleFiles}
          label={entries.length === 0 ? "Drop your image files here" : "Drop more images to add"}
        />
      )}

      {/* Files + pipeline controls */}
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
                        <span className={entry.resultBlob.size < entry.file.size ? "text-emerald-600" : "text-amber-600"}>
                          {" → "}{formatFileSize(entry.resultBlob.size)}
                          {" ("}{entry.resultBlob.size < entry.file.size ? "-" : "+"}{Math.abs(Math.round(((entry.file.size - entry.resultBlob.size) / entry.file.size) * 100))}%{")"}
                        </span>
                      )}
                      {entry.status === "processing" && (
                        <span className="text-[color:var(--color-accent)]"> Processing...</span>
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

          {/* Pipeline configuration */}
          {!allDone && (
            <div className="mt-5 space-y-5">
              <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">Pipeline</p>

              {/* Step 1: Resize */}
              <fieldset className="rounded-lg border border-[color:var(--color-border)] p-4">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={resizeEnabled}
                    onChange={(e) => setResizeEnabled(e.target.checked)}
                    className="h-4 w-4 rounded accent-[color:var(--color-accent)]"
                  />
                  <span className="text-sm font-medium text-[color:var(--color-text-primary)]">
                    1. Resize
                  </span>
                </label>

                {resizeEnabled && (
                  <div className="mt-3 space-y-3 pl-6">
                    {/* Mode selector */}
                    <div className="flex gap-3">
                      <label className="flex cursor-pointer items-center gap-1.5">
                        <input
                          type="radio"
                          name="resizeMode"
                          checked={resizeMode === "dimensions"}
                          onChange={() => setResizeMode("dimensions")}
                          className="accent-[color:var(--color-accent)]"
                        />
                        <span className="text-xs text-[color:var(--color-text-secondary)]">Dimensions</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-1.5">
                        <input
                          type="radio"
                          name="resizeMode"
                          checked={resizeMode === "percentage"}
                          onChange={() => setResizeMode("percentage")}
                          className="accent-[color:var(--color-accent)]"
                        />
                        <span className="text-xs text-[color:var(--color-text-secondary)]">Percentage</span>
                      </label>
                    </div>

                    {resizeMode === "dimensions" ? (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <label className="mb-1 block text-xs text-[color:var(--color-text-muted)]">Width (px)</label>
                            <input
                              type="number"
                              min="1"
                              value={targetWidth}
                              onChange={(e) => setTargetWidth(parseInt(e.target.value) || 0)}
                              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
                            />
                          </div>
                          <span className="mt-5 text-[color:var(--color-text-muted)]">&times;</span>
                          <div className="flex-1">
                            <label className="mb-1 block text-xs text-[color:var(--color-text-muted)]">Height (px)</label>
                            <input
                              type="number"
                              min="1"
                              value={targetHeight}
                              onChange={(e) => setTargetHeight(parseInt(e.target.value) || 0)}
                              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
                            />
                          </div>
                        </div>
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            checked={lockAspectRatio}
                            onChange={(e) => setLockAspectRatio(e.target.checked)}
                            className="h-3.5 w-3.5 rounded accent-[color:var(--color-accent)]"
                          />
                          <span className="text-xs text-[color:var(--color-text-muted)]">Lock aspect ratio</span>
                        </label>
                      </>
                    ) : (
                      <div>
                        <label className="mb-1 block text-xs text-[color:var(--color-text-muted)]">Scale: {percentage}%</label>
                        <input
                          type="range"
                          min="10"
                          max="200"
                          step="5"
                          value={percentage}
                          onChange={(e) => setPercentage(parseInt(e.target.value))}
                          className="w-full accent-[color:var(--color-accent)]"
                        />
                        <div className="mt-1 flex justify-between text-[10px] text-[color:var(--color-text-muted)]">
                          <span>10%</span>
                          <span>200%</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </fieldset>

              {/* Step 2: Compress */}
              <fieldset className="rounded-lg border border-[color:var(--color-border)] p-4">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={compressEnabled}
                    onChange={(e) => setCompressEnabled(e.target.checked)}
                    className="h-4 w-4 rounded accent-[color:var(--color-accent)]"
                  />
                  <span className="text-sm font-medium text-[color:var(--color-text-primary)]">
                    2. Compress
                  </span>
                </label>

                {compressEnabled && (
                  <div className="mt-3 pl-6">
                    <label className="mb-1 block text-xs text-[color:var(--color-text-muted)]">Quality: {quality.toFixed(1)}</label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full accent-[color:var(--color-accent)]"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-[color:var(--color-text-muted)]">
                      <span>Smaller file</span>
                      <span>Higher quality</span>
                    </div>
                  </div>
                )}
              </fieldset>

              {/* Step 3: Convert */}
              <fieldset className="rounded-lg border border-[color:var(--color-border)] p-4">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={convertEnabled}
                    onChange={(e) => setConvertEnabled(e.target.checked)}
                    className="h-4 w-4 rounded accent-[color:var(--color-accent)]"
                  />
                  <span className="text-sm font-medium text-[color:var(--color-text-primary)]">
                    3. Convert format
                  </span>
                </label>

                {convertEnabled && (
                  <div className="mt-3 pl-6">
                    <div className="grid grid-cols-3 gap-2.5">
                      {FORMAT_OPTIONS.map((option) => {
                        const isSelected = outputFormat === option.value;
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
                              name="outputFormat"
                              value={option.value}
                              checked={isSelected}
                              onChange={() => setOutputFormat(option.value)}
                              className="sr-only"
                            />
                            {option.label}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </fieldset>

              {/* Validation hint */}
              {!anyStepEnabled && (
                <p className="text-xs text-amber-600">Enable at least one pipeline step to process your images.</p>
              )}

              {/* Process button */}
              <button
                onClick={handleProcess}
                disabled={isProcessing || entries.length === 0 || !anyStepEnabled}
                className="btn-action inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                {isProcessing ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing {doneEntries.length + 1} of {entries.length}...
                  </>
                ) : (
                  `Process All ${entries.length} Image${entries.length !== 1 ? "s" : ""}`
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {allDone && totalSummary && (
            <div className="mt-5 space-y-4">
              {/* Total summary */}
              <div className="rounded-lg bg-[color:var(--color-bg-elevated)] p-4">
                <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-[color:var(--color-text-secondary)]">
                    Processed {totalSummary.count} image{totalSummary.count !== 1 ? "s" : ""}:{" "}
                    {formatFileSize(totalSummary.originalTotal)} → {formatFileSize(totalSummary.processedTotal)}
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      totalSummary.reductionPct > 0 ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {totalSummary.reductionPct > 0
                      ? `${totalSummary.reductionPct}% smaller`
                      : totalSummary.reductionPct === 0
                      ? "Same size"
                      : `${Math.abs(totalSummary.reductionPct)}% larger`}
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
                    label="Download Processed Image"
                    className="flex-1"
                  />
                )}
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Process more
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
