import type { Metadata } from "next";
import { ToolCard } from "@peregrine/ui";

export const metadata: Metadata = {
  description: "Free online text tools, calculators, and SEO utilities. Word counter, case converter, percentage calculator, meta tag generator, and more. No sign-up required.",
  keywords: ["text tools", "word counter", "case converter", "calculator", "SEO tools", "free online tools", "Peregrine Kit"],
};

const textTools = [
  { icon: "\ud83d\udcdd", name: "Word Counter", description: "Count words, characters, and sentences", href: "/word-counter" },
  { icon: "\ud83d\udd24", name: "Character Counter", description: "Count characters with/without spaces", href: "/character-counter" },
  { icon: "\ud83d\udd20", name: "Case Converter", description: "Convert text between cases", href: "/case-converter" },
  { icon: "\ud83d\udccb", name: "Lorem Ipsum Generator", description: "Generate placeholder text", href: "/lorem-ipsum-generator" },
  { icon: "\ud83d\udd0d", name: "Text Diff", description: "Compare two texts side by side", href: "/text-diff" },
  { icon: "\ud83d\uddd1\ufe0f", name: "Remove Duplicates", description: "Remove duplicate lines from text", href: "/remove-duplicates" },
  { icon: "\ud83d\udd0e", name: "Find & Replace", description: "Find and replace text patterns", href: "/find-and-replace" },
  { icon: "\ud83d\udd17", name: "Text to Slug", description: "Convert text to URL-friendly slugs", href: "/text-to-slug" },
  { icon: "\u21a9\ufe0f", name: "Remove Line Breaks", description: "Clean up line breaks from text", href: "/remove-line-breaks" },
  { icon: "\ud83d\udcc4", name: "Markdown to HTML", description: "Convert Markdown to HTML", href: "/markdown-to-html" },
  { icon: "\ud83d\udcdd", name: "HTML to Markdown", description: "Convert HTML to Markdown", href: "/html-to-markdown" },
  { icon: "\ud83d\udcca", name: "Readability Score", description: "Check text readability level", href: "/readability-score" },
];

const calculatorTools = [
  { icon: "%", name: "Percentage Calculator", description: "Calculate percentages easily", href: "/percentage-calculator" },
  { icon: "\ud83c\udf82", name: "Age Calculator", description: "Calculate exact age from birthdate", href: "/age-calculator" },
  { icon: "\ud83d\udcc5", name: "Date Difference", description: "Calculate days between dates", href: "/date-difference" },
  { icon: "\ud83d\udccf", name: "Unit Converter", description: "Convert between measurement units", href: "/unit-converter" },
  { icon: "\ud83c\udf0d", name: "Timezone Converter", description: "Convert between timezones", href: "/timezone-converter" },
  { icon: "\ud83d\udcb0", name: "Tip Calculator", description: "Calculate tips and split bills", href: "/tip-calculator" },
  { icon: "\u2696\ufe0f", name: "BMI Calculator", description: "Calculate Body Mass Index", href: "/bmi-calculator" },
  { icon: "\ud83c\udfe0", name: "Mortgage Calculator", description: "Estimate monthly payments", href: "/mortgage-calculator" },
  { icon: "\ud83d\udcc8", name: "Compound Interest", description: "Calculate compound interest growth", href: "/compound-interest" },
  { icon: "\ud83d\udcb5", name: "Salary Calculator", description: "Convert salary to hourly and back", href: "/salary-calculator" },
  { icon: "\ud83c\udf93", name: "GPA Calculator", description: "Calculate grade point average", href: "/gpa-calculator" },
];

const seoTools = [
  { icon: "\ud83c\udff7\ufe0f", name: "Meta Tag Generator", description: "Generate SEO meta tags", href: "/meta-tag-generator" },
  { icon: "\ud83d\udc41\ufe0f", name: "Open Graph Preview", description: "Preview Open Graph social cards", href: "/open-graph-preview" },
  { icon: "\ud83e\udd16", name: "Robots.txt Generator", description: "Generate robots.txt files", href: "/robots-txt-generator" },
  { icon: "\ud83d\uddfa\ufe0f", name: "Sitemap Generator", description: "Generate XML sitemaps", href: "/sitemap-generator" },
  { icon: "\ud83d\udd17", name: "UTM Builder", description: "Build UTM tracking URLs", href: "/utm-builder" },
  { icon: "\ud83d\udcf1", name: "QR Code Generator", description: "Generate QR codes", href: "/qr-code-generator" },
  { icon: "\ud83d\udccb", name: "Heading Checker", description: "Check heading structure", href: "/heading-checker" },
];

const siblingHighlights = [
  { name: "PDF", tagline: "Merge, split & compress documents", url: "https://peregrinepdf.com" },
  { name: "Pix", tagline: "Resize, compress & transform images", url: "https://peregrinepix.com" },
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
            <div className="animate-descend inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[color:var(--color-border)] bg-white text-xs font-medium text-[color:var(--color-text-secondary)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-success)]" />
              Free &middot; No sign-up &middot; 100% private
            </div>

            <h1 className="animate-arrive font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-[color:var(--color-text-primary)]">
              The fastest utility tools
              <br />
              <span className="text-[color:var(--color-accent)]">on the web</span>
            </h1>

            <p className="animate-arrive delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Text tools, calculators, and SEO utilities.
              Instantly. In your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Text Tools */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-8">
          Text Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {textTools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Calculator Tools */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-8">
          Calculator Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {calculatorTools.map((tool, index) => (
            <div key={tool.href} className={`animate-arrive delay-${Math.min((index % 3) + 1, 6)}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* SEO & Marketing Tools */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <h2 className="font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-8">
          SEO &amp; Marketing Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {seoTools.map((tool, index) => (
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
