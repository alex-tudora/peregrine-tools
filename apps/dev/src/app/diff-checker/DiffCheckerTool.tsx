"use client";

import { useState, useCallback, useMemo } from "react";

interface DiffLine {
  type: "added" | "removed" | "unchanged" | "modified";
  leftNum?: number;
  rightNum?: number;
  leftText?: string;
  rightText?: string;
  text?: string;
}

function computeLCS(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp;
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const a = original.split("\n");
  const b = modified.split("\n");
  const dp = computeLCS(a, b);
  const result: DiffLine[] = [];

  let i = a.length;
  let j = b.length;
  const stack: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      stack.push({ type: "unchanged", leftNum: i, rightNum: j, text: a[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({ type: "added", rightNum: j, text: b[j - 1] });
      j--;
    } else {
      stack.push({ type: "removed", leftNum: i, text: a[i - 1] });
      i--;
    }
  }

  stack.reverse();
  return stack;
}

export function DiffCheckerTool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diff, setDiff] = useState<DiffLine[]>([]);
  const [view, setView] = useState<"inline" | "side-by-side">("inline");
  const [hasCompared, setHasCompared] = useState(false);

  const handleCompare = useCallback(() => {
    setDiff(computeDiff(original, modified));
    setHasCompared(true);
  }, [original, modified]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    let unchanged = 0;
    for (const line of diff) {
      if (line.type === "added") added++;
      else if (line.type === "removed") removed++;
      else unchanged++;
    }
    return { added, removed, unchanged };
  }, [diff]);

  const bgClass = (type: DiffLine["type"]) => {
    switch (type) {
      case "added": return "bg-emerald-50 border-l-4 border-emerald-400";
      case "removed": return "bg-red-50 border-l-4 border-red-400";
      case "modified": return "bg-amber-50 border-l-4 border-amber-400";
      default: return "";
    }
  };

  const prefixChar = (type: DiffLine["type"]) => {
    switch (type) {
      case "added": return "+";
      case "removed": return "-";
      default: return " ";
    }
  };

  // Build side-by-side data
  const sideBySide = useMemo(() => {
    const left: { num?: number; text: string; type: DiffLine["type"] }[] = [];
    const right: { num?: number; text: string; type: DiffLine["type"] }[] = [];
    let li = 0;
    let ri = 0;

    for (const line of diff) {
      if (line.type === "unchanged") {
        li++;
        ri++;
        left.push({ num: li, text: line.text || "", type: "unchanged" });
        right.push({ num: ri, text: line.text || "", type: "unchanged" });
      } else if (line.type === "removed") {
        li++;
        left.push({ num: li, text: line.text || "", type: "removed" });
        right.push({ num: undefined, text: "", type: "unchanged" });
      } else if (line.type === "added") {
        ri++;
        left.push({ num: undefined, text: "", type: "unchanged" });
        right.push({ num: ri, text: line.text || "", type: "added" });
      }
    }

    return { left, right };
  }, [diff]);

  return (
    <div className="space-y-6">
      {/* Input areas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Original</label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text here..."
            rows={10}
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono text-slate-700 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Modified</label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text here..."
            rows={10}
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono text-slate-700 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleCompare}
          disabled={!original && !modified}
          className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Compare
        </button>
        {hasCompared && (
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            <button
              onClick={() => setView("inline")}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                view === "inline"
                  ? "bg-amber-500 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Inline
            </button>
            <button
              onClick={() => setView("side-by-side")}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                view === "side-by-side"
                  ? "bg-amber-500 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Side by Side
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      {hasCompared && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
            <p className="text-lg font-semibold text-emerald-700">{stats.added}</p>
            <p className="text-xs text-emerald-600">Added</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
            <p className="text-lg font-semibold text-red-700">{stats.removed}</p>
            <p className="text-xs text-red-600">Removed</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
            <p className="text-lg font-semibold text-slate-700">{stats.unchanged}</p>
            <p className="text-xs text-slate-500">Unchanged</p>
          </div>
        </div>
      )}

      {/* Diff output */}
      {hasCompared && view === "inline" && (
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="max-h-[500px] overflow-auto">
            {diff.length === 0 ? (
              <p className="p-4 text-sm text-slate-500">No differences found.</p>
            ) : (
              diff.map((line, i) => (
                <div
                  key={i}
                  className={`flex font-mono text-sm ${bgClass(line.type)}`}
                >
                  <span className="w-10 shrink-0 px-2 py-0.5 text-right text-xs text-slate-400 select-none border-r border-slate-100">
                    {line.leftNum ?? ""}
                  </span>
                  <span className="w-10 shrink-0 px-2 py-0.5 text-right text-xs text-slate-400 select-none border-r border-slate-100">
                    {line.rightNum ?? ""}
                  </span>
                  <span className="w-5 shrink-0 text-center py-0.5 text-xs text-slate-400 select-none">
                    {prefixChar(line.type)}
                  </span>
                  <span className="flex-1 px-2 py-0.5 whitespace-pre-wrap break-all text-slate-800">
                    {line.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {hasCompared && view === "side-by-side" && (
        <div className="grid grid-cols-2 gap-0 rounded-xl border border-slate-200 overflow-hidden">
          <div className="max-h-[500px] overflow-auto border-r border-slate-200">
            {sideBySide.left.map((line, i) => (
              <div
                key={i}
                className={`flex font-mono text-sm ${
                  line.type === "removed" ? "bg-red-50" : ""
                }`}
              >
                <span className="w-10 shrink-0 px-2 py-0.5 text-right text-xs text-slate-400 select-none border-r border-slate-100">
                  {line.num ?? ""}
                </span>
                <span className="flex-1 px-2 py-0.5 whitespace-pre-wrap break-all text-slate-800">
                  {line.text}
                </span>
              </div>
            ))}
          </div>
          <div className="max-h-[500px] overflow-auto">
            {sideBySide.right.map((line, i) => (
              <div
                key={i}
                className={`flex font-mono text-sm ${
                  line.type === "added" ? "bg-emerald-50" : ""
                }`}
              >
                <span className="w-10 shrink-0 px-2 py-0.5 text-right text-xs text-slate-400 select-none border-r border-slate-100">
                  {line.num ?? ""}
                </span>
                <span className="flex-1 px-2 py-0.5 whitespace-pre-wrap break-all text-slate-800">
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
