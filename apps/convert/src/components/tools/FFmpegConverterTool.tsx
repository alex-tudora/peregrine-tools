"use client";

import { useState, useCallback } from "react";
import { Dropzone, ToolActionButton, DownloadButton, ProgressBar } from "@peregrine/ui";
import { getFFmpeg, getFetchFile, downloadFile, formatFileSize } from "@peregrine/converters";

interface FFmpegConverterToolProps {
  accept: string[];
  ffmpegArgs: string[];
  outputExtension: string;
  outputMimeType: string;
  actionLabel: string;
}

export function FFmpegConverterTool({
  accept,
  ffmpegArgs,
  outputExtension,
  outputMimeType,
  actionLabel,
}: FFmpegConverterToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [error, setError] = useState("");

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0] || null);
    setResult(null);
    setError("");
    setProgress(0);
    setStatus("");
  }, []);

  const handleConvert = useCallback(async () => {
    if (!file) return;
    setConverting(true);
    setError("");
    setResult(null);
    setStatus("Loading FFmpeg...");
    setProgress(10);

    try {
      const ffmpeg = await getFFmpeg();
      const fetchFile = await getFetchFile();

      setStatus("Reading file...");
      setProgress(25);

      const inputName = `input.${file.name.split(".").pop() || "bin"}`;
      const outputName = `output.${outputExtension}`;

      await ffmpeg.writeFile(inputName, await fetchFile(file));

      setStatus("Converting...");
      setProgress(40);

      await ffmpeg.exec(["-i", inputName, ...ffmpegArgs, outputName]);

      setStatus("Reading output...");
      setProgress(85);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: outputMimeType });
      const baseName = file.name.replace(/\.[^.]+$/, "");

      setResult({ blob, name: `${baseName}.${outputExtension}` });
      setProgress(100);
      setStatus("Done!");

      // Clean up
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setConverting(false);
    }
  }, [file, ffmpegArgs, outputExtension, outputMimeType]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    downloadFile(result.blob, result.name);
  }, [result]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResult(null);
    setError("");
    setProgress(0);
    setStatus("");
  }, []);

  return (
    <div className="space-y-6">
      {!result ? (
        <>
          <Dropzone
            accept={accept}
            multiple={false}
            onFiles={handleFiles}
            label="Drop your file here"
          />

          {file && (
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-sm">
              <span className="font-medium text-[color:var(--color-text-primary)]">{file.name}</span>
              <span className="ml-2 text-[color:var(--color-text-muted)]">{formatFileSize(file.size)}</span>
            </div>
          )}

          {file && (
            <ToolActionButton
              onClick={handleConvert}
              disabled={converting || !file}
              loading={converting}
              label={actionLabel}
              loadingLabel={status || "Processing..."}
              className="w-full"
            />
          )}

          {converting && (
            <>
              <ProgressBar progress={progress} />
              {status && (
                <p className="text-center text-xs text-[color:var(--color-text-muted)]">{status}</p>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[color:var(--color-text-primary)]">{result.name}</p>
                <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">{formatFileSize(result.blob.size)}</p>
              </div>
              {file && (
                <div className="text-right">
                  <p className="text-xs text-[color:var(--color-text-muted)]">Original: {formatFileSize(file.size)}</p>
                  {result.blob.size < file.size ? (
                    <p className="text-xs font-medium text-[color:var(--color-success)]">
                      {Math.round((1 - result.blob.size / file.size) * 100)}% smaller
                    </p>
                  ) : (
                    <p className="text-xs text-[color:var(--color-text-muted)]">
                      {Math.round((result.blob.size / file.size - 1) * 100)}% larger
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <DownloadButton
            onClick={handleDownload}
            label="Download"
            className="w-full"
          />

          <button
            onClick={handleReset}
            className="w-full rounded-xl border border-[color:var(--color-border)] px-4 py-3 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
          >
            Convert another file
          </button>
        </>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]">
          {error}
        </div>
      )}
    </div>
  );
}
