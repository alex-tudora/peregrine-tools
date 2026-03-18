import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { CssMinifierTool } from "./CssMinifierTool";

const toolName = "CSS Minifier — Minify CSS Online Free";
const description =
  "Minify CSS code by removing comments, collapsing whitespace, and stripping unnecessary characters. Before/after size comparison. Free online CSS minifier.";
const keyword = "css minifier";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/css-minifier";

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

export default function CssMinifierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Paste your CSS and minify it instantly. Remove comments, collapse whitespace, and reduce file size."
        keyword={keyword}
        howTo={[
          "Paste or type your CSS code into the input textarea",
          "Click the Minify button to process the code",
          "Review the minified output and the size comparison",
          "Click Copy to copy the minified CSS to your clipboard",
        ]}
        about={`
          <p>
            CSS minification reduces file size by removing characters that browsers do not need to parse
            a stylesheet correctly. This includes comments, extra whitespace, trailing semicolons before
            closing braces, and redundant spaces around selectors and property values. Smaller CSS files
            mean faster downloads and quicker page rendering.
          </p>
          <p>
            Build tools like PostCSS, cssnano, and Lightning CSS handle minification automatically in
            production pipelines. This online <strong>CSS minifier</strong> is handy when you need a quick
            one-off minification without setting up a build tool, or when you want to check how much size
            minification would save on a particular stylesheet.
          </p>
          <p>
            All processing runs in your browser. Your CSS is never uploaded to any server, making it safe
            to use with proprietary stylesheets and client code.
          </p>
        `}
        faqs={[
          {
            question: "Will minification break my CSS?",
            answer:
              "No. The tool only removes characters that have no effect on how browsers interpret the stylesheet: comments, extra whitespace, and trailing semicolons. Selectors and property values are not altered.",
          },
          {
            question: "Does it handle CSS variables and modern syntax?",
            answer:
              "Yes. The minification is purely character-level (removing whitespace and comments), so it works with any CSS syntax including custom properties, nesting, container queries, and @layer rules.",
          },
          {
            question: "How much size reduction should I expect?",
            answer:
              "Typical savings range from 15% to 40%, depending on the amount of whitespace and comments in your source CSS. Heavily documented stylesheets will see the largest reductions.",
          },
          {
            question: "Is my CSS sent to a server?",
            answer:
              "No. All minification happens locally in your browser. Your code never leaves your machine.",
          },
        ]}
        relatedTools={[
          { name: "HTML Minifier", href: "/html-minifier" },
          { name: "JS Minifier", href: "/js-minifier" },
          { name: "Color Picker", href: "/color-picker" },
          { name: "Diff Checker", href: "/diff-checker" },
        ]}
      >
        <CssMinifierTool />
      </ToolLayout>
    </>
  );
}
