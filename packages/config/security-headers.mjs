/**
 * Baseline security headers applied to every route across all Peregrine apps.
 *
 * Deliberately conservative — these four are safe for a static, client-side tool
 * site and don't interfere with AdSense, Plausible, ffmpeg.wasm, or media APIs:
 *   - nosniff             : stop MIME sniffing
 *   - SAMEORIGIN          : disallow being framed by other origins (clickjacking)
 *   - Referrer-Policy     : don't leak full URLs cross-origin
 *   - HSTS                : force HTTPS (Vercel serves HTTPS)
 *
 * Permissions-Policy is intentionally omitted from the shared baseline so it
 * can't accidentally disable getDisplayMedia (vid screen recorder) or a future
 * camera tool; set it per-app if/when needed.
 *
 * A tuned Content-Security-Policy is the natural next step but is left out here
 * because it must enumerate AdSense/Plausible/Google Fonts origins and allow the
 * inline JSON-LD blocks — worth doing deliberately, not as a risky blanket rule.
 */
export const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];
