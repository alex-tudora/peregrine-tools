"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { downloadBlob, formatFileSize, readFileAsDataUrl, loadImage } from "@/lib/download";

interface Filters {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  grayscale: number;
  sepia: number;
}

const defaultFilters: Filters = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  blur: 0,
  grayscale: 0,
  sepia: 0,
};

function buildFilterString(filters: Filters): string {
  return [
    `brightness(${filters.brightness})`,
    `contrast(${filters.contrast})`,
    `saturate(${filters.saturation})`,
    `blur(${filters.blur}px)`,
    `grayscale(${filters.grayscale}%)`,
    `sepia(${filters.sepia}%)`,
  ].join(" ");
}

export function ImageFiltersTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ ...defaultFilters });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);
    setFilters({ ...defaultFilters });

    try {
      const dataUrl = await readFileAsDataUrl(selected);
      const img = await loadImage(dataUrl);
      imageRef.current = img;
      setFile(selected);
      setPreview(dataUrl);
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  // Draw the image with filters applied to the canvas whenever filters change
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.filter = buildFilterString(filters);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }, [filters, preview]);

  const updateFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleReset = useCallback(() => {
    setFilters({ ...defaultFilters });
  }, []);

  const handleClear = useCallback(() => {
    setFile(null);
    setPreview(null);
    setFilters({ ...defaultFilters });
    setIsProcessing(false);
    setError(null);
    imageRef.current = null;
  }, []);

  const handleDownload = useCallback(async () => {
    const img = imageRef.current;
    if (!img || !file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const offscreen = document.createElement("canvas");
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;

      const ctx = offscreen.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.filter = buildFilterString(filters);
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob>((resolve, reject) => {
        offscreen.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
          "image/png",
        );
      });

      const baseName = file.name.replace(/\.[^.]+$/, "");
      downloadBlob(blob, `${baseName}-filtered.png`);
    } catch {
      setError("Failed to export the filtered image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, filters]);

  const filtersChanged = Object.keys(defaultFilters).some(
    (key) =>
      filters[key as keyof Filters] !== defaultFilters[key as keyof Filters],
  );

  const sliders: {
    key: keyof Filters;
    label: string;
    min: number;
    max: number;
    step: number;
    unit: string;
  }[] = [
    { key: "brightness", label: "Brightness", min: 0.5, max: 1.5, step: 0.01, unit: "" },
    { key: "contrast", label: "Contrast", min: 0.5, max: 1.5, step: 0.01, unit: "" },
    { key: "saturation", label: "Saturation", min: 0, max: 2, step: 0.01, unit: "" },
    { key: "blur", label: "Blur", min: 0, max: 10, step: 0.1, unit: "px" },
    { key: "grayscale", label: "Grayscale", min: 0, max: 100, step: 1, unit: "%" },
    { key: "sepia", label: "Sepia", min: 0, max: 100, step: 1, unit: "%" },
  ];

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
              onClick={handleClear}
              disabled={isProcessing}
              className="shrink-0 rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Change file
            </button>
          </div>

          {/* Canvas preview */}
          <div className="mt-4 flex justify-center">
            <canvas
              ref={canvasRef}
              className="max-h-80 max-w-full rounded-lg border border-[color:var(--color-border)] object-contain"
            />
          </div>

          {/* Filter sliders */}
          <fieldset className="mt-5 space-y-4">
            <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Adjustments
            </legend>
            {sliders.map(({ key, label, min, max, step, unit }) => (
              <div key={key}>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`filter-${key}`}
                    className="text-sm font-medium text-[color:var(--color-text-secondary)]"
                  >
                    {label}
                  </label>
                  <span className="text-xs tabular-nums text-[color:var(--color-text-muted)]">
                    {filters[key]}
                    {unit}
                  </span>
                </div>
                <input
                  id={`filter-${key}`}
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={filters[key]}
                  onChange={(e) => updateFilter(key, parseFloat(e.target.value))}
                  className="mt-1 w-full accent-violet-500"
                />
              </div>
            ))}
          </fieldset>

          {/* Reset filters button */}
          {filtersChanged && (
            <div className="mt-4">
              <button
                onClick={handleReset}
                disabled={isProcessing}
                className="rounded-lg border border-[color:var(--color-border)] px-4 py-2 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset filters
              </button>
            </div>
          )}

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

          {/* Download button */}
          {!isProcessing && (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <DownloadButton
                onClick={handleDownload}
                label="Download"
                className="flex-1"
              />
              <button
                onClick={handleClear}
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
