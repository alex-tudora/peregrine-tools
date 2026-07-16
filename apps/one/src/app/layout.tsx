import type { Metadata, Viewport } from "next";
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
    siteName: "Peregrine Tools",
    description:
      "Every Peregrine tool on one domain. PDF, image, video, developer, and text tools — processed entirely in your browser. No sign-up, no uploads.",
    siteUrl: "https://peregrine-tools.com",
  }),
  appleWebApp: { title: "Peregrine Tools" },
};

export const viewport: Viewport = { themeColor: "#2563EB" };

/*
 * Consolidation PoC — the header's tool links are now RELATIVE, category-scoped
 * paths on a single domain (`/text/word-counter`) instead of absolute cross-domain
 * URLs (`https://peregrinekit.com/word-counter`). This is the core difference:
 * every link is same-origin, so navigation is client-side and link equity stays
 * on one domain. See MIGRATION.md.
 */
const featuredTools = [
  { name: "Word Counter", href: "/text/word-counter" },
  { name: "JSON Formatter", href: "/dev/json-formatter" },
  { name: "Merge PDF", href: "/pdf/merge-pdf" },
  { name: "Compress Image", href: "/image/compress-image" },
  { name: "Video to MP3", href: "/video/video-to-mp3" },
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
          siteName="Peregrine Tools"
          currentTools={featuredTools}
          showFamilyNav={false}
        />
        <main className="min-h-screen">{children}</main>
        <Footer siteName="Peregrine Tools" />
      </body>
    </html>
  );
}
