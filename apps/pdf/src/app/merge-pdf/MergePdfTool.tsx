"use client";

import { useState, useCallback } from "react";
import { Dropzone, FileList, DownloadButton, ProgressBar } from "@peregrine/ui";
import { mergePdfs } from "@/lib/merge";
import { downloadFile, readFileAsArrayBuffer, formatFileSize } from "@/lib/download";

interface PdfFile {
  id: string;
  name: string;
  size: number;
  data: ArrayBuffer;
}

export function MergePdfTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  const handleFiles = useCallback(async (newFiles: File[]) => {
    setError(null);
    setResult(null);
    setProgress(0);

    const pdfFiles: PdfFile[] = [];

    for (const file of newFiles) {
      try {
        const data = await readFileAsArrayBuffer(file);
        pdfFiles.push({
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          data,
        });
      } catch {
        setError(`Failed to read "${file.name}". Please try again.`);
      }
    }

    if (pdfFiles.length > 0) {
      setFiles((prev) => [...prev, ...pdfFiles]);
    }
  }, []);

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setResult(null);
    setProgress(0);
    setError(null);
  }, []);

  const handleReorder = useCallback(
    (reordered: { id: string; name: string; size: number }[]) => {
      setFiles((prev) => {
        const lookup = new Map(prev.map((f) => [f.id, f]));
        return reordered
          .map((item) => lookup.get(item.id))
          .filter((f): f is PdfFile => f !== undefined);
      });
      setResult(null);
      setProgress(0);
    },
    []
  );

  const handleMerge = useCallback(async () => {
    if (files.length < 2) return;

    setIsProcessing(true);
    setProgress(50);
    setError(null);
    setResult(null);

    try {
      const buffers = files.map((f) => f.data);
      const merged = await mergePdfs(buffers);
      setResult(merged);
      setProgress(100);
    } catch {
      setError("Something went wrong while merging your PDFs. Please check your files and try again.");
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  }, [files]);

  const handleDownload = useCallback(() => {
    if (result) {
      downloadFile(result, "merged.pdf");
    }
  }, [result]);

  return (
    <div className="space-y-5">
      <Dropzone
        accept={[".pdf"]}
        multiple
        onFiles={handleFiles}
        label="Drop your PDF files here"
      />

      {files.length > 0 && (
        <>
          <FileList
            files={files}
            onRemove={handleRemove}
            onReorder={handleReorder}
          />

          <div className="flex items-center justify-between text-sm text-[color:var(--color-text-muted)]">
            <span>
              {files.length} file{files.length !== 1 ? "s" : ""} selected
            </span>
            <span>Total size: {formatFileSize(totalSize)}</span>
          </div>
        </>
      )}

      {error && (
        <div className="rounded-lg bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]" role="alert">
          {error}
        </div>
      )}

      {progress > 0 && progress < 100 && (
        <ProgressBar progress={progress} />
      )}

      {!result ? (
        <button
          onClick={handleMerge}
          disabled={files.length < 2 || isProcessing}
          className="w-full rounded-lg bg-[color:var(--color-accent)] py-3 font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[color:var(--color-accent)]"
        >
          {isProcessing ? "Merging..." : "Merge PDFs"}
        </button>
      ) : (
        <DownloadButton
          onClick={handleDownload}
          label="Download Merged PDF"
          className="w-full"
        />
      )}
    </div>
  );
}
