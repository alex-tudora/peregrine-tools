"use client";

import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if user already dismissed this session
    if (sessionStorage.getItem("peregrine-pwa-dismissed")) {
      setDismissed(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
    setDismissed(true);
    sessionStorage.setItem("peregrine-pwa-dismissed", "1");
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem("peregrine-pwa-dismissed", "1");
  }, []);

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 animate-arrive">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[color:var(--color-text-primary)]">
          Use this tool often?
        </p>
        <p className="text-xs text-[color:var(--color-text-muted)]">
          Add to your homescreen for quick access
        </p>
      </div>
      <button
        onClick={handleInstall}
        className="shrink-0 rounded-lg bg-[color:var(--color-accent)] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[color:var(--color-accent-hover)]"
      >
        Install
      </button>
      <button
        onClick={handleDismiss}
        className="shrink-0 text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-primary)]"
        aria-label="Dismiss"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
