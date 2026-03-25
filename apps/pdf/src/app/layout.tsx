import type { Metadata, Viewport } from "next";
import Script from "next/script";
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

export const metadata: Metadata = {
  ...generateSiteMetadata({
    siteName: "Peregrine PDF",
    description:
      "The fastest free online PDF tools. Merge, split, compress, and convert PDF files instantly in your browser. No sign-up required.",
    siteUrl: "https://peregrinepdf.com",
  }),
  appleWebApp: {
    title: "Peregrine PDF",
  },
};

export const viewport: Viewport = { themeColor: "#2563EB" };

const pdfTools = [
  { name: "Merge PDF", href: "/merge-pdf" },
  { name: "Split PDF", href: "/split-pdf" },
  { name: "Compress PDF", href: "/compress-pdf" },
  { name: "PDF to JPG", href: "/pdf-to-jpg" },
  { name: "JPG to PDF", href: "/jpg-to-pdf" },
  { name: "PDF to PNG", href: "/pdf-to-png" },
  { name: "PNG to PDF", href: "/png-to-pdf" },
  { name: "Rotate PDF", href: "/rotate-pdf" },
  { name: "Watermark PDF", href: "/watermark-pdf" },
  { name: "Unlock PDF", href: "/unlock-pdf" },
  { name: "Protect PDF", href: "/protect-pdf" },
  { name: "Sign PDF", href: "/sign-pdf" },
  { name: "Page Numbers", href: "/add-page-numbers" },
  { name: "OCR PDF", href: "/ocr-pdf" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2865991938661915"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          defer
          data-domain="peregrinepdf.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <Header
          siteName="Peregrine PDF"
          currentSite="pdf"
          currentTools={pdfTools}
        />
        <main className="min-h-screen">{children}</main>
        <Footer siteName="Peregrine PDF" />
      </body>
    </html>
  );
}
