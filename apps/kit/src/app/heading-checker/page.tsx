import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { HeadingCheckerTool } from "./HeadingCheckerTool";

const toolName = "Heading Checker — Analyze HTML Heading Structure";
const description =
  "Check your HTML heading hierarchy for SEO issues. Detect missing levels, multiple H1 tags, and improper nesting. Free online heading checker — no sign-up required.";
const keyword = "heading checker";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/heading-checker";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste your HTML code into the text area",
  "The tool automatically extracts and analyzes all heading tags (H1-H6)",
  "Review the heading tree to see the document structure at a glance",
  "Check for warnings like multiple H1 tags or skipped heading levels",
  "Use the count summary to verify heading distribution across levels",
];

const faqs = [
  {
    question: "Why should I have only one H1 tag?",
    answer:
      "The H1 tag represents the main topic of the page. While HTML5 technically allows multiple H1 tags, SEO best practice is to have a single H1 that clearly describes the page's primary subject. Multiple H1 tags can dilute the topical focus and confuse search engines.",
  },
  {
    question: "What does 'skipped heading level' mean?",
    answer:
      "A skipped heading level occurs when you jump from one heading level to a non-sequential one, such as going from H1 to H3 without an H2 in between. This breaks the logical document outline and can cause accessibility issues for screen reader users.",
  },
  {
    question: "How long should headings be?",
    answer:
      "There is no strict character limit for headings, but keeping them concise (under 70 characters) is a good practice. Headings should be descriptive enough to convey the section's topic but short enough to be easily scannable.",
  },
  {
    question: "Does heading structure affect SEO rankings?",
    answer:
      "While headings are not a direct ranking factor in the same way as backlinks, Google has confirmed they help understand the structure and content of a page. A clear heading hierarchy improves content comprehension, which can indirectly benefit rankings.",
  },
  {
    question: "Can I paste a full HTML page?",
    answer:
      "Yes. The tool will extract heading tags from any HTML you paste, whether it is a complete page with DOCTYPE and body tags or just a fragment of content. Only H1 through H6 tags are analysed.",
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

export default function HeadingCheckerPage() {
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
        subtitle="Paste your HTML and instantly see the heading hierarchy, detect SEO issues, and fix structural problems. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Proper heading structure is one of the fundamental elements of both SEO and web
            accessibility. Search engines use headings to understand the hierarchy and main topics of
            your content, while screen readers rely on them to help users navigate the page. A
            <strong>heading checker</strong> helps you catch common mistakes before they impact your
            rankings or user experience.
          </p>
          <p>
            This tool parses your HTML and extracts every heading tag from H1 through H6. It displays
            them as an indented tree so you can instantly see the document structure. It also performs
            automated checks for common issues: multiple H1 tags (there should typically be only one),
            skipped heading levels (e.g., jumping from H1 to H3 without an H2), and headings that may
            be too long.
          </p>
          <p>
            Issues are colour-coded — green for correct structure, yellow for warnings, and red for
            errors. All processing runs locally in your browser, so your HTML is never sent to any
            external server. This makes the tool safe for checking unpublished pages, client work,
            and confidential content.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Meta Tag Generator", href: "/meta-tag-generator" },
          { name: "Readability Score", href: "/readability-score" },
          { name: "Open Graph Preview", href: "/open-graph-preview" },
          { name: "Sitemap Generator", href: "/sitemap-generator" },
        ]}
        nextStep={{ label: "Generate meta tags?", description: "Create optimized meta tags for SEO", href: "/meta-tag-generator" }}
      >
        <HeadingCheckerTool />
      </ToolLayout>
    </>
  );
}
