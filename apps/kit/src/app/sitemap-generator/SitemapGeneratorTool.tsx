"use client";

import { useState, useMemo, useCallback } from "react";

interface SitemapEntry {
  id: string;
  url: string;
  priority: string;
  changefreq: string;
}

const CHANGEFREQ_OPTIONS = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
];

const PRIORITY_OPTIONS = [
  "0.0", "0.1", "0.2", "0.3", "0.4", "0.5",
  "0.6", "0.7", "0.8", "0.9", "1.0",
];

function createEntry(url = ""): SitemapEntry {
  return {
    id: crypto.randomUUID(),
    url,
    priority: "0.8",
    changefreq: "weekly",
  };
}

export function SitemapGeneratorTool() {
  const [entries, setEntries] = useState<SitemapEntry[]>([createEntry()]);
  const [bulkText, setBulkText] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const [copied, setCopied] = useState(false);

  const addEntry = useCallback(() => {
    setEntries((prev) => [...prev, createEntry()]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev));
  }, []);

  const updateEntry = useCallback(
    (id: string, field: keyof SitemapEntry, value: string) => {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
      );
    },
    []
  );

  const handleBulkAdd = useCallback(() => {
    const urls = bulkText
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);
    if (urls.length > 0) {
      const newEntries = urls.map((url) => createEntry(url));
      setEntries((prev) => [...prev, ...newEntries]);
      setBulkText("");
      setShowBulk(false);
    }
  }, [bulkText]);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const xmlContent = useMemo(() => {
    const validEntries = entries.filter((e) => e.url.trim());
    if (validEntries.length === 0) {
      return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>';
    }

    const urlElements = validEntries
      .map(
        (e) =>
          `  <url>\n    <loc>${escapeXml(e.url.trim())}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
      )
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlElements}\n</urlset>`;
  }, [entries, today]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(xmlContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [xmlContent]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([xmlContent], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
  }, [xmlContent]);

  return (
    <div className="space-y-6">
      {/* URL Entries */}
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-end sm:gap-3"
          >
            <div className="flex-1">
              {index === 0 && (
                <label className="text-xs font-medium text-slate-500 mb-1 block">URL</label>
              )}
              <input
                type="url"
                value={entry.url}
                onChange={(e) => updateEntry(entry.id, "url", e.target.value)}
                placeholder="https://example.com/page"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="w-full sm:w-24">
              {index === 0 && (
                <label className="text-xs font-medium text-slate-500 mb-1 block">Priority</label>
              )}
              <select
                value={entry.priority}
                onChange={(e) => updateEntry(entry.id, "priority", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-28">
              {index === 0 && (
                <label className="text-xs font-medium text-slate-500 mb-1 block">Frequency</label>
              )}
              <select
                value={entry.changefreq}
                onChange={(e) => updateEntry(entry.id, "changefreq", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {CHANGEFREQ_OPTIONS.map((cf) => (
                  <option key={cf} value={cf}>
                    {cf}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => removeEntry(entry.id)}
              disabled={entries.length <= 1}
              className="self-end rounded-lg p-2 text-slate-400 transition-colors hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400"
              aria-label="Remove URL"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={addEntry}
          className="rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:border-emerald-400 hover:text-emerald-600"
        >
          + Add URL
        </button>
        <button
          onClick={() => setShowBulk(!showBulk)}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50"
        >
          {showBulk ? "Hide Bulk Add" : "Bulk Add"}
        </button>
      </div>

      {/* Bulk Add */}
      {showBulk && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 block">
            Paste URLs <span className="text-slate-400 font-normal">(one per line)</span>
          </label>
          <textarea
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder={"https://example.com/\nhttps://example.com/about\nhttps://example.com/blog"}
            rows={5}
            className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 font-mono placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            onClick={handleBulkAdd}
            disabled={!bulkText.trim()}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
          >
            Add URLs
          </button>
        </div>
      )}

      {/* XML Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Generated Sitemap</h2>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Download
            </button>
            <button
              onClick={handleCopy}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
            >
              {copied ? "Copied!" : "Copy XML"}
            </button>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 font-mono">
          <code>{xmlContent}</code>
        </pre>
      </section>
    </div>
  );
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
