"use client";

import { useState, useCallback } from "react";

export function UrlEncodeTool() {
  const [input, setInput] = useState("");
  const [outputComponent, setOutputComponent] = useState("");
  const [outputUri, setOutputUri] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copiedComponent, setCopiedComponent] = useState(false);
  const [copiedUri, setCopiedUri] = useState(false);

  const handleEncode = useCallback(() => {
    setMode("encode");
    setError("");
    if (!input.trim()) {
      setOutputComponent("");
      setOutputUri("");
      return;
    }
    try {
      setOutputComponent(encodeURIComponent(input));
      setOutputUri(encodeURI(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Encoding failed");
      setOutputComponent("");
      setOutputUri("");
    }
  }, [input]);

  const handleDecode = useCallback(() => {
    setMode("decode");
    setError("");
    if (!input.trim()) {
      setOutputComponent("");
      setOutputUri("");
      return;
    }
    try {
      setOutputComponent(decodeURIComponent(input));
      setOutputUri(decodeURI(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decoding failed — input contains invalid percent-encoding");
      setOutputComponent("");
      setOutputUri("");
    }
  }, [input]);

  const handleCopy = useCallback(async (text: string, setter: (v: boolean) => void) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="url-input" className="mb-1.5 block text-sm font-medium text-slate-700">
          Input
        </label>
        <textarea
          id="url-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "Enter text or URL to encode..." : "Enter percent-encoded text to decode..."}
          rows={6}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleEncode}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] ${
            mode === "encode"
              ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30"
              : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] ${
            mode === "decode"
              ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30"
              : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          Decode
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]">
          <span className="mr-2 font-semibold">Error:</span>
          {error}
        </div>
      )}

      {(outputComponent || outputUri) && (
        <div className="space-y-4">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="url-output-component" className="text-sm font-medium text-slate-700">
                {mode === "encode" ? "encodeURIComponent" : "decodeURIComponent"}
              </label>
              <button
                onClick={() => handleCopy(outputComponent, setCopiedComponent)}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
              >
                {copiedComponent ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              id="url-output-component"
              value={outputComponent}
              readOnly
              rows={4}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="url-output-uri" className="text-sm font-medium text-slate-700">
                {mode === "encode" ? "encodeURI" : "decodeURI"}
              </label>
              <button
                onClick={() => handleCopy(outputUri, setCopiedUri)}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
              >
                {copiedUri ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              id="url-output-uri"
              value={outputUri}
              readOnly
              rows={4}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
