"use client";

import { useState, useMemo } from "react";

interface ValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  rootType?: string;
  keyCount?: number;
  depth?: number;
}

function countKeys(obj: unknown): number {
  if (obj === null || typeof obj !== "object") return 0;
  if (Array.isArray(obj)) {
    return obj.reduce((sum: number, item) => sum + countKeys(item), 0);
  }
  const keys = Object.keys(obj);
  return keys.length + keys.reduce((sum: number, key) => sum + countKeys((obj as Record<string, unknown>)[key]), 0);
}

function getDepth(obj: unknown): number {
  if (obj === null || typeof obj !== "object") return 0;
  if (Array.isArray(obj)) {
    if (obj.length === 0) return 1;
    return 1 + Math.max(...obj.map(getDepth));
  }
  const values = Object.values(obj);
  if (values.length === 0) return 1;
  return 1 + Math.max(...values.map(getDepth));
}

function getErrorLine(jsonString: string, errorMessage: string): number | undefined {
  const posMatch = errorMessage.match(/position\s+(\d+)/i);
  if (!posMatch) return undefined;
  const pos = parseInt(posMatch[1], 10);
  const upToPos = jsonString.slice(0, pos);
  return upToPos.split("\n").length;
}

function validateJson(input: string): ValidationResult {
  if (!input.trim()) {
    return { valid: false, error: "Enter JSON to validate" };
  }
  try {
    const parsed = JSON.parse(input);
    const rootType = Array.isArray(parsed) ? "array" : typeof parsed === "object" && parsed !== null ? "object" : typeof parsed;
    const keyCount = countKeys(parsed);
    const depth = getDepth(parsed);
    return { valid: true, rootType, keyCount, depth };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid JSON";
    const line = getErrorLine(input, msg);
    return { valid: false, error: msg, line };
  }
}

export function JsonValidatorTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => validateJson(input), [input]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="json-validate-input" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
          JSON Input
        </label>
        <textarea
          id="json-validate-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "value", "items": [1, 2, 3]}'
          rows={12}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {input.trim() && (
        <div
          className={`rounded-xl border px-4 py-4 ${
            result.valid
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-[color:var(--color-error-bg,#fef2f2)]"
          }`}
        >
          <div className="flex items-center gap-2">
            {result.valid ? (
              <>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">
                  &#10003;
                </span>
                <span className="text-sm font-semibold text-emerald-800">Valid JSON</span>
              </>
            ) : (
              <>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-error)] text-white text-xs font-bold">
                  &#10005;
                </span>
                <span className="text-sm font-semibold text-[color:var(--color-error)]">Invalid JSON</span>
              </>
            )}
          </div>

          {result.valid ? (
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-emerald-200 bg-[color:var(--color-bg-card)] p-3 text-center">
                <p className="text-lg font-semibold text-[color:var(--color-text-primary)] capitalize">{result.rootType}</p>
                <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">Root Type</p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-[color:var(--color-bg-card)] p-3 text-center">
                <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">{result.keyCount}</p>
                <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">Total Keys</p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-[color:var(--color-bg-card)] p-3 text-center">
                <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">{result.depth}</p>
                <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">Max Depth</p>
              </div>
            </div>
          ) : (
            <div className="mt-2 text-sm text-[color:var(--color-error)]">
              <p>{result.error}</p>
              {result.line !== undefined && (
                <p className="mt-1 text-xs text-[color:var(--color-error)]">Near line {result.line}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
