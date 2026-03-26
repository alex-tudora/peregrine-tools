"use client";

import { useState, useMemo, useCallback, useEffect } from "react";

type ColorFormat = "hex" | "rgb" | "hsl" | "hsb" | "cmyk" | "oklch";

interface ColorConverterToolProps {
  fromFormat: string;
  toFormat: string;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface HSB {
  h: number;
  s: number;
  b: number;
}

interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

interface OKLCH {
  l: number;
  c: number;
  h: number;
}

const knightMessages = [
  "The knight painted his shield with this exact color. Coincidence? Yes.",
  "Colors converted! The knight sees the world in a new light.",
  "From one palette to another — the knight approves this transformation.",
  "The knight once mixed red and blue. He was disappointed it wasn't purple enough.",
  "Pixel perfect. Even the knight's armor isn't this polished.",
  "The knight's favorite color? Armor gray. But yours looks great too.",
  "Converted! The knight considers this color worthy of his banner.",
  "Another flawless conversion. The knight tips his visor in admiration.",
  "The knight's art teacher said he had potential. The knight still only draws swords.",
  "Color theory is complex. Even the knight sticks to primary colors.",
];

function getRandomMessage() {
  return knightMessages[Math.floor(Math.random() * knightMessages.length)];
}

// ── Color Math ──────────────────────────────────────────────────────────

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean) && !/^[0-9a-fA-F]{3}$/.test(clean)) return null;
  let r: number, g: number, b: number;
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  } else {
    r = parseInt(clean.substring(0, 2), 16);
    g = parseInt(clean.substring(2, 4), 16);
    b = parseInt(clean.substring(4, 6), 16);
  }
  return { r, g, b };
}

function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) =>
    clamp(Math.round(n), 0, 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100 };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

function rgbToHsb(rgb: RGB): HSB {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const brightness = max * 100;
  const saturation = max === 0 ? 0 : (d / max) * 100;
  let hue = 0;
  if (d !== 0) {
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) hue = ((b - r) / d + 2) * 60;
    else hue = ((r - g) / d + 4) * 60;
  }
  return { h: hue, s: saturation, b: brightness };
}

function hsbToRgb(hsb: HSB): RGB {
  const h = hsb.h / 60;
  const s = hsb.s / 100;
  const v = hsb.b / 100;
  const c = v * s;
  const x = c * (1 - Math.abs((h % 2) - 1));
  const m = v - c;
  let r = 0,
    g = 0,
    b = 0;
  if (h >= 0 && h < 1) {
    r = c;
    g = x;
  } else if (h >= 1 && h < 2) {
    r = x;
    g = c;
  } else if (h >= 2 && h < 3) {
    g = c;
    b = x;
  } else if (h >= 3 && h < 4) {
    g = x;
    b = c;
  } else if (h >= 4 && h < 5) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToCmyk(rgb: RGB): CMYK {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: ((1 - r - k) / (1 - k)) * 100,
    m: ((1 - g - k) / (1 - k)) * 100,
    y: ((1 - b - k) / (1 - k)) * 100,
    k: k * 100,
  };
}

function cmykToRgb(cmyk: CMYK): RGB {
  const c = cmyk.c / 100;
  const m = cmyk.m / 100;
  const y = cmyk.y / 100;
  const k = cmyk.k / 100;
  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k)),
  };
}

