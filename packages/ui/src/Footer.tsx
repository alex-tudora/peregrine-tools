import React from "react";
import { FalconLogo } from "./FalconLogo";

interface FooterProps {
  siteName?: string;
}

const siteAccents: Record<string, string> = {
  PDF: "#2563EB",
  Pix: "#7C3AED",
  Kit: "#059669",
  Vid: "#E11D48",
  Dev: "#D97706",
};

const footerSections = [
  {
    title: "PDF",
    url: "https://peregrinepdf.com",
    tools: [
      { name: "Merge PDF", href: "https://peregrinepdf.com/merge-pdf" },
      { name: "Split PDF", href: "https://peregrinepdf.com/split-pdf" },
      { name: "Compress PDF", href: "https://peregrinepdf.com/compress-pdf" },
      { name: "PDF to JPG", href: "https://peregrinepdf.com/pdf-to-jpg" },
    ],
  },
  {
    title: "Pix",
    url: "https://peregrinepix.com",
    tools: [
      {
        name: "Compress Image",
        href: "https://peregrinepix.com/compress-image",
      },
      { name: "Resize Image", href: "https://peregrinepix.com/resize-image" },
      {
        name: "Remove Background",
        href: "https://peregrinepix.com/remove-background",
      },
      { name: "PNG to JPG", href: "https://peregrinepix.com/png-to-jpg" },
    ],
  },
  {
    title: "Kit",
    url: "https://peregrinekit.com",
    tools: [
      { name: "Word Counter", href: "https://peregrinekit.com/word-counter" },
      {
        name: "Case Converter",
        href: "https://peregrinekit.com/case-converter",
      },
      {
        name: "Lorem Ipsum",
        href: "https://peregrinekit.com/lorem-ipsum-generator",
      },
      {
        name: "QR Generator",
        href: "https://peregrinekit.com/qr-code-generator",
      },
    ],
  },
  {
    title: "Vid",
    url: "https://peregrinevid.com",
    tools: [
      {
        name: "Compress Video",
        href: "https://peregrinevid.com/compress-video",
      },
      { name: "Trim Video", href: "https://peregrinevid.com/trim-video" },
      { name: "Video to GIF", href: "https://peregrinevid.com/video-to-gif" },
      { name: "Video to MP3", href: "https://peregrinevid.com/video-to-mp3" },
    ],
  },
  {
    title: "Dev",
    url: "https://peregrinedev.com",
    tools: [
      {
        name: "JSON Formatter",
        href: "https://peregrinedev.com/json-formatter",
      },
      { name: "Regex Tester", href: "https://peregrinedev.com/regex-tester" },
      {
        name: "Base64 Encode",
        href: "https://peregrinedev.com/base64-encode-decode",
      },
      { name: "Color Picker", href: "https://peregrinedev.com/color-picker" },
    ],
  },
];

export function Footer({ siteName = "Peregrine Tools" }: FooterProps) {
  return (
    <footer className="bg-[color:var(--color-bg-dark)] text-[color:var(--color-text-inverse)]">
      {/* Gradient accent line at top */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Top section — brand + tagline */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="flex items-center gap-3">
          <FalconLogo size={28} color="#94a3b8" />
          <span className="font-serif text-2xl font-semibold tracking-tight text-white">
            Peregrine
          </span>
        </div>
        <p className="mt-3 font-serif text-base italic text-white/40">
          Precision at speed.
        </p>
      </div>

      {/* Middle section — site link columns */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {footerSections.map((section) => (
            <div key={section.title}>
              <a
                href={section.url}
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:text-white/70"
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: siteAccents[section.title] || "var(--color-accent)" }}
                  aria-hidden="true"
                />
                {section.title}
              </a>
              <ul className="mt-3 space-y-2.5">
                {section.tools.map((tool) => (
                  <li key={tool.name}>
                    <a
                      href={tool.href}
                      className="text-sm text-white/40 transition-colors duration-200 hover:text-white"
                    >
                      {tool.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <span className="text-sm text-white/30">
            &copy; 2026 {siteName}
          </span>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <a
              href="/privacy"
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy
            </a>
            <span className="text-white/10" aria-hidden="true">
              &middot;
            </span>
            <a
              href="/terms"
              className="transition-colors duration-200 hover:text-white"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
