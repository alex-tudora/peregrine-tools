"use client";

import React from "react";

interface ToolActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label: string;
  loadingLabel?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  icon?: React.ReactNode;
}

export function ToolActionButton({
  onClick,
  disabled = false,
  loading = false,
  label,
  loadingLabel = "Processing...",
  variant = "primary",
  className = "",
  type = "button",
  icon,
}: ToolActionButtonProps) {
  const isDisabled = disabled || loading;

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: isDisabled
      ? "border-2 border-[color:var(--color-accent)] text-[color:var(--color-accent)] opacity-40 bg-transparent"
      : "border-2 border-[color:var(--color-accent)] text-[color:var(--color-accent)] bg-transparent hover:bg-[color:var(--color-accent)] hover:text-white hover:-translate-y-px hover:shadow-[var(--shadow-warm-accent)] active:translate-y-0",
    secondary: isDisabled
      ? "border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] opacity-40 bg-transparent"
      : "border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] bg-transparent hover:border-[color:var(--color-border-hover)] hover:text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-bg-elevated)]",
    ghost: isDisabled
      ? "text-[color:var(--color-text-muted)] opacity-40"
      : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-light)]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${loading ? "cursor-wait" : ""} ${className}`}
    >
      {loading ? (
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
          <span>{loadingLabel}</span>
        </>
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
