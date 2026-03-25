import type { Metadata } from "next";
import { ToolCard, RecentActivity } from "@peregrine/ui";
import { posts } from "./blog/posts";

export const metadata: Metadata = {
  description: "Free online video and audio tools. Convert, compress, trim, and extract audio from videos instantly in your browser. No sign-up required.",
  keywords: ["video tools", "video converter", "compress video", "video to MP3", "trim video", "audio tools", "free online video tools", "Peregrine Vid"],
};

const videoTools = [
  { icon: "\uD83C\uDFAC", name: "Video to MP4", description: "Convert any video to MP4 format", href: "/convert-to-mp4" },
  { icon: "\uD83C\uDF9E\uFE0F", name: "Video to GIF", description: "Convert video clips to animated GIFs", href: "/video-to-gif" },
  { icon: "\uD83D\uDDDC\uFE0F", name: "Compress Video", description: "Reduce video file size", href: "/compress-video" },
  { icon: "\u2702\uFE0F", name: "Trim Video", description: "Cut and trim video clips", href: "/trim-video" },
  { icon: "\uD83C\uDF10", name: "Video to WebM", description: "Convert video to WebM format", href: "/video-to-webm" },
  { icon: "\uD83D\uDCF9", name: "Screen Recorder", description: "Record your screen online", href: "/screen-recorder" },
];

const audioTools = [
  { icon: "\uD83C\uDFB5", name: "Video to MP3", description: "Extract audio from video as MP3", href: "/video-to-mp3" },
  { icon: "\uD83C\uDFA7", name: "Audio to MP3", description: "Convert audio files to MP3", href: "/convert-to-mp3" },
  { icon: "\uD83D\uDD04", name: "WAV to MP3", description: "Convert WAV audio to MP3", href: "/wav-to-mp3" },
  { icon: "\uD83D\uDD04", name: "MP3 to WAV", description: "Convert MP3 audio to WAV", href: "/mp3-to-wav" },
  { icon: "\uD83C\uDFA4", name: "Extract Audio", description: "Extract audio track from video", href: "/extract-audio" },
  { icon: "\uD83D\uDDDC\uFE0F", name: "Compress Audio", description: "Reduce audio file size", href: "/compress-audio" },
  { icon: "\u2702\uFE0F", name: "Trim Audio", description: "Cut audio files to specific times", href: "/trim-audio" },
];

const allTools = [...videoTools, ...audioTools];

const siblingHighlights = [
  { name: "PDF", tagline: "Merge, split & compress documents", url: "https://peregrinepdf.com" },
  { name: "Pix", tagline: "Resize, compress & transform images", url: "https://peregrinepix.com" },
  { name: "Kit", tagline: "Text utilities & everyday tools", url: "https://peregrinekit.com" },
  { name: "Dev", tagline: "JSON, regex & developer utilities", url: "https://peregrinedev.com" },
];

const latestPosts = posts.slice(0, 3);

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: allTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://peregrinevid.com${tool.href}`,
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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8 md:pt-28 md:pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-descend inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-xs font-medium text-[color:var(--color-text-secondary)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-success)]" />
              Free &middot; No sign-up &middot; 100% private
            </div>

            <h1 className="animate-arrive font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[color:var(--color-text-primary)]">
              The fastest video tools
              <br />
              <span className="text-[color:var(--color-accent)]">on the web</span>
            </h1>

            <p className="animate-arrive delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Convert, compress, trim, and edit video and audio files.
              Processed in your browser.
            </p>
          </div>
        </div>
      </section>

      <RecentActivity />

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 pt-4 pb-8 text-center">
        <p className="text-base md:text-lg text-[color:var(--color-text-secondary)] leading-relaxed">
          Peregrine Vid offers 12 free tools to convert, compress, trim, and extract audio from
          video and audio files — processed entirely in your browser using FFmpeg. No uploads,
          no sign-up.
        </p>
      </section>

      {/* Video Tools */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-2">
          Video Tools
        </h2>
        <p className="text-sm text-[color:var(--color-text-muted)] mb-8">
          Convert, compress, and edit video files
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videoTools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Audio Tools */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-2">
          Audio Tools
        </h2>
        <p className="text-sm text-[color:var(--color-text-muted)] mb-8">
          Convert and compress audio files
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {audioTools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Why Peregrine Vid */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] text-center mb-12">
            Why Peregrine Vid
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] text-xl mb-4">
                &#128274;
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">Privacy First</h3>
              <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                Your files never leave your device. All processing happens locally in your browser using FFmpeg WebAssembly.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)] text-xl mb-4">
                &#9989;
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">100% Free</h3>
              <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                Every tool is completely free with no hidden limits, no watermarks, and no file size restrictions.
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
