"use client";

import { useState, useCallback, useMemo } from "react";
import { logActivity } from "@peregrine/ui";

const defaultMarkdown = `# Markdown Preview

Welcome to the **Markdown Preview** tool. Start typing to see a *live preview* of your markdown.

## Features

- **Bold text** and *italic text*
- [Links](https://example.com)
- Inline \`code\` snippets

### Code Blocks

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Lists

1. First ordered item
2. Second ordered item
3. Third ordered item

- Unordered item A
- Unordered item B

> Blockquotes are useful for highlighting important notes or quoting external sources.

---

That's it! Edit this text to try it out.
`;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks (``` ... ```) — must be processed before other inline rules
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="md-code-block"><code>${escapeHtml(code.replace(/\n$/, ""))}</code></pre>`;
  });

  // Split into blocks to handle block-level elements, but preserve code blocks
  const codeBlockPlaceholders: string[] = [];
  html = html.replace(/<pre class="md-code-block"><code>[\s\S]*?<\/code><\/pre>/g, (match) => {
    codeBlockPlaceholders.push(match);
    return `%%CODEBLOCK_${codeBlockPlaceholders.length - 1}%%`;
  });

  const lines = html.split("\n");
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check for code block placeholder
    const codeBlockMatch = line.match(/^%%CODEBLOCK_(\d+)%%$/);
    if (codeBlockMatch) {
      result.push(codeBlockPlaceholders[parseInt(codeBlockMatch[1])]);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line) || /^\*\*\*+\s*$/.test(line) || /^___+\s*$/.test(line)) {
      result.push("<hr />");
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      result.push(`<h${level}>${applyInline(headingMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // Blockquotes
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      result.push(`<blockquote>${applyInline(quoteLines.join(" "))}</blockquote>`);
      continue;
    }

    // Unordered list
    if (/^[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*+]\s+/, ""));
        i++;
      }
      result.push(
        "<ul>" + items.map((item) => `<li>${applyInline(item)}</li>`).join("") + "</ul>"
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      result.push(
        "<ol>" + items.map((item) => `<li>${applyInline(item)}</li>`).join("") + "</ol>"
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-empty, non-block lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^[-*+]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i]) &&
      !/^\*\*\*+\s*$/.test(lines[i]) &&
      !/^___+\s*$/.test(lines[i]) &&
      !/^%%CODEBLOCK_\d+%%$/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      result.push(`<p>${applyInline(paraLines.join(" "))}</p>`);
    }
  }

  return result.join("\n");
}

function applyInline(text: string): string {
  let out = escapeHtml(text);

  // Inline code (must be before bold/italic to avoid conflicts)
  out = out.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');

  // Bold (** or __)
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic (* or _) — careful not to match ** or __
  out = out.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  out = out.replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "<em>$1</em>");

  // Links [text](url)
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return out;
}

export function MarkdownPreviewTool() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const renderedHtml = useMemo(() => parseMarkdown(markdown), [markdown]);

  const handleCopyHtml = useCallback(async () => {
    if (!renderedHtml) return;
    try {
      await navigator.clipboard.writeText(renderedHtml);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
      logActivity({ tool: "Markdown Preview", toolHref: "/markdown-preview", description: "Copied HTML output" });
    } catch {
      /* clipboard may not be available */
    }
  }, [renderedHtml]);

  const handleCopyMarkdown = useCallback(async () => {
    if (!markdown) return;
    try {
      await navigator.clipboard.writeText(markdown);
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
      logActivity({ tool: "Markdown Preview", toolHref: "/markdown-preview", description: "Copied Markdown source" });
    } catch {
      /* clipboard may not be available */
    }
  }, [markdown]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleCopyMarkdown}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          {copiedMd ? "Copied!" : "Copy Markdown"}
        </button>
        <button
          onClick={handleCopyHtml}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-text-secondary)] shadow-sm transition-all duration-200 hover:bg-[color:var(--color-bg-elevated)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          {copiedHtml ? "Copied!" : "Copy HTML"}
        </button>
      </div>

      {/* Split pane */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Editor */}
        <div>
          <label
            htmlFor="md-input"
            className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
          >
            Markdown
          </label>
          <textarea
            id="md-input"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
            spellCheck={false}
            className="h-[32rem] w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Preview */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
            Preview
          </label>
          <div
            className="md-preview h-[32rem] overflow-auto rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-6 py-4"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>

      {/* Preview styles */}
      <style>{`
        .md-preview h1 { font-size: 2em; font-weight: 700; margin: 0.67em 0; line-height: 1.2; color: var(--color-text-primary); }
        .md-preview h2 { font-size: 1.5em; font-weight: 600; margin: 0.75em 0 0.5em; line-height: 1.3; color: var(--color-text-primary); border-bottom: 1px solid var(--color-border); padding-bottom: 0.3em; }
        .md-preview h3 { font-size: 1.25em; font-weight: 600; margin: 0.75em 0 0.5em; line-height: 1.4; color: var(--color-text-primary); }
        .md-preview h4 { font-size: 1.1em; font-weight: 600; margin: 0.75em 0 0.5em; color: var(--color-text-primary); }
        .md-preview h5 { font-size: 1em; font-weight: 600; margin: 0.75em 0 0.5em; color: var(--color-text-primary); }
        .md-preview h6 { font-size: 0.875em; font-weight: 600; margin: 0.75em 0 0.5em; color: var(--color-text-muted); }
        .md-preview p { margin: 0.5em 0; line-height: 1.7; color: var(--color-text-secondary); }
        .md-preview strong { font-weight: 700; color: var(--color-text-primary); }
        .md-preview em { font-style: italic; }
        .md-preview a { color: #10b981; text-decoration: underline; text-underline-offset: 2px; }
        .md-preview a:hover { color: #059669; }
        .md-preview ul { list-style-type: disc; padding-left: 1.5em; margin: 0.5em 0; color: var(--color-text-secondary); }
        .md-preview ol { list-style-type: decimal; padding-left: 1.5em; margin: 0.5em 0; color: var(--color-text-secondary); }
        .md-preview li { margin: 0.25em 0; line-height: 1.6; }
        .md-preview blockquote { border-left: 4px solid #10b981; padding: 0.5em 1em; margin: 0.75em 0; color: var(--color-text-muted); background: var(--color-bg-elevated); border-radius: 0 0.5rem 0.5rem 0; }
        .md-preview hr { border: none; border-top: 1px solid var(--color-border); margin: 1.5em 0; }
        .md-preview .md-code-block { background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: 0.75rem; padding: 1em; overflow-x: auto; margin: 0.75em 0; }
        .md-preview .md-code-block code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.875em; color: var(--color-text-secondary); }
        .md-preview .md-inline-code { background: var(--color-bg-elevated); border: 1px solid var(--color-border); border-radius: 0.375rem; padding: 0.125em 0.375em; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.875em; color: #10b981; }
      `}</style>
    </div>
  );
}
