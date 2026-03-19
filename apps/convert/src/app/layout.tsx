import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { Header, Footer } from "@peregrine/ui";
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

export const metadata: Metadata = generateSiteMetadata({
  siteName: "Convert-a-Lot",
  description:
    "The fastest free online file converter. Convert between PDF, images, video, audio, and data formats instantly. No sign-up, no upload — files never leave your device.",
  siteUrl: "https://convert-a-lot.com",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden bg-[color:var(--color-bg)]">
        <Header
          siteName="Convert-a-Lot"
          logo={<KnightLogo size={28} />}
        />
        <main>{children}</main>
        <Footer
          siteName="Convert-a-Lot"
          logo={<KnightLogo size={22} />}
        />
      </body>
    </html>
  );
}
