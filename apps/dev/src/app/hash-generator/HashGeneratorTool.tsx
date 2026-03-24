"use client";

import { useState, useCallback } from "react";

interface HashValues {
  "SHA-1": string;
  "SHA-256": string;
  "SHA-384": string;
  "SHA-512": string;
}

const algorithms: (keyof HashValues)[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

async function computeHash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashValues | null>(null);
  const [copiedAlgo, setCopiedAlgo] = useState<string | null>(null);

  const handleGenerate = useCallback(async (text: string) => {
    if (!text) {
      setHashes(null);
      return;
    }
    const results = {} as HashValues;
    for (const algo of algorithms) {
      results[algo] = await computeHash(algo, text);
    }
    setHashes(results);
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      handleGenerate(value);
    },
    [handleGenerate]
  );

  const handleCopy = useCallback(async (algo: string, hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedAlgo(algo);
      setTimeout(() => setCopiedAlgo(null), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="hash-input" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
          Input Text
        </label>
        <textarea
          id="hash-input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Type or paste text to hash..."
          rows={6}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-xs text-[color:var(--color-text-muted)]">
        <span className="font-medium text-[color:var(--color-text-secondary)]">Note:</span> MD5 is not available in the
        Web Crypto API because it is considered cryptographically broken. The SHA variants below
        are the recommended alternatives.
      </div>

      {hashes && (
        <div className="space-y-3">
          {algorithms.map((algo) => (
            <div key={algo} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-[color:var(--color-text-secondary)]">{algo}</span>
                <button
                  onClick={() => handleCopy(algo, hashes[algo])}
                  className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
                >
                  {copiedAlgo === algo ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="break-all font-mono text-xs text-[color:var(--color-text-secondary)]">{hashes[algo]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
