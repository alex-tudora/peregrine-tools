"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { categoriesBySlug } from "@/data/units";
import type { UnitDef } from "@/data/units";

interface UnitConverterToolProps {
  categorySlug: string;
  fromDefault: string;
  toDefault: string;
}

const knightMessages = [
  "The knight calculated this faster than he can run.",
  "Converting... done! Even the knight is impressed.",
  "Math was never the knight's strong suit, but JavaScript handles it.",
  "The knight nods approvingly at your conversion.",
  "Faster than a knight on horseback. Way faster.",
  "The knight once tried to convert leagues to furlongs. It did not go well.",
  "Instant results. The knight wishes jousting were this easy.",
  "Another flawless conversion. The knight tips his visor.",
];

function getRandomMessage() {
  return knightMessages[Math.floor(Math.random() * knightMessages.length)];
}

function convertValue(
  value: number,
  from: UnitDef,
  to: UnitDef,
  customConvert?: (v: number, fromUnit: string, toUnit: string) => number,
): number {
  if (customConvert) return customConvert(value, from.value, to.value);
  // factor-based: value * fromFactor / toFactor
  return (value * from.factor) / to.factor;
}

function formatResult(value: number, precision: number): string {
  // Avoid floating-point noise: if the value is very close to a whole number, round it
  const rounded = parseFloat(value.toFixed(precision));
  // Use toLocaleString for readable output but keep precision
  if (Math.abs(rounded) >= 1e15 || (Math.abs(rounded) < 1e-6 && rounded !== 0)) {
    return rounded.toExponential(precision);
  }
  return rounded.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  });
}

export function UnitConverterTool({ categorySlug, fromDefault, toDefault }: UnitConverterToolProps) {
  const category = categoriesBySlug.get(categorySlug);

  const [fromUnit, setFromUnit] = useState(fromDefault);
  const [toUnit, setToUnit] = useState(toDefault);
  const [fromValue, setFromValue] = useState("1");
  const [knightMsg, setKnightMsg] = useState("");

  // Pick initial knight message on mount
  useEffect(() => {
    setKnightMsg(getRandomMessage());
  }, []);

  const units = category?.units ?? [];
  const precision = categorySlug === "digital" ? 4 : categorySlug === "temperature" ? 2 : 6;

  const fromUnitDef = useMemo(() => units.find((u) => u.value === fromUnit), [units, fromUnit]);
  const toUnitDef = useMemo(() => units.find((u) => u.value === toUnit), [units, toUnit]);

  const result = useMemo(() => {
    const num = parseFloat(fromValue);
    if (isNaN(num) || !fromUnitDef || !toUnitDef) return "";
    const converted = convertValue(num, fromUnitDef, toUnitDef, category?.convert);
    return formatResult(converted, precision);
  }, [fromValue, fromUnitDef, toUnitDef, category?.convert, precision]);

  // Formula display: "1 km = 0.621371 miles"
  const formula = useMemo(() => {
    if (!fromUnitDef || !toUnitDef) return "";
    const converted = convertValue(1, fromUnitDef, toUnitDef, category?.convert);
    return `1 ${fromUnitDef.shortLabel} = ${formatResult(converted, precision)} ${toUnitDef.shortLabel}`;
  }, [fromUnitDef, toUnitDef, category?.convert, precision]);

  const handleSwap = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setKnightMsg(getRandomMessage());
  }, [fromUnit, toUnit]);

  const handleFromValueChange = useCallback((val: string) => {
    // Allow negative, decimals, and empty string
    if (val === "" || val === "-" || /^-?\d*\.?\d*$/.test(val)) {
      setFromValue(val);
    }
  }, []);

  // Quick conversion amounts
  const quickAmounts = useMemo(() => {
    if (categorySlug === "temperature") return [-40, 0, 32, 100, 212];
    if (categorySlug === "digital") return [1, 100, 1024, 10240];
    return [1, 5, 10, 50, 100];
  }, [categorySlug]);

  if (!category) return null;

  const inputClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-lg font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none";

  const selectClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-base font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none appearance-none cursor-pointer";

  const chevronBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

  return (
    <div className="space-y-6">
      {/* Converter card */}
      <div className="space-y-5">
        {/* FROM row */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
            From
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                inputMode="decimal"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                placeholder="Enter value"
                className={inputClass}
                autoFocus
              />
            </div>
            <div className="sm:w-52">
              <select
                value={fromUnit}
                onChange={(e) => {
                  setFromUnit(e.target.value);
                  setKnightMsg(getRandomMessage());
                }}
                className={selectClass}
                style={{ backgroundImage: chevronBg, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
              >
                {units.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label} ({u.shortLabel})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="btn-action w-12 h-12 rounded-full bg-[color:var(--color-accent-light)] border-2 border-[color:var(--color-accent)]/20 flex items-center justify-center shadow-sm transition-all hover:bg-[color:var(--color-accent)] hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
            title="Swap units"
            aria-label="Swap from and to units"
          >
            <svg
              className="w-5 h-5 text-[color:var(--color-accent)] group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </button>
        </div>

        {/* TO row */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
            To
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={result}
                readOnly
                placeholder="Result"
                className={`${inputClass} bg-[color:var(--color-bg-elevated)] cursor-default`}
              />
            </div>
            <div className="sm:w-52">
              <select
                value={toUnit}
                onChange={(e) => {
                  setToUnit(e.target.value);
                  setKnightMsg(getRandomMessage());
                }}
                className={selectClass}
                style={{ backgroundImage: chevronBg, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
              >
                {units.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label} ({u.shortLabel})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Formula display */}
      {formula && (
        <div className="rounded-xl bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-border)] px-5 py-3.5 text-center">
          <p className="font-mono text-base font-semibold text-[color:var(--color-text-primary)]">
            {formula}
          </p>
        </div>
      )}

      {/* Knight personality message */}
      {knightMsg && result && (
        <p className="text-center text-sm text-[color:var(--color-text-muted)] italic">
          {knightMsg}
        </p>
      )}

      {/* Quick conversions */}
      {fromUnitDef && toUnitDef && (
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--color-text-secondary)] mb-3">
            Common conversions
          </h3>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((amount) => {
              const converted = convertValue(amount, fromUnitDef, toUnitDef, category?.convert);
              return (
                <button
                  key={amount}
                  onClick={() => {
                    setFromValue(String(amount));
                    setKnightMsg(getRandomMessage());
                  }}
                  className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] transition-all hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-light)] cursor-pointer"
                >
                  {amount} {fromUnitDef.shortLabel} = {formatResult(converted, Math.min(precision, 4))} {toUnitDef.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
