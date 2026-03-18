import { ToolCard } from "@peregrine/ui";

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
              The fastest utility tools
              <br />
              <span className="text-[color:var(--color-accent)]">on the web</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-1 mt-6 text-lg md:text-xl text-[color:var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto">
              Text tools, calculators, and SEO utilities.
              Instantly. In your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Text Tools Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-8">
          Text Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {textTools.map((tool, index) => (
            <div key={tool.href} className={`animate-slide-up delay-${(index % 3) + 1}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* Calculator Tools Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-8">
          Calculator Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {calculatorTools.map((tool, index) => (
            <div key={tool.href} className={`animate-slide-up delay-${(index % 3) + 1}`}>
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </section>

      {/* SEO & Marketing Tools Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="font-serif font-semibold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-8">
          SEO &amp; Marketing Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {seoTools.map((tool, index) => (
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
              Your data never leaves your device
            </h2>
            <p className="mt-4 text-[color:var(--color-text-secondary)] leading-relaxed">
              Every tool processes data directly in your browser using JavaScript.
              Nothing is uploaded to any server. Your content stays private, always.
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
                <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">Data never leaves your browser</p>
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
