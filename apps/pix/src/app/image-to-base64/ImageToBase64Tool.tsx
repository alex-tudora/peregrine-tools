"use client";

import { useState, useCallback, useMemo } from "react";
import { Dropzone } from "@peregrine/ui";
import { imageToBase64 } from "@/lib/convert";
import { formatFileSize, readFileAsDataUrl } from "@/lib/download";

export function ImageToBase64Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [base64String, setBase64String] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);
    setBase64String(null);
    setCopied(null);

    try {
      const dataUrl = await readFileAsDataUrl(selected);
      setPreview(dataUrl);
      setFile(selected);

      const result = await imageToBase64(selected);
      setBase64String(result);
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  const handleCopy = useCallback(
    async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
      } catch {
        setError("Failed to copy to clipboard. Please select and copy manually.");
      }
    },
    [],
  );

  const handleReset = useCallback(() => {
    setFile(null);
    setPreview(null);
    setBase64String(null);
    setCopied(null);
    setError(null);
  }, []);

  const htmlSnippet = useMemo(() => {
    if (!base64String) return "";
    return `<img src="${base64String}" alt="" />`;
  }, [base64String]);

  const cssSnippet = useMemo(() => {
    if (!base64String) return "";
    return `background-image: url('${base64String}');`;
  }, [base64String]);

  const base64Size = useMemo(() => {
    if (!base64String) return 0;
    return new Blob([base64String]).size;
  }, [base64String]);

  return (
    <div className="space-y-6">
      {/* Dropzone — only visible when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your image file here"
        />
      )}

      {/* File info + results */}
      {file && preview && base64String && (
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
              alt="Preview"
              className="max-h-48 rounded-lg border border-slate-100 object-contain"
            />
          </div>

          {/* Size info */}
          <div className="mt-4 rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">String length</span>
              <span className="font-medium text-slate-900">
                {base64String.length.toLocaleString()} characters
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-slate-600">Approximate size</span>
              <span className="font-medium text-slate-900">
                {formatFileSize(base64Size)}
              </span>
            </div>
          </div>

          {/* Base64 output */}
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="base64-output"
                className="text-sm font-medium text-slate-700"
              >
                Base64 data URL
              </label>
              <button
                onClick={() => handleCopy(base64String, "base64")}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-50"
              >
                {copied === "base64" ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
            <textarea
              id="base64-output"
              readOnly
              value={base64String}
              rows={5}
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          {/* HTML snippet */}
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">
                HTML img tag
              </p>
              <button
                onClick={() => handleCopy(htmlSnippet, "html")}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-50"
              >
                {copied === "html" ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              readOnly
              value={htmlSnippet}
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          {/* CSS snippet */}
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">
                CSS background-image
              </p>
              <button
                onClick={() => handleCopy(cssSnippet, "css")}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-50"
              >
                {copied === "css" ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              readOnly
              value={cssSnippet}
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          {/* Main copy button */}
          <button
            onClick={() => handleCopy(base64String, "base64")}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-violet-500/25 transition-all duration-200 hover:bg-violet-600 hover:shadow-md hover:shadow-violet-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            {copied === "base64" ? "Copied to Clipboard!" : "Copy to Clipboard"}
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}
