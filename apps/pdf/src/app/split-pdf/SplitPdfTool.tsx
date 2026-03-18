"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { Dropzone, ProgressBar } from "@peregrine/ui";
import { splitPdf, extractPageRange } from "@/lib/split";
import {
  downloadFile,
  downloadAsZip,
  readFileAsArrayBuffer,
  formatFileSize,
} from "@/lib/download";

interface UploadedFile {
  name: string;
  size: number;
  buffer: ArrayBuffer;
}

/**
 * Parse a human-friendly page range string like "1-3, 5, 7-10" into
 * a sorted, deduplicated array of 1-indexed page numbers.
 */
function parsePageRange(input: string, totalPages: number): number[] {
  const pages = new Set<number>();
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);

  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      if (start < 1 || end > totalPages || start > end) continue;
      for (let i = start; i <= end; i++) {
        pages.add(i);
      }
    } else {
      const num = parseInt(part, 10);
      if (!isNaN(num) && num >= 1 && num <= totalPages) {
        pages.add(num);
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export default function SplitPdfTool() {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [rangeInput, setRangeInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const incoming = files[0];
    if (!incoming) return;

    setError(null);
    setIsProcessing(true);
    setProgress(10);

    try {
      const buffer = await readFileAsArrayBuffer(incoming);
      setProgress(40);

      const pdf = await PDFDocument.load(buffer);
      const count = pdf.getPageCount();
      setProgress(80);

      setFile({ name: incoming.name, size: incoming.size, buffer });
      setTotalPages(count);

      // Select all pages by default
      const all = new Set<number>();
      for (let i = 1; i <= count; i++) all.add(i);
      setSelectedPages(all);
      setRangeInput("");
      setProgress(100);
    } catch {
      setError("Could not read the PDF. The file may be corrupted or password-protected.");
      setFile(null);
      setTotalPages(0);
      setSelectedPages(new Set());
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 500);
    }
  }, []);

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

  const applyRange = useCallback(() => {
    if (!rangeInput.trim()) return;
    const pages = parsePageRange(rangeInput, totalPages);
    setSelectedPages(new Set(pages));
  }, [rangeInput, totalPages]);

  const handleExtractSinglePdf = useCallback(async () => {
    if (!file || selectedPages.size === 0) return;

    setIsProcessing(true);
    setProgress(10);
    setError(null);

    try {
      const sorted = Array.from(selectedPages).sort((a, b) => a - b);
      // Convert to 0-indexed for extractPageRange / splitPdf
      const zeroIndexed = sorted.map((p) => p - 1);

      // Check if pages are contiguous — use extractPageRange for efficiency
      const isContiguous =
        zeroIndexed.length > 0 &&
        zeroIndexed[zeroIndexed.length - 1] - zeroIndexed[0] === zeroIndexed.length - 1;

      let result: Uint8Array;

      if (isContiguous) {
        setProgress(30);
        result = await extractPageRange(
          file.buffer,
          zeroIndexed[0],
          zeroIndexed[zeroIndexed.length - 1],
        );
        setProgress(90);
      } else {
        // Build a new PDF with non-contiguous pages
        setProgress(20);
        const sourcePdf = await PDFDocument.load(file.buffer);
        const newPdf = await PDFDocument.create();
        setProgress(40);

        const copiedPages = await newPdf.copyPages(sourcePdf, zeroIndexed);
        for (const page of copiedPages) {
          newPdf.addPage(page);
        }
        setProgress(70);
        result = await newPdf.save();
        setProgress(90);
      }

      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadFile(result, `${baseName}_pages.pdf`);
      setProgress(100);
    } catch {
      setError("Failed to extract pages. Please try again.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 500);
    }
  }, [file, selectedPages]);

  const handleDownloadAsZip = useCallback(async () => {
    if (!file || selectedPages.size === 0) return;

    setIsProcessing(true);
    setProgress(5);
    setError(null);

    try {
      const sorted = Array.from(selectedPages).sort((a, b) => a - b);
      const zeroIndexed = sorted.map((p) => p - 1);

      setProgress(15);
      const pages = await splitPdf(file.buffer, zeroIndexed);
      setProgress(70);

      const baseName = file.name.replace(/\.pdf$/i, "");
      const zipFiles = pages.map((data, i) => ({
        data,
        name: `${baseName}_page_${sorted[i]}.pdf`,
      }));

      setProgress(85);
      await downloadAsZip(zipFiles, `${baseName}_split.zip`);
      setProgress(100);
    } catch {
      setError("Failed to create ZIP. Please try again.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 500);
    }
  }, [file, selectedPages]);

  const resetTool = useCallback(() => {
    setFile(null);
    setTotalPages(0);
    setSelectedPages(new Set());
    setRangeInput("");
    setIsProcessing(false);
    setProgress(0);
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Error banner */}
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      {/* Dropzone — shown when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".pdf"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your PDF here"
        />
      )}

      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* File loaded — page selector */}
      {file && (
        <div className="space-y-5">
          {/* File info header */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">{file.name}</p>
              <p className="text-xs text-slate-500">
                {formatFileSize(file.size)} &middot; {totalPages}{" "}
                {totalPages === 1 ? "page" : "pages"}
              </p>
            </div>
            <button
              type="button"
              onClick={resetTool}
              className="ml-4 shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              Change file
            </button>
          </div>

          {/* Range input */}
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label
                htmlFor="page-range"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Page range
              </label>
              <input
                id="page-range"
                type="text"
                placeholder={`e.g. 1-3, 5, 7-${totalPages}`}
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applyRange();
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <button
              type="button"
              onClick={applyRange}
              disabled={!rangeInput.trim()}
              className="shrink-0 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Apply
            </button>
          </div>

          {/* Select / Deselect buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={selectAll}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-sky-600 transition-colors hover:bg-sky-50"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={deselectAll}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100"
            >
              Deselect All
            </button>
            <span className="ml-auto text-xs text-slate-500">
              {selectedPages.size} of {totalPages} selected
            </span>
          </div>

          {/* Page checkboxes grid */}
          <div className="max-h-72 overflow-y-auto rounded-lg border border-slate-200 bg-white p-3">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <label
                  key={page}
                  className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-sm transition-colors select-none ${
                    selectedPages.has(page)
                      ? "border-sky-300 bg-sky-50 text-sky-700 font-medium"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPages.has(page)}
                    onChange={() => togglePage(page)}
                    className="sr-only"
                  />
                  {page}
                </label>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleExtractSinglePdf}
              disabled={isProcessing || selectedPages.size === 0}
              className="flex-1 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isProcessing ? "Processing..." : "Extract Selected Pages"}
            </button>
            <button
              type="button"
              onClick={handleDownloadAsZip}
              disabled={isProcessing || selectedPages.size === 0}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isProcessing ? "Processing..." : "Download as ZIP"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
