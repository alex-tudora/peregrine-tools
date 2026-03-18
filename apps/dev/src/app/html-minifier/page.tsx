import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { HtmlMinifierTool } from "./HtmlMinifierTool";

const toolName = "HTML Minifier — Minify HTML Online Free";
const description =
  "Minify HTML code by removing comments, collapsing whitespace, and stripping unnecessary tags. See before/after size comparison. Free online HTML minifier.";
const keyword = "html minifier";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/html-minifier";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const structuredData = generateToolStructuredData({
  toolName,
  description,
  url: `${siteUrl}${path}`,
  siteName,
});

export default function HtmlMinifierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Paste your HTML and minify it instantly. Remove comments, collapse whitespace, and reduce file size."
        keyword={keyword}
        howTo={[
          "Paste or type your HTML code into the input textarea",
          "Click the Minify button to process the code",
          "Review the minified output and the before/after size comparison",
          "Click Copy to copy the result or Download to save it as a file",
        ]}
        about={`
          <p>
            Minifying HTML removes unnecessary characters from your markup without changing its behavior.
            This includes stripping HTML comments, collapsing consecutive whitespace characters, and
            trimming blank lines. The result is a smaller file that loads faster over the network.
          </p>
          <p>
            While modern build tools like Webpack and Vite handle minification as part of the build
            process, there are many situations where a quick online <strong>HTML minifier</strong> is
            useful: checking the size impact of minification on a template, cleaning up email HTML,
            preparing snippets for embedding, or processing one-off files without setting up a build
            pipeline.
          </p>
          <p>
            This tool performs basic, safe minification using pattern-based rules. It removes
            <code>&lt;!-- comments --&gt;</code>, collapses runs of whitespace to a single space, and
            trims leading/trailing whitespace from lines. For production applications, consider a dedicated
            tool like <code>html-minifier-terser</code> that can also remove optional closing tags and
            collapse boolean attributes.
          </p>
        `}
        faqs={[
          {
            question: "Will minification break my HTML?",
            answer:
              "Basic minification (removing comments and extra whitespace) is safe and will not change how browsers render your page. The tool does not alter tag structure or attribute values.",
          },
          {
            question: "How much size reduction can I expect?",
            answer:
              "It depends on how much whitespace and how many comments your HTML contains. Typical reductions range from 10% to 30% for well-formatted source code. Heavily commented templates may see larger savings.",
          },
          {
            question: "Does it handle inline CSS and JavaScript?",
            answer:
              "The tool removes HTML comments but does not minify inline CSS or JavaScript. For those, use the dedicated CSS Minifier and JS Minifier tools.",
          },
          {
            question: "Is my HTML sent to a server?",
            answer:
              "No. All minification happens locally in your browser using JavaScript. Your code never leaves your machine.",
          },
        ]}
        relatedTools={[
          { name: "CSS Minifier", href: "/css-minifier" },
          { name: "JS Minifier", href: "/js-minifier" },
          { name: "HTML to Markdown", href: "https://peregrinekit.com/html-to-markdown" },
          { name: "Diff Checker", href: "/diff-checker" },
        ]}
      >
        <HtmlMinifierTool />
      </ToolLayout>
    </>
  );
}
