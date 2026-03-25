import type { Metadata } from "next";
import { ToolCard, RecentActivity } from "@peregrine/ui";

export const metadata: Metadata = {
  description: "The fastest free online PDF tools. Merge, split, compress, and convert PDF files instantly in your browser. No sign-up required.",
  keywords: ["PDF tools", "merge PDF", "split PDF", "compress PDF", "PDF converter", "free online PDF tools", "Peregrine PDF"],
};

const tools = [
  { icon: "\ud83d\udcc4", name: "Merge PDF", description: "Combine multiple PDFs into one document", href: "/merge-pdf" },
  { icon: "\u2702\ufe0f", name: "Split PDF", description: "Extract pages or split into individual files", href: "/split-pdf" },
  { icon: "\ud83d\udddc\ufe0f", name: "Compress PDF", description: "Reduce file size without losing quality", href: "/compress-pdf" },
  { icon: "\ud83d\uddbc\ufe0f", name: "PDF to JPG", description: "Convert PDF pages to JPG images", href: "/pdf-to-jpg" },
  { icon: "\ud83d\udcf8", name: "JPG to PDF", description: "Convert images to a PDF document", href: "/jpg-to-pdf" },
  { icon: "\ud83c\udfa8", name: "PDF to PNG", description: "Convert pages to high-quality PNG images", href: "/pdf-to-png" },
  { icon: "\ud83d\uddbc\ufe0f", name: "PNG to PDF", description: "Convert PNG images to PDF", href: "/png-to-pdf" },
  { icon: "\ud83d\udd04", name: "Rotate PDF", description: "Rotate pages to any angle", href: "/rotate-pdf" },
  { icon: "\ud83d\udca7", name: "Watermark PDF", description: "Add text watermarks to your documents", href: "/watermark-pdf" },
  { icon: "\ud83d\udd13", name: "Unlock PDF", description: "Remove password protection from PDFs", href: "/unlock-pdf" },
  { icon: "\ud83d\udd12", name: "Protect PDF", description: "Add password protection to your PDFs", href: "/protect-pdf" },
  { icon: "\u270d\ufe0f", name: "Sign PDF", description: "Add your signature to PDF documents", href: "/sign-pdf" },
  { icon: "\ud83d\udd22", name: "Page Numbers", description: "Add page numbers to PDF documents", href: "/add-page-numbers" },
];

const siblingHighlights = [
  { name: "Pix", tagline: "Resize, compress & transform images", url: "https://peregrinepix.com" },
  { name: "Kit", tagline: "Text utilities & everyday tools", url: "https://peregrinekit.com" },
  { name: "Vid", tagline: "Compress, trim & convert video", url: "https://peregrinevid.com" },
  { name: "Dev", tagline: "JSON, regex & developer utilities", url: "https://peregrinedev.com" },
];

export default function Home() {
  return (
    <>
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
              The fastest PDF tools
              <br />
              <span className="text-[color:var(--color-accent)]">on the web</span>
            </h1>

            <p className="animate-arrive delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Merge, split, compress, and convert PDF files instantly.
              Processed entirely in your browser.
            </p>
          </div>
        </div>
      </section>

      <RecentActivity />

      {/* Tool Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed text-[color:var(--color-text-primary)]">
            &ldquo;Your files never leave your device.&rdquo;
          </blockquote>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-[color:var(--color-text-muted)]">
            <span><strong className="text-[color:var(--color-text-primary)]">100%</strong> browser-based</span>
            <span><strong className="text-[color:var(--color-text-primary)]">0 bytes</strong> uploaded</span>
            <span><strong className="text-[color:var(--color-text-primary)]">No sign-up</strong> required</span>
          </div>
        </div>
      </section>

      {/* More from Peregrine */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <h2 className="font-semibold text-xl text-[color:var(--color-text-primary)] mb-6">
            More from Peregrine
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siblingHighlights.map((site) => (
              <a
                key={site.url}
                href={site.url}
                className="group rounded-xl bg-[color:var(--color-bg-elevated)] p-4 transition-all duration-200 hover:shadow-[var(--shadow-warm-md)] hover:-translate-y-0.5"
              >
                <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                  {site.name}
                </span>
                <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                  {site.tagline}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
