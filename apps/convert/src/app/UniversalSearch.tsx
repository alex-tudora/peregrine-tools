"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { conversions, type ConversionDef } from "@/data/conversions";

// ---------------------------------------------------------------------------
// Category display labels
// ---------------------------------------------------------------------------
const categoryLabels: Record<ConversionDef["category"], string> = {
  pdf: "Documents",
  image: "Images",
  video: "Video",
  audio: "Audio",
  data: "Data",
  text: "Text & Encoding",
  unit: "Units",
  currency: "Currency",
  number: "Numbers",
  color: "Color",
  timezone: "Timezone",
  date: "Date Formats",
};

// ---------------------------------------------------------------------------
// Inline conversion factors  (unit category only)
// Covers the most common conversions users would type "5 kg", "100 miles", etc.
// ---------------------------------------------------------------------------
interface InlineRule {
  /** regex aliases the user might type for the "from" unit (case-insensitive) */
  fromAliases: string[];
  to: string;
  toLabel: string;
  convert: (v: number) => number;
  slug: string;
}

const inlineRules: InlineRule[] = [
  // Weight
  { fromAliases: ["kg", "kgs", "kilogram", "kilograms"], to: "lbs", toLabel: "lbs", convert: (v) => v * 2.20462, slug: "kg-to-lbs" },
  { fromAliases: ["lb", "lbs", "pound", "pounds"], to: "kg", toLabel: "kg", convert: (v) => v * 0.453592, slug: "lbs-to-kg" },
  { fromAliases: ["oz", "ounce", "ounces"], to: "grams", toLabel: "g", convert: (v) => v * 28.3495, slug: "oz-to-grams" },
  { fromAliases: ["gram", "grams", "g"], to: "oz", toLabel: "oz", convert: (v) => v * 0.035274, slug: "grams-to-oz" },
  { fromAliases: ["stone", "stones", "st"], to: "kg", toLabel: "kg", convert: (v) => v * 6.35029, slug: "stones-to-kg" },
  // Length
  { fromAliases: ["km", "kms", "kilometer", "kilometers", "kilometre", "kilometres"], to: "miles", toLabel: "miles", convert: (v) => v * 0.621371, slug: "km-to-miles" },
  { fromAliases: ["mile", "miles", "mi"], to: "km", toLabel: "km", convert: (v) => v * 1.60934, slug: "miles-to-km" },
  { fromAliases: ["foot", "feet", "ft"], to: "m", toLabel: "m", convert: (v) => v * 0.3048, slug: "feet-to-meters" },
  { fromAliases: ["meter", "meters", "metre", "metres", "m"], to: "ft", toLabel: "ft", convert: (v) => v * 3.28084, slug: "meters-to-feet" },
  { fromAliases: ["inch", "inches", "in"], to: "cm", toLabel: "cm", convert: (v) => v * 2.54, slug: "inches-to-cm" },
  { fromAliases: ["cm", "centimeter", "centimeters", "centimetre", "centimetres"], to: "inches", toLabel: "in", convert: (v) => v * 0.393701, slug: "cm-to-inches" },
  { fromAliases: ["yard", "yards", "yd", "yds"], to: "m", toLabel: "m", convert: (v) => v * 0.9144, slug: "yards-to-meters" },
  { fromAliases: ["mm", "millimeter", "millimeters", "millimetre", "millimetres"], to: "inches", toLabel: "in", convert: (v) => v * 0.0393701, slug: "mm-to-inches" },
  // Temperature
  { fromAliases: ["celsius", "c", "°c"], to: "°F", toLabel: "°F", convert: (v) => v * 9 / 5 + 32, slug: "celsius-to-fahrenheit" },
  { fromAliases: ["fahrenheit", "f", "°f"], to: "°C", toLabel: "°C", convert: (v) => (v - 32) * 5 / 9, slug: "fahrenheit-to-celsius" },
  // Volume
  { fromAliases: ["liter", "liters", "litre", "litres", "l"], to: "gal", toLabel: "gal", convert: (v) => v * 0.264172, slug: "liters-to-gallons" },
  { fromAliases: ["gallon", "gallons", "gal"], to: "L", toLabel: "L", convert: (v) => v * 3.78541, slug: "gallons-to-liters" },
  { fromAliases: ["cup", "cups"], to: "ml", toLabel: "ml", convert: (v) => v * 236.588, slug: "cups-to-ml" },
  { fromAliases: ["ml", "milliliter", "milliliters", "millilitre", "millilitres"], to: "cups", toLabel: "cups", convert: (v) => v * 0.00422675, slug: "ml-to-cups" },
  // Speed
  { fromAliases: ["kmh", "km/h", "kph"], to: "mph", toLabel: "mph", convert: (v) => v * 0.621371, slug: "kmh-to-mph" },
  { fromAliases: ["mph"], to: "km/h", toLabel: "km/h", convert: (v) => v * 1.60934, slug: "mph-to-kmh" },
];