// sRGB -> linear RGB
function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function rgbToOklch(rgb: RGB): OKLCH {
  // sRGB to linear
  const lr = srgbToLinear(rgb.r / 255);
  const lg = srgbToLinear(rgb.g / 255);
  const lb = srgbToLinear(rgb.b / 255);
  // Linear RGB to LMS (using OKLab matrix)
  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  // Cube root
  const l_c = Math.cbrt(l_);
  const m_c = Math.cbrt(m_);
  const s_c = Math.cbrt(s_);
  // LMS to OKLab
  const L = 0.2104542553 * l_c + 0.7936177850 * m_c - 0.0040720468 * s_c;
  const a = 1.9779984951 * l_c - 2.4285922050 * m_c + 0.4505937099 * s_c;
  const b = 0.0259040371 * l_c + 0.7827717662 * m_c - 0.8086757660 * s_c;
  // OKLab to OKLCH
  const C = Math.sqrt(a * a + b * b);
  let H = (Math.atan2(b, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { l: L, c: C, h: H };
}

// ── Parsing ─────────────────────────────────────────────────────────────

function parseColorInput(input: string): RGB | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // HEX: #RGB or #RRGGBB
  if (/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(trimmed)) {
    return hexToRgb(trimmed);
  }

  // rgb(r, g, b)
  const rgbMatch = trimmed.match(/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    if (r <= 255 && g <= 255 && b <= 255) return { r, g, b };
    return null;
  }

  // hsl(h, s%, l%)
  const hslMatch = trimmed.match(
    /^hsl\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*\)$/i,
  );
  if (hslMatch) {
    const h = parseFloat(hslMatch[1]);
    const s = parseFloat(hslMatch[2]);
    const l = parseFloat(hslMatch[3]);
    if (h <= 360 && s <= 100 && l <= 100) return hslToRgb({ h, s, l });
    return null;
  }

  // hsb(h, s%, b%) or hsv(h, s%, v%)
  const hsbMatch = trimmed.match(
    /^hs[bv]\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*\)$/i,
  );
  if (hsbMatch) {
    const h = parseFloat(hsbMatch[1]);
    const s = parseFloat(hsbMatch[2]);
    const b = parseFloat(hsbMatch[3]);
    if (h <= 360 && s <= 100 && b <= 100) return hsbToRgb({ h, s, b });
    return null;
  }

  // cmyk(c%, m%, y%, k%)
  const cmykMatch = trimmed.match(
    /^cmyk\s*\(\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*\)$/i,
  );
  if (cmykMatch) {
    const c = parseFloat(cmykMatch[1]);
    const m = parseFloat(cmykMatch[2]);
    const y = parseFloat(cmykMatch[3]);
    const k = parseFloat(cmykMatch[4]);
    if (c <= 100 && m <= 100 && y <= 100 && k <= 100)
      return cmykToRgb({ c, m, y, k });
    return null;
  }

  // oklch(l c h)
  const oklchMatch = trimmed.match(
    /^oklch\s*\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/i,
  );
  if (oklchMatch) {
    // We parse it but can't easily reverse OKLCH to RGB accurately;
    // just recognize the format and pass through if possible
    // For now, don't reverse-convert OKLCH
    return null;
  }

  return null;
}

// ── Format strings ──────────────────────────────────────────────────────

function formatHex(rgb: RGB): string {
  return rgbToHex(rgb);
}

function formatRgb(rgb: RGB): string {
  return `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`;
}

function formatHsl(rgb: RGB): string {
  const hsl = rgbToHsl(rgb);
  return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
}

function formatHsb(rgb: RGB): string {
  const hsb = rgbToHsb(rgb);
  return `hsb(${Math.round(hsb.h)}, ${Math.round(hsb.s)}%, ${Math.round(hsb.b)}%)`;
}

function formatCmyk(rgb: RGB): string {
  const cmyk = rgbToCmyk(rgb);
  return `cmyk(${Math.round(cmyk.c)}%, ${Math.round(cmyk.m)}%, ${Math.round(cmyk.y)}%, ${Math.round(cmyk.k)}%)`;
}

function formatOklch(rgb: RGB): string {
  const oklch = rgbToOklch(rgb);
  return `oklch(${oklch.l.toFixed(3)} ${oklch.c.toFixed(3)} ${Math.round(oklch.h)})`;
}

const FORMAT_LABELS: Record<ColorFormat, string> = {
  hex: "HEX",
  rgb: "RGB",
  hsl: "HSL",
  hsb: "HSB / HSV",
  cmyk: "CMYK",
  oklch: "OKLCH",
};

function getFormatValue(rgb: RGB, format: ColorFormat): string {
  switch (format) {
    case "hex":
      return formatHex(rgb);
    case "rgb":
      return formatRgb(rgb);
    case "hsl":
      return formatHsl(rgb);
    case "hsb":
      return formatHsb(rgb);
    case "cmyk":
      return formatCmyk(rgb);
    case "oklch":
      return formatOklch(rgb);
  }
}

