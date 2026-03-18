import React from "react";

interface AdPlacementProps {
  className?: string;
}

export function AdPlacement({ className = "" }: AdPlacementProps) {
  return (
    <div
      className={`min-h-[90px] rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-sm ${className}`}
      aria-hidden="true"
    >
      Advertisement
    </div>
  );
}
