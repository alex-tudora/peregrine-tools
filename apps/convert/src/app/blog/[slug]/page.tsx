import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getAllPostSlugs } from "../posts";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Convert-a-Lot Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://convert-a-lot.com/blog/${slug}`,
      siteName: "Convert-a-Lot",
      type: "article",
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://convert-a-lot.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 text-xs text-[color:var(--color-text-muted)]">
          <a
            href="/blog"
            className="hover:text-[color:var(--color-accent)] transition-colors"
          >
            Blog
          </a>
          <span>/</span>
        </div>

        <h1 className="mt-4 font-semibold text-3xl md:text-4xl text-[color:var(--color-text-primary)] leading-tight">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-3 text-sm text-[color:var(--color-text-muted)]">
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
      </div>

      {/* Content */}
      <div
        className="mt-10 prose prose-slate max-w-none
          prose-headings:font-semibold prose-headings:text-[color:var(--color-text-primary)]
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3
          prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-[color:var(--color-text-secondary)] prose-p:leading-relaxed
          prose-a:text-[color:var(--color-accent)] prose-a:no-underline hover:prose-a:underline
          prose-li:text-[color:var(--color-text-secondary)]
          prose-strong:text-[color:var(--color-text-primary)]
          prose-table:text-sm
          prose-th:text-left prose-th:py-2 prose-th:px-3 prose-th:bg-[color:var(--color-bg-elevated)] prose-th:text-[color:var(--color-text-primary)]
          prose-td:py-2 prose-td:px-3 prose-td:text-[color:var(--color-text-secondary)] prose-td:border-t prose-td:border-[color:var(--color-border)]
        "
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related tools */}
      {post.relatedTools.length > 0 && (
        <div className="mt-12 rounded-xl border border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] p-6">
          <h3 className="font-semibold text-base text-[color:var(--color-text-primary)]">
            Try these tools
          </h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {post.relatedTools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="rounded-lg bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)]"
              >
                {tool.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Back to blog */}
      <div className="mt-10">
        <a
          href="/blog"
          className="text-sm font-medium text-[color:var(--color-accent)] hover:underline"
        >
          ← All articles
        </a>
      </div>
    </article>
  );
}
