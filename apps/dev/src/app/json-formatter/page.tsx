import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JsonFormatterTool } from "./JsonFormatterTool";

const toolName = "JSON Formatter — Beautify JSON Online Free";
const description =
  "Format and beautify JSON data instantly. Syntax highlighting, customizable indentation, collapse/expand, and error detection. Free online JSON formatter — no sign-up required.";
const keyword = "json formatter";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/json-formatter";

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

export default function JsonFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Paste your JSON and get a beautifully formatted, syntax-highlighted output. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Paste or type your raw JSON into the input text area",
          "Select your preferred indentation (2 spaces, 4 spaces, or tab)",
          "Click 'Format' to beautify the JSON with syntax highlighting",
          "Use the collapse/expand toggle to navigate large objects, or click 'Copy' to copy the result",
        ]}
        about={`
          <p>
            A <strong>JSON formatter</strong> transforms minified or messy JSON data into a clean,
            human-readable format with proper indentation and line breaks. Whether you are debugging
            an API response, reviewing a configuration file, or inspecting data from a database export,
            formatted JSON is far easier to read and understand than a single compressed line.
          </p>
          <p>
            This free <strong>JSON formatter</strong> parses your input using the browser's native
            JSON parser and renders it with syntax highlighting. Keys, strings, numbers, booleans,
            and null values each get distinct colors so you can scan the structure at a glance.
            You can choose between 2 spaces, 4 spaces, or tab indentation to match your project's
            style. A collapse/expand toggle lets you focus on specific sections of deeply nested data.
          </p>
          <p>
            All processing happens locally in your browser. Your JSON is never sent to any server,
            making this <strong>JSON formatter</strong> safe for API keys, tokens, and other sensitive
            data. There are no usage limits, no account requirements, and no ads.
          </p>
        `}
        faqs={[
          {
            question: "What happens if my JSON is invalid?",
            answer:
              "The tool will display a clear error message indicating what went wrong and where the parser encountered the issue. This helps you quickly locate and fix syntax errors such as missing commas, unclosed brackets, or trailing commas.",
          },
          {
            question: "What indentation options are available?",
            answer:
              "You can choose between 2 spaces, 4 spaces, or tab characters for indentation. The default is 2 spaces, which is the most common convention in web development.",
          },
          {
            question: "Can it handle large JSON files?",
            answer:
              "Yes. The formatter runs in your browser and can handle large JSON payloads. For extremely large files (several megabytes), there may be a brief processing delay, but there are no size limits enforced by the tool.",
          },
          {
            question: "How does syntax highlighting work?",
            answer:
              "The formatter applies color-coded CSS classes to different value types: keys are highlighted in one color, strings in another, numbers in a third, and booleans and null in their own colors. This makes it easy to visually parse the data structure.",
          },
          {
            question: "Is my JSON stored or sent anywhere?",
            answer:
              "No. All formatting happens locally in your browser. Your data is never transmitted to any server and is not stored or logged in any way.",
          },
        ]}
        relatedTools={[
          { name: "JSON Validator", href: "/json-validator" },
          { name: "JSON to CSV", href: "/json-to-csv" },
          { name: "SQL Formatter", href: "/sql-formatter" },
          { name: "Diff Checker", href: "/diff-checker" },
        ]}
      >
        <JsonFormatterTool />
      </ToolLayout>
    </>
  );
}
