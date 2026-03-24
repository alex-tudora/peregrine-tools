"use client";

import { useState, useCallback, useRef } from "react";

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
  const [mode, setMode] = useState<"encode" | "decode" | "file">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileMode = useCallback(() => {
    setMode("file");
    setError("");
    setOutput("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64Part = dataUrl.split(",")[1] ?? "";
      setOutput(base64Part);
    };
    reader.onerror = () => {
      setError("Failed to read file");
      setOutput("");
    };
    reader.readAsDataURL(file);
  }, []);

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
        <label htmlFor="base64-input" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
          {mode === "file" ? "File" : "Input"}
        </label>
        {mode === "file" ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[color:var(--color-border-hover)] bg-[color:var(--color-bg-card)] px-4 py-8">
            <input
              ref={fileInputRef}
              id="base64-input"
              type="file"
              onChange={handleFileChange}
              className="text-sm text-[color:var(--color-text-secondary)] file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-emerald-600 hover:file:bg-emerald-100"
            />
            {fileName && (
              <p className="text-xs text-[color:var(--color-text-muted)]">
                Selected: <span className="font-medium text-[color:var(--color-text-secondary)]">{fileName}</span>
              </p>
            )}
          </div>
        ) : (
          <textarea
            id="base64-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            rows={8}
            spellCheck={false}
            className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleEncode}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] ${
            mode === "encode"
              ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30"
              : "border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-secondary)] hover:border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] ${
            mode === "decode"
              ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30"
              : "border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-secondary)] hover:border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          Decode
        </button>
        <button
          onClick={handleFileMode}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] ${
            mode === "file"
              ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30"
              : "border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-text-secondary)] hover:border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          File
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
          <label htmlFor="base64-output" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
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
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}
