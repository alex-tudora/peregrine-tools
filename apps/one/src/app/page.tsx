import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description:
    "Every Peregrine tool on one domain, grouped by category. A consolidation proof-of-concept — same tools, single authority-compounding domain.",
};

/*
 * Consolidation PoC homepage.
 *
 * In the current 7-domain setup this content is split across peregrinepdf.com,
 * peregrinepix.com, peregrinekit.com, etc. Here it lives under one origin with
 * category subfolders. Tools marked `live: true` are actually mounted in this
 * PoC (proving the tool components port unchanged); the rest illustrate where
 * the remaining 100+ tools would slot in during a full migration.
 */
interface Tool {
  name: string;
  href: string;
  live?: boolean;
}
interface Category {
  slug: string;
  title: string;
  blurb: string;
  icon: string;
  tools: Tool[];
}

const categories: Category[] = [
  {
    slug: "pdf",
    title: "PDF",
    blurb: "Merge, split, compress, convert & sign documents",
    icon: "📄",
    tools: [
      { name: "Merge PDF", href: "/pdf/merge-pdf" },
      { name: "Split PDF", href: "/pdf/split-pdf" },
      { name: "Compress PDF", href: "/pdf/compress-pdf" },
      { name: "PDF to JPG", href: "/pdf/pdf-to-jpg" },
    ],
  },
  {
    slug: "image",
    title: "Image",
    blurb: "Compress, resize, crop & convert images",
    icon: "🖼️",
    tools: [
      { name: "Compress Image", href: "/image/compress-image" },
      { name: "Resize Image", href: "/image/resize-image" },
      { name: "PNG to JPG", href: "/image/png-to-jpg" },
      { name: "Remove Background", href: "/image/remove-background" },
    ],
  },
  {
    slug: "video",
    title: "Video & Audio",
    blurb: "Compress, trim & convert media",
    icon: "🎬",
    tools: [
      { name: "Compress Video", href: "/video/compress-video" },
      { name: "Video to MP3", href: "/video/video-to-mp3" },
      { name: "Video to GIF", href: "/video/video-to-gif" },
      { name: "Trim Video", href: "/video/trim-video" },
    ],
  },
  {
    slug: "dev",
    title: "Developer",
    blurb: "JSON, regex, encoding & developer utilities",
    icon: "⚙️",
    tools: [
      { name: "JSON Formatter", href: "/dev/json-formatter", live: true },
      { name: "Regex Tester", href: "/dev/regex-tester" },
      { name: "Base64 Encode/Decode", href: "/dev/base64" },
      { name: "JWT Decoder", href: "/dev/jwt-decoder" },
    ],
  },
  {
    slug: "text",
    title: "Text & Kit",
    blurb: "Word counting, case conversion & everyday utilities",
    icon: "✍️",
    tools: [
      { name: "Word Counter", href: "/text/word-counter", live: true },
      { name: "Case Converter", href: "/text/case-converter" },
      { name: "QR Code Generator", href: "/text/qr-code-generator" },
      { name: "Markdown to HTML", href: "/text/markdown-to-html" },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-3 py-1 text-xs font-medium text-[color:var(--color-text-muted)]">
          Consolidation proof-of-concept
        </span>
        <h1 className="mt-5 font-semibold text-4xl md:text-5xl text-[color:var(--color-text-primary)]">
          One domain. Every tool.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[color:var(--color-text-secondary)] leading-relaxed">
          The same 106 Peregrine tools, served from a single origin under category
          subfolders instead of five separate domains. Every internal link keeps its
          authority on one domain, and navigation between tools is instant and
          client-side.
        </p>
      </div>

      <div className="mt-14 space-y-12">
        {categories.map((cat) => (
          <section key={cat.slug}>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl" aria-hidden>
                {cat.icon}
              </span>
              <h2 className="font-semibold text-2xl text-[color:var(--color-text-primary)]">
                {cat.title}
              </h2>
              <span className="text-sm text-[color:var(--color-text-muted)]">
                /{cat.slug}
              </span>
            </div>
            <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
              {cat.blurb}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {cat.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                    tool.live
                      ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)]"
                      : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)]"
                  }`}
                >
                  <span className="text-sm font-medium text-[color:var(--color-text-primary)]">
                    {tool.name}
                  </span>
                  {tool.live ? (
                    <span className="rounded-full bg-[color:var(--color-accent)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Live
                    </span>
                  ) : (
                    <span className="text-xs text-[color:var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-6 text-sm text-[color:var(--color-text-secondary)]">
        <p className="font-semibold text-[color:var(--color-text-primary)]">
          What this proves
        </p>
        <ul className="mt-3 space-y-1.5 list-disc pl-5">
          <li>
            Category-subfolder routing (<code>/text/word-counter</code>,{" "}
            <code>/dev/json-formatter</code>) works with the existing shared{" "}
            <code>@peregrine/ui</code> and <code>@peregrine/seo</code> packages.
          </li>
          <li>
            The two <span className="font-medium">Live</span> tools are the real{" "}
            spoke-site components mounted unchanged — only the page wrapper&apos;s
            URL and canonical changed.
          </li>
          <li>
            All navigation is same-origin, so link equity compounds on one domain
            instead of splitting across five. See{" "}
            <code>apps/one/MIGRATION.md</code> for the full tradeoff analysis.
          </li>
        </ul>
      </div>
    </div>
  );
}
