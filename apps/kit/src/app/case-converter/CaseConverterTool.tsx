"use client";

import { useState, useCallback } from "react";
import { convertCase, type CaseType } from "@peregrine/converters";

const caseButtons: { type: CaseType; label: string }[] = [
  { type: "upper", label: "UPPERCASE" },
  { type: "lower", label: "lowercase" },
  { type: "title", label: "Title Case" },
  { type: "sentence", label: "Sentence case" },
  { type: "camel", label: "camelCase" },
  { type: "pascal", label: "PascalCase" },
  { type: "snake", label: "snake_case" },
  { type: "kebab", label: "kebab-case" },
];

export function CaseConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = useCallback(
    (type: CaseType) => {
      setActiveCase(type);
      setOutput(convertCase(input, type));
    },
    [input]
  );

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

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="case-input" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
          Input text
        </label>
        <textarea
          id="case-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={6}
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {caseButtons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => handleConvert(btn.type)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              activeCase === btn.type
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-secondary)] hover:border-emerald-300 hover:bg-emerald-50"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="case-output" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
            Converted text
          </label>
          {output && (
            <button
              onClick={handleCopy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          )}
        </div>
        <textarea
          id="case-output"
          value={output}
          readOnly
          placeholder="Converted text will appear here..."
          rows={6}
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}
