import React from "react";
import { FalconLogo } from "./FalconLogo";
import { peregrineSites, toolsForSite } from "./catalog";

interface FooterProps {
  siteName?: string;
  logo?: React.ReactNode;
}

/*
 * Derived from the single-source catalog — the first four tools of each site.
 * This replaces a hand-maintained list that had drifted (its Base64 link pointed
 * at the non-existent /base64-encode-decode instead of the real /base64).
 */
const sites = peregrineSites.map((site) => ({
  title: site.short,
  url: site.url,
  tools: toolsForSite(site.short).slice(0, 4),
}));

function NewsletterSignup() {
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
      <form
        action="https://buttondown.com/api/emails/embed-subscribe/peregrine"
        method="post"
        target="_blank"
        className="flex gap-2"
      >
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="h-10 w-56 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none"
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-lg bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          Subscribe
        </button>
      </form>
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
