"use client";

import { useState, useCallback, useMemo } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { compressImage, type CompressOptions } from "@/lib/compress";
import { downloadBlob, formatFileSize, readFileAsDataUrl } from "@/lib/download";

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

export default function CompressImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState<OutputFormat>("jpeg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);
    setResultBlob(null);

    try {
      const dataUrl = await readFileAsDataUrl(selected);
      setFile(selected);
      setPreview(dataUrl);
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  const handleCompress = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setResultBlob(null);
    setError(null);

    try {
      const options: CompressOptions = { quality, format };
      const result = await compressImage(file, options);
      setResultBlob(result.blob);
    } catch {
      setError("Compression failed. The file may be corrupted or unsupported.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, quality, format]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;

    const baseName = file.name.replace(/\.[^.]+$/, "");
    const ext = FORMAT_EXTENSIONS[format];
    downloadBlob(resultBlob, `${baseName}-compressed.${ext}`);
  }, [resultBlob, file, format]);

  const handleReset = useCallback(() => {
    setFile(null);
    setPreview(null);
    setQuality(0.7);
    setFormat("jpeg");
    setIsProcessing(false);
    setResultBlob(null);
    setError(null);
  }, []);

  const reductionPercent = useMemo(() => {
    if (!file || !resultBlob) return 0;
    return Math.round(((file.size - resultBlob.size) / file.size) * 100);
  }, [file, resultBlob]);

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

          {/* Image preview */}
          <div className="mt-4 flex justify-center">
            <img
              src={preview}
              alt="Original"
              className="max-h-64 rounded-lg border border-slate-100 object-contain"
            />
          </div>

          {/* Quality slider */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-slate-700">
              Quality: {quality.toFixed(1)}
            </legend>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>Smaller file</span>
              <span>Higher quality</span>
            </div>
          </fieldset>

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
                      name="format"
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

          {/* Compress button */}
          {!resultBlob && (
            <button
              onClick={handleCompress}
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
                  Compressing...
                </>
              ) : (
                "Compress Image"
              )}
            </button>
          )}

          {/* Results */}
          {resultBlob && (
            <div className="mt-5 space-y-4">
              {/* Size comparison */}
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Original size</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Compressed size</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(resultBlob.size)}
                  </span>
                </div>
                <div className="mt-3 border-t border-slate-200 pt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    Reduction
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      reductionPercent > 0
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {reductionPercent > 0
                      ? `Reduced by ${reductionPercent}%`
                      : reductionPercent === 0
                        ? "No size change"
                        : `Increased by ${Math.abs(reductionPercent)}%`}
                  </span>
                </div>
              </div>

              {/* Download + reset actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Compressed Image"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  Compress another
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}
