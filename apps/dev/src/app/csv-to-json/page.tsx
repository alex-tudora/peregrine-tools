import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { CsvToJsonTool } from "./CsvToJsonTool";

const toolName = "CSV to JSON — Convert Online Free";
const description =
  "Convert CSV data to JSON instantly. Supports custom delimiters, header row detection, and download as .json. Free online CSV to JSON converter — no sign-up required.";
const keyword = "csv to json";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/csv-to-json";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste your CSV data into the input text area",
  "Select whether the first row contains headers and choose the delimiter",
  "Click 'Convert' to generate the JSON output",
  "Click 'Copy' to copy the JSON or 'Download .json' to save it as a file",
];

const faqs = [
  {
    question: "Which delimiters are supported?",
    answer:
      "The tool supports comma, tab, semicolon, and pipe as delimiters. Select the one that matches your CSV format from the dropdown before converting.",
  },
  {
    question: "What happens if my CSV has no header row?",
    answer:
      "Uncheck the 'Has header row' option and the tool will output a JSON array of arrays. Each inner array represents one row of data with values in their original column order.",
  },
  {
    question: "How are quoted fields handled?",
    answer:
      "Fields enclosed in double quotes are properly parsed. Commas and newlines inside quoted fields are preserved as part of the value, and escaped double quotes (\"\") are converted to single double quotes.",
  },
  {
    question: "Does it auto-detect data types?",
    answer:
      "All values are kept as strings to preserve the original data exactly. If you need numbers or booleans, you can post-process the JSON in your application code.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All conversion happens locally in your browser. Your CSV data is never sent to any server and is not stored or logged.",
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

export default function CsvToJsonPage() {
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
        subtitle="Paste CSV data and convert it to a JSON array of objects or arrays. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Converting <strong>CSV to JSON</strong> is essential when importing spreadsheet or
            tabular data into web applications, APIs, or NoSQL databases that work with JSON
            natively. This tool parses your CSV input and produces a clean JSON array that is
            ready to use in your code or import into your data pipeline.
          </p>
          <p>
            The converter supports multiple delimiters including comma, tab, semicolon, and pipe
            to accommodate different CSV dialects. When the first row is marked as a header row
            (the default), the output is a JSON array of objects where each key comes from the
            header. Without headers, you get a JSON array of arrays. Quoted fields and escaped
            characters are handled according to standard CSV conventions.
          </p>
          <p>
            All processing happens locally in your browser. Your CSV data is never sent to a
            server, making this <strong>CSV to JSON</strong> converter safe for sensitive
            spreadsheets, financial data, and internal reports. There are no file size limits
            and no account required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "JSON to CSV", href: "/json-to-csv" },
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "JSON Validator", href: "/json-validator" },
          { name: "Diff Checker", href: "/diff-checker" },
        ]}
      >
        <CsvToJsonTool />
      </ToolLayout>
    </>
  );
}
