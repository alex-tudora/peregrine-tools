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
  siteName: "Peregrine Pix",
  description:
    "Free online image tools. Compress, resize, crop, convert, and edit images instantly in your browser. No sign-up required.",
  siteUrl: "https://peregrinepix.com",
});

const pixTools = [
  { name: "Compress Image", href: "/compress-image" },
  { name: "Resize Image", href: "/resize-image" },
  { name: "Crop Image", href: "/crop-image" },
  { name: "Remove Background", href: "/remove-background" },
  { name: "PNG to JPG", href: "/png-to-jpg" },
  { name: "JPG to PNG", href: "/jpg-to-png" },
  { name: "WebP to JPG", href: "/webp-to-jpg" },
  { name: "WebP to PNG", href: "/webp-to-png" },
  { name: "JPG to WebP", href: "/jpg-to-webp" },
  { name: "PNG to WebP", href: "/png-to-webp" },
  { name: "SVG to PNG", href: "/svg-to-png" },
  { name: "Add Watermark", href: "/add-watermark" },
  { name: "Flip & Rotate", href: "/flip-rotate" },
  { name: "Favicon Generator", href: "/favicon-generator" },
  { name: "Image to Base64", href: "/image-to-base64" },
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
          siteName="Peregrine Pix"
          accentColor="#8B5CF6"
          currentTools={pixTools}
        />
        <main className="min-h-screen">{children}</main>
        <Footer siteName="Peregrine Pix" />
      </body>
    </html>
  );
}
