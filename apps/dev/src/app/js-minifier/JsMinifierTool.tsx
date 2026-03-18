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
      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-amber-400 hover:text-amber-600"
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
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Input JavaScript</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JavaScript code here..."
          rows={10}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono text-slate-700 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
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
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Minified Output</label>
            <textarea
              value={output}
              readOnly
              rows={6}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-700"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
              <p className="text-lg font-semibold text-slate-900">{formatBytes(inputSize)}</p>
              <p className="mt-1 text-xs text-slate-500">Original</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
              <p className="text-lg font-semibold text-slate-900">{formatBytes(outputSize)}</p>
              <p className="mt-1 text-xs text-slate-500">Minified</p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center">
              <p className="text-lg font-semibold text-emerald-700">{savings}%</p>
              <p className="mt-1 text-xs text-emerald-600">Saved</p>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Note: This is basic whitespace/comment removal. For production JavaScript, use Terser, esbuild, or SWC for full minification with variable mangling and dead code elimination.
          </p>
        </>
      )}
    </div>
  );
}
