"use client";

import { useState, useMemo } from "react";

type DownPaymentType = "dollar" | "percent";

export function MortgageCalculatorTool() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [downPaymentType, setDownPaymentType] = useState<DownPaymentType>("percent");
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState("");

  const result = useMemo(() => {
    const price = parseFloat(homePrice);
    const dp = parseFloat(downPayment);
    const rate = parseFloat(interestRate);

    if (isNaN(price) || isNaN(rate) || price <= 0 || rate < 0) return null;

    let downPaymentAmt = 0;
    if (!isNaN(dp) && dp > 0) {
      downPaymentAmt = downPaymentType === "percent" ? (dp / 100) * price : dp;
    }

    const principal = price - downPaymentAmt;
    if (principal <= 0) return null;

    const n = loanTerm * 12;

    if (rate === 0) {
      const monthlyPayment = principal / n;
      return {
        monthlyPayment,
        totalInterest: 0,
        totalCost: principal,
        principal,
        downPaymentAmt,
      };
    }

    const r = rate / 100 / 12;
    const monthlyPayment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalCost = monthlyPayment * n;
    const totalInterest = totalCost - principal;

    return { monthlyPayment, totalInterest, totalCost, principal, downPaymentAmt };
  }, [homePrice, downPayment, downPaymentType, loanTerm, interestRate]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const principalPct =
    result && result.totalCost > 0
      ? (result.principal / result.totalCost) * 100
      : 100;

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      <div className="space-y-5">
        {/* Home Price */}
        <div>
          <label
            htmlFor="home-price"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            Home Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-text-muted)]">
              $
            </span>
            <input
              id="home-price"
              type="number"
              min="0"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              placeholder="350,000"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] pl-7 pr-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
            Down Payment
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-text-muted)]">
                {downPaymentType === "dollar" ? "$" : ""}
              </span>
              <input
                type="number"
                min="0"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder={downPaymentType === "percent" ? "20" : "70000"}
                className={`w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] ${
                  downPaymentType === "dollar" ? "pl-7" : "pl-3"
                } pr-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]`}
              />
              {downPaymentType === "percent" && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-text-muted)]">
                  %
                </span>
              )}
            </div>
            <div className="flex gap-1 rounded-lg bg-[color:var(--color-bg)] p-1">
              <button
                onClick={() => setDownPaymentType("percent")}
                className={`rounded-md px-3 py-2 text-xs font-medium transition-all ${
                  downPaymentType === "percent"
                    ? "bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] shadow-sm"
                    : "text-[color:var(--color-text-muted)]"
                }`}
              >
                %
              </button>
              <button
                onClick={() => setDownPaymentType("dollar")}
                className={`rounded-md px-3 py-2 text-xs font-medium transition-all ${
                  downPaymentType === "dollar"
                    ? "bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] shadow-sm"
                    : "text-[color:var(--color-text-muted)]"
                }`}
              >
                $
              </button>
            </div>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
            Loan Term
          </label>
          <div className="flex gap-2">
            {[15, 20, 30].map((term) => (
              <button
                key={term}
                onClick={() => setLoanTerm(term)}
                className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
                  loanTerm === term
                    ? "bg-[color:var(--color-accent)] text-white"
                    : "border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
                }`}
              >
                {term} years
              </button>
            ))}
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label
            htmlFor="interest-rate"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            Interest Rate (%)
          </label>
          <div className="relative">
            <input
              id="interest-rate"
              type="number"
              min="0"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="6.5"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 pr-8 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-text-muted)]">
              %
            </span>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4 pt-2">
            {/* Monthly payment - hero */}
            <div className="rounded-lg bg-[color:var(--color-accent-light)] px-5 py-4 text-center">
              <p className="text-sm text-[color:var(--color-text-secondary)] mb-1">
                Monthly Payment
              </p>
              <p className="text-3xl font-bold text-[color:var(--color-accent)]">
                ${fmt(result.monthlyPayment)}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
                <p className="text-xs text-[color:var(--color-text-muted)] mb-1">
                  Loan Amount
                </p>
                <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                  ${fmt(result.principal)}
                </p>
              </div>
              <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
                <p className="text-xs text-[color:var(--color-text-muted)] mb-1">
                  Down Payment
                </p>
                <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                  ${fmt(result.downPaymentAmt)}
                </p>
              </div>
              <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
                <p className="text-xs text-[color:var(--color-text-muted)] mb-1">
                  Total Interest
                </p>
                <p className="text-lg font-semibold text-[color:var(--color-error)]">
                  ${fmt(result.totalInterest)}
                </p>
              </div>
              <div className="rounded-lg border border-[color:var(--color-border)] p-3 text-center">
                <p className="text-xs text-[color:var(--color-text-muted)] mb-1">Total Cost</p>
                <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                  ${fmt(result.totalCost)}
                </p>
              </div>
            </div>

            {/* Principal vs Interest bar */}
            <div>
              <p className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
                Principal vs Interest
              </p>
              <div className="flex h-6 rounded-full overflow-hidden">
                <div
                  className="bg-[color:var(--color-accent)] transition-all duration-300"
                  style={{ width: `${principalPct}%` }}
                />
                <div
                  className="bg-[color:var(--color-error)] transition-all duration-300"
                  style={{ width: `${100 - principalPct}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-xs text-[color:var(--color-text-muted)]">
                <span>Principal ({principalPct.toFixed(1)}%)</span>
                <span>Interest ({(100 - principalPct).toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
