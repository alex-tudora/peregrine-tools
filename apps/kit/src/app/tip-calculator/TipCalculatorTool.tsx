"use client";

import { useState, useMemo } from "react";

const quickTips = [10, 15, 18, 20, 25];

export function TipCalculatorTool() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState("1");

  const result = useMemo(() => {
    const billAmt = parseFloat(bill);
    const ppl = parseInt(people, 10);
    if (isNaN(billAmt) || billAmt < 0 || isNaN(ppl) || ppl < 1) return null;

    const tipAmount = billAmt * (tipPercent / 100);
    const total = billAmt + tipAmount;
    const perPersonTip = tipAmount / ppl;
    const perPersonTotal = total / ppl;

    return { tipAmount, total, perPersonTip, perPersonTotal };
  }, [bill, tipPercent, people]);

  const fmt = (n: number) => n.toFixed(2);

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      <div className="space-y-5">
        {/* Bill amount */}
        <div>
          <label
            htmlFor="bill"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            Bill Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[color:var(--color-text-muted)]">
              $
            </span>
            <input
              id="bill"
              type="number"
              min="0"
              step="0.01"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] pl-7 pr-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
          </div>
        </div>

        {/* Tip percentage */}
        <div>
          <label className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
            Tip: {tipPercent}%
          </label>
          <div className="flex gap-2 mb-3">
            {quickTips.map((pct) => (
              <button
                key={pct}
                onClick={() => setTipPercent(pct)}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  tipPercent === pct
                    ? "bg-[color:var(--color-accent)] text-white"
                    : "border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={tipPercent}
            onChange={(e) => setTipPercent(parseInt(e.target.value, 10))}
            className="w-full accent-[color:var(--color-accent)]"
          />
          <div className="flex justify-between text-xs text-[color:var(--color-text-muted)] mt-1">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Number of people */}
        <div>
          <label
            htmlFor="people"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            Number of People
          </label>
          <input
            id="people"
            type="number"
            min="1"
            step="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
          />
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-[color:var(--color-border)] p-4 text-center">
                <p className="text-xs text-[color:var(--color-text-muted)] mb-1">Tip Amount</p>
                <p className="text-xl font-bold text-[color:var(--color-accent)]">
                  ${fmt(result.tipAmount)}
                </p>
              </div>
              <div className="rounded-lg border border-[color:var(--color-border)] p-4 text-center">
                <p className="text-xs text-[color:var(--color-text-muted)] mb-1">Total</p>
                <p className="text-xl font-bold text-[color:var(--color-text-primary)]">
                  ${fmt(result.total)}
                </p>
              </div>
            </div>

            {parseInt(people, 10) > 1 && (
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-[color:var(--color-accent-light)] p-4 text-center">
                  <p className="text-xs text-[color:var(--color-text-muted)] mb-1">
                    Per Person Tip
                  </p>
                  <p className="text-lg font-semibold text-[color:var(--color-accent)]">
                    ${fmt(result.perPersonTip)}
                  </p>
                </div>
                <div className="rounded-lg bg-[color:var(--color-accent-light)] p-4 text-center">
                  <p className="text-xs text-[color:var(--color-text-muted)] mb-1">
                    Per Person Total
                  </p>
                  <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                    ${fmt(result.perPersonTotal)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
