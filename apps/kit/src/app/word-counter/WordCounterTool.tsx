"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { AnimatedNumber } from "@peregrine/ui";

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 2) return 1;
  const vowelGroups = w.match(/[aeiouy]+/g);
  if (!vowelGroups) return 1;
  let count = vowelGroups.length;
  // Silent e at end
  if (w.endsWith("e") && count > 1) count--;
  return Math.max(1, count);
}

function getFleschKincaid(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const wordList = trimmed.split(/\s+/).filter((w) => w.length > 0);
  const words = wordList.length;
  if (words === 0) return 0;
  const sentences = (trimmed.match(/[.!?]+/g) || []).length || 1;
  const syllables = wordList.reduce((sum, w) => sum + countSyllables(w), 0);
  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.max(0, Math.min(100, score));
}

function getReadingLevel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "Very Easy", color: "emerald" };
  if (score >= 70) return { label: "Easy", color: "green" };
  if (score >= 50) return { label: "Standard", color: "amber" };
  if (score >= 30) return { label: "Difficult", color: "orange" };
  return { label: "Very Difficult", color: "red" };
}

const MILESTONES = [100, 500, 1000, 5000];

export function WordCounterTool() {
  const [text, setText] = useState("");
  const [copiedStats, setCopiedStats] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const prevWordCountRef = useRef(0);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences =
      trimmed === "" ? 0 : (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0);
    const paragraphs =
      trimmed === ""
        ? 0
        : trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
    const avgWordLength =
      words > 0
        ? (
            trimmed
              .split(/\s+/)
              .reduce((sum, w) => sum + w.replace(/[^a-zA-Z]/g, "").length, 0) / words
          ).toFixed(1)
        : "0.0";
    const readingTime = Math.max(1, Math.ceil(words / 200));
    const speakingTime = Math.max(1, Math.ceil(words / 130));
    const fleschScore = getFleschKincaid(text);
    const readingLevel = getReadingLevel(fleschScore);

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      avgWordLength,
      readingTime,
      speakingTime,
      fleschScore,
      readingLevel,
    };
  }, [text]);

  // Milestone detection
  useEffect(() => {
    const prev = prevWordCountRef.current;
    const curr = stats.words;
    for (const m of MILESTONES) {
      if (prev < m && curr >= m) {
        setActiveMilestone(m);
        const timer = setTimeout(() => setActiveMilestone(null), 2500);
        prevWordCountRef.current = curr;
        return () => clearTimeout(timer);
      }
    }
    prevWordCountRef.current = curr;
  }, [stats.words]);

  const readingTimePercent = Math.min(100, Math.max(0, stats.readingTime * 10));

  function copyStats() {
    const formatted = [
      `Words: ${stats.words}`,
      `Characters: ${stats.characters}`,
      `Characters (no spaces): ${stats.charactersNoSpaces}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Avg Word Length: ${stats.avgWordLength}`,
      `Reading Time: ${stats.readingTime} min`,
      `Speaking Time: ${stats.speakingTime} min`,
      `Readability: ${stats.readingLevel.label} (Flesch-Kincaid: ${Math.round(stats.fleschScore)})`,
    ].join("\n");
    navigator.clipboard.writeText(formatted).then(() => {
      setCopiedStats(true);
      setTimeout(() => setCopiedStats(false), 2000);
    });
  }

  const isEmpty = text.trim() === "";

  const badgeColorMap: Record<string, string> = {
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    green:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    amber:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    orange:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text to see live word count, reading time, and readability analysis..."
        rows={10}
        className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />

      {isEmpty ? (
        <div className="rounded-xl border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-6 py-10 text-center">
          <p className="text-sm text-[color:var(--color-text-muted)]">
            Start typing or paste your text to see live word count, reading
            time, and readability analysis...
          </p>
        </div>
      ) : (
        <>
          {/* Milestone badge */}
          {activeMilestone !== null && (
            <div className="flex justify-center">
              <span className="animate-pulse rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                {activeMilestone.toLocaleString()} words!
              </span>
            </div>
          )}

          {/* Reading level + reading time bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[color:var(--color-text-muted)]">
                Readability
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeColorMap[stats.readingLevel.color]}`}
              >
                {stats.readingLevel.label}
              </span>
              <span className="text-xs text-[color:var(--color-text-muted)]">
                Score: {Math.round(stats.fleschScore)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[color:var(--color-text-muted)]">
                Reading time
              </span>
              <div className="h-2 w-28 overflow-hidden rounded-full bg-[color:var(--color-border)]">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${readingTimePercent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-[color:var(--color-text-secondary)]">
                {stats.readingTime} min
              </span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Words" value={stats.words} primary />
            <StatCard label="Characters" value={stats.characters} />
            <StatCard label="No Spaces" value={stats.charactersNoSpaces} />
            <StatCard label="Sentences" value={stats.sentences} />
            <StatCard label="Paragraphs" value={stats.paragraphs} />
            <StatCard
              label="Avg Word Length"
              value={stats.avgWordLength}
              decimals={1}
            />
            <StatCard
              label="Reading Time"
              value={stats.readingTime}
              suffix=" min"
            />
            <StatCard
              label="Speaking Time"
              value={stats.speakingTime}
              suffix=" min"
            />
          </div>

          {/* Copy stats button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={copyStats}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-border)]"
            >
              {copiedStats ? (
                <>
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Stats
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  primary = false,
  suffix = "",
  decimals,
}: {
  label: string;
  value: string | number;
  primary?: boolean;
  suffix?: string;
  decimals?: number;
}) {
  const isNumeric = typeof value === "number";

  return (
    <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
      <p
        className={`font-semibold text-emerald-600 dark:text-emerald-400 ${primary ? "text-3xl" : "text-2xl"}`}
      >
        {isNumeric ? (
          <AnimatedNumber
            value={value}
            suffix={suffix}
            decimals={decimals ?? 0}
          />
        ) : (
          value
        )}
      </p>
      <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">
        {label}
      </p>
    </div>
  );
}
