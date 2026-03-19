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
  siteName: "Peregrine PDF",
  description:
    "The fastest free online PDF tools. Merge, split, compress, and convert PDF files instantly in your browser. No sign-up required.",
  siteUrl: "https://peregrinepdf.com",
});

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
          siteName="Peregrine PDF"
          accentColor="#2563EB"
          currentTools={pdfTools}
        />
        <main className="min-h-screen">{children}</main>
        <Footer siteName="Peregrine PDF" />
      </body>
    </html>
  );
}
