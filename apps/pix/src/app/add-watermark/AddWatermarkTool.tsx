"use client";

import { useState, useCallback } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { addWatermark, type WatermarkOptions } from "@/lib/watermark";
import { downloadBlob, formatFileSize, readFileAsDataUrl } from "@/lib/download";

type WatermarkColor = "gray" | "red" | "blue" | "black";
type WatermarkPosition = "diagonal" | "center" | "bottom-right";

const COLOR_OPTIONS: { name: WatermarkColor; label: string; value: string }[] = [
  { name: "gray", label: "Gray", value: "#808080" },
  { name: "red", label: "Red", value: "#cc1a1a" },
  { name: "blue", label: "Blue", value: "#1a1acc" },
  { name: "black", label: "Black", value: "#000000" },
];

const POSITION_OPTIONS: { value: WatermarkPosition; label: string }[] = [
  { value: "diagonal", label: "Diagonal" },
  { value: "center", label: "Center" },
  { value: "bottom-right", label: "Bottom-right" },
];

export function AddWatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(0.3);
  const [color, setColor] = useState<WatermarkColor>("gray");
  const [position, setPosition] = useState<WatermarkPosition>("diagonal");
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

  const handleWatermark = useCallback(async () => {
    if (!file || !text.trim()) return;

    setIsProcessing(true);
    setResultBlob(null);
    setError(null);

    try {
      const colorValue = COLOR_OPTIONS.find((c) => c.name === color)?.value ?? "#808080";
      const options: WatermarkOptions = {
        text: text.trim(),
        fontSize,
        opacity,
        color: colorValue,
        position,
      };
      const blob = await addWatermark(file, options);
      setResultBlob(blob);
    } catch {
      setError("Failed to add watermark. The file may be corrupted or unsupported.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, text, fontSize, opacity, color, position]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;

    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${baseName}-watermarked.png`);
  }, [resultBlob, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setPreview(null);
    setText("CONFIDENTIAL");
    setFontSize(32);
    setOpacity(0.3);
    setColor("gray");
    setPosition("diagonal");
    setIsProcessing(false);
    setResultBlob(null);
    setError(null);
  }, []);

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

          {/* Watermark text */}
          <div className="mt-5">
            <label
              htmlFor="watermark-text"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Watermark text
            </label>
            <input
              id="watermark-text"
              type="text"
              placeholder="e.g. CONFIDENTIAL, DRAFT, DO NOT COPY"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setResultBlob(null);
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          {/* Font size slider */}
          <div className="mt-5">
            <label
              htmlFor="font-size"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Font size: {fontSize}px
            </label>
            <input
              id="font-size"
              type="range"
              min={16}
              max={72}
              step={1}
              value={fontSize}
              onChange={(e) => {
                setFontSize(Number(e.target.value));
                setResultBlob(null);
              }}
              className="w-full accent-violet-500"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>16px</span>
              <span>72px</span>
            </div>
          </div>

          {/* Opacity slider */}
          <div className="mt-5">
            <label
              htmlFor="opacity"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Opacity: {Math.round(opacity * 100)}%
            </label>
            <input
              id="opacity"
              type="range"
              min={0.1}
              max={1.0}
              step={0.1}
              value={opacity}
              onChange={(e) => {
                setOpacity(Number(e.target.value));
                setResultBlob(null);
              }}
              className="w-full accent-violet-500"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Color selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-slate-700">
              Color
            </legend>
            <div className="flex flex-wrap gap-3">
              {COLOR_OPTIONS.map((opt) => {
                const isSelected = color === opt.name;
                return (
                  <label
                    key={opt.name}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none ${
                      isSelected
                        ? "border-violet-300 bg-violet-50 text-violet-700 font-medium"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="watermark-color"
                      checked={isSelected}
                      onChange={() => {
                        setColor(opt.name);
                        setResultBlob(null);
                      }}
                      className="sr-only"
                    />
                    <span
                      className="inline-block h-3.5 w-3.5 rounded-full border border-slate-300"
                      style={{ backgroundColor: opt.value }}
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Position selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-slate-700">
              Position
            </legend>
            <div className="flex flex-wrap gap-3">
              {POSITION_OPTIONS.map((opt) => {
                const isSelected = position === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none ${
                      isSelected
                        ? "border-violet-300 bg-violet-50 text-violet-700 font-medium"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="watermark-position"
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => {
                        setPosition(opt.value);
                        setResultBlob(null);
                      }}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Action button */}
          {!resultBlob && (
            <button
              onClick={handleWatermark}
              disabled={isProcessing || !text.trim()}
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
                  Adding Watermark...
                </>
              ) : (
                "Add Watermark"
              )}
            </button>
          )}

          {/* Result */}
          {resultBlob && (
            <div className="mt-5 space-y-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Original</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Watermarked</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(resultBlob.size)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Watermarked Image"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  Watermark another
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
