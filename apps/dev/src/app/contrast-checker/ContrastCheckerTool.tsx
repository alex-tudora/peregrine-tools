"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { logActivity } from "@peregrine/ui";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(rgb: RGB): string {
  return (
    "#" +
    [rgb.r, rgb.g, rgb.b]
      .map((c) => Math.round(c).toString(16).padStart(2, "0"))
      .join("")
  );
}

function isValidHex(hex: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex.trim());
}

function normalizeHex(hex: string): string {
  const clean = hex.trim().replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  return "#" + full.toLowerCase();
}

/**
 * Convert an sRGB channel (0-255) to linear RGB using the official sRGB transfer function.
 */
function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Calculate relative luminance per WCAG 2.x definition.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function relativeLuminance(rgb: RGB): number {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * WCAG contrast ratio between two colors.
 */
function contrastRatio(color1: RGB, color2: RGB): number {
  const l1 = relativeLuminance(color1);
  const l2 = relativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

interface WCAGResult {
  label: string;
  threshold: number;
  pass: boolean;
}

function evaluateWCAG(ratio: number): WCAGResult[] {
  return [
    { label: "AA Normal Text", threshold: 4.5, pass: ratio >= 4.5 },
    { label: "AA Large Text", threshold: 3, pass: ratio >= 3 },
    { label: "AAA Normal Text", threshold: 7, pass: ratio >= 7 },
    { label: "AAA Large Text", threshold: 4.5, pass: ratio >= 4.5 },
  ];
}

/**
 * Attempt to adjust the text color (lighten or darken) to meet a target contrast ratio
 * against the background. Returns the adjusted hex or null if not achievable.
 */
function suggestTextColor(
  textRgb: RGB,
  bgRgb: RGB,
  targetRatio: number
): string | null {
  const bgLum = relativeLuminance(bgRgb);

  // Try darkening and lightening, pick the one that reaches target first
  const directions = [
    { factor: -1, label: "darken" },
    { factor: 1, label: "lighten" },
  ];

  for (const { factor } of directions) {
    let r = textRgb.r;
    let g = textRgb.g;
    let b = textRgb.b;

    for (let step = 0; step <= 255; step++) {
      const candidate: RGB = {
        r: Math.min(255, Math.max(0, Math.round(r + factor * step))),
        g: Math.min(255, Math.max(0, Math.round(g + factor * step))),
        b: Math.min(255, Math.max(0, Math.round(b + factor * step))),
      };
      const candLum = relativeLuminance(candidate);
      const lighter = Math.max(candLum, bgLum);
      const darker = Math.min(candLum, bgLum);
      const ratio = (lighter + 0.05) / (darker + 0.05);
      if (ratio >= targetRatio) {
        return rgbToHex(candidate);
      }
    }
  }

  return null;
}

export function ContrastCheckerTool() {
  const [textColor, setTextColor] = useState("#1e3a5f");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textInput, setTextInput] = useState("#1e3a5f");
  const [bgInput, setBgInput] = useState("#ffffff");
  const logTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleLog = useCallback(() => {
    if (logTimerRef.current) clearTimeout(logTimerRef.current);
    logTimerRef.current = setTimeout(() => {
      logActivity({
        tool: "Color Contrast Checker",
        toolHref: "/contrast-checker",
        description: "Checked contrast ratio",
      });
    }, 600);
  }, []);

  const textRgb = useMemo(() => hexToRgb(textColor), [textColor]);
  const bgRgb = useMemo(() => hexToRgb(bgColor), [bgColor]);
  const ratio = useMemo(() => contrastRatio(textRgb, bgRgb), [textRgb, bgRgb]);
  const results = useMemo(() => evaluateWCAG(ratio), [ratio]);

  const failingThreshold = useMemo(() => {
    // Find the lowest threshold that fails — suggest for AA Normal (4.5)
    if (ratio < 4.5) return 4.5;
    if (ratio < 7) return 7;
    return null;
  }, [ratio]);

  const suggestion = useMemo(() => {
    if (!failingThreshold) return null;
    return suggestTextColor(textRgb, bgRgb, failingThreshold);
  }, [textRgb, bgRgb, failingThreshold]);

  const handleTextColorChange = useCallback(
    (hex: string) => {
      setTextInput(hex);
      if (isValidHex(hex)) {
        setTextColor(normalizeHex(hex));
        scheduleLog();
      }
    },
    [scheduleLog]
  );

  const handleBgColorChange = useCallback(
    (hex: string) => {
      setBgInput(hex);
      if (isValidHex(hex)) {
        setBgColor(normalizeHex(hex));
        scheduleLog();
      }
    },
    [scheduleLog]
  );

  const handleTextPickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setTextColor(v);
      setTextInput(v);
      scheduleLog();
    },
    [scheduleLog]
  );

  const handleBgPickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setBgColor(v);
      setBgInput(v);
      scheduleLog();
    },
    [scheduleLog]
  );

  const handleSwap = useCallback(() => {
    setTextColor(bgColor);
    setBgColor(textColor);
    setTextInput(bgColor);
    setBgInput(textColor);
    scheduleLog();
  }, [textColor, bgColor, scheduleLog]);

  const handleApplySuggestion = useCallback(() => {
    if (suggestion) {
      setTextColor(suggestion);
      setTextInput(suggestion);
      scheduleLog();
    }
  }, [suggestion, scheduleLog]);

  const ratioStr = ratio.toFixed(2) + ":1";

  return (
    <div className="space-y-6">
      {/* Color Inputs */}
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        {/* Text Color */}
        <div className="space-y-2">
          <label
            htmlFor="text-color"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)]"
          >
            Text Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={textColor}
              onChange={handleTextPickerChange}
              className="h-11 w-14 shrink-0 cursor-pointer rounded-lg border border-[color:var(--color-border)]"
            />
            <input
              id="text-color"
              type="text"
              value={textInput}
              onChange={(e) => handleTextColorChange(e.target.value)}
              placeholder="#1e3a5f"
              className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex items-end justify-center pb-1">
          <button
            onClick={handleSwap}
            title="Swap colors"
            className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-2.5 text-[color:var(--color-text-muted)] transition-colors hover:bg-[color:var(--color-bg-page)] hover:text-[color:var(--color-text-primary)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* Background Color */}
        <div className="space-y-2">
          <label
            htmlFor="bg-color"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)]"
          >
            Background Color
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={handleBgPickerChange}
              className="h-11 w-14 shrink-0 cursor-pointer rounded-lg border border-[color:var(--color-border)]"
            />
            <input
              id="bg-color"
              type="text"
              value={bgInput}
              onChange={(e) => handleBgColorChange(e.target.value)}
              placeholder="#ffffff"
              className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div
        className="rounded-2xl border-2 border-[color:var(--color-border)] p-6"
        style={{ backgroundColor: bgColor }}
      >
        <p
          className="mb-2 text-2xl font-bold"
          style={{ color: textColor }}
        >
          Large Text Preview (24px bold)
        </p>
        <p
          className="text-base"
          style={{ color: textColor }}
        >
          Normal text preview — The quick brown fox jumps over the lazy dog. This
          sample text helps you evaluate readability at body-copy size (16px).
        </p>
      </div>

      {/* Contrast Ratio */}
      <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6">
        <div className="mb-4 text-center">
          <p className="text-sm font-medium text-[color:var(--color-text-muted)]">
            Contrast Ratio
          </p>
          <p className="mt-1 text-4xl font-bold text-[color:var(--color-text-primary)]">
            {ratioStr}
          </p>
        </div>

        {/* WCAG Results */}
        <div className="grid gap-3 sm:grid-cols-2">
          {results.map((result) => (
            <div
              key={result.label}
              className="flex items-center justify-between rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-page)] px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-[color:var(--color-text-primary)]">
                  {result.label}
                </p>
                <p className="text-xs text-[color:var(--color-text-muted)]">
                  Requires {result.threshold}:1
                </p>
              </div>
              {result.pass ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Suggestion */}
      {failingThreshold && suggestion && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="mb-3 text-sm font-medium text-amber-900">
            Suggestion: adjust text color to meet{" "}
            {failingThreshold === 4.5 ? "AA Normal Text" : "AAA Normal Text"} (
            {failingThreshold}:1)
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-white px-4 py-2.5">
              <div
                className="h-8 w-8 shrink-0 rounded-md border border-amber-200"
                style={{ backgroundColor: suggestion }}
              />
              <span className="font-mono text-sm text-amber-900">
                {suggestion.toUpperCase()}
              </span>
            </div>
            <button
              onClick={handleApplySuggestion}
              className="rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
            >
              Apply
            </button>
          </div>
          {/* Mini preview of suggestion */}
          <div
            className="mt-3 rounded-lg p-3"
            style={{ backgroundColor: bgColor }}
          >
            <p className="text-sm" style={{ color: suggestion }}>
              Preview with suggested color: The quick brown fox jumps over the
              lazy dog.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