export function ColorConverterTool({ fromFormat, toFormat }: ColorConverterToolProps) {
  const [input, setInput] = useState("#FF5733");
  const [knightMsg, setKnightMsg] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    setKnightMsg(getRandomMessage());
  }, []);

  // Parse input to RGB (canonical form)
  const rgb = useMemo(() => parseColorInput(input), [input]);

  // Sync native color picker with text input
  const pickerValue = useMemo(() => {
    if (!rgb) return "#000000";
    return rgbToHex(rgb).toLowerCase();
  }, [rgb]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    setKnightMsg(getRandomMessage());
  }, []);

  const handlePickerChange = useCallback((hex: string) => {
    setInput(hex.toUpperCase());
    setKnightMsg(getRandomMessage());
  }, []);

  const handleCopy = useCallback(async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, []);

  // All format results
  const formats: ColorFormat[] = ["hex", "rgb", "hsl", "hsb", "cmyk", "oklch"];

  const results = useMemo(() => {
    if (!rgb) return null;
    return formats.map((f) => ({
      format: f,
      label: FORMAT_LABELS[f],
      value: getFormatValue(rgb, f),
      isFrom: fromFormat.toLowerCase() === f,
      isTo: toFormat.toLowerCase() === f,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rgb, fromFormat, toFormat]);

  const inputClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-lg font-mono font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none";

  return (
    <div className="space-y-6">
      {/* Color preview swatch */}
      {rgb && (
        <div
          className="w-full h-28 rounded-2xl border-2 border-[color:var(--color-border)] shadow-inner transition-colors"
          style={{ backgroundColor: rgbToHex(rgb) }}
          aria-label={`Color preview: ${rgbToHex(rgb)}`}
        />
      )}

      {/* Input section */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
          Color Value
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="#FF5733 or rgb(255, 87, 51) or hsl(11, 100%, 60%)"
              className={inputClass}
              autoFocus
            />
          </div>
          <div className="sm:w-16">
            <input
              type="color"
              value={pickerValue}
              onChange={(e) => handlePickerChange(e.target.value)}
              className="w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] cursor-pointer transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none"
              title="Pick a color"
              aria-label="Color picker"
            />
          </div>
        </div>
      </div>

      {/* Input hint */}
      <p className="text-xs text-[color:var(--color-text-muted)]">
        Enter HEX, RGB, HSL, HSB, or CMYK. The color picker also works.
      </p>

      {/* Validation error */}
      {input && !rgb && (
        <div className="rounded-xl border border-red-200 bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]">
          <span className="mr-2 font-semibold">Invalid color:</span>
          Try a HEX code like #FF5733, or rgb(255, 87, 51), or hsl(11, 100%, 60%).
        </div>
      )}

      {/* Results — all formats */}
      {results && (
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-3">
            All Formats
          </label>
          <div className="space-y-2">
            {results.map((row) => (
              <div
                key={row.format}
                className={`flex items-center justify-between rounded-xl border px-5 py-3.5 transition-all hover:border-[color:var(--color-border-hover)] ${
                  row.isFrom || row.isTo
                    ? "border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent-light)]"
                    : "border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider">
                    {row.label}
                    {row.isFrom && (
                      <span className="ml-2 text-[10px] text-[color:var(--color-accent)] font-bold">FROM</span>
                    )}
                    {row.isTo && (
                      <span className="ml-2 text-[10px] text-[color:var(--color-accent)] font-bold">TO</span>
                    )}
                  </span>
                  <span className="block font-mono text-base font-semibold text-[color:var(--color-text-primary)] break-all">
                    {row.value}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(row.value, row.format)}
                  className="ml-3 shrink-0 rounded-md px-2.5 py-1 text-xs font-medium text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent-light)] cursor-pointer"
                >
                  {copiedField === row.format ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Knight personality message */}
      {knightMsg && results && (
        <p className="text-center text-sm text-[color:var(--color-text-muted)] italic">
          {knightMsg}
        </p>
      )}
    </div>
  );
}
