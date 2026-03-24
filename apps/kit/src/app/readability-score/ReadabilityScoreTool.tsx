"use client";

import { useState, useMemo } from "react";

function countSyllables(word: string): number {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  if (cleaned.length <= 2) return 1;

  // Count vowel groups
  const vowelGroups = cleaned.match(/[aeiouy]+/g);
  let count = vowelGroups ? vowelGroups.length : 1;

  // Subtract silent e at end
  if (cleaned.endsWith("e") && count > 1) {
    count--;
  }

  // Handle common suffixes
  if (cleaned.endsWith("le") && cleaned.length > 2 && !/[aeiouy]/.test(cleaned[cleaned.length - 3])) {
    count++;
  }

  return Math.max(1, count);
}

interface ReadabilityStats {
  words: number;
  sentences: number;
  syllables: number;
  avgSentenceLength: number;
  avgSyllablesPerWord: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
}

function analyzeReadability(text: string): ReadabilityStats {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      words: 0,
      sentences: 0,
      syllables: 0,
      avgSentenceLength: 0,
      avgSyllablesPerWord: 0,
      fleschReadingEase: 0,
      fleschKincaidGrade: 0,
    };
  }

  const wordList = trimmed.split(/\s+/).filter((w) => w.length > 0);
  const words = wordList.length;

  // Count sentences by splitting on sentence-ending punctuation
  const sentenceMatches = trimmed.match(/[.!?]+/g);
  const sentences = sentenceMatches ? sentenceMatches.length : (words > 0 ? 1 : 0);

  const syllables = wordList.reduce((sum, word) => sum + countSyllables(word), 0);

  const avgSentenceLength = sentences > 0 ? words / sentences : 0;
  const avgSyllablesPerWord = words > 0 ? syllables / words : 0;

  // Flesch Reading Ease = 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
  const fleschReadingEase =
    words > 0 && sentences > 0
      ? 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord
      : 0;

  // Flesch-Kincaid Grade Level = 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
  const fleschKincaidGrade =
    words > 0 && sentences > 0
      ? 0.39 * avgSentenceLength + 11.8 * avgSyllablesPerWord - 15.59
      : 0;

  return {
    words,
    sentences,
    syllables,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
    fleschReadingEase: Math.round(Math.max(0, Math.min(100, fleschReadingEase)) * 10) / 10,
    fleschKincaidGrade: Math.round(Math.max(0, fleschKincaidGrade) * 10) / 10,
  };
}

function getReadabilityLabel(score: number): string {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 70) return "Fairly Easy";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly Difficult";
  if (score >= 30) return "Difficult";
  return "Very Difficult";
}

function getReadabilityColor(score: number): string {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-[color:var(--color-error)]";
}

function getReadabilityTextColor(score: number): string {
  if (score >= 70) return "text-emerald-700";
  if (score >= 50) return "text-amber-700";
  return "text-[color:var(--color-error)]";
}

function getReadabilityBgColor(score: number): string {
  if (score >= 70) return "bg-emerald-50";
  if (score >= 50) return "bg-amber-50";
  return "bg-[color:var(--color-error-bg,#fef2f2)]";
}

export function ReadabilityScoreTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => analyzeReadability(text), [text]);

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here to analyze its readability..."
        rows={10}
        className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />

      {stats.words > 0 && (
        <>
          {/* Flesch Reading Ease gauge */}
          <div className={`rounded-xl p-5 ${getReadabilityBgColor(stats.fleschReadingEase)}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-[color:var(--color-text-secondary)]">Flesch Reading Ease</p>
                <p className={`text-3xl font-bold ${getReadabilityTextColor(stats.fleschReadingEase)}`}>
                  {stats.fleschReadingEase}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium text-white ${getReadabilityColor(stats.fleschReadingEase)}`}
              >
                {getReadabilityLabel(stats.fleschReadingEase)}
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-[color:var(--color-bg-card)]/60 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getReadabilityColor(stats.fleschReadingEase)}`}
                style={{ width: `${Math.min(100, stats.fleschReadingEase)}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-[color:var(--color-text-muted)]">
              <span>Difficult</span>
              <span>Standard</span>
              <span>Easy</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 text-center">
              <p className="text-2xl font-semibold text-[color:var(--color-text-primary)]">{stats.fleschKincaidGrade}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">Grade Level</p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 text-center">
              <p className="text-2xl font-semibold text-[color:var(--color-text-primary)]">{stats.avgSentenceLength}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">Avg Sentence Length</p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 text-center">
              <p className="text-2xl font-semibold text-[color:var(--color-text-primary)]">{stats.avgSyllablesPerWord}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">Avg Syllables/Word</p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 text-center">
              <p className="text-2xl font-semibold text-[color:var(--color-text-primary)]">{stats.words}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">Words</p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 text-center">
              <p className="text-2xl font-semibold text-[color:var(--color-text-primary)]">{stats.sentences}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">Sentences</p>
            </div>
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4 text-center">
              <p className="text-2xl font-semibold text-[color:var(--color-text-primary)]">{stats.syllables}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">Syllables</p>
            </div>
          </div>

          {/* Score interpretation */}
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5">
            <p className="text-sm font-medium text-[color:var(--color-text-secondary)] mb-3">Reading Ease Scale</p>
            <div className="space-y-2 text-xs text-[color:var(--color-text-secondary)]">
              <div className="flex justify-between"><span>90-100: Very Easy (5th grade)</span><span className="text-emerald-600 font-medium">Easy</span></div>
              <div className="flex justify-between"><span>80-89: Easy (6th grade)</span><span className="text-emerald-600 font-medium">Easy</span></div>
              <div className="flex justify-between"><span>70-79: Fairly Easy (7th grade)</span><span className="text-emerald-600 font-medium">Easy</span></div>
              <div className="flex justify-between"><span>60-69: Standard (8th-9th grade)</span><span className="text-amber-600 font-medium">Medium</span></div>
              <div className="flex justify-between"><span>50-59: Fairly Difficult (10th-12th grade)</span><span className="text-amber-600 font-medium">Medium</span></div>
              <div className="flex justify-between"><span>30-49: Difficult (College)</span><span className="text-[color:var(--color-error)] font-medium">Hard</span></div>
              <div className="flex justify-between"><span>0-29: Very Difficult (College graduate)</span><span className="text-[color:var(--color-error)] font-medium">Hard</span></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
