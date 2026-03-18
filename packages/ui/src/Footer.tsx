import React from "react";
import { FalconLogo } from "./FalconLogo";

interface FooterProps {
  siteName?: string;
}

const footerSections = [
  {
    title: "Peregrine PDF",
    url: "https://peregrinepdf.com",
    color: "text-sky-400",
    tools: [
      { name: "Merge PDF", href: "https://peregrinepdf.com/merge-pdf" },
      { name: "Split PDF", href: "https://peregrinepdf.com/split-pdf" },
      { name: "Compress PDF", href: "https://peregrinepdf.com/compress-pdf" },
      { name: "PDF to JPG", href: "https://peregrinepdf.com/pdf-to-jpg" },
    ],
  },
  {
    title: "Peregrine Pix",
    url: "https://peregrinepix.com",
    color: "text-violet-400",
    tools: [
      { name: "Compress Image", href: "https://peregrinepix.com/compress-image" },
      { name: "Resize Image", href: "https://peregrinepix.com/resize-image" },
      { name: "Remove Background", href: "https://peregrinepix.com/remove-background" },
      { name: "PNG to JPG", href: "https://peregrinepix.com/png-to-jpg" },
    ],
  },
  {
    title: "Peregrine Kit",
    url: "https://peregrinekit.com",
    color: "text-emerald-400",
    tools: [
      { name: "Word Counter", href: "https://peregrinekit.com/word-counter" },
      { name: "Case Converter", href: "https://peregrinekit.com/case-converter" },
      { name: "Lorem Ipsum Generator", href: "https://peregrinekit.com/lorem-ipsum-generator" },
      { name: "QR Code Generator", href: "https://peregrinekit.com/qr-code-generator" },
    ],
  },
  {
    title: "Peregrine Vid",
    url: "https://peregrinevid.com",
    color: "text-rose-400",
    tools: [
      { name: "Compress Video", href: "https://peregrinevid.com/compress-video" },
      { name: "Trim Video", href: "https://peregrinevid.com/trim-video" },
      { name: "Video to GIF", href: "https://peregrinevid.com/video-to-gif" },
      { name: "Video to MP3", href: "https://peregrinevid.com/video-to-mp3" },
    ],
  },
  {
    title: "Peregrine Dev",
    url: "https://peregrinedev.com",
    color: "text-amber-400",
    tools: [
      { name: "JSON Formatter", href: "https://peregrinedev.com/json-formatter" },
      { name: "Regex Tester", href: "https://peregrinedev.com/regex-tester" },
      { name: "Base64 Encode/Decode", href: "https://peregrinedev.com/base64-encode-decode" },
      { name: "Color Picker", href: "https://peregrinedev.com/color-picker" },
    ],
  },
];

export function Footer({ siteName = "Peregrine Tools" }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {footerSections.map((section) => (
            <div key={section.title}>
              <a
                href={section.url}
                className={`text-sm font-semibold ${section.color} transition-colors hover:text-white`}
              >
                {section.title}
              </a>
              <ul className="mt-3 space-y-2">
                {section.tools.map((tool) => (
                  <li key={tool.name}>
                    <a
                      href={tool.href}
                      className="text-sm text-slate-400 transition-colors hover:text-slate-200"
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>&copy; {new Date().getFullYear()} Peregrine Tools</span>
            <span className="hidden sm:inline text-slate-700" aria-hidden="true">|</span>
            <a href="/privacy" className="transition-colors hover:text-slate-300">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-slate-300">
              Terms
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <span>Powered by</span>
            <span className="font-medium text-slate-400">{siteName}</span>
            <FalconLogo size={16} color="#94a3b8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
