"use client";

import { useState, useCallback } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { svgToPng } from "@/lib/convert";
import { downloadBlob, formatFileSize, readFileAsDataUrl } from "@/lib/download";

type Scale = 1 | 2 | 3 | 4;

const SCALE_OPTIONS: { value: Scale; label: string }[] = [
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
  { value: 3, label: "3x" },
  { value: 4, label: "4x" },
];

export function SvgToPngTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [scale, setScale] = useState<Scale>(2);
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
      setError("Failed to read the selected SVG file. Please try again.");
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setResultBlob(null);
    setError(null);

    try {
      const blob = await svgToPng(file, scale);
      setResultBlob(blob);
    } catch {
      setError("Conversion failed. The SVG file may be invalid or corrupted.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, scale]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;

    const baseName = file.name.replace(/\.svg$/i, "");
    downloadBlob(resultBlob, `${baseName}-${scale}x.png`);
  }, [resultBlob, file, scale]);

  const handleReset = useCallback(() => {
    setFile(null);
    setPreview(null);
    setScale(2);
    setIsProcessing(false);
    setResultBlob(null);
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone — only visible when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".svg"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your SVG file here"
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

          {/* SVG preview */}
          <div className="mt-4 flex justify-center">
            <img
              src={preview}
              alt="SVG preview"
              className="max-h-64 rounded-lg border border-slate-100 object-contain"
            />
          </div>

          {/* Scale selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-slate-700">
              Output scale
            </legend>
            <div className="grid grid-cols-4 gap-2.5">
              {SCALE_OPTIONS.map((option) => {
                const isSelected = scale === option.value;
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
                      name="scale"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => {
                        setScale(option.value);
                        setResultBlob(null);
                      }}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Convert button */}
          {!resultBlob && (
            <button
              onClick={handleConvert}
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
                  Converting...
                </>
              ) : (
                "Convert to PNG"
              )}
            </button>
          )}

          {/* Result */}
          {resultBlob && (
            <div className="mt-5 space-y-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Original SVG</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">PNG ({scale}x)</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(resultBlob.size)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download PNG"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  Convert another
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
