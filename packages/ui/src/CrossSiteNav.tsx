"use client";

import React from "react";

interface SiteInfo {
  name: string;
  slug: string;
  url: string;
  color: string;
  bgColor: string;
  hoverBg: string;
  description: string;
}

const sites: SiteInfo[] = [
  {
    name: "Peregrine PDF",
    slug: "pdf",
    url: "https://peregrinepdf.com",
    color: "text-sky-500",
    bgColor: "bg-sky-50",
    hoverBg: "hover:bg-sky-50",
    description: "Merge, split, compress, and convert PDF files",
  },
  {
    name: "Peregrine Pix",
    slug: "pix",
    url: "https://peregrinepix.com",
    color: "text-violet-500",
    bgColor: "bg-violet-50",
    hoverBg: "hover:bg-violet-50",
    description: "Compress, resize, and transform images",
  },
  {
    name: "Peregrine Kit",
    slug: "kit",
    url: "https://peregrinekit.com",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    hoverBg: "hover:bg-emerald-50",
    description: "Text utilities, generators, and everyday tools",
  },
  {
    name: "Peregrine Vid",
    slug: "vid",
    url: "https://peregrinevid.com",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    hoverBg: "hover:bg-rose-50",
    description: "Compress, trim, and convert video files",
  },
  {
    name: "Peregrine Dev",
    slug: "dev",
    url: "https://peregrinedev.com",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    hoverBg: "hover:bg-amber-50",
    description: "JSON, regex, encoding, and developer utilities",
  },
];

interface CrossSiteNavProps {
  currentSite?: string;
  className?: string;
}

export function CrossSiteNav({ currentSite, className = "" }: CrossSiteNavProps) {
  return (
    <nav className={`flex flex-col gap-1 ${className}`} aria-label="Peregrine sites">
      {sites.map((site) => {
        const isCurrent = currentSite === site.slug;
        return (
          <a
            key={site.slug}
            href={site.url}
            className={`
              flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors
              ${isCurrent ? `${site.bgColor} ring-1 ring-inset ring-current/10` : `${site.hoverBg}`}
            `}
            {...(isCurrent ? { "aria-current": "page" as const } : {})}
          >
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white ${
                site.slug === "pdf"
                  ? "bg-sky-500"
                  : site.slug === "pix"
                  ? "bg-violet-500"
                  : site.slug === "kit"
                  ? "bg-emerald-500"
                  : site.slug === "vid"
                  ? "bg-rose-500"
                  : "bg-amber-500"
              }`}
            >
              {site.slug.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <div className={`text-sm font-semibold ${isCurrent ? site.color : "text-slate-900"}`}>
                {site.name}
                {isCurrent && (
                  <span className="ml-2 inline-block rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    You are here
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 leading-snug">{site.description}</div>
            </div>
          </a>
        );
      })}
    </nav>
  );
}

export { sites as peregrineSites };
export type { SiteInfo };
