"use client";

import { useState, useMemo, useCallback } from "react";
import { htmlToMarkdown } from "@peregrine/converters";


export function HtmlToMarkdownTool() {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(() => htmlToMarkdown(html), [html]);

  const handleCopy = useCallback(async () => {
    if (!markdown) return;
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, [markdown]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="html-input" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
            HTML
          </label>
          <textarea
            id="html-input"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Paste your HTML here..."
            rows={16}
            className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] font-mono placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="md-output" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
              Markdown
            </label>
            {markdown && (
              <button
                onClick={handleCopy}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
              >
                {copied ? "Copied!" : "Copy Markdown"}
              </button>
            )}
          </div>
          <textarea
            id="md-output"
            value={markdown}
            readOnly
            rows={16}
            placeholder="Markdown output will appear here..."
            className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] font-mono placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}
