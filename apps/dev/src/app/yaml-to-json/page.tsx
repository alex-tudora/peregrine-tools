import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { YamlToJsonTool } from "./YamlToJsonTool";

const toolName = "YAML to JSON Converter — Free Online Tool";
const description =
  "Convert YAML to JSON format instantly. Paste your YAML and get valid, pretty-printed JSON output. Free online converter — no sign-up required.";
const keyword = "yaml to json";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/yaml-to-json";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste or type your YAML data into the input text area",
  "Click 'Convert' to generate the JSON output",
  "Review the JSON data in the output area",
  "Click 'Copy' to copy the JSON to your clipboard",
];

const faqs = [
  {
    question: "What YAML features are supported?",
    answer:
      "The converter supports the most commonly used YAML features: key-value pairs, nested objects, arrays (using dash notation), quoted and unquoted strings, numbers, booleans, null values, and multiline strings with literal (|) and folded (>) block scalars.",
  },
  {
    question: "How are YAML arrays converted to JSON?",
    answer:
      "YAML sequences (lines starting with - ) are converted to JSON arrays. Nested arrays and arrays of objects are fully preserved in the JSON output.",
  },
  {
    question: "What happens if my YAML is invalid?",
    answer:
      "The tool will display a clear error message indicating what went wrong during parsing. This helps you identify and fix syntax issues before conversion.",
  },
  {
    question: "Can I convert the JSON back to YAML?",
    answer:
      "Yes. Use the JSON to YAML converter tool to reverse the conversion. Both tools are available for free on this site.",
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

export default function YamlToJsonPage() {
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
        subtitle="Paste your YAML and get valid, pretty-printed JSON output. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Converting <strong>YAML to JSON</strong> is essential when you need to use YAML-based
            configuration data with APIs, JavaScript applications, or other systems that expect JSON
            format. This tool parses your YAML input and produces clean, properly formatted JSON with
            2-space indentation.
          </p>
          <p>
            YAML is popular for configuration files due to its readable, whitespace-based syntax, but
            many programming tools and APIs require JSON. This <strong>YAML to JSON</strong> converter
            handles key-value pairs, nested objects, arrays, multiline strings, and all standard scalar
            types — preserving your data structure exactly as defined in the YAML source.
          </p>
          <p>
            All processing happens locally in your browser. Your YAML data is never sent to a server,
            making this <strong>YAML to JSON</strong> converter safe for Kubernetes configs, CI/CD
            pipelines, and any files containing secrets or credentials. There are no file size limits,
            no account requirements, and no ads.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "JSON to YAML", href: "/json-to-yaml" },
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "YAML Formatter", href: "/yaml-formatter" },
        ]}
        nextStep={{ label: "Convert back to YAML?", description: "Transform JSON data back to YAML format", href: "/json-to-yaml" }}
      >
        <YamlToJsonTool />
      </ToolLayout>
    </>
  );
}
