"use client";

import { useState, useRef, useCallback } from "react";

interface BeforeAfterComparisonProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeSize?: string;
  afterSize?: string;
}

export function BeforeAfterComparison({
  beforeSrc,
  afterSrc,
  beforeLabel = "Original",
  afterLabel = "Compressed",
  beforeSize,
  afterSize,
}: BeforeAfterComparisonProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="space-y-2">
      {/* Labels */}
      <div className="flex justify-between text-xs">
        <span className="font-medium text-[color:var(--color-text-secondary)]">
          {beforeLabel} {beforeSize && <span className="text-[color:var(--color-text-muted)]">({beforeSize})</span>}
        </span>
        <span className="font-medium text-[color:var(--color-text-secondary)]">
          {afterLabel} {afterSize && <span className="text-[color:var(--color-text-muted)]">({afterSize})</span>}
        </span>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative cursor-col-resize select-none overflow-hidden rounded-lg border border-[color:var(--color-border)] touch-none"
      >
        {/* After image (full width, behind) */}
        <img
          src={afterSrc}
          alt={afterLabel}
          className="block w-full"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeSrc}
            alt={beforeLabel}
            className="block w-full"
            style={{ width: `${containerRef.current ? containerRef.current.offsetWidth : 0}px`, maxWidth: "none" }}
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[color:var(--color-accent)] shadow-lg">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4M8 15l4 4 4-4" />
            </svg>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-[color:var(--color-text-muted)]">
        Drag the slider to compare
      </p>
    </div>
  );
}
