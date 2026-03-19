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
          className={`mt-1 h-5 w-5 shrink-0 text-[color:var(--color-text-muted)] transition-transform duration-300 ease-[var(--ease-peregrine)] ${
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
        className={`grid transition-all duration-300 ease-[var(--ease-peregrine)] ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className={`overflow-hidden ${isOpen ? "animate-reveal" : ""}`}>
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
        <h1 className="font-semibold text-3xl md:text-4xl text-[color:var(--color-text-primary)]">
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
        <>
          <div className="my-16 border-b border-[color:var(--color-border)]" />
          <section>
            <h2 className="font-semibold text-2xl text-[color:var(--color-text-primary)] mb-6">
              {keyword ? `How to ${keyword}` : "How to Use This Tool"}
            </h2>
            <ol className="space-y-4">
              {howTo.map((step, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <span className="shrink-0 text-sm font-semibold text-[color:var(--color-text-muted)]">
                    {index + 1}.
                  </span>
                  <span className="text-[color:var(--color-text-secondary)] leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}

      {/* About section */}
      {about && (
        <>
          <div className="my-16 border-b border-[color:var(--color-border)]" />
          <section>
            <h2 className="font-semibold text-2xl text-[color:var(--color-text-primary)] mb-4">
              About This Tool
            </h2>
            <div
              className="prose prose-sm max-w-none text-[color:var(--color-text-secondary)] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: about }}
            />
          </section>
        </>
      )}

      {/* FAQ section */}
      {faqs.length > 0 && (
        <>
          <div className="my-16 border-b border-[color:var(--color-border)]" />
          <section>
            <h2 className="font-semibold text-2xl text-[color:var(--color-text-primary)] mb-4">
              Frequently Asked Questions
            </h2>
            <div>
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <>
          <div className="my-16 border-b border-[color:var(--color-border)]" />
          <section>
            <h2 className="font-semibold text-2xl text-[color:var(--color-text-primary)] mb-5">
              Related Tools
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {relatedTools.map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  className="
                    text-sm font-medium text-[color:var(--color-text-secondary)]
                    transition-colors duration-200
                    hover:text-[color:var(--color-accent)]
                  "
                >
                  {tool.name}
                </a>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
