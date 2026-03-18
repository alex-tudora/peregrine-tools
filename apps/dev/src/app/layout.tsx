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
  siteName: "Peregrine Dev",
  description:
    "Free online developer tools. JSON formatter, regex tester, base64 encoder, hash generator, and more. No sign-up required.",
  siteUrl: "https://peregrinedev.com",
});

const devTools = [
  { name: "JSON Formatter", href: "/json-formatter" },
  { name: "JSON Validator", href: "/json-validator" },
  { name: "JSON to CSV", href: "/json-to-csv" },
  { name: "CSV to JSON", href: "/csv-to-json" },
  { name: "Regex Tester", href: "/regex-tester" },
  { name: "Base64 Encode/Decode", href: "/base64" },
  { name: "URL Encode/Decode", href: "/url-encode" },
  { name: "Hash Generator", href: "/hash-generator" },
  { name: "UUID Generator", href: "/uuid-generator" },
  { name: "Color Picker", href: "/color-picker" },
  { name: "Hex to RGB", href: "/hex-to-rgb" },
  { name: "Cron Builder", href: "/cron-builder" },
  { name: "JWT Decoder", href: "/jwt-decoder" },
  { name: "HTML Minifier", href: "/html-minifier" },
  { name: "CSS Minifier", href: "/css-minifier" },
  { name: "JS Minifier", href: "/js-minifier" },
  { name: "SQL Formatter", href: "/sql-formatter" },
  { name: "Diff Checker", href: "/diff-checker" },
  { name: "Timestamp Converter", href: "/timestamp-converter" },
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
          siteName="Peregrine Dev"
          accentColor="#F59E0B"
          currentTools={devTools}
        />
        <main className="min-h-screen">{children}</main>
        <Footer siteName="Peregrine Dev" />
      </body>
    </html>
  );
}
