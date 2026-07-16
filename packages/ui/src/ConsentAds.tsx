"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent, subscribeConsent, type ConsentState } from "./consent";

interface ConsentAdsProps {
  /**
   * AdSense publisher id, e.g. "ca-pub-XXXX". Defaults to the
   * NEXT_PUBLIC_ADSENSE_CLIENT env var so it isn't hardcoded per app.
   */
  adsenseClient?: string;
}

/**
 * Cookie-consent gate that ALSO controls AdSense loading.
 *
 * - AdSense's script is injected only after the user grants consent (or on later
 *   visits where consent was previously granted). This is the GDPR/ePrivacy
 *   requirement that the old "load adsbygoogle.js in every layout" approach missed.
 * - The banner is shown only while consent is "unset".
 * - <AdPlacement> slots watch the same consent state and render ads only when granted.
 */
export function ConsentAds({ adsenseClient }: ConsentAdsProps) {
  const client = adsenseClient || process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
  const [state, setState] = useState<ConsentState>("unset");

  // Read persisted consent on mount and keep in sync.
  useEffect(() => {
    setState(getConsent());
    return subscribeConsent(setState);
  }, []);

  // Load the AdSense script exactly once, only when consent is granted.
  useEffect(() => {
    if (state !== "granted" || !client) return;
    if (document.getElementById("adsbygoogle-js")) return;
    const s = document.createElement("script");
    s.id = "adsbygoogle-js";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    document.head.appendChild(s);
  }, [state, client]);

  if (state !== "unset") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          We use cookies for anonymous analytics and, if you allow it, personalized
          ads to keep these tools free. Your files are always processed on your
          device and never uploaded.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => setConsent("denied")}
            className="rounded-lg border border-[color:var(--color-border)] px-4 py-2 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
          >
            Decline
          </button>
          <button
            onClick={() => setConsent("granted")}
            className="rounded-lg bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-hover)]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
