import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCompetitor, getAllCompetitorSlugs } from "../competitors";

export function generateStaticParams() {
  return getAllCompetitorSlugs().map((competitor) => ({ competitor }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor: slug } = await params;
  const data = getCompetitor(slug);
  if (!data) return {};

  const title = `Peregrine PDF vs ${data.name} — Honest Comparison`;
  const description = `Compare Peregrine PDF and ${data.name} on privacy, speed, cost, and features. See which PDF tool is right for you.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://peregrinepdf.com/compare/${slug}`,
      siteName: "Peregrine PDF",
      type: "website",
    },
    alternates: {
      canonical: `https://peregrinepdf.com/compare/${slug}`,
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: slug } = await params;
  const data = getCompetitor(slug);
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Hero */}
      <div className="text-center animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-xs font-medium text-[color:var(--color-text-secondary)] mb-6">
          Honest Comparison
        </div>
        <h1 className="font-semibold text-3xl md:text-4xl text-[color:var(--color-text-primary)]">
          Peregrine PDF vs {data.name}
        </h1>
        <p className="mt-4 text-lg text-[color:var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>

      {/* Comparison table */}
      <div className="mt-12 rounded-xl border border-[color:var(--color-border)] overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_1fr_1fr] bg-[color:var(--color-bg-elevated)] border-b border-[color:var(--color-border)]">
          <div className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
            Feature
          </div>
          <div className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-accent)] border-l border-[color:var(--color-border)]">
            Peregrine PDF
          </div>
          <div className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)] border-l border-[color:var(--color-border)]">
            {data.name}
          </div>
        </div>

        {/* Rows */}
        {data.features.map((feature, i) => (
          <div
            key={feature.category}
            className={`grid grid-cols-[1fr_1fr_1fr] ${
              i < data.features.length - 1 ? "border-b border-[color:var(--color-border)]" : ""
            }`}
          >
            <div className="px-4 py-3.5 text-sm font-medium text-[color:var(--color-text-primary)]">
              {feature.category}
            </div>
            <div
              className={`px-4 py-3.5 text-sm border-l border-[color:var(--color-border)] ${
                feature.winner === "peregrine"
                  ? "text-emerald-700 bg-emerald-50/50"
                  : "text-[color:var(--color-text-secondary)]"
              }`}
            >
              {feature.winner === "peregrine" && (
                <span className="mr-1.5">✓</span>
              )}
              {feature.peregrine}
            </div>
            <div
              className={`px-4 py-3.5 text-sm border-l border-[color:var(--color-border)] ${
                feature.winner === "competitor"
                  ? "text-emerald-700 bg-emerald-50/50"
                  : "text-[color:var(--color-text-secondary)]"
              }`}
            >
              {feature.winner === "competitor" && (
                <span className="mr-1.5">✓</span>
              )}
              {feature.competitor}
            </div>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div className="mt-10">
        <h2 className="font-semibold text-xl text-[color:var(--color-text-primary)] mb-3">
          The Verdict
        </h2>
        <p className="text-[color:var(--color-text-secondary)] leading-relaxed">
          {data.verdict}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-xl border border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] p-6 text-center">
        <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)]">
          Try Peregrine PDF — Free, Private, Instant
        </h3>
        <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
          No sign-up required. Your files never leave your device.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href="/merge-pdf"
            className="rounded-xl bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)]"
          >
            Merge PDF
          </a>
          <a
            href="/compress-pdf"
            className="rounded-xl bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)]"
          >
            Compress PDF
          </a>
          <a
            href="/split-pdf"
            className="rounded-xl border border-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent)] hover:text-white"
          >
            Split PDF
          </a>
        </div>
      </div>

      {/* Other comparisons */}
      <div className="mt-12">
        <h2 className="font-semibold text-lg text-[color:var(--color-text-primary)] mb-4">
          Other Comparisons
        </h2>
        <div className="flex flex-wrap gap-3">
          {getAllCompetitorSlugs()
            .filter((s) => s !== slug)
            .map((s) => {
              const c = getCompetitor(s)!;
              return (
                <a
                  key={s}
                  href={`/compare/${s}`}
                  className="rounded-lg border border-[color:var(--color-border)] px-4 py-2 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
                >
                  vs {c.name}
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
}
