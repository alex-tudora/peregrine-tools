import React from "react";
import { FalconLogo } from "./FalconLogo";

interface FooterProps {
  siteName?: string;
}

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
    <footer className="bg-[color:var(--color-bg-dark,theme(colors.slate.900))] text-slate-300">
      {/* Top section — brand + tagline */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="flex items-center gap-3">
          <FalconLogo size={24} color="#94a3b8" />
          <span className="font-serif text-xl font-semibold tracking-tight text-white">
            Peregrine
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          The fastest tools online.
        </p>
      </div>

      {/* Middle section — site link columns */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {footerSections.map((section) => (
            <div key={section.title}>
              <a
                href={section.url}
                className="text-sm font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:text-slate-300"
              >
                {section.title}
              </a>
              <ul className="mt-3 space-y-2.5">
                {section.tools.map((tool) => (
                  <li key={tool.name}>
                    <a
                      href={tool.href}
                      className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
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
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <span className="text-sm text-slate-500">
            &copy; 2026 {siteName}
          </span>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a
              href="/privacy"
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy
            </a>
            <span className="text-slate-700" aria-hidden="true">
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
