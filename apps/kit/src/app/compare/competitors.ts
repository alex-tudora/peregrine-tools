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
  counttool: {
    slug: "counttool",
    name: "CountWordsFree / WordCounter.net",
    description:
      "CountWordsFree and WordCounter.net are popular word counting tools used by writers and students. Here's how Peregrine Kit compares on speed, privacy, and features.",
    features: [
      {
        category: "Accuracy",
        peregrine: "Accurate word and character counts using reliable parsing",
        competitor: "Accurate word and character counts",
        winner: "tie",
      },
      {
        category: "Speed",
        peregrine: "Instant results — no ads slowing down the page",
        competitor: "Functional but heavy ad load affects page performance",
        winner: "peregrine",
      },
      {
        category: "Privacy",
        peregrine: "100% browser-based — no text sent to any server",
        competitor: "Text may be processed server-side; unclear privacy policies",
        winner: "peregrine",
      },
      {
        category: "Extra Stats",
        peregrine: "Reading time, speaking time, average word length, sentence count",
        competitor: "Basic word and character counts only",
        winner: "peregrine",
      },
      {
        category: "Tool Variety",
        peregrine: "30+ tools — text, math, SEO, and more in one place",
        competitor: "Single-purpose word counting tool",
        winner: "peregrine",
      },
      {
        category: "Ads",
        peregrine: "Minimal, non-intrusive",
        competitor: "Heavy ad load with pop-ups and banners",
        winner: "peregrine",
      },
      {
        category: "Mobile",
        peregrine: "Clean, responsive design that works on any screen size",
        competitor: "Usable but cluttered on mobile due to ads",
        winner: "peregrine",
      },
      {
        category: "Cost",
        peregrine: "100% free, no premium tier",
        competitor: "Free to use",
        winner: "tie",
      },
    ],
    verdict:
      "For basic word counting, both tools get the job done. But Peregrine Kit goes further with reading time, speaking time, and additional text statistics — all in a clean, ad-light interface. Plus, your text never leaves your browser. If you need more than just counting words, Peregrine Kit offers 30+ tools including case conversion, text diff, readability scoring, calculators, and SEO tools — all from one place.",
  },
  calculatorsoup: {
    slug: "calculatorsoup",
    name: "Calculator Soup",
    description:
      "Calculator Soup is a well-known site offering hundreds of specialized online calculators. Here's how Peregrine Kit compares on design, privacy, and tool breadth.",
    features: [
      {
        category: "Tool Range",
        peregrine: "30+ tools across text, math, and SEO categories",
        competitor: "Hundreds of specialized calculators for math, finance, and science",
        winner: "competitor",
      },
      {
        category: "UX / Design",
        peregrine: "Modern, clean interface with consistent design across all tools",
        competitor: "Functional but dated design; inconsistent layouts",
        winner: "peregrine",
      },
      {
        category: "Privacy",
        peregrine: "All processing happens in your browser — nothing sent to servers",
        competitor: "Standard server-based processing; ad trackers present",
        winner: "peregrine",
      },
      {
        category: "Speed",
        peregrine: "Fast, lightweight pages with minimal load times",
        competitor: "Slower page loads due to heavy ads and scripts",
        winner: "peregrine",
      },
      {
        category: "Text Tools",
        peregrine: "Word counter, case converter, text diff, readability score, and more",
        competitor: "No text editing or analysis tools",
        winner: "peregrine",
      },
      {
        category: "SEO Tools",
        peregrine: "Meta tag generator, Open Graph preview, robots.txt, sitemap generator",
        competitor: "No SEO or webmaster tools",
        winner: "peregrine",
      },
      {
        category: "Mobile",
        peregrine: "Fully responsive modern design",
        competitor: "Usable but layout feels cramped on mobile",
        winner: "peregrine",
      },
      {
        category: "Ads",
        peregrine: "Minimal, non-intrusive ads",
        competitor: "Heavy ad load throughout the site",
        winner: "peregrine",
      },
    ],
    verdict:
      "Calculator Soup wins on sheer quantity of specialized math and science calculators — if you need a specific formula, they probably have it. But Peregrine Kit offers a better overall experience: a modern, fast interface with tools spanning text, math, and SEO categories. If you regularly work with text or need SEO tools alongside calculators, Peregrine Kit is the more versatile choice. And everything runs in your browser, so your data stays private.",
  },
};

export function getCompetitor(slug: string): CompetitorData | undefined {
  return competitors[slug];
}

export function getAllCompetitorSlugs(): string[] {
  return Object.keys(competitors);
}
