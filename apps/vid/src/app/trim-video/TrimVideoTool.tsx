"use client";

import { useState, useCallback } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { getFFmpeg, getFetchFile } from "@/lib/ffmpeg";
import { downloadBlob, formatFileSize } from "@/lib/download";

export function TrimVideoTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");

  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:00:30");

  const handleFiles = useCallback((files: File[]) => {
    const selected = files[0];
    if (!selected) return;
    setError(null);
    setResultBlob(null);
    setProgress("");
    setFile(selected);
  }, []);

  const handleTrim = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setResultBlob(null);
    setError(null);
    setProgress("Loading FFmpeg...");

    try {
      const ffmpeg = await getFFmpeg();
      const fetchFile = await getFetchFile();

      setProgress("Reading file...");
      const ext = file.name.substring(file.name.lastIndexOf("."));
      const inputName = "input" + ext;
      const outputName = "output" + ext;
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      setProgress("Trimming video...");
      await ffmpeg.exec([
        "-ss",
        startTime,
        "-to",
        endTime,
        "-i",
        inputName,
        "-c",
        "copy",
        outputName,
      ]);

      const data = await ffmpeg.readFile(outputName);
      const mimeType = file.type || "video/mp4";
      const blob = new Blob([data], { type: mimeType });
      setResultBlob(blob);
      setProgress("");

      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch (err) {
      console.error(err);
      setError(
        "Trimming failed. FFmpeg.wasm may not be supported in your browser, or the file may be corrupted. Please try a modern Chrome or Firefox browser."
      );
      setProgress("");
    } finally {
      setIsProcessing(false);
    }
  }, [file, startTime, endTime]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const ext = file.name.substring(file.name.lastIndexOf("."));
    downloadBlob(resultBlob, `${baseName}-trimmed${ext}`);
  }, [resultBlob, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setIsProcessing(false);
    setResultBlob(null);
    setError(null);
    setProgress("");
    setStartTime("00:00:00");
    setEndTime("00:00:30");
  }, []);

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

          {/* Time inputs */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Start time (HH:MM:SS)
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="00:00:00"
                disabled={isProcessing}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono text-slate-900 focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)] disabled:opacity-50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                End time (HH:MM:SS)
              </label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="00:00:30"
                disabled={isProcessing}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono text-slate-900 focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)] disabled:opacity-50"
              />
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Uses stream copy for instant trimming without re-encoding. Quality is preserved.
          </p>

          {!resultBlob && (
            <button
              onClick={handleTrim}
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
                  {progress || "Trimming..."}
                </>
              ) : (
                "Trim Video"
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
                  <span className="text-slate-600">Trimmed size</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(resultBlob.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Clip range</span>
                  <span className="font-medium font-mono text-slate-900">
                    {startTime} → {endTime}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Trimmed Video"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Trim another
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
