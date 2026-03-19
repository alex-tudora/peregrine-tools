import Link from "next/link";
import { FalconLogo } from "@peregrine/ui";

const suggestedTools = [
  { name: "Compress Image", href: "/compress-image" },
  { name: "Resize Image", href: "/resize-image" },
  { name: "Crop Image", href: "/crop-image" },
  { name: "PNG to JPG", href: "/png-to-jpg" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <FalconLogo size={64} className="mb-6" />

      <p className="text-8xl font-bold text-falcon-navy">404</p>

      <h1 className="mt-4 text-2xl font-semibold text-[color:var(--color-text-primary)]">
        Page Not Found
      </h1>

      <p className="mt-3 max-w-md text-[color:var(--color-text-muted)]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)]"
      >
        Back to Home
      </Link>

      <div className="mt-10">
        <p className="text-sm font-medium text-[color:var(--color-text-muted)]">
          Or try one of our tools:
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {suggestedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-md border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-text-secondary)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
