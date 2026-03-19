"use client";

import React, { useCallback } from "react";

interface FileItem {
  name: string;
  size: number;
  id: string;
}

interface FileListProps {
  files: FileItem[];
  onRemove: (id: string) => void;
  onReorder?: (files: FileItem[]) => void;
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function FileList({ files, onRemove, onReorder, className = "" }: FileListProps) {
  const moveUp = useCallback(
    (index: number) => {
      if (index === 0 || !onReorder) return;
      const newFiles = [...files];
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
      onReorder(newFiles);
    },
    [files, onReorder]
  );

  const moveDown = useCallback(
    (index: number) => {
      if (index === files.length - 1 || !onReorder) return;
      const newFiles = [...files];
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
      onReorder(newFiles);
    },
    [files, onReorder]
  );

  if (files.length === 0) return null;

  return (
    <div className={className}>
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
          {/* File icon */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[color:var(--color-text-muted)]">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>

          {/* File info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[color:var(--color-text-primary)]">
              {file.name}
            </p>
            <p className="text-xs text-[color:var(--color-text-muted)]">
              {formatFileSize(file.size)}
            </p>
          </div>

          {/* Reorder buttons */}
          {onReorder && files.length > 1 && (
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="flex h-6 w-6 items-center justify-center rounded text-[color:var(--color-text-muted)] opacity-50 transition-all duration-200 hover:opacity-100 hover:bg-[color:var(--color-bg-elevated)] disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label={`Move ${file.name} up`}
                title="Move up"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === files.length - 1}
                className="flex h-6 w-6 items-center justify-center rounded text-[color:var(--color-text-muted)] opacity-50 transition-all duration-200 hover:opacity-100 hover:bg-[color:var(--color-bg-elevated)] disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label={`Move ${file.name} down`}
                title="Move down"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* Remove button */}
          <button
            onClick={() => onRemove(file.id)}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[color:var(--color-text-muted)] transition-all duration-200 hover:text-[color:var(--color-error)] hover:bg-[color:var(--color-error-bg,#fef2f2)]"
            aria-label={`Remove ${file.name}`}
            title="Remove file"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      {/* File count summary */}
      <div className="px-4 py-2.5 text-xs text-[color:var(--color-text-muted)]">
        {files.length} file{files.length !== 1 ? "s" : ""} selected
      </div>
    </div>
  );
}
