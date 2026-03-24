"use client";

import { useState, useCallback } from "react";

function minifyJs(js: string): string {
  let result = js;
  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove single-line comments (but not URLs like http://)
  result = result.replace(/(^|[^:])\/\/.*$/gm, "$1");
  // Collapse multiple newlines
  result = result.replace(/\n{2,}/g, "\n");
  // Remove leading/trailing whitespace per line
  result = result
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
  // Collapse multiple spaces to one
  result = result.replace(/[ \t]{2,}/g, " ");
  // Remove newlines (join into one line)
  result = result.replace(/\n/g, "");
  // Trim
  result = result.trim();
  return result;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-2 text-sm font-medium text-[color:var(--color-text-secondary)] transition-all hover:border-amber-400 hover:text-amber-600"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function JsMinifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleMinify = useCallback(() => {
    setOutput(minifyJs(input));
  }, [input]);

  const inputSize = new TextEncoder().encode(input).length;
  const outputSize = new TextEncoder().encode(output).length;
  const savings = inputSize > 0 ? ((1 - outputSize / inputSize) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5">Input JavaScript</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JavaScript code here..."
          rows={10}
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm font-mono text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleMinify}
          disabled={!input.trim()}
          className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Minify
        </button>
        {output && <CopyButton text={output} />}
      </div>

      {output && (
        <>
          <div>
            <label className="block text-xs font-medium text-[color:var(--color-text-muted)] mb-1.5">Minified Output</label>
            <textarea
              value={output}
              readOnly
              rows={6}
              className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-sm font-mono text-[color:var(--color-text-secondary)]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 text-center">
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">{formatBytes(inputSize)}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">Original</p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 text-center">
              <p className="text-lg font-semibold text-[color:var(--color-text-primary)]">{formatBytes(outputSize)}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">Minified</p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center">
              <p className="text-lg font-semibold text-emerald-700">{savings}%</p>
              <p className="mt-1 text-xs text-emerald-600">Saved</p>
            </div>
          </div>

          <p className="text-xs text-[color:var(--color-text-muted)]">
            Note: This is basic whitespace/comment removal. For production JavaScript, use Terser, esbuild, or SWC for full minification with variable mangling and dead code elimination.
          </p>
        </>
      )}
    </div>
  );
}
