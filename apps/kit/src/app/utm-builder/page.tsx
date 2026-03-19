import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { UtmBuilderTool } from "./UtmBuilderTool";

const toolName = "UTM Builder — Create Campaign URLs Free";
const description =
  "Build UTM-tagged URLs for tracking marketing campaigns in Google Analytics. Add source, medium, campaign, term, and content parameters. Free UTM builder — no sign-up required.";
const keyword = "utm builder";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/utm-builder";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Enter your website URL (the destination page)",
  "Fill in the required UTM parameters: source, medium, and campaign name",
  "Optionally add utm_term and utm_content for more granular tracking",
  "Copy the generated URL and use it in your marketing campaigns",
  "Track the results in Google Analytics under Acquisition > Campaigns",
];

const faqs = [
  {
    question: "What are the required UTM parameters?",
    answer:
      "Google Analytics requires at least utm_source, utm_medium, and utm_campaign to properly attribute traffic. The other two parameters — utm_term and utm_content — are optional but useful for more detailed tracking.",
  },
  {
    question: "Are UTM parameters case-sensitive?",
    answer:
      "Yes. Google Analytics treats 'Email' and 'email' as different sources. It is best practice to use lowercase for all UTM values to avoid splitting your data across multiple entries.",
  },
  {
    question: "Can UTM parameters affect SEO?",
    answer:
      "UTM parameters themselves do not directly affect SEO rankings. However, if search engines index URLs with UTM parameters, it can create duplicate content issues. Use canonical tags and configure your CMS to handle this properly.",
  },
  {
    question: "How do I view UTM data in Google Analytics?",
    answer:
      "In Google Analytics 4, navigate to Reports > Acquisition > Traffic acquisition. You can see campaign data by selecting the Session campaign dimension. In Universal Analytics, go to Acquisition > Campaigns > All Campaigns.",
  },
  {
    question: "Should I use UTM parameters for internal links?",
    answer:
      "No. UTM parameters should only be used for external campaigns (emails, social posts, ads). Using them on internal links will override the original source attribution and break your analytics data.",
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

export default function UtmBuilderPage() {
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
        subtitle="Generate UTM-tagged URLs for tracking marketing campaigns in analytics tools. Real-time URL preview. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            UTM parameters are tags you append to a URL so that analytics tools like Google Analytics
            can track where your traffic comes from and which campaigns are driving conversions. The
            five standard UTM parameters — <code>utm_source</code>, <code>utm_medium</code>,
            <code>utm_campaign</code>, <code>utm_term</code>, and <code>utm_content</code> — give you
            a detailed picture of your marketing performance.
          </p>
          <p>
            This <strong>UTM builder</strong> generates properly formatted campaign URLs in real time
            as you type. It validates your base URL, encodes parameter values correctly, and provides
            a reference table of commonly used UTM values so you can maintain consistent naming
            conventions across campaigns.
          </p>
          <p>
            All processing happens locally in your browser. No data is stored or sent to any server,
            making this tool safe for building URLs for confidential campaigns and unreleased products.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Meta Tag Generator", href: "/meta-tag-generator" },
          { name: "Open Graph Preview", href: "/open-graph-preview" },
          { name: "QR Code Generator", href: "/qr-code-generator" },
          { name: "Sitemap Generator", href: "/sitemap-generator" },
        ]}
      >
        <UtmBuilderTool />
      </ToolLayout>
    </>
  );
}
