"use client";

import { useState, useMemo } from "react";

export function CharacterCounterTool() {
  const [text, setText] = useState("");
  const [charLimit, setCharLimit] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    const sentences =
      trimmed === "" ? 0 : (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0);

    const limit = charLimit ? parseInt(charLimit, 10) : null;
    const remaining = limit !== null && !isNaN(limit) ? limit - characters : null;

    return { characters, charactersNoSpaces, words, sentences, remaining, limit };
  }, [text, charLimit]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        rows={10}
        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />

      <div className="flex items-center gap-3">
        <label htmlFor="char-limit" className="text-sm font-medium text-slate-700 shrink-0">
          Character limit (optional):
        </label>
        <input
          id="char-limit"
          type="number"
          min="0"
          value={charLimit}
          onChange={(e) => setCharLimit(e.target.value)}
          placeholder="e.g. 280"
          className="w-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {stats.remaining !== null && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            stats.remaining >= 0
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {stats.remaining >= 0
            ? `${stats.remaining} character${stats.remaining !== 1 ? "s" : ""} remaining`
            : `${Math.abs(stats.remaining)} character${Math.abs(stats.remaining) !== 1 ? "s" : ""} over the limit`}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Characters" value={stats.characters} />
        <StatCard label="No Spaces" value={stats.charactersNoSpaces} />
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Sentences" value={stats.sentences} />
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
    <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}
