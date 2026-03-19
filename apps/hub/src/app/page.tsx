import { ToolCard } from "@peregrine/ui";
import { ConversionPicker } from "./ConversionPicker";

const pdfTools = [
  { icon: "\ud83d\uddbc\ufe0f", name: "PDF to JPG", description: "Convert PDF pages to JPG images", href: "https://peregrinepdf.com/pdf-to-jpg" },
  { icon: "\ud83d\uddbc\ufe0f", name: "PDF to PNG", description: "Convert PDF pages to PNG images", href: "https://peregrinepdf.com/pdf-to-png" },
  { icon: "\ud83d\udcc4", name: "JPG to PDF", description: "Convert JPG images to PDF documents", href: "https://peregrinepdf.com/jpg-to-pdf" },
  { icon: "\ud83d\udcc4", name: "PNG to PDF", description: "Convert PNG images to PDF documents", href: "https://peregrinepdf.com/png-to-pdf" },
  { icon: "\ud83d\udd00", name: "Merge PDF", description: "Combine multiple PDFs into one file", href: "https://peregrinepdf.com/merge-pdf" },
  { icon: "\u2702\ufe0f", name: "Split PDF", description: "Split PDF into separate pages", href: "https://peregrinepdf.com/split-pdf" },
];

const imageTools = [
  { icon: "\ud83d\uddbc\ufe0f", name: "JPG to PNG", description: "Convert JPG images to PNG format", href: "https://peregrinepix.com/jpg-to-png" },
  { icon: "\ud83d\uddbc\ufe0f", name: "PNG to JPG", description: "Convert PNG images to JPG format", href: "https://peregrinepix.com/png-to-jpg" },
  { icon: "\ud83c\udf10", name: "JPG to WebP", description: "Convert JPG to modern WebP format", href: "https://peregrinepix.com/jpg-to-webp" },
  { icon: "\ud83c\udf10", name: "PNG to WebP", description: "Convert PNG to modern WebP format", href: "https://peregrinepix.com/png-to-webp" },
  { icon: "\ud83d\uddc3\ufe0f", name: "Image Compressor", description: "Compress images without losing quality", href: "https://peregrinepix.com/compress" },
  { icon: "\u2728", name: "SVG to PNG", description: "Convert SVG vectors to PNG images", href: "https://peregrinepix.com/svg-to-png" },
];

const utilityTools = [
  { icon: "\ud83d\udcdd", name: "Word Counter", description: "Count words, characters, and sentences", href: "https://peregrinekit.com/word-counter" },
  { icon: "\ud83d\udd20", name: "Case Converter", description: "Convert text between cases", href: "https://peregrinekit.com/case-converter" },
  { icon: "\ud83d\udcc4", name: "Markdown to HTML", description: "Convert Markdown to HTML", href: "https://peregrinekit.com/markdown-to-html" },
  { icon: "%", name: "Percentage Calculator", description: "Calculate percentages easily", href: "https://peregrinekit.com/percentage-calculator" },
  { icon: "\ud83d\udcf1", name: "QR Code Generator", description: "Generate QR codes instantly", href: "https://peregrinekit.com/qr-code-generator" },
  { icon: "\ud83c\udff7\ufe0f", name: "Meta Tag Generator", description: "Generate SEO meta tags", href: "https://peregrinekit.com/meta-tag-generator" },
];

const videoTools = [
  { icon: "\ud83c\udfa5", name: "Video to MP3", description: "Extract audio from video files", href: "https://peregrinevid.com/video-to-mp3" },
  { icon: "\ud83c\udfac", name: "Video to GIF", description: "Convert video clips to animated GIFs", href: "https://peregrinevid.com/video-to-gif" },
  { icon: "\ud83d\udd04", name: "Convert to MP4", description: "Convert AVI, MOV, MKV to MP4", href: "https://peregrinevid.com/convert-to-mp4" },
  { icon: "\ud83c\udf10", name: "Video to WebM", description: "Convert video to WebM format", href: "https://peregrinevid.com/video-to-webm" },
  { icon: "\ud83c\udfb5", name: "WAV to MP3", description: "Convert WAV audio to MP3", href: "https://peregrinevid.com/wav-to-mp3" },
  { icon: "\ud83c\udfb6", name: "Convert to MP3", description: "Convert OGG, FLAC, AAC to MP3", href: "https://peregrinevid.com/convert-to-mp3" },
];

