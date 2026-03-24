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
  ilovepdf: {
    slug: "ilovepdf",
    name: "iLovePDF",
    description:
      "iLovePDF is a popular online PDF platform with millions of users. Here's how Peregrine PDF compares on privacy, speed, and features.",
    features: [
      {
        category: "Privacy",
        peregrine: "Files never leave your device — all processing happens in your browser",
        competitor: "Files are uploaded to iLovePDF servers for processing",
        winner: "peregrine",
      },
      {
        category: "Cost",
        peregrine: "100% free, no premium tier, no limits",
        competitor: "Free tier with limits; Premium from $7/month",
        winner: "peregrine",
      },
      {
        category: "Speed",
        peregrine: "Instant — no upload/download wait, processes locally",
        competitor: "Depends on file size and server load",
        winner: "peregrine",
      },
      {
        category: "Sign-up Required",
        peregrine: "No account needed",
        competitor: "Free tier without account; premium requires sign-up",
        winner: "peregrine",
      },
      {
        category: "Tool Count",
        peregrine: "13 PDF tools",
        competitor: "25+ PDF tools",
        winner: "competitor",
      },
      {
        category: "Batch Processing",
        peregrine: "Supported for merging and conversions",
        competitor: "Supported with limits on free tier",
        winner: "tie",
      },
      {
        category: "OCR",
        peregrine: "Not yet available",
        competitor: "Available on premium plan",
        winner: "competitor",
      },
      {
        category: "File Size Limit",
        peregrine: "Limited by your browser memory (~100-500 MB)",
        competitor: "Free: 25 MB per task; Premium: up to 4 GB",
        winner: "tie",
      },
    ],
    verdict:
      "If privacy and speed are your top priorities, Peregrine PDF is the clear choice — your files never touch a server. If you need advanced features like OCR or a larger tool catalog, iLovePDF's premium plan may be worth considering. For everyday tasks like merging, splitting, compressing, and converting PDFs, Peregrine PDF delivers the same results faster and with zero privacy risk.",
  },
  smallpdf: {
    slug: "smallpdf",
    name: "Smallpdf",
    description:
      "Smallpdf is one of the most well-known PDF tools online. Here's an honest comparison with Peregrine PDF across privacy, pricing, and capabilities.",
    features: [
      {
        category: "Privacy",
        peregrine: "100% browser-based — files never leave your device",
        competitor: "Files uploaded to Smallpdf cloud servers; deleted after 1 hour",
        winner: "peregrine",
      },
      {
        category: "Cost",
        peregrine: "Completely free, no limits, no watermarks",
        competitor: "Free: 2 tasks/day; Pro from $12/month",
        winner: "peregrine",
      },
      {
        category: "Daily Limits",
        peregrine: "Unlimited",
        competitor: "Free tier: 2 tasks per day",
        winner: "peregrine",
      },
      {
        category: "Speed",
        peregrine: "Instant local processing — no upload required",
        competitor: "Upload → server processing → download",
        winner: "peregrine",
      },
      {
        category: "Sign-up Required",
        peregrine: "No account needed",
        competitor: "Required for most features",
        winner: "peregrine",
      },
      {
        category: "Tool Count",
        peregrine: "13 PDF tools",
        competitor: "20+ PDF tools plus eSign",
        winner: "competitor",
      },
      {
        category: "eSignature",
        peregrine: "Basic signature placement (draw or type)",
        competitor: "Full eSign workflow with multiple signers",
        winner: "competitor",
      },
      {
        category: "Desktop App",
        peregrine: "PWA installable from browser",
        competitor: "Native desktop app available",
        winner: "competitor",
      },
    ],
    verdict:
      "For quick, private PDF tasks — merging, splitting, compressing, converting — Peregrine PDF is faster, completely free, and never touches your files. Smallpdf offers a broader feature set and collaborative eSign workflows, but locks most functionality behind a $12/month paywall with a strict 2-task-per-day free limit. If you just need to get PDF work done without friction, Peregrine PDF wins.",
  },
};

export function getCompetitor(slug: string): CompetitorData | undefined {
  return competitors[slug];
}

export function getAllCompetitorSlugs(): string[] {
  return Object.keys(competitors);
}
