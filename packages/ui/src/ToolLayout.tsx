"use client";

import React, { useState } from "react";
import { AdPlacement } from "./AdPlacement";

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedTool {
  name: string;
  href: string;
}

interface ToolLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  howTo?: string[];
  about?: string;
  faqs?: FAQ[];
  relatedTools?: RelatedTool[];
  keyword?: string;
}

function FAQItem({ question, answer }: FAQ) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[color:var(--color-border)] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-[color:var(--color-accent)]"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-[color:var(--color-text-primary)]">
          {question}
        </span>
        <svg
          className={`mt-1 h-5 w-5 shrink-0 text-[color:var(--color-text-muted)] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ToolLayout({
  title,
  subtitle,
  children,
  howTo = [],
  about,
  faqs = [],
  relatedTools = [],
  keyword,
}: ToolLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Hero section */}
      <div className="text-center animate-fade-in-up">
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)]">
          {title}
        </h1>
        <p className="mt-3 text-lg text-[color:var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-1">
          {subtitle}
        </p>
      </div>

      {/* Tool UI */}
      <div className="mt-10 animate-slide-up delay-2">
        {children}
      </div>

      {/* Ad placement */}
      <AdPlacement className="mt-12" />

      {/* How-to section */}
      {howTo.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif font-semibold text-2xl text-[color:var(--color-text-primary)] mb-6">
            {keyword ? `How to ${keyword}` : "How to Use This Tool"}
          </h2>
          <ol className="space-y-4">
            {howTo.map((step, index) => (
              <li key={index} className="flex gap-4 items-start">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-accent)] text-white text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-[color:var(--color-text-secondary)] pt-0.5 leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* About section */}
      {about && (
        <section className="mt-12">
          <h2 className="font-serif font-semibold text-2xl text-[color:var(--color-text-primary)] mb-4">
            About This Tool
          </h2>
          <div
            className="prose prose-sm max-w-none text-[color:var(--color-text-secondary)] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: about }}
          />
        </section>
      )}

      {/* FAQ section */}
      {faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif font-semibold text-2xl text-[color:var(--color-text-primary)] mb-4">
            Frequently Asked Questions
          </h2>
          <div>
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      )}

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif font-semibold text-2xl text-[color:var(--color-text-primary)] mb-5">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedTools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="
                  border border-[color:var(--color-border)] rounded-full px-5 py-2
                  text-sm font-medium text-[color:var(--color-text-primary)]
                  transition-all duration-200
                  hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]
                "
              >
                {tool.name}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
