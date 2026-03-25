"use client";

import { useState, useCallback, useMemo } from "react";
import { logActivity } from "@peregrine/ui";

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
      .map((c) =>
        Math.max(0, Math.min(255, Math.round(c)))
          .toString(16)
          .padStart(2, "0")
      )
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

function rotateHue(hsl: HSL, degrees: number): HSL {
  return {
    h: (hsl.h + degrees + 360) % 360,
    s: hsl.s,
    l: hsl.l,
  };
}

interface PaletteColor {
  hex: string;
  rgb: RGB;
  hsl: HSL;
}

function makePaletteColor(hsl: HSL): PaletteColor {
  const rgb = hslToRgb(hsl);
  return { hex: rgbToHex(rgb), rgb, hsl };
}

function generateComplementary(hsl: HSL): PaletteColor[] {
  const base = { ...hsl };
  const comp = rotateHue(hsl, 180);
  const mid1 = { ...hsl, l: Math.min(100, hsl.l + 15) };
  const mid2 = { ...comp, l: Math.min(100, comp.l + 15) };
  const accent = { ...hsl, s: Math.max(0, hsl.s - 20), l: Math.min(95, hsl.l + 30) };
  return [makePaletteColor(base), makePaletteColor(mid1), makePaletteColor(accent), makePaletteColor(mid2), makePaletteColor(comp)];
}

function generateAnalogous(hsl: HSL): PaletteColor[] {
  return [
    makePaletteColor(rotateHue(hsl, -60)),
    makePaletteColor(rotateHue(hsl, -30)),
    makePaletteColor(hsl),
    makePaletteColor(rotateHue(hsl, 30)),
    makePaletteColor(rotateHue(hsl, 60)),
  ];
}

function generateTriadic(hsl: HSL): PaletteColor[] {
  const c1 = hsl;
  const c2 = rotateHue(hsl, 120);
  const c3 = rotateHue(hsl, 240);
  const mid1 = { ...c1, l: Math.min(100, c1.l + 20) };
  const mid2 = { ...c2, l: Math.min(100, c2.l + 20) };
  return [makePaletteColor(c1), makePaletteColor(mid1), makePaletteColor(c2), makePaletteColor(mid2), makePaletteColor(c3)];
}

function generateSplitComplementary(hsl: HSL): PaletteColor[] {
  const base = hsl;
  const sc1 = rotateHue(hsl, 150);
  const sc2 = rotateHue(hsl, 210);
  const light = { ...hsl, l: Math.min(100, hsl.l + 20) };
  const dark = { ...hsl, l: Math.max(0, hsl.l - 20) };
  return [makePaletteColor(dark), makePaletteColor(base), makePaletteColor(light), makePaletteColor(sc1), makePaletteColor(sc2)];
}

function generateMonochromatic(hsl: HSL): PaletteColor[] {
  return [
    makePaletteColor({ h: hsl.h, s: Math.min(100, hsl.s + 10), l: Math.max(0, hsl.l - 30) }),
    makePaletteColor({ h: hsl.h, s: hsl.s, l: Math.max(0, hsl.l - 15) }),
    makePaletteColor(hsl),
    makePaletteColor({ h: hsl.h, s: Math.max(0, hsl.s - 10), l: Math.min(100, hsl.l + 15) }),
    makePaletteColor({ h: hsl.h, s: Math.max(0, hsl.s - 20), l: Math.min(100, hsl.l + 30) }),
  ];
}

