"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { Dropzone, DownloadButton, logActivity } from "@peregrine/ui";
import { cropImage, type CropRegion } from "@/lib/crop";
import {
  downloadBlob,
  downloadAsZip,
  formatFileSize,
  readFileAsDataUrl,
  loadImage,
} from "@/lib/download";

type PresetRatio = "free" | "1:1" | "4:3" | "16:9" | "3:2";
type CropMode = "custom" | "center";

const PRESETS: { value: PresetRatio; label: string; ratio?: number }[] = [
  { value: "free", label: "Free" },
  { value: "1:1", label: "1:1", ratio: 1 },
  { value: "4:3", label: "4:3", ratio: 4 / 3 },
  { value: "16:9", label: "16:9", ratio: 16 / 9 },
  { value: "3:2", label: "3:2", ratio: 3 / 2 },
];

interface FileEntry {
  file: File;
  preview: string;
  naturalWidth: number;
  naturalHeight: number;
  resultBlob: Blob | null;
  resultPreview: string | null;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export default function CropImageTool() {
  const [entries, setEntries] = useState<FileEntry[]>([]);

  // Crop mode
  const [cropMode, setCropMode] = useState<CropMode>("custom");

  // Custom mode: interactive crop on first image (pixel values relative to first image)
  const [preset, setPreset] = useState<PresetRatio>("free");
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(0);
  const [cropH, setCropH] = useState(0);

  // Center crop mode: target pixel dimensions
  const [centerW, setCenterW] = useState(800);
  const [centerH, setCenterH] = useState(600);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // First image dimensions (used for custom mode preview & ratio math)
  const firstEntry = entries[0] ?? null;
  const originalWidth = firstEntry?.naturalWidth ?? 0;
  const originalHeight = firstEntry?.naturalHeight ?? 0;

  /* ------------------------------------------------------------------ */
  /*  File handling                                                      */
  /* ------------------------------------------------------------------ */

  const handleFiles = useCallback(async (files: File[]) => {
    setError(null);

    const newEntries: FileEntry[] = [];
    for (const file of files) {
      try {
        const dataUrl = await readFileAsDataUrl(file);
        const img = await loadImage(dataUrl);
        newEntries.push({
          file,
          preview: dataUrl,
          naturalWidth: img.width,
          naturalHeight: img.height,
          resultBlob: null,
          resultPreview: null,
          status: "pending",
        });
      } catch {
        // skip unreadable files
      }
    }

    if (newEntries.length === 0) {
      setError("Failed to read the selected files. Please try again.");
      return;
    }

    setEntries((prev) => {
      const merged = [...prev, ...newEntries];
      // If this is the very first upload, initialize custom crop to full first image
      if (prev.length === 0 && merged.length > 0) {
        const first = merged[0];
        setCropX(0);
        setCropY(0);
        setCropW(first.naturalWidth);
        setCropH(first.naturalHeight);
        setPreset("free");
      }
      return merged;
    });
  }, []);

  const handleRemove = useCallback(
    (index: number) => {
      setEntries((prev) => {
        const next = prev.filter((_, i) => i !== index);
        // If the first image was removed, re-initialize crop to new first image
        if (index === 0 && next.length > 0) {
          setCropX(0);
          setCropY(0);
          setCropW(next[0].naturalWidth);
          setCropH(next[0].naturalHeight);
          setPreset("free");
        }
        return next;
      });
    },
    [],
  );

  /* ------------------------------------------------------------------ */
  /*  Preset ratio logic (operates on first image dimensions)           */
  /* ------------------------------------------------------------------ */

  const applyPreset = useCallback(
    (p: PresetRatio) => {
      setPreset(p);

      if (p === "free" || originalWidth === 0 || originalHeight === 0) return;

      const targetRatio = PRESETS.find((pr) => pr.value === p)?.ratio;
      if (!targetRatio) return;

      let w: number;
      let h: number;

      if (originalWidth / originalHeight > targetRatio) {
        h = originalHeight;
        w = Math.round(h * targetRatio);
      } else {
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

  /* ------------------------------------------------------------------ */
  /*  Crop processing                                                   */
  /* ------------------------------------------------------------------ */

  const computeRegionForEntry = useCallback(
    (entry: FileEntry): CropRegion => {
      if (cropMode === "center") {
        // Center crop: clamp target size to image, then center
        const w = Math.min(centerW, entry.naturalWidth);
        const h = Math.min(centerH, entry.naturalHeight);
        const x = Math.round((entry.naturalWidth - w) / 2);
        const y = Math.round((entry.naturalHeight - h) / 2);
        return { x, y, width: w, height: h };
      }

      // Custom mode: apply percentages from first-image crop region to each image
      if (originalWidth === 0 || originalHeight === 0) {
        return { x: 0, y: 0, width: entry.naturalWidth, height: entry.naturalHeight };
      }

      const pctX = cropX / originalWidth;
      const pctY = cropY / originalHeight;
      const pctW = cropW / originalWidth;
      const pctH = cropH / originalHeight;

      const x = Math.round(pctX * entry.naturalWidth);
      const y = Math.round(pctY * entry.naturalHeight);
      const w = Math.max(1, Math.min(Math.round(pctW * entry.naturalWidth), entry.naturalWidth - x));
      const h = Math.max(1, Math.min(Math.round(pctH * entry.naturalHeight), entry.naturalHeight - y));

      return { x, y, width: w, height: h };
    },
    [cropMode, cropX, cropY, cropW, cropH, originalWidth, originalHeight, centerW, centerH],
  );

  const handleCrop = useCallback(async () => {
    setIsProcessing(true);
    setError(null);

    for (let i = 0; i < entries.length; i++) {
      if (entries[i].status === "done") continue;

      setEntries((prev) =>
        prev.map((e, j) => (j === i ? { ...e, status: "processing" } : e)),
      );

      try {
        const region = computeRegionForEntry(entries[i]);
        const blob = await cropImage(entries[i].file, region, "png", 1);
        const resultPreview = URL.createObjectURL(blob);

        setEntries((prev) =>
          prev.map((e, j) =>
            j === i ? { ...e, resultBlob: blob, resultPreview, status: "done" } : e,
          ),
        );
      } catch {
        setEntries((prev) =>
          prev.map((e, j) =>
            j === i ? { ...e, status: "error", error: "Crop failed" } : e,
          ),
        );
      }
    }

    setIsProcessing(false);
  }, [entries, computeRegionForEntry]);

  /* ------------------------------------------------------------------ */
  /*  Derived state                                                     */
  /* ------------------------------------------------------------------ */

  const doneEntries = useMemo(() => entries.filter((e) => e.status === "done"), [entries]);
  const allDone = entries.length > 0 && doneEntries.length === entries.length;
  const hasEntries = entries.length > 0;

  /* ------------------------------------------------------------------ */
  /*  Downloads                                                         */
  /* ------------------------------------------------------------------ */

  const handleDownload = useCallback((entry: FileEntry) => {
    if (!entry.resultBlob) return;
    const baseName = entry.file.name.replace(/\.[^.]+$/, "");
    downloadBlob(entry.resultBlob, `${baseName}-cropped.png`);
    logActivity({ tool: "Crop Image", toolHref: "/crop-image", description: "Cropped images" });
  }, []);

  const handleDownloadAll = useCallback(async () => {
    const files = doneEntries.map((entry) => ({
      data: entry.resultBlob!,
      name: `${entry.file.name.replace(/\.[^.]+$/, "")}-cropped.png`,
    }));
    await downloadAsZip(files, "cropped-images.zip");
    logActivity({ tool: "Crop Image", toolHref: "/crop-image", description: "Cropped images" });
  }, [doneEntries]);

  /* ------------------------------------------------------------------ */
  /*  Reset                                                             */
  /* ------------------------------------------------------------------ */

  const handleReset = useCallback(() => {
    // Revoke any object URLs we created
    for (const entry of entries) {
      if (entry.resultPreview) URL.revokeObjectURL(entry.resultPreview);
    }
    setEntries([]);
    setCropMode("custom");
    setPreset("free");
    setCropX(0);
    setCropY(0);
    setCropW(0);
    setCropH(0);
    setCenterW(800);
    setCenterH(600);
    setIsProcessing(false);
    setError(null);
  }, [entries]);

  /* ------------------------------------------------------------------ */
  /*  Overlay style for visual crop preview                             */
  /* ------------------------------------------------------------------ */

  const overlayStyle = {
    top: originalHeight > 0 ? `${(cropY / originalHeight) * 100}%` : "0%",
    left: originalWidth > 0 ? `${(cropX / originalWidth) * 100}%` : "0%",
    width: originalWidth > 0 ? `${(cropW / originalWidth) * 100}%` : "100%",
    height: originalHeight > 0 ? `${(cropH / originalHeight) * 100}%` : "100%",
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */

  return (
    <div className="space-y-6">
      {/* Dropzone — visible when not processing and not all done */}
      {!isProcessing && !allDone && (
        <Dropzone
          accept={[".jpg", ".jpeg", ".png", ".webp"]}
          multiple={true}
          onFiles={handleFiles}
          label={entries.length === 0 ? "Drop your image files here" : "Drop more images to add"}
        />
      )}

      {/* Main card */}
      {hasEntries && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
          {/* File list header */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[color:var(--color-text-primary)]">
              {entries.length} file{entries.length !== 1 ? "s" : ""}
            </p>
            {!isProcessing && (
              <button
                onClick={handleReset}
                className="shrink-0 rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
              >
                Clear all
              </button>
            )}
          </div>

          {/* File list with thumbnails */}
          <div className="mt-2 max-h-48 space-y-1.5 overflow-y-auto">
            {entries.map((entry, i) => (
              <div
                key={`${entry.file.name}-${i}`}
                className="flex items-center gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-3 py-2"
              >
                <img
                  src={entry.preview}
                  alt=""
                  className="h-8 w-8 shrink-0 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-[color:var(--color-text-primary)]">
                    {entry.file.name}
                    {i === 0 && cropMode === "custom" && !allDone && (
                      <span className="ml-1.5 text-[10px] font-normal text-[color:var(--color-accent)]">
                        (preview)
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-[color:var(--color-text-muted)]">
                    {formatFileSize(entry.file.size)} &middot; {entry.naturalWidth} &times; {entry.naturalHeight} px
                    {entry.status === "done" && entry.resultBlob && (
                      <span className="text-emerald-600">
                        {" → "}{formatFileSize(entry.resultBlob.size)}
                      </span>
                    )}
                    {entry.status === "processing" && (
                      <span className="text-[color:var(--color-accent)]"> Cropping...</span>
                    )}
                    {entry.status === "error" && (
                      <span className="text-red-500"> Failed</span>
                    )}
                  </p>
                </div>
                {!isProcessing && entry.status !== "processing" && (
                  <button
                    onClick={() =>
                      entry.status === "done" ? handleDownload(entry) : handleRemove(i)
                    }
                    className="shrink-0 text-xs font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]"
                  >
                    {entry.status === "done" ? "↓" : "✕"}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Controls — hidden once all done */}
          {!allDone && (
            <>
              {/* Crop mode toggle */}
              <fieldset className="mt-5">
                <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
                  Crop mode
                </legend>
                <div className="grid grid-cols-2 gap-2.5">
                  {(
                    [
                      { value: "custom", label: "Custom region" },
                      { value: "center", label: "Center crop" },
                    ] as const
                  ).map((option) => {
                    const isSelected = cropMode === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`
                          flex cursor-pointer items-center justify-center rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all
                          ${
                            isSelected
                              ? "border-violet-500 bg-violet-50/60 text-violet-700 ring-1 ring-violet-500/20"
                              : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] hover:border-[color:var(--color-border-hover)]"
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="crop-mode"
                          value={option.value}
                          checked={isSelected}
                          onChange={() => setCropMode(option.value)}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                  {cropMode === "custom"
                    ? "Define a crop region on the first image. The same proportional area is applied to all images."
                    : "Enter a target width and height. Each image is center-cropped to those dimensions (or its full size if smaller)."}
                </p>
              </fieldset>

              {/* Custom mode controls */}
              {cropMode === "custom" && firstEntry && (
                <>
                  {/* Visual crop preview on first image */}
                  <div
                    ref={containerRef}
                    className="relative mt-4 flex justify-center"
                  >
                    <div className="relative inline-block max-w-full">
                      <img
                        src={firstEntry.preview}
                        alt="Original"
                        className="max-h-80 rounded-lg object-contain brightness-50"
                      />
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
                </>
              )}

              {/* Center crop mode controls */}
              {cropMode === "center" && (
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="center-w"
                      className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
                    >
                      Target width (px)
                    </label>
                    <input
                      id="center-w"
                      type="number"
                      min={1}
                      value={centerW}
                      onChange={(e) => setCenterW(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-full rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="center-h"
                      className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
                    >
                      Target height (px)
                    </label>
                    <input
                      id="center-h"
                      type="number"
                      min={1}
                      value={centerH}
                      onChange={(e) => setCenterH(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-full rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>
              )}

              {/* Crop button */}
              <button
                onClick={handleCrop}
                disabled={
                  isProcessing ||
                  entries.length === 0 ||
                  (cropMode === "custom" && (cropW < 1 || cropH < 1)) ||
                  (cropMode === "center" && (centerW < 1 || centerH < 1))
                }
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
                    Cropping {doneEntries.length + 1} of {entries.length}...
                  </>
                ) : (
                  `Crop ${entries.length} Image${entries.length !== 1 ? "s" : ""}`
                )}
              </button>
            </>
          )}

          {/* Results */}
          {allDone && (
            <div className="mt-5 space-y-4">
              {/* Single-image result preview */}
              {entries.length === 1 && entries[0].resultPreview && (
                <div className="flex justify-center">
                  <img
                    src={entries[0].resultPreview}
                    alt="Cropped"
                    className="max-h-64 rounded-lg border border-[color:var(--color-border)] object-contain"
                  />
                </div>
              )}

              {/* Summary */}
              <div className="rounded-lg bg-[color:var(--color-bg-elevated)] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">
                    {entries.length} file{entries.length !== 1 ? "s" : ""} cropped
                  </span>
                  <span className="font-medium text-[color:var(--color-text-primary)]">
                    {cropMode === "custom"
                      ? `Region: ${cropW} × ${cropH} px (proportional)`
                      : `Center: ${centerW} × ${centerH} px`}
                  </span>
                </div>
              </div>

              {/* Download actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                {entries.length > 1 ? (
                  <DownloadButton
                    onClick={handleDownloadAll}
                    label="Download All as ZIP"
                    className="flex-1"
                  />
                ) : (
                  <DownloadButton
                    onClick={() => handleDownload(entries[0])}
                    label="Download Cropped Image"
                    className="flex-1"
                  />
                )}
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  Crop more
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
