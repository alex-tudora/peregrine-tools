"use client";

import { useState, useMemo, useCallback } from "react";
import { parseMarkdown } from "@peregrine/converters";


export function MarkdownToHtmlTool() {
  const [markdown, setMarkdown] = useState("");
  const [viewMode, setViewMode] = useState<"html" | "preview">("html");
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => parseMarkdown(markdown), [markdown]);

  const handleCopy = useCallback(async () => {
    if (!html) return;
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, [html]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="md-input" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
            Markdown
          </label>
          <textarea
            id="md-input"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type or paste your Markdown here..."
            rows={16}
            className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] font-mono placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode("html")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  viewMode === "html"
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]"
                }`}
              >
                HTML Code
              </button>
              <button
                onClick={() => setViewMode("preview")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  viewMode === "preview"
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]"
                }`}
              >
                Preview
              </button>
            </div>
            {html && (
              <button
                onClick={handleCopy}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
              >
                {copied ? "Copied!" : "Copy HTML"}
              </button>
            )}
          </div>
          {viewMode === "html" ? (
            <textarea
              value={html}
              readOnly
              rows={16}
              placeholder="HTML output will appear here..."
              className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] font-mono placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          ) : (
            <div
              className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] prose prose-sm max-w-none overflow-y-auto"
              style={{ minHeight: "398px" }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
