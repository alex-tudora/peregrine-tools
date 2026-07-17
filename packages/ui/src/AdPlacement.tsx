"use client";

import { useEffect, useRef, useState } from "react";
import { getConsent, subscribeConsent, type ConsentState } from "./consent";

interface AdPlacementProps {
  className?: string;
  /**
   * AdSense ad-unit slot id. When provided AND the user has granted consent, a
   * real <ins class="adsbygoogle"> unit renders here. Without a slot id the space
   * is still reserved (see below) so nothing shifts when ads turn on.
   */
  slot?: string;
  /** AdSense publisher id; defaults to NEXT_PUBLIC_ADSENSE_CLIENT. */
  client?: string;
  /** Reserved height in px to prevent layout shift (CLS). Default 280. */
  minHeight?: number;
}

/**
 * Ad slot with reserved height.
 *
 * The previous version rendered an empty <div> with no height, so when real ads
 * eventually load they would shove content down (a CLS penalty — and the vision
 * doc's own performance budget forbids exactly this). This version:
 *   1. ALWAYS reserves vertical space, so turning ads on causes no layout shift.
 *   2. Renders a real AdSense unit only when a slot id is set and consent granted.
 *   3. Shows a neutral "Advertisement" placeholder otherwise, so the reserved
 *      region is intentional rather than a mysterious gap.
 */
export function AdPlacement({
  className = "",
  slot,
  client,
  minHeight = 280,
}: AdPlacementProps) {
  const pubId = client || process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
  const [consent, setConsentState] = useState<ConsentState>("unset");
  const pushedRef = useRef(false);

  useEffect(() => {
    setConsentState(getConsent());
    return subscribeConsent(setConsentState);
  }, []);

  const adsEnabled = consent === "granted" && !!slot && !!pubId;

  useEffect(() => {
    if (!adsEnabled || pushedRef.current) return;
    try {
      // adsbygoogle is injected by <ConsentAds> after consent.
      // @ts-expect-error — adsbygoogle is a global injected by AdSense.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      /* AdSense not ready yet; will retry on next consent/slot change. */
    }
  }, [adsEnabled]);

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-lg border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] ${className}`}
      style={{ minHeight }}
      aria-hidden={!adsEnabled}
    >
      {adsEnabled ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={pubId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <span className="text-xs uppercase tracking-wide text-[color:var(--color-text-muted)]">
          Advertisement
        </span>
      )}
    </div>
  );
}
