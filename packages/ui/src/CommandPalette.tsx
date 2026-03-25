"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { allTools, siteOrder } from "./toolIndex";
import type { ToolEntry } from "./toolIndex";

/* ------------------------------------------------------------------ */
/*  Fuzzy match — same logic as ToolSearch                            */
/* ------------------------------------------------------------------ */
function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  const words = q.split(/\s+/).filter(Boolean);
  return words.every((w) => t.includes(w));
}

/* ------------------------------------------------------------------ */
/*  CommandPalette                                                     */
/* ------------------------------------------------------------------ */
interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  /** Optional override — defaults to the full allTools index */
  tools?: ToolEntry[];
}

export function CommandPalette({
  open,
  onClose,
  tools = allTools,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /* ---- Reset state when opened ---- */
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      // Small delay so the DOM is painted before we try to focus
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  /* ---- Lock body scroll while open ---- */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ---- Filtered results ---- */
  const results = useMemo(() => {
    if (!query.trim()) return tools;
    return tools.filter((t) => fuzzyMatch(query, `${t.name} ${t.site}`));
  }, [query, tools]);

  /* ---- Group by site in canonical order ---- */
  const grouped = useMemo(() => {
    const map: Record<string, ToolEntry[]> = {};
    for (const tool of results) {
      if (!map[tool.site]) map[tool.site] = [];
      map[tool.site].push(tool);
    }
    // Return in canonical order, skip empty groups
    return siteOrder
      .filter((s) => map[s]?.length)
      .map((s) => ({ site: s, tools: map[s]!, color: map[s]![0].siteColor }));
  }, [results]);

  /* ---- Flat list for arrow-key navigation ---- */
  const flatResults = results;

  /* ---- Navigate to a tool ---- */
  const go = useCallback(
    (tool: ToolEntry) => {
      onClose();
      window.location.href = tool.href;
    },
    [onClose],
  );

  /* ---- Scroll selected item into view ---- */
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-cp-item]");
    items[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  /* ---- Keyboard handling ---- */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatResults[selectedIndex]) go(flatResults[selectedIndex]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [flatResults, selectedIndex, go, onClose],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[min(20vh,160px)]"
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
    >
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-[color:var(--color-text-primary)]/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg mx-4 flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] shadow-[var(--shadow-warm-xl)] animate-stoop">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-[color:var(--color-border)] px-4">
          {/* Search icon */}
          <svg
            className="h-5 w-5 shrink-0 text-[color:var(--color-text-muted)]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search all tools..."
            className="h-12 flex-1 bg-transparent text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-list"
            aria-activedescendant={
              flatResults[selectedIndex]
                ? `cp-item-${selectedIndex}`
                : undefined
            }
          />
          {/* Escape hint */}
          <kbd className="hidden shrink-0 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-1.5 py-0.5 text-[11px] font-medium text-[color:var(--color-text-muted)] sm:inline-block">
            esc
          </kbd>
        </div>

        {/* Results list */}
        <div
          id="command-palette-list"
          ref={listRef}
          role="listbox"
          className="max-h-[min(60vh,400px)] overflow-y-auto overscroll-contain p-2"
        >
          {flatResults.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[color:var(--color-text-muted)]">
              No tools found
            </p>
          ) : (
            grouped.map(({ site, tools: siteTools, color }) => (
              <div key={site} role="group" aria-label={`Peregrine ${site}`}>
                <div className="px-3 pt-3 pb-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--color-text-muted)]">
                    Peregrine {site}
                  </span>
                </div>
                {siteTools.map((tool) => {
                  const flatIndex = flatResults.indexOf(tool);
                  const isSelected = flatIndex === selectedIndex;
                  return (
                    <a
                      key={tool.href}
                      id={`cp-item-${flatIndex}`}
                      data-cp-item
                      href={tool.href}
                      role="option"
                      aria-selected={isSelected}
                      onClick={(e) => {
                        e.preventDefault();
                        go(tool);
                      }}
                      onMouseEnter={() => setSelectedIndex(flatIndex)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-100 ${
                        isSelected
                          ? "bg-[color:var(--color-bg-elevated)] text-[color:var(--color-text-primary)]"
                          : "text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-bg-elevated)] hover:text-[color:var(--color-text-primary)]"
                      }`}
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                      <span className="flex-1 truncate font-medium">
                        {tool.name}
                      </span>
                      {isSelected && (
                        <kbd className="hidden shrink-0 text-[11px] text-[color:var(--color-text-muted)] sm:inline-block">
                          Enter
                        </kbd>
                      )}
                    </a>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 border-t border-[color:var(--color-border)] px-4 py-2 text-[11px] text-[color:var(--color-text-muted)]">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-1 py-px font-mono text-[10px]">
              &uarr;
            </kbd>
            <kbd className="rounded border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-1 py-px font-mono text-[10px]">
              &darr;
            </kbd>
            <span className="ml-0.5">navigate</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-1 py-px font-mono text-[10px]">
              &crarr;
            </kbd>
            <span className="ml-0.5">open</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-1 py-px font-mono text-[10px]">
              esc
            </kbd>
            <span className="ml-0.5">close</span>
          </span>
        </div>
      </div>
    </div>
  );
}
