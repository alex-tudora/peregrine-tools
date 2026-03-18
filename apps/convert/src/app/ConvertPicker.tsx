"use client";

import { useState, useMemo } from "react";

interface ConversionRoute {
  from: string;
  to: string;
  url: string;
}

const conversionMap: ConversionRoute[] = [
  { from: "PDF", to: "JPG", url: "https://peregrinepdf.com/pdf-to-jpg" },
  { from: "PDF", to: "PNG", url: "https://peregrinepdf.com/pdf-to-png" },
  { from: "JPG", to: "PDF", url: "https://peregrinepdf.com/jpg-to-pdf" },
  { from: "PNG", to: "PDF", url: "https://peregrinepdf.com/png-to-pdf" },
  { from: "JPG", to: "PNG", url: "https://peregrinepix.com/jpg-to-png" },
  { from: "PNG", to: "JPG", url: "https://peregrinepix.com/png-to-jpg" },
  { from: "JPG", to: "WebP", url: "https://peregrinepix.com/jpg-to-webp" },
  { from: "PNG", to: "WebP", url: "https://peregrinepix.com/png-to-webp" },
  { from: "WebP", to: "JPG", url: "https://peregrinepix.com/webp-to-jpg" },
  { from: "WebP", to: "PNG", url: "https://peregrinepix.com/webp-to-png" },
  { from: "SVG", to: "PNG", url: "https://peregrinepix.com/svg-to-png" },
  { from: "MP4", to: "MP3", url: "https://peregrinevid.com/video-to-mp3" },
  { from: "MP4", to: "GIF", url: "https://peregrinevid.com/video-to-gif" },
  { from: "MP4", to: "WebM", url: "https://peregrinevid.com/video-to-webm" },
  { from: "AVI", to: "MP4", url: "https://peregrinevid.com/convert-to-mp4" },
  { from: "MOV", to: "MP4", url: "https://peregrinevid.com/convert-to-mp4" },
  { from: "MKV", to: "MP4", url: "https://peregrinevid.com/convert-to-mp4" },
  { from: "WebM", to: "MP4", url: "https://peregrinevid.com/convert-to-mp4" },
  { from: "WAV", to: "MP3", url: "https://peregrinevid.com/wav-to-mp3" },
  { from: "MP3", to: "WAV", url: "https://peregrinevid.com/mp3-to-wav" },
  { from: "OGG", to: "MP3", url: "https://peregrinevid.com/convert-to-mp3" },
  { from: "FLAC", to: "MP3", url: "https://peregrinevid.com/convert-to-mp3" },
  { from: "AAC", to: "MP3", url: "https://peregrinevid.com/convert-to-mp3" },
  { from: "JSON", to: "CSV", url: "https://peregrinedev.com/json-to-csv" },
  { from: "CSV", to: "JSON", url: "https://peregrinedev.com/csv-to-json" },
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

const availableFromFormats = new Set(conversionMap.map((c) => c.from));

export function ConvertPicker() {
  const [fromFormat, setFromFormat] = useState("");
  const [toFormat, setToFormat] = useState("");

  const validToFormats = useMemo(() => {
    if (!fromFormat) return [];
    return conversionMap.filter((c) => c.from === fromFormat).map((c) => c.to);
  }, [fromFormat]);

  const conversionUrl = useMemo(() => {
    if (!fromFormat || !toFormat) return null;
    return conversionMap.find((c) => c.from === fromFormat && c.to === toFormat)?.url ?? null;
  }, [fromFormat, toFormat]);

  const toFormatGroups = useMemo(() => {
    const validSet = new Set(validToFormats);
    return formatGroups
      .map((g) => ({ ...g, formats: g.formats.filter((f) => validSet.has(f)) }))
      .filter((g) => g.formats.length > 0);
  }, [validToFormats]);

  const handleFromChange = (value: string) => {
    setFromFormat(value);
    setToFormat("");
  };

  const handleConvert = () => {
    if (conversionUrl) window.location.href = conversionUrl;
  };

  const selectClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-white px-4 text-base font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[#F97316] focus:ring-4 focus:ring-[rgba(249,115,22,0.1)] focus:outline-none appearance-none cursor-pointer";

  const chevronBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

  return (
    <div className="animate-scale-in delay-2">
      <div className="rounded-3xl bg-white border-2 border-[color:var(--color-border)] p-6 sm:p-8 shadow-xl shadow-orange-900/[0.04]">
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {/* FROM */}
          <div className="flex-1">
            <label htmlFor="from" className="block text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#F97316] mb-2">
              I have a
            </label>
            <select
              id="from"
              value={fromFormat}
              onChange={(e) => handleFromChange(e.target.value)}
              className={selectClass}
              style={{ backgroundImage: chevronBg, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
            >
              <option value="">Choose format...</option>
              {formatGroups.map((group) => {
                const gf = group.formats.filter((f) => availableFromFormats.has(f));
                if (!gf.length) return null;
                return (
                  <optgroup key={group.label} label={group.label}>
                    {gf.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>

          {/* Arrow */}
          <div className="flex items-end justify-center pb-1 md:pb-0 md:items-end">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border-2 border-[#F97316]/20 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-[#F97316] animate-pulse-arrow hidden md:block" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <svg className="w-5 h-5 text-[#F97316] md:hidden" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
              </svg>
            </div>
          </div>

          {/* TO */}
          <div className="flex-1">
            <label htmlFor="to" className="block text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#F97316] mb-2">
              I need a
            </label>
            <select
              id="to"
              value={toFormat}
              onChange={(e) => setToFormat(e.target.value)}
              disabled={!fromFormat}
              className={`${selectClass} disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-[color:var(--color-bg-elevated)]`}
              style={{ backgroundImage: chevronBg, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
            >
              <option value="">{fromFormat ? "Choose target..." : "Pick source first"}</option>
              {toFormatGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.formats.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleConvert}
          disabled={!conversionUrl}
          className="mt-6 w-full h-14 rounded-2xl bg-[#F97316] text-white text-lg font-extrabold font-display tracking-wide transition-all duration-200 hover:bg-[#EA580C] hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-[#F97316] disabled:hover:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
        >
          {conversionUrl ? "Let\u2019s go!" : "Convert"}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>

        {/* Subtext */}
        <p className="mt-4 text-center text-xs text-[color:var(--color-text-muted)]">
          {fromFormat && toFormat && conversionUrl ? (
            <>
              {fromFormat} → {toFormat} on{" "}
              <span className="font-semibold text-[color:var(--color-text-secondary)]">
                {new URL(conversionUrl).hostname}
              </span>
            </>
          ) : (
            "Free forever · No sign-up · Files stay on your device"
          )}
        </p>
      </div>
    </div>
  );
}
