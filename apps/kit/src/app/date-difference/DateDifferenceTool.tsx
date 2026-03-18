"use client";

import { useState, useMemo } from "react";

function dateDiff(start: Date, end: Date, includeEnd: boolean) {
  let a = start;
  let b = end;
  if (a > b) {
    a = end;
    b = start;
  }

  const adjustedEnd = includeEnd ? new Date(b.getTime() + 86400000) : b;

  let years = adjustedEnd.getFullYear() - a.getFullYear();
  let months = adjustedEnd.getMonth() - a.getMonth();
  let days = adjustedEnd.getDate() - a.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(adjustedEnd.getFullYear(), adjustedEnd.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = adjustedEnd.getTime() - a.getTime();
  const totalDays = Math.floor(diffMs / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;

  return { years, months, days, totalDays, totalWeeks, totalHours };
}

export function DateDifferenceTool() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeEnd, setIncludeEnd] = useState(false);

  const result = useMemo(() => {
    if (!startDate || !endDate) return null;
    const s = new Date(startDate + "T00:00:00");
    const e = new Date(endDate + "T00:00:00");
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
    return dateDiff(s, e, includeEnd);
  }, [startDate, endDate, includeEnd]);

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
          />
        </div>
        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
          />
        </div>
      </div>

      {/* Include end date toggle */}
      <label className="mt-4 flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={includeEnd}
          onChange={(e) => setIncludeEnd(e.target.checked)}
          className="h-4 w-4 rounded border-[color:var(--color-border)] accent-[color:var(--color-accent)]"
        />
        <span className="text-sm text-[color:var(--color-text-secondary)]">
          Include end date
        </span>
      </label>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Main result */}
          <div className="rounded-lg bg-[color:var(--color-accent-light)] px-5 py-4 text-center">
            <p className="text-sm text-[color:var(--color-text-secondary)] mb-1">Difference</p>
            <p className="text-2xl font-bold text-[color:var(--color-accent)]">
              {result.years > 0 && <>{result.years} year{result.years !== 1 ? "s" : ""}, </>}
              {result.months > 0 && <>{result.months} month{result.months !== 1 ? "s" : ""}, </>}
              {result.days} day{result.days !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
              <p className="text-xs text-[color:var(--color-text-muted)] mb-1">Total Days</p>
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                {result.totalDays.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
              <p className="text-xs text-[color:var(--color-text-muted)] mb-1">Total Weeks</p>
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                {result.totalWeeks.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
              <p className="text-xs text-[color:var(--color-text-muted)] mb-1">Total Hours</p>
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                {result.totalHours.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
