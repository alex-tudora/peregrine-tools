"use client";

import { useState, useCallback, useMemo } from "react";

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

interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
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

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
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
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
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

function rgbToCmyk(rgb: RGB): CMYK {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

function parseColorInput(value: string): RGB | null {
  const trimmed = value.trim();

  // HEX
  const hexMatch = trimmed.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hexMatch) {
    return hexToRgb(hexMatch[1]);
  }

  // RGB
  const rgbMatch = trimmed.match(/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (rgbMatch) {
    return {
      r: Math.min(255, parseInt(rgbMatch[1])),
      g: Math.min(255, parseInt(rgbMatch[2])),
      b: Math.min(255, parseInt(rgbMatch[3])),
    };
  }

  // HSL
  const hslMatch = trimmed.match(/^hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*\)$/i);
  if (hslMatch) {
    return hslToRgb({
      h: Math.min(360, parseInt(hslMatch[1])),
      s: Math.min(100, parseInt(hslMatch[2])),
      l: Math.min(100, parseInt(hslMatch[3])),
    });
  }

  return null;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function ColorPickerTool() {
  const [hex, setHex] = useState("#3b82f6");
  const [manualInput, setManualInput] = useState("");

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => rgbToHsl(rgb), [rgb]);
  const cmyk = useMemo(() => rgbToCmyk(rgb), [rgb]);

  const complementaryHsl: HSL = useMemo(
    () => ({ h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l }),
    [hsl]
  );
  const complementaryRgb = useMemo(() => hslToRgb(complementaryHsl), [complementaryHsl]);
  const complementaryHex = useMemo(() => rgbToHex(complementaryRgb), [complementaryRgb]);

  const shades = useMemo(() => {
    const lighter: string[] = [];
    const darker: string[] = [];
    for (let i = 1; i <= 5; i++) {
      const lLight = Math.min(100, hsl.l + i * ((100 - hsl.l) / 6));
      lighter.push(rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l: Math.round(lLight) })));
      const lDark = Math.max(0, hsl.l - i * (hsl.l / 6));
      darker.push(rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l: Math.round(lDark) })));
    }
    return { lighter, darker };
  }, [hsl]);

  const handlePickerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHex(e.target.value);
    setManualInput("");
  }, []);

  const handleManualInput = useCallback((value: string) => {
    setManualInput(value);
    const parsed = parseColorInput(value);
    if (parsed) {
      setHex(rgbToHex(parsed));
    }
  }, []);

  const hexStr = hex.toUpperCase();
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cmykStr = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-40 w-40 rounded-2xl border-2 border-[color:var(--color-border)] shadow-sm"
            style={{ backgroundColor: hex }}
          />
          <input
            type="color"
            value={hex}
            onChange={handlePickerChange}
            className="h-10 w-40 cursor-pointer rounded-lg border border-[color:var(--color-border)]"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="color-manual" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
              Enter a color (HEX, RGB, or HSL)
            </label>
            <input
              id="color-manual"
              type="text"
              value={manualInput}
              onChange={(e) => handleManualInput(e.target.value)}
              placeholder="#3b82f6 or rgb(59, 130, 246) or hsl(217, 91%, 60%)"
              className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-2">
            {[
              { label: "HEX", value: hexStr },
              { label: "RGB", value: rgbStr },
              { label: "HSL", value: hslStr },
              { label: "CMYK", value: cmykStr },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-2.5"
              >
                <div>
                  <span className="mr-3 text-xs font-semibold text-[color:var(--color-text-muted)]">{item.label}</span>
                  <span className="font-mono text-sm text-[color:var(--color-text-primary)]">{item.value}</span>
                </div>
                <CopyButton text={item.value} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[color:var(--color-text-secondary)]">Complementary Color</p>
        <div className="flex items-center gap-4 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4">
          <div
            className="h-12 w-12 shrink-0 rounded-lg border border-[color:var(--color-border)]"
            style={{ backgroundColor: complementaryHex }}
          />
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="font-mono text-sm text-[color:var(--color-text-secondary)]">{complementaryHex.toUpperCase()}</span>
            <span className="font-mono text-sm text-[color:var(--color-text-muted)]">
              rgb({complementaryRgb.r}, {complementaryRgb.g}, {complementaryRgb.b})
            </span>
          </div>
          <CopyButton text={complementaryHex.toUpperCase()} />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[color:var(--color-text-secondary)]">Shade Palette</p>
        <div className="space-y-3">
          <div>
            <p className="mb-1.5 text-xs text-[color:var(--color-text-muted)]">Lighter</p>
            <div className="flex gap-2">
              {shades.lighter.map((shade, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setHex(shade);
                    setManualInput("");
                  }}
                  title={shade.toUpperCase()}
                  className="group relative h-12 flex-1 rounded-lg border border-[color:var(--color-border)] transition-transform hover:scale-105"
                  style={{ backgroundColor: shade }}
                >
                  <span className="absolute inset-x-0 -bottom-5 text-center text-[10px] font-mono text-[color:var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100">
                    {shade.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div
              className="h-12 flex-1 rounded-lg border-2 border-emerald-400"
              style={{ backgroundColor: hex }}
              title="Current"
            />
          </div>

          <div>
            <p className="mb-1.5 text-xs text-[color:var(--color-text-muted)]">Darker</p>
            <div className="flex gap-2">
              {shades.darker.map((shade, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setHex(shade);
                    setManualInput("");
                  }}
                  title={shade.toUpperCase()}
                  className="group relative h-12 flex-1 rounded-lg border border-[color:var(--color-border)] transition-transform hover:scale-105"
                  style={{ backgroundColor: shade }}
                >
                  <span className="absolute inset-x-0 -bottom-5 text-center text-[10px] font-mono text-[color:var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100">
                    {shade.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
