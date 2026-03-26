"use client";

import { useState, useMemo, useCallback, useEffect } from "react";

type NumberBase = "decimal" | "binary" | "hexadecimal" | "octal" | "roman";

interface NumberConverterToolProps {
  fromBase: NumberBase;
  toBase: NumberBase;
}

const knightMessages = [
  "The knight converted that number faster than counting his gold coins.",
  "Binary, decimal, hex — the knight speaks all number tongues.",
  "Numbers transformed! The knight approves of your base change.",
  "The knight once tried counting in hexadecimal. He ran out of fingers at F.",
  "Converted! Even Roman numerals bow to this knight.",
  "Another number quest completed. The knight salutes.",
  "The knight nods — your number now speaks a new language.",
  "Instant conversion. Faster than the knight can count his arrows.",
  "The knight's abacus could never do this. JavaScript can.",
  "From one base to another — the knight considers this sorcery.",
];

function getRandomMessage() {
  return knightMessages[Math.floor(Math.random() * knightMessages.length)];
}

const BASE_LABELS: Record<NumberBase, string> = {
  decimal: "Decimal (Base 10)",
  binary: "Binary (Base 2)",
  hexadecimal: "Hexadecimal (Base 16)",
  octal: "Octal (Base 8)",
  roman: "Roman Numeral",
};

const BASE_SHORT: Record<NumberBase, string> = {
  decimal: "DEC",
  binary: "BIN",
  hexadecimal: "HEX",
  octal: "OCT",
  roman: "ROM",
};

const ROMAN_VALUES: [string, number][] = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

