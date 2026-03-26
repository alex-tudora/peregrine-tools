"use client";

import { useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Dropzone, DownloadButton, logActivity, useConfetti, usePreference } from "@peregrine/ui";
import { pdfToImages, imagesToPdf, type ImageInput } from "@/lib/convert";
import { downloadFile, formatFileSize, readFileAsArrayBuffer } from "@/lib/download";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url,
).toString();

type OptimizeQuality = "balanced" | "high" | "maximum";

const QUALITY_OPTIONS: {
  value: OptimizeQuality;
  label: string;
  description: string;
  jpegQuality: number;
}[] = [
  {
    value: "balanced",
    label: "Balanced",
    description: "JPEG 75% — smallest file size",
    jpegQuality: 0.75,
  },
  {
    value: "high",
    label: "High Quality",
    description: "JPEG 85% — great balance",
    jpegQuality: 0.85,
  },
  {
    value: "maximum",
    label: "Maximum",
    description: "JPEG 95% — near-lossless",
    jpegQuality: 0.95,
  },
];

interface StepStatus {
  label: string;
  state: "pending" | "active" | "done";
}

export default function OptimizePdfTool() {
  const [file, setFile] = useState<{ buffer: ArrayBuffer; name: string; size: number } | null>(null);
  const [quality, setQuality] = usePreference<OptimizeQuality>("optimize-pdf-quality", "high");
  const [isProcessing, setIsProcessing] = useState(false);
  const [steps, setSteps] = useState<StepStatus[]>([]);
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { fire: fireConfetti, Confetti } = useConfetti();

  const handleFiles = useCallback(async (files: File[]) => {
    setError(null);
    setResult(null);
    setResultSize(0);
    setSteps([]);

    const pdfFile = files[0];
    if (!pdfFile) return;

    try {
      const buffer = await readFileAsArrayBuffer(pdfFile);
      setFile({ buffer, name: pdfFile.name, size: pdfFile.size });
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  const updateStep = (index: number, state: StepStatus["state"], label?: string) => {
    setSteps((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, state, ...(label ? { label } : {}) } : s,
      ),
    );
  };

  const handleOptimize = useCallback(async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setResultSize(0);

    const qualityOption = QUALITY_OPTIONS.find((o) => o.value === quality)!;

    const initialSteps: StepStatus[] = [
      { label: "Analyzing PDF...", state: "active" },
      { label: "Rendering pages as images...", state: "pending" },
      { label: "Rebuilding optimized PDF...", state: "pending" },
      { label: "Finalizing...", state: "pending" },
    ];
    setSteps(initialSteps);

    try {
      // Step 1: Analyze PDF — count pages
      await new Promise((resolve) => setTimeout(resolve, 50));
      const pdfData = new Uint8Array(file.buffer.slice(0));
      const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const pageCount = pdfDoc.numPages;
      pdfDoc.destroy();

      setSteps((prev) =>
        prev.map((s, i) => {
          if (i === 0) return { label: `Analyzed PDF — ${pageCount} page${pageCount !== 1 ? "s" : ""} found`, state: "done" };
          if (i === 1) return { ...s, label: `Rendering ${pageCount} page${pageCount !== 1 ? "s" : ""} as images...`, state: "active" };
          return s;
        }),
      );

      await new Promise((resolve) => setTimeout(resolve, 50));

      // Step 2: Render all pages as JPEG images
      const renderedPages = await pdfToImages(
        file.buffer.slice(0),
        "jpg",
        qualityOption.jpegQuality,
        2,
      );

      updateStep(1, "done", `Rendered ${renderedPages.length} page${renderedPages.length !== 1 ? "s" : ""} as JPEG (${qualityOption.jpegQuality * 100}% quality)`);
      updateStep(2, "active");

      await new Promise((resolve) => setTimeout(resolve, 50));

      // Step 3: Convert rendered pages to ImageInput[] and rebuild as PDF
      const imageInputs: ImageInput[] = [];
      for (const page of renderedPages) {
        const arrayBuf = await page.data.arrayBuffer();
        imageInputs.push({
          data: arrayBuf,
          width: page.width,
          height: page.height,
        });
      }

      const optimizedPdf = await imagesToPdf(imageInputs, "fit");

      updateStep(2, "done", "Rebuilt optimized PDF");

      // Step 4: Done — show results
      const reduction = Math.round(
        ((file.size - optimizedPdf.byteLength) / file.size) * 100,
      );

      const doneLabel =
        reduction > 0
          ? `Done! Reduced from ${formatFileSize(file.size)} to ${formatFileSize(optimizedPdf.byteLength)} (${reduction}% smaller)`
          : `Done! ${formatFileSize(file.size)} to ${formatFileSize(optimizedPdf.byteLength)} — file was already well-optimized`;

      updateStep(3, "done", doneLabel);

      setResult(optimizedPdf);
      setResultSize(optimizedPdf.byteLength);
      fireConfetti();
    } catch {
      setError("Optimization failed. The PDF may be corrupted or unsupported.");
      setSteps((prev) =>
        prev.map((s) =>
          s.state === "active" ? { ...s, state: "pending" } : s,
        ),
      );
    } finally {
      setIsProcessing(false);
    }
  }, [file, quality, fireConfetti]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const baseName = file.name.replace(/\.pdf$/i, "");
    downloadFile(result, `${baseName}-optimized.pdf`);
    logActivity({
      tool: "Optimize PDF",
      toolHref: "/optimize-pdf",
      description: "Optimized a PDF with deep image compression",
    });
  }, [result, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResult(null);
    setResultSize(0);
    setSteps([]);
    setIsProcessing(false);
    setError(null);
  }, []);

  const allDone = result !== null;
  const reduction =
    file && resultSize > 0
      ? Math.round(((file.size - resultSize) / file.size) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Dropzone — visible until processing or done */}
      {!isProcessing && !allDone && (
        <Dropzone
          accept={[".pdf"]}
          multiple={false}
          onFiles={handleFiles}
          label={file ? "Drop a different PDF to replace" : "Drop your PDF file here"}
        />
      )}

      {/* File info + controls */}
      {file && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
          {/* File info */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-bg-elevated)]">
              <svg
                className="h-5 w-5 text-[color:var(--color-accent)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">
                {file.name}
              </p>
              <p className="text-xs text-[color:var(--color-text-muted)]">
                {formatFileSize(file.size)}
              </p>
            </div>
            {!isProcessing && (
              <button
                onClick={handleReset}
                className="shrink-0 rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quality selector */}
          {!allDone && !isProcessing && (
            <fieldset className="mt-5">
              <legend className="mb-2.5 text-sm font-medium text-[color:var(--color-text-secondary)]">
                Image quality
              </legend>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {QUALITY_OPTIONS.map((option) => {
                  const isSelected = quality === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`
                        flex cursor-pointer flex-col rounded-lg border-2 px-4 py-3 transition-all
                        ${
                          isSelected
                            ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] ring-1 ring-sky-500/20"
                            : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] hover:border-[color:var(--color-border-hover)]"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="optimize-quality"
                        value={option.value}
                        checked={isSelected}
                        onChange={() => setQuality(option.value)}
                        className="sr-only"
                      />
                      <span
                        className={`text-sm font-semibold ${
                          isSelected
                            ? "text-[color:var(--color-accent)]"
                            : "text-[color:var(--color-text-primary)]"
                        }`}
                      >
                        {option.label}
                      </span>
                      <span className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                        {option.description}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Processing steps — build log style */}
          {steps.length > 0 && (
            <div className="mt-5 space-y-2">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ${
                    step.state === "done"
                      ? "bg-[color:var(--color-success-bg,#ecfdf5)]"
                      : step.state === "active"
                        ? "bg-[color:var(--color-bg-elevated)]"
                        : "opacity-40"
                  }`}
                >
                  {/* Status icon */}
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                    {step.state === "done" && (
                      <svg
                        className="h-4 w-4 text-[color:var(--color-success,#059669)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                    {step.state === "active" && (
                      <svg
                        className="h-4 w-4 animate-spin text-[color:var(--color-accent)]"
                        fill="none"
                        viewBox="0 0 24 24"
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
                    )}
                    {step.state === "pending" && (
                      <div className="h-2 w-2 rounded-full bg-[color:var(--color-text-muted)]" />
                    )}
                  </div>

                  {/* Step label */}
                  <span
                    className={`${
                      step.state === "done"
                        ? "font-medium text-[color:var(--color-success,#059669)]"
                        : step.state === "active"
                          ? "font-medium text-[color:var(--color-text-primary)]"
                          : "text-[color:var(--color-text-muted)]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Optimize button */}
          {!allDone && (
            <button
              onClick={handleOptimize}
              disabled={isProcessing || !file}
              className="btn-action mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md hover:shadow-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:bg-[color:var(--color-accent)]"
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
                  Optimizing...
                </>
              ) : (
                "Optimize PDF"
              )}
            </button>
          )}

          {/* Results */}
          {allDone && (
            <div className="mt-5 space-y-4 relative">
              {/* Size comparison */}
              <div className="rounded-lg bg-[color:var(--color-bg-elevated)] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">
                    Original size
                  </span>
                  <span className="font-medium text-[color:var(--color-text-primary)]">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-text-secondary)]">
                    Optimized size
                  </span>
                  <span className="font-medium text-[color:var(--color-text-primary)]">
                    {formatFileSize(resultSize)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-[color:var(--color-border)] pt-3">
                  <span className="text-sm font-medium text-[color:var(--color-text-secondary)]">
                    Reduction
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      reduction > 0
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {reduction > 0
                      ? `Reduced by ${reduction}%`
                      : reduction === 0
                        ? "No size change"
                        : `Increased by ${Math.abs(reduction)}%`}
                  </span>
                </div>
              </div>

              {Confetti}

              {/* Download actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadButton
                  onClick={handleDownload}
                  label="Download Optimized PDF"
                  className="flex-1"
                />
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                >
                  Optimize another
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
