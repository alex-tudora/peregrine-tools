"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

function getRelativeTime(date: Date): string {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const absDiff = Math.abs(diffMs);
  const isFuture = diffMs < 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let label: string;
  if (seconds < 60) label = `${seconds} second${seconds !== 1 ? "s" : ""}`;
  else if (minutes < 60) label = `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  else if (hours < 24) label = `${hours} hour${hours !== 1 ? "s" : ""}`;
  else if (days < 30) label = `${days} day${days !== 1 ? "s" : ""}`;
  else if (months < 12) label = `${months} month${months !== 1 ? "s" : ""}`;
  else label = `${years} year${years !== 1 ? "s" : ""}`;

  return isFuture ? `in ${label}` : `${label} ago`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-amber-400 hover:text-amber-600"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function OutputRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-2">
        <code className="text-sm font-mono text-slate-800">{value}</code>
        <CopyButton text={value} />
      </div>
    </div>
  );
}

export function TimestampConverterTool() {
  const [timestampInput, setTimestampInput] = useState("");
  const [useMs, setUseMs] = useState(false);
  const [currentTs, setCurrentTs] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [dateInput, setDateInput] = useState("");

  // Live clock
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setCurrentTs(useMs ? Date.now() : Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isLive, useMs]);

  const handleCurrentTimestamp = useCallback(() => {
    const ts = useMs ? Date.now() : Math.floor(Date.now() / 1000);
    setCurrentTs(ts);
    setTimestampInput(String(ts));
    setIsLive(true);
  }, [useMs]);

  // Convert timestamp to date
  const dateFromTimestamp = useMemo(() => {
    const input = timestampInput.trim();
    if (!input) return null;
    const num = parseInt(input);
    if (isNaN(num)) return null;
    // Auto-detect ms vs seconds: if > 10 digits, likely ms
    const ms = input.length > 10 || useMs ? num : num * 1000;
    const date = new Date(ms);
    if (isNaN(date.getTime())) return null;
    return date;
  }, [timestampInput, useMs]);

  // Convert date to timestamp
  const timestampFromDate = useMemo(() => {
    if (!dateInput) return null;
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return null;
    return useMs ? date.getTime() : Math.floor(date.getTime() / 1000);
  }, [dateInput, useMs]);

  return (
    <div className="space-y-8">
      {/* Current timestamp */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
        <button
          onClick={handleCurrentTimestamp}
          className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
        >
          Current Timestamp
        </button>
        {currentTs !== null && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <code className="text-2xl font-mono font-bold text-amber-800">{currentTs}</code>
            <CopyButton text={String(currentTs)} />
          </div>
        )}
        {isLive && (
          <p className="mt-1 text-xs text-amber-600">Updating live every second</p>
        )}
      </div>

      {/* Toggle ms/s */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-600">Unit:</label>
        <div className="flex rounded-lg border border-slate-200 overflow-hidden">
          <button
            onClick={() => setUseMs(false)}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              !useMs ? "bg-amber-500 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Seconds
          </button>
          <button
            onClick={() => setUseMs(true)}
            className={`px-4 py-2 text-xs font-medium transition-colors ${
              useMs ? "bg-amber-500 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Milliseconds
          </button>
        </div>
      </div>

      {/* Timestamp to Date */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Timestamp to Date
        </h2>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">
            Unix Timestamp ({useMs ? "milliseconds" : "seconds"})
          </label>
          <input
            type="text"
            value={timestampInput}
            onChange={(e) => {
              setTimestampInput(e.target.value);
              setIsLive(false);
            }}
            placeholder={useMs ? "1700000000000" : "1700000000"}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono text-slate-700 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {dateFromTimestamp && (
          <div className="space-y-2">
            <OutputRow
              label="UTC"
              value={dateFromTimestamp.toUTCString()}
            />
            <OutputRow
              label="Local"
              value={dateFromTimestamp.toLocaleString()}
            />
            <OutputRow
              label="ISO 8601"
              value={dateFromTimestamp.toISOString()}
            />
            <OutputRow
              label="Relative"
              value={getRelativeTime(dateFromTimestamp)}
            />
          </div>
        )}
        {timestampInput.trim() && !dateFromTimestamp && (
          <p className="text-sm text-red-500">Invalid timestamp</p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200" />

      {/* Date to Timestamp */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Date to Timestamp
        </h2>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Date & Time</label>
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {timestampFromDate !== null && (
          <OutputRow
            label={useMs ? "Timestamp (ms)" : "Timestamp (s)"}
            value={String(timestampFromDate)}
          />
        )}
      </div>
    </div>
  );
}
