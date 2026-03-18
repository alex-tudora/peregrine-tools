"use client";

import { useState, useMemo, useCallback } from "react";

interface RuleGroup {
  id: string;
  userAgent: string;
  allow: string;
  disallow: string;
  crawlDelay: string;
}

function createRuleGroup(): RuleGroup {
  return {
    id: crypto.randomUUID(),
    userAgent: "*",
    allow: "",
    disallow: "",
    crawlDelay: "",
  };
}

export function RobotsTxtGeneratorTool() {
  const [groups, setGroups] = useState<RuleGroup[]>([createRuleGroup()]);
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const updateGroup = useCallback((id: string, field: keyof RuleGroup, value: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  }, []);

  const addGroup = useCallback(() => {
    setGroups((prev) => [...prev, createRuleGroup()]);
  }, []);

  const removeGroup = useCallback((id: string) => {
    setGroups((prev) => (prev.length > 1 ? prev.filter((g) => g.id !== id) : prev));
  }, []);

  const robotsTxt = useMemo(() => {
    const sections: string[] = [];

    for (const group of groups) {
      const lines: string[] = [];
      lines.push(`User-agent: ${group.userAgent || "*"}`);

      const allowPaths = group.allow
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);
      for (const p of allowPaths) {
        lines.push(`Allow: ${p}`);
      }

      const disallowPaths = group.disallow
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);
      for (const p of disallowPaths) {
        lines.push(`Disallow: ${p}`);
      }

      if (group.crawlDelay) {
        lines.push(`Crawl-delay: ${group.crawlDelay}`);
      }

      sections.push(lines.join("\n"));
    }

    let output = sections.join("\n\n");
    if (sitemapUrl) {
      output += `\n\nSitemap: ${sitemapUrl}`;
    }
    return output;
  }, [groups, sitemapUrl]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(robotsTxt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [robotsTxt]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([robotsTxt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [robotsTxt]);

  return (
    <div className="space-y-8">
      {/* Rule Groups */}
      {groups.map((group, index) => (
        <section
          key={group.id}
          className="space-y-3 rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Rule Group {index + 1}
            </h2>
            {groups.length > 1 && (
              <button
                onClick={() => removeGroup(group.id)}
                className="text-xs text-red-500 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">User-agent</label>
            <input
              type="text"
              value={group.userAgent}
              onChange={(e) => updateGroup(group.id, "userAgent", e.target.value)}
              placeholder="*"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Allow paths <span className="text-slate-400 font-normal">(one per line)</span>
            </label>
            <textarea
              value={group.allow}
              onChange={(e) => updateGroup(group.id, "allow", e.target.value)}
              placeholder={"/\n/public/"}
              rows={3}
              className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 font-mono placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Disallow paths <span className="text-slate-400 font-normal">(one per line)</span>
            </label>
            <textarea
              value={group.disallow}
              onChange={(e) => updateGroup(group.id, "disallow", e.target.value)}
              placeholder={"/admin/\n/private/\n/tmp/"}
              rows={3}
              className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 font-mono placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Crawl-delay <span className="text-slate-400 font-normal">(seconds)</span>
            </label>
            <input
              type="number"
              min="0"
              value={group.crawlDelay}
              onChange={(e) => updateGroup(group.id, "crawlDelay", e.target.value)}
              placeholder="e.g. 10"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </section>
      ))}

      <button
        onClick={addGroup}
        className="w-full rounded-lg border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:border-emerald-400 hover:text-emerald-600"
      >
        + Add Rule Group
      </button>

      {/* Sitemap URL */}
      <div>
        <label className="text-sm font-medium text-slate-700 mb-1 block">Sitemap URL</label>
        <input
          type="url"
          value={sitemapUrl}
          onChange={(e) => setSitemapUrl(e.target.value)}
          placeholder="https://example.com/sitemap.xml"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Generated robots.txt</h2>
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
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 font-mono">
          <code>{robotsTxt}</code>
        </pre>
      </section>
    </div>
  );
}
