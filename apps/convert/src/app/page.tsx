import { ConvertPicker } from "./ConvertPicker";

const popularConversions = [
  { from: "PDF", to: "JPG", href: "https://peregrinepdf.com/pdf-to-jpg" },
  { from: "JPG", to: "PDF", href: "https://peregrinepdf.com/jpg-to-pdf" },
  { from: "PNG", to: "JPG", href: "https://peregrinepix.com/png-to-jpg" },
  { from: "JPG", to: "PNG", href: "https://peregrinepix.com/jpg-to-png" },
  { from: "MP4", to: "MP3", href: "https://peregrinevid.com/video-to-mp3" },
  { from: "WAV", to: "MP3", href: "https://peregrinevid.com/wav-to-mp3" },
  { from: "Video", to: "GIF", href: "https://peregrinevid.com/video-to-gif" },
  { from: "WebP", to: "JPG", href: "https://peregrinepix.com/webp-to-jpg" },
  { from: "PNG", to: "WebP", href: "https://peregrinepix.com/png-to-webp" },
  { from: "JSON", to: "CSV", href: "https://peregrinedev.com/json-to-csv" },
  { from: "SVG", to: "PNG", href: "https://peregrinepix.com/svg-to-png" },
  { from: "PDF", to: "PNG", href: "https://peregrinepdf.com/pdf-to-png" },
];

const formatCategories = [
  {
    name: "Documents",
    formats: ["PDF", "Word", "Excel"],
    color: "#3B82F6",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    name: "Images",
    formats: ["JPG", "PNG", "WebP", "SVG", "GIF"],
    color: "#8B5CF6",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 18V6a2.25 2.25 0 012.25-2.25h15A2.25 2.25 0 0121.75 6v12A2.25 2.25 0 0119.5 20.25H4.5A2.25 2.25 0 012.25 18z" />
      </svg>
    ),
  },
  {
    name: "Video",
    formats: ["MP4", "AVI", "MOV", "MKV", "WebM", "GIF"],
    color: "#F43F5E",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
      </svg>
    ),
  },
  {
    name: "Audio",
    formats: ["MP3", "WAV", "OGG", "FLAC", "AAC"],
    color: "#EC4899",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
  {
    name: "Data",
    formats: ["JSON", "CSV"],
    color: "#F59E0B",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 15.75h7.5" />
      </svg>
    ),
  },
  {
    name: "Text",
    formats: ["HTML", "Markdown"],
    color: "#10B981",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* Hero + Conversion Picker */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF7ED] via-[color:var(--color-bg)] to-[color:var(--color-bg)]" />

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* H1 */}
            <h1 className="animate-fade-in-up font-serif font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-[color:var(--color-text-primary)]">
              Convert anything{" "}
              <span className="text-[#F97316]">to anything.</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-1 mt-5 text-xl md:text-2xl text-[color:var(--color-text-secondary)] leading-relaxed">
              Pick your formats. Click convert. That&apos;s it.
            </p>

            {/* THE Conversion Picker */}
            <ConvertPicker />
          </div>
        </div>
      </section>

      {/* Popular Conversions */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="animate-fade-in font-serif font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] text-center mb-10">
          Popular Conversions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {popularConversions.map((conversion, index) => (
            <a
              key={`${conversion.from}-${conversion.to}`}
              href={conversion.href}
              className={`animate-slide-up delay-${(index % 3) + 1} group flex items-center gap-3 px-5 py-4 rounded-xl border border-[color:var(--color-border)] bg-white hover:border-[#F97316]/40 hover:shadow-md hover:shadow-orange-500/10 transition-all duration-200`}
            >
              <span className="text-base font-semibold text-[color:var(--color-text-primary)]">
                {conversion.from}
              </span>
              <svg
                className="w-4 h-4 text-[#F97316] group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
              <span className="text-base font-semibold text-[color:var(--color-text-primary)]">
                {conversion.to}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* All Supported Formats */}
      <section className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] text-center mb-12">
            All Supported Formats
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {formatCategories.map((category) => (
              <div
                key={category.name}
                className="rounded-xl border border-[color:var(--color-border)] bg-white p-5 text-center hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${category.color}15`, color: category.color }}
                >
                  {category.icon}
                </div>
                <h3 className="font-semibold text-sm text-[color:var(--color-text-primary)] mb-2">
                  {category.name}
                </h3>
                <p className="text-xs text-[color:var(--color-text-muted)] leading-relaxed">
                  {category.formats.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Convert-a-Lot? */}
      <section className="border-t border-[color:var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] text-center mb-12">
            Why Convert-a-Lot?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF7ED] flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-[#F97316]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)]">Lightning Fast</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                Everything is processed right in your browser. No waiting for uploads, no server queues.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF7ED] flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-[#F97316]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)]">100% Private</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                Your files never leave your device. No uploads, no cloud storage, no peeking.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF7ED] flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-[#F97316]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)]">Always Free</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-muted)] leading-relaxed">
                No sign-up, no limits, no hidden fees. Just pick your format and go.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
