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
  { label: "Documents", formats: ["PDF", "DOCX", "XLSX"] },
  { label: "Images", formats: ["JPG", "PNG", "WebP", "SVG", "GIF"] },
  { label: "Video", formats: ["MP4", "AVI", "MOV", "MKV", "WebM"] },
  { label: "Audio", formats: ["MP3", "WAV", "OGG", "FLAC", "AAC"] },
  { label: "Data", formats: ["JSON", "CSV"] },
  { label: "Code", formats: ["HTML", "Markdown"] },
];

// Get all unique "from" formats that exist in the conversion map
const availableFromFormats = new Set(conversionMap.map((c) => c.from));

export function ConversionPicker() {
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
    <div className="animate-scale-in delay-2 mt-10 mx-auto max-w-2xl">
      <div className="rounded-2xl border border-[color:var(--color-border)] bg-white p-6 sm:p-8 shadow-lg shadow-black/[0.04]">
        <div className="flex flex-col sm:flex-row items-stretch gap-4">
          {/* From dropdown */}
          <div className="flex-1">
            <label
              htmlFor="convert-from"
              className="block text-xs font-medium text-[color:var(--color-text-muted)] uppercase tracking-wider mb-2"
            >
              Convert from
            </label>
            <select
              id="convert-from"
              value={fromFormat}
              onChange={(e) => handleFromChange(e.target.value)}
              className="w-full h-14 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 text-base font-medium text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-border-hover)] focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.15)] focus:outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="">Select format...</option>
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

          {/* Arrow icon */}
          <div className="hidden sm:flex items-end pb-3">
            <svg
              className="w-6 h-6 text-[color:var(--color-text-muted)]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </div>

          {/* To dropdown */}
          <div className="flex-1">
            <label
              htmlFor="convert-to"
              className="block text-xs font-medium text-[color:var(--color-text-muted)] uppercase tracking-wider mb-2"
            >
              Convert to
            </label>
            <select
              id="convert-to"
              value={toFormat}
              onChange={(e) => setToFormat(e.target.value)}
              disabled={!fromFormat}
              className="w-full h-14 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 text-base font-medium text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-border-hover)] focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.15)] focus:outline-none appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="">
                {fromFormat ? "Select target..." : "Choose source first..."}
              </option>
              {validToFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Convert button */}
        <button
          onClick={handleConvert}
          disabled={!conversionUrl}
          className="mt-5 w-full h-14 rounded-xl bg-[#3B82F6] text-white text-base font-semibold transition-all duration-200 hover:bg-[#2563EB] hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-[#3B82F6] disabled:active:scale-100 flex items-center justify-center gap-2"
        >
          Convert Now
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
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
        {fromFormat && toFormat && conversionUrl && (
          <p className="mt-3 text-center text-sm text-[color:var(--color-text-muted)]">
            {fromFormat} to {toFormat} conversion on{" "}
            <span className="text-[color:var(--color-text-secondary)] font-medium">
              {new URL(conversionUrl).hostname}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
