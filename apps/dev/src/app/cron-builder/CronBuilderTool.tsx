"use client";

import { useState, useMemo, useCallback } from "react";

const MONTHS = ["*", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["*", "0", "1", "2", "3", "4", "5", "6"];
const DOW_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MINUTES = ["*", "0", "5", "10", "15", "20", "30", "45", "*/5", "*/10", "*/15", "*/30"];
const HOURS = ["*", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "*/2", "*/4", "*/6", "*/12"];
const DAYS = ["*", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "*/2"];

function describeCron(parts: string[]): string {
  if (parts.length !== 5) return "Invalid cron expression";
  const [min, hour, dom, month, dow] = parts;

  const pieces: string[] = [];

  // Minute
  if (min === "*") pieces.push("Every minute");
  else if (min.startsWith("*/")) pieces.push(`Every ${min.slice(2)} minutes`);
  else pieces.push(`At minute ${min}`);

  // Hour
  if (hour === "*") {
    if (!min.startsWith("*/") && min !== "*") pieces.push("of every hour");
  } else if (hour.startsWith("*/")) {
    pieces.push(`past every ${hour.slice(2)} hours`);
  } else {
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    pieces.push(`past ${h12}:00 ${ampm}`);
  }

  // Day of month
  if (dom !== "*") {
    if (dom.startsWith("*/")) pieces.push(`every ${dom.slice(2)} days`);
    else pieces.push(`on day ${dom} of the month`);
  }

  // Month
  if (month !== "*") {
    if (month.includes(",")) {
      const names = month.split(",").map(m => MONTH_NAMES[parseInt(m)] || m);
      pieces.push(`in ${names.join(", ")}`);
    } else {
      pieces.push(`in ${MONTH_NAMES[parseInt(month)] || month}`);
    }
  }

  // Day of week
  if (dow !== "*") {
    if (dow.includes(",")) {
      const names = dow.split(",").map(d => DOW_NAMES[parseInt(d)] || d);
      pieces.push(`on ${names.join(", ")}`);
    } else {
      pieces.push(`on ${DOW_NAMES[parseInt(dow)] || dow}`);
    }
  }

  return pieces.join(" ");
}

function matchesCronField(value: number, field: string, max: number): boolean {
  if (field === "*") return true;
  const parts = field.split(",");
  for (const part of parts) {
    if (part.includes("/")) {
      const [range, stepStr] = part.split("/");
      const step = parseInt(stepStr);
      if (isNaN(step) || step <= 0) continue;
      if (range === "*" || range === "") {
        if (value % step === 0) return true;
      } else if (range.includes("-")) {
        const [start, end] = range.split("-").map(Number);
        if (value >= start && value <= end && (value - start) % step === 0) return true;
      }
    } else if (part.includes("-")) {
      const [start, end] = part.split("-").map(Number);
      if (value >= start && value <= end) return true;
    } else {
      if (parseInt(part) === value) return true;
    }
  }
  return false;
}

function getNextExecutions(expression: string, count: number): Date[] {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  const [minField, hourField, domField, monthField, dowField] = parts;

  const results: Date[] = [];
  const now = new Date();
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0);

  const maxIterations = 525960; // ~1 year in minutes
  for (let i = 0; i < maxIterations && results.length < count; i++) {
    const m = cursor.getMinutes();
    const h = cursor.getHours();
    const dom = cursor.getDate();
    const month = cursor.getMonth() + 1;
    const dow = cursor.getDay();

    if (
      matchesCronField(m, minField, 59) &&
      matchesCronField(h, hourField, 23) &&
      matchesCronField(dom, domField, 31) &&
      matchesCronField(month, monthField, 12) &&
      matchesCronField(dow, dowField, 6)
    ) {
      results.push(new Date(cursor));
    }
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  return results;
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
      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-amber-400 hover:text-amber-600"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function CronBuilderTool() {
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("3");
  const [dom, setDom] = useState("*");
  const [month, setMonth] = useState("*");
  const [dow, setDow] = useState("*");
  const [manualInput, setManualInput] = useState("");

  const expression = manualInput || `${minute} ${hour} ${dom} ${month} ${dow}`;
  const parts = expression.trim().split(/\s+/);

  const description = useMemo(() => describeCron(parts), [expression]);
  const nextRuns = useMemo(() => getNextExecutions(expression, 5), [expression]);

  const handleManualChange = useCallback((value: string) => {
    setManualInput(value);
    const p = value.trim().split(/\s+/);
    if (p.length === 5) {
      setMinute(p[0]);
      setHour(p[1]);
      setDom(p[2]);
      setMonth(p[3]);
      setDow(p[4]);
    }
  }, []);

  const handleDropdownChange = useCallback(
    (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(e.target.value);
      setManualInput("");
    },
    []
  );

  const selectClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";

  return (
    <div className="space-y-6">
      {/* Dropdowns */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Minute</label>
          <select value={minute} onChange={handleDropdownChange(setMinute)} className={selectClass}>
            {MINUTES.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Hour</label>
          <select value={hour} onChange={handleDropdownChange(setHour)} className={selectClass}>
            {HOURS.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Day (Month)</label>
          <select value={dom} onChange={handleDropdownChange(setDom)} className={selectClass}>
            {DAYS.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Month</label>
          <select value={month} onChange={handleDropdownChange(setMonth)} className={selectClass}>
            {MONTHS.map((v) => (
              <option key={v} value={v}>{v === "*" ? "*" : `${v} - ${MONTH_NAMES[parseInt(v)]}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Day (Week)</label>
          <select value={dow} onChange={handleDropdownChange(setDow)} className={selectClass}>
            {DOW.map((v) => (
              <option key={v} value={v}>{v === "*" ? "*" : `${v} - ${DOW_NAMES[parseInt(v)]}`}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Generated expression */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="block text-xs font-medium text-slate-500 mb-2">Cron Expression</label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={manualInput || expression}
            onChange={(e) => handleManualChange(e.target.value)}
            placeholder="* * * * *"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-lg text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <CopyButton text={expression} />
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-medium text-slate-500 mb-1">Human-Readable</p>
        <p className="text-base text-slate-800 font-medium">{description}</p>
      </div>

      {/* Next executions */}
      {nextRuns.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500 mb-3">Next 5 Execution Times</p>
          <ul className="space-y-2">
            {nextRuns.map((date, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="font-mono text-slate-700">
                  {date.toLocaleString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
