"use client";

import { useState, useCallback } from "react";

export function FindAndReplaceTool() {
  const [input, setInput] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [output, setOutput] = useState("");
  const [replaceCount, setReplaceCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleReplace = useCallback(() => {
    setError(null);

    if (!findText) {
      setError("Please enter a search term.");
      return;
    }

    try {
      let count = 0;

      if (useRegex) {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(findText, flags);
        const result = input.replace(regex, () => {
          count++;
          return replaceText;
        });
        setOutput(result);
      } else {
        const flags = caseSensitive ? "g" : "gi";
        const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(escaped, flags);
        const result = input.replace(regex, () => {
          count++;
          return replaceText;
        });
        setOutput(result);
      }

      setReplaceCount(count);
    } catch (e) {
      setError(
        `Invalid regular expression: ${e instanceof Error ? e.message : "Unknown error"}`
      );
    }
  }, [input, findText, replaceText, caseSensitive, useRegex]);

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
        <label htmlFor="fnr-input" className="mb-1.5 block text-sm font-medium text-slate-700">
          Input text
        </label>
        <textarea
          id="fnr-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here..."
          rows={10}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fnr-find" className="mb-1.5 block text-sm font-medium text-slate-700">
              Find
            </label>
            <input
              id="fnr-find"
              type="text"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              placeholder="Text to find..."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="fnr-replace" className="mb-1.5 block text-sm font-medium text-slate-700">
              Replace with
            </label>
            <input
              id="fnr-replace"
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replacement text..."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

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
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-sm text-slate-700">Use regex</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleReplace}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        Replace All
      </button>

      {error && (
        <div className="rounded-lg bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]" role="alert">
          {error}
        </div>
      )}

      {replaceCount !== null && !error && (
        <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {replaceCount} replacement{replaceCount !== 1 ? "s" : ""} made
        </div>
      )}

      {output && !error && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="fnr-output" className="text-sm font-medium text-slate-700">
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
            id="fnr-output"
            value={output}
            readOnly
            rows={10}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      )}
    </div>
  );
}
