"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";

interface TimezoneConverterToolProps {
  fromTimezone: string;
  toTimezone: string;
}

interface TimezoneInfo {
  id: string;
  label: string;
  abbr: string;
  iana: string;
}

const TIMEZONES: TimezoneInfo[] = [
  { id: "utc", label: "UTC (Coordinated Universal Time)", abbr: "UTC", iana: "UTC" },
  { id: "est", label: "US Eastern Time", abbr: "EST/EDT", iana: "America/New_York" },
  { id: "cst", label: "US Central Time", abbr: "CST/CDT", iana: "America/Chicago" },
  { id: "mst", label: "US Mountain Time", abbr: "MST/MDT", iana: "America/Denver" },
  { id: "pst", label: "US Pacific Time", abbr: "PST/PDT", iana: "America/Los_Angeles" },
  { id: "gmt", label: "London (GMT/BST)", abbr: "GMT/BST", iana: "Europe/London" },
  { id: "cet", label: "Berlin (CET/CEST)", abbr: "CET/CEST", iana: "Europe/Berlin" },
  { id: "ist", label: "India Standard Time", abbr: "IST", iana: "Asia/Kolkata" },
  { id: "dubai", label: "Dubai (Gulf Standard)", abbr: "GST", iana: "Asia/Dubai" },
  { id: "shanghai", label: "Shanghai (China Standard)", abbr: "CST", iana: "Asia/Shanghai" },
  { id: "jst", label: "Japan Standard Time", abbr: "JST", iana: "Asia/Tokyo" },
  { id: "aest", label: "Sydney (AEST/AEDT)", abbr: "AEST", iana: "Australia/Sydney" },
  { id: "nzst", label: "Auckland (NZST/NZDT)", abbr: "NZST", iana: "Pacific/Auckland" },
  { id: "hst", label: "Hawaii Standard Time", abbr: "HST", iana: "Pacific/Honolulu" },
  { id: "akst", label: "Alaska Time", abbr: "AKST/AKDT", iana: "America/Anchorage" },
  { id: "brt", label: "Brasilia Time", abbr: "BRT", iana: "America/Sao_Paulo" },
  { id: "cat", label: "Central Africa Time", abbr: "CAT", iana: "Africa/Johannesburg" },
  { id: "sgt", label: "Singapore Time", abbr: "SGT", iana: "Asia/Singapore" },
  { id: "kst", label: "Korea Standard Time", abbr: "KST", iana: "Asia/Seoul" },
  { id: "ict", label: "Indochina Time (Bangkok)", abbr: "ICT", iana: "Asia/Bangkok" },
];

const TIMEZONE_MAP = new Map(TIMEZONES.map((tz) => [tz.id, tz]));

const knightMessages = [
  "The knight is always late. But your conversion is right on time.",
  "Time zones are confusing. Even the knight agrees.",
  "The knight once tried to joust across time zones. He arrived yesterday.",
  "Converted! The knight wonders what time it is in Camelot.",
  "Time waits for no knight. But this tool waits for you.",
  "The knight's sundial doesn't handle time zones. This tool does.",
  "From one timezone to another — faster than the knight's horse.",
  "The knight says: the only bad time is when your conversion is wrong.",
  "Tick tock. The knight's armor clock is always off by a few centuries.",
  "Time flies when you're converting zones. The knight can confirm.",
];

function getRandomMessage() {
  return knightMessages[Math.floor(Math.random() * knightMessages.length)];
}

