"use client";

import { useState, useMemo, useCallback } from "react";

interface MatchResult {
  fullMatch: string;
  index: number;
  groups: string[];
}

const commonPatterns: { label: string; pattern: string; flags: string }[] = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", flags: "g" },
  { label: "URL", pattern: "https?://[^\\s/$.?#].[^\\s]*", flags: "gi" },
  { label: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", flags: "g" },
  { label: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g" },
  { label: "Date (YYYY-MM-DD)", pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])", flags: "g" },
  { label: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b", flags: "gi" },
];

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flagG, setFlagG] = useState(true);
  const [flagI, setFlagI] = useState(false);
  const [flagM, setFlagM] = useState(false);
  const [flagS, setFlagS] = useState(false);

  const flags = useMemo(() => {
    let f = "";
    if (flagG) f += "g";
    if (flagI) f += "i";
    if (flagM) f += "m";
    if (flagS) f += "s";
    return f;
  }, [flagG, flagI, flagM, flagS]);

  const { matches, error, highlightedHtml } = useMemo(() => {
    if (!pattern || !testString) {
      return { matches: [] as MatchResult[], error: "", highlightedHtml: "" };
    }

    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const results: MatchResult[] = [];
      let m: RegExpExecArray | null;

      while ((m = re.exec(testString)) !== null) {
        results.push({
          fullMatch: m[0],
          index: m.index,
          groups: m.slice(1),
        });
        if (m[0].length === 0) {
          re.lastIndex++;
        }
      }

      // Build highlighted HTML
      let html = "";
      let lastIndex = 0;
      for (const match of results) {
        html += escapeHtml(testString.slice(lastIndex, match.index));
        html += `<mark class="bg-amber-200 text-amber-900 rounded px-0.5">${escapeHtml(match.fullMatch)}</mark>`;
        lastIndex = match.index + match.fullMatch.length;
      }
      html += escapeHtml(testString.slice(lastIndex));

      return { matches: results, error: "", highlightedHtml: html };
    } catch (e) {
      return {
        matches: [] as MatchResult[],
        error: e instanceof Error ? e.message : "Invalid regex",
        highlightedHtml: "",
      };
    }
  }, [pattern, testString, flags]);

  const handleLoadPattern = useCallback((p: string, f: string) => {
    setPattern(p);
    setFlagG(f.includes("g"));
    setFlagI(f.includes("i"));
    setFlagM(f.includes("m"));
    setFlagS(f.includes("s"));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
        <div className="space-y-4">
          <div>
            <label htmlFor="regex-pattern" className="mb-1.5 block text-sm font-medium text-slate-700">
              Pattern
            </label>
            <input
              id="regex-pattern"
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              spellCheck={false}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { flag: "g", label: "Global (g)", state: flagG, setter: setFlagG },
              { flag: "i", label: "Case-insensitive (i)", state: flagI, setter: setFlagI },
              { flag: "m", label: "Multiline (m)", state: flagM, setter: setFlagM },
              { flag: "s", label: "DotAll (s)", state: flagS, setter: setFlagS },
            ].map((item) => (
              <label key={item.flag} className="flex items-center gap-1.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={item.state}
                  onChange={(e) => item.setter(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                />
                {item.label}
              </label>
            ))}
          </div>

          <div>
            <label htmlFor="regex-test" className="mb-1.5 block text-sm font-medium text-slate-700">
              Test String
            </label>
            <textarea
              id="regex-test"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter test string..."
              rows={6}
              spellCheck={false}
              className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Common Patterns</p>
          <div className="space-y-1.5">
            {commonPatterns.map((cp) => (
              <button
                key={cp.label}
                onClick={() => handleLoadPattern(cp.pattern, cp.flags)}
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-xs text-slate-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
              >
                <span className="font-medium text-slate-800">{cp.label}</span>
                <br />
                <span className="font-mono text-slate-400">{cp.pattern}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="mr-2 font-semibold">Error:</span>
          {error}
        </div>
      )}

      {highlightedHtml && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">Highlighted Matches</p>
            <span className="text-xs text-slate-500">
              {matches.length} match{matches.length !== 1 ? "es" : ""}
            </span>
          </div>
          <div
            className="whitespace-pre-wrap break-all rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      )}

      {matches.length > 0 && (
        <div>
          <p className="mb-1.5 text-sm font-medium text-slate-700">Match Details</p>
          <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
            {matches.map((m, idx) => (
              <div key={idx} className="px-4 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-500">
                    #{idx + 1}
                  </span>
                  <span className="font-mono text-slate-800 break-all">{m.fullMatch}</span>
                  <span className="shrink-0 text-xs text-slate-400">index {m.index}</span>
                </div>
                {m.groups.length > 0 && (
                  <div className="mt-1 ml-8 space-y-0.5">
                    {m.groups.map((g, gi) => (
                      <p key={gi} className="text-xs text-slate-500">
                        Group {gi + 1}:{" "}
                        <span className="font-mono text-slate-700">{g ?? "(undefined)"}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
