import { ToolCard } from "@peregrine/ui";

const tools = [
  { icon: "\ud83d\udddc\ufe0f", name: "Compress Image", description: "Reduce file size with quality control", href: "/compress-image" },
  { icon: "\ud83d\udcd0", name: "Resize Image", description: "Resize by dimensions or percentage", href: "/resize-image" },
  { icon: "\u2702\ufe0f", name: "Crop Image", description: "Crop with preset ratios or freeform", href: "/crop-image" },
  { icon: "\ud83c\udfad", name: "Remove Background", description: "AI-powered background removal", href: "/remove-background" },
  { icon: "\ud83d\udd04", name: "PNG to JPG", description: "Convert PNG images to JPG", href: "/png-to-jpg" },
  { icon: "\ud83d\udd04", name: "JPG to PNG", description: "Convert JPG to PNG with transparency", href: "/jpg-to-png" },
  { icon: "\ud83d\udd04", name: "WebP to JPG", description: "Convert WebP images to JPG", href: "/webp-to-jpg" },
  { icon: "\ud83d\udd04", name: "WebP to PNG", description: "Convert WebP images to PNG", href: "/webp-to-png" },
  { icon: "\ud83d\udd04", name: "JPG to WebP", description: "Convert JPG to WebP format", href: "/jpg-to-webp" },
  { icon: "\ud83d\udd04", name: "PNG to WebP", description: "Convert PNG to WebP format", href: "/png-to-webp" },
  { icon: "\ud83d\udd04", name: "SVG to PNG", description: "Rasterize SVG at custom resolution", href: "/svg-to-png" },
  { icon: "\ud83d\udca7", name: "Add Watermark", description: "Add text or image watermarks", href: "/add-watermark" },
  { icon: "\ud83d\udd03", name: "Flip & Rotate", description: "Flip or rotate images", href: "/flip-rotate" },
  { icon: "\ud83c\udf10", name: "Favicon Generator", description: "Generate all favicon sizes", href: "/favicon-generator" },
  { icon: "\ud83d\udd24", name: "Image to Base64", description: "Convert image to base64 string", href: "/image-to-base64" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-accent-light)] via-[color:var(--color-bg)] to-[color:var(--color-bg)]" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Small badge/pill */}
            <div className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[color:var(--color-border)] bg-white text-xs font-medium text-[color:var(--color-text-secondary)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-success)]" />
              Free &middot; No sign-up &middot; 100% private
            </div>

            {/* H1 - Playfair Display, large, commanding */}
            <h1 className="animate-fade-in-up font-serif font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[color:var(--color-text-primary)]">
              The fastest image tools
              <br />
              <span className="text-[color:var(--color-accent)]">on the web</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Compress, resize, crop, and convert images instantly.
              Processed entirely in your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Tool Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, index) => (
            <div key={tool.href} className={`animate-slide-up delay-${(index % 3) + 1}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)]">
              Your files never leave your device
            </h2>
            <p className="mt-4 text-[color:var(--color-text-secondary)] leading-relaxed">
              Every tool processes files directly in your browser using Web Workers.
              Nothing is uploaded to any server. Your documents stay private, always.
            </p>

            {/* Three trust pillars */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[color:var(--color-text-primary)]">Lightning Fast</h3>
                <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">Client-side processing with zero upload wait</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[color:var(--color-text-primary)]">100% Private</h3>
                <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">Files never leave your browser</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[color:var(--color-text-primary)]">Completely Free</h3>
                <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">No sign-up, no limits, no hidden fees</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
