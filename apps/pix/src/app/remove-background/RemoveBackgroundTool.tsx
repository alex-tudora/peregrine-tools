"use client";

import { useState, useCallback } from "react";
import { Dropzone } from "@peregrine/ui";
import { readFileAsDataUrl, formatFileSize } from "@/lib/download";

export function RemoveBackgroundTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);

    try {
      const dataUrl = await readFileAsDataUrl(selected);
      setFile(selected);
      setPreview(dataUrl);
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  const handleReset = useCallback(() => {
    setFile(null);
    setPreview(null);
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone — only visible when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".jpg", ".jpeg", ".png", ".webp"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your image file here"
        />
      )}

      {/* File info + preview */}
      {file && preview && (
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
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Change file
            </button>
          </div>

          {/* Image preview */}
          <div className="mt-4 flex justify-center">
            <img
              src={preview}
              alt="Uploaded image"
              className="max-h-64 rounded-lg border border-slate-100 object-contain"
            />
          </div>

          {/* Coming soon info box */}
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  AI background removal is coming soon
                </p>
                <p className="mt-1 text-sm text-amber-700">
                  This feature requires a specialized model that we are
                  integrating. Bookmark this page and check back for updates.
                  In the meantime, try our other image tools below.
                </p>
              </div>
            </div>
          </div>

          {/* Disabled button */}
          <button
            type="button"
            disabled
            className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-300 px-6 py-3 text-sm font-semibold text-slate-500"
          >
            Remove Background — Coming Soon
          </button>

          {/* Links to other useful tools */}
          <div className="mt-5 rounded-lg bg-slate-50 p-4">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Try these tools while you wait
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/crop-image"
                className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-violet-600 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-violet-50"
              >
                Crop Image
              </a>
              <a
                href="/add-watermark"
                className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-violet-600 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-violet-50"
              >
                Add Watermark
              </a>
            </div>
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
    </div>
  );
}
