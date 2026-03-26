"use client";

import { useState, useEffect } from "react";

const knightQuotes = [
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

export function RotatingQuote() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % knightQuotes.length);
        setVisible(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className="mt-4 text-base md:text-lg text-[color:var(--color-text-muted)] font-display italic transition-opacity duration-400 h-7"
      style={{ opacity: visible ? 1 : 0 }}
    >
      &ldquo;{knightQuotes[index]}&rdquo;
    </p>
  );
}
