"use client";

import { useState, useCallback, useMemo } from "react";
import { Dropzone, DownloadButton, logActivity } from "@peregrine/ui";
import { flipImage, rotateImage } from "@/lib/transform";
import { downloadBlob, downloadAsZip, formatFileSize, readFileAsDataUrl } from "@/lib/download";

interface FileEntry {
  file: File;
  preview: string;
  resultBlob: Blob | null;
  resultPreview: string | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export function FlipRotateTool() {
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [customDegrees, setCustomDegrees] = useState(45);
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

  /**
   * Get the current working file for an entry — either the transformed blob
   * wrapped as a File, or the original upload.
   */
  const getWorkingFile = useCallback((entry: FileEntry): File => {
    if (entry.resultBlob) {
      return new File([entry.resultBlob], entry.file.name, { type: entry.resultBlob.type });
    }
    return entry.file;
  }, []);

  const applyTransform = useCallback(
    async (transformFn: (file: File) => Promise<Blob>) => {
      if (entries.length === 0) return;

      setIsProcessing(true);
      setError(null);

      for (let i = 0; i < entries.length; i++) {
        setEntries((prev) =>
          prev.map((e, j) => (j === i ? { ...e, status: "processing" } : e))
        );

        try {
          const workingFile = getWorkingFile(entries[i]);
          const blob = await transformFn(workingFile);
          const resultPreview = URL.createObjectURL(blob);
          setEntries((prev) =>
            prev.map((e, j) =>
              j === i ? { ...e, resultBlob: blob, resultPreview, status: "done" } : e
            )
          );
        } catch {
          setEntries((prev) =>
            prev.map((e, j) =>
              j === i ? { ...e, status: "error", error: "Transform failed" } : e
            )
          );
        }
      }

      setIsProcessing(false);
    },
    [entries, getWorkingFile]
  );

  const handleFlip = useCallback(
    (direction: "horizontal" | "vertical") => {
      applyTransform((file) => flipImage(file, direction));
    },
    [applyTransform]
  );

  const handleRotate = useCallback(
    (degrees: number) => {
      applyTransform((file) => rotateImage(file, degrees));
    },
    [applyTransform]
  );

  const doneEntries = useMemo(() => entries.filter((e) => e.status === "done"), [entries]);
  const hasTransformed = doneEntries.length > 0;

  const handleDownload = useCallback(
    (entry: FileEntry) => {
      if (!entry.resultBlob) return;
      const baseName = entry.file.name.replace(/\.[^.]+$/, "");
      downloadBlob(entry.resultBlob, `${baseName}-transformed.png`);
      logActivity({ tool: "Flip & Rotate", toolHref: "/flip-rotate", description: "Transformed images" });
    },
    []
  );

  const handleDownloadAll = useCallback(async () => {
    const files = doneEntries.map((entry) => ({
      data: entry.resultBlob!,
      name: `${entry.file.name.replace(/\.[^.]+$/, "")}-transformed.png`,
    }));
    await downloadAsZip(files, "flip-rotate.zip");
    logActivity({ tool: "Flip & Rotate", toolHref: "/flip-rotate", description: "Transformed images" });
  }, [doneEntries]);

  const handleReset = useCallback(() => {
    setEntries([]);
    setCustomDegrees(45);
    setIsProcessing(false);
    setError(null);
  }, []);

  const handleRemove = useCallback((index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Use the first entry's result preview (or original preview) for the main preview
  const previewSrc = entries.length > 0
    ? (entries[0].resultPreview ?? entries[0].preview)
    : null;

  return (
    <div className="space-y-6">
      {/* Dropzone — always visible to add more files */}
      {!isProcessing && (
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
                    src={entry.resultPreview ?? entry.preview}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-[color:var(--color-text-primary)]">{entry.file.name}</p>
                    <p className="text-[10px] text-[color:var(--color-text-muted)]">
                      {formatFileSize(entry.file.size)}
                      {entry.status === "done" && entry.resultBlob && (
                        <span className="text-[color:var(--color-text-secondary)]">
                          {" → "}{formatFileSize(entry.resultBlob.size)}
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

          {/* Image preview (first file) */}
          {previewSrc && (
            <div className="mt-4 flex justify-center">
              <img
                src={previewSrc}
                alt="Preview"
                className="max-h-64 rounded-lg border border-[color:var(--color-border)] object-contain"
              />
            </div>
          )}

          {/* Flip buttons */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Flip
            </legend>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleFlip("horizontal")}
                disabled={isProcessing}
                className="rounded-lg border border-[color:var(--color-border)] px-4 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Flip Horizontal
              </button>
              <button
                onClick={() => handleFlip("vertical")}
                disabled={isProcessing}
                className="rounded-lg border border-[color:var(--color-border)] px-4 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Flip Vertical
              </button>
            </div>
          </fieldset>

          {/* Rotate preset buttons */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Rotate
            </legend>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleRotate(90)}
                disabled={isProcessing}
                className="rounded-lg border border-[color:var(--color-border)] px-4 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                90° CW
              </button>
              <button
                onClick={() => handleRotate(180)}
                disabled={isProcessing}
                className="rounded-lg border border-[color:var(--color-border)] px-4 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                180°
              </button>
              <button
                onClick={() => handleRotate(270)}
                disabled={isProcessing}
                className="rounded-lg border border-[color:var(--color-border)] px-4 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                270° CW
              </button>
            </div>
          </fieldset>

          {/* Custom degree input */}
          <div className="mt-5">
            <label
              htmlFor="custom-degrees"
              className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
            >
              Custom rotation
            </label>
            <div className="flex gap-2.5">
              <input
                id="custom-degrees"
                type="number"
                min={-360}
                max={360}
                value={customDegrees}
                onChange={(e) => setCustomDegrees(parseInt(e.target.value, 10) || 0)}
                className="w-28 rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
              />
              <button
                onClick={() => handleRotate(customDegrees)}
                disabled={isProcessing}
                className="rounded-lg bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Rotate {customDegrees}°
              </button>
            </div>
          </div>

          {/* Processing indicator */}
          {isProcessing && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[color:var(--color-accent)]">
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
              Processing {doneEntries.length + 1} of {entries.length}...
            </div>
          )}

          {/* Download buttons — shown after at least one transformation */}
          {hasTransformed && !isProcessing && (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {doneEntries.length > 1 ? (
                <DownloadButton
                  onClick={handleDownloadAll}
                  label="Download All as ZIP"
                  className="flex-1"
                />
              ) : (
                <DownloadButton
                  onClick={() => handleDownload(doneEntries[0])}
                  label="Download"
                  className="flex-1"
                />
              )}
              <button
                onClick={handleReset}
                className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
              >
                Start over
              </button>
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
