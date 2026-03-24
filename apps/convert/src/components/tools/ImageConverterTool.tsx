"use client";

import { useState, useCallback } from "react";
import { Dropzone, ToolActionButton, DownloadButton, ProgressBar } from "@peregrine/ui";
import { convertImage, svgToPng, downloadFile, formatFileSize } from "@peregrine/converters";

interface ConvertedFile {
  id: string;
  name: string;
  originalSize: number;
  blob: Blob;
}

interface ImageConverterToolProps {
  from: string;
  to: string;
  accept: string[];
  targetFormat: "jpeg" | "png" | "webp";
  showQuality: boolean;
}

export function ImageConverterTool({
  from,
  to,
  accept,
  targetFormat,
  showQuality,
}: ImageConverterToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.85);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ConvertedFile[]>([]);
  const [error, setError] = useState("");

  const isSvg = from === "SVG";

  const handleFiles = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setResults([]);
    setError("");
    setProgress(0);
  }, []);

  const handleConvert = useCallback(async () => {
    if (files.length === 0) return;
    setConverting(true);
    setError("");
    setResults([]);
    setProgress(0);

    try {
      const converted: ConvertedFile[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const blob = isSvg
          ? await svgToPng(file, 2)
          : await convertImage(file, targetFormat, showQuality ? quality : undefined);

        const ext = targetFormat === "jpeg" ? "jpg" : targetFormat;
        const baseName = file.name.replace(/\.[^.]+$/, "");

        converted.push({
          id: `${i}-${Date.now()}`,
          name: `${baseName}.${ext}`,
          originalSize: file.size,
          blob,
        });

        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      setResults(converted);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setConverting(false);
    }
  }, [files, targetFormat, quality, showQuality, isSvg]);

  const handleDownload = useCallback((result: ConvertedFile) => {
    downloadFile(result.blob, result.name);
  }, []);

  const handleReset = useCallback(() => {
    setFiles([]);
    setResults([]);
    setError("");
    setProgress(0);
  }, []);

  return (
    <div className="space-y-6">
      {results.length === 0 ? (
        <>
          <Dropzone
            accept={accept}
            multiple
            onFiles={handleFiles}
            label={`Drop your ${from} file${files.length !== 1 ? "s" : ""} here`}
          />

          {files.length > 0 && (
            <div className="space-y-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="truncate text-[color:var(--color-text-primary)]">{f.name}</span>
                  <span className="shrink-0 ml-3 text-[color:var(--color-text-muted)]">{formatFileSize(f.size)}</span>
                </div>
              ))}
            </div>
          )}

          {showQuality && files.length > 0 && (
            <div>
              <label className="mb-2 flex items-center justify-between text-sm font-medium text-[color:var(--color-text-secondary)]">
                <span>Quality</span>
                <span className="text-[color:var(--color-accent)]">{Math.round(quality * 100)}%</span>
              </label>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-[color:var(--color-accent)]"
              />
            </div>
          )}

          {files.length > 0 && (
            <ToolActionButton
              onClick={handleConvert}
              disabled={converting || files.length === 0}
              loading={converting}
              label={`Convert to ${to}`}
              loadingLabel="Converting..."
              className="w-full"
            />
          )}

          {converting && <ProgressBar progress={progress} />}
        </>
      ) : (
        <>
          <div className="space-y-3">
            {results.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">{r.name}</p>
                  <p className="text-xs text-[color:var(--color-text-muted)]">{formatFileSize(r.blob.size)}</p>
                </div>
                <DownloadButton
                  onClick={() => handleDownload(r)}
                  label="Download"
                  variant="secondary"
                  className="shrink-0 !w-auto !px-4 !py-2 text-xs"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="w-full rounded-xl border border-[color:var(--color-border)] px-4 py-3 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
          >
            Convert more files
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
