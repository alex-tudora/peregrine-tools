"use client";

import { useState, useMemo } from "react";

const timezones = [
  { label: "UTC (UTC+0)", iana: "UTC" },
  { label: "GMT (UTC+0)", iana: "Europe/London" },
  { label: "EST (UTC-5)", iana: "America/New_York" },
  { label: "CST (UTC-6)", iana: "America/Chicago" },
  { label: "MST (UTC-7)", iana: "America/Denver" },
  { label: "PST (UTC-8)", iana: "America/Los_Angeles" },
  { label: "AKST (UTC-9)", iana: "America/Anchorage" },
  { label: "HST (UTC-10)", iana: "Pacific/Honolulu" },
  { label: "AST (UTC-4)", iana: "America/Halifax" },
  { label: "BRT (UTC-3)", iana: "America/Sao_Paulo" },
  { label: "CET (UTC+1)", iana: "Europe/Paris" },
  { label: "EET (UTC+2)", iana: "Europe/Bucharest" },
  { label: "MSK (UTC+3)", iana: "Europe/Moscow" },
  { label: "GST (UTC+4)", iana: "Asia/Dubai" },
  { label: "IST (UTC+5:30)", iana: "Asia/Kolkata" },
  { label: "ICT (UTC+7)", iana: "Asia/Bangkok" },
  { label: "CST China (UTC+8)", iana: "Asia/Shanghai" },
  { label: "JST (UTC+9)", iana: "Asia/Tokyo" },
  { label: "KST (UTC+9)", iana: "Asia/Seoul" },
  { label: "AEST (UTC+10)", iana: "Australia/Sydney" },
  { label: "NZST (UTC+12)", iana: "Pacific/Auckland" },
];

function formatInTimezone(date: Date, iana: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: iana,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

function toDatetimeLocal(date: Date, iana: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: iana,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

export function TimezoneConverterTool() {
  const [sourceTz, setSourceTz] = useState("America/New_York");
  const [targetTz, setTargetTz] = useState("Europe/London");
  const [datetime, setDatetime] = useState("");

  const handleNow = () => {
    const now = new Date();
    setDatetime(toDatetimeLocal(now, sourceTz));
  };

  const converted = useMemo(() => {
    if (!datetime) return null;

    // Parse the datetime as if it's in the source timezone
    // Create a date from the input and figure out the offset
    const [datePart, timePart] = datetime.split("T");
    if (!datePart || !timePart) return null;

    const [y, m, d] = datePart.split("-").map(Number);
    const [h, min] = timePart.split(":").map(Number);

    // Build a UTC date and then adjust
    const utcGuess = new Date(Date.UTC(y, m - 1, d, h, min));

    // Find what the source timezone shows for this UTC time
    const sourceFormatted = toDatetimeLocal(utcGuess, sourceTz);
    const [sd, st] = sourceFormatted.split("T");
    const [sy, sm, sday] = sd.split("-").map(Number);
    const [sh, smin] = st.split(":").map(Number);

    // The difference between what we entered and what the tz shows = the offset
    const enteredMin = h * 60 + min;
    const shownMin = sh * 60 + smin;
    let diffMin = enteredMin - shownMin;

    // Also handle date differences
    const enteredDayVal = new Date(y, m - 1, d).getTime();
    const shownDayVal = new Date(sy, sm - 1, sday).getTime();
    const dayDiffMs = enteredDayVal - shownDayVal;
    diffMin += dayDiffMs / 60000;

    // Adjust UTC guess
    const corrected = new Date(utcGuess.getTime() + diffMin * 60000);

    return formatInTimezone(corrected, targetTz);
  }, [datetime, sourceTz, targetTz]);

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      <div className="space-y-5">
        {/* Source timezone */}
        <div>
          <label className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
            Source Timezone
          </label>
          <select
            value={sourceTz}
            onChange={(e) => setSourceTz(e.target.value)}
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
          >
            {timezones.map((tz) => (
              <option key={tz.iana} value={tz.iana}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date/time input */}
        <div>
          <label className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
            Date & Time
          </label>
          <div className="flex gap-3">
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="flex-1 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
            <button
              onClick={handleNow}
              className="rounded-lg bg-[color:var(--color-accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[color:var(--color-accent-hover)]"
            >
              Now
            </button>
          </div>
        </div>

        {/* Target timezone */}
        <div>
          <label className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
            Target Timezone
          </label>
          <select
            value={targetTz}
            onChange={(e) => setTargetTz(e.target.value)}
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
          >
            {timezones.map((tz) => (
              <option key={tz.iana} value={tz.iana}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        {/* Result */}
        {converted && (
          <div className="rounded-lg bg-[color:var(--color-accent-light)] px-5 py-4 text-center">
            <p className="text-sm text-[color:var(--color-text-secondary)] mb-1">Converted Time</p>
            <p className="text-lg font-semibold text-[color:var(--color-accent)]">{converted}</p>
          </div>
        )}
      </div>
    </div>
  );
}