// Build a quick lookup: alias -> rule
const aliasMap = new Map<string, InlineRule>();
for (const rule of inlineRules) {
  for (const alias of rule.fromAliases) {
    aliasMap.set(alias.toLowerCase(), rule);
  }
}

// ---------------------------------------------------------------------------
// Cycling placeholder
// ---------------------------------------------------------------------------
const placeholders = [
  "Try 'kg to lbs'...",
  "Try 'PDF to JPG'...",
  "Try 'USD to EUR'...",
  "Try 'hex to rgb'...",
  "Try '5 kg'...",
  "Try 'celsius'...",
];

// ---------------------------------------------------------------------------
// Fuzzy match scoring
// ---------------------------------------------------------------------------
function scoreConversion(c: ConversionDef, query: string): number {
  const q = query.toLowerCase();
  const fields = [
    c.slug,
    c.from.toLowerCase(),
    c.to.toLowerCase(),
    c.toolName.toLowerCase(),
    c.keyword.toLowerCase(),
    c.category,
    c.description.toLowerCase(),
  ];

  let score = 0;

  // Exact match on from or to
  if (c.from.toLowerCase() === q || c.to.toLowerCase() === q) score += 100;

  // Exact slug match
  if (c.slug === q) score += 120;

  // Keyword starts with query
  if (c.keyword.toLowerCase().startsWith(q)) score += 80;

  // "from to to" pattern (e.g. "kg to lbs")
  const toPattern = q.match(/^(.+?)\s+to\s+(.+)$/);
  if (toPattern) {
    const [, fromQ, toQ] = toPattern;
    if (c.from.toLowerCase().includes(fromQ) && c.to.toLowerCase().includes(toQ)) score += 150;
    if (c.slug.includes(fromQ) && c.slug.includes(toQ)) score += 100;
  }

  // General substring match across fields
  for (const field of fields) {
    if (field.includes(q)) score += 20;
    // Word-boundary match
    if (field.split(/[\s\-_/]/).some((word) => word.startsWith(q))) score += 30;
  }

  // Partial token matching (each word in query)
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    const allHit = tokens.every((t) =>
      fields.some((f) => f.includes(t))
    );
    if (allHit) score += 60;
  }

  return score;
}

// ---------------------------------------------------------------------------
// Parse inline answer
// ---------------------------------------------------------------------------
interface InlineAnswer {
  value: number;
  fromUnit: string;
  result: number;
  toUnit: string;
  slug: string;
}

function parseInlineAnswer(query: string): InlineAnswer | null {
  // Match patterns like "5 kg", "100.5 miles", "32 fahrenheit", "5.5kg"
  const match = query.match(/^(\d+(?:\.\d+)?)\s*([a-z°/]+.*)$/i);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const unitStr = match[2].trim().toLowerCase();

  const rule = aliasMap.get(unitStr);
  if (!rule) return null;

  return {
    value,
    fromUnit: unitStr,
    result: rule.convert(value),
    toUnit: rule.toLabel,
    slug: rule.slug,
  };
}

// ---------------------------------------------------------------------------
// Format number nicely
// ---------------------------------------------------------------------------
function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toLocaleString();
  // Show up to 4 decimal places, strip trailing zeros
  return parseFloat(n.toFixed(4)).toLocaleString(undefined, { maximumFractionDigits: 4 });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const MAX_VISIBLE = 8;

