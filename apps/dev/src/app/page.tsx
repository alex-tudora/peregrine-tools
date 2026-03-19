import { ToolCard } from "@peregrine/ui";

const devTools = [
  { icon: "{}", name: "JSON Formatter", description: "Format and beautify JSON", href: "/json-formatter" },
  { icon: "\u2705", name: "JSON Validator", description: "Validate JSON syntax", href: "/json-validator" },
  { icon: "\ud83d\udcca", name: "JSON to CSV", description: "Convert JSON to CSV format", href: "/json-to-csv" },
  { icon: "\ud83d\udccb", name: "CSV to JSON", description: "Convert CSV to JSON format", href: "/csv-to-json" },
  { icon: "\ud83d\udd0d", name: "Regex Tester", description: "Test regular expressions", href: "/regex-tester" },
  { icon: "\ud83d\udd10", name: "Base64 Encode/Decode", description: "Encode and decode Base64", href: "/base64" },
  { icon: "\ud83d\udd17", name: "URL Encode/Decode", description: "Encode and decode URLs", href: "/url-encode" },
  { icon: "#\ufe0f\u20e3", name: "Hash Generator", description: "Generate MD5, SHA hashes", href: "/hash-generator" },
  { icon: "\ud83c\udd94", name: "UUID Generator", description: "Generate unique UUIDs", href: "/uuid-generator" },
  { icon: "\ud83c\udfa8", name: "Color Picker", description: "Pick and convert colors", href: "/color-picker" },
  { icon: "\ud83c\udf08", name: "Hex to RGB", description: "Convert hex colors to RGB", href: "/hex-to-rgb" },
  { icon: "\u23f0", name: "Cron Builder", description: "Build cron expressions", href: "/cron-builder" },
  { icon: "\ud83d\udd11", name: "JWT Decoder", description: "Decode JWT tokens", href: "/jwt-decoder" },
  { icon: "\ud83d\udcc4", name: "HTML Minifier", description: "Minify HTML code", href: "/html-minifier" },
  { icon: "\ud83c\udfa8", name: "CSS Minifier", description: "Minify CSS code", href: "/css-minifier" },
  { icon: "\u26a1", name: "JS Minifier", description: "Minify JavaScript code", href: "/js-minifier" },
  { icon: "\ud83d\udcdd", name: "SQL Formatter", description: "Format SQL queries", href: "/sql-formatter" },
  { icon: "\ud83d\udd00", name: "Diff Checker", description: "Compare two texts", href: "/diff-checker" },
  { icon: "\ud83d\udd50", name: "Timestamp Converter", description: "Convert Unix timestamps", href: "/timestamp-converter" },
];

const popularTools = [
  { name: "JSON Formatter", href: "/json-formatter" },
  { name: "Regex Tester", href: "/regex-tester" },
  { name: "Base64", href: "/base64" },
  { name: "JWT Decoder", href: "/jwt-decoder" },
];

const siblingHighlights = [
  { name: "PDF", tagline: "Merge, split & compress documents", url: "https://peregrinepdf.com", accent: "#2563EB" },
  { name: "Pix", tagline: "Resize, compress & transform images", url: "https://peregrinepix.com", accent: "#7C3AED" },
  { name: "Kit", tagline: "Text utilities & everyday tools", url: "https://peregrinekit.com", accent: "#059669" },
  { name: "Vid", tagline: "Compress, trim & convert video", url: "https://peregrinevid.com", accent: "#E11D48" },
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
              The fastest developer tools
              <br />
              <span className="text-[color:var(--color-accent)]">on the web</span>
            </h1>

            <p className="animate-arrive delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Format, validate, encode, decode, and convert.
              Built for developers, by developers.
            </p>

            <div className="animate-arrive delay-2 mt-8 flex flex-wrap justify-center gap-2">
              {popularTools.map((tool) => (
                <a key={tool.href} href={tool.href} className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--color-text-primary)] transition-all duration-200 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-light)]">
                  {tool.name}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-8">
          Developer Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {devTools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }} aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed text-[color:var(--color-text-primary)]">
            &ldquo;Your data never leaves your device.&rdquo;
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
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-serif font-semibold text-xl text-[color:var(--color-text-primary)] mb-6">More from Peregrine</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siblingHighlights.map((site) => (
              <a key={site.url} href={site.url} className="group flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] bg-white p-4 transition-all duration-200 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: site.accent }} aria-hidden="true" />
                <div>
                  <span className="text-sm font-semibold text-[color:var(--color-text-primary)]">{site.name}</span>
                  <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">{site.tagline}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
