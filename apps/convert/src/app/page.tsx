import type { Metadata } from "next";
import { KnightLogo } from "./KnightLogo";
import { ConvertPicker } from "./ConvertPicker";
import { RotatingQuote } from "./RotatingQuote";

export const metadata: Metadata = {
  description: "The fastest free online file converter. Convert between PDF, images, video, audio, and data formats instantly. No sign-up, no upload.",
  keywords: ["file converter", "PDF converter", "image converter", "video converter", "audio converter", "free online converter", "Convert-a-Lot"],
};

const popularConversions = [
  { from: "PDF", to: "JPG", label: "PDF to JPG", href: "/pdf-to-jpg" },
  { from: "JPG", to: "PDF", label: "JPG to PDF", href: "/jpg-to-pdf" },
  { from: "PNG", to: "JPG", label: "PNG to JPG", href: "/png-to-jpg" },
  { from: "MP4", to: "MP3", label: "Video to MP3", href: "/mp4-to-mp3" },
  { from: "WAV", to: "MP3", label: "WAV to MP3", href: "/wav-to-mp3" },
  { from: "MP4", to: "GIF", label: "Video to GIF", href: "/mp4-to-gif" },
  { from: "WebP", to: "JPG", label: "WebP to JPG", href: "/webp-to-jpg" },
  { from: "PNG", to: "WebP", label: "PNG to WebP", href: "/png-to-webp" },
  { from: "JSON", to: "CSV", label: "JSON to CSV", href: "/json-to-csv" },
  { from: "SVG", to: "PNG", label: "SVG to PNG", href: "/svg-to-png" },
  { from: "PDF", to: "PNG", label: "PDF to PNG", href: "/pdf-to-png" },
  { from: "JPG", to: "PNG", label: "JPG to PNG", href: "/jpg-to-png" },
];

const categories = [
  {
    emoji: "\u{1F4C4}",
    title: "Files",
    description: "Converting documents since the Middle Ages. Well, 2024. Same thing.",
    href: "/pdf-to-jpg",
  },
  {
    emoji: "\u{1F4D0}",
    title: "Units",
    description: "He doesn't understand the metric system. He just converts it.",
    href: "/km-to-miles",
  },
  {
    emoji: "\u{1F4B0}",
    title: "Currency",
    description: "The knight knows nothing about economics, but the math checks out.",
    href: "/usd-to-eur",
  },
  {
    emoji: "\u{1F550}",
    title: "Time",
    description: "Ask him about the jousting incident. Actually, don't. Just convert your timezone.",
    href: "/est-to-utc",
  },
  {
    emoji: "\u{1F3A8}",
    title: "Color",
    description: "A PNG by any other name would still be a JPG. We can make that happen.",
    href: "/hex-to-rgb",
  },
  {
    emoji: "\u{1F4DD}",
    title: "Text",
    description: "Drag. Drop. Doth done.",
    href: "/text-to-uppercase",
  },
  {
    emoji: "\u{1F522}",
    title: "Numbers",
    description: "He may have failed knight school but he graduated top of his class in binary.",
    href: "/decimal-to-binary",
  },
  {
    emoji: "\u{1F4BB}",
    title: "Code",
    description: "Forged in fire. By which we mean a laptop that runs kind of hot.",
    href: "/json-to-csv",
  },
];

const blogPosts = [
  {
    title: "The Ultimate Guide to File Conversion in 2026",
    description: "Everything you need to know about converting documents, images, video, and audio files.",
    href: "/blog/file-conversion-guide",
  },
  {
    title: "Video and Audio Formats Explained",
    description: "A clear breakdown of MP4, MP3, WAV, WebM, and more — when to use each and how to convert.",
    href: "/blog/video-audio-format-differences",
  },
  {
    title: "Image Format Conversion: PNG vs JPG vs WebP",
    description: "Quality vs size trade-offs and practical tips for converting between image formats.",
    href: "/blog/image-format-conversion-tips",
  },
];

