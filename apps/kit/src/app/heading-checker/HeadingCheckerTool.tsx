"use client";

import { useState, useMemo } from "react";

interface HeadingInfo {
  level: number;
  text: string;
  index: number;
}

interface Warning {
  type: "error" | "warning";
  message: string;
}

export function HeadingCheckerTool() {
  const [html, setHtml] = useState("");

  const headings = useMemo((): HeadingInfo[] => {
    if (!html.trim()) return [];
    const regex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
    const results: HeadingInfo[] = [];
    let match: RegExpExecArray | null;
    let idx = 0;
    while ((match = regex.exec(html)) !== null) {
      const text = match[2]
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .trim();
      results.push({
        level: parseInt(match[1], 10),
        text,
        index: idx++,
      });
    }
    return results;
  }, [html]);

  const counts = useMemo(() => {
    const c: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (const h of headings) {
      c[h.level]++;
    }
    return c;
  }, [headings]);

  const warnings = useMemo((): Warning[] => {
    const w: Warning[] = [];
    if (headings.length === 0) return w;

    // Multiple H1s
    if (counts[1] > 1) {
      w.push({
        type: "error",
        message: `Multiple H1 tags found (${counts[1]}). A page should have exactly one H1.`,
      });
    }

    // No H1
    if (counts[1] === 0) {
      w.push({
        type: "error",
        message: "No H1 tag found. Every page should have one H1 tag.",
      });
    }

    // Skipped levels
    for (let i = 1; i < headings.length; i++) {
      const prev = headings[i - 1].level;
      const curr = headings[i].level;
      if (curr > prev + 1) {
        w.push({
          type: "warning",
          message: `Skipped heading level: H${prev} to H${curr} ("${headings[i].text.slice(0, 40)}${headings[i].text.length > 40 ? "..." : ""}"). Expected H${prev + 1}.`,
        });
      }
    }

    // First heading not H1
    if (headings[0].level !== 1) {
      w.push({
        type: "warning",
        message: `First heading is H${headings[0].level}. The first heading on a page should typically be an H1.`,
      });
    }

    return w;
  }, [headings, counts]);

  const isClean = headings.length > 0 && warnings.length === 0;

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Paste your HTML</label>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder={'<h1>Main Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>\n<h2>Another Section</h2>'}
          rows={10}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 font-mono placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {headings.length > 0 && (
        <>
          {/* Warnings / Success */}
          <div className="space-y-2">
            {isClean && (
              <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-green-500" />
                <p className="text-sm text-green-700">
                  Heading structure looks good. No issues detected.
                </p>
              </div>
            )}
            {warnings.map((w, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 rounded-lg border p-3 ${
                  w.type === "error"
                    ? "border-red-200 bg-[color:var(--color-error-bg,#fef2f2)]"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <span
                  className={`mt-0.5 h-4 w-4 shrink-0 rounded-full ${
                    w.type === "error" ? "bg-[color:var(--color-error)]" : "bg-amber-500"
                  }`}
                />
                <p
                  className={`text-sm ${
                    w.type === "error" ? "text-[color:var(--color-error)]" : "text-amber-700"
                  }`}
                >
                  {w.message}
                </p>
              </div>
            ))}
          </div>

          {/* Counts */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-2">Heading Counts</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {([1, 2, 3, 4, 5, 6] as const).map((level) => (
                <div
                  key={level}
                  className="rounded-lg border border-slate-200 bg-white p-3 text-center"
                >
                  <p className="text-lg font-semibold text-slate-900">{counts[level]}</p>
                  <p className="text-xs text-slate-500">H{level}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Heading Tree */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-2">Heading Hierarchy</h2>
            <div className="rounded-lg border border-slate-200 bg-white divide-y divide-slate-100">
              {headings.map((h) => {
                const indent = (h.level - 1) * 20;
                const levelColors: Record<number, string> = {
                  1: "bg-emerald-500",
                  2: "bg-blue-500",
                  3: "bg-violet-500",
                  4: "bg-amber-500",
                  5: "bg-pink-500",
                  6: "bg-slate-500",
                };
                return (
                  <div
                    key={h.index}
                    className="flex items-center gap-3 px-4 py-2.5"
                    style={{ paddingLeft: `${16 + indent}px` }}
                  >
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-semibold text-white ${levelColors[h.level]}`}
                    >
                      H{h.level}
                    </span>
                    <span className="text-sm text-slate-700 truncate">{h.text}</span>
                    <span className="ml-auto shrink-0 text-xs text-slate-400">
                      {h.text.length} chars
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {html.trim() && headings.length === 0 && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
          <p className="text-sm text-slate-500">
            No heading tags (H1-H6) found in the provided HTML.
          </p>
        </div>
      )}
    </div>
  );
}
