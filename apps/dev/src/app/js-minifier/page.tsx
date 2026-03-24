import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JsMinifierTool } from "./JsMinifierTool";

const toolName = "JavaScript Minifier — Minify JS Online Free";
const description =
  "Minify JavaScript code by removing comments, collapsing whitespace, and stripping unnecessary newlines. Size comparison included. Free online JS minifier.";
const keyword = "javascript minifier";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/js-minifier";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste or type your JavaScript code into the input textarea",
  "Click the Minify button to process the code",
  "Review the minified output and the before/after size comparison",
  "Click Copy to copy the minified JavaScript to your clipboard",
];

const faqs = [
  {
    question: "Is this minifier safe for production?",
    answer:
      "This tool performs basic whitespace and comment removal, which is safe but not thorough. For production use, consider Terser or esbuild which can also mangle variable names and eliminate dead code while handling edge cases correctly.",
  },
  {
    question: "Will it break my JavaScript?",
    answer:
      "The tool removes comments and collapses whitespace, which should not alter behavior. However, if your code relies on string literals containing comment-like patterns, edge cases could occur. Always test after minification.",
  },
  {
    question: "Does it support ES6+ syntax?",
    answer:
      "The regex-based approach works on any text, including modern JavaScript with arrow functions, template literals, optional chaining, and other ES6+ features. It does not parse the AST.",
  },
  {
    question: "How much size reduction can I expect?",
    answer:
      "Comment and whitespace removal typically saves 20-40% depending on how well-commented and formatted the source code is. Variable mangling (not done here) would save an additional 10-30%.",
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

export default function JsMinifierPage() {
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
        subtitle="Paste your JavaScript and minify it instantly. Remove comments, collapse whitespace, and reduce file size."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            JavaScript minification removes unnecessary characters from source code while preserving its
            functionality. This includes single-line comments (<code>//</code>), multi-line comments
            (<code>/* */</code>), extra whitespace, and redundant newlines. Smaller JS files download faster
            and improve page load performance.
          </p>
          <p>
            This is a basic, regex-based <strong>JavaScript minifier</strong> suitable for quick tasks and
            simple scripts. It does not rename variables, tree-shake dead code, or perform advanced
            optimizations. For production builds, use dedicated tools like Terser, esbuild, or SWC that
            understand JavaScript syntax deeply and can apply aggressive, safe transformations.
          </p>
          <p>
            All processing happens entirely in your browser. Your JavaScript code is never sent to any
            server, making it safe to use with proprietary source code.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "HTML Minifier", href: "/html-minifier" },
          { name: "CSS Minifier", href: "/css-minifier" },
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "Diff Checker", href: "/diff-checker" },
        ]}
        nextStep={{ label: "Minify HTML too?", description: "Reduce HTML file size", href: "/html-minifier" }}
      >
        <JsMinifierTool />
      </ToolLayout>
    </>
  );
}
