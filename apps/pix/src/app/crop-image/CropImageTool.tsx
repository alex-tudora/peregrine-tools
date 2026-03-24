"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { cropImage, type CropRegion } from "@/lib/crop";
import { downloadBlob, formatFileSize, readFileAsDataUrl, loadImage } from "@/lib/download";

type PresetRatio = "free" | "1:1" | "4:3" | "16:9" | "3:2";

const PRESETS: { value: PresetRatio; label: string; ratio?: number }[] = [
  { value: "free", label: "Free" },
  { value: "1:1", label: "1:1", ratio: 1 },
  { value: "4:3", label: "4:3", ratio: 4 / 3 },
  { value: "16:9", label: "16:9", ratio: 16 / 9 },
  { value: "3:2", label: "3:2", ratio: 3 / 2 },
];

export default function CropImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  const [preset, setPreset] = useState<PresetRatio>("free");
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(0);
  const [cropH, setCropH] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultPreview, setResultPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

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
      setCropX(0);
      setCropY(0);
      setCropW(img.width);
      setCropH(img.height);
      setPreset("free");
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  // Apply preset ratio — fit the largest centered region
  const applyPreset = useCallback(
    (p: PresetRatio) => {
      setPreset(p);

      if (p === "free" || originalWidth === 0 || originalHeight === 0) return;

      const targetRatio = PRESETS.find((pr) => pr.value === p)?.ratio;
      if (!targetRatio) return;

      let w: number;
      let h: number;

      if (originalWidth / originalHeight > targetRatio) {
        // Image is wider than target ratio — constrain by height
        h = originalHeight;
        w = Math.round(h * targetRatio);
      } else {
        // Image is taller than target ratio — constrain by width
        w = originalWidth;
        h = Math.round(w / targetRatio);
      }

      const x = Math.round((originalWidth - w) / 2);
      const y = Math.round((originalHeight - h) / 2);

      setCropX(x);
      setCropY(y);
      setCropW(w);
      setCropH(h);
    },
    [originalWidth, originalHeight],
  );

  // When crop width changes and a preset is active, adjust height
  const handleCropWChange = useCallback(
    (newW: number) => {
      const clamped = Math.max(1, Math.min(newW, originalWidth - cropX));
      setCropW(clamped);

      if (preset !== "free") {
        const targetRatio = PRESETS.find((pr) => pr.value === preset)?.ratio;
        if (targetRatio) {
          const newH = Math.round(clamped / targetRatio);
          setCropH(Math.max(1, Math.min(newH, originalHeight - cropY)));
        }
      }
    },
    [preset, originalWidth, originalHeight, cropX, cropY],
  );

  // When crop height changes and a preset is active, adjust width
  const handleCropHChange = useCallback(
    (newH: number) => {
      const clamped = Math.max(1, Math.min(newH, originalHeight - cropY));
      setCropH(clamped);

      if (preset !== "free") {
        const targetRatio = PRESETS.find((pr) => pr.value === preset)?.ratio;
        if (targetRatio) {
          const newW = Math.round(clamped * targetRatio);
          setCropW(Math.max(1, Math.min(newW, originalWidth - cropX)));
        }
      }
    },
    [preset, originalWidth, originalHeight, cropX, cropY],
  );

  const handleCrop = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setResultBlob(null);
    setResultPreview(null);
    setError(null);

    try {
      const region: CropRegion = {
        x: cropX,
        y: cropY,
        width: cropW,
        height: cropH,
      };

      const blob = await cropImage(file, region, "png", 1);

      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultPreview(url);
    } catch {
      setError("Crop failed. The file may be corrupted or unsupported.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, cropX, cropY, cropW, cropH]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;

    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${baseName}-cropped.png`);
  }, [resultBlob, file]);

  const handleReset = useCallback(() => {
    if (resultPreview) URL.revokeObjectURL(resultPreview);
    setFile(null);
    setPreview(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setCropX(0);
    setCropY(0);
    setCropW(0);
    setCropH(0);
    setPreset("free");
    setIsProcessing(false);
    setResultBlob(null);
    setResultPreview(null);
    setError(null);
  }, [resultPreview]);

  // Compute overlay percentages for the visual crop preview
  const overlayStyle = {
    top: originalHeight > 0 ? `${(cropY / originalHeight) * 100}%` : "0%",
    left: originalWidth > 0 ? `${(cropX / originalWidth) * 100}%` : "0%",
    width: originalWidth > 0 ? `${(cropW / originalWidth) * 100}%` : "100%",
    height:
      originalHeight > 0 ? `${(cropH / originalHeight) * 100}%` : "100%",
  };

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
                {formatFileSize(file.size)} &middot; {originalWidth} &times;{" "}
                {originalHeight} px
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

          {/* Visual crop preview */}
          <div
            ref={containerRef}
            className="relative mt-4 flex justify-center"
          >
            <div className="relative inline-block max-w-full">
              {/* Base image with dimmed overlay */}
              <img
                src={preview}
                alt="Original"
                className="max-h-80 rounded-lg object-contain brightness-50"
              />
              {/* Highlighted crop region */}
              <div
                className="pointer-events-none absolute border-2 border-dashed border-violet-400 bg-[color:var(--color-bg-card)]/20"
                style={overlayStyle}
              />
            </div>
          </div>

          {/* Preset ratio buttons */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Aspect ratio
            </legend>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => {
                const isSelected = preset === p.value;
                return (
                  <button
                    key={p.value}
                    onClick={() => applyPreset(p.value)}
                    className={`
                      rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all
                      ${
                        isSelected
                          ? "border-violet-500 bg-violet-50/60 text-violet-700 ring-1 ring-violet-500/20"
                          : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] hover:border-[color:var(--color-border-hover)]"
                      }
                    `}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Manual crop region inputs */}
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <label
                htmlFor="crop-x"
                className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
              >
                X
              </label>
              <input
                id="crop-x"
                type="number"
                min={0}
                max={originalWidth - 1}
                value={cropX}
                onChange={(e) =>
                  setCropX(
                    Math.max(
                      0,
                      Math.min(parseInt(e.target.value, 10) || 0, originalWidth - 1),
                    ),
                  )
                }
                className="w-full rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <div>
              <label
                htmlFor="crop-y"
                className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
              >
                Y
              </label>
              <input
                id="crop-y"
                type="number"
                min={0}
                max={originalHeight - 1}
                value={cropY}
                onChange={(e) =>
                  setCropY(
                    Math.max(
                      0,
                      Math.min(parseInt(e.target.value, 10) || 0, originalHeight - 1),
                    ),
                  )
                }
                className="w-full rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <div>
              <label
                htmlFor="crop-w"
                className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
              >
                Width
              </label>
              <input
                id="crop-w"
                type="number"
                min={1}
                max={originalWidth - cropX}
                value={cropW}
                onChange={(e) =>
                  handleCropWChange(parseInt(e.target.value, 10) || 1)
                }
                className="w-full rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <div>
              <label
                htmlFor="crop-h"
                className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
              >
                Height
              </label>
              <input
                id="crop-h"
                type="number"
                min={1}
                max={originalHeight - cropY}
                value={cropH}
                onChange={(e) =>
                  handleCropHChange(parseInt(e.target.value, 10) || 1)
                }
                className="w-full rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* Crop button */}
          {!resultBlob && (
            <button
              onClick={handleCrop}
              disabled={isProcessing || cropW < 1 || cropH < 1}
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
                  Cropping...
                </>
              ) : (
                "Crop Image"
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
                  alt="Cropped"
                  className="max-h-64 rounded-lg border border-[color:var(--color-border)] object-contain"
                />
              </div>

              {/* Size info */}
              <div className="rounded-lg bg-[color:var(--color-bg-elevated)] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">Original</span>
                  <span className="font-medium text-[color:var(--color-text-primary)]">
                    {originalWidth} &times; {originalHeight} px &middot;{" "}
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">Cropped</span>
                  <span className="font-medium text-[color:var(--color-text-primary)]">
                    {cropW} &times; {cropH} px &middot;{" "}
                    {formatFileSize(resultBlob.size)}
                  </span>
                </div>
              </div>

              {/* Download + reset actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Cropped Image"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  Crop another
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
