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
  zamzar: {
    slug: "zamzar",
    name: "Zamzar",
    description:
      "Zamzar is a long-standing online file conversion service supporting over 1,200 formats. Here's how Convert-a-Lot compares on privacy, speed, and cost.",
    features: [
      {
        category: "Privacy",
        peregrine: "Files never leave your device — all processing happens in your browser",
        competitor: "Files are uploaded to Zamzar servers for processing",
        winner: "peregrine",
      },
      {
        category: "Cost",
        peregrine: "100% free, no limits, no premium tier",
        competitor: "Free: 2 files/day; paid plans from $18/month",
        winner: "peregrine",
      },
      {
        category: "Speed",
        peregrine: "Instant — local processing with no upload/download wait",
        competitor: "Depends on file size and server queue",
        winner: "peregrine",
      },
      {
        category: "Format Range",
        peregrine: "Focused set of popular formats (images, video, audio, data)",
        competitor: "1,200+ file formats supported",
        winner: "competitor",
      },
      {
        category: "File Size",
        peregrine: "Limited by browser memory (varies by device)",
        competitor: "Free: up to 200 MB; paid plans: up to 2 GB",
        winner: "competitor",
      },
      {
        category: "Batch Processing",
        peregrine: "One file at a time per conversion",
        competitor: "Queue multiple files for batch conversion",
        winner: "competitor",
      },
      {
        category: "Email Delivery",
        peregrine: "Not needed — instant download in browser",
        competitor: "Converted files sent via email",
        winner: "peregrine",
      },
      {
        category: "Sign-up Required",
        peregrine: "No account needed",
        competitor: "Account required for most features",
        winner: "peregrine",
      },
    ],
    verdict:
      "If privacy and simplicity matter most, Convert-a-Lot is the clear winner — your files stay on your device and conversions are instant. Zamzar is a better fit if you need obscure file formats or batch processing for large files. For everyday conversions like images, video, audio, and data files, Convert-a-Lot delivers the same results faster, with no sign-up, no cost, and zero privacy risk.",
  },
  onlineconvert: {
    slug: "onlineconvert",
    name: "Online-Convert.com",
    description:
      "Online-Convert.com is a feature-rich file conversion platform with advanced codec options. Here's how Convert-a-Lot compares on privacy, ease of use, and value.",
    features: [
      {
        category: "Privacy",
        peregrine: "Files never leave your device — all processing happens in your browser",
        competitor: "Files are uploaded to Online-Convert servers for processing",
        winner: "peregrine",
      },
      {
        category: "Cost",
        peregrine: "100% free, no limits, no premium tier",
        competitor: "Limited free tier; paid plans from $8.49/month",
        winner: "peregrine",
      },
      {
        category: "Speed (Small Files)",
        peregrine: "Instant — no upload required, processes locally",
        competitor: "Upload → server processing → download",
        winner: "peregrine",
      },
      {
        category: "Format Range",
        peregrine: "Focused set of popular formats (images, video, audio, data)",
        competitor: "Broader format support including niche formats",
        winner: "competitor",
      },
      {
        category: "Advanced Settings",
        peregrine: "Simple, streamlined conversion options",
        competitor: "Detailed codec, bitrate, resolution, and quality controls",
        winner: "competitor",
      },
      {
        category: "Ease of Use",
        peregrine: "Clean, minimal UI — select format, drop file, done",
        competitor: "Feature-rich but more complex interface",
        winner: "peregrine",
      },
      {
        category: "Sign-up Required",
        peregrine: "No account needed",
        competitor: "Free tier without account; paid features require sign-up",
        winner: "peregrine",
      },
      {
        category: "Developer API",
        peregrine: "Not available",
        competitor: "REST API for automated conversions",
        winner: "competitor",
      },
    ],
    verdict:
      "For quick, private conversions with zero friction, Convert-a-Lot wins hands down — no uploads, no accounts, no cost. Online-Convert.com is the better choice if you need fine-grained codec settings, niche formats, or an API for automated workflows. For most people converting images, videos, audio files, and data formats, Convert-a-Lot is faster, simpler, and completely private.",
  },
};

export function getCompetitor(slug: string): CompetitorData | undefined {
  return competitors[slug];
}

export function getAllCompetitorSlugs(): string[] {
  return Object.keys(competitors);
}
