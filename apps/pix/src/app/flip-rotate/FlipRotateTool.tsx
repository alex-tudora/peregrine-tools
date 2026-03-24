"use client";

import { useState, useCallback } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { flipImage, rotateImage } from "@/lib/transform";
import { downloadBlob, formatFileSize, readFileAsDataUrl } from "@/lib/download";

export function FlipRotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [currentBlob, setCurrentBlob] = useState<Blob | null>(null);
  const [customDegrees, setCustomDegrees] = useState(45);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasTransformed, setHasTransformed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);
    setCurrentBlob(null);
    setHasTransformed(false);

    try {
      const dataUrl = await readFileAsDataUrl(selected);
      setFile(selected);
      setPreview(dataUrl);
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  /**
   * Get the current working file — either the transformed blob
   * wrapped as a File, or the original upload.
   */
  const getCurrentFile = useCallback((): File | null => {
    if (currentBlob && file) {
      return new File([currentBlob], file.name, { type: currentBlob.type });
    }
    return file;
  }, [currentBlob, file]);

  const updatePreview = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setPreview(url);
    setCurrentBlob(blob);
    setHasTransformed(true);
  }, []);

  const handleFlip = useCallback(
    async (direction: "horizontal" | "vertical") => {
      const workingFile = getCurrentFile();
      if (!workingFile) return;

      setIsProcessing(true);
      setError(null);

      try {
        const blob = await flipImage(workingFile, direction);
        updatePreview(blob);
      } catch {
        setError("Flip failed. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    },
    [getCurrentFile, updatePreview],
  );

  const handleRotate = useCallback(
    async (degrees: number) => {
      const workingFile = getCurrentFile();
      if (!workingFile) return;

      setIsProcessing(true);
      setError(null);

      try {
        const blob = await rotateImage(workingFile, degrees);
        updatePreview(blob);
      } catch {
        setError("Rotation failed. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    },
    [getCurrentFile, updatePreview],
  );

  const handleDownload = useCallback(() => {
    if (!file) return;

    const blob = currentBlob;
    if (!blob) return;

    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(blob, `${baseName}-transformed.png`);
  }, [currentBlob, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setPreview(null);
    setCurrentBlob(null);
    setCustomDegrees(45);
    setIsProcessing(false);
    setHasTransformed(false);
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone — only visible when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".jpg", ".jpeg", ".png", ".webp"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your image file here"
        />
      )}

      {/* File info + controls */}
      {file && preview && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
          {/* Uploaded file summary */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                {formatFileSize(file.size)}
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

          {/* Image preview */}
          <div className="mt-4 flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 rounded-lg border border-[color:var(--color-border)] object-contain"
            />
          </div>

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
                className="w-28 rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <button
                onClick={() => handleRotate(customDegrees)}
                disabled={isProcessing}
                className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Rotate {customDegrees}°
              </button>
            </div>
          </div>

          {/* Processing indicator */}
          {isProcessing && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-violet-600">
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
              Processing...
            </div>
          )}

          {/* Download button — shown after at least one transformation */}
          {hasTransformed && !isProcessing && (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <DownloadButton
                onClick={handleDownload}
                label="Download"
                className="flex-1"
              />
              <button
                onClick={handleReset}
                className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
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
