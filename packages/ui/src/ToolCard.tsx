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
        group block rounded-xl border border-slate-200 bg-white p-5
        transition-all duration-200
        hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 hover:scale-[1.01]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2
        ${className}
      `}
    >
      <div className="mb-3 text-3xl leading-none" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
        {name}
      </h3>
      <p className="mt-1 text-sm text-slate-500 leading-snug line-clamp-2">
        {description}
      </p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky-500 transition-colors group-hover:text-sky-600">
        Use Tool
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </a>
  );
}
