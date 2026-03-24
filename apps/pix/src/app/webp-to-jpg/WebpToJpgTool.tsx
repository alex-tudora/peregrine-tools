"use client";

import React, { useState, useCallback } from "react";
import { Dropzone, ProgressBar, DownloadButton } from "@peregrine/ui";
import { convertImage } from "@/lib/convert";
import { downloadBlob, downloadAsZip, formatFileSize } from "@/lib/download";

interface ConvertedFile {
  name: string;
  blob: Blob;
}

export function WebpToJpgTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.85);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ConvertedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((incoming: File[]) => {
    setFiles(incoming);
    setResults([]);
    setProgress(0);
    setError(null);
  }, []);

  const handleConvert = useCallback(async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResults([]);

    try {
      const converted: ConvertedFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const blob = await convertImage(file, "jpeg", quality);
        const name = file.name.replace(/\.webp$/i, "") + ".jpg";
        converted.push({ name, blob });
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      setResults(converted);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to convert image. Please try another file.",
      );
    } finally {
      setIsProcessing(false);
    }
  }, [files, quality]);

  const handleDownloadSingle = useCallback((result: ConvertedFile) => {
    downloadBlob(result.blob, result.name);
  }, []);

  const handleDownloadAll = useCallback(async () => {
    if (results.length === 0) return;

    const zipFiles = results.map((r) => ({ data: r.blob, name: r.name }));
    await downloadAsZip(zipFiles, "webp-to-jpg.zip");
  }, [results]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setResults([]);
    setProgress(0);
    setError(null);
    setIsProcessing(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      {files.length === 0 && (
        <Dropzone
          accept={[".webp"]}
          multiple={true}
          onFiles={handleFiles}
          label="Drop your WebP images here"
        />
      )}

      {/* File list & controls */}
      {files.length > 0 && results.length === 0 && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6">
          {/* File list */}
          <div className="space-y-2">
            {files.map((file, i) => (
              <div
                key={`${file.name}-${i}`}
                className="flex items-center justify-between gap-4"
              >
                <p className="min-w-0 truncate text-sm font-medium text-[color:var(--color-text-primary)]">
                  {file.name}
                </p>
                <p className="shrink-0 text-xs text-[color:var(--color-text-muted)]">
                  {formatFileSize(file.size)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-[color:var(--color-text-muted)]">
              {files.length} {files.length === 1 ? "file" : "files"} selected
            </p>
            <button
              onClick={handleReset}
              className="text-sm text-[color:var(--color-text-muted)] transition-colors hover:text-red-500"
              aria-label="Remove files"
            >
              Remove
            </button>
          </div>

          {/* Quality slider */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="quality-slider"
                className="text-sm font-medium text-[color:var(--color-text-secondary)]"
              >
                Image Quality
              </label>
              <span className="text-sm font-semibold text-sky-600">
                {Math.round(quality * 100)}%
              </span>
            </div>
            <input
              id="quality-slider"
              type="range"
              min={0.1}
              max={1.0}
              step={0.1}
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              disabled={isProcessing}
              className="mt-2 w-full accent-sky-500"
            />
            <div className="mt-1 flex justify-between text-xs text-[color:var(--color-text-muted)]">
              <span>Smaller file</span>
              <span>Higher quality</span>
            </div>
          </div>

          {/* Progress bar */}
          {isProcessing && <ProgressBar progress={progress} className="mt-5" />}

          {/* Convert button */}
          <div className="mt-5">
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-[var(--shadow-warm-accent)] transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-[color:var(--color-accent)]"
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
                  Converting...
                </>
              ) : (
                "Convert to JPG"
              )}
            </button>
          </div>
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

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {results.length > 1 && (
              <DownloadButton
                onClick={handleDownloadAll}
                label={`Download All as ZIP (${results.length} images)`}
              />
            )}
            {results.length === 1 && (
              <DownloadButton
                onClick={() => handleDownloadSingle(results[0])}
                label="Download JPG"
              />
            )}
            <button
              onClick={handleReset}
              className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-5 py-3 text-sm font-medium text-[color:var(--color-text-secondary)] transition-all hover:border-[color:var(--color-border-hover)] hover:bg-[color:var(--color-bg-elevated)]"
            >
              Convert More
            </button>
          </div>

          {/* File result list */}
          <div className="space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">
                    {result.name}
                  </p>
                  <p className="text-xs text-[color:var(--color-text-muted)]">
                    {formatFileSize(result.blob.size)}
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadSingle(result)}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-sky-600 transition-colors hover:bg-sky-50"
                  aria-label={`Download ${result.name}`}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
