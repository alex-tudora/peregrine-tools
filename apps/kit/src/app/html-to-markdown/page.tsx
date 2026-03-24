import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { HtmlToMarkdownTool } from "./HtmlToMarkdownTool";

const toolName = "HTML to Markdown — Convert Online Free";
const description =
  "Convert HTML to Markdown instantly. Transforms headings, bold, italic, links, lists, and code blocks. Free online tool — no sign-up required.";
const keyword = "html to markdown";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/html-to-markdown";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste your HTML code into the left panel",
  "The Markdown output appears in the right panel in real time",
  "Review the converted Markdown for accuracy",
  "Click 'Copy Markdown' to copy the result to your clipboard",
];

const faqs = [
  {
    question: "Which HTML elements are supported?",
    answer:
      "The converter handles headings (h1-h6), bold (strong, b), italic (em, i), links (a), images (img), lists (ul, ol, li), paragraphs (p), line breaks (br), code (code, pre), blockquotes, horizontal rules (hr), and strikethrough (del, s).",
  },
  {
    question: "What happens to unsupported HTML elements?",
    answer:
      "HTML tags that do not have a Markdown equivalent are stripped, and their text content is preserved. This means you will not lose text, but formatting specific to those tags (like table structure) will not be represented in the output.",
  },
  {
    question: "Does it handle nested lists?",
    answer:
      "The converter handles single-level lists well. Deeply nested lists may not preserve their indentation hierarchy perfectly, as regex-based parsing has limitations with recursive structures.",
  },
  {
    question: "Can I convert entire web pages?",
    answer:
      "Yes. You can paste the full HTML of a web page. The converter will strip DOCTYPE, html, head, and body tags automatically and convert the content elements to Markdown.",
  },
  {
    question: "Is my HTML content private?",
    answer:
      "Absolutely. All conversion happens locally in your browser. Your HTML is never sent to any server or stored anywhere.",
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

export default function HtmlToMarkdownPage() {
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
        subtitle="Paste HTML and get clean Markdown output. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            When migrating content between platforms or converting web pages to documentation, you
            often need to turn HTML into Markdown. This <strong>html to markdown</strong> converter
            handles the transformation instantly, parsing your HTML and producing clean, readable
            Markdown output that you can paste into any Markdown-compatible editor or platform.
          </p>
          <p>
            The tool converts the most common HTML elements: h1 through h6 tags become Markdown
            headings with the appropriate number of hash symbols, strong and b tags become bold
            (**text**), em and i tags become italic (*text*), anchor tags become Markdown links,
            img tags become image syntax, ul and ol lists become Markdown lists, pre and code blocks
            become fenced code blocks, and p tags become paragraphs with proper spacing. HTML entities
            are decoded back to their original characters.
          </p>
          <p>
            This <strong>html to markdown</strong> converter runs entirely in your browser using
            regex-based parsing. No external libraries are loaded and no data is transmitted to a
            server. Your HTML content stays completely private, making it safe for converting internal
            documentation, email templates, and proprietary web content. There are no file size limits,
            no daily usage caps, and no account required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Markdown to HTML", href: "/markdown-to-html" },
          { name: "Word Counter", href: "/word-counter" },
          { name: "Find & Replace", href: "/find-and-replace" },
          { name: "Heading Checker", href: "/heading-checker" },
        ]}
        nextStep={{ label: "Convert back?", description: "Turn Markdown back into HTML", href: "/markdown-to-html" }}
      >
        <HtmlToMarkdownTool />
      </ToolLayout>
    </>
  );
}
