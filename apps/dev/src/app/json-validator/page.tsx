import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JsonValidatorTool } from "./JsonValidatorTool";

const toolName = "JSON Validator — Validate JSON Online Free";
const description =
  "Validate your JSON instantly with real-time error detection, line numbers, and structure analysis. See key count, nesting depth, and data type. Free online JSON validator — no sign-up required.";
const keyword = "json validator";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/json-validator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste or type your JSON into the text area",
  "Validation runs automatically as you type",
  "See a green checkmark for valid JSON or a red error message with line number details",
  "Review the structure info: root type, key count, and maximum nesting depth",
];

const faqs = [
  {
    question: "How does real-time validation work?",
    answer:
      "The tool parses your JSON using the browser's JSON.parse() method each time you stop typing. If parsing succeeds, it shows a green checkmark. If it fails, it shows the error message from the parser along with the approximate position of the error.",
  },
  {
    question: "What common JSON errors does it detect?",
    answer:
      "It detects all JSON syntax errors including trailing commas, single quotes instead of double quotes, missing colons between key-value pairs, unclosed brackets or braces, unquoted keys, and invalid escape sequences.",
  },
  {
    question: "What does nesting depth mean?",
    answer:
      "Nesting depth measures how many levels of objects and arrays are nested inside each other. A flat object with no nested structures has a depth of 1. Deeply nested JSON can be harder to work with and may indicate that the data structure could be simplified.",
  },
  {
    question: "Does it validate JSON Schema?",
    answer:
      "This tool validates JSON syntax, not JSON Schema. It confirms that the data is well-formed JSON but does not check it against a schema definition. For schema validation, a dedicated JSON Schema validator is needed.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All validation happens locally in your browser. Your JSON is never sent to any server and is not stored or logged.",
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

export default function JsonValidatorPage() {
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
        subtitle="Paste your JSON and get instant validation with detailed error messages and structure analysis. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>JSON validator</strong> checks whether your JSON data is syntactically correct
            and gives you immediate feedback on any errors. This is essential when working with APIs,
            configuration files, or data pipelines where a single misplaced comma or missing bracket
            can break everything downstream.
          </p>
          <p>
            This free <strong>JSON validator</strong> runs in real time as you type. It uses the
            browser's native JSON parser for reliable, standards-compliant validation. When an error
            is found, it displays the specific error message along with the approximate line number
            so you can fix the problem quickly. For valid JSON, the tool shows structural information
            including whether the root is an object or array, the total number of keys, and the
            maximum nesting depth.
          </p>
          <p>
            Because all processing happens locally in your browser, your JSON data is never sent to
            a server. This makes the <strong>JSON validator</strong> safe for sensitive payloads such
            as API responses containing tokens, user data, or internal configuration. There are no
            usage limits and no account required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "JSON to CSV", href: "/json-to-csv" },
          { name: "CSV to JSON", href: "/csv-to-json" },
          { name: "Regex Tester", href: "/regex-tester" },
        ]}
      >
        <JsonValidatorTool />
      </ToolLayout>
    </>
  );
}
