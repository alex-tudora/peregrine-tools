"use client";

import React from "react";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface OptionSelectorProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function OptionSelector({
  options,
  value,
  onChange,
  className = "",
  columns = 3,
}: OptionSelectorProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  };

  return (
    <div className={`grid gap-2 ${gridCols[columns]} ${className}`} role="radiogroup">
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={`
              rounded-xl border-2 px-4 py-3 text-left text-sm font-medium
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2
              ${
                isSelected
                  ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-light)] text-[color:var(--color-accent)]"
                  : "border-[color:var(--color-border)] bg-transparent text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-border-hover)] hover:text-[color:var(--color-text-primary)]"
              }
            `}
          >
            <span className="block">{option.label}</span>
            {option.description && (
              <span
                className={`mt-0.5 block text-xs ${
                  isSelected
                    ? "text-[color:var(--color-accent)]/70"
                    : "text-[color:var(--color-text-muted)]"
                }`}
              >
                {option.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
