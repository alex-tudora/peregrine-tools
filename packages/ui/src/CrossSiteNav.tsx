"use client";

import React from "react";
import { peregrineSites as sites, type SiteInfo } from "./catalog";

interface CrossSiteNavProps {
  currentSite?: string;
  className?: string;
}

export function CrossSiteNav({
  currentSite,
  className = "",
}: CrossSiteNavProps) {
  return (
    <nav
      className={`flex flex-col gap-0.5 ${className}`}
      aria-label="Peregrine sites"
    >
      {sites.map((site) => {
        const isCurrent = currentSite === site.slug;
        return (
          <a
            key={site.slug}
            href={site.url}
            className={`
              group flex items-center gap-3.5 rounded-lg px-3 py-3
              transition-all duration-200 ease-[var(--ease-peregrine)]
              ${
                isCurrent
                  ? "bg-[color:var(--color-bg-elevated)]"
                  : "hover:bg-[color:var(--color-bg-elevated)]/80"
              }
            `}
            {...(isCurrent ? { "aria-current": "page" as const } : {})}
          >
            {/* Colored dot */}
            <span
              className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-125"
              style={{ backgroundColor: site.accent }}
              aria-hidden="true"
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-[color:var(--color-text-primary)]">
                  {site.name}
                </span>
                {isCurrent && (
                  <span className="rounded-full bg-[color:var(--color-border)] px-2 py-0.5 text-[10px] font-medium leading-none text-[color:var(--color-text-muted)]">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-[color:var(--color-text-muted)]">
                {site.tagline}
              </p>
            </div>
          </a>
        );
      })}
    </nav>
  );
}

export { sites as peregrineSites };
export type { SiteInfo };