function Swatch({ color, onCopy }: { color: PaletteColor; onCopy: (hex: string) => void }) {
  return (
    <button
      onClick={() => onCopy(color.hex.toUpperCase())}
      className="group flex flex-1 flex-col items-center gap-2"
      title={`Click to copy ${color.hex.toUpperCase()}`}
    >
      <div
        className="h-16 w-full rounded-xl border border-[color:var(--color-border)] transition-transform group-hover:scale-105 sm:h-20"
        style={{ backgroundColor: color.hex }}
      />
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-mono text-xs font-semibold text-[color:var(--color-text-primary)]">
          {color.hex.toUpperCase()}
        </span>
        <span className="font-mono text-[10px] text-[color:var(--color-text-muted)]">
          rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
        </span>
        <span className="font-mono text-[10px] text-[color:var(--color-text-muted)]">
          hsl({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%)
        </span>
      </div>
    </button>
  );
}

function PaletteRow({
  title,
  description,
  colors,
  onCopy,
}: {
  title: string;
  description: string;
  colors: PaletteColor[];
  onCopy: (hex: string) => void;
}) {
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)]">{title}</h3>
        <p className="text-xs text-[color:var(--color-text-muted)]">{description}</p>
      </div>
      <div className="flex gap-2 sm:gap-3">
        {colors.map((color, i) => (
          <Swatch key={i} color={color} onCopy={onCopy} />
        ))}
      </div>
    </div>
  );
}

export function ColorPaletteTool() {
  const [hex, setHex] = useState("#3b82f6");
  const [hexInput, setHexInput] = useState("#3b82f6");
  const [toast, setToast] = useState<string | null>(null);

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => rgbToHsl(rgb), [rgb]);

  const complementary = useMemo(() => generateComplementary(hsl), [hsl]);
  const analogous = useMemo(() => generateAnalogous(hsl), [hsl]);
  const triadic = useMemo(() => generateTriadic(hsl), [hsl]);
  const splitComplementary = useMemo(() => generateSplitComplementary(hsl), [hsl]);
  const monochromatic = useMemo(() => generateMonochromatic(hsl), [hsl]);

  const handlePickerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    setHexInput(val);
  }, []);

  const handleHexInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val);
    const match = val.trim().match(/^#?([0-9a-fA-F]{6})$/);
    if (match) {
      setHex("#" + match[1].toLowerCase());
    }
  }, []);

  const handleCopy = useCallback(
    async (hexValue: string) => {
      try {
        await navigator.clipboard.writeText(hexValue);
        setToast(hexValue);
        logActivity({
          tool: "Color Palette Generator",
          toolHref: "/color-palette",
          description: `Copied ${hexValue}`,
        });
        setTimeout(() => setToast(null), 2000);
      } catch {
        /* clipboard may not be available */
      }
    },
    []
  );

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 shadow-lg">
          <p className="text-sm font-medium text-[color:var(--color-text-primary)]">
            Copied <span className="font-mono">{toast}</span>
          </p>
        </div>
      )}

      {/* Base color input */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex items-end gap-3">
          <div
            className="h-14 w-14 shrink-0 rounded-xl border-2 border-[color:var(--color-border)] shadow-sm"
            style={{ backgroundColor: hex }}
          />
          <input
            type="color"
            value={hex}
            onChange={handlePickerChange}
            className="h-14 w-14 shrink-0 cursor-pointer rounded-xl border border-[color:var(--color-border)]"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="hex-input"
            className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
          >
            Base Color (HEX)
          </label>
          <input
            id="hex-input"
            type="text"
            value={hexInput}
            onChange={handleHexInput}
            placeholder="#3b82f6"
            className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-mono text-[color:var(--color-text-muted)] sm:pb-3">
          <span>rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
          <span>hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
        </div>
      </div>

      {/* Palettes */}
      <div className="space-y-8">
        <PaletteRow
          title="Complementary"
          description="Opposite on the color wheel (180°) — high contrast and visual impact"
          colors={complementary}
          onCopy={handleCopy}
        />

        <PaletteRow
          title="Analogous"
          description="Adjacent colors on the wheel (±30°/60°) — harmonious and natural"
          colors={analogous}
          onCopy={handleCopy}
        />

        <PaletteRow
          title="Triadic"
          description="Three colors evenly spaced (120° apart) — vibrant and balanced"
          colors={triadic}
          onCopy={handleCopy}
        />

        <PaletteRow
          title="Split-Complementary"
          description="Complement ±30° — strong contrast with less tension"
          colors={splitComplementary}
          onCopy={handleCopy}
        />

        <PaletteRow
          title="Monochromatic"
          description="Same hue, varying lightness and saturation — cohesive and elegant"
          colors={monochromatic}
          onCopy={handleCopy}
        />
      </div>
    </div>
  );
}
