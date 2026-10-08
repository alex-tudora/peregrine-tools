# Peregrine Tools

A family of free browser tools, each site doing one kind of job well. Files
are processed on the user's machine. No upload, no account, no tracking.

| Site | Does |
|---|---|
| [peregrine-tools.com](https://peregrine-tools.com) | The hub: every tool, searchable |
| [peregrinepdf.com](https://peregrinepdf.com) | Merge, split, compress, convert, OCR and sign PDFs |
| [peregrinepix.com](https://peregrinepix.com) | Compress, resize, crop and convert images |
| [peregrinevid.com](https://peregrinevid.com) | Convert, compress and trim video and audio |
| [peregrinedev.com](https://peregrinedev.com) | JSON, YAML, hashes, regex, minifiers, colour tools |
| [peregrinekit.com](https://peregrinekit.com) | Text tools, calculators and SEO utilities |
| [convert-a-lot.com](https://convert-a-lot.com) | One converter for files, units, currency, time, colour, text, numbers and code |

## How it works

Everything heavy runs in the browser: `pdf-lib` and `pdf.js` for PDFs,
`tesseract.js` for OCR, `ffmpeg.wasm` for video and audio, canvas for images.
The server only serves static pages.

## Layout

A pnpm workspace built with Turborepo.

```
apps/        one Next.js app per site: hub, pdf, pix, vid, dev, kit, convert
             plus `one`, a prototype of the whole suite on a single domain
packages/
  ui         shared React components: dropzone, file list, progress, nav, theme
  converters the conversion logic, shared by convert and the single-purpose sites
  seo        metadata, Open Graph images, sitemaps, structured data
  config     Tailwind, TypeScript and ESLint presets
e2e/         Playwright smoke tests, run in CI
```

## Run it locally

```bash
pnpm install
pnpm dev                # every app
pnpm --filter pdf dev   # one app
pnpm test:e2e           # Playwright
```

Node 20 (see `.nvmrc`). Deployed on Vercel.

---

A White Camellia project by [Alex Tudora](https://alextudora.com).
