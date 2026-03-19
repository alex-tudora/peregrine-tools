import React from "react";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  if (clampedProgress === 0) return null;

  const isComplete = clampedProgress === 100;
  const isInProgress = clampedProgress > 0 && clampedProgress < 100;

  return (
    <div
      className={`relative h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--color-border)] ${className}`}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${clampedProgress}% complete`}
    >
      <div
        className={`
          h-full rounded-full
          transition-all duration-500 ease-[var(--ease-peregrine)]
          ${isComplete ? "bg-[color:var(--color-success)]" : ""}
        `}
        style={{
          width: `${clampedProgress}%`,
          ...(!isComplete
            ? {
                background:
                  "linear-gradient(90deg, var(--color-accent), var(--color-accent-hover), var(--color-accent))",
                backgroundSize: "200% 100%",
                animation: isInProgress
                  ? "peregrine-gradient-shift 2s ease infinite"
                  : undefined,
              }
            : {}),
          ...(isComplete
            ? { animation: "peregrine-pulse-complete 0.4s ease-out" }
            : {}),
        }}
      />
      {/* Subtle glow underneath */}
      {isInProgress && (
        <div
          className="absolute inset-0 rounded-full opacity-50 blur-sm"
          style={{
            width: `${clampedProgress}%`,
            background: "var(--color-accent)",
            boxShadow: "var(--shadow-accent)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
