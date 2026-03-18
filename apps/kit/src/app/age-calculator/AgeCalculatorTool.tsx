"use client";

import { useState, useMemo } from "react";

function calcAge(dob: Date, today: Date) {
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = today.getTime() - dob.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  // Next birthday
  let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday.getTime() < today.getTime()) {
    nextBirthday = new Date(today.getFullYear() + 1, dob.getMonth(), dob.getDate());
  }
  const daysUntilBirthday = Math.ceil(
    (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalMonths, totalWeeks, totalDays, daysUntilBirthday };
}

export function AgeCalculatorTool() {
  const [dob, setDob] = useState("");

  const result = useMemo(() => {
    if (!dob) return null;
    const dobDate = new Date(dob + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(dobDate.getTime()) || dobDate > today) return null;
    return calcAge(dobDate, today);
  }, [dob]);

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      <div>
        <label
          htmlFor="dob"
          className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
        >
          Date of Birth
        </label>
        <input
          id="dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
        />
      </div>

      {result && (
        <div className="mt-6 space-y-5">
          {/* Main age */}
          <div className="rounded-lg bg-[color:var(--color-accent-light)] px-5 py-4 text-center">
            <p className="text-sm text-[color:var(--color-text-secondary)] mb-1">Your Age</p>
            <p className="text-2xl font-bold text-[color:var(--color-accent)]">
              {result.years} years, {result.months} months, {result.days} days
            </p>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
              <p className="text-xs text-[color:var(--color-text-muted)] mb-1">Total Months</p>
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                {result.totalMonths.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
              <p className="text-xs text-[color:var(--color-text-muted)] mb-1">Total Weeks</p>
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                {result.totalWeeks.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
              <p className="text-xs text-[color:var(--color-text-muted)] mb-1">Total Days</p>
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                {result.totalDays.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Next birthday */}
          <div className="rounded-lg border border-[color:var(--color-border)] p-4 text-center">
            <p className="text-sm text-[color:var(--color-text-secondary)] mb-1">
              Next Birthday
            </p>
            {result.daysUntilBirthday === 0 ? (
              <p className="text-lg font-semibold text-[color:var(--color-accent)]">
                Happy Birthday!
              </p>
            ) : (
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                {result.daysUntilBirthday} day{result.daysUntilBirthday !== 1 ? "s" : ""} away
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
