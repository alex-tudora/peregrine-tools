"use client";

import { useState, useCallback } from "react";

function minifyHtml(html: string): string {
  let result = html;
  // Remove HTML comments
  result = result.replace(/<!--[\s\S]*?-->/g, "");
  // Collapse multiple whitespace/newlines to single space
  result = result.replace(/\s{2,}/g, " ");
  // Remove space between tags
  result = result.replace(/>\s+</g, "><");
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

export function HtmlMinifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleMinify = useCallback(() => {
    setOutput(minifyHtml(input));
  }, [input]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.html";
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  const inputSize = new TextEncoder().encode(input).length;
  const outputSize = new TextEncoder().encode(output).length;
  const savings = inputSize > 0 ? ((1 - outputSize / inputSize) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Input HTML</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your HTML code here..."
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
        {output && (
          <button
            onClick={handleDownload}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-amber-400 hover:text-amber-600"
          >
            Download
          </button>
        )}
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
        </>
      )}
    </div>
  );
}
