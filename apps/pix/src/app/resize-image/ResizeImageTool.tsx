"use client";

import { useState, useCallback, useEffect } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { resizeImage } from "@/lib/resize";
import { downloadBlob, formatFileSize, readFileAsDataUrl, loadImage } from "@/lib/download";

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

export default function ResizeImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  const [mode, setMode] = useState<ResizeMode>("dimensions");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [percentage, setPercentage] = useState(50);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [format, setFormat] = useState<OutputFormat>("png");

  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultPreview, setResultPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const aspectRatio =
    originalWidth > 0 && originalHeight > 0
      ? originalWidth / originalHeight
      : 1;

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);
    setResultBlob(null);
    setResultPreview(null);

    try {
      const dataUrl = await readFileAsDataUrl(selected);
      const img = await loadImage(dataUrl);

      setFile(selected);
      setPreview(dataUrl);
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setWidth(img.width);
      setHeight(img.height);
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
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
    if (!file) return;

    setIsProcessing(true);
    setResultBlob(null);
    setResultPreview(null);
    setError(null);

    try {
      const blob = await resizeImage(file, {
        ...(mode === "percentage"
          ? { percentage }
          : { width, height }),
        maintainAspectRatio,
        format,
        quality: 0.9,
      });

      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultPreview(url);
    } catch {
      setError("Resize failed. The file may be corrupted or unsupported.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, mode, width, height, percentage, maintainAspectRatio, format]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;

    const baseName = file.name.replace(/\.[^.]+$/, "");
    const ext = FORMAT_EXTENSIONS[format];
    downloadBlob(resultBlob, `${baseName}-resized.${ext}`);
  }, [resultBlob, file, format]);

  const handleReset = useCallback(() => {
    if (resultPreview) URL.revokeObjectURL(resultPreview);
    setFile(null);
    setPreview(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth(0);
    setHeight(0);
    setPercentage(50);
    setMaintainAspectRatio(true);
    setMode("dimensions");
    setFormat("png");
    setIsProcessing(false);
    setResultBlob(null);
    setResultPreview(null);
    setError(null);
  }, [resultPreview]);

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
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          {/* Uploaded file summary */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {formatFileSize(file.size)} &middot; {originalWidth} &times;{" "}
                {originalHeight} px
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

          {/* Image preview */}
          <div className="mt-4 flex justify-center">
            <img
              src={preview}
              alt="Original"
              className="max-h-64 rounded-lg border border-slate-100 object-contain"
            />
          </div>

          {/* Resize mode selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-slate-700">
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
                          : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
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

          {/* Dimension inputs */}
          {mode === "dimensions" && (
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="resize-width"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
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
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="resize-height"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
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
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-violet-500 focus:ring-violet-500"
                />
                Maintain aspect ratio
              </label>
            </div>
          )}

          {/* Percentage input */}
          {mode === "percentage" && (
            <div className="mt-5">
              <label
                htmlFor="resize-percentage"
                className="mb-1.5 block text-sm font-medium text-slate-700"
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
                  className="w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
                <span className="text-sm text-slate-500">
                  %&ensp;&rarr;&ensp;
                  {Math.round(originalWidth * (percentage / 100))} &times;{" "}
                  {Math.round(originalHeight * (percentage / 100))} px
                </span>
              </div>
            </div>
          )}

          {/* Output format selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-slate-700">
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
                          : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
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

          {/* Resize button */}
          {!resultBlob && (
            <button
              onClick={handleResize}
              disabled={isProcessing}
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
                  Resizing...
                </>
              ) : (
                "Resize Image"
              )}
            </button>
          )}

          {/* Results */}
          {resultBlob && resultPreview && (
            <div className="mt-5 space-y-4">
              {/* Result preview */}
              <div className="flex justify-center">
                <img
                  src={resultPreview}
                  alt="Resized"
                  className="max-h-64 rounded-lg border border-slate-100 object-contain"
                />
              </div>

              {/* Size info */}
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Original</span>
                  <span className="font-medium text-slate-900">
                    {originalWidth} &times; {originalHeight} px &middot;{" "}
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Resized</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(resultBlob.size)}
                  </span>
                </div>
              </div>

              {/* Download + reset actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Resized Image"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  Resize another
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
