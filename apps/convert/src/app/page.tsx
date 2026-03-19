import { KnightLogo } from "./KnightLogo";
import { ConvertPicker } from "./ConvertPicker";

const popularConversions = [
  { from: "PDF", to: "JPG", label: "PDF to JPG", href: "https://peregrinepdf.com/pdf-to-jpg" },
  { from: "JPG", to: "PDF", label: "JPG to PDF", href: "https://peregrinepdf.com/jpg-to-pdf" },
  { from: "PNG", to: "JPG", label: "PNG to JPG", href: "https://peregrinepix.com/png-to-jpg" },
  { from: "MP4", to: "MP3", label: "Video to MP3", href: "https://peregrinevid.com/video-to-mp3" },
  { from: "WAV", to: "MP3", label: "WAV to MP3", href: "https://peregrinevid.com/wav-to-mp3" },
  { from: "Video", to: "GIF", label: "Video to GIF", href: "https://peregrinevid.com/video-to-gif" },
  { from: "WebP", to: "JPG", label: "WebP to JPG", href: "https://peregrinepix.com/webp-to-jpg" },
  { from: "PNG", to: "WebP", label: "PNG to WebP", href: "https://peregrinepix.com/png-to-webp" },
  { from: "JSON", to: "CSV", label: "JSON to CSV", href: "https://peregrinedev.com/json-to-csv" },
  { from: "SVG", to: "PNG", label: "SVG to PNG", href: "https://peregrinepix.com/svg-to-png" },
  { from: "PDF", to: "PNG", label: "PDF to PNG", href: "https://peregrinepdf.com/pdf-to-png" },
  { from: "JPG", to: "PNG", label: "JPG to PNG", href: "https://peregrinepix.com/jpg-to-png" },
];

const formatCategories = [
  { name: "Documents", formats: ["PDF", "Word", "Excel"], emoji: "📄", color: "#2563EB" },
  { name: "Images", formats: ["JPG", "PNG", "WebP", "SVG", "GIF"], emoji: "🖼️", color: "#7C3AED" },
  { name: "Video", formats: ["MP4", "AVI", "MOV", "MKV", "WebM"], emoji: "🎬", color: "#E11D48" },
  { name: "Audio", formats: ["MP3", "WAV", "OGG", "FLAC", "AAC"], emoji: "🎵", color: "#DB2777" },
  { name: "Data", formats: ["JSON", "CSV"], emoji: "📊", color: "#D97706" },
  { name: "Code", formats: ["HTML", "Markdown"], emoji: "🧑‍💻", color: "#059669" },
];

export default function Home() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF1E6] via-[color:var(--color-bg)] to-[color:var(--color-bg)]" />
        {/* Decorative blobs */}
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-[color:var(--color-accent)]/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-40 right-[15%] w-48 h-48 bg-[color:var(--color-accent-glow)] rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-8 md:pt-24 md:pb-12">
          <div className="text-center">
            {/* Floating mascot */}
            <div className="animate-fade-in-down inline-block mb-10">
              <div className="animate-float">
                <KnightLogo size={140} />
              </div>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.0] tracking-tight text-[color:var(--color-text-primary)]">
              Drop your file.
              <br />
              <span className="text-[color:var(--color-accent)]">We&apos;ll handle the rest.</span>
            </h1>

            {/* Subhead */}
            <p className="animate-fade-in-up delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Pick a format. Pick a target. Click go.
              <br className="hidden sm:block" />
              <span className="text-[color:var(--color-text-muted)]">No sign-up. No upload. Your files never leave your device.</span>
            </p>
          </div>
        </div>
      </section>

      {/* === CONVERSION PICKER === */}
      <section className="relative max-w-4xl mx-auto px-6 pb-20">
        <ConvertPicker />
      </section>

      {/* === POPULAR QUESTS === */}
      <section className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-accent)] mb-3">Most wanted</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)]">
              Popular conversions
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {popularConversions.map((c, i) => (
              <a
                key={`${c.from}-${c.to}`}
                href={c.href}
                className={`animate-slide-up delay-${Math.min((i % 4) + 1, 6)} group relative flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-white border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--shadow-warm-md)] hover:-translate-y-0.5 transition-all duration-200`}
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

      {/* === FORMATS WE SPEAK === */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-accent)] mb-3">Format arsenal</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)]">
              We speak every format
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {formatCategories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-2xl border border-[color:var(--color-border)] bg-white p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h3 className="font-display font-bold text-sm text-[color:var(--color-text-primary)] mb-2">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap justify-center gap-1">
                  {cat.formats.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${cat.color}10`, color: cat.color }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === WHY US === */}
      <section className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-accent)] mb-3">The Convert-a-Lot oath</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)]">
              Why choose this knight?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] flex items-center justify-center mx-auto mb-5 shadow-sm">
                <svg className="w-8 h-8 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg text-[color:var(--color-text-primary)]">Blazing fast</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                Everything runs in your browser. No upload queue, no waiting, no server.
                Click and it&apos;s done.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] flex items-center justify-center mx-auto mb-5 shadow-sm">
                <svg className="w-8 h-8 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg text-[color:var(--color-text-primary)]">Fort Knox private</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                Your files never leave your device. Zero uploads, zero storage,
                zero chance anyone peeks.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] flex items-center justify-center mx-auto mb-5 shadow-sm">
                <svg className="w-8 h-8 text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg text-[color:var(--color-text-primary)]">Free. Forever.</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                No sign-up, no credit card, no &quot;free trial&quot; bait.
                Just pick your format and go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === BOTTOM CTA === */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <KnightLogo size={56} className="mx-auto mb-6 opacity-70" />
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)]">
            Ready for your conversion quest?
          </h2>
          <p className="mt-3 text-[color:var(--color-text-muted)]">
            89 free tools. 27 conversion paths. Zero excuses.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 border-2 border-[color:var(--color-accent)] text-[color:var(--color-accent)] font-bold rounded-2xl hover:bg-[color:var(--color-accent)] hover:text-white hover:shadow-[var(--shadow-warm-accent)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Start converting
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
