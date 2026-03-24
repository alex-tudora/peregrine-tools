import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { MarkdownToHtmlTool } from "./MarkdownToHtmlTool";

const toolName = "Markdown to HTML — Convert Online Free";
const description =
  "Convert Markdown to HTML instantly. See the raw HTML code and a rendered preview side by side. Free online tool — no sign-up required.";
const keyword = "markdown to html";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/markdown-to-html";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Type or paste your Markdown content into the left panel",
  "View the generated HTML code on the right in real time",
  "Switch between 'HTML Code' and 'Preview' tabs to see raw code or rendered output",
  "Click 'Copy HTML' to copy the HTML code to your clipboard",
];

const faqs = [
  {
    question: "Which Markdown features are supported?",
    answer:
      "The converter supports headings (#), bold (**text**), italic (*text*), links, images, inline code, fenced code blocks, unordered and ordered lists, blockquotes, horizontal rules, and strikethrough (~~text~~).",
  },
  {
    question: "Does it support GitHub Flavored Markdown?",
    answer:
      "It supports the most common GFM features including fenced code blocks and strikethrough. More advanced features like tables and task lists are not yet supported.",
  },
  {
    question: "Can I use this for a static site generator?",
    answer:
      "The generated HTML is standard and can be used anywhere HTML is accepted. However, for production static site generators, a full Markdown parser library is recommended for edge-case handling.",
  },
  {
    question: "Is the HTML output safe from XSS?",
    answer:
      "The converter processes Markdown syntax but does not sanitize raw HTML embedded in the Markdown input. If you plan to display user-generated content, pass the output through a sanitizer before rendering.",
  },
  {
    question: "Is my content stored anywhere?",
    answer:
      "No. All conversion happens locally in your browser. Your Markdown content is never sent to a server or stored in any way.",
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

export default function MarkdownToHtmlPage() {
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
        subtitle="Write Markdown and see the HTML output in real time. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Markdown is a lightweight markup language widely used for documentation, blog posts, README
            files, and content management systems. When you need the HTML equivalent of your Markdown
            content, this <strong>markdown to html</strong> converter generates it instantly as you type,
            with no build step or command-line tool required.
          </p>
          <p>
            The converter supports the most common Markdown elements: headings (h1 through h6), bold
            and italic text, links, images, inline code, fenced code blocks, unordered and ordered
            lists, blockquotes, horizontal rules, and strikethrough text. You can view the output as
            raw HTML code for embedding in your project, or switch to the preview tab to see how the
            content will render in a browser.
          </p>
          <p>
            This <strong>markdown to html</strong> tool runs entirely in your browser using pure
            JavaScript string manipulation. No external libraries are loaded and no data is sent to a
            server. This makes it safe for converting private documentation, internal wikis, and
            sensitive content. There are no usage limits, no file size restrictions, and no account
            creation required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "HTML to Markdown", href: "/html-to-markdown" },
          { name: "Word Counter", href: "/word-counter" },
          { name: "Lorem Ipsum Generator", href: "/lorem-ipsum-generator" },
          { name: "Meta Tag Generator", href: "/meta-tag-generator" },
        ]}
        nextStep={{ label: "Convert back?", description: "Turn HTML back into Markdown", href: "/html-to-markdown" }}
      >
        <MarkdownToHtmlTool />
      </ToolLayout>
    </>
  );
}
