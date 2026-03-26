"use client";

import { useState, useMemo, useCallback, useEffect } from "react";

interface DateFormatConverterToolProps {
  fromFormat: string;
  toFormat: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

const knightMessages = [
  "The knight keeps his appointments in ISO 8601. Naturally.",
  "Dates are confusing. The knight once showed up a century late.",
  "From one format to another — faster than the knight's calendar flip.",
  "The knight insists: YYYY-MM-DD is the one true format.",
  "Converted! Even the knight's scribe approves.",
  "Time flies when you're converting dates. The knight nods wisely.",
  "The knight's sundial doesn't do date formats. This tool does.",
  "MM/DD or DD/MM? The eternal debate. The knight stays neutral.",
  "A date by any format would smell as sweet. — The Knight, probably.",
  "The knight once wrote a date in Roman numerals. It did not go well.",
];

function getRandomMessage() {
  return knightMessages[Math.floor(Math.random() * knightMessages.length)];
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function getRelativeDay(date: Date): string {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((targetStart.getTime() - todayStart.getTime()) / 86400000);

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "tomorrow";
  if (diffDays === -1) return "yesterday";
  if (diffDays > 0) return `in ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? "s" : ""} ago`;
}

/**
 * Try to parse a date string in multiple common formats.
 * Returns a Date object or null if unparseable.
 */
function parseFlexibleDate(input: string): Date | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Unix timestamp (all digits, 9-10 chars for seconds, 13 for ms)
  if (/^\d{9,13}$/.test(trimmed)) {
    const n = parseInt(trimmed, 10);
    const ms = trimmed.length <= 10 ? n * 1000 : n;
    const d = new Date(ms);
    if (!isNaN(d.getTime())) return d;
  }

  // ISO 8601: YYYY-MM-DD
  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const d = new Date(parseInt(isoMatch[1]), parseInt(isoMatch[2]) - 1, parseInt(isoMatch[3]));
    if (!isNaN(d.getTime())) return d;
  }

  // US: MM/DD/YYYY
  const usMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (usMatch) {
    const d = new Date(parseInt(usMatch[3]), parseInt(usMatch[1]) - 1, parseInt(usMatch[2]));
    if (!isNaN(d.getTime())) return d;
  }

  // EU: DD.MM.YYYY or DD/MM/YYYY (if day > 12 we can be sure)
  const euMatch = trimmed.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (euMatch) {
    const first = parseInt(euMatch[1]);
    const second = parseInt(euMatch[2]);
    // If first > 12, it must be DD/MM
    if (first > 12) {
      const d = new Date(parseInt(euMatch[3]), second - 1, first);
      if (!isNaN(d.getTime())) return d;
    }
  }

  // Long formats: "March 26, 2026" or "26 March 2026"
  const longUsMatch = trimmed.match(
    /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})$/i,
  );
  if (longUsMatch) {
    const monthIdx = MONTH_NAMES.findIndex(
      (m) => m.toLowerCase() === longUsMatch[1].toLowerCase(),
    );
    if (monthIdx !== -1) {
      const d = new Date(parseInt(longUsMatch[3]), monthIdx, parseInt(longUsMatch[2]));
      if (!isNaN(d.getTime())) return d;
    }
  }

  const longEuMatch = trimmed.match(
    /^(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December),?\s+(\d{4})$/i,
  );
  if (longEuMatch) {
    const monthIdx = MONTH_NAMES.findIndex(
      (m) => m.toLowerCase() === longEuMatch[2].toLowerCase(),
    );
    if (monthIdx !== -1) {
      const d = new Date(parseInt(longEuMatch[3]), monthIdx, parseInt(longEuMatch[1]));
      if (!isNaN(d.getTime())) return d;
    }
  }

  // Fallback: try native Date parsing
  const fallback = new Date(trimmed);
  if (!isNaN(fallback.getTime())) return fallback;

  return null;
}

interface FormatOutput {
  label: string;
  value: string;
}

function getFormats(date: Date): FormatOutput[] {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = String(date.getFullYear());

  const timestamp = Math.floor(date.getTime() / 1000);

  return [
    { label: "US (MM/DD/YYYY)", value: `${mm}/${dd}/${yyyy}` },
    { label: "EU (DD/MM/YYYY)", value: `${dd}/${mm}/${yyyy}` },
    { label: "ISO 8601 (YYYY-MM-DD)", value: `${yyyy}-${mm}-${dd}` },
    { label: "Long US", value: `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${yyyy}` },
    { label: "Long EU", value: `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${yyyy}` },
    { label: "Unix timestamp", value: String(timestamp) },
    { label: "Relative", value: getRelativeDay(date) },
    { label: "Day of week", value: DAY_NAMES[date.getDay()] },
    { label: "Week number", value: `Week ${getWeekNumber(date)}` },
    { label: "Day of year", value: `Day ${getDayOfYear(date)}` },
  ];
}

