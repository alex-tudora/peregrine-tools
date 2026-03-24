"use client";

import { useState, useMemo, useCallback } from "react";

function hexToRgb(hex: string): { r: number; g: number; b: number; a: number } | null {
  let h = hex.replace(/^#/, "");
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  } else if (h.length === 4) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
  }
  if (h.length === 6) {
    h = h + "ff";
  }
  if (!/^[0-9a-fA-F]{8}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: Math.round((parseInt(h.slice(6, 8), 16) / 255) * 100) / 100,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      className="shrink-0 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-all hover:border-amber-400 hover:text-amber-600"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function OutputRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3">
      <span className="text-xs font-medium text-[color:var(--color-text-muted)] uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-2">
        <code className="text-sm font-mono text-[color:var(--color-text-primary)]">{value}</code>
        <CopyButton text={value} />
      </div>
    </div>
  );
}

export function HexToRgbTool() {
  const [hexInput, setHexInput] = useState("#FF5733");
  const [rgbR, setRgbR] = useState("255");
  const [rgbG, setRgbG] = useState("87");
  const [rgbB, setRgbB] = useState("51");
  const [alpha, setAlpha] = useState(1);

  const hexResult = useMemo(() => {
    const input = hexInput.startsWith("#") ? hexInput : `#${hexInput}`;
    return hexToRgb(input);
  }, [hexInput]);

  const rgbHex = useMemo(() => {
    const r = parseInt(rgbR) || 0;
    const g = parseInt(rgbG) || 0;
    const b = parseInt(rgbB) || 0;
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null;
    return rgbToHex(r, g, b);
  }, [rgbR, rgbG, rgbB]);

  const hsl = hexResult ? rgbToHsl(hexResult.r, hexResult.g, hexResult.b) : null;

  const previewColor = hexResult
    ? `rgba(${hexResult.r}, ${hexResult.g}, ${hexResult.b}, ${alpha})`
    : "transparent";

  return (
    <div className="space-y-8">
      {/* Hex to RGB Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-[color:var(--color-text-secondary)] uppercase tracking-wide">Hex to RGB</h2>
        <div className="flex gap-3 items-start">
          <div className="flex-1">
            <label className="block text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5">Hex Color</label>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => {
                let v = e.target.value;
                if (v && !v.startsWith("#")) v = "#" + v;
                setHexInput(v);
              }}
              placeholder="#FF5733"
              className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm font-mono text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div className="pt-6">
            <div
              className="h-12 w-12 rounded-lg border border-[color:var(--color-border)] shadow-sm"
              style={{ backgroundColor: previewColor }}
              title="Color preview"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5">
            Alpha: {alpha}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        {hexResult ? (
          <div className="space-y-2">
            <OutputRow label="RGB" value={`rgb(${hexResult.r}, ${hexResult.g}, ${hexResult.b})`} />
            <OutputRow
              label="RGBA"
              value={`rgba(${hexResult.r}, ${hexResult.g}, ${hexResult.b}, ${alpha})`}
            />
            {hsl && (
              <>
                <OutputRow label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
                <OutputRow
                  label="HSLA"
                  value={`hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`}
                />
              </>
            )}
          </div>
        ) : (
          hexInput.length > 1 && (
            <p className="text-sm text-red-500">Invalid hex color code</p>
          )
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[color:var(--color-border)]" />

      {/* RGB to Hex Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-[color:var(--color-text-secondary)] uppercase tracking-wide">RGB to Hex</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "R", value: rgbR, set: setRgbR },
            { label: "G", value: rgbG, set: setRgbG },
            { label: "B", value: rgbB, set: setRgbB },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="block text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5">{label}</label>
              <input
                type="number"
                min={0}
                max={255}
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm font-mono text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          ))}
        </div>
        {rgbHex ? (
          <div className="flex items-center gap-3">
            <OutputRow label="Hex" value={rgbHex} />
            <div
              className="h-10 w-10 rounded-lg border border-[color:var(--color-border)] shadow-sm shrink-0"
              style={{ backgroundColor: rgbHex }}
            />
          </div>
        ) : (
          <p className="text-sm text-red-500">Values must be between 0 and 255</p>
        )}
      </div>
    </div>
  );
}
