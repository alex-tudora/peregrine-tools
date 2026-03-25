"use client";

import { useState, useCallback, useEffect } from "react";
import { logActivity, usePreference } from "@peregrine/ui";

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

function generatePassword(
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): string {
  let charset = "";
  if (useUppercase) charset += UPPERCASE;
  if (useLowercase) charset += LOWERCASE;
  if (useNumbers) charset += NUMBERS;
  if (useSymbols) charset += SYMBOLS;

  if (charset.length === 0) return "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
}

function calculateStrength(
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): { label: string; level: number; color: string } {
  let poolSize = 0;
  if (useUppercase) poolSize += 26;
  if (useLowercase) poolSize += 26;
  if (useNumbers) poolSize += 10;
  if (useSymbols) poolSize += 30;

  if (poolSize === 0) return { label: "None", level: 0, color: "bg-gray-400" };

  const entropy = length * Math.log2(poolSize);

  if (entropy < 36) return { label: "Weak", level: 1, color: "bg-red-500" };
  if (entropy < 60) return { label: "Fair", level: 2, color: "bg-yellow-500" };
  if (entropy < 80) return { label: "Strong", level: 3, color: "bg-emerald-500" };
  return { label: "Very Strong", level: 4, color: "bg-emerald-600" };
}

function calculateCrackTime(
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): string {
  let charsetSize = 0;
  if (useUppercase) charsetSize += 26;
  if (useLowercase) charsetSize += 26;
  if (useNumbers) charsetSize += 10;
  if (useSymbols) charsetSize += 32;

  if (charsetSize === 0) return "N/A";

  const entropyBits = length * Math.log2(charsetSize);
  // Assume 10 billion guesses per second
  const guessesPerSecond = 1e10;
  // Total combinations = 2^entropy, average guesses = half that
  const secondsToCrack = Math.pow(2, entropyBits) / guessesPerSecond / 2;

  if (secondsToCrack < 1) return "< 1 second";
  if (secondsToCrack < 60) return `${Math.floor(secondsToCrack)} seconds`;
  const minutes = secondsToCrack / 60;
  if (minutes < 60) return `${Math.floor(minutes)} minutes`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)} hours`;
  const days = hours / 24;
  if (days < 365) return `${Math.floor(days)} days`;
  const years = days / 365.25;
  if (years < 100) return `${Math.floor(years)} years`;
  const centuries = years / 100;
  if (centuries < 10) return `${Math.floor(centuries)} centuries`;
  const millennia = years / 1000;
  return `${millennia.toExponential(1)} millennia`;
}

export function PasswordGeneratorTool() {
  const [length, setLength] = usePreference<number>("pw-gen-length", 16);
  const [useUppercase, setUseUppercase] = usePreference<boolean>("pw-gen-uppercase", true);
  const [useLowercase, setUseLowercase] = usePreference<boolean>("pw-gen-lowercase", true);
  const [useNumbers, setUseNumbers] = usePreference<boolean>("pw-gen-numbers", true);
  const [useSymbols, setUseSymbols] = usePreference<boolean>("pw-gen-symbols", true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);

  const [bulkCount, setBulkCount] = useState(5);
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);
  const [bulkCopied, setBulkCopied] = useState(false);

  const strength = calculateStrength(length, useUppercase, useLowercase, useNumbers, useSymbols);

  const hasAtLeastOneCharset = useUppercase || useLowercase || useNumbers || useSymbols;
  const crackTime = calculateCrackTime(length, useUppercase, useLowercase, useNumbers, useSymbols);

  // Auto-generate on mount
  useEffect(() => {
    if (hasAtLeastOneCharset) {
      setPassword(generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = useCallback(() => {
    if (!hasAtLeastOneCharset) return;
    setPassword(generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols));
    setBulkPasswords([]);
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols, hasAtLeastOneCharset]);

  const handleCopy = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      logActivity({ tool: "Password Generator", toolHref: "/password-generator", description: "Generated a password" });
    } catch {
      /* clipboard may not be available */
    }
  }, [password]);

  const handleBulkGenerate = useCallback(() => {
    if (!hasAtLeastOneCharset) return;
    const passwords: string[] = [];
    for (let i = 0; i < bulkCount; i++) {
      passwords.push(generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols));
    }
    setBulkPasswords(passwords);
    setPassword("");
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols, bulkCount, hasAtLeastOneCharset]);

  const bulkOutput = bulkPasswords.join("\n");

  const handleBulkCopy = useCallback(async () => {
    if (!bulkOutput) return;
    try {
      await navigator.clipboard.writeText(bulkOutput);
      setBulkCopied(true);
      setTimeout(() => setBulkCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, [bulkOutput]);

  return (
    <div className="space-y-6">
      {/* Length slider */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="pw-length" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
            Password Length
          </label>
          <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">{length}</span>
        </div>
        <input
          id="pw-length"
          type="range"
          min={8}
          max={128}
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[color:var(--color-border)] accent-emerald-500"
        />
        <div className="mt-1 flex justify-between text-xs text-[color:var(--color-text-tertiary)]">
          <span>8</span>
          <span>128</span>
        </div>
      </div>

      {/* Character set toggles */}
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
          <input
            type="checkbox"
            checked={useUppercase}
            onChange={(e) => setUseUppercase(e.target.checked)}
            className="h-4 w-4 rounded border-[color:var(--color-border-hover)] text-emerald-500 focus:ring-emerald-500"
          />
          Uppercase (A-Z)
        </label>
        <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
          <input
            type="checkbox"
            checked={useLowercase}
            onChange={(e) => setUseLowercase(e.target.checked)}
            className="h-4 w-4 rounded border-[color:var(--color-border-hover)] text-emerald-500 focus:ring-emerald-500"
          />
          Lowercase (a-z)
        </label>
        <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
            className="h-4 w-4 rounded border-[color:var(--color-border-hover)] text-emerald-500 focus:ring-emerald-500"
          />
          Numbers (0-9)
        </label>
        <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
            className="h-4 w-4 rounded border-[color:var(--color-border-hover)] text-emerald-500 focus:ring-emerald-500"
          />
          Symbols (!@#$...)
        </label>
      </div>

      {/* Strength indicator */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-sm font-medium text-[color:var(--color-text-secondary)]">Strength</span>
          <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">{strength.label}</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                level <= strength.level ? strength.color : "bg-[color:var(--color-border)]"
              }`}
            />
          ))}
        </div>
        <p className="mt-1.5 text-xs text-[color:var(--color-text-tertiary)]">
          Estimated crack time: <span className="font-medium">{crackTime}</span>
        </p>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!hasAtLeastOneCharset}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Generate Password
      </button>

      {/* Single password output */}
      {password && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="pw-output" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
              Generated Password
            </label>
            <button
              onClick={handleCopy}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                copied
                  ? "animate-success-flash text-emerald-600"
                  : "text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              {copied ? (
                <span className="inline-flex items-center gap-1">
                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </span>
              ) : "Copy"}
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3">
            <code id="pw-output" className="flex-1 break-all font-mono text-sm text-[color:var(--color-text-primary)]">
              {visible ? password : "\u2022".repeat(password.length)}
            </code>
            <button
              onClick={() => setVisible((v) => !v)}
              className="flex-shrink-0 rounded-md p-1 text-[color:var(--color-text-tertiary)] transition-colors hover:text-[color:var(--color-text-primary)]"
              aria-label={visible ? "Hide password" : "Show password"}
            >
              {visible ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Bulk generate section */}
      <div className="border-t border-[color:var(--color-border)] pt-6">
        <h3 className="mb-4 text-sm font-semibold text-[color:var(--color-text-primary)]">Bulk Generate</h3>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label htmlFor="bulk-count" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
              Quantity
            </label>
            <input
              id="bulk-count"
              type="number"
              min={1}
              max={50}
              value={bulkCount}
              onChange={(e) => setBulkCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-24 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-2.5 text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={handleBulkGenerate}
            disabled={!hasAtLeastOneCharset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500 bg-transparent px-6 py-2.5 text-sm font-semibold text-emerald-600 transition-all duration-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate {bulkCount} Password{bulkCount > 1 ? "s" : ""}
          </button>
        </div>

        {bulkPasswords.length > 0 && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="bulk-output" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
                Generated Passwords ({bulkPasswords.length})
              </label>
              <button
                onClick={handleBulkCopy}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  bulkCopied
                    ? "animate-success-flash text-emerald-600"
                    : "text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                {bulkCopied ? (
                  <span className="inline-flex items-center gap-1">
                    <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied
                  </span>
                ) : "Copy All"}
              </button>
            </div>
            <textarea
              id="bulk-output"
              value={bulkOutput}
              readOnly
              rows={Math.min(bulkPasswords.length + 1, 15)}
              className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}