export function DateFormatConverterTool({ fromFormat, toFormat }: DateFormatConverterToolProps) {
  const [input, setInput] = useState("");
  const [datePickerValue, setDatePickerValue] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [knightMsg, setKnightMsg] = useState("");
  // Suppress unused variable warnings — props are kept for API consistency
  void fromFormat;
  void toFormat;

  useEffect(() => {
    // Default to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDatePickerValue(`${yyyy}-${mm}-${dd}`);
    setKnightMsg(getRandomMessage());
  }, []);

  const parsedDate = useMemo(() => {
    // Prefer text input if non-empty, otherwise use date picker
    if (input.trim()) {
      return parseFlexibleDate(input);
    }
    if (datePickerValue) {
      return parseFlexibleDate(datePickerValue);
    }
    return null;
  }, [input, datePickerValue]);

  const formats = useMemo(() => {
    if (!parsedDate) return [];
    return getFormats(parsedDate);
  }, [parsedDate]);

  const handleCopy = useCallback(async (value: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    setKnightMsg(getRandomMessage());
  }, []);

  const handleDatePickerChange = useCallback((value: string) => {
    setDatePickerValue(value);
    setInput(""); // Clear text input so picker takes priority
    setKnightMsg(getRandomMessage());
  }, []);

  const inputClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-lg font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none";

  return (
    <div className="space-y-6">
      {/* Input section */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
            Type a date
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="e.g. 03/26/2026, 2026-03-26, March 26 2026..."
            className={inputClass}
            autoFocus
          />
          <p className="mt-1.5 text-xs text-[color:var(--color-text-muted)]">
            Auto-detects US, EU, ISO, long formats, and Unix timestamps
          </p>
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
            Or pick a date
          </label>
          <input
            type="date"
            value={datePickerValue}
            onChange={(e) => handleDatePickerChange(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Parse error */}
      {input.trim() && !parsedDate && (
        <div className="rounded-xl border border-red-200 bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]">
          <span className="mr-2 font-semibold">Hmm.</span>
          Could not parse that date. Try a format like MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, or a Unix timestamp.
        </div>
      )}

      {/* All format outputs */}
      {formats.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[color:var(--color-text-secondary)]">
            All formats
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {formats.map((fmt, idx) => (
              <div
                key={fmt.label}
                className="flex items-center justify-between rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 transition-all hover:border-[color:var(--color-border-hover)]"
              >
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[color:var(--color-text-muted)]">
                    {fmt.label}
                  </span>
                  <span className="block font-mono text-base font-semibold text-[color:var(--color-text-primary)] truncate">
                    {fmt.value}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(fmt.value, idx)}
                  className="ml-3 flex-shrink-0 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-2.5 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-all hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-light)] cursor-pointer"
                >
                  {copiedIdx === idx ? "Copied!" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Knight personality message */}
      {knightMsg && formats.length > 0 && (
        <p className="text-center text-sm text-[color:var(--color-text-muted)] italic">
          {knightMsg}
        </p>
      )}

      {/* Quick presets */}
      <div>
        <h3 className="text-sm font-semibold text-[color:var(--color-text-secondary)] mb-3">
          Try a sample
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Today", value: "" },
            { label: "03/26/2026", value: "03/26/2026" },
            { label: "26/03/2026", value: "26/03/2026" },
            { label: "2026-03-26", value: "2026-03-26" },
            { label: "March 26, 2026", value: "March 26, 2026" },
            { label: "1774588800", value: "1774588800" },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                if (preset.value) {
                  setInput(preset.value);
                } else {
                  setInput("");
                  const today = new Date();
                  const yyyy = today.getFullYear();
                  const mm = String(today.getMonth() + 1).padStart(2, "0");
                  const dd = String(today.getDate()).padStart(2, "0");
                  setDatePickerValue(`${yyyy}-${mm}-${dd}`);
                }
                setKnightMsg(getRandomMessage());
              }}
              className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] transition-all hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-light)] cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
