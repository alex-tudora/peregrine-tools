import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { RobotsTxtGeneratorTool } from "./RobotsTxtGeneratorTool";

const toolName = "Robots.txt Generator — Create Robots.txt Free";
const description =
  "Generate a valid robots.txt file for your website. Configure user agents, allow/disallow paths, crawl delay, and sitemap URL. Free online robots.txt generator — no sign-up required.";
const keyword = "robots txt generator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/robots-txt-generator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Set the User-agent (use * for all crawlers or specify a bot name)",
  "Enter paths to allow and disallow, one per line",
  "Optionally set a crawl delay and sitemap URL",
  "Add more rule groups if you need different rules for different bots",
  "Copy or download the generated robots.txt file",
];

const faqs = [
  {
    question: "Where should I place my robots.txt file?",
    answer:
      "The robots.txt file must be placed in the root directory of your website so it is accessible at https://yourdomain.com/robots.txt. Search engines look for it at this exact location.",
  },
  {
    question: "Does robots.txt prevent pages from being indexed?",
    answer:
      "Not exactly. Robots.txt tells crawlers not to access certain pages, but if other pages link to a blocked URL, search engines may still index it with a minimal listing. To prevent indexing entirely, use a noindex meta tag on the page itself.",
  },
  {
    question: "What does the User-agent * mean?",
    answer:
      "The asterisk (*) is a wildcard that matches all search engine crawlers. Rules under User-agent: * apply to every bot unless you have a more specific rule group for a particular crawler like Googlebot.",
  },
  {
    question: "What is crawl delay?",
    answer:
      "Crawl-delay is a directive that asks crawlers to wait a specified number of seconds between requests. This can reduce server load. Note that Googlebot does not honour the crawl-delay directive — use Google Search Console to manage Googlebot's crawl rate instead.",
  },
  {
    question: "Can I have multiple rule groups?",
    answer:
      "Yes. You can define different rules for different user agents. For example, you might allow Googlebot to access everything but block certain paths for other crawlers.",
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

export default function RobotsTxtGeneratorPage() {
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
        subtitle="Create a properly formatted robots.txt file for your website. Configure crawling rules for search engine bots. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            The robots.txt file is a plain-text file placed in the root directory of your website that
            tells search engine crawlers which pages or sections they are allowed or not allowed to
            access. A well-configured <strong>robots.txt</strong> file helps control how search engines
            index your site, prevents them from wasting crawl budget on unimportant pages, and keeps
            private directories out of search results.
          </p>
          <p>
            This <strong>robots txt generator</strong> lets you define multiple rule groups, each
            targeting a specific user agent or all crawlers. You can specify allowed and disallowed
            paths, set a crawl delay, and include a sitemap URL. The generated file follows the
            Robots Exclusion Standard and is ready to be uploaded to your server.
          </p>
          <p>
            All processing runs locally in your browser. Your configuration is never sent to any
            external server, making this tool safe to use for client projects and private websites.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Sitemap Generator", href: "/sitemap-generator" },
          { name: "Meta Tag Generator", href: "/meta-tag-generator" },
          { name: "Heading Checker", href: "/heading-checker" },
          { name: "Open Graph Preview", href: "/open-graph-preview" },
        ]}
        nextStep={{ label: "Generate a sitemap?", description: "Create an XML sitemap for your site", href: "/sitemap-generator" }}
      >
        <RobotsTxtGeneratorTool />
      </ToolLayout>
    </>
  );
}
