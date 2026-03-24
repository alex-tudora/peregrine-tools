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
  devtoys: {
    slug: "devtoys",
    name: "DevToys",
    description:
      "DevToys is a popular offline developer toolkit for Windows and Mac. Here's how Peregrine Dev compares on accessibility, features, and convenience.",
    features: [
      {
        category: "Platform",
        peregrine: "Works in any browser on any device — no install needed",
        competitor: "Windows and Mac app only — no Linux, no mobile",
        winner: "peregrine",
      },
      {
        category: "Cost",
        peregrine: "100% free, no limits",
        competitor: "Free and open source",
        winner: "tie",
      },
      {
        category: "No Install",
        peregrine: "Browser-based — open a URL and start using it",
        competitor: "Requires downloading and installing an application",
        winner: "peregrine",
      },
      {
        category: "Privacy",
        peregrine: "All processing happens locally in your browser",
        competitor: "All processing happens locally on your machine",
        winner: "tie",
      },
      {
        category: "Tool Count",
        peregrine: "19 developer tools",
        competitor: "~30 developer tools",
        winner: "competitor",
      },
      {
        category: "UI",
        peregrine: "Clean web-based interface",
        competitor: "Native app feel with polished desktop UI",
        winner: "competitor",
      },
      {
        category: "Cross-Platform",
        peregrine: "Any device with a browser — desktop, tablet, phone",
        competitor: "Windows and Mac only",
        winner: "peregrine",
      },
      {
        category: "Updates",
        peregrine: "Always the latest version — no update needed",
        competitor: "Manual updates required via app store or download",
        winner: "peregrine",
      },
    ],
    verdict:
      "If you want a tool that works everywhere — on any OS, any device, without installing anything — Peregrine Dev is the clear winner. DevToys offers a slightly larger toolkit and a polished native app experience, but it's limited to Windows and Mac and requires installation. For everyday developer tasks like JSON formatting, Base64 encoding, and regex testing, Peregrine Dev gets you there faster with zero setup.",
  },
  cyberchef: {
    slug: "cyberchef",
    name: "CyberChef by GCHQ",
    description:
      "CyberChef is a powerful data transformation tool built by GCHQ. Here's how Peregrine Dev compares for everyday developer tasks vs advanced data manipulation.",
    features: [
      {
        category: "Flexibility",
        peregrine: "Purpose-built tools for common tasks",
        competitor: "Chain operations into complex \"recipes\" for advanced workflows",
        winner: "competitor",
      },
      {
        category: "Ease of Use",
        peregrine: "Each tool is purpose-built — pick a tool, paste your data, get results",
        competitor: "Complex recipe builder with hundreds of operations to search through",
        winner: "peregrine",
      },
      {
        category: "Learning Curve",
        peregrine: "Instant — no learning needed, tools are self-explanatory",
        competitor: "Steep — requires understanding how to chain operations",
        winner: "peregrine",
      },
      {
        category: "Privacy",
        peregrine: "All processing happens in your browser",
        competitor: "All processing happens in your browser",
        winner: "tie",
      },
      {
        category: "Power Users",
        peregrine: "Focused on common developer utilities",
        competitor: "Advanced regex, encoding chains, cryptographic operations",
        winner: "competitor",
      },
      {
        category: "Everyday Tasks",
        peregrine: "JSON format, Base64, URL encode are one-click operations",
        competitor: "Same tasks require building a recipe with the right operation",
        winner: "peregrine",
      },
      {
        category: "Mobile",
        peregrine: "Fully responsive — works great on phones and tablets",
        competitor: "Complex desktop UI that's difficult to use on mobile",
        winner: "peregrine",
      },
      {
        category: "SEO Tools",
        peregrine: "Includes color picker, hex-to-RGB, and other web dev utilities",
        competitor: "No web development or SEO-related tools",
        winner: "peregrine",
      },
    ],
    verdict:
      "CyberChef is an incredibly powerful tool for security researchers and data analysts who need to chain complex transformations. But for everyday developer tasks — formatting JSON, encoding Base64, testing regex, generating UUIDs — Peregrine Dev is dramatically simpler and faster. You don't need to build a recipe just to format some JSON. If you need power and flexibility, CyberChef wins. If you need speed and simplicity, Peregrine Dev is the better choice.",
  },
};

export function getCompetitor(slug: string): CompetitorData | undefined {
  return competitors[slug];
}

export function getAllCompetitorSlugs(): string[] {
  return Object.keys(competitors);
}
