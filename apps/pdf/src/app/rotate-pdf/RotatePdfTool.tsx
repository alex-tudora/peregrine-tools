"use client";

import { useState, useCallback, useMemo } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { Dropzone, DownloadButton, ProgressBar, logActivity } from "@peregrine/ui";
import { downloadFile, downloadAsZip, readFileAsArrayBuffer, formatFileSize } from "@/lib/download";

type RotationAngle = 90 | 180 | 270;

const ROTATION_OPTIONS: { value: RotationAngle; label: string }[] = [
  { value: 90, label: "90\u00B0 clockwise" },
  { value: 180, label: "180\u00B0" },
  { value: 270, label: "270\u00B0 clockwise (90\u00B0 counter-clockwise)" },
];

interface FileEntry {
  buffer: ArrayBuffer;
  name: string;
  size: number;
  resultBytes: Uint8Array | null;
  status: "pending" | "processing" | "done" | "error";
}

export function RotatePdfTool() {
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [angle, setAngle] = useState<RotationAngle>(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    setError(null);

    const newEntries: FileEntry[] = [];
    for (const file of files) {
      try {
        const buffer = await readFileAsArrayBuffer(file);
        // Validate it's a readable PDF
        await PDFDocument.load(buffer);
        newEntries.push({
          buffer,
          name: file.name,
          size: file.size,
          resultBytes: null,
          status: "pending",
        });
      } catch {
        // skip unreadable / corrupted files
      }
    }

    if (newEntries.length === 0) {
      setError("Could not read the selected PDF(s). The files may be corrupted or password-protected.");
      return;
    }

    setEntries((prev) => [...prev, ...newEntries]);
  }, []);

  const handleRotate = useCallback(async () => {
    setIsProcessing(true);
    setError(null);
    setProgress(0);

    for (let i = 0; i < entries.length; i++) {
      if (entries[i].status === "done") continue;

      setEntries((prev) =>
        prev.map((e, j) => (j === i ? { ...e, status: "processing" } : e))
      );

      try {
        const pdf = await PDFDocument.load(entries[i].buffer);
        const pages = pdf.getPages();

        for (const page of pages) {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees(currentRotation + angle));
        }

        const output = await pdf.save();

        setEntries((prev) =>
          prev.map((e, j) =>
            j === i ? { ...e, resultBytes: output, status: "done" } : e
          )
        );
      } catch {
        setEntries((prev) =>
          prev.map((e, j) =>
            j === i ? { ...e, status: "error" } : e
          )
        );
      }

      setProgress(Math.round(((i + 1) / entries.length) * 100));
      // Yield to let the UI repaint between files
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setIsProcessing(false);
  }, [entries, angle]);

  const doneEntries = useMemo(() => entries.filter((e) => e.status === "done"), [entries]);
  const allDone = entries.length > 0 && doneEntries.length === entries.length;
  const hasEntries = entries.length > 0;
  const processingIndex = useMemo(
    () => entries.findIndex((e) => e.status === "processing"),
    [entries]
  );

  const handleDownload = useCallback((entry: FileEntry) => {
    if (!entry.resultBytes) return;
    const baseName = entry.name.replace(/\.pdf$/i, "");
    downloadFile(entry.resultBytes, `${baseName}_rotated.pdf`);
    logActivity({ tool: "Rotate PDF", toolHref: "/rotate-pdf", description: "Rotated PDF pages" });
  }, []);

  const handleDownloadAll = useCallback(async () => {
    const files = doneEntries.map((entry) => ({
      data: entry.resultBytes!,
      name: `${entry.name.replace(/\.pdf$/i, "")}_rotated.pdf`,
    }));
    await downloadAsZip(files, "rotated-pdfs.zip");
    logActivity({ tool: "Rotate PDF", toolHref: "/rotate-pdf", description: "Rotated PDF pages" });
  }, [doneEntries]);

  const handleRemove = useCallback((index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleReset = useCallback(() => {
    setEntries([]);
    setAngle(90);
    setIsProcessing(false);
    setProgress(0);
    setError(null);
  }, []);

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

      {/* Dropzone — always visible to allow adding more files (hidden during processing and when all done) */}
      {!isProcessing && !allDone && (
        <Dropzone
          accept={[".pdf"]}
          multiple={true}
          onFiles={handleFiles}
          label={entries.length === 0 ? "Drop your PDF files here" : "Drop more PDFs to add"}
        />
      )}

      {/* Progress bar */}
      {isProcessing && (
        <ProgressBar progress={progress} />
      )}

      {/* Files + controls */}
      {hasEntries && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
          {/* File list header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[color:var(--color-text-primary)]">
                {entries.length} file{entries.length !== 1 ? "s" : ""}
              </p>
              {!isProcessing && (
                <button
                  onClick={handleReset}
                  className="shrink-0 rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* File list */}
            <div className="max-h-48 overflow-y-auto space-y-1.5">
              {entries.map((entry, i) => (
                <div
                  key={`${entry.name}-${i}`}
                  className="flex items-center gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-[color:var(--color-text-primary)]">
                      {entry.name}
                    </p>
                    <p className="text-[10px] text-[color:var(--color-text-muted)]">
                      {formatFileSize(entry.size)}
                      {entry.status === "processing" && (
                        <span className="text-[color:var(--color-accent)]"> Rotating...</span>
                      )}
                      {entry.status === "done" && (
                        <span className="text-emerald-600"> Done</span>
                      )}
                      {entry.status === "error" && (
                        <span className="text-red-500"> Failed</span>
                      )}
                    </p>
                  </div>
                  {!isProcessing && entry.status !== "processing" && (
                    <button
                      onClick={() =>
                        entry.status === "done"
                          ? handleDownload(entry)
                          : handleRemove(i)
                      }
                      className="shrink-0 text-xs font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]"
                    >
                      {entry.status === "done" ? "\u2193" : "\u2715"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Rotation angle selector */}
          {!allDone && (
            <fieldset className="mt-5">
              <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
                Rotation angle
              </legend>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                {ROTATION_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none ${
                      angle === opt.value
                        ? "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] font-medium"
                        : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-border-hover)] hover:bg-[color:var(--color-bg-elevated)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="rotation-angle"
                      value={opt.value}
                      checked={angle === opt.value}
                      onChange={() => setAngle(opt.value)}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {/* Page selection — all pages (shared for all files) */}
          {!allDone && (
            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
                Pages to rotate
              </label>
              <div className="flex gap-4">
                <label
                  className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors select-none border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] font-medium"
                >
                  <input
                    type="radio"
                    name="page-mode"
                    value="all"
                    checked
                    readOnly
                    className="sr-only"
                  />
                  All pages
                </label>
              </div>
            </div>
          )}

          {/* Rotate button */}
          {!allDone && (
            <button
              onClick={handleRotate}
              disabled={isProcessing || entries.length === 0}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {isProcessing ? (
                <>
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
                  Rotating {processingIndex >= 0 ? processingIndex + 1 : doneEntries.length + 1} of {entries.length}...
                </>
              ) : (
                `Rotate ${entries.length} PDF${entries.length !== 1 ? "s" : ""}`
              )}
            </button>
          )}

          {/* Results — shown when all files are done */}
          {allDone && (
            <div className="mt-5 space-y-4">
              {/* Summary */}
              <div className="rounded-lg bg-[color:var(--color-bg-elevated)] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">
                    {entries.length} file{entries.length !== 1 ? "s" : ""} rotated
                  </span>
                  <span className="text-lg font-bold text-emerald-600">
                    {angle}&deg; applied
                  </span>
                </div>
              </div>

              {/* Download actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                {entries.length > 1 ? (
                  <DownloadButton
                    onClick={handleDownloadAll}
                    label="Download All as ZIP"
                    className="flex-1"
                  />
                ) : (
                  <DownloadButton
                    onClick={() => handleDownload(entries[0])}
                    label="Download Rotated PDF"
                    className="flex-1"
                  />
                )}
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Rotate more
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
