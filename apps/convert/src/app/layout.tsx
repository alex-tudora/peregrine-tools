import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import Link from "next/link";
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
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-[color:var(--color-border)]">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <KnightLogo size={34} />
              <span className="font-display font-extrabold text-xl tracking-tight text-[color:var(--color-text-primary)] group-hover:text-[#F97316] transition-colors">
                Convert-a-Lot
              </span>
            </Link>
            <a
              href="https://peregrine-tools.com"
              className="hidden sm:flex items-center gap-1.5 text-xs text-[color:var(--color-text-muted)] hover:text-[color:var(--color-accent)] transition-colors"
            >
              Powered by
              <span className="font-semibold text-[color:var(--color-text-secondary)]">Peregrine</span>
            </a>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-[color:var(--color-border)] bg-[#1B2A4A]">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <KnightLogo size={28} />
              <div>
                <p className="text-sm font-semibold text-white">Convert-a-Lot</p>
                <p className="text-xs text-slate-400">
                  Your trusty file conversion knight &middot;{" "}
                  <a href="https://peregrine-tools.com" className="hover:text-[#F97316] transition-colors">
                    Peregrine Tools
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-slate-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-slate-400 hover:text-white transition-colors">
                Terms
              </Link>
              <span className="text-xs text-slate-500">&copy; 2026</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
