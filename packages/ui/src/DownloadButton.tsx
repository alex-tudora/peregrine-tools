"use client";

import React from "react";

interface DownloadButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export function DownloadButton({
  onClick,
  disabled = false,
  loading = false,
  label = "Download",
  variant = "primary",
  className = "",
}: DownloadButtonProps) {
  const isDisabled = disabled || loading;

  const variantClasses = {
    primary: isDisabled
      ? "border-2 border-[color:var(--color-accent)] text-[color:var(--color-accent)] opacity-40 bg-transparent cursor-not-allowed"
      : "border-2 border-[color:var(--color-accent)] text-[color:var(--color-accent)] bg-transparent hover:bg-[color:var(--color-accent)] hover:text-white hover:-translate-y-px hover:shadow-[var(--shadow-accent)] active:translate-y-0 active:shadow-[var(--shadow-md)]",
    secondary: isDisabled
      ? "border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] opacity-40 bg-transparent cursor-not-allowed"
      : "border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] bg-transparent hover:border-[color:var(--color-border-hover)] hover:text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-bg-elevated)]",
    ghost: isDisabled
      ? "text-[color:var(--color-text-muted)] opacity-40 cursor-not-allowed"
      : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-light)]",
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative inline-flex items-center justify-center gap-2.5
        w-full sm:w-auto
        rounded-xl px-8 py-3.5
        font-semibold
        transition-all duration-200 ease-[var(--ease-peregrine)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2
        ${loading ? "cursor-wait" : ""}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {loading ? (
        <>
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
