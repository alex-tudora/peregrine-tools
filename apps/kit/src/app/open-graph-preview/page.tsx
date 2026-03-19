import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { OpenGraphPreviewTool } from "./OpenGraphPreviewTool";

const toolName = "Open Graph Preview — See How Links Look on Social Media";
const description =
  "Preview how your Open Graph tags will look when shared on Facebook, Twitter, and LinkedIn. Generate OG meta tags with live preview. Free — no sign-up required.";
const keyword = "open graph preview";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/open-graph-preview";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Enter your Open Graph title, description, and image URL",
  "Optionally add your site name and page URL",
  "Preview how the link will look on Facebook, Twitter, and LinkedIn",
  "Copy the generated OG meta tags and add them to your page's <head> section",
];

const faqs = [
  {
    question: "What image size works best for Open Graph?",
    answer:
      "Facebook recommends 1200 x 630 pixels for optimal display. Twitter recommends 1200 x 628 pixels for summary_large_image cards. An image at 1200 x 630 pixels works well across all platforms.",
  },
  {
    question: "Why does my shared link not show the correct preview?",
    answer:
      "Social media platforms cache OG data. After updating your tags, use Facebook's Sharing Debugger or Twitter's Card Validator to force a refresh of the cached preview.",
  },
  {
    question: "Are Open Graph tags the same as Twitter Card tags?",
    answer:
      "They are similar but not identical. Twitter has its own set of meta tags (twitter:card, twitter:title, etc.), but it will fall back to Open Graph tags if Twitter-specific tags are not present. For best results, include both.",
  },
  {
    question: "Does this tool fetch the actual page to generate previews?",
    answer:
      "No. This tool generates previews based on the information you enter. It does not fetch or crawl any external URLs, which means it works for pages that are not yet published.",
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

export default function OpenGraphPreviewPage() {
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
        subtitle="See exactly how your links will appear on Facebook, Twitter, and LinkedIn before you publish. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Open Graph tags control how your content appears when shared on social media. A missing or
            poorly configured set of OG tags can result in broken previews, missing images, or generic
            titles that fail to attract clicks. This <strong>open graph preview</strong> tool lets you
            see exactly what your link will look like on Facebook, Twitter, and LinkedIn before you
            publish.
          </p>
          <p>
            Enter your title, description, image URL, and other details, and the tool generates
            accurate previews for each major platform. You also get the ready-to-use HTML meta tags
            that you can paste directly into your page's &lt;head&gt; section. This eliminates the
            guesswork of debugging OG tags by trial and error on live social media posts.
          </p>
          <p>
            Everything runs in your browser. No data is sent to any server, making this tool
            completely safe for previewing unpublished pages and confidential marketing campaigns.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Meta Tag Generator", href: "/meta-tag-generator" },
          { name: "UTM Builder", href: "/utm-builder" },
          { name: "Sitemap Generator", href: "/sitemap-generator" },
          { name: "QR Code Generator", href: "/qr-code-generator" },
        ]}
      >
        <OpenGraphPreviewTool />
      </ToolLayout>
    </>
  );
}
