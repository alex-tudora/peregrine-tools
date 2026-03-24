"use client";

import React, { useState } from "react";
import { AdPlacement } from "./AdPlacement";
import { PwaInstallPrompt } from "./PwaInstallPrompt";

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedTool {
  name: string;
  href: string;
}

interface NextStep {
  label: string;
  description: string;
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
  nextStep?: NextStep;
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

function ShareButton({ toolName }: { toolName: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Free tool: ${toolName} — 100% private, no upload required!`;

    if (navigator.share) {
      try {
        await navigator.share({ title: toolName, text, url });
        return;
      } catch {
        // User cancelled or API unavailable — fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(`${text}\n${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] hover:text-[color:var(--color-text-primary)]"
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          Share this tool
        </>
      )}
    </button>
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
  nextStep,
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

      {/* Next step suggestion + share */}
      {nextStep && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={nextStep.href}
            className="group flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-5 py-3.5 transition-all hover:border-[color:var(--color-accent)] hover:shadow-sm"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-[color:var(--color-text-primary)] group-hover:text-[color:var(--color-accent)]">
                {nextStep.label}
              </p>
              <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                {nextStep.description}
              </p>
            </div>
            <svg className="h-4 w-4 shrink-0 text-[color:var(--color-text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </a>
          <ShareButton toolName={title} />
        </div>
      )}
      {!nextStep && (
        <div className="mt-6 flex justify-end">
          <ShareButton toolName={title} />
        </div>
      )}

      {/* PWA install prompt */}
      <PwaInstallPrompt />

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
