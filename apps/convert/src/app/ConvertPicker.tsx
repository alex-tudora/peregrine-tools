"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface ConversionRoute {
  from: string;
  to: string;
  path: string;
  description: string;
}

const conversionMap: ConversionRoute[] = [
  { from: "PDF", to: "JPG", path: "/pdf-to-jpg", description: "Render PDF pages as JPG images" },
  { from: "PDF", to: "PNG", path: "/pdf-to-png", description: "Render PDF pages as lossless PNG" },
  { from: "JPG", to: "PDF", path: "/jpg-to-pdf", description: "Bundle JPG images into a PDF" },
  { from: "PNG", to: "PDF", path: "/png-to-pdf", description: "Bundle PNG images into a PDF" },
  { from: "JPG", to: "PNG", path: "/jpg-to-png", description: "Convert JPG to lossless PNG" },
  { from: "PNG", to: "JPG", path: "/png-to-jpg", description: "Compress PNG to compact JPG" },
  { from: "JPG", to: "WebP", path: "/jpg-to-webp", description: "Optimise JPG for the web" },
  { from: "PNG", to: "WebP", path: "/png-to-webp", description: "Compress PNG to modern WebP" },
  { from: "WebP", to: "JPG", path: "/webp-to-jpg", description: "Convert WebP to universal JPG" },
  { from: "WebP", to: "PNG", path: "/webp-to-png", description: "Convert WebP to lossless PNG" },
  { from: "SVG", to: "PNG", path: "/svg-to-png", description: "Rasterise SVG to PNG" },
  { from: "MP4", to: "MP3", path: "/mp4-to-mp3", description: "Extract audio from video" },
  { from: "MP4", to: "GIF", path: "/mp4-to-gif", description: "Create animated GIF from video" },
  { from: "MP4", to: "WebM", path: "/mp4-to-webm", description: "Re-encode as open WebM" },
  { from: "AVI", to: "MP4", path: "/avi-to-mp4", description: "Modernise AVI to MP4" },
  { from: "MOV", to: "MP4", path: "/mov-to-mp4", description: "Convert Apple MOV to MP4" },
  { from: "MKV", to: "MP4", path: "/mkv-to-mp4", description: "Convert MKV to universal MP4" },
  { from: "WebM", to: "MP4", path: "/webm-to-mp4", description: "Convert WebM to MP4" },
  { from: "WAV", to: "MP3", path: "/wav-to-mp3", description: "Compress WAV to MP3" },
  { from: "MP3", to: "WAV", path: "/mp3-to-wav", description: "Decode MP3 to uncompressed WAV" },
  { from: "OGG", to: "MP3", path: "/ogg-to-mp3", description: "Convert OGG to universal MP3" },
  { from: "FLAC", to: "MP3", path: "/flac-to-mp3", description: "Compress lossless FLAC to MP3" },
  { from: "AAC", to: "MP3", path: "/aac-to-mp3", description: "Transcode AAC to MP3" },
  { from: "JSON", to: "CSV", path: "/json-to-csv", description: "Transform JSON to CSV" },
  { from: "CSV", to: "JSON", path: "/csv-to-json", description: "Parse CSV into JSON" },
  { from: "Markdown", to: "HTML", path: "/markdown-to-html", description: "Render Markdown as HTML" },
  { from: "HTML", to: "Markdown", path: "/html-to-markdown", description: "Convert HTML to Markdown" },
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
  const router = useRouter();
  const [fromFormat, setFromFormat] = useState("");
  const [toFormat, setToFormat] = useState("");

  const validToFormats = useMemo(() => {
    if (!fromFormat) return [];
    return conversionMap.filter((c) => c.from === fromFormat).map((c) => c.to);
  }, [fromFormat]);

  const selectedConversion = useMemo(() => {
    if (!fromFormat || !toFormat) return null;
    return conversionMap.find((c) => c.from === fromFormat && c.to === toFormat) ?? null;
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
    if (selectedConversion) router.push(selectedConversion.path);
  };

  const selectClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-base font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none appearance-none cursor-pointer";

  const chevronBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

  return (
    <div>
      <div className="rounded-3xl bg-[color:var(--color-bg-card)] border-2 border-[color:var(--color-border)] p-6 sm:p-8 shadow-xl shadow-orange-900/[0.04]">
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {/* FROM */}
          <div className="flex-1">
            <label htmlFor="from" className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
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
            <div className="w-12 h-12 rounded-full bg-[color:var(--color-accent-light)] border-2 border-[color:var(--color-accent)]/20 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-[color:var(--color-accent)] animate-pulse-arrow hidden md:block" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <svg className="w-5 h-5 text-[color:var(--color-accent)] md:hidden" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
              </svg>
            </div>
          </div>

          {/* TO */}
          <div className="flex-1">
            <label htmlFor="to" className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
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
          disabled={!selectedConversion}
          className="mt-6 w-full h-14 rounded-2xl bg-[color:var(--color-accent)] text-white text-lg font-bold font-display tracking-wide transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-[color:var(--color-accent)] disabled:hover:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
        >
          Convert
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>

        {/* Subtext */}
        <p className="mt-4 text-center text-xs text-[color:var(--color-text-muted)]">
          {selectedConversion ? (
            <>
              {fromFormat} → {toFormat} —{" "}
              <span className="font-semibold text-[color:var(--color-text-secondary)]">
                {selectedConversion.description}
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
