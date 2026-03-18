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
        <h2 className="text-lg font-semibold text-slate-900">Open Graph Details</h2>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">OG Title</label>
          <input
            type="text"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
            placeholder="Your page title"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">OG Description</label>
          <textarea
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            placeholder="A short description of your page"
            rows={2}
            className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">OG Image URL</label>
          <input
            type="url"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Site Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="My Website"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Page URL</label>
            <input
              type="url"
              value={pageUrl}
              onChange={(e) => setPageUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Preview Cards */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Platform Previews</h2>

        {/* Facebook Preview */}
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-2">Facebook</h3>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
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
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  No image provided
                </div>
              )}
            </div>
            <div className="px-3 py-2.5 border-t border-slate-100 bg-slate-50">
              <p className="text-xs text-slate-500 uppercase tracking-wide">{displayDomain}</p>
              <p className="text-sm font-semibold text-slate-900 mt-0.5 line-clamp-1">
                {ogTitle || "Page Title"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                {ogDescription || "Page description will appear here."}
              </p>
            </div>
          </div>
        </div>

        {/* Twitter Preview */}
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-2">Twitter / X</h3>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
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
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  No image provided
                </div>
              )}
            </div>
            <div className="px-3 py-2.5 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                {ogTitle || "Page Title"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                {ogDescription || "Page description will appear here."}
              </p>
              <p className="text-xs text-slate-400 mt-1">{displayDomain}</p>
            </div>
          </div>
        </div>

        {/* LinkedIn Preview */}
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-2">LinkedIn</h3>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
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
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  No image provided
                </div>
              )}
            </div>
            <div className="px-3 py-2.5 border-t border-slate-100 bg-slate-50">
              <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                {ogTitle || "Page Title"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{displayDomain}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Generated Tags */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Generated Meta Tags</h2>
          <button
            onClick={handleCopyTags}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            {copiedTags ? "Copied!" : "Copy HTML"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
          <code>{generatedTags}</code>
        </pre>
      </section>
    </div>
  );
}
