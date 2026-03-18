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

  // Click outside to close dropdowns
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

  // Close mobile menu on escape key
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
      <header className="sticky top-0 z-50 h-16 border-b border-[color:var(--color-border,theme(colors.slate.200/60))] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/* Left: Logo + site name */}
          <a href="/" className="flex shrink-0 items-center gap-2.5">
            <FalconLogo size={28} color={accentColor} />
            <span className="font-serif text-lg font-semibold tracking-tight text-slate-900">
              {siteName}
            </span>
          </a>

          {/* Desktop nav — center-right */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* Tools dropdown */}
            {currentTools.length > 0 && (
              <div ref={toolsRef} className="relative">
                <button
                  onClick={() => {
                    setToolsOpen((prev) => !prev);
                    setFamilyOpen(false);
                  }}
                  className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-500 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-slate-50 hover:text-slate-900"
                  aria-expanded={toolsOpen}
                  aria-haspopup="true"
                >
                  Tools
                  <svg
                    className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${toolsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Tools dropdown panel */}
                {toolsOpen && (
                  <div className="absolute left-0 top-full mt-2 w-[28rem] rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-black/5">

                    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                      {currentTools.map((tool) => (
                        <a
                          key={tool.href}
                          href={tool.href}
                          className="rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-slate-50 hover:text-slate-900"
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

            {/* Peregrine Family dropdown */}
            <div ref={familyRef} className="relative">
              <button
                onClick={() => {
                  setFamilyOpen((prev) => !prev);
                  setToolsOpen(false);
                }}
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-500 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-slate-50 hover:text-slate-900"
                aria-expanded={familyOpen}
                aria-haspopup="true"
              >
                Peregrine Family
                <svg
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${familyOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Family dropdown panel */}
              {familyOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-lg shadow-black/5">

                  <CrossSiteNav currentSite={currentSite} />
                </div>
              )}
            </div>
          </nav>

          {/* Mobile hamburger / close */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {/* Top line */}
            <span
              className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                mobileOpen
                  ? "translate-y-0 rotate-45"
                  : "-translate-y-[5px] rotate-0"
              }`}
            />
            {/* Middle line */}
            <span
              className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                mobileOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
              }`}
            />
            {/* Bottom line */}
            <span
              className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                mobileOpen
                  ? "translate-y-0 -rotate-45"
                  : "translate-y-[5px] rotate-0"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile slide-out panel */}
      {mobileOpen && (
      <div
        className="fixed inset-0 z-[60] md:hidden"
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl shadow-black/10">

          {/* Panel header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-[color:var(--color-border,theme(colors.slate.200/60))] px-6">
            <div className="flex items-center gap-2.5">
              <FalconLogo size={24} color={accentColor} />
              <span className="font-serif text-lg font-semibold tracking-tight text-slate-900">
                {siteName}
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            {/* Tools section */}
            {currentTools.length > 0 && (
              <div className="mb-10">
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                  Tools
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {currentTools.map((tool) => (
                    <a
                      key={tool.href}
                      href={tool.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900"
                      onClick={() => setMobileOpen(false)}
                    >
                      {tool.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Peregrine Family section */}
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                Peregrine Family
              </p>
              <CrossSiteNav currentSite={currentSite} />
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Keyframe animation for dropdown fade-in */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fade-in-down {
              from {
                opacity: 0;
                transform: translateY(-4px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `,
        }}
      />
    </>
  );
}
