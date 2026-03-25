"use client";

import React, { useState, useCallback } from "react";
import { Dropzone, ProgressBar, logActivity } from "@peregrine/ui";
import { downloadFile, readFileAsArrayBuffer } from "@/lib/download";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

export function PdfToTextTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFiles = useCallback((files: File[]) => {
    setFile(files[0] ?? null);
    setExtractedText("");
    setProgress(0);
    setStatusText("");
    setError(null);
  }, []);

  const handleExtract = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(5);
    setStatusText("Reading PDF...");
    setError(null);
    setExtractedText("");
    setCopied(false);

    try {
      const buffer = await readFileAsArrayBuffer(file);
      setProgress(10);
      setStatusText("Loading PDF document...");

      const pdfData = new Uint8Array(buffer.slice(0));
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const totalPages = pdf.numPages;

      if (totalPages === 0) {
        throw new Error("The PDF has no pages to process.");
      }

      setProgress(15);
      const allText: string[] = [];

      for (let i = 1; i <= totalPages; i++) {
        setStatusText(`Extracting page ${i} of ${totalPages}...`);

        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
        allText.push(text);

        const extractProgress = 15 + (i / totalPages) * 80;
        setProgress(Math.round(extractProgress));
      }

      const result = allText
        .map((text, i) => `--- Page ${i + 1} ---\n${text}`)
        .join("\n\n")
        .trim();

      if (!result || allText.every((t) => t.trim() === "")) {
        throw new Error(
          "No text could be extracted. This PDF may contain scanned images instead of digital text. Try our OCR PDF tool for scanned documents."
        );
      }

      setExtractedText(result);
      setProgress(100);
      setStatusText("Done!");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to extract text. Please try another file."
      );
    } finally {
      setIsProcessing(false);
    }
  }, [file]);

  const wordCount = extractedText
    ? extractedText.split(/\s+/).filter(Boolean).length
    : 0;
  const charCount = extractedText.length;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = extractedText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    logActivity({
      tool: "PDF to Text",
      toolHref: "/pdf-to-text",
      description: "Copied extracted text to clipboard",
    });
  }, [extractedText]);

  const handleDownload = useCallback(() => {
    const baseName = file?.name.replace(/\.pdf$/i, "") ?? "extracted-text";
    const blob = new Blob([extractedText], { type: "text/plain" });
    downloadFile(blob, `${baseName}-text.txt`);
    logActivity({
      tool: "PDF to Text",
      toolHref: "/pdf-to-text",
      description: "Downloaded extracted text as TXT",
    });
  }, [extractedText, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setExtractedText("");
    setProgress(0);
    setStatusText("");
    setError(null);
    setIsProcessing(false);
    setCopied(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      {!file && (
        <Dropzone
          accept={[".pdf"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your PDF here"
        />
      )}

      {/* File info & controls */}
      {file && !extractedText && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">
                {file.name}
              </p>
              <p className="text-xs text-[color:var(--color-text-muted)]">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-[color:var(--color-text-muted)] hover:text-red-500 transition-colors"
              aria-label="Remove file"
            >
              Change file
            </button>
          </div>

          {/* Progress bar */}
          {isProcessing && (
            <div className="mt-5 space-y-2">
              <ProgressBar progress={progress} className="" />
              <p className="text-xs text-[color:var(--color-text-muted)]">
                {statusText}
              </p>
            </div>
          )}

          {/* Extract button */}
          <div className="mt-5">
            <button
              onClick={handleExtract}
              disabled={isProcessing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md hover:shadow-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-[color:var(--color-accent)]"
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
                  Extracting Text...
                </>
              ) : (
                "Extract Text"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="rounded-lg bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Results */}
      {extractedText && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-[color:var(--color-text-muted)]">
            <span>{wordCount.toLocaleString()} words</span>
            <span>{charCount.toLocaleString()} characters</span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md hover:shadow-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {copied ? "Copied!" : "Copy Text"}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-5 py-3 text-sm font-medium text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] hover:border-[color:var(--color-border-hover)]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download as TXT
            </button>
            <button
              onClick={handleReset}
              className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-5 py-3 text-sm font-medium text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] hover:border-[color:var(--color-border-hover)]"
            >
              Extract from another
            </button>
          </div>

          {/* Text output */}
          <textarea
            readOnly
            value={extractedText}
            rows={20}
            className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 font-mono text-sm text-[color:var(--color-text-primary)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)] resize-y"
          />
        </div>
      )}
    </div>
  );
}
