"use client";

import { useState, useCallback } from "react";
import { Dropzone, ToolActionButton, DownloadButton, ProgressBar } from "@peregrine/ui";
import {
  pdfToImages,
  downloadFile,
  downloadAsZip,
  formatFileSize,
  readFileAsArrayBuffer,
  type RenderedPage,
} from "@peregrine/converters";

interface PdfToImageToolProps {
  targetFormat: "jpg" | "png";
}

export function PdfToImageTool({ targetFormat }: PdfToImageToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.85);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [error, setError] = useState("");

  const isJpg = targetFormat === "jpg";

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0] || null);
    setPages([]);
    setError("");
    setProgress(0);
  }, []);

  const handleConvert = useCallback(async () => {
    if (!file) return;
    setConverting(true);
    setError("");
    setPages([]);
    setProgress(10);

    try {
      const buffer = await readFileAsArrayBuffer(file);
      setProgress(30);
      const rendered = await pdfToImages(buffer, targetFormat, isJpg ? quality : undefined);
      setPages(rendered);
      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    } finally {
      setConverting(false);
    }
  }, [file, targetFormat, quality, isJpg]);

  const handleDownloadPage = useCallback(
    (page: RenderedPage) => {
      const baseName = file?.name.replace(/\.[^.]+$/, "") || "page";
      downloadFile(page.data, `${baseName}-page-${page.pageNumber}.${targetFormat}`);
    },
    [file, targetFormat]
  );

  const handleDownloadAll = useCallback(async () => {
    if (pages.length === 0 || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    await downloadAsZip(
      pages.map((p) => ({
        data: p.data,
        name: `${baseName}-page-${p.pageNumber}.${targetFormat}`,
      })),
      `${baseName}-${targetFormat}.zip`
    );
  }, [pages, file, targetFormat]);

  const handleReset = useCallback(() => {
    setFile(null);
    setPages([]);
    setError("");
    setProgress(0);
  }, []);

  return (
    <div className="space-y-6">
      {pages.length === 0 ? (
        <>
          <Dropzone
            accept={[".pdf"]}
            multiple={false}
            onFiles={handleFiles}
            label="Drop your PDF here"
          />

          {file && (
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-sm">
              <span className="font-medium text-[color:var(--color-text-primary)]">{file.name}</span>
              <span className="ml-2 text-[color:var(--color-text-muted)]">{formatFileSize(file.size)}</span>
            </div>
          )}

          {isJpg && file && (
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

          {file && (
            <ToolActionButton
              onClick={handleConvert}
              disabled={converting || !file}
              loading={converting}
              label={`Convert to ${targetFormat.toUpperCase()}`}
              loadingLabel="Rendering pages..."
              className="w-full"
            />
          )}

          {converting && <ProgressBar progress={progress} />}
        </>
      ) : (
        <>
          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pages.map((page) => {
              const thumbUrl = URL.createObjectURL(page.data);
              return (
                <button
                  key={page.pageNumber}
                  onClick={() => handleDownloadPage(page)}
                  className="group relative overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <img
                    src={thumbUrl}
                    alt={`Page ${page.pageNumber}`}
                    className="w-full"
                    onLoad={() => URL.revokeObjectURL(thumbUrl)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                    <svg className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" />
                    </svg>
                  </div>
                  <div className="px-2 py-1.5 text-xs text-[color:var(--color-text-muted)]">
                    Page {page.pageNumber}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Download all */}
          <DownloadButton
            onClick={handleDownloadAll}
            label={`Download all ${pages.length} pages as ZIP`}
            className="w-full"
          />

          <button
            onClick={handleReset}
            className="w-full rounded-xl border border-[color:var(--color-border)] px-4 py-3 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
          >
            Convert another PDF
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
