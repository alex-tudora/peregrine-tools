"use client";

import { useState, useCallback } from "react";
import { logActivity } from "@peregrine/ui";

type IndentType = "2" | "4" | "tab";

function syntaxHighlight(json: string): string {
  return json.replace(
    /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "text-emerald-600"; // number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-violet-600"; // key
        } else {
          cls = "text-amber-600"; // string
        }
      } else if (/true|false/.test(match)) {
        cls = "text-blue-600"; // boolean
      } else if (/null/.test(match)) {
        cls = "text-[color:var(--color-text-muted)]"; // null
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [highlighted, setHighlighted] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState<IndentType>("2");
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const getIndent = useCallback((type: IndentType): string | number => {
    if (type === "tab") return "\t";
    return Number(type);
  }, []);

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setError("");
      setOutput("");
      setHighlighted("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, getIndent(indent));
      setOutput(formatted);
      setHighlighted(syntaxHighlight(formatted));
      setError("");
      setCollapsed(false);
      logActivity({ tool: "JSON Formatter", toolHref: "/json-formatter", description: "Formatted JSON" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
      setHighlighted("");
    }
  }, [input, indent, getIndent]);

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

  const collapsedOutput = useCallback(() => {
    if (!output) return "";
    try {
      const parsed = JSON.parse(output);
      return JSON.stringify(parsed);
    } catch {
      return output;
    }
  }, [output]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="json-input" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
          Input JSON
        </label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "value", "items": [1, 2, 3]}'
          rows={10}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="indent-select" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
            Indent:
          </label>
          <select
            id="indent-select"
            value={indent}
            onChange={(e) => setIndent(e.target.value as IndentType)}
            className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">Tab</option>
          </select>
        </div>

        <button
          onClick={handleFormat}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          Format
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]">
          <span className="mr-2 font-semibold">Error:</span>
          {error}
        </div>
      )}

      {highlighted && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-[color:var(--color-text-secondary)]">Formatted JSON</label>
            <div className="flex gap-2">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
              >
                {collapsed ? "Expand" : "Collapse"}
              </button>
              <button
                onClick={handleCopy}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <div className="max-h-[32rem] overflow-auto rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3">
            {collapsed ? (
              <pre className="whitespace-pre-wrap break-all font-mono text-sm text-[color:var(--color-text-secondary)]">
                {collapsedOutput()}
              </pre>
            ) : (
              <pre
                className="whitespace-pre-wrap break-all font-mono text-sm"
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
