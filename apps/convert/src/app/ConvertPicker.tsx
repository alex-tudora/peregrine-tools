"use client";

import { useState, useMemo } from "react";

interface ConversionRoute {
  from: string;
  to: string;
  url: string;
}

const conversionMap: ConversionRoute[] = [
  // PDF conversions
  { from: "PDF", to: "JPG", url: "https://peregrinepdf.com/pdf-to-jpg" },
  { from: "PDF", to: "PNG", url: "https://peregrinepdf.com/pdf-to-png" },
  { from: "JPG", to: "PDF", url: "https://peregrinepdf.com/jpg-to-pdf" },
  { from: "PNG", to: "PDF", url: "https://peregrinepdf.com/png-to-pdf" },

  // Image conversions
  { from: "JPG", to: "PNG", url: "https://peregrinepix.com/jpg-to-png" },
  { from: "PNG", to: "JPG", url: "https://peregrinepix.com/png-to-jpg" },
  { from: "JPG", to: "WebP", url: "https://peregrinepix.com/jpg-to-webp" },
  { from: "PNG", to: "WebP", url: "https://peregrinepix.com/png-to-webp" },
  { from: "WebP", to: "JPG", url: "https://peregrinepix.com/webp-to-jpg" },
  { from: "WebP", to: "PNG", url: "https://peregrinepix.com/webp-to-png" },
  { from: "SVG", to: "PNG", url: "https://peregrinepix.com/svg-to-png" },

  // Video conversions
  { from: "MP4", to: "MP3", url: "https://peregrinevid.com/video-to-mp3" },
  { from: "MP4", to: "GIF", url: "https://peregrinevid.com/video-to-gif" },
  { from: "MP4", to: "WebM", url: "https://peregrinevid.com/video-to-webm" },
  { from: "AVI", to: "MP4", url: "https://peregrinevid.com/convert-to-mp4" },
  { from: "MOV", to: "MP4", url: "https://peregrinevid.com/convert-to-mp4" },
  { from: "MKV", to: "MP4", url: "https://peregrinevid.com/convert-to-mp4" },
  { from: "WebM", to: "MP4", url: "https://peregrinevid.com/convert-to-mp4" },

  // Audio conversions
  { from: "WAV", to: "MP3", url: "https://peregrinevid.com/wav-to-mp3" },
  { from: "MP3", to: "WAV", url: "https://peregrinevid.com/mp3-to-wav" },
  { from: "OGG", to: "MP3", url: "https://peregrinevid.com/convert-to-mp3" },
  { from: "FLAC", to: "MP3", url: "https://peregrinevid.com/convert-to-mp3" },
  { from: "AAC", to: "MP3", url: "https://peregrinevid.com/convert-to-mp3" },

  // Data conversions
  { from: "JSON", to: "CSV", url: "https://peregrinedev.com/json-to-csv" },
  { from: "CSV", to: "JSON", url: "https://peregrinedev.com/csv-to-json" },

  // Code conversions
  { from: "Markdown", to: "HTML", url: "https://peregrinekit.com/markdown-to-html" },
  { from: "HTML", to: "Markdown", url: "https://peregrinekit.com/html-to-markdown" },
];

interface FormatGroup {
  label: string;
  formats: string[];
}

const formatGroups: FormatGroup[] = [
  { label: "Documents", formats: ["PDF"] },
  { label: "Images", formats: ["JPG", "PNG", "WebP", "SVG"] },
  { label: "Video", formats: ["MP4", "AVI", "MOV", "MKV", "WebM"] },
  { label: "Audio", formats: ["MP3", "WAV", "OGG", "FLAC", "AAC"] },
  { label: "Data", formats: ["JSON", "CSV"] },
  { label: "Text", formats: ["HTML", "Markdown"] },
];

const formatIcons: Record<string, string> = {
  PDF: "doc",
  JPG: "img",
  PNG: "img",
  WebP: "img",
  SVG: "img",
  GIF: "img",
  MP4: "vid",
  AVI: "vid",
  MOV: "vid",
  MKV: "vid",
  WebM: "vid",
  MP3: "aud",
  WAV: "aud",
  OGG: "aud",
  FLAC: "aud",
  AAC: "aud",
  JSON: "dat",
  CSV: "dat",
  HTML: "txt",
  Markdown: "txt",
};

const categoryColors: Record<string, string> = {
  doc: "#3B82F6",
  img: "#8B5CF6",
  vid: "#F43F5E",
  aud: "#EC4899",
  dat: "#F59E0B",
  txt: "#10B981",
};

// Get all unique "from" formats that exist in the conversion map
const availableFromFormats = new Set(conversionMap.map((c) => c.from));
const availableToFormats = new Set(conversionMap.map((c) => c.to));

function FormatBadge({ format }: { format: string }) {
  const type = formatIcons[format] || "txt";
  const color = categoryColors[type] || "#94A3B8";

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold"
      style={{ backgroundColor: `${color}15`, color }}
    >
      {format}
    </span>
  );
}

