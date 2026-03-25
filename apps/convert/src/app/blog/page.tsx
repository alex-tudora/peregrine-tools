import type { Metadata } from "next";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Conversion Tips & Guides | Convert-a-Lot Blog",
  description:
    "Practical guides on file conversion. Learn about image, video, audio, and document format differences and how to convert between them.",
  alternates: {
    canonical: "https://convert-a-lot.com/blog",
  },
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="text-center animate-fade-in-up">
        <h1 className="font-semibold text-3xl md:text-4xl text-[color:var(--color-text-primary)]">
          Conversion Tips & Guides
        </h1>
        <p className="mt-3 text-lg text-[color:var(--color-text-secondary)] leading-relaxed">
          Practical advice for working with file conversions
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 transition-all hover:border-[color:var(--color-accent)] hover:shadow-sm"
          >
            <div className="flex items-center gap-3 text-xs text-[color:var(--color-text-muted)]">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>&middot;</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-[color:var(--color-text-primary)] group-hover:text-[color:var(--color-accent)]">
              {post.title}
            </h2>
            <p className="mt-1.5 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
              {post.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
