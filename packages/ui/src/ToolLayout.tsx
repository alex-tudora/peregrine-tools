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
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:text-sky-600"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-slate-900">{question}</span>
        <svg
          className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm leading-relaxed text-slate-600">{answer}</p>
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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Hero section */}
      <div className="mb-8 text-center sm:mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-3 text-base text-slate-500 sm:text-lg max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Tool UI */}
      <div className="mb-10">{children}</div>

      {/* Ad placement */}
      <AdPlacement className="mb-10" />

      {/* How-to section */}
      {howTo.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            {keyword ? `How to ${keyword}` : "How to Use This Tool"}
          </h2>
          <ol className="space-y-3">
            {howTo.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-600">
                  {index + 1}
                </span>
                <span className="text-slate-600 pt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* About section */}
      {about && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Tool</h2>
          <div
            className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: about }}
          />
        </section>
      )}

      {/* FAQ section */}
      {faqs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="rounded-xl border border-slate-200 bg-white px-5">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      )}

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {relatedTools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-sky-600 hover:shadow-sm"
              >
                <svg
                  className="h-4 w-4 shrink-0 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                {tool.name}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
