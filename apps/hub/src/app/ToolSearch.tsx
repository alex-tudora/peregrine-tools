"use client";

import { useState, useRef, useEffect, useMemo } from "react";

interface Tool {
  name: string;
  href: string;
  site: string;
  siteColor: string;
}

const allTools: Tool[] = [
  // Peregrine PDF (16)
  { name: "Merge PDF", href: "https://peregrinepdf.com/merge-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "Split PDF", href: "https://peregrinepdf.com/split-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "Compress PDF", href: "https://peregrinepdf.com/compress-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "PDF to JPG", href: "https://peregrinepdf.com/pdf-to-jpg", site: "PDF", siteColor: "#2563EB" },
  { name: "JPG to PDF", href: "https://peregrinepdf.com/jpg-to-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "PDF to PNG", href: "https://peregrinepdf.com/pdf-to-png", site: "PDF", siteColor: "#2563EB" },
  { name: "PNG to PDF", href: "https://peregrinepdf.com/png-to-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "Rotate PDF", href: "https://peregrinepdf.com/rotate-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "Watermark PDF", href: "https://peregrinepdf.com/watermark-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "Unlock PDF", href: "https://peregrinepdf.com/unlock-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "Protect PDF", href: "https://peregrinepdf.com/protect-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "Sign PDF", href: "https://peregrinepdf.com/sign-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "Page Numbers", href: "https://peregrinepdf.com/add-page-numbers", site: "PDF", siteColor: "#2563EB" },
  { name: "OCR PDF", href: "https://peregrinepdf.com/ocr-pdf", site: "PDF", siteColor: "#2563EB" },
  { name: "PDF to Text", href: "https://peregrinepdf.com/pdf-to-text", site: "PDF", siteColor: "#2563EB" },

  // Peregrine Pix (16)
  { name: "Compress Image", href: "https://peregrinepix.com/compress-image", site: "Pix", siteColor: "#7C3AED" },
  { name: "Resize Image", href: "https://peregrinepix.com/resize-image", site: "Pix", siteColor: "#7C3AED" },
  { name: "Crop Image", href: "https://peregrinepix.com/crop-image", site: "Pix", siteColor: "#7C3AED" },
  { name: "Remove Background", href: "https://peregrinepix.com/remove-background", site: "Pix", siteColor: "#7C3AED" },
  { name: "PNG to JPG", href: "https://peregrinepix.com/png-to-jpg", site: "Pix", siteColor: "#7C3AED" },
  { name: "JPG to PNG", href: "https://peregrinepix.com/jpg-to-png", site: "Pix", siteColor: "#7C3AED" },
  { name: "WebP to JPG", href: "https://peregrinepix.com/webp-to-jpg", site: "Pix", siteColor: "#7C3AED" },
  { name: "WebP to PNG", href: "https://peregrinepix.com/webp-to-png", site: "Pix", siteColor: "#7C3AED" },
  { name: "JPG to WebP", href: "https://peregrinepix.com/jpg-to-webp", site: "Pix", siteColor: "#7C3AED" },
  { name: "PNG to WebP", href: "https://peregrinepix.com/png-to-webp", site: "Pix", siteColor: "#7C3AED" },
  { name: "SVG to PNG", href: "https://peregrinepix.com/svg-to-png", site: "Pix", siteColor: "#7C3AED" },
  { name: "Add Watermark", href: "https://peregrinepix.com/add-watermark", site: "Pix", siteColor: "#7C3AED" },
  { name: "Flip & Rotate", href: "https://peregrinepix.com/flip-rotate", site: "Pix", siteColor: "#7C3AED" },
  { name: "Favicon Generator", href: "https://peregrinepix.com/favicon-generator", site: "Pix", siteColor: "#7C3AED" },
  { name: "Image to Base64", href: "https://peregrinepix.com/image-to-base64", site: "Pix", siteColor: "#7C3AED" },
  { name: "Image Filters", href: "https://peregrinepix.com/image-filters", site: "Pix", siteColor: "#7C3AED" },

  // Peregrine Kit (31)
  { name: "Word Counter", href: "https://peregrinekit.com/word-counter", site: "Kit", siteColor: "#059669" },
  { name: "Character Counter", href: "https://peregrinekit.com/character-counter", site: "Kit", siteColor: "#059669" },
  { name: "Case Converter", href: "https://peregrinekit.com/case-converter", site: "Kit", siteColor: "#059669" },
  { name: "Lorem Ipsum Generator", href: "https://peregrinekit.com/lorem-ipsum-generator", site: "Kit", siteColor: "#059669" },
  { name: "Text Diff", href: "https://peregrinekit.com/text-diff", site: "Kit", siteColor: "#059669" },
  { name: "Remove Duplicates", href: "https://peregrinekit.com/remove-duplicates", site: "Kit", siteColor: "#059669" },
  { name: "Find & Replace", href: "https://peregrinekit.com/find-and-replace", site: "Kit", siteColor: "#059669" },
  { name: "Text to Slug", href: "https://peregrinekit.com/text-to-slug", site: "Kit", siteColor: "#059669" },
  { name: "Remove Line Breaks", href: "https://peregrinekit.com/remove-line-breaks", site: "Kit", siteColor: "#059669" },
  { name: "Markdown to HTML", href: "https://peregrinekit.com/markdown-to-html", site: "Kit", siteColor: "#059669" },
  { name: "HTML to Markdown", href: "https://peregrinekit.com/html-to-markdown", site: "Kit", siteColor: "#059669" },
  { name: "Readability Score", href: "https://peregrinekit.com/readability-score", site: "Kit", siteColor: "#059669" },
  { name: "Percentage Calculator", href: "https://peregrinekit.com/percentage-calculator", site: "Kit", siteColor: "#059669" },
  { name: "Age Calculator", href: "https://peregrinekit.com/age-calculator", site: "Kit", siteColor: "#059669" },
  { name: "Date Difference", href: "https://peregrinekit.com/date-difference", site: "Kit", siteColor: "#059669" },
  { name: "Unit Converter", href: "https://peregrinekit.com/unit-converter", site: "Kit", siteColor: "#059669" },
  { name: "Timezone Converter", href: "https://peregrinekit.com/timezone-converter", site: "Kit", siteColor: "#059669" },
  { name: "Tip Calculator", href: "https://peregrinekit.com/tip-calculator", site: "Kit", siteColor: "#059669" },
  { name: "BMI Calculator", href: "https://peregrinekit.com/bmi-calculator", site: "Kit", siteColor: "#059669" },
  { name: "Mortgage Calculator", href: "https://peregrinekit.com/mortgage-calculator", site: "Kit", siteColor: "#059669" },
  { name: "Compound Interest", href: "https://peregrinekit.com/compound-interest", site: "Kit", siteColor: "#059669" },
  { name: "Salary Calculator", href: "https://peregrinekit.com/salary-calculator", site: "Kit", siteColor: "#059669" },
  { name: "GPA Calculator", href: "https://peregrinekit.com/gpa-calculator", site: "Kit", siteColor: "#059669" },
  { name: "Meta Tag Generator", href: "https://peregrinekit.com/meta-tag-generator", site: "Kit", siteColor: "#059669" },
  { name: "Open Graph Preview", href: "https://peregrinekit.com/open-graph-preview", site: "Kit", siteColor: "#059669" },
  { name: "Robots.txt Generator", href: "https://peregrinekit.com/robots-txt-generator", site: "Kit", siteColor: "#059669" },
  { name: "Sitemap Generator", href: "https://peregrinekit.com/sitemap-generator", site: "Kit", siteColor: "#059669" },
  { name: "UTM Builder", href: "https://peregrinekit.com/utm-builder", site: "Kit", siteColor: "#059669" },
  { name: "QR Code Generator", href: "https://peregrinekit.com/qr-code-generator", site: "Kit", siteColor: "#059669" },
  { name: "Heading Checker", href: "https://peregrinekit.com/heading-checker", site: "Kit", siteColor: "#059669" },
  { name: "Text to Speech", href: "https://peregrinekit.com/text-to-speech", site: "Kit", siteColor: "#059669" },

  // Peregrine Vid (12)
  { name: "Video to MP4", href: "https://peregrinevid.com/convert-to-mp4", site: "Vid", siteColor: "#E11D48" },
  { name: "Video to MP3", href: "https://peregrinevid.com/video-to-mp3", site: "Vid", siteColor: "#E11D48" },
  { name: "Video to GIF", href: "https://peregrinevid.com/video-to-gif", site: "Vid", siteColor: "#E11D48" },
  { name: "Compress Video", href: "https://peregrinevid.com/compress-video", site: "Vid", siteColor: "#E11D48" },
  { name: "Trim Video", href: "https://peregrinevid.com/trim-video", site: "Vid", siteColor: "#E11D48" },
  { name: "Audio to MP3", href: "https://peregrinevid.com/convert-to-mp3", site: "Vid", siteColor: "#E11D48" },
  { name: "WAV to MP3", href: "https://peregrinevid.com/wav-to-mp3", site: "Vid", siteColor: "#E11D48" },
  { name: "MP3 to WAV", href: "https://peregrinevid.com/mp3-to-wav", site: "Vid", siteColor: "#E11D48" },
  { name: "Extract Audio", href: "https://peregrinevid.com/extract-audio", site: "Vid", siteColor: "#E11D48" },
  { name: "Compress Audio", href: "https://peregrinevid.com/compress-audio", site: "Vid", siteColor: "#E11D48" },
  { name: "Video to WebM", href: "https://peregrinevid.com/video-to-webm", site: "Vid", siteColor: "#E11D48" },
  { name: "Screen Recorder", href: "https://peregrinevid.com/screen-recorder", site: "Vid", siteColor: "#E11D48" },

  // Peregrine Dev (22)
  { name: "JSON Formatter", href: "https://peregrinedev.com/json-formatter", site: "Dev", siteColor: "#D97706" },
  { name: "JSON Validator", href: "https://peregrinedev.com/json-validator", site: "Dev", siteColor: "#D97706" },
  { name: "JSON to CSV", href: "https://peregrinedev.com/json-to-csv", site: "Dev", siteColor: "#D97706" },
  { name: "CSV to JSON", href: "https://peregrinedev.com/csv-to-json", site: "Dev", siteColor: "#D97706" },
  { name: "Regex Tester", href: "https://peregrinedev.com/regex-tester", site: "Dev", siteColor: "#D97706" },
  { name: "Base64 Encode/Decode", href: "https://peregrinedev.com/base64", site: "Dev", siteColor: "#D97706" },
  { name: "URL Encode/Decode", href: "https://peregrinedev.com/url-encode", site: "Dev", siteColor: "#D97706" },
  { name: "Hash Generator", href: "https://peregrinedev.com/hash-generator", site: "Dev", siteColor: "#D97706" },
  { name: "UUID Generator", href: "https://peregrinedev.com/uuid-generator", site: "Dev", siteColor: "#D97706" },
  { name: "Color Picker", href: "https://peregrinedev.com/color-picker", site: "Dev", siteColor: "#D97706" },
  { name: "Hex to RGB", href: "https://peregrinedev.com/hex-to-rgb", site: "Dev", siteColor: "#D97706" },
  { name: "Cron Builder", href: "https://peregrinedev.com/cron-builder", site: "Dev", siteColor: "#D97706" },
  { name: "JWT Decoder", href: "https://peregrinedev.com/jwt-decoder", site: "Dev", siteColor: "#D97706" },
  { name: "HTML Minifier", href: "https://peregrinedev.com/html-minifier", site: "Dev", siteColor: "#D97706" },
  { name: "CSS Minifier", href: "https://peregrinedev.com/css-minifier", site: "Dev", siteColor: "#D97706" },
  { name: "JS Minifier", href: "https://peregrinedev.com/js-minifier", site: "Dev", siteColor: "#D97706" },
  { name: "SQL Formatter", href: "https://peregrinedev.com/sql-formatter", site: "Dev", siteColor: "#D97706" },
  { name: "Diff Checker", href: "https://peregrinedev.com/diff-checker", site: "Dev", siteColor: "#D97706" },
  { name: "Timestamp Converter", href: "https://peregrinedev.com/timestamp-converter", site: "Dev", siteColor: "#D97706" },
  { name: "Password Generator", href: "https://peregrinedev.com/password-generator", site: "Dev", siteColor: "#D97706" },
  { name: "Markdown Preview", href: "https://peregrinedev.com/markdown-preview", site: "Dev", siteColor: "#D97706" },
  { name: "Color Palette Generator", href: "https://peregrinedev.com/color-palette", site: "Dev", siteColor: "#D97706" },
];

const placeholders = [
  'Try "compress PDF"...',
  'Try "resize image"...',
  'Try "JSON formatter"...',
];

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  // Simple fuzzy: every word in query appears somewhere in text
  const words = q.split(/\s+/).filter(Boolean);
  return words.every((w) => t.includes(w));
}

export function ToolSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Cycle placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return allTools.filter((tool) => fuzzyMatch(query, tool.name));
  }, [query]);

  // Group results by site
  const grouped = useMemo(() => {
    const groups: Record<string, Tool[]> = {};
    for (const tool of results) {
      if (!groups[tool.site]) groups[tool.site] = [];
      groups[tool.site].push(tool);
    }
    return groups;
  }, [results]);

  const flatResults = results;
  const showDropdown = isFocused && query.trim().length > 0;

  // Scroll selected result into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll("[data-result-item]");
      items[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      window.location.href = flatResults[selectedIndex].href;
    } else if (e.key === "Escape") {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[color:var(--color-text-muted)]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[placeholderIndex]}
          className="w-full h-14 pl-12 pr-4 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-base text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] transition-all duration-200 hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-2 focus:ring-[color:var(--color-accent-glow)] focus:outline-none shadow-[var(--shadow-warm-sm)]"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="tool-search-results"
          aria-activedescendant={selectedIndex >= 0 ? `tool-result-${selectedIndex}` : undefined}
        />
      </div>

      {/* Results dropdown */}
      {showDropdown && (
        <div
          id="tool-search-results"
          ref={resultsRef}
          role="listbox"
          className="animate-stoop absolute z-50 mt-2 w-full max-h-80 overflow-y-auto rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] shadow-[var(--shadow-warm-xl)]"
        >
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-[color:var(--color-text-muted)]">
              No tools found
            </p>
          ) : (
            Object.entries(grouped).map(([site, tools]) => (
              <div key={site}>
                <div className="px-4 pt-3 pb-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
                    Peregrine {site}
                  </span>
                </div>
                {tools.map((tool) => {
                  const flatIndex = flatResults.indexOf(tool);
                  return (
                    <a
                      key={tool.href}
                      id={`tool-result-${flatIndex}`}
                      data-result-item
                      href={tool.href}
                      role="option"
                      aria-selected={flatIndex === selectedIndex}
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                        flatIndex === selectedIndex
                          ? "bg-[color:var(--color-bg-elevated)]"
                          : "hover:bg-[color:var(--color-bg-elevated)]"
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: tool.siteColor }}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-[color:var(--color-text-primary)]">
                        {tool.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
