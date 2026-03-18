# Peregrine Tools — Vision & Architecture Document

> This document is the single source of truth for the Peregrine Tools ecosystem.
> It is intended to be read by Claude Code (or any AI assistant) working on this project.
> When in doubt about any decision — branding, architecture, naming, structure — refer here.

---

## 0. Bootstrap — Setup From Scratch

> **INSTRUCTIONS FOR CLAUDE CODE:**
> If this project directory is empty (or contains only this document and WHITE_CAMELLIA.md),
> follow these steps to scaffold the entire monorepo from zero.
> Execute them in order. Do not skip steps. Ask the user for confirmation after each major phase.

### Phase 0: Prerequisites Check

Before starting, verify the following are installed on the user's machine:

```bash
# Check Node.js (need 18+)
node --version

# Check pnpm (install if missing: npm install -g pnpm)
pnpm --version

# Check git
git --version
```

If anything is missing, tell the user what to install before proceeding.

### Phase 1: Initialize the Monorepo

**1.1 — Initialize git and pnpm workspace:**

```bash
# We should already be in the project directory (e.g., ~/sites/peregrine/tools/)
git init

# Create pnpm workspace config
# Create root package.json
# Create turbo.json
# Create .gitignore
# Create .nvmrc (node version)
```

**1.2 — Create `package.json` at the root:**

```json
{
  "name": "peregrine-tools",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "clean": "turbo clean"
  },
  "devDependencies": {
    "turbo": "^2",
    "typescript": "^5"
  },
  "packageManager": "pnpm@9.15.0"
}
```

**1.3 — Create `pnpm-workspace.yaml`:**

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**1.4 — Create `turbo.json`:**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

**1.5 — Create `.gitignore`:**

```
node_modules/
.next/
dist/
.turbo/
.env
.env.local
.env.*.local
*.tsbuildinfo
.vercel
```

**1.6 — Create `.nvmrc`:**

```
20
```

**1.7 — Create the directory structure:**

```bash
mkdir -p apps/pdf/src
mkdir -p apps/pix/src
mkdir -p apps/kit/src
mkdir -p apps/vid/src
mkdir -p apps/dev/src
mkdir -p packages/ui/src
mkdir -p packages/config
mkdir -p packages/seo/src
mkdir -p docs
```

### Phase 2: Build the Shared Packages

**2.1 — `packages/config` — Shared Tailwind & TypeScript configuration**

Create the shared Tailwind config with all brand colors defined in Section 2 of this document.
Create the shared TypeScript base config.
Create the shared ESLint config.

The Tailwind config MUST include:
- All brand colors (Falcon Navy, Sky Blue, Success Green, Warning Amber, Error Red, all Slate shades)
- Per-site accent colors (defined in Section 2 under "Per-Site Accent Colors")
- Inter font family as default sans
- JetBrains Mono as default mono

**2.2 — `packages/ui` — Shared React Component Library**

Build these components following the specifications in Section 6 of this document:

1. `Header.tsx` — Falcon logo + site name + tool dropdown + Peregrine Family dropdown. Sticky. 64px height. Must accept `siteName` and `currentTools` and `accentColor` as props.
2. `Footer.tsx` — Cross-site links to popular tools across ALL five sites. Legal links. Copyright. Dark background (Slate 900).
3. `ToolCard.tsx` — Icon + tool name + one-line description + link. Hover lift effect. Used on homepage grids.
4. `ToolLayout.tsx` — Full tool page wrapper following the layout wireframe in Section 6. Includes H1, subtitle, dropzone area, action button, download area, ad slot, how-to section, about section, FAQ section, related tools section.
5. `Dropzone.tsx` — Large file upload area. Drag & drop + click to browse. Dashed border. Blue tint on drag-over. Accepts file type filter props. Shows accepted formats.
6. `DownloadButton.tsx` — Styled download button with optional progress state.
7. `ProgressBar.tsx` — Thin progress indicator for conversion operations.
8. `FileList.tsx` — List of uploaded files with reorder (drag), remove, and file size display.
9. `CrossSiteNav.tsx` — Navigation component linking all 5 Peregrine sites. Used in header dropdown and footer.
10. `FalconLogo.tsx` — SVG component of the falcon logo. Accepts size and color props.

All components must:
- Use Tailwind CSS for styling
- Use the shared config colors (import from `@peregrine/config`)
- Be fully responsive (mobile-first)
- Accept reasonable props for customization
- Export from a barrel `index.ts`

**2.3 — `packages/seo` — Shared SEO Utilities**

1. `metadata.ts` — Helper function that generates Next.js Metadata objects for tool pages. Accepts tool name, description, keyword, site name, and returns complete metadata including title, description, Open Graph, Twitter cards, canonical URL.
2. `structuredData.ts` — Generates JSON-LD for WebApplication schema per tool page.
3. `sitemap.ts` — Helper to generate sitemap entries from a list of tools.
4. `robots.ts` — Generates robots.txt content.

### Phase 3: Build the First App (peregrinepdf.com)

