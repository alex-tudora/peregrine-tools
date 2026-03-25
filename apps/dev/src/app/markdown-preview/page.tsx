import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { MarkdownPreviewTool } from "./MarkdownPreviewTool";

const toolName = "Markdown Preview — Live Markdown Editor Free";
const description =
  "Preview markdown in real time as you type. Supports headings, bold, italic, code blocks, links, lists, and more. Free live markdown editor — no sign-up required.";
const keyword = "markdown preview";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/markdown-preview";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Type or paste your markdown into the editor on the left",
  "Watch the rendered HTML preview update instantly on the right",
  "Use the 'Copy Markdown' button to copy the raw markdown source",
  "Use the 'Copy HTML' button to copy the generated HTML output",
];

const faqs = [
  {
    question: "What markdown syntax is supported?",
    answer:
      "The tool supports headings (h1 through h6), bold, italic, inline code, fenced code blocks, links, unordered and ordered lists, blockquotes, horizontal rules, and paragraphs. It covers the most commonly used Markdown features.",
  },
  {
    question: "Does the preview update automatically?",
    answer:
      "Yes. The preview pane updates in real time as you type. There is no need to click a button to refresh the output.",
  },
  {
    question: "Can I copy the generated HTML?",
    answer:
      "Yes. Click the 'Copy HTML' button to copy the rendered HTML to your clipboard. You can paste it directly into any HTML document, CMS, or email template.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All parsing and rendering happens entirely in your browser. Your markdown content is never transmitted to any server and is not stored or logged.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. On smaller screens the editor and preview stack vertically so you can write and preview comfortably on phones and tablets.",
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

export default function MarkdownPreviewPage() {
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
        subtitle="Write markdown on the left, see the rendered preview on the right. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>markdown preview</strong> tool lets you write Markdown and see the rendered
            HTML output side by side in real time. Markdown is the de facto standard for writing
            documentation, README files, blog posts, and technical notes. However, raw Markdown
            syntax can be difficult to proofread without seeing the final result. This tool
            bridges that gap by showing you exactly how your content will look as you type.
          </p>
          <p>
            This free <strong>markdown preview</strong> editor supports all the commonly used
            Markdown features: headings from h1 through h6, bold and italic text, inline code
            and fenced code blocks, links, ordered and unordered lists, blockquotes, horizontal
            rules, and paragraphs. The preview updates instantly with every keystroke, so there
            is no waiting and no button to press. You can copy the raw Markdown or the generated
            HTML with a single click.
          </p>
          <p>
            All processing happens locally in your browser. Your content is never sent to any
            server, making this <strong>markdown preview</strong> tool safe for drafting private
            documentation, internal notes, or any sensitive material. There are no usage limits,
            no account requirements, and no ads.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "Diff Checker", href: "/diff-checker" },
          { name: "HTML Minifier", href: "/html-minifier" },
        ]}
        nextStep={{ label: "Compare two texts?", description: "Find differences between two blocks of text or code", href: "/diff-checker" }}
      >
        <MarkdownPreviewTool />
      </ToolLayout>
    </>
  );
}
