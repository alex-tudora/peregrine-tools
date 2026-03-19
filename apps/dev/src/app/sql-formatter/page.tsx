import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { SqlFormatterTool } from "./SqlFormatterTool";

const toolName = "SQL Formatter — Format SQL Online Free";
const description =
  "Format and beautify SQL queries with syntax highlighting. Uppercase keywords, indent clauses, and color-code your SQL. Free online SQL formatter.";
const keyword = "sql formatter";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/sql-formatter";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste or type your SQL query into the input textarea",
  "Click the Format button to beautify the query",
  "Review the formatted output with syntax highlighting",
  "Click Copy to copy the formatted SQL to your clipboard",
];

const faqs = [
  {
    question: "What SQL dialects are supported?",
    answer:
      "The formatter works with standard SQL syntax common across MySQL, PostgreSQL, SQLite, SQL Server, and Oracle. It formats based on keyword recognition rather than dialect-specific parsing.",
  },
  {
    question: "Does it validate my SQL?",
    answer:
      "No. The tool formats the text based on keyword patterns but does not parse or validate SQL syntax. It will format even incomplete or invalid queries without reporting errors.",
  },
  {
    question: "Will it change my query logic?",
    answer:
      "No. The formatter only changes whitespace, newlines, and keyword casing. It never modifies table names, column names, values, or the structure of your query.",
  },
  {
    question: "Can it handle subqueries?",
    answer:
      "Yes. Parenthesized subqueries are indented to visually distinguish them from the outer query, making nested queries easier to follow.",
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

export default function SqlFormatterPage() {
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
        subtitle="Paste your SQL query and format it instantly with syntax highlighting, uppercase keywords, and proper indentation."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Well-formatted SQL is easier to read, review, and debug. This <strong>SQL formatter</strong>
            takes messy or minified SQL queries and applies consistent formatting: keywords are uppercased,
            major clauses start on new lines, and subqueries are indented for clarity.
          </p>
          <p>
            The output includes syntax highlighting with keywords in blue, string literals in green, and
            numbers in orange. This visual differentiation makes it faster to scan queries and spot
            errors, especially in complex joins and nested subqueries.
          </p>
          <p>
            The formatter recognizes standard SQL keywords including SELECT, FROM, WHERE, JOIN, GROUP BY,
            ORDER BY, HAVING, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, and many more. All processing
            happens in your browser with no server communication.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "Diff Checker", href: "/diff-checker" },
          { name: "HTML Minifier", href: "/html-minifier" },
          { name: "Regex Tester", href: "/regex-tester" },
        ]}
      >
        <SqlFormatterTool />
      </ToolLayout>
    </>
  );
}
