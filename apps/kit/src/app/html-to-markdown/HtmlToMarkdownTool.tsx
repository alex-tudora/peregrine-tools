"use client";

import { useState, useMemo, useCallback } from "react";

function htmlToMarkdown(html: string): string {
  let md = html;

  // Remove doctype, html, head, body tags
  md = md.replace(/<!DOCTYPE[^>]*>/gi, "");
  md = md.replace(/<\/?html[^>]*>/gi, "");
  md = md.replace(/<head[\s\S]*?<\/head>/gi, "");
  md = md.replace(/<\/?body[^>]*>/gi, "");

  // Headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "# $1\n\n");
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "## $1\n\n");
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "### $1\n\n");
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "#### $1\n\n");
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "##### $1\n\n");
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "###### $1\n\n");

  // Bold
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**");

  // Italic
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*");

  // Strikethrough
  md = md.replace(/<(del|s|strike)[^>]*>([\s\S]*?)<\/\1>/gi, "~~$2~~");

  // Inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");

  // Code blocks (pre > code)
  md = md.replace(/<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi, "```\n$1\n```\n\n");
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "```\n$1\n```\n\n");

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

  // Images
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  md = md.replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)");
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");

  // Horizontal rule
  md = md.replace(/<hr[^>]*\/?>/gi, "\n---\n\n");

  // Blockquote
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content: string) => {
    const clean = content.replace(/<\/?p[^>]*>/gi, "").trim();
    return clean
      .split("\n")
      .map((line: string) => `> ${line.trim()}`)
      .join("\n") + "\n\n";
  });

  // Unordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, content: string) => {
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n") + "\n";
  });

  // Ordered lists
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, content: string) => {
    let counter = 0;
    return (
      content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, item: string) => {
        counter++;
        return `${counter}. ${item.trim()}\n`;
      }) + "\n"
    );
  });

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n");

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, "\n");

  // Remove remaining HTML tags
  md = md.replace(/<\/?[^>]+(>|$)/g, "");

  // Decode HTML entities
  md = md.replace(/&amp;/g, "&");
  md = md.replace(/&lt;/g, "<");
  md = md.replace(/&gt;/g, ">");
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.replace(/&nbsp;/g, " ");

  // Clean up excessive whitespace
  md = md.replace(/\n{3,}/g, "\n\n");
  md = md.trim();

  return md;
}

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
          <label htmlFor="html-input" className="mb-1.5 block text-sm font-medium text-slate-700">
            HTML
          </label>
          <textarea
            id="html-input"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Paste your HTML here..."
            rows={16}
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 font-mono placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="md-output" className="text-sm font-medium text-slate-700">
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
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 font-mono placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}