**3.1 — Scaffold `apps/pdf` as a Next.js 14+ app with App Router:**

```bash
cd apps/pdf
pnpm create next-app . --typescript --tailwind --app --src-dir --import-alias "@/*"
```

Then configure it to use the shared packages:
- Import Tailwind config from `@peregrine/config`
- Import UI components from `@peregrine/ui`
- Import SEO utilities from `@peregrine/seo`

**3.2 — Build the homepage (`apps/pdf/src/app/page.tsx`):**

- Hero section: "The Fastest PDF Tools Online" heading + subtitle
- Tool grid: 3 columns desktop, 2 tablet, 1 mobile
- Each tool card links to its route
- Use ToolCard component from shared UI
- Include all PDF tools listed in Section 5.1

**3.3 — Build the root layout (`apps/pdf/src/app/layout.tsx`):**

- Import Header and Footer from shared UI
- Pass `siteName="Peregrine PDF"` and `accentColor="#3B82F6"` to Header
- Include Inter font from Google Fonts with `font-display: swap`
- Set base metadata using shared SEO utilities

**3.4 — Build the first 5 tool pages:**

Build these tools in this order, each as its own route under `apps/pdf/src/app/`:

1. **`/merge-pdf`** — Merge multiple PDFs into one
   - Uses pdf-lib to concatenate PDF documents
   - Dropzone accepts multiple .pdf files
   - Drag to reorder files in FileList
   - "Merge PDFs" button processes and triggers download
   - All processing client-side in a Web Worker

2. **`/split-pdf`** — Split PDF into individual pages or extract page ranges
   - Uses pdf-lib to extract pages
   - Upload single PDF, shows page previews
   - User selects which pages to extract
   - Download individual pages or all as ZIP

3. **`/compress-pdf`** — Reduce PDF file size
   - Quality slider (low/medium/high compression)
   - Shows before/after file size
   - Client-side processing

4. **`/pdf-to-jpg`** — Convert PDF pages to JPG images
   - Uses pdfjs-dist to render pages to canvas
   - Quality slider for JPG output
   - Download individual images or all as ZIP (use JSZip)

5. **`/jpg-to-pdf`** — Convert JPG/PNG images to PDF
   - Upload multiple images
   - Drag to reorder
   - Choose page size (A4, Letter, fit to image)
   - Generates multi-page PDF using pdf-lib

Each tool page MUST follow the ToolLayout structure defined in Section 6:
- H1 with target keyword
- Subtitle explaining the tool
- Dropzone for file upload
- Tool-specific controls
- Action button
- Download result
- Ad placement slot (empty div with reserved space for now)
- "How to" section (3-4 steps)
- "About This Tool" section (150-300 words, naturally includes target keyword)
- FAQ section (3-5 questions with answers)
- Related tools section (links to other PDF tools + cross-site links)

Each tool page MUST have proper SEO:
- Unique metadata generated using `@peregrine/seo` metadata helper
- JSON-LD structured data
- Target keyword from Section 5.1

**3.5 — Build supporting pages:**

- `/sitemap.xml` — Dynamic sitemap using Next.js sitemap generation
- `/robots.txt` — Allow all crawling
- 404 page — Branded, with links back to homepage
- Privacy policy page (`/privacy`)
- Terms of service page (`/terms`)

**3.6 — Install required dependencies for PDF processing:**

```bash
cd apps/pdf
pnpm add pdf-lib pdfjs-dist jszip file-saver
pnpm add -D @types/file-saver
```

### Phase 4: Verification

After scaffolding is complete, verify:

```bash
# From the root directory
pnpm install          # Should install all dependencies across all packages
pnpm build --filter pdf    # Should build the PDF app successfully
pnpm dev --filter pdf      # Should start dev server on localhost:3000
```

Then verify:
- [ ] Homepage loads with tool grid
- [ ] Header shows falcon logo and "Peregrine PDF"
- [ ] Footer shows cross-site links
- [ ] At least one tool page loads and accepts file upload
- [ ] File processing works (merge two PDFs, download result)
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Lighthouse performance score ≥ 90

### Phase 5: Git & Deployment Prep

```bash
# Stage and commit everything
git add .
git commit -m "[init] scaffold peregrine-tools monorepo with pdf app"

# Connect to GitHub (user needs to have created the org and repo first)
git remote add origin git@github.com:peregrine-tools/peregrine-tools.git
git branch -M main
git push -u origin main
```

