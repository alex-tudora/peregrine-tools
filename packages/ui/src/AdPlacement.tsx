import React from "react";

interface AdPlacementProps {
  className?: string;
}

export function AdPlacement({ className = "" }: AdPlacementProps) {
  return (
    <div
      className={`min-h-[90px] rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] flex items-center justify-center text-[color:var(--color-text-muted)] text-xs ${className}`}
      aria-hidden="true"
    >
      Advertisement
    </div>
  );
}
