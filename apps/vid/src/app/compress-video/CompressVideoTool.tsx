"use client";

import { useState, useCallback, useMemo } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { getFFmpeg, getFetchFile } from "@/lib/ffmpeg";
import { downloadBlob, formatFileSize } from "@/lib/download";

type CompressionLevel = "low" | "medium" | "high";

const COMPRESSION_OPTIONS: {
  value: CompressionLevel;
  label: string;
  description: string;
  crf: string;
}[] = [
  {
    value: "low",
    label: "Low",
    description: "Near-lossless quality",
    crf: "18",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Great balance",
    crf: "28",
  },
  {
    value: "high",
    label: "High",
    description: "Maximum reduction",
    crf: "35",
  },
];

export function CompressVideoTool() {
  const [file, setFile] = useState<File | null>(null);
  const [compression, setCompression] = useState<CompressionLevel>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");

  const handleFiles = useCallback((files: File[]) => {
    const selected = files[0];
    if (!selected) return;
    setError(null);
    setResultBlob(null);
    setProgress("");
    setFile(selected);
  }, []);

  const handleCompress = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setResultBlob(null);
    setError(null);
    setProgress("Loading FFmpeg...");

    try {
      const ffmpeg = await getFFmpeg();
      const fetchFile = await getFetchFile();

      setProgress("Reading file...");
      const inputName = "input" + file.name.substring(file.name.lastIndexOf("."));
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      const crf =
        COMPRESSION_OPTIONS.find((o) => o.value === compression)?.crf ?? "28";

      setProgress("Compressing video...");
      await ffmpeg.exec([
        "-i",
        inputName,
        "-c:v",
        "libx264",
        "-crf",
        crf,
        "-preset",
        "fast",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "output.mp4",
      ]);

      const data = await ffmpeg.readFile("output.mp4");
      const blob = new Blob([data], { type: "video/mp4" });
      setResultBlob(blob);
      setProgress("");

      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile("output.mp4");
    } catch (err) {
      console.error(err);
      setError(
        "Compression failed. FFmpeg.wasm may not be supported in your browser, or the file may be corrupted. Please try a modern Chrome or Firefox browser."
      );
      setProgress("");
    } finally {
      setIsProcessing(false);
    }
  }, [file, compression]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${baseName}-compressed.mp4`);
  }, [resultBlob, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setCompression("medium");
    setIsProcessing(false);
    setResultBlob(null);
    setError(null);
    setProgress("");
  }, []);

  const reductionPercent = useMemo(() => {
    if (!file || !resultBlob) return 0;
    return Math.round(((file.size - resultBlob.size) / file.size) * 100);
  }, [file, resultBlob]);

  return (
    <div className="space-y-6">
      {!file && (
        <Dropzone
          accept={[".mp4", ".avi", ".mov", ".mkv", ".wmv", ".flv", ".webm"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your video file here"
        />
      )}

      {file && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
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

          {/* Compression level selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-slate-700">
              Compression level
            </legend>
            <div className="grid grid-cols-3 gap-2.5">
              {COMPRESSION_OPTIONS.map((option) => {
                const isSelected = compression === option.value;
                return (
                  <label
                    key={option.value}
                    className={`
                      flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 px-4 py-3 text-center transition-all
                      ${
                        isSelected
                          ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)]"
                          : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="compression"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => setCompression(option.value)}
                      className="sr-only"
                    />
                    <span className="text-sm font-semibold">{option.label}</span>
                    <span className="mt-0.5 text-xs opacity-70">
                      {option.description}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {!resultBlob && (
            <button
              onClick={handleCompress}
              disabled={isProcessing}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[color:var(--color-accent)]"
            >
              {isProcessing ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {progress || "Compressing..."}
                </>
              ) : (
                "Compress Video"
              )}
            </button>
          )}

          {resultBlob && (
            <div className="mt-5 space-y-4">
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

              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Compressed Video"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Compress another
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
