"use client";

import { useState } from "react";

export function PercentageCalculatorTool() {
  const [tab, setTab] = useState<"of" | "is" | "change">("of");

  // What is X% of Y?
  const [percentOf, setPercentOf] = useState("");
  const [valueOf, setValueOf] = useState("");

  // X is what % of Y?
  const [partIs, setPartIs] = useState("");
  const [wholeIs, setWholeIs] = useState("");

  // % change from X to Y
  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");

  const tabs: { key: "of" | "is" | "change"; label: string }[] = [
    { key: "of", label: "X% of Y" },
    { key: "is", label: "X is what % of Y" },
    { key: "change", label: "% Change" },
  ];

  const calcOf = () => {
    const p = parseFloat(percentOf);
    const v = parseFloat(valueOf);
    if (isNaN(p) || isNaN(v)) return null;
    return (p / 100) * v;
  };

  const calcIs = () => {
    const part = parseFloat(partIs);
    const whole = parseFloat(wholeIs);
    if (isNaN(part) || isNaN(whole) || whole === 0) return null;
    return (part / whole) * 100;
  };

  const calcChange = () => {
    const from = parseFloat(fromVal);
    const to = parseFloat(toVal);
    if (isNaN(from) || isNaN(to) || from === 0) return null;
    return ((to - from) / Math.abs(from)) * 100;
  };

  const resultOf = calcOf();
  const resultIs = calcIs();
  const resultChange = calcChange();

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-[color:var(--color-bg)] p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
              tab === t.key
                ? "bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] shadow-sm"
                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* What is X% of Y? */}
      {tab === "of" && (
        <div className="mt-6 space-y-5">
          <p className="text-sm font-medium text-[color:var(--color-text-secondary)]">
            What is X% of Y?
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[color:var(--color-text-muted)]">What is</span>
            <input
              type="number"
              value={percentOf}
              onChange={(e) => setPercentOf(e.target.value)}
              placeholder="15"
              className="w-28 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
            <span className="text-sm text-[color:var(--color-text-muted)]">% of</span>
            <input
              type="number"
              value={valueOf}
              onChange={(e) => setValueOf(e.target.value)}
              placeholder="200"
              className="w-28 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
            <span className="text-sm text-[color:var(--color-text-muted)]">?</span>
          </div>
          {resultOf !== null && (
            <div className="rounded-lg bg-[color:var(--color-accent-light)] px-4 py-3">
              <span className="text-sm text-[color:var(--color-text-secondary)]">Result: </span>
              <span className="text-lg font-semibold text-[color:var(--color-accent)]">
                {Number.isInteger(resultOf) ? resultOf : resultOf.toFixed(4).replace(/0+$/, "").replace(/\.$/, "")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* X is what % of Y? */}
      {tab === "is" && (
        <div className="mt-6 space-y-5">
          <p className="text-sm font-medium text-[color:var(--color-text-secondary)]">
            X is what % of Y?
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={partIs}
              onChange={(e) => setPartIs(e.target.value)}
              placeholder="30"
              className="w-28 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
            <span className="text-sm text-[color:var(--color-text-muted)]">is what % of</span>
            <input
              type="number"
              value={wholeIs}
              onChange={(e) => setWholeIs(e.target.value)}
              placeholder="200"
              className="w-28 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
            <span className="text-sm text-[color:var(--color-text-muted)]">?</span>
          </div>
          {resultIs !== null && (
            <div className="rounded-lg bg-[color:var(--color-accent-light)] px-4 py-3">
              <span className="text-sm text-[color:var(--color-text-secondary)]">Result: </span>
              <span className="text-lg font-semibold text-[color:var(--color-accent)]">
                {Number.isInteger(resultIs) ? resultIs : resultIs.toFixed(4).replace(/0+$/, "").replace(/\.$/, "")}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* % change from X to Y */}
      {tab === "change" && (
        <div className="mt-6 space-y-5">
          <p className="text-sm font-medium text-[color:var(--color-text-secondary)]">
            Percentage change from X to Y
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[color:var(--color-text-muted)]">From</span>
            <input
              type="number"
              value={fromVal}
              onChange={(e) => setFromVal(e.target.value)}
              placeholder="50"
              className="w-28 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
            <span className="text-sm text-[color:var(--color-text-muted)]">to</span>
            <input
              type="number"
              value={toVal}
              onChange={(e) => setToVal(e.target.value)}
              placeholder="75"
              className="w-28 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
          </div>
          {resultChange !== null && (
            <div className="rounded-lg bg-[color:var(--color-accent-light)] px-4 py-3">
              <span className="text-sm text-[color:var(--color-text-secondary)]">Change: </span>
              <span
                className={`text-lg font-semibold ${
                  resultChange >= 0 ? "text-[color:var(--color-success)]" : "text-[color:var(--color-error)]"
                }`}
              >
                {resultChange >= 0 ? "+" : ""}
                {Number.isInteger(resultChange) ? resultChange : resultChange.toFixed(2)}%
              </span>
              <span className="ml-2 text-sm text-[color:var(--color-text-muted)]">
                ({resultChange >= 0 ? "increase" : "decrease"})
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