const devTools = [
  { icon: "\ud83d\udccb", name: "JSON to CSV", description: "Convert JSON data to CSV format", href: "https://peregrinedev.com/json-to-csv" },
  { icon: "\ud83d\udccb", name: "CSV to JSON", description: "Convert CSV data to JSON format", href: "https://peregrinedev.com/csv-to-json" },
  { icon: "\ud83d\udd12", name: "Base64 Encode", description: "Encode text and files to Base64", href: "https://peregrinedev.com/base64-encode" },
  { icon: "\ud83d\udd13", name: "Base64 Decode", description: "Decode Base64 back to text or files", href: "https://peregrinedev.com/base64-decode" },
  { icon: "\ud83c\udfa8", name: "JSON Formatter", description: "Format and beautify JSON data", href: "https://peregrinedev.com/json-formatter" },
  { icon: "#", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256 hashes", href: "https://peregrinedev.com/hash-generator" },
];

interface SiteSection {
  name: string;
  color: string;
  siteUrl: string;
  tools: { icon: string; name: string; description: string; href: string }[];
}

const siteSections: SiteSection[] = [
  { name: "PDF Tools", color: "#2563EB", siteUrl: "https://peregrinepdf.com", tools: pdfTools },
  { name: "Image Tools", color: "#7C3AED", siteUrl: "https://peregrinepix.com", tools: imageTools },
  { name: "Utility Tools", color: "#059669", siteUrl: "https://peregrinekit.com", tools: utilityTools },
  { name: "Video & Audio Tools", color: "#E11D48", siteUrl: "https://peregrinevid.com", tools: videoTools },
  { name: "Developer Tools", color: "#D97706", siteUrl: "https://peregrinedev.com", tools: devTools },
];

export default function Home() {
  return (
    <>
      {/* Section 1: Hero + Conversion Picker */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-accent-light)] via-[color:var(--color-bg)] to-[color:var(--color-bg)]" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[color:var(--color-border)] bg-white text-xs font-medium text-[color:var(--color-text-secondary)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-success)]" />
              89 free tools across 5 sites
            </div>

            {/* H1 */}
            <h1 className="animate-fade-in-up font-serif font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-[color:var(--color-text-primary)]">
              Convert anything.
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-1 mt-5 text-xl md:text-2xl text-[color:var(--color-text-secondary)] leading-relaxed">
              Instantly. In your browser.
            </p>

            {/* Conversion Picker */}
            <ConversionPicker />
          </div>
        </div>
      </section>

      {/* Section 2: All Tools by Category */}
      {siteSections.map((section, sectionIndex) => (
        <section
          key={section.name}
          className={`max-w-7xl mx-auto px-6 ${sectionIndex === 0 ? "pt-8" : "pt-0"} pb-16`}
        >
          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: section.color }}
              />
              <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)]">
                {section.name}
              </h2>
            </div>
            <a
              href={section.siteUrl}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: section.color }}
            >
              View all tools
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>

          {/* Tool cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {section.tools.map((tool, index) => (
              <div
                key={tool.href}
                className={`animate-slide-up delay-${(index % 3) + 1}`}
              >
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Section 3: Trust / Stats */}
      {/* Trust Section — editorial style */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-border), transparent)" }} aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed text-[color:var(--color-text-primary)]">
            &ldquo;89 free tools. Your files never leave your device.&rdquo;
          </blockquote>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-[color:var(--color-text-muted)]">
            <span><strong className="text-[color:var(--color-text-primary)]">5</strong> specialized sites</span>
            <span><strong className="text-[color:var(--color-text-primary)]">100%</strong> browser-based</span>
            <span><strong className="text-[color:var(--color-text-primary)]">No sign-up</strong> required</span>
          </div>
        </div>
      </section>
    </>
  );
}
