"use client";

import { useState, useCallback } from "react";

function generateUuidV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback implementation
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 1
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [copied, setCopied] = useState(false);

  const formatUuid = useCallback(
    (uuid: string): string => {
      let result = hyphens ? uuid : uuid.replace(/-/g, "");
      return uppercase ? result.toUpperCase() : result.toLowerCase();
    },
    [uppercase, hyphens]
  );

  const handleGenerate = useCallback(() => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUuidV4());
    }
    setUuids(newUuids);
  }, [count]);

  const formattedOutput = uuids.map(formatUuid).join("\n");

  const handleCopy = useCallback(async () => {
    if (!formattedOutput) return;
    try {
      await navigator.clipboard.writeText(formattedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, [formattedOutput]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="uuid-count" className="mb-1.5 block text-sm font-medium text-slate-700">
            Quantity
          </label>
          <input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-24 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <label className="flex items-center gap-2 pb-1 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
          />
          Uppercase
        </label>

        <label className="flex items-center gap-2 pb-1 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={hyphens}
            onChange={(e) => setHyphens(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
          />
          Include hyphens
        </label>
      </div>

      <button
        onClick={handleGenerate}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        Generate UUID{count > 1 ? "s" : ""}
      </button>

      {uuids.length > 0 && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="uuid-output" className="text-sm font-medium text-slate-700">
              Generated UUID{uuids.length > 1 ? "s" : ""}
            </label>
            <button
              onClick={handleCopy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            id="uuid-output"
            value={formattedOutput}
            readOnly
            rows={Math.min(uuids.length + 1, 15)}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      )}
    </div>
  );
}
