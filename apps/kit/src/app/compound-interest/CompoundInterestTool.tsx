"use client";

import { useState, useMemo } from "react";

type Frequency = "annually" | "semi-annually" | "quarterly" | "monthly" | "daily";

const frequencies: { key: Frequency; label: string; n: number }[] = [
  { key: "annually", label: "Annually", n: 1 },
  { key: "semi-annually", label: "Semi-annually", n: 2 },
  { key: "quarterly", label: "Quarterly", n: 4 },
  { key: "monthly", label: "Monthly", n: 12 },
  { key: "daily", label: "Daily", n: 365 },
];

interface YearRow {
  year: number;
  balance: number;
  interest: number;
  contributions: number;
}

export function CompoundInterestTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [monthlyContrib, setMonthlyContrib] = useState("");

  const result = useMemo(() => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseInt(years, 10);
    const contrib = parseFloat(monthlyContrib) || 0;
    const n = frequencies.find((f) => f.key === frequency)!.n;

    if (isNaN(P) || isNaN(r) || isNaN(t) || P < 0 || r < 0 || t < 1) return null;

    const rows: YearRow[] = [];
    let balance = P;
    let totalContributions = P;
    let totalInterest = 0;

    for (let y = 1; y <= t; y++) {
      let yearInterest = 0;
      // Simulate compounding periods for this year
      for (let period = 0; period < n; period++) {
        const interestThisPeriod = balance * (r / n);
        yearInterest += interestThisPeriod;
        balance += interestThisPeriod;

        // Distribute monthly contributions into compounding periods
        if (n >= 12) {
          // Add contributions proportionally
          const monthsPerPeriod = 12 / n;
          balance += contrib * monthsPerPeriod;
          totalContributions += contrib * monthsPerPeriod;
        }
      }

      // For frequencies less than monthly, add annual contributions separately
      if (n < 12) {
        balance += contrib * 12;
        totalContributions += contrib * 12;
      }

      totalInterest += yearInterest;

      rows.push({
        year: y,
        balance,
        interest: totalInterest,
        contributions: totalContributions,
      });
    }

    return {
      finalAmount: balance,
      totalInterest,
      totalContributions,
      rows,
    };
  }, [principal, rate, years, frequency, monthlyContrib]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      <div className="space-y-5">
        {/* Principal */}
        <div>
          <label
            htmlFor="principal"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            Initial Principal
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-text-muted)]">
              $
            </span>
            <input
              id="principal"
              type="number"
              min="0"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="10,000"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] pl-7 pr-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
          </div>
        </div>

        {/* Rate & Years */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="rate"
              className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
            >
              Annual Rate (%)
            </label>
            <div className="relative">
              <input
                id="rate"
                type="number"
                min="0"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="7"
                className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 pr-8 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-text-muted)]">
                %
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="years"
              className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
            >
              Time (years)
            </label>
            <input
              id="years"
              type="number"
              min="1"
              step="1"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="10"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
          </div>
        </div>

        {/* Compounding frequency */}
        <div>
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            Compounding Frequency
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
          >
            {frequencies.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Monthly contribution */}
        <div>
          <label
            htmlFor="contrib"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            Monthly Contribution (optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-text-muted)]">
              $
            </span>
            <input
              id="contrib"
              type="number"
              min="0"
              value={monthlyContrib}
              onChange={(e) => setMonthlyContrib(e.target.value)}
              placeholder="500"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] pl-7 pr-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4 pt-2">
            <div className="rounded-lg bg-[color:var(--color-accent-light)] px-5 py-4 text-center">
              <p className="text-sm text-[color:var(--color-text-secondary)] mb-1">Final Amount</p>
              <p className="text-3xl font-bold text-[color:var(--color-accent)]">
                ${fmt(result.finalAmount)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
                <p className="text-xs text-[color:var(--color-text-muted)] mb-1">
                  Total Interest Earned
                </p>
                <p className="text-lg font-semibold text-[color:var(--color-success)]">
                  ${fmt(result.totalInterest)}
                </p>
              </div>
              <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
                <p className="text-xs text-[color:var(--color-text-muted)] mb-1">
                  Total Contributions
                </p>
                <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                  ${fmt(result.totalContributions)}
                </p>
              </div>
            </div>

            {/* Year-by-year table */}
            <div>
              <p className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-3">
                Year-by-Year Breakdown
              </p>
              <div className="max-h-64 overflow-y-auto rounded-lg border border-[color:var(--color-border)]">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-[color:var(--color-bg-elevated)]">
                    <tr className="text-left text-xs text-[color:var(--color-text-muted)]">
                      <th className="px-3 py-2 font-medium">Year</th>
                      <th className="px-3 py-2 font-medium text-right">Balance</th>
                      <th className="px-3 py-2 font-medium text-right">Interest</th>
                      <th className="px-3 py-2 font-medium text-right">Contributions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row) => (
                      <tr
                        key={row.year}
                        className="border-t border-[color:var(--color-border)]"
                      >
                        <td className="px-3 py-2 text-[color:var(--color-text-primary)]">
                          {row.year}
                        </td>
                        <td className="px-3 py-2 text-right font-medium text-[color:var(--color-text-primary)]">
                          ${fmt(row.balance)}
                        </td>
                        <td className="px-3 py-2 text-right text-[color:var(--color-success)]">
                          ${fmt(row.interest)}
                        </td>
                        <td className="px-3 py-2 text-right text-[color:var(--color-text-secondary)]">
                          ${fmt(row.contributions)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
