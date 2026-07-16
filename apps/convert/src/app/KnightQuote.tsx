"use client";

import { useState, useEffect } from "react";

/** Punchy one-liners for the homepage hero (previously RotatingQuote). */
export const HERO_QUOTES = [
  "Zero quests completed. Millions of files converted.",
  "His armor's rusty. His conversions are flawless.",
  "Lost every tournament. Never lost a file.",
  "His horse left him. His uptime didn't.",
  "Chivalry's dead. Free file conversion isn't.",
  "No sword. No shield. No subscription fee.",
  "The only knight who actually does something useful.",
  "Still can't ride a horse.",
  "Fast. Free. Feudal.",
  "Files converted per day: a lot. Maidens rescued: zero.",
];

/** Medieval quips shown once per tool page. */
export const TOOL_QUOTES = [
  "We joust with file formats so you don't have to.",
  "'Tis but a file format!",
  "One does not simply change a file extension and hope for the best.",
  "Hear ye, hear ye! Thy conversion awaits.",
  "May your files be converted and your inbox be empty.",
  "To convert, or not to convert? That's not even a question.",
  "We put the 'knight' in... okay there's no pun there.",
  "Ye olde file converter.",
  "Court dismissed. Your file is ready.",
  "Our knight in shining armor... is more of a knight in slightly dented aluminum.",
  "He tried slaying a dragon once. It did not go well.",
  "Dropped his lance. Grabbed your file.",
  "Converting files since the Middle Ages.",
  "No round table. No square deal. Just free conversions.",
  "Couldn't rescue a princess. Could rescue your PowerPoint.",
];

interface KnightQuoteProps {
  /** Which pool to draw from. Defaults to the per-tool quips. */
  quotes?: string[];
  /** When true, cycle through the pool; otherwise pick one at random. */
  rotating?: boolean;
  intervalMs?: number;
  className?: string;
}

/**
 * One component for both the rotating hero quote and the static per-tool quip.
 * (Replaces the near-identical RotatingQuote + KnightQuote pair.)
 */
export function KnightQuote({
  quotes = TOOL_QUOTES,
  rotating = false,
  intervalMs = 5000,
  className,
}: KnightQuoteProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIndex(Math.floor(Math.random() * quotes.length));
    if (!rotating) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setVisible(true);
      }, 400);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [rotating, intervalMs, quotes.length]);

  if (!mounted) return null;

  const defaultClass = rotating
    ? "mt-4 text-base md:text-lg text-[color:var(--color-text-muted)] font-display italic transition-opacity duration-400 h-7"
    : "mt-2 text-sm italic text-[color:var(--color-text-muted)] font-display animate-arrive delay-1";

  return (
    <p className={className ?? defaultClass} style={{ opacity: visible ? 1 : 0 }}>
      &ldquo;{quotes[index]}&rdquo;
    </p>
  );
}