Then tell the user to:
1. Go to Vercel, import the repo
2. Set root directory to `apps/pdf`
3. Set build command to `cd ../.. && pnpm turbo build --filter=pdf`
4. Set install command to `pnpm install`
5. Add custom domain `peregrinepdf.com`
6. Configure DNS on Porkbun:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`

---

## 1. What Is Peregrine Tools?

Peregrine Tools is a family of free online utility websites that help people convert, compress, edit, and transform files — instantly, in-browser, with no sign-up required.

The name comes from the **peregrine falcon** — the fastest animal on Earth, capable of diving at 240+ mph. Speed, precision, and reliability are the brand's core identity.

### The Sites

| Domain | App Directory | Category | Priority |
|---|---|---|---|
| **peregrinepdf.com** | `apps/pdf` | PDF tools | 1st — flagship |
| **peregrinepix.com** | `apps/pix` | Image tools | 2nd |
| **peregrinekit.com** | `apps/kit` | Text, calculators, SEO, writing utilities | 3rd |
| **peregrinevid.com** | `apps/vid` | Video & audio tools | 4th |
| **peregrinedev.com** | `apps/dev` | Developer tools | 5th |

All five sites share the same visual identity, component library, and cross-link to each other.

### The Business Model

**Freemium + Ads:**

- All basic tools are free, unlimited, no sign-up
- Ads (Google AdSense) on free usage — this is the primary revenue driver at launch
- Premium tier (later): batch processing, higher file size limits, no ads, API access
- API access for developers who want to embed conversions in their own apps

**Monetization priority:** SEO traffic → ad revenue → validate demand → add premium tier.

---

## 2. Brand Identity

### Name & Symbol

- **Name:** Peregrine (or Peregrine Tools when referring to the ecosystem)
- **Symbol:** The peregrine falcon — minimal, geometric, in a dive (stoop) position
- **Tagline options:** "The fastest tools online" / "Convert at the speed of flight" / None (let the speed speak)

### Color Palette

```
Primary:
  Falcon Navy:     #1B2A4A   — headers, primary text, logo
  Sky Blue:        #3B82F6   — links, CTAs, active states
  White:           #FFFFFF   — backgrounds, cards

Accents:
  Success Green:   #10B981   — completed conversions, success states
  Warning Amber:   #F59E0B   — file size warnings, limits
  Error Red:       #EF4444   — errors, failed conversions

Neutrals:
  Slate 50:        #F8FAFC   — page backgrounds
  Slate 100:       #F1F5F9   — card backgrounds
  Slate 300:       #CBD5E1   — borders, dividers
  Slate 500:       #64748B   — secondary text
  Slate 700:       #334155   — body text
  Slate 900:       #0F172A   — headings
