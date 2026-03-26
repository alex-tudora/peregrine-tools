"use client";

import React, { useState } from "react";
import { FalconLogo } from "./FalconLogo";

interface FooterProps {
  siteName?: string;
  logo?: React.ReactNode;
}

const sites = [
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
      { name: "Compress Image", href: "https://peregrinepix.com/compress-image" },
      { name: "Resize Image", href: "https://peregrinepix.com/resize-image" },
      { name: "Remove BG", href: "https://peregrinepix.com/remove-background" },
      { name: "PNG to JPG", href: "https://peregrinepix.com/png-to-jpg" },
    ],
  },
  {
    title: "Kit",
    url: "https://peregrinekit.com",
    tools: [
      { name: "Word Counter", href: "https://peregrinekit.com/word-counter" },
      { name: "Case Converter", href: "https://peregrinekit.com/case-converter" },
      { name: "Lorem Ipsum", href: "https://peregrinekit.com/lorem-ipsum-generator" },
      { name: "QR Generator", href: "https://peregrinekit.com/qr-code-generator" },
    ],
  },
  {
    title: "Vid",
    url: "https://peregrinevid.com",
    tools: [
      { name: "Compress Video", href: "https://peregrinevid.com/compress-video" },
      { name: "Trim Video", href: "https://peregrinevid.com/trim-video" },
      { name: "Video to GIF", href: "https://peregrinevid.com/video-to-gif" },
      { name: "Video to MP3", href: "https://peregrinevid.com/video-to-mp3" },
    ],
  },
  {
    title: "Dev",
    url: "https://peregrinedev.com",
    tools: [
      { name: "JSON Formatter", href: "https://peregrinedev.com/json-formatter" },
      { name: "Regex Tester", href: "https://peregrinedev.com/regex-tester" },
      { name: "Base64", href: "https://peregrinedev.com/base64-encode-decode" },
      { name: "Color Picker", href: "https://peregrinedev.com/color-picker" },
    ],
  },
];

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("https://api.buttondown.com/v1/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.NEXT_PUBLIC_BUTTONDOWN_API_KEY ?? ""}`,
        },
        body: JSON.stringify({ email_address: email, tags: ["peregrine-tools"] }),
      });

      if (res.ok || res.status === 201) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json().catch(() => null);
        if (data?.email_address?.[0]?.includes("already")) {
          setStatus("success");
          setEmail("");
        } else {
          setStatus("error");
        }
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        You're in! We'll let you know when we launch new tools.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-white/80">
          Get notified about new tools
        </p>
        <p className="mt-1 text-xs text-white/30">
          We build new tools every month. No spam, unsubscribe anytime.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="h-10 w-56 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-10 shrink-0 rounded-lg bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs text-red-400">Something went wrong. Try again.</p>
      )}
    </div>
  );
}

export function Footer({ siteName = "Peregrine Tools", logo }: FooterProps) {
  return (
    <footer className="bg-[color:var(--color-bg-dark)]">
      {/* Brand row */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-12 pb-8">
        <div className="flex items-center gap-2.5">
          <FalconLogo size={48} className="-ml-2 invert mix-blend-screen" />
          <span className="-ml-1 text-xl font-semibold tracking-tight text-white">
            Peregrine
          </span>
        </div>
      </div>

      {/* Site columns */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {sites.map((site) => (
            <div key={site.title}>
              <a
                href={site.url}
                className="text-[11px] font-semibold uppercase tracking-widest text-white/60 transition-colors duration-200 hover:text-white"
              >
                {site.title}
              </a>
              <ul className="mt-3 space-y-2">
                {site.tools.map((tool) => (
                  <li key={tool.name}>
                    <a
                      href={tool.href}
                      className="text-[13px] text-white/30 transition-colors duration-200 hover:text-white/70"
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

      {/* Newsletter signup */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
          <NewsletterSignup />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
          <span className="text-xs text-white/25">
            &copy; 2026 {siteName}
          </span>
          <div className="flex items-center gap-5 text-xs text-white/25">
            <a href="/blog" className="transition-colors duration-200 hover:text-white/60">
              Blog
            </a>
            <a href="/privacy" className="transition-colors duration-200 hover:text-white/60">
              Privacy
            </a>
            <a href="/terms" className="transition-colors duration-200 hover:text-white/60">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
