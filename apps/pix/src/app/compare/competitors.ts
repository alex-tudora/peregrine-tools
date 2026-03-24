export interface CompetitorData {
  slug: string;
  name: string;
  description: string;
  features: {
    category: string;
    peregrine: string;
    competitor: string;
    winner: "peregrine" | "competitor" | "tie";
  }[];
  verdict: string;
}

export const competitors: Record<string, CompetitorData> = {
  tinypng: {
    slug: "tinypng",
    name: "TinyPNG",
    description:
      "TinyPNG is a widely used image compression service trusted by millions of developers and designers. Here's how Peregrine Pix compares on privacy, cost, and features.",
    features: [
      {
        category: "Privacy",
        peregrine: "Files never leave your device — all processing happens in your browser",
        competitor: "Files are uploaded to TinyPNG servers for processing",
        winner: "peregrine",
      },
      {
        category: "Cost",
        peregrine: "100% free, no limits, no premium tier",
        competitor: "500 free compressions/month; then $25/year for 10,000",
        winner: "peregrine",
      },
      {
        category: "Speed",
        peregrine: "Instant — no upload/download wait, processes locally",
        competitor: "Depends on file size and server upload/download speed",
        winner: "peregrine",
      },
      {
        category: "Formats",
        peregrine: "PNG, JPG, WebP compression plus 10+ format conversions",
        competitor: "PNG, JPG, WebP, and APNG compression",
        winner: "competitor",
      },
      {
        category: "Batch Processing",
        peregrine: "Unlimited batch compression",
        competitor: "Up to 20 files at once (free tier)",
        winner: "tie",
      },
      {
        category: "Quality",
        peregrine: "Smart lossy compression with adjustable quality",
        competitor: "Smart lossy compression with excellent results",
        winner: "tie",
      },
      {
        category: "Resize",
        peregrine: "Built-in resize tool with custom dimensions",
        competitor: "Resize only available via API",
        winner: "peregrine",
      },
      {
        category: "API",
        peregrine: "No developer API",
        competitor: "Full REST API for automated workflows",
        winner: "competitor",
      },
    ],
    verdict:
      "If privacy and cost are your priorities, Peregrine Pix is the clear winner — your images never leave your device and there are no usage limits. TinyPNG is a solid choice if you need a developer API for automated pipelines or work with APNG files. For everyday image compression, resizing, and format conversion, Peregrine Pix delivers the same quality results instantly and with zero privacy risk.",
  },
  squoosh: {
    slug: "squoosh",
    name: "Squoosh by Google",
    description:
      "Squoosh is a browser-based image compression tool developed by the Google Chrome team. Here's an honest comparison with Peregrine Pix across features, usability, and capabilities.",
    features: [
      {
        category: "Privacy",
        peregrine: "100% browser-based — files never leave your device",
        competitor: "100% browser-based — files never leave your device",
        winner: "tie",
      },
      {
        category: "Cost",
        peregrine: "Completely free, no limits",
        competitor: "Completely free, no limits",
        winner: "tie",
      },
      {
        category: "Formats",
        peregrine: "PNG, JPG, WebP, SVG conversions and compression",
        competitor: "AVIF, JXL, WebP, MozJPEG, OxiPNG, and more codecs",
        winner: "competitor",
      },
      {
        category: "Batch Processing",
        peregrine: "Full batch support — compress or convert many files at once",
        competitor: "Single file only — no batch processing",
        winner: "peregrine",
      },
      {
        category: "Ease of Use",
        peregrine: "Simple, focused UI with dedicated tools for each task",
        competitor: "Technical interface with codec-level settings",
        winner: "peregrine",
      },
      {
        category: "Advanced Controls",
        peregrine: "Quality slider and preset options",
        competitor: "Full codec-level controls (effort, channels, quantization)",
        winner: "competitor",
      },
      {
        category: "Additional Tools",
        peregrine: "Resize, crop, watermark, background removal, favicon generator, and more",
        competitor: "Resize only — no other image editing tools",
        winner: "peregrine",
      },
      {
        category: "Before/After Preview",
        peregrine: "Side-by-side comparison of original vs compressed",
        competitor: "Interactive slider comparison of original vs compressed",
        winner: "tie",
      },
    ],
    verdict:
      "Both tools are excellent browser-based options that keep your files private. Squoosh shines if you need cutting-edge codecs like AVIF or JPEG XL, or want granular control over compression parameters. Peregrine Pix is the better choice for everyday workflows — it supports batch processing, offers a wider toolkit (crop, watermark, favicon generation, background removal), and has a simpler interface. If you compress images regularly and need more than one at a time, Peregrine Pix saves significant time.",
  },
};

export function getCompetitor(slug: string): CompetitorData | undefined {
  return competitors[slug];
}

export function getAllCompetitorSlugs(): string[] {
  return Object.keys(competitors);
}
