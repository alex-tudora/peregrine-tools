"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { Dropzone, ProgressBar, logActivity } from "@peregrine/ui";
import { pdfToImages, type RenderedPage } from "@/lib/convert";
import {
  downloadFile,
  downloadAsZip,
  readFileAsArrayBuffer,
  formatFileSize,
} from "@/lib/download";

type ExportFormat = "pdf" | "jpg" | "png";

interface UploadedFile {
  name: string;
  size: number;
  buffer: ArrayBuffer;
}

export default function ExtractPdfPagesTool() {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [thumbnails, setThumbnails] = useState<RenderedPage[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [exportFormat, setExportFormat] = useState<ExportFormat>("pdf");
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const previewUrlsRef = useRef<string[]>([]);

  // Revoke object URLs on cleanup
  useEffect(() => {
    return () => {
      for (const url of previewUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  const revokeUrls = useCallback(() => {
    for (const url of previewUrlsRef.current) {
      URL.revokeObjectURL(url);
    }
    previewUrlsRef.current = [];
  }, []);

  const handleFiles = useCallback(
    async (files: File[]) => {
      const incoming = files[0];
      if (!incoming) return;

      setError(null);
      setIsLoading(true);
      setProgress(10);
      revokeUrls();

      try {
        const buffer = await readFileAsArrayBuffer(incoming);
        setProgress(20);

        // Load with pdf-lib to get page count
        const pdf = await PDFDocument.load(buffer.slice(0));
        const count = pdf.getPageCount();
        setProgress(30);

        // Render thumbnails at scale 1 for speed
        const rendered = await pdfToImages(buffer.slice(0), "png", 1, 1);
        setProgress(80);

        // Create preview URLs
        const urls = rendered.map((img) => URL.createObjectURL(img.data));
        previewUrlsRef.current = urls;

        setFile({ name: incoming.name, size: incoming.size, buffer });
        setTotalPages(count);
        setThumbnails(rendered);

        // Select all pages by default
        const all = new Set<number>();
        for (let i = 1; i <= count; i++) all.add(i);
        setSelectedPages(all);

        setProgress(100);
      } catch {
        setError(
          "Could not read the PDF. The file may be corrupted or password-protected."
        );
        setFile(null);
        setTotalPages(0);
        setThumbnails([]);
        setSelectedPages(new Set());
      } finally {
        setIsLoading(false);
        setTimeout(() => setProgress(0), 500);
      }
    },
    [revokeUrls]
  );

  const togglePage = useCallback((page: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(page)) {
        next.delete(page);
      } else {
        next.add(page);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    const all = new Set<number>();
    for (let i = 1; i <= totalPages; i++) all.add(i);
    setSelectedPages(all);
  }, [totalPages]);

  const deselectAll = useCallback(() => {
    setSelectedPages(new Set());
  }, []);

  const handleExport = useCallback(async () => {
    if (!file || selectedPages.size === 0) return;

    setIsExporting(true);
    setProgress(5);
    setError(null);

    try {
      const sorted = Array.from(selectedPages).sort((a, b) => a - b);
      const zeroIndexed = sorted.map((p) => p - 1);
      const baseName = file.name.replace(/\.pdf$/i, "");

      if (exportFormat === "pdf") {
        // Extract selected pages into a new PDF using pdf-lib
        setProgress(15);
        const srcDoc = await PDFDocument.load(file.buffer.slice(0));
        const newDoc = await PDFDocument.create();
        setProgress(30);

        for (const pageIndex of zeroIndexed) {
          const [copiedPage] = await newDoc.copyPages(srcDoc, [pageIndex]);
          newDoc.addPage(copiedPage);
        }
        setProgress(70);

        const bytes = await newDoc.save();
        setProgress(90);

        downloadFile(bytes, `${baseName}_extracted.pdf`);
        logActivity({
          tool: "Extract PDF Pages",
          toolHref: "/extract-pdf-pages",
          description: "Extracted PDF pages as new PDF",
        });
      } else {
        // Render selected pages as images at scale 2 for quality
        setProgress(15);
        const allImages = await pdfToImages(
          file.buffer.slice(0),
          exportFormat,
          exportFormat === "jpg" ? 0.85 : 1,
          2
        );
        setProgress(60);

        const selectedImages = allImages.filter((img) =>
          selectedPages.has(img.pageNumber)
        );
        const ext = exportFormat;

        if (selectedImages.length === 1) {
          // Single image — download directly
          downloadFile(
            selectedImages[0].data,
            `${baseName}-page-${selectedImages[0].pageNumber}.${ext}`
          );
        } else {
          // Multiple images — download as ZIP
          setProgress(75);
          const zipFiles = selectedImages.map((img) => ({
            data: img.data,
            name: `${baseName}-page-${img.pageNumber}.${ext}`,
          }));
          await downloadAsZip(zipFiles, `${baseName}-${ext}-images.zip`);
        }

        logActivity({
          tool: "Extract PDF Pages",
          toolHref: "/extract-pdf-pages",
          description: `Extracted PDF pages as ${ext.toUpperCase()} images`,
        });
      }

      setProgress(100);
    } catch {
      setError("Failed to export. Please try again.");
    } finally {
      setIsExporting(false);
      setTimeout(() => setProgress(0), 500);
    }
  }, [file, selectedPages, exportFormat]);

  const resetTool = useCallback(() => {
    setFile(null);
    setThumbnails([]);
    setTotalPages(0);
    setSelectedPages(new Set());
    setExportFormat("pdf");
    setIsLoading(false);
    setIsExporting(false);
    setProgress(0);
    setError(null);
    revokeUrls();
  }, [revokeUrls]);

  return (
    <div className="space-y-6">
      {/* Error banner */}
      {error && (
        <div
          className="rounded-lg bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Dropzone — shown when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".pdf"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your PDF file here"
        />
      )}

      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* Loading state */}
      {isLoading && !error && (
        <div className="text-center">
          <p className="text-sm text-[color:var(--color-text-muted)]">
            Generating page thumbnails...
          </p>
        </div>
      )}

      {/* File loaded — thumbnail grid & controls */}
      {file && thumbnails.length > 0 && (
        <div className="space-y-5">
          {/* File info header */}
          <div className="flex items-center justify-between rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">
                {file.name}
              </p>
              <p className="text-xs text-[color:var(--color-text-muted)]">
                {formatFileSize(file.size)} &middot; {totalPages}{" "}
                {totalPages === 1 ? "page" : "pages"}
              </p>
            </div>
            <button
              type="button"
              onClick={resetTool}
              className="ml-4 shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-muted)] transition-colors hover:bg-slate-100 hover:text-[color:var(--color-text-secondary)]"
            >
              Change file
            </button>
          </div>

          {/* Select / Deselect buttons + count */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={selectAll}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent-light)]"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={deselectAll}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-muted)] transition-colors hover:bg-slate-100"
            >
              Deselect All
            </button>
            <span className="ml-auto text-xs text-[color:var(--color-text-muted)]">
              {selectedPages.size} of {totalPages} page
              {totalPages === 1 ? "" : "s"} selected
            </span>
          </div>

          {/* Thumbnail grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {thumbnails.map((thumb, index) => {
              const isSelected = selectedPages.has(thumb.pageNumber);
              return (
                <button
                  key={thumb.pageNumber}
                  type="button"
                  onClick={() => togglePage(thumb.pageNumber)}
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-[color:var(--color-accent)] shadow-md shadow-sky-500/15"
                      : "border-[color:var(--color-border)] hover:border-[color:var(--color-border-hover)]"
                  }`}
                  aria-label={`Page ${thumb.pageNumber}${isSelected ? " (selected)" : ""}`}
                >
                  {/* Thumbnail image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--color-bg-elevated)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrlsRef.current[index]}
                      alt={`Page ${thumb.pageNumber}`}
                      className="h-full w-full object-contain"
                    />

                    {/* Selection overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-[color:var(--color-accent)]/10">
                        <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-white shadow-sm">
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Page number */}
                  <div className="px-3 py-2">
                    <span
                      className={`text-xs font-medium ${
                        isSelected
                          ? "text-[color:var(--color-accent)]"
                          : "text-[color:var(--color-text-muted)]"
                      }`}
                    >
                      Page {thumb.pageNumber}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Export format radio options */}
          <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4">
            <p className="mb-3 text-sm font-medium text-[color:var(--color-text-secondary)]">
              Export format
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-5">
              {(
                [
                  { value: "pdf", label: "New PDF" },
                  { value: "jpg", label: "Individual Images (JPG)" },
                  { value: "png", label: "Individual Images (PNG)" },
                ] as const
              ).map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none ${
                    exportFormat === option.value
                      ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] font-medium"
                      : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-border-hover)] hover:bg-[color:var(--color-bg-elevated)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="export-format"
                    value={option.value}
                    checked={exportFormat === option.value}
                    onChange={() => setExportFormat(option.value)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      exportFormat === option.value
                        ? "border-[color:var(--color-accent)]"
                        : "border-[color:var(--color-border-hover)]"
                    }`}
                  >
                    {exportFormat === option.value && (
                      <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
                    )}
                  </span>
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Export button */}
          <div>
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting || selectedPages.size === 0}
              className="btn-action w-full rounded-lg bg-[color:var(--color-accent)] py-3 font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[color:var(--color-accent)]"
            >
              {isExporting ? (
                <span className="inline-flex items-center gap-2">
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
                  Exporting...
                </span>
              ) : selectedPages.size === 0 ? (
                "Select pages to export"
              ) : (
                `Export ${selectedPages.size} page${selectedPages.size === 1 ? "" : "s"} as ${exportFormat === "pdf" ? "PDF" : exportFormat.toUpperCase()}`
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
