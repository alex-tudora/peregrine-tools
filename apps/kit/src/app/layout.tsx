import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header, Footer } from "@peregrine/ui";
import { generateSiteMetadata } from "@peregrine/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = generateSiteMetadata({
  siteName: "Peregrine Kit",
  description:
    "Free online text tools, calculators, and SEO utilities. Word counter, case converter, percentage calculator, meta tag generator, and more. No sign-up required.",
  siteUrl: "https://peregrinekit.com",
});

const kitTools = [
  { name: "Word Counter", href: "/word-counter" },
  { name: "Character Counter", href: "/character-counter" },
  { name: "Case Converter", href: "/case-converter" },
  { name: "Lorem Ipsum Generator", href: "/lorem-ipsum-generator" },
  { name: "Text Diff", href: "/text-diff" },
  { name: "Remove Duplicates", href: "/remove-duplicates" },
  { name: "Find & Replace", href: "/find-and-replace" },
  { name: "Text to Slug", href: "/text-to-slug" },
  { name: "Remove Line Breaks", href: "/remove-line-breaks" },
  { name: "Markdown to HTML", href: "/markdown-to-html" },
  { name: "HTML to Markdown", href: "/html-to-markdown" },
  { name: "Readability Score", href: "/readability-score" },
  { name: "Percentage Calculator", href: "/percentage-calculator" },
  { name: "Age Calculator", href: "/age-calculator" },
  { name: "Date Difference", href: "/date-difference" },
  { name: "Unit Converter", href: "/unit-converter" },
  { name: "Timezone Converter", href: "/timezone-converter" },
  { name: "Tip Calculator", href: "/tip-calculator" },
  { name: "BMI Calculator", href: "/bmi-calculator" },
  { name: "Mortgage Calculator", href: "/mortgage-calculator" },
  { name: "Compound Interest", href: "/compound-interest" },
  { name: "Salary Calculator", href: "/salary-calculator" },
  { name: "GPA Calculator", href: "/gpa-calculator" },
  { name: "Meta Tag Generator", href: "/meta-tag-generator" },
  { name: "Open Graph Preview", href: "/open-graph-preview" },
  { name: "Robots.txt Generator", href: "/robots-txt-generator" },
  { name: "Sitemap Generator", href: "/sitemap-generator" },
  { name: "UTM Builder", href: "/utm-builder" },
  { name: "QR Code Generator", href: "/qr-code-generator" },
  { name: "Heading Checker", href: "/heading-checker" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <Header
          siteName="Peregrine Kit"
          accentColor="#10B981"
          currentTools={kitTools}
        />
        <main className="min-h-screen">{children}</main>
        <Footer siteName="Peregrine Kit" />
      </body>
    </html>
  );
}
