import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard, RecentActivity } from "@peregrine/ui";
import { posts } from "./blog/posts";

export const metadata: Metadata = {
  description: "Free online image tools. Compress, resize, crop, convert, and edit images instantly in your browser. No sign-up required.",
  keywords: ["image tools", "compress image", "resize image", "image converter", "PNG to JPG", "remove background", "free online image tools", "Peregrine Pix"],
};

const transformTools = [
  { icon: "\ud83d\udddc\ufe0f", name: "Compress Image", description: "Reduce file size with quality control", href: "/compress-image" },
  { icon: "\ud83d\udcd0", name: "Resize Image", description: "Resize by dimensions or percentage", href: "/resize-image" },
  { icon: "\u2702\ufe0f", name: "Crop Image", description: "Crop with preset ratios or freeform", href: "/crop-image" },
  { icon: "\ud83d\udd03", name: "Flip & Rotate", description: "Flip or rotate images", href: "/flip-rotate" },
  { icon: "\ud83c\udfa8", name: "Image Filters", description: "Adjust brightness, contrast & more", href: "/image-filters" },
  { icon: "\ud83c\udfad", name: "Remove Background", description: "AI-powered background removal", href: "/remove-background" },
  { icon: "\ud83d\udca7", name: "Add Watermark", description: "Add text or image watermarks", href: "/add-watermark" },
];

const convertTools = [
  { icon: "\ud83d\udd04", name: "PNG to JPG", description: "Convert PNG images to JPG", href: "/png-to-jpg" },
  { icon: "\ud83d\udd04", name: "JPG to PNG", description: "Convert JPG to PNG with transparency", href: "/jpg-to-png" },
  { icon: "\ud83d\udd04", name: "WebP to JPG", description: "Convert WebP images to JPG", href: "/webp-to-jpg" },
  { icon: "\ud83d\udd04", name: "WebP to PNG", description: "Convert WebP images to PNG", href: "/webp-to-png" },
  { icon: "\ud83d\udd04", name: "JPG to WebP", description: "Convert JPG to WebP format", href: "/jpg-to-webp" },
  { icon: "\ud83d\udd04", name: "PNG to WebP", description: "Convert PNG to WebP format", href: "/png-to-webp" },
  { icon: "\ud83d\udd04", name: "SVG to PNG", description: "Rasterize SVG at custom resolution", href: "/svg-to-png" },
  { icon: "\ud83c\udf10", name: "Favicon Generator", description: "Generate all favicon sizes", href: "/favicon-generator" },
  { icon: "\ud83d\udd24", name: "Image to Base64", description: "Convert image to base64 string", href: "/image-to-base64" },
];

const allTools = [...transformTools, ...convertTools];

const siblingHighlights = [
  { name: "PDF", tagline: "Merge, split & compress documents", url: "https://peregrinepdf.com" },
  { name: "Kit", tagline: "Text utilities & everyday tools", url: "https://peregrinekit.com" },
  { name: "Vid", tagline: "Compress, trim & convert video", url: "https://peregrinevid.com" },
  { name: "Dev", tagline: "JSON, regex & developer utilities", url: "https://peregrinedev.com" },
];

const trustPillars = [
  { title: "100% Private", description: "Your images never leave your device. All processing happens in your browser." },
  { title: "Instant & Free", description: "No upload wait, no file size limits, no hidden fees. Always free." },
  { title: "No Sign-up", description: "Start using any tool immediately. No account, no email, no friction." },
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Image Tools",
  numberOfItems: allTools.length,
  itemListElement: allTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `https://peregrinepix.com${tool.href}`,
  })),
};

const blogPosts = posts.slice(0, 3);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-accent-light)] via-[color:var(--color-bg)] to-[color:var(--color-bg)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-descend inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-xs font-medium text-[color:var(--color-text-secondary)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-success)]" />
              Free &middot; No sign-up &middot; 100% private
            </div>

            <h1 className="animate-arrive font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[color:var(--color-text-primary)]">
              The fastest image tools
              <br />
              <span className="text-[color:var(--color-accent)]">on the web</span>
            </h1>

            <p className="animate-arrive delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Compress, resize, crop, and convert images instantly.
              Processed entirely in your browser.
            </p>
          </div>
        </div>
      </section>

      <RecentActivity />

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 pt-4">
        <p className="text-base md:text-lg text-[color:var(--color-text-secondary)] leading-relaxed max-w-3xl mx-auto text-center">
          Peregrine Pix provides {allTools.length} free tools to compress, resize, crop, convert,
          and enhance images &mdash; all in your browser. No uploads, no watermarks, no limits.
        </p>
      </section>

      {/* Transform & Edit */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-2 text-center">
          Transform & Edit
        </h2>
        <p className="text-sm text-[color:var(--color-text-secondary)] mb-8 text-center">
          Optimize and manipulate your images
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {transformTools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Convert */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-2 text-center">
          Convert
        </h2>
        <p className="text-sm text-[color:var(--color-text-secondary)] mb-8 text-center">
          Convert between image formats
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {convertTools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Why Peregrine Pix */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-12 text-center">
            Why Peregrine Pix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPillars.map((pillar) => (
              <div key={pillar.title} className="text-center">
                <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Guides */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-8 text-center">
            Latest Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 transition-all duration-200 hover:shadow-[var(--shadow-warm-md)] hover:-translate-y-0.5"
              >
                <time className="text-xs text-[color:var(--color-text-muted)]">{post.date}</time>
                <h3 className="mt-2 font-semibold text-base text-[color:var(--color-text-primary)] group-hover:text-[color:var(--color-accent)] transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More from Peregrine */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <h2 className="font-semibold text-xl text-[color:var(--color-text-primary)] mb-6">More from Peregrine</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siblingHighlights.map((site) => (
              <a key={site.url} href={site.url} className="group rounded-xl bg-[color:var(--color-bg-elevated)] p-4 transition-all duration-200 hover:shadow-[var(--shadow-warm-md)] hover:-translate-y-0.5">
                <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">{site.name}</span>
                <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">{site.tagline}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
