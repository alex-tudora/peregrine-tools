import React from "react";

interface ToolCardProps {
  icon: string;
  name: string;
  description: string;
  href: string;
  className?: string;
}

export function ToolCard({ icon, name, description, href, className = "" }: ToolCardProps) {
  return (
    <a
      href={href}
      className={`
        group relative flex items-start justify-between gap-4 rounded-2xl
        bg-[color:var(--color-bg-card)] p-6
        shadow-[var(--shadow-warm-sm)]
        transition-all duration-300 ease-[var(--ease-peregrine)]
        hover:-translate-y-1 hover:shadow-[var(--shadow-warm-lg)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2
        ${className}
      `}
    >
      <div className="min-w-0">
        {/* Name with inline icon */}
        <h3 className="flex items-center gap-2 text-[15px] font-medium text-[color:var(--color-text-primary)]">
          <span className="text-base" aria-hidden="true">{icon}</span>
          {name}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-sm text-[color:var(--color-text-muted)] leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Arrow — appears on hover */}
      <svg
        className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-text-muted)] opacity-0 transition-all duration-300 ease-[var(--ease-peregrine)] group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}