```

### Typography

```
Headings:   Inter (700 bold, 600 semibold)
Body:       Inter (400 regular, 500 medium)
Mono/Code:  JetBrains Mono (for dev tools only)
```

Inter is free, loads fast from Google Fonts, and has excellent readability at all sizes. Use the variable font version for optimal performance.

### Logo

A minimal falcon silhouette in a stoop (dive) position. One color (Falcon Navy on light backgrounds, white on dark backgrounds). Must be recognizable at 16x16 favicon size.

The logo appears in:
- Top-left of every site's header
- Favicon (all sites)
- Open Graph images
- Footer alongside the "Peregrine" wordmark

### Design Principles

1. **Speed is everything.** Pages must load in under 1 second. Tools must feel instant. No spinners unless absolutely necessary. Perceived performance matters as much as actual performance.

2. **Zero friction.** No sign-up walls. No email gates. No "download our app" popups. User uploads a file, gets the result, leaves happy. They'll come back because it was painless.

3. **Clean over clever.** White space. Clear labels. Big drop zones. No visual clutter. Look at iLovePDF's simplicity — that's the target. Not flashy, not boring, just clean and obvious.

4. **Consistent across all five sites.** Same header, same footer, same card style, same button style, same animations. A user on peregrinepdf.com should feel instantly at home on peregrinepix.com. The only differences are the tool-specific content and the accent color per site.

### Per-Site Accent Colors (optional differentiation)

```
peregrinepdf.com   →  Sky Blue (#3B82F6)     — trust, documents
peregrinepix.com   →  Violet (#8B5CF6)       — creativity, images
peregrinekit.com   →  Emerald (#10B981)      — utility, productivity
peregrinevid.com   →  Rose (#F43F5E)         — media, entertainment
peregrinedev.com   →  Amber (#F59E0B)        — technical, developer
```

These accents appear only in the hero section and active tool highlights. Everything else stays brand-consistent.

---

## 3. Technical Architecture

### Monorepo Structure

```
peregrine-tools/
├── README.md                       ← setup instructions
├── PEREGRINE_TOOLS.md              ← THIS FILE — vision & architecture
├── package.json                    ← pnpm workspace root
├── pnpm-workspace.yaml             ← workspace config
├── turbo.json                      ← Turborepo pipeline config
├── .gitignore
├── .eslintrc.js                    ← shared ESLint config
├── tsconfig.json                   ← shared TypeScript base config
│
├── apps/
│   ├── pdf/                        ← peregrinepdf.com (Next.js)
│   │   ├── src/
│   │   │   ├── app/                ← App Router pages
│   │   │   │   ├── layout.tsx      ← root layout with shared header/footer
│   │   │   │   ├── page.tsx        ← homepage with tool grid
│   │   │   │   ├── merge-pdf/
│   │   │   │   │   └── page.tsx    ← merge PDF tool page
│   │   │   │   ├── split-pdf/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── compress-pdf/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── ... (one route per tool)
│   │   │   ├── components/         ← PDF-specific components
│   │   │   │   ├── PdfDropzone.tsx
│   │   │   │   ├── PdfPreview.tsx
│   │   │   │   └── PdfToolCard.tsx
│   │   │   └── lib/                ← PDF processing logic
│   │   │       ├── merge.ts
│   │   │       ├── split.ts
│   │   │       ├── compress.ts
│   │   │       └── convert.ts
│   │   ├── public/
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── pix/                        ← peregrinepix.com (Next.js)
│   │   └── (same structure as pdf, with image-specific tools)
│   │
│   ├── kit/                        ← peregrinekit.com (Next.js)
│   │   └── (same structure, with text/calc/SEO tools)
│   │
│   ├── vid/                        ← peregrinevid.com (Next.js)
│   │   └── (same structure, with video/audio tools)
│   │
│   └── dev/                        ← peregrinedev.com (Next.js)
│       └── (same structure, with developer tools)
│
├── packages/
│   ├── ui/                         ← shared React component library
│   │   ├── src/
│   │   │   ├── Header.tsx          ← falcon logo + site nav + cross-site links
│   │   │   ├── Footer.tsx          ← cross-site links + branding + legal
│   │   │   ├── ToolCard.tsx        ← reusable tool card for homepages
│   │   │   ├── ToolLayout.tsx      ← layout wrapper for individual tool pages
│   │   │   ├── Dropzone.tsx        ← file upload drag & drop zone
│   │   │   ├── DownloadButton.tsx  ← styled download button with progress
│   │   │   ├── ProgressBar.tsx     ← conversion progress indicator
│   │   │   ├── FileList.tsx        ← list of uploaded files with actions
│   │   │   ├── CrossSiteNav.tsx    ← navigation between the 5 sites
│   │   │   ├── AdPlacement.tsx     ← ad slot wrapper for consistent placement
│   │   │   └── index.ts           ← barrel export
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                     ← shared configuration
│   │   ├── tailwind.config.ts      ← shared Tailwind theme (colors, fonts, spacing)
│   │   ├── eslint-config.js        ← shared ESLint rules
│   │   └── tsconfig.base.json     ← shared TypeScript config
│   │
│   └── seo/                        ← shared SEO utilities
│       ├── src/
│       │   ├── metadata.ts         ← generateMetadata helpers per tool
│       │   ├── structuredData.ts   ← JSON-LD schema generators
│       │   ├── sitemap.ts          ← sitemap generation helpers
│       │   └── robots.ts          ← robots.txt generators
│       ├── package.json
│       └── tsconfig.json
│
└── docs/
    ├── seo-strategy.md             ← target keywords per site, per tool
    ├── monetization.md             ← ad placement strategy, premium tier plan
    ├── cross-linking.md            ← how sites link to each other
    └── launch-checklist.md         ← per-site launch steps
```

### Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG for SEO, API routes, image optimization |
| **Language** | TypeScript | Type safety, better DX, fewer bugs |
| **Styling** | Tailwind CSS | Fast to build, consistent, tiny CSS bundle |
| **Package Manager** | pnpm | Fast installs, efficient disk usage, workspace support |
| **Build System** | Turborepo | Monorepo orchestration, build caching, filtered builds |
| **Deployment** | Vercel | Built for Next.js, auto-deploy on push, free tier |
| **PDF Processing** | pdf-lib + pdfjs-dist | Client-side PDF manipulation, no server needed |
| **Image Processing** | sharp (server) + canvas API (client) | Resize, compress, convert images |
| **Video Processing** | FFmpeg.wasm | Client-side video/audio conversion |
| **Ads** | Google AdSense | Primary revenue at launch |
| **Analytics** | Vercel Analytics + Google Search Console | Traffic, Core Web Vitals, keyword tracking |

### Key Architecture Decisions

**1. Client-side processing by default.**

Files are processed in the user's browser using Web Workers. This means:
- Zero server costs for file processing
- User privacy (files never leave their device)
- Instant results for small/medium files
- No file upload bandwidth costs

Server-side processing (via Next.js API routes) is the fallback only for operations that can't run in-browser (e.g., complex video transcoding).

**2. Each tool is its own page/route.**

```
peregrinepdf.com/merge-pdf
peregrinepdf.com/split-pdf
peregrinepdf.com/compress-pdf
peregrinepdf.com/pdf-to-jpg
```

Every tool page is a standalone SEO landing page targeting a specific keyword. This is the core growth strategy — each page ranks independently for its target search term.

**3. Static generation where possible.**

Tool pages are statically generated at build time (SSG). The interactive tool component hydrates on the client. This gives us:
- Instant page loads (served from CDN)
- Perfect Lighthouse scores
- Google loves fast pages

**4. Shared UI is a local package, not published to npm.**

The `packages/ui` directory is consumed directly by each app via pnpm workspaces. No publishing, no versioning, no npm overhead. Change a component, every app gets it on next build.

---

## 4. SEO Strategy

### Core Principle

Every single tool page targets ONE primary keyword. The page is built to be the best result for that keyword — fast, clean, useful, and complete.

### URL Structure

```
[domain]/[action]-[filetype]

Examples:
  peregrinepdf.com/merge-pdf
  peregrinepdf.com/pdf-to-jpg
  peregrinepdf.com/compress-pdf
  peregrinepix.com/remove-background
  peregrinepix.com/png-to-jpg
  peregrinekit.com/word-counter
  peregrinedev.com/json-formatter
```

### Page SEO Checklist (every tool page must have)

- [ ] Unique `<title>` tag: "[Action] [FileType] — Free Online Tool | Peregrine"
- [ ] Unique `<meta description>` with the primary keyword
- [ ] H1 heading containing the primary keyword
- [ ] 150-300 words of explanatory content below the tool (what it does, why, how)
- [ ] FAQ section with 3-5 questions (targets featured snippets)
- [ ] JSON-LD structured data (WebApplication schema)
- [ ] Open Graph image (auto-generated, branded)
- [ ] Canonical URL
- [ ] Internal links to related tools on the same site
- [ ] Cross-site links to relevant tools on sister sites
- [ ] XML sitemap entry
- [ ] Fast: < 1s LCP, < 100ms FID, < 0.1 CLS

### Cross-Linking Strategy

Every site's footer includes a "Peregrine Family" section linking to all five sites. Additionally, tool pages contextually link to related tools:

```
peregrinepdf.com/pdf-to-jpg  →  links to peregrinepix.com/compress-jpg
peregrinepix.com/png-to-jpg  →  links to peregrinepdf.com/jpg-to-pdf
peregrinekit.com/word-counter →  links to peregrinekit.com/character-counter
```

This creates a link flywheel where all five sites strengthen each other's domain authority.

---

## 5. Tool Specifications

### 5.1 peregrinepdf.com — PDF Tools

**Processing:** All client-side using pdf-lib and pdfjs-dist.

| Tool | Route | Primary Keyword | Description |
|---|---|---|---|
| Merge PDF | `/merge-pdf` | merge pdf | Combine multiple PDFs into one. Drag to reorder. |
| Split PDF | `/split-pdf` | split pdf | Extract specific pages or split into individual pages. |
| Compress PDF | `/compress-pdf` | compress pdf | Reduce file size. Offer quality levels (low/medium/high). |
| PDF to JPG | `/pdf-to-jpg` | pdf to jpg | Convert each page to a JPG image. Bulk download as ZIP. |
| JPG to PDF | `/jpg-to-pdf` | jpg to pdf | Convert images to PDF. Multiple images = multi-page PDF. |
| PDF to PNG | `/pdf-to-png` | pdf to png | Convert each page to PNG. Higher quality than JPG. |
| PNG to PDF | `/png-to-pdf` | png to pdf | Convert PNG images to PDF document. |
| PDF to Word | `/pdf-to-word` | pdf to word | Extract text content to .docx format. |
| Word to PDF | `/word-to-pdf` | word to pdf | Convert .docx files to PDF. |
| Rotate PDF | `/rotate-pdf` | rotate pdf | Rotate all pages or specific pages 90°/180°/270°. |
| Watermark PDF | `/watermark-pdf` | watermark pdf | Add text or image watermark to all pages. |
| Unlock PDF | `/unlock-pdf` | unlock pdf | Remove password protection from PDFs. |
| Protect PDF | `/protect-pdf` | protect pdf | Add password protection to PDFs. |
| Sign PDF | `/sign-pdf` | sign pdf | Draw or type a signature and place it on a PDF. |
| Page Numbers | `/add-page-numbers` | add page numbers to pdf | Add page numbering to PDF documents. |
| PDF to Excel | `/pdf-to-excel` | pdf to excel | Extract tables from PDF to .xlsx format. |
| Excel to PDF | `/excel-to-pdf` | excel to pdf | Convert spreadsheet files to PDF. |

**Homepage:** Grid of tool cards, each linking to its route. Clean hero with "The fastest PDF tools online" heading. Tool cards show icon + name + one-line description.

### 5.2 peregrinepix.com — Image Tools

**Processing:** Client-side Canvas API for basic operations, sharp (server) for heavy processing.

| Tool | Route | Primary Keyword | Description |
|---|---|---|---|
| Compress Image | `/compress-image` | compress image | Reduce file size with quality slider. Preview before/after. |
| Resize Image | `/resize-image` | resize image | Resize by dimensions or percentage. Lock aspect ratio. |
| Crop Image | `/crop-image` | crop image | Visual cropper with preset ratios (1:1, 4:3, 16:9, free). |
| Remove Background | `/remove-background` | remove background | AI background removal. Client-side ONNX model. |
| PNG to JPG | `/png-to-jpg` | png to jpg | Convert with quality control. |
| JPG to PNG | `/jpg-to-png` | jpg to png | Convert with transparency support. |
| WebP to JPG | `/webp-to-jpg` | webp to jpg | Convert WebP images to JPG. |
| WebP to PNG | `/webp-to-png` | webp to png | Convert WebP images to PNG. |
| JPG to WebP | `/jpg-to-webp` | jpg to webp | Convert to WebP for smaller file sizes. |
| PNG to WebP | `/png-to-webp` | png to webp | Convert to WebP for web optimization. |
| SVG to PNG | `/svg-to-png` | svg to png | Rasterize SVG at custom resolution. |
| Add Watermark | `/add-watermark` | add watermark to image | Text or image watermark with opacity control. |
| Flip / Rotate | `/flip-rotate` | rotate image online | Flip horizontal/vertical, rotate by degrees. |
| Favicon Generator | `/favicon-generator` | favicon generator | Upload image, generate all favicon sizes + ICO file. |
| Image to Base64 | `/image-to-base64` | image to base64 | Convert image to base64 string for embedding. |

### 5.3 peregrinekit.com — Text, Calculators & SEO Utilities

**Processing:** All client-side JavaScript. Zero server cost.

**Text Tools:**

| Tool | Route | Primary Keyword |
|---|---|---|
| Word Counter | `/word-counter` | word counter |
| Character Counter | `/character-counter` | character counter |
| Case Converter | `/case-converter` | case converter |
| Lorem Ipsum Generator | `/lorem-ipsum-generator` | lorem ipsum generator |
| Text Diff | `/text-diff` | text diff |
| Remove Duplicate Lines | `/remove-duplicates` | remove duplicate lines |
| Find & Replace | `/find-and-replace` | find and replace text |
| Text to Slug | `/text-to-slug` | text to slug |
| Remove Line Breaks | `/remove-line-breaks` | remove line breaks |
| Markdown to HTML | `/markdown-to-html` | markdown to html |
| HTML to Markdown | `/html-to-markdown` | html to markdown |
| Readability Score | `/readability-score` | readability checker |

**Calculator Tools:**

| Tool | Route | Primary Keyword |
|---|---|---|
| Percentage Calculator | `/percentage-calculator` | percentage calculator |
| Age Calculator | `/age-calculator` | age calculator |
| Date Difference | `/date-difference` | date difference calculator |
| Unit Converter | `/unit-converter` | unit converter |
| Timezone Converter | `/timezone-converter` | timezone converter |
| Tip Calculator | `/tip-calculator` | tip calculator |
| BMI Calculator | `/bmi-calculator` | bmi calculator |
| Mortgage Calculator | `/mortgage-calculator` | mortgage calculator |
| Compound Interest | `/compound-interest` | compound interest calculator |
| Salary Calculator | `/salary-calculator` | salary to hourly |
| GPA Calculator | `/gpa-calculator` | gpa calculator |

**SEO / Marketing Tools:**

| Tool | Route | Primary Keyword |
|---|---|---|
| Meta Tag Generator | `/meta-tag-generator` | meta tag generator |
| Open Graph Preview | `/open-graph-preview` | open graph preview |
| Robots.txt Generator | `/robots-txt-generator` | robots txt generator |
| Sitemap Generator | `/sitemap-generator` | sitemap generator |
| UTM Builder | `/utm-builder` | utm builder |
| QR Code Generator | `/qr-code-generator` | qr code generator |
| Heading Checker | `/heading-checker` | heading checker |

### 5.4 peregrinevid.com — Video & Audio Tools

**Processing:** FFmpeg.wasm for client-side processing. Fallback to server for large files.

| Tool | Route | Primary Keyword |
|---|---|---|
| Video to MP4 | `/convert-to-mp4` | convert video to mp4 |
| Video to MP3 | `/video-to-mp3` | video to mp3 |
| Video to GIF | `/video-to-gif` | video to gif |
| Compress Video | `/compress-video` | compress video |
| Trim Video | `/trim-video` | trim video online |
| Audio to MP3 | `/convert-to-mp3` | convert to mp3 |
| WAV to MP3 | `/wav-to-mp3` | wav to mp3 |
| MP3 to WAV | `/mp3-to-wav` | mp3 to wav |
| Extract Audio | `/extract-audio` | extract audio from video |
| Compress Audio | `/compress-audio` | compress audio |
| Video to WebM | `/video-to-webm` | convert to webm |
| Screen Recorder | `/screen-recorder` | online screen recorder |

### 5.5 peregrinedev.com — Developer Tools

**Processing:** All client-side JavaScript.

| Tool | Route | Primary Keyword |
|---|---|---|
| JSON Formatter | `/json-formatter` | json formatter |
| JSON Validator | `/json-validator` | json validator |
| JSON to CSV | `/json-to-csv` | json to csv |
| CSV to JSON | `/csv-to-json` | csv to json |
| Regex Tester | `/regex-tester` | regex tester |
| Base64 Encode/Decode | `/base64` | base64 encode |
| URL Encode/Decode | `/url-encode` | url encode |
| Hash Generator | `/hash-generator` | md5 hash generator |
| UUID Generator | `/uuid-generator` | uuid generator |
| Color Picker | `/color-picker` | color picker |
| Hex to RGB | `/hex-to-rgb` | hex to rgb |
| Cron Expression Builder | `/cron-builder` | cron expression generator |
| JWT Decoder | `/jwt-decoder` | jwt decoder |
| HTML Minifier | `/html-minifier` | html minifier |
| CSS Minifier | `/css-minifier` | css minifier |
| JS Minifier | `/js-minifier` | javascript minifier |
| SQL Formatter | `/sql-formatter` | sql formatter |
| Diff Checker | `/diff-checker` | diff checker |
| Timestamp Converter | `/timestamp-converter` | unix timestamp converter |

---

## 6. Shared Component Specifications

### Header Component

```
┌─────────────────────────────────────────────────────────────────┐
│  🦅 Peregrine PDF          [Tools ▼]     [Peregrine Family ▼]  │
└─────────────────────────────────────────────────────────────────┘
```

- Falcon logo + site name (left)
- Current site's tool dropdown (center-left)
- "Peregrine Family" dropdown linking to all 5 sites (right)
- Sticky on scroll
- Height: 64px
- Background: white with subtle bottom border
- Mobile: hamburger menu

### Footer Component

```
┌─────────────────────────────────────────────────────────────────┐
│  Peregrine PDF    Peregrine Pix    Peregrine Kit                │
│  • Merge PDF      • Compress       • Word Counter               │
│  • Split PDF      • Resize         • Case Converter             │
│  • Compress       • Remove BG      • Lorem Ipsum                │
│  • PDF to JPG     • PNG to JPG     • QR Generator               │
│                                                                  │
│  Peregrine Vid    Peregrine Dev                                  │
│  • Compress       • JSON Format    © 2026 Peregrine Tools       │
│  • Trim Video     • Regex Test     Privacy · Terms              │
│  • Video to GIF   • Base64                                      │
└─────────────────────────────────────────────────────────────────┘
```

- Links to popular tools across ALL five sites
- Legal links (privacy policy, terms of service)
- Copyright
- "Powered by Peregrine" with falcon icon
- Background: Slate 900 (dark)
- Text: Slate 300 (light gray)

### Tool Page Layout

Every tool page follows the same structure:

```
┌─────────────────────────────────────────────────────────────────┐
│  [Header]                                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  H1: Merge PDF Files Online — Free                              │
│  Subtitle: Combine multiple PDF files into one document.        │
│  Instantly. No sign-up required.                                │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │           Drop your PDF files here                      │    │
│  │              or click to browse                         │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  [File list with reorder / remove]                              │
│                                                                  │
│  [====== Merge PDFs Button ======]                              │
│                                                                  │
│  [Download result]                                              │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  [Ad placement — horizontal banner]                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  H2: How to Merge PDF Files                                     │
│  1. Upload your PDF files using the box above                   │
│  2. Drag to reorder the files                                   │
│  3. Click "Merge PDFs"                                          │
│  4. Download your combined PDF                                  │
│                                                                  │
│  H2: About This Tool                                            │
│  150-300 words explaining the tool, its uses, and benefits.     │
│  Naturally includes the target keyword 2-3 times.               │
│                                                                  │
│  H2: Frequently Asked Questions                                 │
│  - Is it free? Yes, completely free...                          │
│  - Is it safe? Files are processed in your browser...           │
│  - What's the file size limit? Up to 100MB per file...          │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  H2: Related Tools                                              │
│  [Split PDF] [Compress PDF] [PDF to JPG] [Compress Image →]    │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  [Footer]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

### Dropzone Component

- Large, visually prominent area (min 200px tall)
- Dashed border, Slate 300
- Drag-over state: blue background tint, border becomes solid Sky Blue
- Accepts specific file types per tool
- Shows file type icons and accepted formats
- Multiple file upload where relevant
- Progress indicator during processing
- Maximum file size: 100MB per file (client-side check)

### Tool Card Component (for homepages)

```
┌─────────────────────────┐
│  📄                     │
│  Merge PDF              │
│  Combine multiple PDFs  │
│  into one document      │
│                         │
│  [Use Tool →]           │
└─────────────────────────┘
```

- Icon (emoji or custom SVG)
- Tool name (bold)
- One-line description
- Hover: subtle lift shadow
- Links to the tool page
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile

---

## 7. Performance Requirements

| Metric | Target |
|---|---|
| Lighthouse Performance Score | ≥ 95 |
| Largest Contentful Paint (LCP) | < 1.0s |
| First Input Delay (FID) | < 50ms |
| Cumulative Layout Shift (CLS) | < 0.05 |
| Time to Interactive (TTI) | < 1.5s |
| Total page weight (initial) | < 200KB |
| JavaScript bundle (per page) | < 100KB gzipped |

### Performance Rules

- No external fonts on initial load (use `font-display: swap` with Inter from Google Fonts)
- All tool processing libraries loaded dynamically when the user interacts (not on page load)
- Images: use Next.js `<Image>` component for automatic optimization
- No layout shifts from ads (reserve ad slot space in CSS)
- Lazy load below-fold content (FAQ section, related tools)

---

## 8. Deployment

### Vercel Configuration

Each app in the monorepo deploys as a separate Vercel project, connected to its own domain:

```
apps/pdf  →  peregrinepdf.com
apps/pix  →  peregrinepix.com
apps/kit  →  peregrinekit.com
apps/vid  →  peregrinevid.com
apps/dev  →  peregrinedev.com
```

**Vercel project settings per app:**
- Framework: Next.js
- Root directory: `apps/pdf` (or whichever app)
- Build command: `cd ../.. && turbo build --filter=pdf`
- Install command: `pnpm install`
- Node.js version: 18.x

### DNS Configuration (Porkbun → Vercel)

For each domain, add these DNS records:
```
Type: A      Name: @    Value: 76.76.21.21
Type: CNAME  Name: www  Value: cname.vercel-dns.com
```

---

## 9. Development Workflow

### Initial Setup

```bash
# Clone the monorepo
git clone git@github.com:peregrine-tools/peregrine-tools.git ~/sites/peregrine-tools
cd ~/sites/peregrine-tools

# Install all dependencies
pnpm install

# Start development server for a specific app
pnpm dev --filter pdf

# Build a specific app
pnpm build --filter pdf

# Build everything
pnpm build

# Lint everything
pnpm lint
```

### Working with Claude Code

```bash
cd ~/sites/peregrine-tools
claude

# Claude can now see:
# - This vision document
# - All five apps
# - Shared packages (ui, config, seo)
# - Docs directory
#
# Example prompts:
# "Build the compress PDF tool following the tool page layout in PEREGRINE_TOOLS.md"
# "Add a new tool card to the PDF homepage for the rotate tool"
# "Update the shared footer to include the new QR code tool"
# "Check that all PDF tool pages have proper meta descriptions"
```

### Git Workflow

- `main` branch is production (auto-deploys to Vercel)
- Feature branches for new tools: `feat/pdf-compress`, `feat/pix-remove-bg`
- Commit messages: `[pdf] add compress tool`, `[ui] update footer links`, `[seo] add sitemap for kit`
- Push to main = auto-deploy all changed apps (Turborepo + Vercel detect what changed)

---

## 10. Launch Checklist (Per Site)

### Pre-Launch
- [ ] All tool pages have unique title tags and meta descriptions
- [ ] All tool pages have H1 headings with target keyword
- [ ] All tool pages have explanatory content (150-300 words)
- [ ] All tool pages have FAQ section
- [ ] All tool pages have JSON-LD structured data
- [ ] All tool pages have Open Graph images
- [ ] Sitemap generated and accessible at `/sitemap.xml`
- [ ] `robots.txt` allows all crawling
- [ ] Favicon set (falcon icon)
- [ ] 404 page designed
- [ ] Privacy policy page
- [ ] Terms of service page
- [ ] Cross-site links working in header and footer
- [ ] Lighthouse score ≥ 95 on all pages
- [ ] Tested on mobile (responsive)
- [ ] Tested file upload on iOS Safari and Android Chrome
- [ ] Ad slots configured but not blocking content

### Launch Day
- [ ] Domain DNS pointed to Vercel
- [ ] SSL certificate active (Vercel auto-provisions)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit site to Bing Webmaster Tools
- [ ] Verify all pages are indexable (`site:peregrinepdf.com` after a few days)

### Post-Launch (Week 1-4)
- [ ] Monitor Google Search Console for indexing issues
- [ ] Monitor Core Web Vitals
- [ ] Track keyword rankings for primary keywords
- [ ] Create Product Hunt launch post
- [ ] Share on relevant Reddit communities (r/webdev, r/sideproject, r/InternetIsBeautiful)
- [ ] Write a "Building Peregrine Tools" blog post for Hacker News
- [ ] Add tools to web tool directories and comparison sites

---

## 11. Future Roadmap

### Phase 1: Foundation (Month 1-2)
- Launch peregrinepdf.com with 8-10 core tools
- Establish brand, get indexed by Google
- Monitor which keywords are gaining traction

### Phase 2: Image Tools (Month 2-3)
- Launch peregrinepix.com
- Cross-link with PDF site
- Begin earning from two traffic sources

### Phase 3: Utility Tools (Month 3-4)
- Launch peregrinekit.com
- Rapid tool building (2-3 new tools per week)
- Each tool is tiny but captures its own keyword

### Phase 4: Video & Dev Tools (Month 4-6)
- Launch peregrinevid.com and peregrinedev.com
- Full ecosystem active
- Cross-linking flywheel at full speed

### Phase 5: Monetization Expansion (Month 6+)
- Introduce premium tier based on observed demand
- API access for developers
- Chrome extension for quick conversions
- Mobile-optimized PWA experience
- Batch processing for premium users

---

*This document should be updated as the project evolves. It is the single reference point for maintaining consistency across the entire Peregrine Tools ecosystem.*
