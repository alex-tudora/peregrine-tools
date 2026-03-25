import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JsonToYamlTool } from "./JsonToYamlTool";

const toolName = "JSON to YAML Converter — Free Online Tool";
const description =
  "Convert JSON to YAML format instantly. Paste your JSON and get clean, properly indented YAML output. Free online converter — no sign-up required.";
const keyword = "json to yaml";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/json-to-yaml";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste or type your JSON data into the input text area",
  "Click 'Convert' to generate the YAML output",
  "Review the YAML data in the output area",
  "Click 'Copy' to copy the YAML to your clipboard",
];

const faqs = [
  {
    question: "What JSON formats are supported?",
    answer:
      "Any valid JSON is supported — objects, arrays, nested structures, strings, numbers, booleans, and null values. The converter uses the browser's native JSON parser, so if it's valid JSON, it will convert.",
  },
  {
    question: "How are nested objects converted?",
    answer:
      "Nested JSON objects are converted to indented YAML blocks. Each level of nesting adds 2 spaces of indentation, making the hierarchy easy to read.",
  },
  {
    question: "How are arrays converted?",
    answer:
      "JSON arrays are converted to YAML sequences using the dash (- ) prefix for each item. Nested arrays and arrays of objects are handled with appropriate indentation.",
  },
  {
    question: "Can I convert the YAML back to JSON?",
    answer:
      "Yes. Use the YAML to JSON converter tool to reverse the conversion. Both tools are available for free on this site.",
  },
  {
    question: "Is my data stored or sent anywhere?",
    answer:
      "No. All conversion happens locally in your browser. Your data is never transmitted to any server and is not stored or logged in any way.",
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

export default function JsonToYamlPage() {
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
        subtitle="Paste your JSON and get clean, properly indented YAML output. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Converting <strong>JSON to YAML</strong> is a common task when working with configuration
            files, Kubernetes manifests, CI/CD pipelines, and other systems that prefer YAML's
            human-friendly syntax. This tool takes valid JSON input and transforms it into clean,
            properly indented YAML.
          </p>
          <p>
            YAML's whitespace-based structure makes it easier to read than JSON for configuration
            files, especially when dealing with deeply nested data. This <strong>JSON to YAML</strong>
            converter preserves all data types — strings, numbers, booleans, null values, arrays,
            and nested objects — and formats the output with consistent 2-space indentation.
          </p>
          <p>
            All processing happens locally in your browser. Your JSON data is never sent to a server,
            making this <strong>JSON to YAML</strong> converter safe for sensitive configuration data,
            API responses, and internal documents. There are no file size limits, no account
            requirements, and no ads.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "YAML to JSON", href: "/yaml-to-json" },
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "YAML Formatter", href: "/yaml-formatter" },
        ]}
        nextStep={{ label: "Convert back to JSON?", description: "Transform YAML data back to JSON format", href: "/yaml-to-json" }}
      >
        <JsonToYamlTool />
      </ToolLayout>
    </>
  );
}
