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
  convertio: {
    slug: "convertio",
    name: "Convertio",
    description:
      "Convertio is a widely used online file converter supporting hundreds of formats. Here's how Peregrine Vid compares on privacy, cost, and features.",
    features: [
      {
        category: "Privacy",
        peregrine: "Files never leave your device — all processing happens in your browser",
        competitor: "Files are uploaded to Convertio servers for processing",
        winner: "peregrine",
      },
      {
        category: "Cost",
        peregrine: "100% free, no premium tier, unlimited conversions",
        competitor: "Free: 10 minutes of conversion per day; then $10/month",
        winner: "peregrine",
      },
      {
        category: "Speed",
        peregrine: "Instant local processing — no upload/download wait",
        competitor: "Depends on file size and server load (upload + process + download)",
        winner: "peregrine",
      },
      {
        category: "File Size Limit",
        peregrine: "Limited by your browser memory (varies by device)",
        competitor: "Free: 100 MB per file; paid plans up to 2 GB",
        winner: "competitor",
      },
      {
        category: "Format Support",
        peregrine: "Focused set of video and audio formats (MP4, WebM, MP3, WAV, GIF)",
        competitor: "300+ formats across video, audio, image, and document types",
        winner: "competitor",
      },
      {
        category: "Batch Processing",
        peregrine: "Supports multiple files at once",
        competitor: "Supports multiple files at once",
        winner: "tie",
      },
      {
        category: "Quality Control",
        peregrine: "Compression and quality settings available",
        competitor: "Compression and quality settings available",
        winner: "tie",
      },
      {
        category: "Sign-up Required",
        peregrine: "No account needed",
        competitor: "Required for larger files and higher limits",
        winner: "peregrine",
      },
    ],
    verdict:
      "If privacy and unlimited free usage matter most to you, Peregrine Vid is the clear winner — your files never touch a server and there are no daily limits. Convertio shines when you need obscure format support or need to convert very large files with its paid plans. For everyday video and audio tasks like compressing, trimming, and converting between popular formats, Peregrine Vid delivers the same results faster and with zero privacy risk.",
  },
  cloudconvert: {
    slug: "cloudconvert",
    name: "CloudConvert",
    description:
      "CloudConvert is a powerful cloud-based file conversion platform used by developers and professionals. Here's an honest comparison with Peregrine Vid.",
    features: [
      {
        category: "Privacy",
        peregrine: "100% browser-based — files never leave your device",
        competitor: "Files uploaded to CloudConvert servers for processing",
        winner: "peregrine",
      },
      {
        category: "Cost",
        peregrine: "Completely free, no limits, no watermarks",
        competitor: "25 free conversions, then pay-per-use ($0.01-$0.05 per minute)",
        winner: "peregrine",
      },
      {
        category: "Speed",
        peregrine: "Instant for small/medium files — no upload needed",
        competitor: "Upload + server processing + download; faster for very large files",
        winner: "peregrine",
      },
      {
        category: "Format Support",
        peregrine: "Focused video/audio set (MP4, WebM, MP3, WAV, GIF)",
        competitor: "200+ formats with advanced codec and container options",
        winner: "competitor",
      },
      {
        category: "API Access",
        peregrine: "No developer API (browser tool only)",
        competitor: "Full REST API for automated workflows and integrations",
        winner: "competitor",
      },
      {
        category: "Ease of Use",
        peregrine: "Simple, purpose-built tools — pick a task and go",
        competitor: "Powerful but more complex interface with many options",
        winner: "peregrine",
      },
      {
        category: "No Account Required",
        peregrine: "No sign-up, no login, just use it",
        competitor: "Account required for all conversions",
        winner: "peregrine",
      },
      {
        category: "Advanced Settings",
        peregrine: "Basic quality and compression controls",
        competitor: "Codec-level control (bitrate, resolution, frame rate, audio channels)",
        winner: "competitor",
      },
    ],
    verdict:
      "For quick, private video and audio tasks, Peregrine Vid is faster, simpler, and completely free — your files never leave your browser. CloudConvert is the better choice if you need an API for automated workflows, codec-level control, or support for rare formats. For most everyday tasks like compressing a video, extracting audio, or converting to MP4, Peregrine Vid gets you there in seconds with zero friction.",
  },
};

export function getCompetitor(slug: string): CompetitorData | undefined {
  return competitors[slug];
}

export function getAllCompetitorSlugs(): string[] {
  return Object.keys(competitors);
}
