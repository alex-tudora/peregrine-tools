import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { generateSiteMetadata } from "@peregrine/seo";
import { KnightLogo } from "./KnightLogo";
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
  siteName: "Convert-a-Lot",
  description:
    "The fastest free online file converter. Convert between PDF, images, video, audio, and data formats instantly. No sign-up, no upload — files stay in your browser.",
  siteUrl: "https://convert-a-lot.com",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {/* Simple Convert-a-Lot Header */}
        <header className="border-b border-[color:var(--color-border)] bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <KnightLogo size={36} />
              <span className="font-serif font-bold text-xl text-[color:var(--color-text-primary)] group-hover:text-[#F97316] transition-colors">
                Convert-a-Lot
              </span>
            </Link>
            <a
              href="https://peregrine-tools.com"
              className="text-xs font-medium text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)] transition-colors"
            >
              Powered by <span className="text-[color:var(--color-text-secondary)]">Peregrine Tools</span>
            </a>
          </div>
        </header>

        <main className="min-h-screen">{children}</main>

        {/* Simple Convert-a-Lot Footer */}
        <footer className="border-t border-[color:var(--color-border)] bg-white">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <KnightLogo size={24} />
              <p className="text-sm text-[color:var(--color-text-muted)]">
              &copy; 2026 Convert-a-Lot &middot; Powered by{" "}
              <a
                href="https://peregrine-tools.com"
                className="text-[color:var(--color-text-secondary)] hover:text-[#F97316] transition-colors"
              >
                Peregrine Tools
              </a>
            </p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)] transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