export function UniversalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  // Cycle placeholder text
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Fuzzy search results
  const scored = useMemo(() => {
    const q = query.trim();
    if (!q) return [];

    // Strip leading number for search (so "5 kg" still finds kg conversions)
    const searchQ = q.replace(/^\d+(?:\.\d+)?\s*/, "").trim() || q;

    return conversions
      .map((c) => ({ conversion: c, score: scoreConversion(c, searchQ) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query]);

  const totalResults = scored.length;
  const visibleResults = showAll ? scored : scored.slice(0, MAX_VISIBLE);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, { label: string; items: typeof visibleResults }>();
    for (const r of visibleResults) {
      const cat = r.conversion.category;
      if (!map.has(cat)) {
        map.set(cat, { label: categoryLabels[cat] || cat, items: [] });
      }
      map.get(cat)!.items.push(r);
    }
    return Array.from(map.entries()).map(([, val]) => val);
  }, [visibleResults]);

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => visibleResults.map((r) => r.conversion), [visibleResults]);

  // Inline answer
  const inlineAnswer = useMemo(() => {
    const q = query.trim();
    if (!q) return null;
    return parseInlineAnswer(q);
  }, [query]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
    setShowAll(false);
  }, [query]);

  const showDropdown = isFocused && query.trim().length > 0 && (totalResults > 0 || !!inlineAnswer);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const navigate = useCallback(
    (slug: string) => {
      setQuery("");
      router.push(`/${slug}`);
    },
    [router],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!flatResults.length && !inlineAnswer) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && flatResults[activeIndex]) {
          navigate(flatResults[activeIndex].slug);
        } else if (inlineAnswer) {
          navigate(inlineAnswer.slug);
        } else if (flatResults.length > 0) {
          navigate(flatResults[0].slug);
        }
        break;
      case "Escape":
        setQuery("");
        inputRef.current?.blur();
        break;
    }
  };

  // Track flat index for keyboard nav across groups
  let flatIndex = -1;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative">
        {/* Search icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-6 h-6 text-[color:var(--color-text-muted)]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay so click on result registers first
            setTimeout(() => setIsFocused(false), 200);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[placeholderIndex]}
          className="w-full h-16 sm:h-[72px] pl-14 pr-5 rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-lg sm:text-xl font-display font-medium text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)]/60 transition-all duration-200 focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none shadow-lg shadow-orange-900/[0.06]"
          role="combobox"
          aria-expanded={showDropdown || false}
          aria-haspopup="listbox"
          aria-controls="search-results"
          aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
          autoComplete="off"
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-border)] flex items-center justify-center text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)] hover:border-[color:var(--color-border-hover)] transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={listRef}
          id="search-results"
          role="listbox"
          className="absolute z-50 mt-2 w-full max-h-[420px] overflow-y-auto rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] shadow-2xl shadow-orange-900/[0.08]"
        >
          {/* Inline answer banner */}
          {inlineAnswer && (
            <button
              onClick={() => navigate(inlineAnswer.slug)}
              className="w-full flex items-center gap-3 px-5 py-4 border-b-2 border-[color:var(--color-accent)]/20 bg-[color:var(--color-accent-light)] hover:bg-[color:var(--color-accent)]/10 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[color:var(--color-accent)]/15 shrink-0">
                <svg className="w-5 h-5 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-lg text-[color:var(--color-text-primary)]">
                  {formatNumber(inlineAnswer.value)} {inlineAnswer.fromUnit} ={" "}
                  <span className="text-[color:var(--color-accent)]">
                    {formatNumber(inlineAnswer.result)} {inlineAnswer.toUnit}
                  </span>
                </p>
                <p className="text-xs text-[color:var(--color-text-muted)]">
                  Instant answer &middot; Click for full converter
                </p>
              </div>
              <svg className="w-4 h-4 text-[color:var(--color-accent)] shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}

          {/* Results grouped by category */}
          {totalResults > 0 ? (
            <>
              {grouped.map((group) => (
                <div key={group.label}>
                  {/* Category label */}
                  <div className="px-5 pt-3 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)]">
                      {group.label}
                    </span>
                  </div>

                  {/* Items */}
                  {group.items.map((r) => {
                    flatIndex++;
                    const idx = flatIndex;
                    const isActive = idx === activeIndex;

                    return (
                      <button
                        key={r.conversion.slug}
                        id={`result-${idx}`}
                        data-index={idx}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => navigate(r.conversion.slug)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer ${
                          isActive
                            ? "bg-[color:var(--color-accent-light)]"
                            : "hover:bg-[color:var(--color-bg-elevated)]"
                        }`}
                      >
                        {/* From -> To */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                            {r.conversion.from}
                          </span>
                          <svg
                            className="w-3.5 h-3.5 text-[color:var(--color-accent)]"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                          <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                            {r.conversion.to}
                          </span>
                        </div>

                        {/* Description (truncated) */}
                        <span className="text-xs text-[color:var(--color-text-muted)] truncate min-w-0">
                          {r.conversion.toolName}
                        </span>

                        {/* Chevron */}
                        <svg
                          className="w-3.5 h-3.5 text-[color:var(--color-text-muted)] shrink-0 ml-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              ))}

              {/* Show all link */}
              {!showAll && totalResults > MAX_VISIBLE && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAll(true);
                  }}
                  className="w-full px-5 py-3 text-center text-sm font-semibold text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-light)] transition-colors border-t border-[color:var(--color-border)] cursor-pointer"
                >
                  Show all {totalResults} results
                </button>
              )}
            </>
          ) : (
            /* No results - knight message */
            !inlineAnswer && (
              <div className="px-5 py-8 text-center">
                <p className="text-3xl mb-3" aria-hidden="true">
                  &#x2694;&#xFE0F;
                </p>
                <p className="font-display font-semibold text-base text-[color:var(--color-text-primary)]">
                  The knight searched high and low.
                </p>
                <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">
                  Nothing matches. Try a different quest?
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
