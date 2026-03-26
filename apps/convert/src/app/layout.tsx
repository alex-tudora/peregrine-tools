import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, Outfit } from "next/font/google";
import { Header } from "@peregrine/ui";
import { generateSiteMetadata } from "@peregrine/seo";
import { KnightLogo } from "./KnightLogo";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  ...generateSiteMetadata({
    siteName: "Convert-a-Lot",
    description:
      "The fastest free online file converter. Convert between PDF, images, video, audio, and data formats instantly. No sign-up, no upload — files never leave your device.",
    siteUrl: "https://convert-a-lot.com",
  }),
  appleWebApp: {
    title: "Convert-a-Lot",
  },
};

export const viewport: Viewport = { themeColor: "#EA580C" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden bg-[color:var(--color-bg)]">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2865991938661915"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://plausible.io/js/pa-6OWn-sSjqpiiNvqN4gAsJ.js"
          strategy="afterInteractive"
        />
        <Header
          siteName="Convert-a-Lot"
          logo={<KnightLogo size={34} className="-mr-1" />}
          showFamilyNav={false}
          currentTools={[
            { name: "PDF to JPG", href: "/pdf-to-jpg" },
            { name: "JPG to PDF", href: "/jpg-to-pdf" },
            { name: "PNG to JPG", href: "/png-to-jpg" },
            { name: "MP4 to MP3", href: "/mp4-to-mp3" },
            { name: "Video to GIF", href: "/mp4-to-gif" },
            { name: "WAV to MP3", href: "/wav-to-mp3" },
            { name: "WebP to JPG", href: "/webp-to-jpg" },
            { name: "SVG to PNG", href: "/svg-to-png" },
            { name: "JSON to CSV", href: "/json-to-csv" },
            { name: "CSV to JSON", href: "/csv-to-json" },
            { name: "Markdown to HTML", href: "/markdown-to-html" },
            { name: "HTML to Markdown", href: "/html-to-markdown" },
          ]}
        />
        <main>{children}</main>
        <footer className="border-t border-[color:var(--color-border)] py-8 text-center text-sm text-[color:var(--color-text-muted)]">
          Powered by{" "}
          <a
            href="https://peregrine-tools.com"
            className="font-medium text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors"
          >
            Peregrine
          </a>
        </footer>
      </body>
    </html>
  );
}
