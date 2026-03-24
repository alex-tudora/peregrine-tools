"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { FalconLogo } from "./FalconLogo";
import { CrossSiteNav } from "./CrossSiteNav";
import { ThemeToggle } from "./ThemeToggle";

interface Tool {
  name: string;
  href: string;
}

interface HeaderProps {
  siteName: string;
  currentSite?: string;
  currentTools?: Tool[];
  logo?: React.ReactNode;
  brandHref?: string;
  showFamilyNav?: boolean;
}

export function Header({
  siteName,
  currentSite,
  currentTools = [],
  logo,
  brandHref = "/",
  showFamilyNav = true,
}: HeaderProps) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [familyOpen, setFamilyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toolsRef = useRef<HTMLDivElement>(null);
  const familyRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setToolsOpen(false);
    setFamilyOpen(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (toolsRef.current && !toolsRef.current.contains(target)) {
        setToolsOpen(false);
      }
      if (familyRef.current && !familyRef.current.contains(target)) {
        setFamilyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        closeAll();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeAll]);

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-card)]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Brand */}
          <a href={brandHref} className="flex shrink-0 items-center gap-2.5">
            {logo || <FalconLogo size={36} className="-ml-1.5 " />}
            <span className="text-[15px] font-medium tracking-tight text-[color:var(--color-text-primary)]">
              {siteName}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden shrink-0 items-center gap-1 md:flex">
            {currentTools.length > 0 && (
              <div ref={toolsRef} className="relative">
                <button
                  onClick={() => {
                    setToolsOpen((prev) => !prev);
                    setFamilyOpen(false);
                  }}
                  className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    toolsOpen
                      ? "text-[color:var(--color-text-primary)]"
                      : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]"
                  }`}
                  aria-expanded={toolsOpen}
                  aria-haspopup="true"
                >
                  Tools
                  <svg
                    className={`h-3 w-3 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {toolsOpen && (
                  <div
                    className="absolute right-0 top-full mt-3 w-[26rem] rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-2 shadow-[var(--shadow-warm-xl)] animate-stoop"
                    style={{ transformOrigin: "top right" }}
                  >
                    <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3">
                      {currentTools.map((tool) => (
                        <a
                          key={tool.href}
                          href={tool.href}
                          className="rounded-lg px-3 py-2 text-[13px] text-[color:var(--color-text-secondary)] transition-colors duration-150 hover:bg-[color:var(--color-bg-elevated)] hover:text-[color:var(--color-text-primary)]"
                          onClick={closeAll}
                        >
                          {tool.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {showFamilyNav && (
              <>
                {/* Divider */}
                <span className="mx-1 h-4 w-px bg-[color:var(--color-border)]" aria-hidden="true" />

                {/* Peregrine Family */}
                <div ref={familyRef} className="relative">
                  <button
                    onClick={() => {
                      setFamilyOpen((prev) => !prev);
                      setToolsOpen(false);
                    }}
                    className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                      familyOpen
                        ? "text-[color:var(--color-text-primary)]"
                        : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]"
                    }`}
                    aria-expanded={familyOpen}
                    aria-haspopup="true"
                  >
                    All Sites
                    <svg
                      className={`h-3 w-3 transition-transform duration-200 ${familyOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {familyOpen && (
                    <div
                      className="absolute right-0 top-full mt-3 w-72 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-2 shadow-[var(--shadow-warm-xl)] animate-stoop"
                      style={{ transformOrigin: "top center" }}
                    >
                      <CrossSiteNav currentSite={currentSite} />
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[color:var(--color-text-muted)] transition-colors duration-200 hover:text-[color:var(--color-text-primary)] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={`absolute h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-200 ease-[var(--ease-peregrine)] ${mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px]"}`} />
            <span className={`absolute h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-200 ease-[var(--ease-peregrine)] ${mobileOpen ? "scale-x-0 opacity-0" : ""}`} />
            <span className={`absolute h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-200 ease-[var(--ease-peregrine)] ${mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px]"}`} />
          </button>
        </div>
      </header>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[color:var(--color-text-primary)]/15 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 flex h-full w-full max-w-[320px] flex-col bg-[color:var(--color-bg-card)] shadow-[var(--shadow-warm-xl)] animate-descend">
            {/* Panel header */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-[color:var(--color-border)] px-5">
              <div className="flex items-center gap-2.5">
                {logo || <FalconLogo size={36} className="-ml-1.5 " />}
                <span className="text-[15px] font-medium tracking-tight text-[color:var(--color-text-primary)]">
                  {siteName}
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text-primary)]"
                aria-label="Close menu"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-y-auto px-5 py-6">
              {currentTools.length > 0 && (
                <div className="mb-8">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
                    Tools
                  </p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {currentTools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        className="rounded-lg px-3 py-2 text-[13px] font-medium text-[color:var(--color-text-secondary)] transition-colors hover:text-[color:var(--color-text-primary)]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {tool.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {showFamilyNav && (
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
                    Peregrine Family
                  </p>
                  <CrossSiteNav currentSite={currentSite} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
