import type { Metadata } from "next";
import { ToolCard } from "@peregrine/ui";
import { generateOrganizationStructuredData, generateWebSiteStructuredData } from "@peregrine/seo";
import { ToolSearch } from "./ToolSearch";

export const metadata: Metadata = {
  description: "89 free online tools for documents, images, video, text, and code. Processed entirely in your browser — no sign-up, no uploads.",
  keywords: ["free online tools", "PDF tools", "image tools", "video tools", "developer tools", "text tools", "browser-based tools", "Peregrine Tools"],
};

/* ------------------------------------------------------------------ */
/*  Site Showcase data (mirrors CrossSiteNav.peregrineSites)           */
/* ------------------------------------------------------------------ */

interface SiteShowcard {
  name: string;
  url: string;
  accent: string;
  tagline: string;
  toolCount: number;
  highlights: { name: string; href: string }[];
}

const sites: SiteShowcard[] = [
  {
    name: "Peregrine PDF",
    url: "https://peregrinepdf.com",
    accent: "#2563EB",
    tagline: "Merge, split & compress documents",
    toolCount: 13,
    highlights: [
      { name: "Merge PDF", href: "https://peregrinepdf.com/merge-pdf" },
      { name: "Compress PDF", href: "https://peregrinepdf.com/compress-pdf" },
      { name: "PDF to JPG", href: "https://peregrinepdf.com/pdf-to-jpg" },
      { name: "Sign PDF", href: "https://peregrinepdf.com/sign-pdf" },
    ],
  },
  {
    name: "Peregrine Pix",
    url: "https://peregrinepix.com",
    accent: "#7C3AED",
    tagline: "Resize, compress & transform images",
    toolCount: 15,
    highlights: [
      { name: "Compress Image", href: "https://peregrinepix.com/compress-image" },
      { name: "Resize Image", href: "https://peregrinepix.com/resize-image" },
      { name: "Remove Background", href: "https://peregrinepix.com/remove-background" },
      { name: "PNG to JPG", href: "https://peregrinepix.com/png-to-jpg" },
    ],
  },
  {
    name: "Peregrine Kit",
    url: "https://peregrinekit.com",
    accent: "#059669",
    tagline: "Text utilities & everyday tools",
    toolCount: 30,
    highlights: [
      { name: "QR Code Generator", href: "https://peregrinekit.com/qr-code-generator" },
      { name: "Word Counter", href: "https://peregrinekit.com/word-counter" },
      { name: "Case Converter", href: "https://peregrinekit.com/case-converter" },
      { name: "Unit Converter", href: "https://peregrinekit.com/unit-converter" },
    ],
  },
  {
    name: "Peregrine Vid",
    url: "https://peregrinevid.com",
    accent: "#E11D48",
    tagline: "Compress, trim & convert video",
    toolCount: 12,
    highlights: [
      { name: "Compress Video", href: "https://peregrinevid.com/compress-video" },
      { name: "Video to MP3", href: "https://peregrinevid.com/video-to-mp3" },
      { name: "Video to GIF", href: "https://peregrinevid.com/video-to-gif" },
      { name: "Trim Video", href: "https://peregrinevid.com/trim-video" },
    ],
  },
  {
    name: "Peregrine Dev",
    url: "https://peregrinedev.com",
    accent: "#D97706",
    tagline: "JSON, regex & developer utilities",
    toolCount: 19,
    highlights: [
      { name: "JSON Formatter", href: "https://peregrinedev.com/json-formatter" },
      { name: "Regex Tester", href: "https://peregrinedev.com/regex-tester" },
      { name: "Base64 Encode/Decode", href: "https://peregrinedev.com/base64" },
      { name: "JWT Decoder", href: "https://peregrinedev.com/jwt-decoder" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Popular Tools (curated 8)                                          */
/* ------------------------------------------------------------------ */

const popularTools = [
  { icon: "\ud83d\udd00", name: "Merge PDF", description: "Combine multiple PDFs into one file", href: "https://peregrinepdf.com/merge-pdf" },
  { icon: "\ud83d\uddbc\ufe0f", name: "Compress Image", description: "Compress images without losing quality", href: "https://peregrinepix.com/compress-image" },
  { icon: "\ud83d\uddbc\ufe0f", name: "PDF to JPG", description: "Convert PDF pages to JPG images", href: "https://peregrinepdf.com/pdf-to-jpg" },
  { icon: "\ud83c\udfb5", name: "Video to MP3", description: "Extract audio from video files", href: "https://peregrinevid.com/video-to-mp3" },
  { icon: "\ud83c\udfa8", name: "JSON Formatter", description: "Format and beautify JSON data", href: "https://peregrinedev.com/json-formatter" },
  { icon: "\ud83d\udcf1", name: "QR Code Generator", description: "Generate QR codes instantly", href: "https://peregrinekit.com/qr-code-generator" },
  { icon: "\ud83d\uddbc\ufe0f", name: "Resize Image", description: "Resize images to any dimension", href: "https://peregrinepix.com/resize-image" },
  { icon: "\ud83c\udfa5", name: "Compress Video", description: "Reduce video file size", href: "https://peregrinevid.com/compress-video" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationStructuredData()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteStructuredData()) }}
      />

      {/* ============================================================
          1. Hero + Search Bar
          ============================================================ */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-b from-[color:var(--color-accent-light)] via-[color:var(--color-bg)] to-[color:var(--color-bg)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="animate-arrive font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[color:var(--color-text-primary)]">
              The fastest way to work
              <br />
              <span className="text-[color:var(--color-accent)]">with any file.</span>
            </h1>

            <p className="animate-arrive delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              89 free tools for documents, images, video, text, and code.
              Processed in your browser.
            </p>

            <div className="animate-arrive delay-2 mt-10">
              <ToolSearch />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. Site Showcase — "Five Sites, One Family"
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="animate-arrive font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] text-center mb-12">
          Five sites, one family
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site, i) => (
            <div
              key={site.name}
              className={`animate-arrive delay-${i + 1} rounded-2xl bg-[color:var(--color-bg-card)] shadow-[var(--shadow-warm-sm)] transition-all duration-300 ease-[var(--ease-peregrine)] hover:-translate-y-1 hover:shadow-[var(--shadow-warm-lg)] overflow-hidden`}
            >
              {/* Accent top border */}
              <div className="h-[3px]" style={{ backgroundColor: site.accent }} />

              <div className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-[15px] text-[color:var(--color-text-primary)]">
                    {site.name}
                  </h3>
                  <span className="text-xs font-medium text-[color:var(--color-text-muted)]">
                    {site.toolCount} tools
                  </span>
                </div>

                <p className="text-sm text-[color:var(--color-text-muted)] mb-4">
                  {site.tagline}
                </p>

                {/* Highlighted tools */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {site.highlights.map((tool) => (
                    <a
                      key={tool.href}
                      href={tool.href}
                      className="inline-block text-xs font-medium px-2.5 py-1 rounded-lg bg-[color:var(--color-bg-elevated)] text-[color:var(--color-text-secondary)] transition-colors hover:text-[color:var(--color-accent)]"
                    >
                      {tool.name}
                    </a>
                  ))}
                </div>

                <a
                  href={site.url}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-accent)]"
                >
                  View all
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          3. Popular Tools (curated 8)
          ============================================================ */}
      <section className="bg-[color:var(--color-bg-elevated)]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] text-center mb-12">
            Popular tools
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularTools.map((tool, i) => (
              <div key={tool.href} className={`animate-arrive delay-${(i % 4) + 1}`}>
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          4. Why Peregrine — Trust & Differentiation
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Pillar 1: Privacy */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] mb-4">
              <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">
              100% private
            </h3>
            <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
              Your files never leave your device. No uploads, no servers, no cloud.
            </p>
          </div>

          {/* Pillar 2: Free */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] mb-4">
              <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">
              Instant & free
            </h3>
            <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
              No sign-up, no watermarks, no limits. Open and use.
            </p>
          </div>

          {/* Pillar 3: Purpose-built */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] mb-4">
              <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">
              Purpose-built
            </h3>
            <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
              Five expert sites, each deep in its domain. Not shallow gimmicks.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. Closing Statement
          ============================================================ */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-2xl md:text-3xl font-medium leading-relaxed text-[color:var(--color-text-primary)]">
            89 tools. 5 sites. Zero uploads. Always free.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-[color:var(--color-text-muted)]">
            <span>100% browser-based</span>
            <span aria-hidden="true">&middot;</span>
            <span>No sign-up</span>
            <span aria-hidden="true">&middot;</span>
            <span>Free forever</span>
          </div>
        </div>
      </section>
    </>
  );
}
