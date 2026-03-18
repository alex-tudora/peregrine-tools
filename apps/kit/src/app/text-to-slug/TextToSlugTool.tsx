"use client";

import { useState, useMemo, useCallback } from "react";

function toSlug(text: string, separator: string, lowercase: boolean): string {
  let slug = text;
  if (lowercase) slug = slug.toLowerCase();
  slug = slug
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-_]/g, "")
    .trim()
    .replace(/[\s_-]+/g, separator)
    .replace(new RegExp(`^${separator === "-" ? "\\-" : separator}+|${separator === "-" ? "\\-" : separator}+$`, "g"), "");
  return slug;
}

export function TextToSlugTool() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => {
    return toSlug(input, separator, lowercase);
  }, [input, separator, lowercase]);

  const handleCopy = useCallback(async () => {
    if (!slug) return;
    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, [slug]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="slug-input" className="mb-1.5 block text-sm font-medium text-slate-700">
          Input text
        </label>
        <input
          id="slug-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your title or phrase here..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div>
            <label htmlFor="slug-separator" className="mb-1.5 block text-sm font-medium text-slate-700">
              Separator
            </label>
            <select
              id="slug-separator"
              value={separator}
              onChange={(e) => setSeparator(e.target.value as "-" | "_")}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
            </select>
          </div>
          <label className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-sm text-slate-700">Lowercase</span>
          </label>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="slug-output" className="text-sm font-medium text-slate-700">
            Generated slug
          </label>
          {slug && (
            <button
              onClick={handleCopy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          )}
        </div>
        <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-700 min-h-[44px]">
          {slug || <span className="text-slate-400">Your slug will appear here...</span>}
        </div>
      </div>
    </div>
  );
}
