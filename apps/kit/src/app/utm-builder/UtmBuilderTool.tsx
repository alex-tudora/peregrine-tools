"use client";

import { useState, useMemo, useCallback } from "react";

const COMMON_UTM_VALUES = [
  { parameter: "utm_source", example: "google, facebook, twitter, linkedin, newsletter, bing" },
  { parameter: "utm_medium", example: "cpc, email, social, organic, referral, banner, display" },
  { parameter: "utm_campaign", example: "spring_sale, product_launch, brand_awareness, black_friday" },
  { parameter: "utm_term", example: "running+shoes, best+crm, free+tools (paid search keywords)" },
  { parameter: "utm_content", example: "header_cta, sidebar_link, blue_button, version_a" },
];

function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function UtmBuilderTool() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const urlValid = websiteUrl === "" || isValidUrl(websiteUrl);
  const canGenerate = websiteUrl && source && medium && campaign && urlValid;

  const generatedUrl = useMemo(() => {
    if (!canGenerate) return "";
    try {
      const url = new URL(websiteUrl);
      url.searchParams.set("utm_source", source);
      url.searchParams.set("utm_medium", medium);
      url.searchParams.set("utm_campaign", campaign);
      if (term) url.searchParams.set("utm_term", term);
      if (content) url.searchParams.set("utm_content", content);
      return url.toString();
    } catch {
      return "";
    }
  }, [websiteUrl, source, medium, campaign, term, content, canGenerate]);

  const handleCopy = useCallback(() => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [generatedUrl]);

  return (
    <div className="space-y-8">
      {/* URL Input */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">
            Website URL <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://example.com/landing-page"
            className={`w-full rounded-lg border bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:outline-none focus:ring-1 ${
              !urlValid
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-[color:var(--color-border)] focus:border-emerald-500 focus:ring-emerald-500"
            }`}
          />
          {!urlValid && (
            <p className="mt-1 text-xs text-red-500">Please enter a valid URL including the protocol (https://)</p>
          )}
        </div>

        {/* Required Parameters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">
              utm_source <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. google"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">
              utm_medium <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="e.g. cpc"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">
              utm_campaign <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="e.g. spring_sale"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Optional Parameters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">
              utm_term <span className="text-[color:var(--color-text-muted)] font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="e.g. running+shoes"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">
              utm_content <span className="text-[color:var(--color-text-muted)] font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="e.g. header_cta"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Generated URL */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">Generated URL</h2>
          <button
            onClick={handleCopy}
            disabled={!generatedUrl}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy URL"}
          </button>
        </div>
        <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4">
          {generatedUrl ? (
            <p className="break-all text-sm text-[color:var(--color-text-secondary)] font-mono">{generatedUrl}</p>
          ) : (
            <p className="text-sm text-[color:var(--color-text-muted)]">
              Fill in the website URL and required UTM parameters to generate your campaign URL.
            </p>
          )}
        </div>
      </section>

      {/* Reference Table */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">Common UTM Values Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-[color:var(--color-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[color:var(--color-bg-elevated)]">
                <th className="px-4 py-2.5 text-left font-medium text-[color:var(--color-text-secondary)]">Parameter</th>
                <th className="px-4 py-2.5 text-left font-medium text-[color:var(--color-text-secondary)]">Common Values</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_UTM_VALUES.map((row) => (
                <tr key={row.parameter} className="border-t border-[color:var(--color-border)]">
                  <td className="px-4 py-2.5 font-mono text-xs text-emerald-600 whitespace-nowrap">
                    {row.parameter}
                  </td>
                  <td className="px-4 py-2.5 text-[color:var(--color-text-secondary)]">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
