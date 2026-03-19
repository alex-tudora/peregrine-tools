import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { SitemapGeneratorTool } from "./SitemapGeneratorTool";

const toolName = "Sitemap Generator — Create XML Sitemaps Free";
const description =
  "Generate a valid XML sitemap for your website. Add URLs with priority and change frequency settings. Free online sitemap generator — no sign-up required.";
const keyword = "sitemap generator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/sitemap-generator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Add URLs one by one or paste multiple URLs in bulk (one per line)",
  "Set the priority and change frequency for each URL",
  "Preview the generated XML sitemap",
  "Copy the XML or download it as sitemap.xml",
  "Upload the file to your website's root directory",
];

const faqs = [
  {
    question: "How do I submit my sitemap to Google?",
    answer:
      "You can submit your sitemap through Google Search Console by going to the Sitemaps section and entering the URL where your sitemap.xml is hosted. You can also reference it in your robots.txt file using the Sitemap directive.",
  },
  {
    question: "What priority value should I use?",
    answer:
      "Priority is a relative value between 0.0 and 1.0 that indicates how important a page is compared to other pages on your site. Your homepage might be 1.0, main category pages 0.8, and individual articles 0.6. The default of 0.5 is a reasonable middle ground.",
  },
  {
    question: "What does changefreq mean?",
    answer:
      "The changefreq element tells search engines how frequently the content at a URL is likely to change. Options range from 'always' for constantly updated content to 'never' for archived pages. Search engines use this as a hint, not a guarantee.",
  },
  {
    question: "Is there a limit on the number of URLs in a sitemap?",
    answer:
      "The sitemap protocol allows up to 50,000 URLs per sitemap file, and the file size must not exceed 50 MB when uncompressed. If your site has more URLs, you can split them across multiple sitemaps and reference them from a sitemap index file.",
  },
  {
    question: "Where should I host my sitemap.xml?",
    answer:
      "Place the sitemap.xml file in the root directory of your website so it is accessible at https://yourdomain.com/sitemap.xml. You can also place it elsewhere, but you must submit the full URL to search engines.",
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

export default function SitemapGeneratorPage() {
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
        subtitle="Create a valid XML sitemap for your website with priority and change frequency settings. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            An XML sitemap is a file that lists the important pages of your website, helping search
            engines like Google discover and crawl them efficiently. Submitting a <strong>sitemap</strong>
            to search engines ensures that new and updated content is found quickly, which can improve
            your site's visibility in search results.
          </p>
          <p>
            This <strong>sitemap generator</strong> lets you build a valid XML sitemap by adding URLs
            with optional priority and change frequency settings. Priority tells search engines which
            pages you consider most important (on a scale from 0.0 to 1.0), and change frequency
            indicates how often the content is likely to change. While search engines treat these as
            hints rather than strict directives, a well-structured sitemap improves crawl efficiency.
          </p>
          <p>
            Everything is processed locally in your browser. No URLs or data are sent to any external
            server, so this tool is safe to use for sites under development or behind authentication.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Robots.txt Generator", href: "/robots-txt-generator" },
          { name: "Meta Tag Generator", href: "/meta-tag-generator" },
          { name: "Open Graph Preview", href: "/open-graph-preview" },
          { name: "UTM Builder", href: "/utm-builder" },
        ]}
      >
        <SitemapGeneratorTool />
      </ToolLayout>
    </>
  );
}
