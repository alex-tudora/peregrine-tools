"use client";

import { useState, useCallback } from "react";

export function RemoveDuplicatesTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [sortOutput, setSortOutput] = useState(false);
  const [stats, setStats] = useState<{
    original: number;
    duplicates: number;
    unique: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRemove = useCallback(() => {
    const lines = input.split("\n");
    const originalCount = lines.length;

    const seen = new Set<string>();
    const unique: string[] = [];

    for (const line of lines) {
      const processed = trimWhitespace ? line.trim() : line;
      const key = caseSensitive ? processed : processed.toLowerCase();

      if (!seen.has(key)) {
        seen.add(key);
        unique.push(processed);
      }
    }

    const result = sortOutput ? [...unique].sort((a, b) => a.localeCompare(b)) : unique;
    const duplicatesRemoved = originalCount - unique.length;

    setOutput(result.join("\n"));
    setStats({
      original: originalCount,
      duplicates: duplicatesRemoved,
      unique: unique.length,
    });
  }, [input, caseSensitive, trimWhitespace, sortOutput]);

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

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="dedup-input" className="mb-1.5 block text-sm font-medium text-slate-700">
          Input text (one item per line)
        </label>
        <textarea
          id="dedup-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here, one item per line..."
          rows={10}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 font-mono placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-medium text-slate-700 mb-3">Options</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-sm text-slate-700">Case sensitive</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={trimWhitespace}
              onChange={(e) => setTrimWhitespace(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-sm text-slate-700">Trim whitespace</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sortOutput}
              onChange={(e) => setSortOutput(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-sm text-slate-700">Sort output</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleRemove}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        Remove Duplicates
      </button>

      {stats && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
            <p className="text-2xl font-semibold text-slate-900">{stats.original}</p>
            <p className="mt-1 text-xs text-slate-500">Original Lines</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
            <p className="text-2xl font-semibold text-[color:var(--color-error)]">{stats.duplicates}</p>
            <p className="mt-1 text-xs text-slate-500">Duplicates Removed</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
            <p className="text-2xl font-semibold text-emerald-600">{stats.unique}</p>
            <p className="mt-1 text-xs text-slate-500">Unique Lines</p>
          </div>
        </div>
      )}

      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="dedup-output" className="text-sm font-medium text-slate-700">
              Result
            </label>
            <button
              onClick={handleCopy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
          <textarea
            id="dedup-output"
            value={output}
            readOnly
            rows={10}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 font-mono focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      )}
    </div>
  );
}
