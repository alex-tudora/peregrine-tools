"use client";

import { useState, useCallback } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { generateFavicons, type FaviconResult } from "@/lib/favicon";
import { downloadAsZip, formatFileSize, readFileAsDataUrl } from "@/lib/download";

const FAVICON_SIZES = [16, 32, 48, 64, 128, 192, 512] as const;

export function FaviconGeneratorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<FaviconResult | null>(null);
  const [previewUrls, setPreviewUrls] = useState<Map<number, string>>(new Map());
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);
    setResult(null);
    setPreviewUrls(new Map());

    try {
      const dataUrl = await readFileAsDataUrl(selected);
      setFile(selected);
      setPreview(dataUrl);
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setResult(null);
    setPreviewUrls(new Map());
    setError(null);

    try {
      const faviconResult = await generateFavicons(file);
      setResult(faviconResult);

      // Create preview URLs for each size
      const urls = new Map<number, string>();
      for (const item of faviconResult.sizes) {
        urls.set(item.size, URL.createObjectURL(item.blob));
      }
      setPreviewUrls(urls);
    } catch {
      setError("Favicon generation failed. The file may be corrupted or unsupported.");
    } finally {
      setIsProcessing(false);
    }
  }, [file]);

  const handleDownloadZip = useCallback(async () => {
    if (!result) return;

    const files = result.sizes.map((item) => ({
      data: item.blob,
      name: item.name,
    }));

    await downloadAsZip(files, "favicons.zip");
  }, [result]);

  const handleReset = useCallback(() => {
    // Revoke all preview URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    setFile(null);
    setPreview(null);
    setIsProcessing(false);
    setResult(null);
    setPreviewUrls(new Map());
    setError(null);
  }, [previewUrls]);

  return (
    <div className="space-y-6">
      {/* Dropzone — only visible when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".jpg", ".jpeg", ".png", ".webp", ".svg"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your image or SVG file here"
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
                {formatFileSize(file.size)}
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

          {/* Source image preview */}
          <div className="mt-4 flex justify-center">
            <img
              src={preview}
              alt="Source"
              className="max-h-48 rounded-lg border border-slate-100 object-contain"
            />
          </div>

          {/* Sizes to be generated */}
          {!result && (
            <>
              <div className="mt-5">
                <p className="mb-2.5 text-sm font-medium text-slate-700">
                  Sizes to generate
                </p>
                <div className="flex flex-wrap gap-2">
                  {FAVICON_SIZES.map((size) => (
                    <span
                      key={size}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {size}&times;{size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
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
                    Generating...
                  </>
                ) : (
                  "Generate Favicons"
                )}
              </button>
            </>
          )}

          {/* Generated favicon grid */}
          {result && (
            <div className="mt-5 space-y-4">
              <p className="text-sm font-medium text-slate-700">
                Generated favicons
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {result.sizes.map((item) => {
                  const url = previewUrls.get(item.size);
                  return (
                    <div
                      key={item.size}
                      className="flex flex-col items-center rounded-lg border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="flex h-16 w-16 items-center justify-center">
                        {url && (
                          <img
                            src={url}
                            alt={`${item.size}x${item.size}`}
                            className="max-h-16 max-w-16 object-contain"
                            style={{
                              imageRendering: item.size <= 32 ? "pixelated" : "auto",
                            }}
                          />
                        )}
                      </div>
                      <p className="mt-2 text-xs font-medium text-slate-600">
                        {item.size}&times;{item.size}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatFileSize(item.blob.size)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Download all + reset */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownloadZip}
                  label="Download All as ZIP"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  Generate from another image
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
