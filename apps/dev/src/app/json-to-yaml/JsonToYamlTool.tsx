"use client";

import { useState, useCallback } from "react";
import { logActivity } from "@peregrine/ui";
import { jsonToYaml } from "@/lib/yaml";

export function JsonToYamlTool() {
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
      const yaml = jsonToYaml(input);
      setOutput(yaml);
      setError("");
      logActivity({ tool: "JSON to YAML", toolHref: "/json-to-yaml", description: "Converted JSON to YAML" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
    }
  }, [input]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      logActivity({ tool: "JSON to YAML", toolHref: "/json-to-yaml", description: "Copied YAML output" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, [output]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="json-yaml-input" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
          JSON Input
        </label>
        <textarea
          id="json-yaml-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'{\n  "name": "John Doe",\n  "age": 30,\n  "address": {\n    "city": "London",\n    "country": "UK"\n  }\n}'}
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
            <label htmlFor="yaml-output" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
              YAML Output
            </label>
            <button
              onClick={handleCopy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            id="yaml-output"
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
