"use client";

import { useState, useMemo } from "react";

type Period = "hourly" | "daily" | "weekly" | "biweekly" | "monthly" | "annually";

const periods: { key: Period; label: string }[] = [
  { key: "hourly", label: "Hourly" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "biweekly", label: "Bi-weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "annually", label: "Annually" },
];

// Constants: 40 hrs/week, 52 weeks/year, 260 work days/year
const HOURS_PER_WEEK = 40;
const WEEKS_PER_YEAR = 52;
const WORK_DAYS_PER_YEAR = 260;
const HOURS_PER_YEAR = HOURS_PER_WEEK * WEEKS_PER_YEAR; // 2080
const MONTHS_PER_YEAR = 12;
const BIWEEKLY_PER_YEAR = 26;
const HOURS_PER_DAY = HOURS_PER_YEAR / WORK_DAYS_PER_YEAR; // 8

function toAnnual(amount: number, period: Period): number {
  switch (period) {
    case "hourly":
      return amount * HOURS_PER_YEAR;
    case "daily":
      return amount * WORK_DAYS_PER_YEAR;
    case "weekly":
      return amount * WEEKS_PER_YEAR;
    case "biweekly":
      return amount * BIWEEKLY_PER_YEAR;
    case "monthly":
      return amount * MONTHS_PER_YEAR;
    case "annually":
      return amount;
  }
}

function fromAnnual(annual: number): Record<Period, number> {
  return {
    hourly: annual / HOURS_PER_YEAR,
    daily: annual / WORK_DAYS_PER_YEAR,
    weekly: annual / WEEKS_PER_YEAR,
    biweekly: annual / BIWEEKLY_PER_YEAR,
    monthly: annual / MONTHS_PER_YEAR,
    annually: annual,
  };
}

export function SalaryCalculatorTool() {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState<Period>("annually");

  const conversions = useMemo(() => {
    const num = parseFloat(amount);
    if (isNaN(num) || num < 0) return null;
    const annual = toAnnual(num, period);
    return fromAnnual(annual);
  }, [amount, period]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      <div className="space-y-5">
        {/* Input */}
        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            Salary Amount
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-text-muted)]">
                $
              </span>
              <input
                id="salary"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="75,000"
                className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] pl-7 pr-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
              />
            </div>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
              className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            >
              {periods.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Assumptions note */}
        <p className="text-xs text-[color:var(--color-text-muted)]">
          Based on 40 hours/week, 52 weeks/year, 260 work days/year.
        </p>

        {/* Results */}
        {conversions && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {periods.map((p) => {
              const isInput = p.key === period;
              return (
                <div
                  key={p.key}
                  className={`rounded-lg p-4 text-center ${
                    isInput
                      ? "bg-[color:var(--color-accent-light)] border border-[color:var(--color-accent)]"
                      : "border border-[color:var(--color-border)]"
                  }`}
                >
                  <p className="text-xs text-[color:var(--color-text-muted)] mb-1">{p.label}</p>
                  <p
                    className={`text-lg font-semibold ${
                      isInput
                        ? "text-[color:var(--color-accent)]"
                        : "text-[color:var(--color-text-primary)]"
                    }`}
                  >
                    ${fmt(conversions[p.key])}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
