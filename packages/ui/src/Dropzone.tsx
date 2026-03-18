"use client";

import React, { useState, useRef, useCallback } from "react";

interface DropzoneProps {
  accept?: string[];
  multiple?: boolean;
  maxSize?: number;
  onFiles: (files: File[]) => void;
  label?: string;
  className?: string;
}

const DEFAULT_MAX_SIZE = 100 * 1024 * 1024; // 100 MB

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function Dropzone({
  accept = [],
  multiple = true,
  maxSize = DEFAULT_MAX_SIZE,
  onFiles,
  label = "Drop your files here",
  className = "",
}: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const validateFiles = useCallback(
    (fileList: FileList | File[]): File[] => {
      const files = Array.from(fileList);
      const valid: File[] = [];
      const errors: string[] = [];

      for (const file of files) {
        // Check file extension
        if (accept.length > 0) {
          const ext = "." + file.name.split(".").pop()?.toLowerCase();
          const mimeMatch = accept.some((a) => {
            if (a.startsWith(".")) return ext === a.toLowerCase();
            if (a.includes("*")) {
              const [type] = a.split("/");
              return file.type.startsWith(type + "/");
            }
            return file.type === a;
          });
          if (!mimeMatch) {
            errors.push(`"${file.name}" is not an accepted file type`);
            continue;
          }
        }

        // Check file size
        if (file.size > maxSize) {
          errors.push(`"${file.name}" exceeds ${formatBytes(maxSize)} limit`);
          continue;
        }

        valid.push(file);
      }

      if (errors.length > 0) {
        setError(errors.join(". "));
      } else {
        setError(null);
      }

      return valid;
    },
    [accept, maxSize]
  );

  const handleFiles = useCallback(
    (fileList: FileList | File[]) => {
      const valid = validateFiles(fileList);
      if (valid.length > 0) {
        onFiles(multiple ? valid : [valid[0]]);
      }
    },
    [validateFiles, onFiles, multiple]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
        // Reset so the same file can be selected again
        e.target.value = "";
      }
    },
    [handleFiles]
  );

  const acceptAttr = accept.length > 0 ? accept.join(",") : undefined;

  return (
    <div className={className}>
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className={`
          relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center
          rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2
          ${
            isDragging
              ? "border-sky-400 bg-sky-50/70"
              : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50/50"
          }
        `}
      >
        {/* Upload icon */}
        <div
          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
            isDragging ? "bg-sky-100 text-sky-500" : "bg-slate-100 text-slate-400"
          }`}
        >
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>

        <p className="text-base font-medium text-slate-700">
          {isDragging ? "Release to upload" : label}
        </p>
        <p className="mt-1.5 text-sm text-slate-500">
          or{" "}
          <span className="font-medium text-sky-500 underline underline-offset-2">
            browse files
          </span>
        </p>

        {accept.length > 0 && (
          <p className="mt-3 text-xs text-slate-400">
            Accepted formats: {accept.map((a) => a.replace(".", "").toUpperCase()).join(", ")}
          </p>
        )}
        <p className="mt-1 text-xs text-slate-400">
          Max file size: {formatBytes(maxSize)}
          {multiple ? "" : " (single file)"}
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={acceptAttr}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
