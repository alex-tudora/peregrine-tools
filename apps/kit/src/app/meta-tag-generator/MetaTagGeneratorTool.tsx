"use client";

import { useState, useMemo, useCallback } from "react";

export function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [viewport, setViewport] = useState("width=device-width, initial-scale=1.0");
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);
  const [canonical, setCanonical] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogType, setOgType] = useState("website");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [copied, setCopied] = useState(false);

  const generatedTags = useMemo(() => {
    const lines: string[] = [];
    lines.push('<meta charset="UTF-8">');
    if (viewport) lines.push(`<meta name="viewport" content="${viewport}">`);
    if (title) lines.push(`<title>${title}</title>`);
    if (description) lines.push(`<meta name="description" content="${description}">`);
    if (keywords) lines.push(`<meta name="keywords" content="${keywords}">`);
    if (author) lines.push(`<meta name="author" content="${author}">`);

    const robotsValue = `${robotsIndex ? "index" : "noindex"}, ${robotsFollow ? "follow" : "nofollow"}`;
    lines.push(`<meta name="robots" content="${robotsValue}">`);

    if (canonical) lines.push(`<link rel="canonical" href="${canonical}">`);

    // Open Graph
    const effectiveOgTitle = ogTitle || title;
    const effectiveOgDescription = ogDescription || description;
    if (effectiveOgTitle) lines.push(`<meta property="og:title" content="${effectiveOgTitle}">`);
    if (effectiveOgDescription) lines.push(`<meta property="og:description" content="${effectiveOgDescription}">`);
    if (ogImage) lines.push(`<meta property="og:image" content="${ogImage}">`);
    if (ogType) lines.push(`<meta property="og:type" content="${ogType}">`);
    if (canonical) lines.push(`<meta property="og:url" content="${canonical}">`);

    // Twitter Card
    lines.push(`<meta name="twitter:card" content="${twitterCard}">`);
    if (effectiveOgTitle) lines.push(`<meta name="twitter:title" content="${effectiveOgTitle}">`);
    if (effectiveOgDescription) lines.push(`<meta name="twitter:description" content="${effectiveOgDescription}">`);
    if (ogImage) lines.push(`<meta name="twitter:image" content="${ogImage}">`);

    return lines.join("\n");
  }, [title, description, keywords, author, viewport, robotsIndex, robotsFollow, canonical, ogTitle, ogDescription, ogImage, ogType, twitterCard]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedTags).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [generatedTags]);

  return (
    <div className="space-y-8">
      {/* Basic Meta Tags */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Basic Meta Tags</h2>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Page Title</label>
              <span className={`text-xs ${title.length > 60 ? "text-red-500 font-semibold" : "text-slate-400"}`}>
                {title.length}/60
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your page title"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Meta Description</label>
              <span className={`text-xs ${description.length > 160 ? "text-red-500 font-semibold" : "text-slate-400"}`}>
                {description.length}/160
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of your page"
              rows={3}
              className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Keywords</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Viewport</label>
            <input
              type="text"
              value={viewport}
              onChange={(e) => setViewport(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Robots</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={robotsIndex}
                  onChange={(e) => setRobotsIndex(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                />
                Index
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={robotsFollow}
                  onChange={(e) => setRobotsFollow(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                />
                Follow
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Canonical URL</label>
            <input
              type="url"
              value={canonical}
              onChange={(e) => setCanonical(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Open Graph Tags */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Open Graph Tags</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">OG Title</label>
            <input
              type="text"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              placeholder="Defaults to page title if empty"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">OG Description</label>
            <textarea
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              placeholder="Defaults to meta description if empty"
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

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">OG Type</label>
            <select
              value={ogType}
              onChange={(e) => setOgType(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="product">product</option>
              <option value="profile">profile</option>
              <option value="book">book</option>
              <option value="music.song">music.song</option>
              <option value="video.movie">video.movie</option>
            </select>
          </div>
        </div>
      </section>

      {/* Twitter Card */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Twitter Card</h2>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">Card Type</label>
          <select
            value={twitterCard}
            onChange={(e) => setTwitterCard(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="summary">summary</option>
            <option value="summary_large_image">summary_large_image</option>
            <option value="app">app</option>
            <option value="player">player</option>
          </select>
        </div>
      </section>

      {/* Generated Output */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Generated Meta Tags</h2>
          <button
            onClick={handleCopy}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            {copied ? "Copied!" : "Copy HTML"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
          <code>{generatedTags}</code>
        </pre>
      </section>
    </div>
  );
}
