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
      className={`h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--color-border)] ${className}`}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${clampedProgress}% complete`}
    >
      <div
        className={`
          h-full rounded-full
          transition-all duration-500 ease-out
          ${isComplete ? "bg-[color:var(--color-success)]" : "bg-[color:var(--color-accent)]"}
          ${isInProgress ? "animate-pulse" : ""}
        `}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}
