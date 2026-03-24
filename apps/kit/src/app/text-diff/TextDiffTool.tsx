"use client";

import { useState, useCallback } from "react";

interface DiffLine {
  type: "equal" | "added" | "removed";
  text: string;
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const origLines = original.split("\n");
  const modLines = modified.split("\n");
  const result: DiffLine[] = [];

  const maxLen = Math.max(origLines.length, modLines.length);

  // Simple LCS-based line diff
  const m = origLines.length;
  const n = modLines.length;

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (origLines[i - 1] === modLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to get diff
  const diffItems: DiffLine[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      diffItems.unshift({ type: "equal", text: origLines[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diffItems.unshift({ type: "added", text: modLines[j - 1] });
      j--;
    } else {
      diffItems.unshift({ type: "removed", text: origLines[i - 1] });
      i--;
    }
  }

  return diffItems;
}

export function TextDiffTool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diff, setDiff] = useState<DiffLine[] | null>(null);

  const handleCompare = useCallback(() => {
    setDiff(computeDiff(original, modified));
  }, [original, modified]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="diff-original" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
            Original text
          </label>
          <textarea
            id="diff-original"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text here..."
            rows={12}
            className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] font-mono placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="diff-modified" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
            Modified text
          </label>
          <textarea
            id="diff-modified"
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text here..."
            rows={12}
            className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] font-mono placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      <button
        onClick={handleCompare}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        Compare
      </button>

      {diff !== null && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] overflow-hidden">
          <div className="border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3">
            <p className="text-sm font-medium text-[color:var(--color-text-secondary)]">Differences</p>
            <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
              <span className="inline-block rounded bg-[color:var(--color-error-bg,#fef2f2)] px-1.5 py-0.5 text-[color:var(--color-error)]">Removed</span>
              {" "}
              <span className="inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700">Added</span>
            </p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {diff.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-[color:var(--color-text-muted)]">
                Both texts are identical.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {diff.map((line, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 px-4 py-1.5 font-mono text-sm ${
                      line.type === "added"
                        ? "bg-emerald-50 text-emerald-800"
                        : line.type === "removed"
                        ? "bg-[color:var(--color-error-bg,#fef2f2)] text-[color:var(--color-error)]"
                        : "text-[color:var(--color-text-secondary)]"
                    }`}
                  >
                    <span className="shrink-0 w-5 text-right select-none opacity-60">
                      {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                    </span>
                    <span className="whitespace-pre-wrap break-all">
                      {line.text || "\u00A0"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
