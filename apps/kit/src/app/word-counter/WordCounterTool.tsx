"use client";

import { useState, useMemo } from "react";

export function WordCounterTool() {
  const [text, setText] = useState("");

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

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      avgWordLength,
      readingTime,
      speakingTime,
    };
  }, [text]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        rows={10}
        className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Characters" value={stats.characters} />
        <StatCard label="No Spaces" value={stats.charactersNoSpaces} />
        <StatCard label="Sentences" value={stats.sentences} />
        <StatCard label="Paragraphs" value={stats.paragraphs} />
        <StatCard label="Avg Word Length" value={stats.avgWordLength} />
        <StatCard label="Reading Time" value={`${stats.readingTime} min`} />
        <StatCard label="Speaking Time" value={`${stats.speakingTime} min`} />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 text-center">
      <p className="text-2xl font-semibold text-[color:var(--color-text-primary)]">{value}</p>
      <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">{label}</p>
    </div>
  );
}
