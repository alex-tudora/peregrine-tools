"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { Dropzone, DownloadButton, ProgressBar, logActivity, useConfetti } from "@peregrine/ui";
import { mergePdfs } from "@/lib/merge";
import { downloadFile, readFileAsArrayBuffer, formatFileSize } from "@/lib/download";

interface PdfFile {
  id: string;
  name: string;
  size: number;
  data: ArrayBuffer;
  pageCount: number;
}

export function MergePdfTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [resultPageCount, setResultPageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { fire: fireConfetti, Confetti } = useConfetti();

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0);

  const handleFiles = useCallback(async (newFiles: File[]) => {
    setError(null);
    setResult(null);
    setResultPageCount(0);
    setProgress(0);

    const pdfFiles: PdfFile[] = [];

    for (const file of newFiles) {
      try {
        const data = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(data, { ignoreEncryption: true });
        const pageCount = pdf.getPageCount();
        pdfFiles.push({
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          data,
          pageCount,
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
    setResultPageCount(0);
    setProgress(0);
    setError(null);
  }, []);

  const handleReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      setFiles((prev) => {
        const next = [...prev];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
      });
      setResult(null);
      setResultPageCount(0);
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
    setResultPageCount(0);

    try {
      const buffers = files.map((f) => f.data);
      const merged = await mergePdfs(buffers);
      const mergedPdf = await PDFDocument.load(merged);
      const mergedPages = mergedPdf.getPageCount();

      setResult(merged);
      setResultPageCount(mergedPages);
      setProgress(100);
      fireConfetti();
    } catch {
      setError("Something went wrong while merging your PDFs. Please check your files and try again.");
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  }, [files, fireConfetti]);

  const handleDownload = useCallback(() => {
    if (result) {
      downloadFile(result, "merged.pdf");
      logActivity({ tool: "Merge PDF", toolHref: "/merge-pdf", description: "Merged PDF files" });
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
          {/* Custom file list with page counts */}
          <div>
            {files.map((file, index) => (
              <div
                key={file.id}
                className={`
                  flex items-center gap-3 py-3 px-4 rounded-lg
                  transition-colors duration-200
                  hover:bg-[color:var(--color-bg-elevated)]
                  animate-arrive
                  ${index < files.length - 1 ? "border-b border-[color:var(--color-border)]" : ""}
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* PDF icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color:var(--color-bg-elevated)] text-lg" aria-hidden="true">
                  <svg className="h-5 w-5 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>

                {/* File info with page count */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">
                    {file.name}
                  </p>
                  <p className="text-xs text-[color:var(--color-text-muted)]">
                    {file.pageCount} {file.pageCount === 1 ? "page" : "pages"} &middot; {formatFileSize(file.size)}
                  </p>
                </div>

                {/* Reorder buttons — larger for touch */}
                {files.length > 1 && (
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => handleReorder(index, index - 1)}
                      disabled={index === 0}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[color:var(--color-text-muted)] opacity-50 transition-all duration-200 hover:opacity-100 hover:bg-[color:var(--color-bg-elevated)] disabled:opacity-20 disabled:cursor-not-allowed"
                      aria-label={`Move ${file.name} up`}
                      title="Move up"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleReorder(index, index + 1)}
                      disabled={index === files.length - 1}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-[color:var(--color-text-muted)] opacity-50 transition-all duration-200 hover:opacity-100 hover:bg-[color:var(--color-bg-elevated)] disabled:opacity-20 disabled:cursor-not-allowed"
                      aria-label={`Move ${file.name} down`}
                      title="Move down"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(file.id)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[color:var(--color-text-muted)] transition-all duration-200 hover:text-[color:var(--color-error)] hover:bg-[color:var(--color-error-bg,#fef2f2)]"
                  aria-label={`Remove ${file.name}`}
                  title="Remove file"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Total summary info bar */}
          <div className="flex items-center justify-between rounded-lg bg-[color:var(--color-bg-elevated)] px-4 py-2.5 text-sm text-[color:var(--color-text-muted)]">
            <span>
              Merging {totalPages} {totalPages === 1 ? "page" : "pages"} from {files.length} {files.length === 1 ? "file" : "files"}
            </span>
            <span>{formatFileSize(totalSize)}</span>
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
          className="btn-action w-full rounded-lg bg-[color:var(--color-accent)] py-3 font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[color:var(--color-accent)]"
        >
          {isProcessing ? "Merging..." : "Merge PDFs"}
        </button>
      ) : (
        <div className="space-y-3 relative">
          {/* Success stats */}
          <div className="flex items-center justify-center gap-2 rounded-lg bg-[color:var(--color-success-bg,#ecfdf5)] px-4 py-3 text-sm font-medium text-[color:var(--color-success,#059669)] animate-arrive">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Created 1 file &middot; {resultPageCount} {resultPageCount === 1 ? "page" : "pages"} &middot; {formatFileSize(result.length)}
          </div>
          {Confetti}
          <DownloadButton
            onClick={handleDownload}
            label="Download Merged PDF"
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
