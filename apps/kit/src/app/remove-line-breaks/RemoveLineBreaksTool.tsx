"use client";

import { useState, useCallback } from "react";

type ReplaceMode = "space" | "nothing" | "comma";

export function RemoveLineBreaksTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ReplaceMode>("space");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRemove = useCallback(() => {
    let replacement: string;
    switch (mode) {
      case "space":
        replacement = " ";
        break;
      case "nothing":
        replacement = "";
        break;
      case "comma":
        replacement = ", ";
        break;
    }
    const result = input.replace(/(\r\n|\r|\n)+/g, replacement);
    setOutput(result);
  }, [input, mode]);

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
        <label htmlFor="rlb-input" className="mb-1.5 block text-sm font-medium text-slate-700">
          Input text
        </label>
        <textarea
          id="rlb-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text with line breaks here..."
          rows={10}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-medium text-slate-700 mb-3">Replace line breaks with:</p>
        <div className="flex flex-wrap gap-3">
          {(
            [
              { value: "space", label: "Space" },
              { value: "nothing", label: "Nothing" },
              { value: "comma", label: "Comma" },
            ] as { value: ReplaceMode; label: string }[]
          ).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                mode === opt.value
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleRemove}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        Remove Line Breaks
      </button>

      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="rlb-output" className="text-sm font-medium text-slate-700">
              Result
            </label>
            <button
              onClick={handleCopy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
          <textarea
            id="rlb-output"
            value={output}
            readOnly
            rows={6}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      )}
    </div>
  );
}