export default function Home() {
  return (
    <>
      {/* === STRUCTURED DATA === */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Popular Conversions",
            numberOfItems: popularConversions.length,
            itemListElement: popularConversions.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.label,
              url: `https://convert-a-lot.com${c.href}`,
            })),
          }),
        }}
      />

      {/* === HERO + PICKER === */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-accent-light)] via-[color:var(--color-bg)] to-[color:var(--color-bg)]" />
        {/* Decorative blobs */}
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-[color:var(--color-accent)]/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-40 right-[15%] w-48 h-48 bg-[color:var(--color-accent-glow)] rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 pt-10 pb-20 md:pt-16 md:pb-24">
          <div className="text-center">
            {/* Brand mark */}
            <div className="animate-arrive inline-block mb-1">
              <KnightLogo size={120} />
            </div>

            {/* Headline */}
            <h1 className="animate-arrive font-display font-semibold text-4xl sm:text-5xl leading-[1.1] tracking-tight text-[color:var(--color-text-primary)]">
              Bad at jousting.
              <br />
              <span className="text-[color:var(--color-accent)]">Great at converting.</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-arrive delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Pick your format, pick your target, and go.
              He&apos;s not much of a knight, but he&apos;s fast, private, and free.
            </p>
          </div>

          {/* Picker */}
          <div className="animate-arrive delay-2 mt-10">
            <ConvertPicker />
          </div>

          {/* Rotating knight quote below picker */}
          <div className="animate-arrive delay-3 mt-6 text-center">
            <RotatingQuote />
          </div>
        </div>
      </section>

      {/* === CONVERSION CATEGORIES === */}
      <section className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)]">
              What are we converting today?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <a
                key={cat.title}
                href={cat.href}
                className={`animate-arrive delay-${Math.min((i % 4) + 1, 6)} group relative flex flex-col gap-3 p-5 rounded-2xl bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--shadow-warm-md)] hover:-translate-y-0.5 transition-all duration-200`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{cat.emoji}</span>
                  <h3 className="font-display font-bold text-lg text-[color:var(--color-text-primary)] group-hover:text-[color:var(--color-accent)] transition-colors">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                  {cat.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === POPULAR CONVERSIONS === */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)]">
              Popular conversions
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {popularConversions.map((c, i) => (
              <a
                key={`${c.from}-${c.to}`}
                href={c.href}
                className={`animate-arrive delay-${Math.min((i % 4) + 1, 6)} group relative flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--shadow-warm-md)] hover:-translate-y-0.5 transition-all duration-200`}
              >
                <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">{c.from}</span>
                <svg className="w-3.5 h-3.5 text-[color:var(--color-accent)] shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">{c.to}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Step 1: Pick formats */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] mb-4">
                <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">
                Pick your formats
              </h3>
              <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
                Choose what you have and what you need. 28 conversion paths across documents, images, video, audio, and data. The one thing he trained for.
              </p>
            </div>

            {/* Step 2: We match the right tool */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] mb-4">
                <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">
                We load the right tool
              </h3>
              <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
                Convert-a-Lot loads the exact converter you need — right here, no redirects. He&apos;s surprisingly smart about this part.
              </p>
            </div>

            {/* Step 3: Convert in your browser */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] mb-4">
                <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">
                Convert in your browser
              </h3>
              <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
                Your file is processed locally. Nothing is uploaded. Finally, a knight you can trust with your files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === TRUST SECTION (Knight-themed) === */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)] text-center mb-12">
            Why Convert-a-Lot
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Privacy */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] mb-4">
                <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg text-[color:var(--color-text-primary)] mb-2">
                No lords. No ads. No nonsense.
              </h3>
              <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
                Your files never leave your device. Everything is processed in your browser — no uploads, no servers, no tracking.
              </p>
            </div>

            {/* Free */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] mb-4">
                <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg text-[color:var(--color-text-primary)] mb-2">
                No signup required. Not even a blood oath.
              </h3>
              <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
                No watermarks, no file-size limits, no paywalls. Convert as many files as you need, forever. Completely free.
              </p>
            </div>

            {/* Trust */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[color:var(--color-accent-light)] mb-4">
                <svg className="w-6 h-6 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg text-[color:var(--color-text-primary)] mb-2">
                Knighted by nobody. Trusted by thousands.
              </h3>
              <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed max-w-xs mx-auto">
                No account, no email, no cookies to accept. Open the page, convert your file, and go. It&apos;s that simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === LATEST GUIDES (Blog) === */}
      <section className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)] text-center mb-12">
            Latest Guides
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {blogPosts.map((post, i) => (
              <a
                key={post.href}
                href={post.href}
                className={`animate-arrive delay-${i + 1} group block rounded-2xl bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] p-6 transition-all duration-200 hover:border-[color:var(--color-accent)]/30 hover:shadow-[var(--shadow-warm-md)] hover:-translate-y-0.5`}
              >
                <h3 className="font-semibold text-[15px] text-[color:var(--color-text-primary)] group-hover:text-[color:var(--color-accent)] transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                  {post.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === KNIGHT CLOSING === */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <KnightLogo size={64} className="mx-auto mb-6 opacity-80" />
          <p className="font-display font-semibold text-2xl md:text-3xl leading-relaxed text-[color:var(--color-text-primary)]">
            Sir Converts-a-Lot, at your service.
          </p>
          <p className="mt-3 text-base text-[color:var(--color-text-muted)] italic font-display">
            Tips not accepted. Neither is payment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-[color:var(--color-text-muted)]">
            <span>100% browser-based</span>
            <span aria-hidden="true">&middot;</span>
            <span>No sign-up</span>
            <span aria-hidden="true">&middot;</span>
            <span>Files stay on your device</span>
          </div>
        </div>
      </section>
    </>
  );
}
