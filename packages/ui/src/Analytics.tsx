interface AnalyticsProps {
  /**
   * The bare domain this app is served from, e.g. "peregrinepdf.com". Plausible
   * segments stats by data-domain, so passing each app its own domain gives
   * per-site analytics instead of one merged, unattributable property.
   */
  domain: string;
}

/**
 * Plausible analytics, cookieless and segmented per site.
 *
 * Replaces the previous setup where all 7 apps loaded the identical hosted script
 * id, dumping every site into one property with no per-site breakdown.
 *
 * Uses a plain <script> tag (rather than next/script) so this component carries
 * no dependency on `next` and can live in the shared UI package. Plausible is
 * cookieless, so it does not require the consent gate that AdSense does.
 */
export function Analytics({ domain }: AnalyticsProps) {
  return (
    <script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  );
}
