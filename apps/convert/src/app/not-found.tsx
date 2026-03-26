import Link from "next/link";
import { KnightLogo } from "./KnightLogo";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <KnightLogo size={80} className="mb-6 opacity-80" />
      <p className="text-8xl font-bold text-[color:var(--color-accent)]">404</p>

      <h1 className="mt-6 font-display text-2xl font-semibold text-[color:var(--color-text-primary)]">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-lg text-[color:var(--color-text-secondary)] leading-relaxed">
        The knight looked everywhere. He checked the castle, the moat, even
        behind the drawbridge. This page doesn&apos;t exist.
      </p>

      <p className="mt-6 text-[color:var(--color-text-muted)] italic font-display">
        Maybe try converting something instead?
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-[color:var(--color-accent)] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[color:var(--color-accent-hover)] hover:shadow-[var(--shadow-warm-accent)]"
      >
        Back to Converting
      </Link>

      <div className="mt-10">
        <p className="text-sm font-medium text-[color:var(--color-text-muted)]">
          Or try one of these popular conversions:
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {[
            { name: "PDF to JPG", href: "/pdf-to-jpg" },
            { name: "PNG to JPG", href: "/png-to-jpg" },
            { name: "MP4 to MP3", href: "/mp4-to-mp3" },
            { name: "JSON to CSV", href: "/json-to-csv" },
          ].map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="rounded-lg border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-text-secondary)] transition-all hover:border-[color:var(--color-accent)]/40 hover:text-[color:var(--color-accent)]"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
