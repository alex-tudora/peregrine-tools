"use client";

import React from "react";

interface DownloadButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  className?: string;
}

export function DownloadButton({
  onClick,
  disabled = false,
  loading = false,
  label = "Download",
  className = "",
}: DownloadButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative inline-flex items-center justify-center gap-2.5
        w-full sm:w-auto
        rounded-xl px-8 py-3.5
        font-semibold text-white
        transition-all duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2
        ${
          loading
            ? "bg-[color:var(--color-accent)] opacity-80 cursor-wait"
            : isDisabled
              ? "bg-[color:var(--color-accent)] opacity-40 cursor-not-allowed"
              : "bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] hover:-translate-y-px hover:shadow-lg hover:shadow-[color:var(--color-accent)]/25 active:translate-y-0 active:shadow-md"
        }
        ${className}
      `}
    >
      {loading ? (
        <>
          {/* Spinner */}
          <svg
            className="h-4.5 w-4.5 animate-spin"
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
          <span>Processing...</span>
        </>
      ) : (
        <>
          {/* Download icon — arrow-down-to-line */}
          <svg
            className="h-[18px] w-[18px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16"
            />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