function toRoman(num: number): string {
  if (num < 1 || num > 3999 || !Number.isInteger(num)) return "N/A";
  let result = "";
  let remaining = num;
  for (const [symbol, value] of ROMAN_VALUES) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

function fromRoman(str: string): number {
  const roman = str.toUpperCase().trim();
  if (!roman || !/^[MDCLXVI]+$/.test(roman)) return NaN;
  const map: Record<string, number> = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1,
  };
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = map[roman[i]];
    const next = map[roman[i + 1]] ?? 0;
    if (current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  if (result < 1 || result > 3999) return NaN;
  // Validate by round-tripping
  if (toRoman(result) !== roman) return NaN;
  return result;
}

function parseInput(input: string, base: NumberBase): number {
  const trimmed = input.trim();
  if (!trimmed) return NaN;

  switch (base) {
    case "decimal": {
      const num = Number(trimmed);
      return Number.isFinite(num) ? num : NaN;
    }
    case "binary": {
      if (!/^[01]+$/.test(trimmed)) return NaN;
      return parseInt(trimmed, 2);
    }
    case "hexadecimal": {
      const clean = trimmed.replace(/^0x/i, "");
      if (!/^[0-9a-fA-F]+$/.test(clean)) return NaN;
      return parseInt(clean, 16);
    }
    case "octal": {
      const clean = trimmed.replace(/^0o/i, "");
      if (!/^[0-7]+$/.test(clean)) return NaN;
      return parseInt(clean, 8);
    }
    case "roman":
      return fromRoman(trimmed);
    default:
      return NaN;
  }
}

function formatForBase(value: number, base: NumberBase): string {
  if (!Number.isFinite(value)) return "";

  switch (base) {
    case "decimal":
      return Number.isInteger(value) ? value.toString() : value.toLocaleString("en-US");
    case "binary":
      return Number.isInteger(value) ? value.toString(2) : "N/A (integers only)";
    case "hexadecimal":
      return Number.isInteger(value)
        ? value.toString(16).toUpperCase()
        : "N/A (integers only)";
    case "octal":
      return Number.isInteger(value) ? value.toString(8) : "N/A (integers only)";
    case "roman":
      return Number.isInteger(value) ? toRoman(value) : "N/A";
    default:
      return "";
  }
}

function toScientific(value: number): string {
  if (!Number.isFinite(value)) return "";
  if (value === 0) return "0";
  return value.toExponential(6);
}

export function NumberConverterTool({ fromBase, toBase }: NumberConverterToolProps) {
  const [input, setInput] = useState("");
  const [selectedBase, setSelectedBase] = useState<NumberBase>(fromBase);
  const [knightMsg, setKnightMsg] = useState("");

  useEffect(() => {
    setKnightMsg(getRandomMessage());
  }, []);

  const decimalValue = useMemo(() => parseInput(input, selectedBase), [input, selectedBase]);

  const results = useMemo(() => {
    if (!Number.isFinite(decimalValue)) return null;

    return {
      decimal: formatForBase(decimalValue, "decimal"),
      binary: formatForBase(decimalValue, "binary"),
      hexadecimal: formatForBase(decimalValue, "hexadecimal"),
      octal: formatForBase(decimalValue, "octal"),
      roman: formatForBase(decimalValue, "roman"),
      scientific: toScientific(decimalValue),
    };
  }, [decimalValue]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    setKnightMsg(getRandomMessage());
  }, []);

  const handleBaseChange = useCallback((base: NumberBase) => {
    setSelectedBase(base);
    setInput("");
    setKnightMsg(getRandomMessage());
  }, []);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = useCallback(async (value: string, field: string) => {
    if (!value || value === "N/A" || value === "N/A (integers only)") return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, []);

  const inputClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-lg font-mono font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none";

  const selectClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-base font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none appearance-none cursor-pointer";

  const chevronBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

  const bases: NumberBase[] = ["decimal", "binary", "hexadecimal", "octal", "roman"];

  const resultRows: { label: string; key: string; value: string }[] = results
    ? [
        { label: "Decimal (Base 10)", key: "decimal", value: results.decimal },
        { label: "Binary (Base 2)", key: "binary", value: results.binary },
        { label: "Hexadecimal (Base 16)", key: "hexadecimal", value: results.hexadecimal },
        { label: "Octal (Base 8)", key: "octal", value: results.octal },
        { label: "Roman Numeral", key: "roman", value: results.roman },
        { label: "Scientific Notation", key: "scientific", value: results.scientific },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Input section */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-2">
          Input
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                selectedBase === "roman"
                  ? "Enter a Roman numeral (e.g. XLII)"
                  : selectedBase === "binary"
                    ? "Enter a binary number (e.g. 101010)"
                    : selectedBase === "hexadecimal"
                      ? "Enter a hex value (e.g. 2A)"
                      : selectedBase === "octal"
                        ? "Enter an octal number (e.g. 52)"
                        : "Enter a decimal number (e.g. 42)"
              }
              className={inputClass}
              autoFocus
            />
          </div>
          <div className="sm:w-56">
            <select
              value={selectedBase}
              onChange={(e) => handleBaseChange(e.target.value as NumberBase)}
              className={selectClass}
              style={{
                backgroundImage: chevronBg,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
              }}
            >
              {bases.map((base) => (
                <option key={base} value={base}>
                  {BASE_LABELS[base]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Input validation hint */}
      {input && !Number.isFinite(decimalValue) && (
        <div className="rounded-xl border border-red-200 bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]">
          <span className="mr-2 font-semibold">Invalid input:</span>
          {selectedBase === "roman"
            ? "Enter a valid Roman numeral (I to MMMCMXCIX)."
            : `Enter a valid ${selectedBase} number.`}
        </div>
      )}

      {/* Results — all bases */}
      {results && (
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-3">
            Results
          </label>
          <div className="space-y-2">
            {resultRows.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-5 py-3.5 transition-all hover:border-[color:var(--color-border-hover)]"
              >
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider">
                    {row.label}
                  </span>
                  <span className="block font-mono text-base font-semibold text-[color:var(--color-text-primary)] break-all">
                    {row.value || "—"}
                  </span>
                </div>
                {row.value && row.value !== "N/A" && row.value !== "N/A (integers only)" && (
                  <button
                    onClick={() => handleCopy(row.value, row.key)}
                    className="ml-3 shrink-0 rounded-md px-2.5 py-1 text-xs font-medium text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent-light)] cursor-pointer"
                  >
                    {copiedField === row.key ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Knight personality message */}
      {knightMsg && results && (
        <p className="text-center text-sm text-[color:var(--color-text-muted)] italic">
          {knightMsg}
        </p>
      )}
    </div>
  );
}
