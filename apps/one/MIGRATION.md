# Single-Domain Consolidation — Proof of Concept

> **Status:** Prototype. This app (`apps/one`) demonstrates serving the whole
> Peregrine tool suite from **one origin** with category subfolders
> (`/pdf/…`, `/image/…`, `/dev/…`, `/text/…`, `/video/…`) instead of five
> separate domains. It does **not** replace the existing apps — it exists so the
> tradeoffs are concrete and reviewable before any irreversible move.

## What's in this PoC

- A unified homepage (`src/app/page.tsx`) grouping every category under one domain.
- Two **real** tools mounted under the new structure, copied **verbatim** from the
  spoke sites:
  - `/text/word-counter` ← `apps/kit/src/app/word-counter`
  - `/dev/json-formatter` ← `apps/dev/src/app/json-formatter`
- A header whose tool links are **relative, same-origin paths** (`/text/word-counter`)
  rather than absolute cross-domain URLs (`https://peregrinekit.com/word-counter`).

Run it: `cd apps/one && NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt npx next build`

## The key finding: migration is nearly mechanical

The tool **components** (`WordCounterTool.tsx`, `JsonFormatterTool.tsx`) were copied
with **zero changes**. They depend only on `@peregrine/ui` and React, both of which
resolve identically in any app. The only edits were three strings in the page
wrapper:

| Field | 7-domain value | Consolidated value |
|---|---|---|
| `siteName` | `"Peregrine Kit"` | `"Peregrine Tools"` |
| `siteUrl` | `https://peregrinekit.com` | `https://peregrine-tools.com` |
| `path` | `/word-counter` | `/text/word-counter` |

Everything downstream — canonical URL, OG image URL, JSON-LD `url`, breadcrumbs —
is derived from those three values, so they update automatically. A full migration
is therefore a scripted transform over ~106 `page.tsx` files, not a rewrite.

## Why consolidate — the case for

1. **Link equity compounds on one domain.** Today, every cross-tool link is an
   external link between five domains (`hub`'s header literally points at
   `https://peregrinekit.com/word-counter`). External links pass less authority than
   internal ones and don't build a single domain's ranking strength. On one domain,
   106 tool pages + blog + comparison pages all reinforce **one** authority score.
   For brand-new domains with no backlink profile (the situation here), this is the
   single biggest SEO lever.
2. **One qualification threshold, not five.** Ad networks (Mediavine 50K
   sessions/mo, Raptive 100K) and Search Console/Analytics all measure per-domain.
   Five weak domains each crawl slowly and qualify slowly; one domain reaches
   thresholds ~5× faster.
3. **Instant client-side navigation.** Same-origin links are Next.js `<Link>`
   client transitions (no full reload, no re-download of shared JS). Cross-domain
   links are cold document loads every time — worse Core Web Vitals and worse
   perceived speed, which is literally the brand promise.
4. **One deploy, one config surface.** One Vercel project, one AdSense/consent/
   analytics wiring, one place for security headers — instead of the current
   7× duplication (the AdSense pub id and Plausible id are copy-pasted into 7
   layouts today).
5. **Crawl efficiency.** Googlebot spends its crawl budget on one host with a
   complete internal link graph rather than rediscovering five thin hosts.

## Why NOT consolidate — the honest counter-case

1. **Exact-match / partial-match domains still carry a little weight** and read as
   topically focused (`peregrinepdf.com` screams "PDF"). Folding into
   `peregrine-tools.com/pdf` dilutes that signal slightly. (In practice EMD is a
   weak, declining factor — but it's not zero.)
2. **A migration of live, ranking pages is risky.** If these domains were already
   ranking, 301-redirecting 264 URLs risks a temporary ranking dip and requires
   careful redirect maps. **This risk is near-zero right now precisely because the
   sites are new and not yet ranking** — which makes *now* the cheapest possible
   time to consolidate if you're going to.
3. **Blast radius.** One domain means one outage takes down everything; today a
   broken `vid` build doesn't affect `pdf`.
4. **The `convert-a-lot` brand fork stays separate regardless.** Its whole thesis
   is brand independence, so it does not consolidate — this decision is only about
   the five falcon spokes + hub.
5. **`SharedArrayBuffer` / COOP-COEP scoping.** ffmpeg.wasm needs cross-origin
   isolation headers. On one domain you either apply them globally (breaks embedding
   third-party ads/iframes that aren't CORP-enabled) or scope them by path prefix
   (`/video/*`, `/pdf/ocr-*`). The current `apps/vid` applies them globally because
   it has no ads to worry about; a consolidated domain with ads must scope them by
   path. This is the one genuinely fiddly part of the migration.

## Recommended structure if you proceed

```
peregrine-tools.com/
├─ /                      unified homepage (this PoC)
├─ /pdf/merge-pdf         ← apps/pdf
├─ /image/compress-image  ← apps/pix
├─ /video/video-to-mp3    ← apps/vid   (COOP/COEP scoped to /video/*)
├─ /dev/json-formatter    ← apps/dev
├─ /text/word-counter     ← apps/kit
└─ /blog, /compare/*      merged content hubs
```

- Keep the shared packages exactly as they are — they already work unchanged here.
- Redirect the old domains with 301s (`peregrinekit.com/word-counter` →
  `peregrine-tools.com/text/word-counter`) and keep them parked pointing at the new
  paths, so any future backlinks still flow in.
- Build the URL map from the **unified catalog** (Tier 3) so sitemap, nav, footer,
  and redirects all derive from one source.

## Bottom line

Because the tool code is already portable and the sites aren't ranking yet, the
cost of consolidating is low and the SEO upside (compounding authority, faster ad
qualification, instant navigation) is high. The strongest reason to keep five
domains — protecting existing rankings — doesn't apply yet. If consolidation is
ever going to happen, this is the cheapest moment to do it. The main real work is
scoping the cross-origin-isolation headers per path and writing the 301 map.
