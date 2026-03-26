"use client";

import { useRecentActivity } from "./useRecentActivity";

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

export function RecentActivity() {
  const { entries } = useRecentActivity();

  if (entries.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 mb-8">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)] mb-4">
        Recent Activity
      </h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {entries.slice(0, 6).map((entry, i) => (
          <a
            key={`${entry.toolHref}-${i}`}
            href={entry.toolHref}
            className="group flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 transition-all hover:border-[color:var(--color-accent)] hover:shadow-sm"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[color:var(--color-text-primary)] group-hover:text-[color:var(--color-accent)] truncate">
                {entry.tool}
              </p>
              <p className="text-xs text-[color:var(--color-text-muted)] truncate">
                {entry.description}
              </p>
            </div>
            <span className="shrink-0 text-[10px] text-[color:var(--color-text-muted)]">
              {timeAgo(entry.timestamp)}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
