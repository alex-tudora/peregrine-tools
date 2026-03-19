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
          relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center
          rounded-2xl border-2 border-dashed p-8 text-center
          transition-all duration-300 ease-[var(--ease-peregrine)]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2
          ${
            isDragging
              ? "border-solid border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] scale-[1.01]"
              : "border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] hover:border-[color:var(--color-border-hover)]"
          }
        `}
        style={
          !isDragging
            ? {
                backgroundImage:
                  "radial-gradient(ellipse at center, var(--color-bg-elevated) 0%, var(--color-bg) 100%)",
              }
            : undefined
        }
      >
        {/* Upload icon — cloud with arrow */}
        <div
          className={`mb-5 transition-all duration-300 ${
            isDragging
              ? "text-[color:var(--color-accent)] animate-stoop"
              : "text-[color:var(--color-text-muted)] animate-float"
          }`}
        >
          <svg
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 48 48"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 32h16M24 32V18m0 0l-6 6m6-6l6 6"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.26 36C8.73 36 5 32.42 5 28c0-3.61 2.47-6.65 5.83-7.6C11.1 14.58 16.93 10 24 10c8.28 0 15 6.27 15 14 0 .34-.01.67-.04 1 2.9.86 5.04 3.5 5.04 6.62C44 35.04 41.27 38 37.87 38H34"
            />
          </svg>
        </div>

        <p className="font-serif text-lg font-medium text-[color:var(--color-text-secondary)]">
          {isDragging ? "Release to upload" : label}
        </p>
        <p className="mt-1.5 text-sm text-[color:var(--color-text-muted)]">
          or{" "}
          <span className="font-medium text-[color:var(--color-accent)] underline underline-offset-2">
            click to browse
          </span>
        </p>

        {accept.length > 0 && (
          <p className="mt-4 text-xs text-[color:var(--color-text-muted)]">
            Accepted formats: {accept.map((a) => a.replace(".", "").toUpperCase()).join(", ")}
          </p>
        )}
        <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">
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
        <div
          className="mt-3 rounded-xl bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-2.5 text-sm text-[color:var(--color-error)]"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}
