"use client";

import React, { useState, useCallback } from "react";
import { Dropzone, FileList, DownloadButton, ProgressBar } from "@peregrine/ui";
import { imagesToPdf, type PageSize } from "@/lib/convert";
import { downloadFile, readFileAsArrayBuffer } from "@/lib/download";

interface ImageEntry {
  id: string;
  name: string;
  size: number;
  data: ArrayBuffer;
  width: number;
  height: number;
}

function loadImageDimensions(file: File): Promise<{ width: number; height: number; data: ArrayBuffer }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;

      // Also read as data URL to measure dimensions
      const urlReader = new FileReader();
      urlReader.onload = () => {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.naturalWidth, height: img.naturalHeight, data: arrayBuffer });
        };
        img.onerror = () => {
          reject(new Error(`Failed to load image: ${file.name}`));
        };
        img.src = urlReader.result as string;
      };
      urlReader.onerror = () => {
        reject(new Error(`Failed to read image: ${file.name}`));
      };
      urlReader.readAsDataURL(file);
    };

    reader.onerror = () => {
      reject(new Error(`Failed to read file: ${file.name}`));
    };
    reader.readAsArrayBuffer(file);
  });
}

const PAGE_SIZE_OPTIONS: { value: PageSize; label: string; description: string }[] = [
  { value: "fit", label: "Fit to Image", description: "Page matches image size" },
  { value: "a4", label: "A4", description: "210 × 297 mm" },
  { value: "letter", label: "Letter", description: '8.5 × 11"' },
];

export function PngToPdfTool() {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("fit");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    setError(null);
    setResult(null);

    try {
      const entries: ImageEntry[] = [];
      for (const file of files) {
        const { width, height, data } = await loadImageDimensions(file);
        entries.push({
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: file.name,
          size: file.size,
          data,
          width,
          height,
        });
      }

      setImages((prev) => [...prev, ...entries]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load one or more images.");
    }
  }, []);

  const handleRemove = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setResult(null);
  }, []);

  const handleReorder = useCallback(
    (reordered: { id: string; name: string; size: number }[]) => {
      // Map reordered list back to full ImageEntry objects
      setImages((prev) => {
        const lookup = new Map(prev.map((img) => [img.id, img]));
        return reordered.map((item) => lookup.get(item.id)!).filter(Boolean);
      });
      setResult(null);
    },
    [],
  );

  const handleCreate = useCallback(async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    setProgress(10);
    setError(null);
    setResult(null);

    try {
      setProgress(30);

      const pdfBytes = await imagesToPdf(
        images.map((img) => ({
          data: img.data,
          width: img.width,
          height: img.height,
        })),
        pageSize,
      );

      setProgress(90);
      setResult(pdfBytes);
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [images, pageSize]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    downloadFile(result, "images.pdf");
  }, [result]);

  const handleReset = useCallback(() => {
    setImages([]);
    setPageSize("fit");
    setIsProcessing(false);
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <Dropzone
        accept={[".png"]}
        multiple={true}
        onFiles={handleFiles}
        label="Drop your PNG images here"
      />

      {/* File list */}
      {images.length > 0 && (
        <>
          <FileList
            files={images.map((img) => ({
              id: img.id,
              name: img.name,
              size: img.size,
            }))}
            onRemove={handleRemove}
            onReorder={handleReorder}
          />

          {/* Page size selector */}
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5">
            <p className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-3">Page Size</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {PAGE_SIZE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                    pageSize === option.value
                      ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] ring-1 ring-[color:var(--color-accent)]"
                      : "border-[color:var(--color-border)] hover:border-[color:var(--color-border-hover)] hover:bg-[color:var(--color-bg-elevated)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="pageSize"
                    value={option.value}
                    checked={pageSize === option.value}
                    onChange={() => {
                      setPageSize(option.value);
                      setResult(null);
                    }}
                    className="accent-[color:var(--color-accent)]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[color:var(--color-text-primary)]">
                      {option.label}
                    </p>
                    <p className="text-xs text-[color:var(--color-text-muted)]">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          {isProcessing && <ProgressBar progress={progress} />}

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]" role="alert">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {result ? (
              <>
                <DownloadButton onClick={handleDownload} label="Download PDF" />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-5 py-3 text-sm font-medium text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] hover:border-[color:var(--color-border-hover)]"
                >
                  Start Over
                </button>
              </>
            ) : (
              <button
                onClick={handleCreate}
                disabled={isProcessing || images.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md hover:shadow-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-[color:var(--color-accent)]"
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
                    Creating PDF...
                  </>
                ) : (
                  "Create PDF"
                )}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
