"use client";

import { useState, useCallback } from "react";
import { logActivity } from "@peregrine/ui";
import { yamlToJson } from "@/lib/yaml";

export function YamlToJsonTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError("");
      setOutput("");
      return;
    }
    try {
      const json = yamlToJson(input);
      setOutput(json);
      setError("");
      logActivity({ tool: "YAML to JSON", toolHref: "/yaml-to-json", description: "Converted YAML to JSON" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid YAML";
      setError(msg);
      setOutput("");
    }
  }, [input]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      logActivity({ tool: "YAML to JSON", toolHref: "/yaml-to-json", description: "Copied JSON output" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, [output]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="yaml-json-input" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
          YAML Input
        </label>
        <textarea
          id="yaml-json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"name: John Doe\nage: 30\naddress:\n  city: London\n  country: UK\nitems:\n  - apple\n  - banana"}
          rows={10}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <button
        onClick={handleConvert}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        Convert
      </button>

      {error && (
        <div className="rounded-lg border border-red-200 bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]">
          <span className="mr-2 font-semibold">Error:</span>
          {error}
        </div>
      )}

      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="json-output" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
              JSON Output
            </label>
            <button
              onClick={handleCopy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            id="json-output"
            value={output}
            readOnly
            rows={10}
            className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      )}
    </div>
  );
}
