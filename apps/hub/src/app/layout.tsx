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

export const metadata: Metadata = generateSiteMetadata({
  siteName: "Peregrine Tools",
  description:
    "The fastest free online tools. Convert, compress, and edit any file instantly in your browser. PDF, images, video, audio, text, and developer tools. No sign-up required.",
  siteUrl: "https://peregrine-tools.com",
});

export const viewport: Viewport = { themeColor: "#2563EB" };

const currentTools = [
  { name: "PDF to JPG", href: "https://peregrinepdf.com/pdf-to-jpg" },
  { name: "JPG to PNG", href: "https://peregrinepix.com/jpg-to-png" },
  { name: "Video to MP3", href: "https://peregrinevid.com/video-to-mp3" },
  { name: "JSON to CSV", href: "https://peregrinedev.com/json-to-csv" },
  { name: "Word Counter", href: "https://peregrinekit.com/word-counter" },
  { name: "Image Compressor", href: "https://peregrinepix.com/compress" },
  { name: "Merge PDF", href: "https://peregrinepdf.com/merge-pdf" },
  { name: "PNG to WebP", href: "https://peregrinepix.com/png-to-webp" },
  { name: "Video to GIF", href: "https://peregrinevid.com/video-to-gif" },
  { name: "Base64 Encode", href: "https://peregrinedev.com/base64-encode" },
  { name: "Markdown to HTML", href: "https://peregrinekit.com/markdown-to-html" },
  { name: "Percentage Calculator", href: "https://peregrinekit.com/percentage-calculator" },
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
        <Header
          siteName="Peregrine Tools"
          currentTools={currentTools}
        />
        <main className="min-h-screen">{children}</main>
        <Footer siteName="Peregrine Tools" />
      </body>
    </html>
  );
}
