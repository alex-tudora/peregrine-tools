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
  siteName: "Peregrine Vid",
  description:
    "Free online video and audio tools. Convert, compress, trim, and extract audio from videos instantly in your browser. No sign-up required.",
  siteUrl: "https://peregrinevid.com",
});

const vidTools = [
  { name: "Video to MP4", href: "/convert-to-mp4" },
  { name: "Video to MP3", href: "/video-to-mp3" },
  { name: "Video to GIF", href: "/video-to-gif" },
  { name: "Compress Video", href: "/compress-video" },
  { name: "Trim Video", href: "/trim-video" },
  { name: "Audio to MP3", href: "/convert-to-mp3" },
  { name: "WAV to MP3", href: "/wav-to-mp3" },
  { name: "MP3 to WAV", href: "/mp3-to-wav" },
  { name: "Extract Audio", href: "/extract-audio" },
  { name: "Compress Audio", href: "/compress-audio" },
  { name: "Video to WebM", href: "/video-to-webm" },
  { name: "Screen Recorder", href: "/screen-recorder" },
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
          siteName="Peregrine Vid"
          accentColor="#F43F5E"
          currentTools={vidTools}
        />
        <main className="min-h-screen">{children}</main>
        <Footer siteName="Peregrine Vid" />
      </body>
    </html>
  );
}