function formatTimeInTimezone(date: Date, iana: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: iana,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

function formatDateInTimezone(date: Date, iana: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: iana,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getOffsetMinutes(date: Date, iana: string): number {
  // Get the UTC offset for a timezone at a given date by formatting and parsing
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: iana,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => {
    const part = parts.find((p) => p.type === type);
    return part ? parseInt(part.value) : 0;
  };

  // Reconstruct the date in the target timezone (as if it were UTC)
  const tzDate = new Date(
    Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second")),
  );

  // The difference between the UTC timestamp and the "fake UTC" timestamp gives us the offset
  return Math.round((tzDate.getTime() - date.getTime()) / 60000);
}

function getTimeDifference(date: Date, fromIana: string, toIana: string): string {
  const fromOffset = getOffsetMinutes(date, fromIana);
  const toOffset = getOffsetMinutes(date, toIana);
  const diffMinutes = toOffset - fromOffset;
  const hours = Math.floor(Math.abs(diffMinutes) / 60);
  const mins = Math.abs(diffMinutes) % 60;
  const sign = diffMinutes >= 0 ? "+" : "-";

  if (diffMinutes === 0) return "Same time";
  if (mins === 0) return `${sign}${hours} hour${hours !== 1 ? "s" : ""}`;
  return `${sign}${hours}h ${mins}m`;
}

export function TimezoneConverterTool({ fromTimezone, toTimezone }: TimezoneConverterToolProps) {
  const [fromTz, setFromTz] = useState(fromTimezone);
  const [toTz, setToTz] = useState(toTimezone);
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [dateStr, setDateStr] = useState("");
  const [knightMsg, setKnightMsg] = useState("");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize date to today
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDateStr(`${yyyy}-${mm}-${dd}`);
    setKnightMsg(getRandomMessage());
  }, []);

  // Update current time every second
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const fromTzInfo = useMemo(() => TIMEZONE_MAP.get(fromTz), [fromTz]);
  const toTzInfo = useMemo(() => TIMEZONE_MAP.get(toTz), [toTz]);

  // Build a Date in the source timezone
  const sourceDate = useMemo(() => {
    if (!dateStr || !fromTzInfo) return null;
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    if (h < 0 || h > 23 || m < 0 || m > 59) return null;

    // Create a date string that we interpret in the source timezone
    // We use a hack: create a date formatter to get the UTC offset, then calculate
    const [year, month, day] = dateStr.split("-").map(Number);
    if (!year || !month || !day) return null;

    // Create a "guess" UTC date, then adjust for the source timezone offset
    const guess = new Date(Date.UTC(year, month - 1, day, h, m, 0));
    const offset = getOffsetMinutes(guess, fromTzInfo.iana);
    // Subtract the offset to get the actual UTC moment
    return new Date(guess.getTime() - offset * 60000);
  }, [dateStr, hours, minutes, fromTzInfo]);

  // Format the result in the target timezone
  const result = useMemo(() => {
    if (!sourceDate || !toTzInfo) return null;
    return {
      time: formatTimeInTimezone(sourceDate, toTzInfo.iana),
      date: formatDateInTimezone(sourceDate, toTzInfo.iana),
    };
  }, [sourceDate, toTzInfo]);

  // Time difference
  const timeDiff = useMemo(() => {
    if (!sourceDate || !fromTzInfo || !toTzInfo) return "";
    return getTimeDifference(sourceDate, fromTzInfo.iana, toTzInfo.iana);
  }, [sourceDate, fromTzInfo, toTzInfo]);

  const handleSwap = useCallback(() => {
    setFromTz(toTz);
    setToTz(fromTz);
    setKnightMsg(getRandomMessage());
  }, [fromTz, toTz]);

  const handleHoursChange = useCallback((val: string) => {
    if (val === "" || /^\d{0,2}$/.test(val)) {
      const num = parseInt(val);
      if (val === "" || (num >= 0 && num <= 23)) setHours(val);
    }
  }, []);

  const handleMinutesChange = useCallback((val: string) => {
    if (val === "" || /^\d{0,2}$/.test(val)) {
      const num = parseInt(val);
      if (val === "" || (num >= 0 && num <= 59)) setMinutes(val);
    }
  }, []);

  const inputClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-lg font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none";

  const selectClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-base font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none appearance-none cursor-pointer";

  const chevronBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

  return (
    <div className="space-y-6">
      {/* Current time in both timezones */}
      {fromTzInfo && toTzInfo && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-5 py-3.5 text-center">
            <span className="block text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider">
              Now in {fromTzInfo.abbr}
            </span>
            <span className="block font-mono text-lg font-bold text-[color:var(--color-text-primary)]">
              {formatTimeInTimezone(currentTime, fromTzInfo.iana)}
            </span>
          </div>
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-5 py-3.5 text-center">
            <span className="block text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider">
              Now in {toTzInfo.abbr}
            </span>
            <span className="block font-mono text-lg font-bold text-[color:var(--color-text-primary)]">
              {formatTimeInTimezone(currentTime, toTzInfo.iana)}
            </span>
          </div>
        </div>
      )}

      {/* FROM section */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
          From
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Time input */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              inputMode="numeric"
              value={hours}
              onChange={(e) => handleHoursChange(e.target.value)}
              placeholder="HH"
              className={`${inputClass} w-20 text-center`}
              maxLength={2}
              autoFocus
            />
            <span className="text-2xl font-bold text-[color:var(--color-text-muted)]">:</span>
            <input
              type="text"
              inputMode="numeric"
              value={minutes}
              onChange={(e) => handleMinutesChange(e.target.value)}
              placeholder="MM"
              className={`${inputClass} w-20 text-center`}
              maxLength={2}
            />
          </div>
          {/* Date picker */}
          <div className="flex-shrink-0">
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className={inputClass}
            />
          </div>
          {/* Timezone selector */}
          <div className="flex-1 min-w-0">
            <select
              value={fromTz}
              onChange={(e) => {
                setFromTz(e.target.value);
                setKnightMsg(getRandomMessage());
              }}
              className={selectClass}
              style={{
                backgroundImage: chevronBg,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
              }}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Swap button */}
      <div className="flex justify-center">
        <button
          onClick={handleSwap}
          className="btn-action w-12 h-12 rounded-full bg-[color:var(--color-accent-light)] border-2 border-[color:var(--color-accent)]/20 flex items-center justify-center shadow-sm transition-all hover:bg-[color:var(--color-accent)] hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
          title="Swap timezones"
          aria-label="Swap from and to timezones"
        >
          <svg
            className="w-5 h-5 text-[color:var(--color-accent)] group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        </button>
      </div>

      {/* TO section */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
          To
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Result time */}
          <div className="flex-1">
            <div className={`${inputClass} flex items-center bg-[color:var(--color-bg-elevated)] cursor-default`}>
              {result ? (
                <span className="font-mono">
                  {result.time}
                  <span className="ml-3 text-sm text-[color:var(--color-text-muted)]">
                    {result.date}
                  </span>
                </span>
              ) : (
                <span className="text-[color:var(--color-text-muted)]">Result</span>
              )}
            </div>
          </div>
          {/* To timezone selector */}
          <div className="sm:w-72">
            <select
              value={toTz}
              onChange={(e) => {
                setToTz(e.target.value);
                setKnightMsg(getRandomMessage());
              }}
              className={selectClass}
              style={{
                backgroundImage: chevronBg,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
              }}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.id} value={tz.id}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Time difference display */}
      {timeDiff && (
        <div className="rounded-xl bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-border)] px-5 py-3.5 text-center">
          <p className="font-mono text-base font-semibold text-[color:var(--color-text-primary)]">
            {fromTzInfo?.abbr} to {toTzInfo?.abbr}: {timeDiff}
          </p>
        </div>
      )}

      {/* Knight personality message */}
      {knightMsg && result && (
        <p className="text-center text-sm text-[color:var(--color-text-muted)] italic">
          {knightMsg}
        </p>
      )}

      {/* Common timezone presets */}
      <div>
        <h3 className="text-sm font-semibold text-[color:var(--color-text-secondary)] mb-3">
          Quick presets
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { from: "est", to: "utc", label: "EST to UTC" },
            { from: "pst", to: "est", label: "PST to EST" },
            { from: "utc", to: "ist", label: "UTC to IST" },
            { from: "utc", to: "jst", label: "UTC to JST" },
            { from: "gmt", to: "cet", label: "GMT to CET" },
            { from: "est", to: "gmt", label: "EST to GMT" },
          ].map((preset) => (
            <button
              key={`${preset.from}-${preset.to}`}
              onClick={() => {
                setFromTz(preset.from);
                setToTz(preset.to);
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
