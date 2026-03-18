"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { FalconLogo } from "./FalconLogo";
import { CrossSiteNav } from "./CrossSiteNav";

interface Tool {
  name: string;
  href: string;
}

interface HeaderProps {
  siteName: string;
  accentColor?: string;
  currentSite?: string;
  currentTools?: Tool[];
}

export function Header({
  siteName,
  accentColor = "#0ea5e9",
  currentSite,
  currentTools = [],
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

  // Lock body scroll when mobile menu is open
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

  return (
    <>
      <header className="sticky top-0 z-50 h-16 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo + site name */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <FalconLogo size={28} color={accentColor} />
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              {siteName}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-8 flex-1">
            {/* Tools dropdown */}
            {currentTools.length > 0 && (
              <div ref={toolsRef} className="relative">
                <button
                  onClick={() => {
                    setToolsOpen(!toolsOpen);
                    setFamilyOpen(false);
                  }}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  aria-expanded={toolsOpen}
                  aria-haspopup="true"
                >
                  Tools
                  <svg
                    className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {toolsOpen && (
                  <div className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/50">
                    {currentTools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                        onClick={closeAll}
                      >
                        {tool.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Desktop: Peregrine Family dropdown */}
          <div ref={familyRef} className="relative hidden md:block">
            <button
              onClick={() => {
                setFamilyOpen(!familyOpen);
                setToolsOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-expanded={familyOpen}
              aria-haspopup="true"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Peregrine Family
              <svg
                className={`h-4 w-4 transition-transform ${familyOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {familyOpen && (
              <div className="absolute right-0 top-full mt-1 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Our Sites
                </p>
                <CrossSiteNav currentSite={currentSite} />
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            {/* Panel header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
              <div className="flex items-center gap-2.5">
                <FalconLogo size={24} color={accentColor} />
                <span className="text-lg font-bold text-slate-900">{siteName}</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              {/* Tools */}
              {currentTools.length > 0 && (
                <div className="mb-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Tools
                  </p>
                  <div className="flex flex-col gap-1">
                    {currentTools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                        onClick={() => setMobileOpen(false)}
                      >
                        {tool.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Peregrine Family */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Peregrine Family
                </p>
                <CrossSiteNav currentSite={currentSite} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
