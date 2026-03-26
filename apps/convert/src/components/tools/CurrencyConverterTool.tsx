"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";

interface CurrencyConverterToolProps {
  fromDefault: string;
  toDefault: string;
}

interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

const CURRENCIES: { code: string; name: string; symbol: string }[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "\u20AC" },
  { code: "GBP", name: "British Pound", symbol: "\u00A3" },
  { code: "JPY", name: "Japanese Yen", symbol: "\u00A5" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "\u00A5" },
  { code: "INR", name: "Indian Rupee", symbol: "\u20B9" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "KRW", name: "South Korean Won", symbol: "\u20A9" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "TRY", name: "Turkish Lira", symbol: "\u20BA" },
  { code: "RUB", name: "Russian Ruble", symbol: "\u20BD" },
  { code: "PLN", name: "Polish Zloty", symbol: "z\u0142" },
  { code: "THB", name: "Thai Baht", symbol: "\u0E3F" },
  { code: "TWD", name: "Taiwan Dollar", symbol: "NT$" },
  { code: "CZK", name: "Czech Koruna", symbol: "K\u010D" },
  { code: "ILS", name: "Israeli Shekel", symbol: "\u20AA" },
  { code: "PHP", name: "Philippine Peso", symbol: "\u20B1" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "AED", name: "UAE Dirham", symbol: "AED" },
];

const knightMessages = [
  "The knight knows nothing about economics, but the API does.",
  "Exchange rates change daily. The knight's jousting skills don't improve at all.",
  "Converted! The knight would charge you a fee, but he's too honorable.",
];

function getRandomMessage() {
  return knightMessages[Math.floor(Math.random() * knightMessages.length)];
}

function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(4);
  }
  // Use more decimals for very small rates, fewer for large ones
  const decimals = Math.abs(value) < 1 ? 6 : Math.abs(value) < 100 ? 4 : 2;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });
}

export function CurrencyConverterTool({ fromDefault, toDefault }: CurrencyConverterToolProps) {
  const [fromCurrency, setFromCurrency] = useState(fromDefault);
  const [toCurrency, setToCurrency] = useState(toDefault);
  const [fromValue, setFromValue] = useState("1");
  const [knightMsg, setKnightMsg] = useState("");
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  // Pick initial knight message on mount
  useEffect(() => {
    setKnightMsg(getRandomMessage());
  }, []);

  // Fetch exchange rates once per session
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    async function fetchRates() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        const data: ExchangeRates = await response.json();
        setRates(data);
      } catch {
        setError("Could not load exchange rates. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  const convert = useCallback(
    (amount: number, from: string, to: string): number | null => {
      if (!rates) return null;
      // All rates are relative to USD
      const fromRate = from === "USD" ? 1 : rates.rates[from];
      const toRate = to === "USD" ? 1 : rates.rates[to];
      if (!fromRate || !toRate) return null;
      return (amount / fromRate) * toRate;
    },
    [rates],
  );

  const result = useMemo(() => {
    const num = parseFloat(fromValue);
    if (isNaN(num) || !rates) return "";
    const converted = convert(num, fromCurrency, toCurrency);
    if (converted === null) return "";
    return formatCurrency(converted);
  }, [fromValue, fromCurrency, toCurrency, rates, convert]);

  const formula = useMemo(() => {
    if (!rates) return "";
    const converted = convert(1, fromCurrency, toCurrency);
    if (converted === null) return "";
    return `1 ${fromCurrency} = ${formatCurrency(converted)} ${toCurrency}`;
  }, [fromCurrency, toCurrency, rates, convert]);

  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setKnightMsg(getRandomMessage());
  }, [fromCurrency, toCurrency]);

  const handleFromValueChange = useCallback((val: string) => {
    if (val === "" || val === "-" || /^-?\d*\.?\d*$/.test(val)) {
      setFromValue(val);
    }
  }, []);

  const handleRetry = useCallback(() => {
    fetchedRef.current = false;
    setError(null);
    setLoading(true);
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => {
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        return res.json();
      })
      .then((data: ExchangeRates) => {
        setRates(data);
        setLoading(false);
        fetchedRef.current = true;
      })
      .catch(() => {
        setError("Could not load exchange rates. Please check your connection and try again.");
        setLoading(false);
      });
  }, []);

  // Quick conversion amounts
  const quickAmounts = [1, 10, 100, 1000, 5000];

  const inputClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-lg font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none";

  const selectClass =
    "w-full h-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 text-base font-semibold text-[color:var(--color-text-primary)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none appearance-none cursor-pointer";

  const chevronBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <svg className="w-8 h-8 text-[color:var(--color-accent)] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-[color:var(--color-text-muted)]">Loading exchange rates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border-2 border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30 p-6 text-center">
          <p className="text-sm text-red-700 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="btn-action inline-flex items-center gap-2 rounded-xl bg-[color:var(--color-accent)] text-white px-6 py-3 text-sm font-bold transition-all hover:bg-[color:var(--color-accent-hover)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
                placeholder="Enter amount"
                className={inputClass}
                autoFocus
              />
            </div>
            <div className="sm:w-64">
              <select
                value={fromCurrency}
                onChange={(e) => {
                  setFromCurrency(e.target.value);
                  setKnightMsg(getRandomMessage());
                }}
                className={selectClass}
                style={{ backgroundImage: chevronBg, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name}
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
            title="Swap currencies"
            aria-label="Swap from and to currencies"
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
            <div className="sm:w-64">
              <select
                value={toCurrency}
                onChange={(e) => {
                  setToCurrency(e.target.value);
                  setKnightMsg(getRandomMessage());
                }}
                className={selectClass}
                style={{ backgroundImage: chevronBg, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name}
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

      {/* Rates updated date */}
      {rates && (
        <p className="text-center text-xs text-[color:var(--color-text-muted)]">
          Rates updated: {rates.date}
        </p>
      )}

      {/* Knight personality message */}
      {knightMsg && result && (
        <p className="text-center text-sm text-[color:var(--color-text-muted)] italic">
          {knightMsg}
        </p>
      )}

      {/* Quick conversions */}
      {rates && (
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--color-text-secondary)] mb-3">
            Common conversions
          </h3>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((amount) => {
              const converted = convert(amount, fromCurrency, toCurrency);
              if (converted === null) return null;
              return (
                <button
                  key={amount}
                  onClick={() => {
                    setFromValue(String(amount));
                    setKnightMsg(getRandomMessage());
                  }}
                  className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] transition-all hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-light)] cursor-pointer"
                >
                  {amount.toLocaleString()} {fromCurrency} = {formatCurrency(converted)} {toCurrency}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
