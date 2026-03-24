"use client";

import { useState, useMemo, useCallback } from "react";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks (fenced) — must come before other inline processing
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
  });

  // Split into lines for block-level processing
  const lines = html.split("\n");
  const result: string[] = [];
  let inList: "ul" | "ol" | null = null;
  let paragraph: string[] = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      const text = paragraph.join(" ");
      if (text.trim()) {
        result.push(`<p>${processInline(text)}</p>`);
      }
      paragraph = [];
    }
  }

  function closeList() {
    if (inList) {
      result.push(inList === "ul" ? "</ul>" : "</ol>");
      inList = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Pre/code blocks (already processed)
    if (line.startsWith("<pre>") || line.includes("</pre>")) {
      flushParagraph();
      closeList();
      result.push(line);
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      closeList();
      const level = headingMatch[1].length;
      result.push(`<h${level}>${processInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    // Horizontal rule
    if (/^(---|\*\*\*|___)$/.test(line.trim())) {
      flushParagraph();
      closeList();
      result.push("<hr>");
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
    if (ulMatch) {
      flushParagraph();
      if (inList !== "ul") {
        closeList();
        result.push("<ul>");
        inList = "ul";
      }
      result.push(`<li>${processInline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^[\s]*\d+\.\s+(.+)$/);
    if (olMatch) {
      flushParagraph();
      if (inList !== "ol") {
        closeList();
        result.push("<ol>");
        inList = "ol";
      }
      result.push(`<li>${processInline(olMatch[1])}</li>`);
      continue;
    }

    // Blockquote
    const bqMatch = line.match(/^>\s?(.*)$/);
    if (bqMatch) {
      flushParagraph();
      closeList();
      result.push(`<blockquote><p>${processInline(bqMatch[1])}</p></blockquote>`);
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      flushParagraph();
      closeList();
      continue;
    }

    // Regular text — accumulate as paragraph
    paragraph.push(line);
  }

  flushParagraph();
  closeList();

  return result.join("\n");
}

function processInline(text: string): string {
  let result = text;

  // Inline code (must come before bold/italic to avoid conflicts)
  result = result.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Images
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Bold (** or __)
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic (* or _)
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  result = result.replace(/_(.+?)_/g, "<em>$1</em>");

  // Strikethrough
  result = result.replace(/~~(.+?)~~/g, "<del>$1</del>");

  return result;
}

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
