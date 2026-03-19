"use client";

import { useState, useCallback, useMemo } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { getFFmpeg, getFetchFile } from "@/lib/ffmpeg";
import { downloadBlob, formatFileSize } from "@/lib/download";

type Bitrate = "64" | "128" | "192" | "256";

const BITRATE_OPTIONS: { value: Bitrate; label: string; description: string }[] = [
  { value: "64", label: "64 kbps", description: "Voice / Speech" },
  { value: "128", label: "128 kbps", description: "Good balance" },
  { value: "192", label: "192 kbps", description: "High quality" },
  { value: "256", label: "256 kbps", description: "Near-lossless" },
];

export function CompressAudioTool() {
  const [file, setFile] = useState<File | null>(null);
  const [bitrate, setBitrate] = useState<Bitrate>("128");
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

      setProgress("Compressing audio...");
      await ffmpeg.exec([
        "-i",
        inputName,
        "-acodec",
        "libmp3lame",
        "-b:a",
        `${bitrate}k`,
        "output.mp3",
      ]);

      const data = await ffmpeg.readFile("output.mp3");
      const blob = new Blob([data], { type: "audio/mpeg" });
      setResultBlob(blob);
      setProgress("");

      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile("output.mp3");
    } catch (err) {
      console.error(err);
      setError(
        "Compression failed. FFmpeg.wasm may not be supported in your browser, or the file may be corrupted. Please try a modern Chrome or Firefox browser."
      );
      setProgress("");
    } finally {
      setIsProcessing(false);
    }
  }, [file, bitrate]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${baseName}-compressed.mp3`);
  }, [resultBlob, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setBitrate("128");
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
          accept={[".mp3", ".wav", ".ogg", ".flac", ".aac", ".m4a", ".wma"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your audio file here"
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

          {/* Bitrate selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-slate-700">
              Target bitrate
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BITRATE_OPTIONS.map((option) => {
                const isSelected = bitrate === option.value;
                return (
                  <label
                    key={option.value}
                    className={`
                      flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 px-3 py-3 text-center transition-all
                      ${
                        isSelected
                          ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)]"
                          : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="bitrate"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => setBitrate(option.value)}
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
                "Compress Audio"
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
                  label="Download Compressed Audio"
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
        <div className="rounded-lg bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
