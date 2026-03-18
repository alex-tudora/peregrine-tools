"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Dropzone, ProgressBar, DownloadButton } from "@peregrine/ui";
import { pdfToImages, type RenderedPage } from "@/lib/convert";
import { downloadFile, downloadAsZip, readFileAsArrayBuffer } from "@/lib/download";

export function PdfToPngTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<RenderedPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const previewUrlsRef = useRef<string[]>([]);

  // Revoke object URLs on cleanup or when images change
  useEffect(() => {
    return () => {
      for (const url of previewUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  const revokeUrls = useCallback(() => {
    for (const url of previewUrlsRef.current) {
      URL.revokeObjectURL(url);
    }
    previewUrlsRef.current = [];
  }, []);

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0] ?? null);
    setImages([]);
    setProgress(0);
    setError(null);
    revokeUrls();
  }, [revokeUrls]);

  const handleConvert = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(10);
    setError(null);
    revokeUrls();

    try {
      const buffer = await readFileAsArrayBuffer(file);
      setProgress(30);

      const rendered = await pdfToImages(buffer, "png", 1.0);
      setProgress(90);

      // Create preview URLs
      const urls = rendered.map((img) => URL.createObjectURL(img.data));
      previewUrlsRef.current = urls;

      setImages(rendered);
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert PDF. Please try another file.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, revokeUrls]);

  const handleDownloadSingle = useCallback(
    (image: RenderedPage) => {
      const baseName = file?.name.replace(/\.pdf$/i, "") ?? "page";
      downloadFile(image.data, `${baseName}-page-${image.pageNumber}.png`);
    },
    [file],
  );

  const handleDownloadAll = useCallback(async () => {
    if (images.length === 0) return;

    const baseName = file?.name.replace(/\.pdf$/i, "") ?? "pages";
    const files = images.map((img) => ({
      data: img.data,
      name: `${baseName}-page-${img.pageNumber}.png`,
    }));

    await downloadAsZip(files, `${baseName}-png.zip`);
  }, [images, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setImages([]);
    setProgress(0);
    setError(null);
    setIsProcessing(false);
    revokeUrls();
  }, [revokeUrls]);

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      {!file && (
        <Dropzone
          accept={[".pdf"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your PDF file here"
        />
      )}

      {/* File info & controls */}
      {file && images.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {file.name}
              </p>
              <p className="text-xs text-slate-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-slate-400 hover:text-red-500 transition-colors"
              aria-label="Remove file"
            >
              Remove
            </button>
          </div>

          {/* Progress bar */}
          {isProcessing && <ProgressBar progress={progress} className="mt-5" />}

          {/* Convert button */}
          <div className="mt-5">
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all duration-200 hover:bg-sky-600 hover:shadow-md hover:shadow-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-sky-500"
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
                "Convert to PNG"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      {/* Results */}
      {images.length > 0 && (
        <div className="space-y-6">
          {/* Download all + reset */}
          <div className="flex flex-wrap items-center gap-3">
            <DownloadButton
              onClick={handleDownloadAll}
              label={`Download All as ZIP (${images.length} images)`}
            />
            <button
              onClick={handleReset}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              Convert Another
            </button>
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image, index) => (
              <div
                key={image.pageNumber}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrlsRef.current[index]}
                    alt={`Page ${image.pageNumber}`}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Info + download */}
                <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <span className="text-xs font-medium text-slate-500">
                    Page {image.pageNumber}
                  </span>
                  <button
                    onClick={() => handleDownloadSingle(image)}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-sky-600 transition-colors hover:bg-sky-50"
                    aria-label={`Download page ${image.pageNumber}`}
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
