"use client";

import { useState, useCallback, useMemo } from "react";
import { Dropzone, DownloadButton, logActivity } from "@peregrine/ui";
import { getFFmpeg, getFetchFile } from "@/lib/ffmpeg";
import { downloadBlob, formatFileSize } from "@/lib/download";

type OutputFormat = "mp3" | "wav";

const FORMAT_OPTIONS: {
  value: OutputFormat;
  label: string;
  ext: string;
  mime: string;
}[] = [
  { value: "mp3", label: "MP3", ext: "mp3", mime: "audio/mpeg" },
  { value: "wav", label: "WAV", ext: "wav", mime: "audio/wav" },
];

const INPUT_EXT_TO_FORMAT: Record<string, OutputFormat> = {
  ".mp3": "mp3",
  ".wav": "wav",
  ".ogg": "mp3",
  ".flac": "mp3",
  ".aac": "mp3",
  ".m4a": "mp3",
};

function getInputExt(fileName: string): string {
  return fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
}

export function TrimAudioTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");

  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:00:30");
  const [format, setFormat] = useState<OutputFormat>("mp3");

  const audioPreviewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const handleFiles = useCallback((files: File[]) => {
    const selected = files[0];
    if (!selected) return;
    setError(null);
    setResultBlob(null);
    setProgress("");
    setFile(selected);

    const ext = getInputExt(selected.name);
    const defaultFormat = INPUT_EXT_TO_FORMAT[ext] || "mp3";
    setFormat(defaultFormat);
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
      const inputExt = getInputExt(file.name);
      const inputName = "input" + inputExt;
      const formatConfig = FORMAT_OPTIONS.find((f) => f.value === format)!;
      const outputName = `output.${formatConfig.ext}`;
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      setProgress("Trimming audio...");

      const canStreamCopy = inputExt === `.${formatConfig.ext}`;

      const args: string[] = ["-i", inputName, "-ss", startTime, "-to", endTime];

      if (canStreamCopy) {
        args.push("-c", "copy");
      } else {
        switch (format) {
          case "mp3":
            args.push("-acodec", "libmp3lame", "-q:a", "2");
            break;
          case "wav":
            args.push("-acodec", "pcm_s16le");
            break;
        }
      }

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
        "Trimming failed. FFmpeg.wasm may not be supported in your browser, or the file may be corrupted. Please try a modern Chrome or Firefox browser."
      );
      setProgress("");
    } finally {
      setIsProcessing(false);
    }
  }, [file, startTime, endTime, format]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const formatConfig = FORMAT_OPTIONS.find((f) => f.value === format)!;
    downloadBlob(resultBlob, `${baseName}-trimmed.${formatConfig.ext}`);
    logActivity({ tool: "Trim Audio", toolHref: "/trim-audio", description: "Trimmed an audio file" });
  }, [resultBlob, file, format]);

  const handleReset = useCallback(() => {
    setFile(null);
    setIsProcessing(false);
    setResultBlob(null);
    setError(null);
    setProgress("");
    setStartTime("00:00:00");
    setEndTime("00:00:30");
    setFormat("mp3");
  }, []);

  return (
    <div className="space-y-6">
      {!file && (
        <Dropzone
          accept={[".mp3", ".wav", ".ogg", ".flac", ".aac", ".m4a"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your audio file here"
        />
      )}

      {file && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                {formatFileSize(file.size)} &middot; {getInputExt(file.name).replace(".", "").toUpperCase()}
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

          {/* Audio preview */}
          {audioPreviewUrl && (
            <div className="mt-4">
              <audio
                src={audioPreviewUrl}
                controls
                className="w-full"
                preload="metadata"
              />
            </div>
          )}

          {/* Time inputs */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
                Start time (HH:MM:SS)
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="00:00:00"
                disabled={isProcessing}
                className="w-full rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm font-mono text-[color:var(--color-text-primary)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)] disabled:opacity-50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
                End time (HH:MM:SS)
              </label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="00:00:30"
                disabled={isProcessing}
                className="w-full rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-sm font-mono text-[color:var(--color-text-primary)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)] disabled:opacity-50"
              />
            </div>
          </div>

          {/* Output format selector */}
          <fieldset className="mt-5">
            <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Output format
            </legend>
            <div className="grid grid-cols-2 gap-2.5">
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
                          : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] hover:border-[color:var(--color-border-hover)]"
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

          <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
            Uses stream copy when the output format matches the input for instant trimming without re-encoding.
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
                "Trim Audio"
              )}
            </button>
          )}

          {resultBlob && (
            <div className="mt-5 space-y-4">
              <div className="rounded-lg bg-[color:var(--color-bg-elevated)] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">Original size</span>
                  <span className="font-medium text-[color:var(--color-text-primary)]">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">Trimmed size</span>
                  <span className="font-medium text-[color:var(--color-text-primary)]">
                    {formatFileSize(resultBlob.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">Clip range</span>
                  <span className="font-medium font-mono text-[color:var(--color-text-primary)]">
                    {startTime} &rarr; {endTime}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">Output format</span>
                  <span className="font-medium text-[color:var(--color-text-primary)]">
                    {format.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Trimmed Audio"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Trim another
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
