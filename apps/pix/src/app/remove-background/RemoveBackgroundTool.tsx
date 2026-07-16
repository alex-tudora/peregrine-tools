"use client";

import { useState, useCallback } from "react";
import { Dropzone } from "@peregrine/ui";
import { readFileAsDataUrl, downloadBlob, formatFileSize } from "@/lib/download";

type Status = "idle" | "processing" | "done";

export function RemoveBackgroundTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setStatus("idle");
    try {
      const dataUrl = await readFileAsDataUrl(selected);
      setFile(selected);
      setPreview(dataUrl);
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  const handleRemove = useCallback(async () => {
    if (!file) return;
    setStatus("processing");
    setProgress(0);
    setError(null);
    try {
      // Loaded on demand — the model + wasm are several MB, so we keep them out
      // of the initial page bundle and only fetch them when the user acts.
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file, {
        progress: (_key: string, current: number, total: number) => {
          if (total > 0) setProgress(Math.round((current / total) * 100));
        },
      });
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setStatus("done");
    } catch (e) {
      setError(
        e instanceof Error
          ? `Background removal failed: ${e.message}`
          : "Background removal failed. Please try a different image."
      );
      setStatus("idle");
    }
  }, [file]);

  const handleReset = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setPreview(null);
    setResultUrl(null);
    setResultBlob(null);
    setStatus("idle");
    setProgress(0);
    setError(null);
  }, [resultUrl]);

  const handleDownload = useCallback(() => {
    if (!resultBlob || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(resultBlob, `${base}-no-bg-peregrine.png`);
  }, [resultBlob, file]);

  // Checkerboard so transparency is visible in the result preview.
  const checkerboard =
    "repeating-conic-gradient(#e5e5e5 0% 25%, #ffffff 0% 50%) 50% / 20px 20px";

  return (
    <div className="space-y-6">
      {!file && (
        <Dropzone
          accept={[".jpg", ".jpeg", ".png", ".webp"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your image file here"
        />
      )}

      {file && preview && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                {formatFileSize(file.size)}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="shrink-0 rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
            >
              Change file
            </button>
          </div>

          {/* Before / after */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <figure className="text-center">
              <img
                src={preview}
                alt="Original"
                className="mx-auto max-h-64 rounded-lg border border-[color:var(--color-border)] object-contain"
              />
              <figcaption className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                Original
              </figcaption>
            </figure>
            <figure className="text-center">
              <div
                className="flex min-h-[8rem] items-center justify-center rounded-lg border border-[color:var(--color-border)]"
                style={{ background: resultUrl ? checkerboard : undefined }}
              >
                {resultUrl ? (
                  <img
                    src={resultUrl}
                    alt="Background removed"
                    className="max-h-64 object-contain"
                  />
                ) : (
                  <span className="p-8 text-xs text-[color:var(--color-text-muted)]">
                    {status === "processing"
                      ? `Removing background… ${progress}%`
                      : "Result appears here"}
                  </span>
                )}
              </div>
              <figcaption className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                Background removed
              </figcaption>
            </figure>
          </div>

          {status === "processing" && (
            <div className="mt-5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-border)]">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-center text-xs text-[color:var(--color-text-muted)]">
                First run downloads the AI model (a few MB). It then runs entirely
                on your device — your image is never uploaded.
              </p>
            </div>
          )}

          {status !== "done" && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={status === "processing"}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-300"
            >
              {status === "processing" ? "Removing Background…" : "Remove Background"}
            </button>
          )}

          {status === "done" && (
            <button
              type="button"
              onClick={handleDownload}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download PNG
            </button>
          )}
        </div>
      )}

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
