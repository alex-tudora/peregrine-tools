"use client";

import { useState, useMemo, useCallback } from "react";

export function OpenGraphPreviewTool() {
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [siteName, setSiteName] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [copiedTags, setCopiedTags] = useState(false);

  const displayDomain = useMemo(() => {
    if (!pageUrl) return "example.com";
    try {
      return new URL(pageUrl).hostname;
    } catch {
      return pageUrl;
    }
  }, [pageUrl]);

  const generatedTags = useMemo(() => {
    const lines: string[] = [];
    if (ogTitle) lines.push(`<meta property="og:title" content="${ogTitle}">`);
    if (ogDescription) lines.push(`<meta property="og:description" content="${ogDescription}">`);
    if (ogImage) lines.push(`<meta property="og:image" content="${ogImage}">`);
    if (siteName) lines.push(`<meta property="og:site_name" content="${siteName}">`);
    if (pageUrl) lines.push(`<meta property="og:url" content="${pageUrl}">`);
    lines.push('<meta property="og:type" content="website">');
    lines.push("");
    lines.push('<meta name="twitter:card" content="summary_large_image">');
    if (ogTitle) lines.push(`<meta name="twitter:title" content="${ogTitle}">`);
    if (ogDescription) lines.push(`<meta name="twitter:description" content="${ogDescription}">`);
    if (ogImage) lines.push(`<meta name="twitter:image" content="${ogImage}">`);
    return lines.join("\n");
  }, [ogTitle, ogDescription, ogImage, siteName, pageUrl]);

  const handleCopyTags = useCallback(() => {
    navigator.clipboard.writeText(generatedTags).then(() => {
      setCopiedTags(true);
      setTimeout(() => setCopiedTags(false), 2000);
    });
  }, [generatedTags]);

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">Open Graph Details</h2>
        <div>
          <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">OG Title</label>
          <input
            type="text"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
            placeholder="Your page title"
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">OG Description</label>
          <textarea
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            placeholder="A short description of your page"
            rows={2}
            className="w-full resize-y rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">OG Image URL</label>
          <input
            type="url"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">Site Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="My Website"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-1 block">Page URL</label>
            <input
              type="url"
              value={pageUrl}
              onChange={(e) => setPageUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Preview Cards */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">Platform Previews</h2>

        {/* Facebook Preview */}
        <div>
          <h3 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-2">Facebook</h3>
          <div className="overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)]">
            <div className="aspect-[1.91/1] bg-slate-100 relative">
              {ogImage ? (
                <img
                  src={ogImage}
                  alt="OG preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[color:var(--color-text-muted)] text-sm">
                  No image provided
                </div>
              )}
            </div>
            <div className="px-3 py-2.5 border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]">
              <p className="text-xs text-[color:var(--color-text-muted)] uppercase tracking-wide">{displayDomain}</p>
              <p className="text-sm font-semibold text-[color:var(--color-text-primary)] mt-0.5 line-clamp-1">
                {ogTitle || "Page Title"}
              </p>
              <p className="text-xs text-[color:var(--color-text-muted)] mt-0.5 line-clamp-2">
                {ogDescription || "Page description will appear here."}
              </p>
            </div>
          </div>
        </div>

        {/* Twitter Preview */}
        <div>
          <h3 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-2">Twitter / X</h3>
          <div className="overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)]">
            <div className="aspect-[2/1] bg-slate-100 relative">
              {ogImage ? (
                <img
                  src={ogImage}
                  alt="Twitter preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[color:var(--color-text-muted)] text-sm">
                  No image provided
                </div>
              )}
            </div>
            <div className="px-3 py-2.5 border-t border-[color:var(--color-border)]">
              <p className="text-sm font-semibold text-[color:var(--color-text-primary)] line-clamp-1">
                {ogTitle || "Page Title"}
              </p>
              <p className="text-xs text-[color:var(--color-text-muted)] mt-0.5 line-clamp-2">
                {ogDescription || "Page description will appear here."}
              </p>
              <p className="text-xs text-[color:var(--color-text-muted)] mt-1">{displayDomain}</p>
            </div>
          </div>
        </div>

        {/* LinkedIn Preview */}
        <div>
          <h3 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-2">LinkedIn</h3>
          <div className="overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)]">
            <div className="aspect-[1.91/1] bg-slate-100 relative">
              {ogImage ? (
                <img
                  src={ogImage}
                  alt="LinkedIn preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[color:var(--color-text-muted)] text-sm">
                  No image provided
                </div>
              )}
            </div>
            <div className="px-3 py-2.5 border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]">
              <p className="text-sm font-semibold text-[color:var(--color-text-primary)] line-clamp-2">
                {ogTitle || "Page Title"}
              </p>
              <p className="text-xs text-[color:var(--color-text-muted)] mt-0.5">{displayDomain}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Generated Tags */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">Generated Meta Tags</h2>
          <button
            onClick={handleCopyTags}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            {copiedTags ? "Copied!" : "Copy HTML"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4 text-xs leading-relaxed text-[color:var(--color-text-secondary)]">
          <code>{generatedTags}</code>
        </pre>
      </section>
    </div>
  );
}
