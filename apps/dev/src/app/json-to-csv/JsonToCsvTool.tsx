"use client";

import { useState, useCallback } from "react";

function flattenObject(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, fullKey));
    } else if (Array.isArray(value)) {
      result[fullKey] = JSON.stringify(value);
    } else {
      result[fullKey] = value === null || value === undefined ? "" : String(value);
    }
  }
  return result;
}

function escapeCsvField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

function jsonToCsv(jsonString: string): string {
  const data = JSON.parse(jsonString);
  if (!Array.isArray(data)) {
    throw new Error("Input must be a JSON array of objects");
  }
  if (data.length === 0) {
    throw new Error("Array is empty");
  }

  const flatRows = data.map((item) => {
    if (typeof item !== "object" || item === null) {
      throw new Error("Each item in the array must be an object");
    }
    return flattenObject(item as Record<string, unknown>);
  });

  const headerSet = new Set<string>();
  for (const row of flatRows) {
    for (const key of Object.keys(row)) {
      headerSet.add(key);
    }
  }
  const headers = Array.from(headerSet);

  const lines = [headers.map(escapeCsvField).join(",")];
  for (const row of flatRows) {
    const values = headers.map((h) => escapeCsvField(row[h] ?? ""));
    lines.push(values.join(","));
  }

  return lines.join("\n");
}

export function JsonToCsvTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError("");
      setOutput("");
      return;
    }
    try {
      const csv = jsonToCsv(input);
      setOutput(csv);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid input");
      setOutput("");
    }
  }, [input]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="json-csv-input" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
          JSON Input (array of objects)
        </label>
        <textarea
          id="json-csv-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'[\n  {"name": "Alice", "age": 30, "city": "London"},\n  {"name": "Bob", "age": 25, "city": "Paris"}\n]'}
          rows={10}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <button
        onClick={handleConvert}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        Convert
      </button>

      {error && (
        <div className="rounded-lg border border-red-200 bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]">
          <span className="mr-2 font-semibold">Error:</span>
          {error}
        </div>
      )}

      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="csv-output" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
              CSV Output
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
              >
                Download .csv
              </button>
            </div>
          </div>
          <textarea
            id="csv-output"
            value={output}
            readOnly
            rows={10}
            className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      )}
    </div>
  );
}