export function ConvertPicker() {
  const [fromFormat, setFromFormat] = useState("");
  const [toFormat, setToFormat] = useState("");

  // Get valid "to" formats based on the selected "from" format
  const validToFormats = useMemo(() => {
    if (!fromFormat) return [];
    return conversionMap
      .filter((c) => c.from === fromFormat)
      .map((c) => c.to);
  }, [fromFormat]);

  // Get the conversion URL
  const conversionUrl = useMemo(() => {
    if (!fromFormat || !toFormat) return null;
    const route = conversionMap.find(
      (c) => c.from === fromFormat && c.to === toFormat
    );
    return route?.url ?? null;
  }, [fromFormat, toFormat]);

  // Build grouped "to" options
  const toFormatGroups = useMemo(() => {
    const validSet = new Set(validToFormats);
    return formatGroups
      .map((group) => ({
        ...group,
        formats: group.formats.filter((f) => validSet.has(f)),
      }))
      .filter((group) => group.formats.length > 0);
  }, [validToFormats]);

  const handleFromChange = (value: string) => {
    setFromFormat(value);
    setToFormat("");
  };

  const handleConvert = () => {
    if (conversionUrl) {
      window.location.href = conversionUrl;
    }
  };

  return (
    <div className="animate-scale-in delay-2 mt-12 mx-auto max-w-3xl">
      <div className="rounded-3xl border border-[color:var(--color-border)] bg-white p-6 sm:p-10 shadow-xl shadow-black/[0.06]">
        <div className="flex flex-col md:flex-row items-stretch gap-5">
          {/* FROM Card */}
          <div className="flex-1">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 transition-all hover:border-[color:var(--color-border-hover)] h-full">
              <label
                htmlFor="convert-from"
                className="block text-xs font-bold text-[#F97316] uppercase tracking-widest mb-3"
              >
                From
              </label>
              {fromFormat && (
                <div className="mb-3">
                  <FormatBadge format={fromFormat} />
                </div>
              )}
              <select
                id="convert-from"
                value={fromFormat}
                onChange={(e) => handleFromChange(e.target.value)}
                className="w-full h-14 rounded-xl border border-[color:var(--color-border)] bg-white px-4 text-lg font-semibold text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-border-hover)] focus:border-[#F97316] focus:ring-2 focus:ring-[rgba(249,115,22,0.15)] focus:outline-none appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="">Choose format...</option>
                {formatGroups.map((group) => {
                  const groupFormats = group.formats.filter((f) =>
                    availableFromFormats.has(f)
                  );
                  if (groupFormats.length === 0) return null;
                  return (
                    <optgroup key={group.label} label={group.label}>
                      {groupFormats.map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Arrow between cards */}
          <div className="flex items-center justify-center md:pt-6">
            <div className="w-14 h-14 rounded-full bg-[#FFF7ED] border-2 border-[#F97316]/20 flex items-center justify-center">
              {/* Horizontal arrow on desktop, vertical on mobile */}
              <svg
                className="w-6 h-6 text-[#F97316] animate-pulse-arrow hidden md:block"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
              <svg
                className="w-6 h-6 text-[#F97316] md:hidden"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                />
              </svg>
            </div>
          </div>

          {/* TO Card */}
          <div className="flex-1">
            <div
              className={`rounded-2xl border p-5 transition-all h-full ${
                fromFormat
                  ? "border-[color:var(--color-border)] bg-[color:var(--color-bg)] hover:border-[color:var(--color-border-hover)]"
                  : "border-dashed border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]"
              }`}
            >
              <label
                htmlFor="convert-to"
                className="block text-xs font-bold text-[#F97316] uppercase tracking-widest mb-3"
              >
                To
              </label>
              {toFormat && (
                <div className="mb-3">
                  <FormatBadge format={toFormat} />
                </div>
              )}
              <select
                id="convert-to"
                value={toFormat}
                onChange={(e) => setToFormat(e.target.value)}
                disabled={!fromFormat}
                className="w-full h-14 rounded-xl border border-[color:var(--color-border)] bg-white px-4 text-lg font-semibold text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-border-hover)] focus:border-[#F97316] focus:ring-2 focus:ring-[rgba(249,115,22,0.15)] focus:outline-none appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[color:var(--color-bg-elevated)]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="">
                  {fromFormat ? "Choose target..." : "Pick source first..."}
                </option>
                {toFormatGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.formats.map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Convert button */}
        <button
          onClick={handleConvert}
          disabled={!conversionUrl}
          className="mt-8 w-full h-16 rounded-2xl bg-[#F97316] text-white text-lg font-bold transition-all duration-200 hover:bg-[#EA580C] hover:shadow-lg hover:shadow-orange-500/25 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-[#F97316] disabled:active:scale-100 flex items-center justify-center gap-3 cursor-pointer"
        >
          Convert Now
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>

        {/* Conversion preview */}
        {fromFormat && toFormat && conversionUrl ? (
          <p className="mt-4 text-center text-sm text-[color:var(--color-text-muted)]">
            {fromFormat} to {toFormat} conversion on{" "}
            <span className="text-[color:var(--color-text-secondary)] font-medium">
              {new URL(conversionUrl).hostname}
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center text-sm text-[color:var(--color-text-muted)]">
            Free &middot; No sign-up &middot; Files stay in your browser
          </p>
        )}
      </div>
    </div>
  );
}
