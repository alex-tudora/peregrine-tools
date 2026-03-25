import type { Metadata } from "next";
import { ToolCard, RecentActivity } from "@peregrine/ui";
import { posts } from "./blog/posts";

export const metadata: Metadata = {
  description: "Free online developer tools. JSON formatter, regex tester, base64 encoder, hash generator, and more. No sign-up required.",
  keywords: ["developer tools", "JSON formatter", "regex tester", "base64 encoder", "hash generator", "free dev tools", "Peregrine Dev"],
};

const dataFormatTools = [
  { icon: "{}", name: "JSON Formatter", description: "Format and beautify JSON", href: "/json-formatter" },
  { icon: "\u2705", name: "JSON Validator", description: "Validate JSON syntax", href: "/json-validator" },
  { icon: "\ud83d\udcca", name: "JSON to CSV", description: "Convert JSON to CSV format", href: "/json-to-csv" },
  { icon: "\ud83d\udccb", name: "CSV to JSON", description: "Convert CSV to JSON format", href: "/csv-to-json" },
  { icon: "\ud83d\udcdd", name: "SQL Formatter", description: "Format SQL queries", href: "/sql-formatter" },
  { icon: "\ud83d\udd00", name: "Diff Checker", description: "Compare two texts", href: "/diff-checker" },
];

const encodeGenerateTools = [
  { icon: "\ud83d\udd10", name: "Base64 Encode/Decode", description: "Encode and decode Base64", href: "/base64" },
  { icon: "\ud83d\udd17", name: "URL Encode/Decode", description: "Encode and decode URLs", href: "/url-encode" },
  { icon: "#\ufe0f\u20e3", name: "Hash Generator", description: "Generate MD5, SHA hashes", href: "/hash-generator" },
  { icon: "\ud83c\udd94", name: "UUID Generator", description: "Generate unique UUIDs", href: "/uuid-generator" },
  { icon: "\ud83d\udd11", name: "Password Generator", description: "Generate secure passwords", href: "/password-generator" },
  { icon: "\ud83d\udd50", name: "Timestamp Converter", description: "Convert Unix timestamps", href: "/timestamp-converter" },
];

const webColorTools = [
  { icon: "\ud83c\udfa8", name: "Color Picker", description: "Pick and convert colors", href: "/color-picker" },
  { icon: "\ud83c\udf08", name: "Color Palette", description: "Generate color palettes", href: "/color-palette" },
  { icon: "\ud83c\udf08", name: "Hex to RGB", description: "Convert hex colors to RGB", href: "/hex-to-rgb" },
  { icon: "\u23f0", name: "Cron Builder", description: "Build cron expressions", href: "/cron-builder" },
  { icon: "\ud83d\udd11", name: "JWT Decoder", description: "Decode JWT tokens", href: "/jwt-decoder" },
  { icon: "\ud83d\udd0d", name: "Regex Tester", description: "Test regular expressions", href: "/regex-tester" },
  { icon: "\ud83d\udcc4", name: "HTML Minifier", description: "Minify HTML code", href: "/html-minifier" },
  { icon: "\ud83c\udfa8", name: "CSS Minifier", description: "Minify CSS code", href: "/css-minifier" },
  { icon: "\u26a1", name: "JS Minifier", description: "Minify JavaScript code", href: "/js-minifier" },
  { icon: "\ud83d\udcdd", name: "Markdown Preview", description: "Preview Markdown as HTML", href: "/markdown-preview" },
];

const allTools = [...dataFormatTools, ...encodeGenerateTools, ...webColorTools];

const siblingHighlights = [
  { name: "PDF", tagline: "Merge, split & compress documents", url: "https://peregrinepdf.com" },
  { name: "Pix", tagline: "Resize, compress & transform images", url: "https://peregrinepix.com" },
  { name: "Kit", tagline: "Text utilities & everyday tools", url: "https://peregrinekit.com" },
  { name: "Vid", tagline: "Compress, trim & convert video", url: "https://peregrinevid.com" },
];

const latestPosts = posts.slice(0, 3);

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: allTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://peregrinedev.com${tool.href}`,
    name: tool.name,
  })),
};

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
              The fastest developer tools
              <br />
              <span className="text-[color:var(--color-accent)]">on the web</span>
            </h1>

            <p className="animate-arrive delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Format, validate, encode, decode, and convert.
              Built for developers, by developers.
            </p>
          </div>
        </div>
      </section>

      <RecentActivity />

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-12 text-center">
        <p className="text-base md:text-lg text-[color:var(--color-text-secondary)] leading-relaxed">
          Peregrine Dev provides 22 free developer utilities — JSON formatter, regex tester,
          base64 encoder, password generator, and more. All tools run in your browser with zero
          data sent to any server.
        </p>
      </section>

      {/* Data & Format */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-2">
          Data &amp; Format
        </h2>
        <p className="text-sm text-[color:var(--color-text-muted)] mb-8">
          Parse, format, and convert data
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dataFormatTools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Encode & Generate */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-2">
          Encode &amp; Generate
        </h2>
        <p className="text-sm text-[color:var(--color-text-muted)] mb-8">
          Encode, decode, hash, and generate
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {encodeGenerateTools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Web & Color */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-2">
          Web &amp; Color
        </h2>
        <p className="text-sm text-[color:var(--color-text-muted)] mb-8">
          Colors, tokens, and web tools
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {webColorTools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Why Peregrine Dev */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] text-center mb-12">
            Why Peregrine Dev
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] text-xl mb-4">
                &#128274;
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">Privacy First</h3>
              <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                Your data never leaves your device. All processing happens locally in your browser — zero bytes sent to any server.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] text-xl mb-4">
                &#9989;
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">100% Free</h3>
              <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                Every tool is completely free with no hidden limits, no watermarks, and no usage restrictions.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] text-xl mb-4">
                &#9889;
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">No Sign-up</h3>
              <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                Start using any tool instantly. No account, no email, no personal information required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)]">
              From the Blog
            </h2>
            <a href="/blog" className="text-sm font-medium text-[color:var(--color-accent)] hover:underline">
              View all posts
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 transition-all hover:border-[color:var(--color-accent)] hover:shadow-sm"
              >
                <div className="flex items-center gap-3 text-xs text-[color:var(--color-text-muted)]">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>&middot;</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-[color:var(--color-text-primary)] group-hover:text-[color:var(--color-accent)] leading-snug">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-sm text-[color:var(--color-text-secondary)] leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </a>
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
