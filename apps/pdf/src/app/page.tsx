import { ToolCard } from "@peregrine/ui";

const tools = [
  { icon: "📄", name: "Merge PDF", description: "Combine multiple PDFs into one document", href: "/merge-pdf" },
  { icon: "✂️", name: "Split PDF", description: "Extract pages or split into individual files", href: "/split-pdf" },
  { icon: "🗜️", name: "Compress PDF", description: "Reduce file size without losing quality", href: "/compress-pdf" },
  { icon: "🖼️", name: "PDF to JPG", description: "Convert PDF pages to JPG images", href: "/pdf-to-jpg" },
  { icon: "📸", name: "JPG to PDF", description: "Convert images to a PDF document", href: "/jpg-to-pdf" },
  { icon: "🎨", name: "PDF to PNG", description: "Convert pages to high-quality PNG images", href: "/pdf-to-png" },
  { icon: "🖼️", name: "PNG to PDF", description: "Convert PNG images to PDF", href: "/png-to-pdf" },
  { icon: "🔄", name: "Rotate PDF", description: "Rotate pages to any angle", href: "/rotate-pdf" },
  { icon: "💧", name: "Watermark PDF", description: "Add text watermarks to your documents", href: "/watermark-pdf" },
  { icon: "🔓", name: "Unlock PDF", description: "Remove password protection from PDFs", href: "/unlock-pdf" },
  { icon: "🔒", name: "Protect PDF", description: "Add password protection to your PDFs", href: "/protect-pdf" },
  { icon: "✍️", name: "Sign PDF", description: "Add your signature to PDF documents", href: "/sign-pdf" },
  { icon: "🔢", name: "Page Numbers", description: "Add page numbers to PDF documents", href: "/add-page-numbers" },
];

const popularTools = [
  { name: "Merge PDF", href: "/merge-pdf" },
  { name: "Compress PDF", href: "/compress-pdf" },
  { name: "PDF to JPG", href: "/pdf-to-jpg" },
  { name: "Split PDF", href: "/split-pdf" },
];

const siblingHighlights = [
  { name: "Pix", tagline: "Resize, compress & transform images", url: "https://peregrinepix.com", accent: "#7C3AED" },
  { name: "Kit", tagline: "Text utilities & everyday tools", url: "https://peregrinekit.com", accent: "#059669" },
  { name: "Vid", tagline: "Compress, trim & convert video", url: "https://peregrinevid.com", accent: "#E11D48" },
  { name: "Dev", tagline: "JSON, regex & developer utilities", url: "https://peregrinedev.com", accent: "#D97706" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-accent-light)] via-[color:var(--color-bg)] to-[color:var(--color-bg)]" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-descend inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[color:var(--color-border)] bg-white text-xs font-medium text-[color:var(--color-text-secondary)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-success)]" />
              Free &middot; No sign-up &middot; 100% private
            </div>

            <h1 className="animate-arrive font-serif font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[color:var(--color-text-primary)]">
              The fastest PDF tools
              <br />
              <span className="text-[color:var(--color-accent)]">on the web</span>
            </h1>

            <p className="animate-arrive delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Merge, split, compress, and convert PDF files instantly.
              Processed entirely in your browser.
            </p>

            {/* Popular tool pills */}
            <div className="animate-arrive delay-2 mt-8 flex flex-wrap justify-center gap-2">
              {popularTools.map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--color-text-primary)] transition-all duration-200 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-light)]"
                >
                  {tool.name}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section — editorial style */}
      <section className="relative">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }}
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed text-[color:var(--color-text-primary)]">
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
      <section className="relative">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-serif font-semibold text-xl text-[color:var(--color-text-primary)] mb-6">
            More from Peregrine
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siblingHighlights.map((site) => (
              <a
                key={site.url}
                href={site.url}
                className="group flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] bg-white p-4 transition-all duration-200 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
              >
                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: site.accent }}
                  aria-hidden="true"
                />
                <div>
                  <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                    {site.name}
                  </span>
                  <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                    {site.tagline}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
