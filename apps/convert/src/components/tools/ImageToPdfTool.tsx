"use client";

import { useState, useCallback } from "react";
import { Dropzone, FileList, ToolActionButton, DownloadButton, OptionSelector, ProgressBar } from "@peregrine/ui";
import {
  imagesToPdf,
  downloadFile,
  readFileAsArrayBuffer,
  formatFileSize,
  type PageSize,
} from "@peregrine/converters";

interface FileItem {
  file: File;
  id: string;
  name: string;
  size: number;
}

interface ImageToPdfToolProps {
  accept: string[];
}

const pageSizeOptions = [
  { value: "fit", label: "Fit to Image", description: "Page matches image dimensions" },
  { value: "a4", label: "A4", description: "210 × 297 mm" },
  { value: "letter", label: "Letter", description: "8.5 × 11 in" },
];

export function ImageToPdfTool({ accept }: ImageToPdfToolProps) {
  const [items, setItems] = useState<FileItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("fit");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfBlob, setPdfBlob] = useState<Uint8Array | null>(null);
  const [error, setError] = useState("");

  const handleFiles = useCallback((files: File[]) => {
    const newItems = files.map((f, i) => ({
      file: f,
      id: `${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
    }));
    setItems((prev) => [...prev, ...newItems]);
    setPdfBlob(null);
    setError("");
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setPdfBlob(null);
  }, []);

  const handleReorder = useCallback((reordered: { id: string; name: string; size: number }[]) => {
    setItems((prev) => {
      const byId = new Map(prev.map((item) => [item.id, item]));
      return reordered.map((r) => byId.get(r.id)!).filter(Boolean);
    });
    setPdfBlob(null);
  }, []);

  const handleConvert = useCallback(async () => {
    if (items.length === 0) return;
    setConverting(true);
    setError("");
    setPdfBlob(null);
    setProgress(10);

    try {
      const images = await Promise.all(
        items.map(async (item) => {
          const buffer = await readFileAsArrayBuffer(item.file);
          // Get image dimensions
          const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new window.Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error(`Failed to load ${item.name}`));
            image.src = URL.createObjectURL(item.file);
          });
          return { data: buffer, width: img.width, height: img.height };
        })
      );

      setProgress(50);
      const pdfBytes = await imagesToPdf(images, pageSize);
      setPdfBlob(pdfBytes);
      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create PDF");
    } finally {
      setConverting(false);
    }
  }, [items, pageSize]);

  const handleDownload = useCallback(() => {
    if (!pdfBlob) return;
    downloadFile(pdfBlob, "converted.pdf");
  }, [pdfBlob]);

  const handleReset = useCallback(() => {
    setItems([]);
    setPdfBlob(null);
    setError("");
    setProgress(0);
  }, []);

  return (
    <div className="space-y-6">
      {!pdfBlob ? (
        <>
          <Dropzone
            accept={accept}
            multiple
            onFiles={handleFiles}
            label="Drop your images here"
          />

          <FileList
            files={items}
            onRemove={handleRemove}
            onReorder={handleReorder}
          />

          {items.length > 0 && (
            <>
              <div>
                <p className="mb-2 text-sm font-medium text-[color:var(--color-text-secondary)]">Page Size</p>
                <OptionSelector
                  options={pageSizeOptions}
                  value={pageSize}
                  onChange={(v) => setPageSize(v as PageSize)}
                  columns={3}
                />
              </div>

              <ToolActionButton
                onClick={handleConvert}
                disabled={converting || items.length === 0}
                loading={converting}
                label="Create PDF"
                loadingLabel="Building PDF..."
                className="w-full"
              />

              {converting && <ProgressBar progress={progress} />}
            </>
          )}
        </>
      ) : (
        <>
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-5 text-center">
            <div className="mb-2 text-2xl">
              <svg className="mx-auto h-10 w-10 text-[color:var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[color:var(--color-text-primary)]">PDF created successfully</p>
            <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">
              {items.length} page{items.length !== 1 ? "s" : ""} · {formatFileSize(pdfBlob.byteLength)}
            </p>
          </div>

          <DownloadButton
            onClick={handleDownload}
            label="Download PDF"
            className="w-full"
          />

          <button
            onClick={handleReset}
            className="w-full rounded-xl border border-[color:var(--color-border)] px-4 py-3 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
          >
            Convert more images
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
