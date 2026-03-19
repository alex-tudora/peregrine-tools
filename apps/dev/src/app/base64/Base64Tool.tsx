"use client";

import { useState, useCallback } from "react";

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function base64ToUtf8(b64: string): string {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = useCallback(() => {
    setMode("encode");
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      setOutput(utf8ToBase64(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Encoding failed");
      setOutput("");
    }
  }, [input]);

  const handleDecode = useCallback(() => {
    setMode("decode");
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      setOutput(base64ToUtf8(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decoding failed — input is not valid Base64");
      setOutput("");
    }
  }, [input]);

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
        <label htmlFor="base64-input" className="mb-1.5 block text-sm font-medium text-slate-700">
          Input
        </label>
        <textarea
          id="base64-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
          rows={8}
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

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="base64-output" className="text-sm font-medium text-slate-700">
            Output
          </label>
          {output && (
            <button
              onClick={handleCopy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        <textarea
          id="base64-output"
          value={output}
          readOnly
          placeholder="Result will appear here..."
          rows={8}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}
