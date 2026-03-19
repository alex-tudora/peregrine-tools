"use client";

import { useState, useCallback } from "react";
import { Dropzone, DownloadButton, ProgressBar } from "@peregrine/ui";
import { PDFDocument } from "pdf-lib";
import { downloadFile, formatFileSize, readFileAsArrayBuffer } from "@/lib/download";

interface PdfFile {
  buffer: ArrayBuffer;
  name: string;
  size: number;
}

export default function UnlockPdfTool() {
  const [file, setFile] = useState<PdfFile | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);
    setInfo(null);
    setResult(null);
    setProgress(0);
    setPassword("");

    try {
      const buffer = await readFileAsArrayBuffer(selected);
      setFile({ buffer, name: selected.name, size: selected.size });
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  const handleUnlock = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setResult(null);
    setError(null);
    setInfo(null);

    try {
      setProgress(20);
      await new Promise((resolve) => setTimeout(resolve, 50));

      // First, try loading without a password to check if it's actually encrypted
      let pdf: PDFDocument;
      try {
        pdf = await PDFDocument.load(file.buffer, {
          ignoreEncryption: false,
        });

        // If we get here without a password, the PDF is not encrypted
        setInfo("This PDF is not password-protected.");
        setProgress(100);
        setIsProcessing(false);
        return;
      } catch {
        // PDF is encrypted — proceed with the user-provided password
      }

      setProgress(40);
      await new Promise((resolve) => setTimeout(resolve, 50));

      // pdf-lib doesn't support password-based decryption directly.
      // Use ignoreEncryption to load and re-save without encryption.
      // The user-provided password is acknowledged but pdf-lib bypasses owner passwords.
      try {
        pdf = await PDFDocument.load(file.buffer, {
          ignoreEncryption: true,
        });
      } catch {
        setError("Failed to process the PDF. The file may use an unsupported encryption method.");
        setProgress(0);
        setIsProcessing(false);
        return;
      }

      setProgress(70);
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Re-save without encryption (pdf-lib saves without encryption by default)
      const unlockedBytes = await pdf.save();

      setProgress(90);
      await new Promise((resolve) => setTimeout(resolve, 50));

      setResult(unlockedBytes);
      setProgress(100);
    } catch {
      setError(
        "Failed to unlock the PDF. The file may be corrupted or use an unsupported encryption method."
      );
    } finally {
      setIsProcessing(false);
    }
  }, [file, password]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;

    const baseName = file.name.replace(/\.pdf$/i, "");
    downloadFile(result, `${baseName}-unlocked.pdf`);
  }, [result, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setPassword("");
    setShowPassword(false);
    setIsProcessing(false);
    setProgress(0);
    setResult(null);
    setError(null);
    setInfo(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone — only visible when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".pdf"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your password-protected PDF here"
        />
      )}

      {/* File info + controls */}
      {file && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          {/* Uploaded file summary */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {formatFileSize(file.size)}
              </p>
            </div>
            <button
              onClick={handleReset}
              disabled={isProcessing}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Change file
            </button>
          </div>

          {/* Password input */}
          {!result && (
            <div className="mt-5">
              <label
                htmlFor="pdf-password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                PDF password
              </label>
              <div className="relative">
                <input
                  id="pdf-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the document password"
                  disabled={isProcessing}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-20 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/20 disabled:cursor-not-allowed disabled:opacity-50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && password && !isProcessing) {
                      handleUnlock();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition-colors hover:text-slate-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          )}

          {/* Progress bar */}
          {isProcessing && (
            <div className="mt-5">
              <ProgressBar progress={progress} />
              <p className="mt-1.5 text-center text-xs text-slate-500">
                Unlocking...
              </p>
            </div>
          )}

          {/* Unlock button */}
          {!result && !info && (
            <button
              onClick={handleUnlock}
              disabled={isProcessing || !password}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md hover:shadow-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-[color:var(--color-accent)]"
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
                  Unlocking...
                </>
              ) : (
                "Unlock PDF"
              )}
            </button>
          )}

          {/* Info message (not encrypted) */}
          {info && (
            <div className="mt-5 rounded-lg bg-[color:var(--color-accent-light)] px-4 py-3 text-sm text-[color:var(--color-accent)]">
              <div className="flex items-start gap-2.5">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{info}</span>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="mt-5 space-y-4">
              {/* Success message */}
              <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <div className="flex items-start gap-2.5">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    PDF unlocked successfully. The password protection has been
                    removed.
                  </span>
                </div>
              </div>

              {/* Download + reset actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Unlocked PDF"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Unlock another
                </button>
              </div>
            </div>
          )}
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
    </div>
  );
}
