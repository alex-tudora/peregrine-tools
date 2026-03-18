"use client";

import { useState, useCallback } from "react";
import { Dropzone, DownloadButton } from "@peregrine/ui";
import { getFFmpeg, getFetchFile } from "@/lib/ffmpeg";
import { downloadBlob, formatFileSize } from "@/lib/download";

type OutputFormat = "mp3" | "wav" | "aac";

const FORMAT_OPTIONS: {
  value: OutputFormat;
  label: string;
  ext: string;
  mime: string;
}[] = [
  { value: "mp3", label: "MP3", ext: "mp3", mime: "audio/mpeg" },
  { value: "wav", label: "WAV", ext: "wav", mime: "audio/wav" },
  { value: "aac", label: "AAC", ext: "aac", mime: "audio/aac" },
];

export function ExtractAudioTool() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<OutputFormat>("mp3");
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

  const handleExtract = useCallback(async () => {
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

      const formatConfig = FORMAT_OPTIONS.find((f) => f.value === format)!;

      setProgress(`Extracting audio as ${formatConfig.label}...`);

      const args: string[] = ["-i", inputName, "-vn"];

      switch (format) {
        case "mp3":
          args.push("-acodec", "libmp3lame", "-q:a", "2");
          break;
        case "wav":
          args.push("-acodec", "pcm_s16le");
          break;
        case "aac":
          args.push("-acodec", "aac", "-b:a", "192k");
          break;
      }

      const outputName = `output.${formatConfig.ext}`;
      args.push(outputName);

      await ffmpeg.exec(args);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: formatConfig.mime });
      setResultBlob(blob);
      setProgress("");

      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch (err) {
      console.error(err);
      setError(
        "Extraction failed. FFmpeg.wasm may not be supported in your browser, or the file may be corrupted. Please try a modern Chrome or Firefox browser."
      );
      setProgress("");
    } finally {
      setIsProcessing(false);
    }
  }, [file, format]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const formatConfig = FORMAT_OPTIONS.find((f) => f.value === format)!;
    downloadBlob(resultBlob, `${baseName}.${formatConfig.ext}`);
  }, [resultBlob, file, format]);

  const handleReset = useCallback(() => {
    setFile(null);
    setFormat("mp3");
    setIsProcessing(false);
    setResultBlob(null);
    setError(null);
    setProgress("");
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

          {/* Format selector */}
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
                          ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)]"
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

          {!resultBlob && (
            <button
              onClick={handleExtract}
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
                  {progress || "Extracting..."}
                </>
              ) : (
                "Extract Audio"
              )}
            </button>
          )}

          {resultBlob && (
            <div className="mt-5 space-y-4">
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Video size</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Audio size ({format.toUpperCase()})</span>
                  <span className="font-medium text-slate-900">
                    {formatFileSize(resultBlob.size)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label={`Download ${format.toUpperCase()}`}
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Extract another
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
