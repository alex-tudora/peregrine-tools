import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { MetaTagGeneratorTool } from "./MetaTagGeneratorTool";

const toolName = "Meta Tag Generator — Create SEO Meta Tags Free";
const description =
  "Generate perfect HTML meta tags for SEO, Open Graph, and Twitter Cards. Real-time preview with character counters. Free online meta tag generator — no sign-up required.";
const keyword = "meta tag generator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/meta-tag-generator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Enter your page title (up to 60 characters recommended for search engines)",
  "Write a compelling meta description (up to 160 characters)",
  "Add keywords, author, and configure robots directives as needed",
  "Fill in Open Graph and Twitter Card fields for social media sharing",
  "Copy the generated HTML meta tags and paste them into your page's <head> section",
];

const faqs = [
  {
    question: "What is the recommended length for a page title?",
    answer:
      "Google typically displays the first 50-60 characters of a title tag. Keeping your title under 60 characters helps ensure it is shown in full in search results without being truncated.",
  },
  {
    question: "What is the ideal meta description length?",
    answer:
      "Meta descriptions should be between 120 and 160 characters. Google may display up to about 155-160 characters, so staying within this range ensures your full description is visible.",
  },
  {
    question: "Are meta keywords still important for SEO?",
    answer:
      "Google has publicly stated it does not use the meta keywords tag as a ranking signal. However, some other search engines may still consider them. Including a few relevant keywords does not hurt and can be useful for internal documentation.",
  },
  {
    question: "What are Open Graph tags?",
    answer:
      "Open Graph (OG) tags control how your page appears when shared on social media platforms like Facebook and LinkedIn. They let you specify a custom title, description, image, and URL for the shared link preview.",
  },
  {
    question: "Do I need both Open Graph and Twitter Card tags?",
    answer:
      "Twitter can fall back to Open Graph tags if Twitter-specific tags are not present. However, including both gives you the most control over how your content appears on each platform.",
  },
];

const schemas = generateToolPageStructuredData({
  toolName,
  description,
  keyword,
  url: `${siteUrl}${path}`,
  siteName,
  siteUrl,
  path,
  faqs,
  howTo,
});

export default function MetaTagGeneratorPage() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ToolLayout
        title={toolName}
        subtitle="Generate SEO-optimized meta tags for your web pages. Real-time HTML preview with character counters. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Meta tags are snippets of HTML that describe a page's content to search engines and social
            media platforms. A well-crafted set of <strong>meta tags</strong> improves how your page
            appears in search results, controls indexing behaviour, and determines how your content looks
            when shared on Facebook, Twitter, and LinkedIn.
          </p>
          <p>
            This free <strong>meta tag generator</strong> lets you fill in all the important fields —
            title, description, keywords, viewport, robots, canonical URL, Open Graph, and Twitter Card
            tags — and instantly see the generated HTML. Character counters help you stay within the
            recommended limits so your titles and descriptions are not truncated in search results.
          </p>
          <p>
            All processing runs in your browser. Your content is never sent to a server, making this
            tool safe for work on unpublished pages, client projects, and confidential content.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Open Graph Preview", href: "/open-graph-preview" },
          { name: "Robots.txt Generator", href: "/robots-txt-generator" },
          { name: "Sitemap Generator", href: "/sitemap-generator" },
          { name: "Heading Checker", href: "/heading-checker" },
        ]}
      >
        <MetaTagGeneratorTool />
      </ToolLayout>
    </>
  );
}
