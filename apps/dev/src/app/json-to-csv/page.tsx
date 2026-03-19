import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JsonToCsvTool } from "./JsonToCsvTool";

const toolName = "JSON to CSV — Convert Online Free";
const description =
  "Convert a JSON array of objects to CSV format instantly. Handles nested objects with dot notation flattening. Download as .csv file. Free online tool — no sign-up required.";
const keyword = "json to csv";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/json-to-csv";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste a JSON array of objects into the input text area",
  "Click 'Convert' to generate the CSV output",
  "Review the CSV data in the output area",
  "Click 'Copy' to copy the CSV or 'Download .csv' to save it as a file",
];

const faqs = [
  {
    question: "What format does the JSON need to be in?",
    answer:
      "The input should be a JSON array of objects, like [{\"name\": \"Alice\", \"age\": 30}, {\"name\": \"Bob\", \"age\": 25}]. Each object becomes a row, and the keys become column headers.",
  },
  {
    question: "How are nested objects handled?",
    answer:
      "Nested objects are flattened using dot notation. For example, {\"user\": {\"name\": \"Alice\"}} produces a column called 'user.name'. Arrays within objects are converted to their JSON string representation.",
  },
  {
    question: "What if objects have different keys?",
    answer:
      "The tool collects all unique keys across all objects in the array. If an object is missing a key, the corresponding CSV cell will be empty.",
  },
  {
    question: "Are special characters in values handled?",
    answer:
      "Yes. Values containing commas, double quotes, or newlines are automatically wrapped in double quotes and properly escaped following the CSV standard (RFC 4180).",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All conversion happens locally in your browser. Your JSON is never sent to any server and is not stored or logged.",
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

export default function JsonToCsvPage() {
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
        subtitle="Paste a JSON array of objects and convert it to a downloadable CSV file. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Converting <strong>JSON to CSV</strong> is a common task when you need to import data
            into spreadsheets, databases, or reporting tools that expect tabular formats. This tool
            takes a JSON array of objects and transforms it into comma-separated values with headers
            derived from the object keys.
          </p>
          <p>
            The converter handles nested objects by flattening them with dot notation. For example,
            a nested field like <code>{"address": {"city": "London"}}</code> becomes a column header
            <code>address.city</code> with the value <code>London</code>. This ensures that no data
            is lost during conversion, even with complex JSON structures.
          </p>
          <p>
            All processing happens locally in your browser. Your JSON data is never sent to a server,
            making this <strong>JSON to CSV</strong> tool safe for sensitive datasets, API responses,
            and internal reports. There are no file size limits, no account requirements, and you can
            download the result as a .csv file with one click.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "CSV to JSON", href: "/csv-to-json" },
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "JSON Validator", href: "/json-validator" },
          { name: "Diff Checker", href: "/diff-checker" },
        ]}
      >
        <JsonToCsvTool />
      </ToolLayout>
    </>
  );
}
