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
        group relative block overflow-hidden rounded-xl border border-[color:var(--color-border)]
        bg-white p-6
        transition-all duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]
        hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.08]
        hover:border-[color:var(--color-accent)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2
        ${className}
      `}
    >
      {/* Top accent line — hidden by default, appears on hover */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-accent-light)] text-2xl"
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Name */}
      <h3 className="font-serif font-semibold text-lg text-[color:var(--color-text-primary)] leading-tight">
        {name}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-relaxed line-clamp-2">
        {description}
      </p>

      {/* CTA */}
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-accent)]">
        Use Tool
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </a>
  );
}
