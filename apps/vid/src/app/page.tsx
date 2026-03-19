import { ToolCard } from "@peregrine/ui";

const videoTools = [
  { icon: "\uD83C\uDFAC", name: "Video to MP4", description: "Convert any video to MP4 format", href: "/convert-to-mp4" },
  { icon: "\uD83C\uDFB5", name: "Video to MP3", description: "Extract audio from video as MP3", href: "/video-to-mp3" },
  { icon: "\uD83C\uDF9E\uFE0F", name: "Video to GIF", description: "Convert video clips to animated GIFs", href: "/video-to-gif" },
  { icon: "\uD83D\uDDDC\uFE0F", name: "Compress Video", description: "Reduce video file size", href: "/compress-video" },
  { icon: "\u2702\uFE0F", name: "Trim Video", description: "Cut and trim video clips", href: "/trim-video" },
  { icon: "\uD83C\uDFA7", name: "Audio to MP3", description: "Convert audio files to MP3", href: "/convert-to-mp3" },
  { icon: "\uD83D\uDD04", name: "WAV to MP3", description: "Convert WAV audio to MP3", href: "/wav-to-mp3" },
  { icon: "\uD83D\uDD04", name: "MP3 to WAV", description: "Convert MP3 audio to WAV", href: "/mp3-to-wav" },
  { icon: "\uD83C\uDFA4", name: "Extract Audio", description: "Extract audio track from video", href: "/extract-audio" },
  { icon: "\uD83D\uDDDC\uFE0F", name: "Compress Audio", description: "Reduce audio file size", href: "/compress-audio" },
  { icon: "\uD83C\uDF10", name: "Video to WebM", description: "Convert video to WebM format", href: "/video-to-webm" },
  { icon: "\uD83D\uDCF9", name: "Screen Recorder", description: "Record your screen online", href: "/screen-recorder" },
];

const siblingHighlights = [
  { name: "PDF", tagline: "Merge, split & compress documents", url: "https://peregrinepdf.com" },
  { name: "Pix", tagline: "Resize, compress & transform images", url: "https://peregrinepix.com" },
  { name: "Kit", tagline: "Text utilities & everyday tools", url: "https://peregrinekit.com" },
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
            <div className="animate-descend inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[color:var(--color-border)] bg-white text-xs font-medium text-[color:var(--color-text-secondary)] mb-8">
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

      {/* Tool Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-8">
          Video &amp; Audio Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videoTools.map((tool, index) => (
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
