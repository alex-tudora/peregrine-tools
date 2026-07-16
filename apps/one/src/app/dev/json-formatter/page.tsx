import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JsonFormatterTool } from "./JsonFormatterTool";

/*
 * Consolidation PoC — mirrors apps/dev/src/app/json-formatter/page.tsx with only
 * the siteName / siteUrl / path changed to the consolidated structure.
 */
const toolName = "JSON Formatter — Format & Beautify JSON Online";
const description =
  "Format, beautify, and validate JSON instantly. Free online JSON formatter with syntax highlighting. Processed entirely in your browser — no sign-up.";
const keyword = "json formatter";
const siteName = "Peregrine Tools";
const siteUrl = "https://peregrine-tools.com";
const path = "/dev/json-formatter";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste your JSON into the input area above",
  "Choose your preferred indentation (2 spaces, 4 spaces, or tabs)",
  'Click "Format" to beautify and validate the JSON',
  "Copy the formatted output or collapse it to a single line",
];

const faqs = [
  {
    question: "Is my JSON sent to a server?",
    answer:
      "No. Formatting and validation happen entirely in your browser using the native JSON parser. Your data never leaves your device.",
  },
  {
    question: "What happens if my JSON is invalid?",
    answer:
      "The formatter shows the exact parse error message so you can locate and fix the problem — a missing comma, an unquoted key, or a trailing bracket.",
  },
  {
    question: "Can it handle large JSON files?",
    answer:
      "Yes. Because it runs locally, performance is bound only by your browser and device memory rather than an upload limit.",
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

export default function JsonFormatterPage() {
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
        subtitle="Format, beautify, and validate JSON with syntax highlighting. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>JSON formatter</strong> turns minified or messy JSON into clean, indented,
            human-readable output. Paste an API response or a config blob, pick your indentation,
            and get back consistently formatted JSON with syntax highlighting — plus instant
            validation that pinpoints parse errors.
          </p>
          <p>
            Everything runs in your browser using the native JSON parser, so even sensitive
            payloads never leave your device.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Base64 Encode/Decode", href: "/dev/base64" },
          { name: "Regex Tester", href: "/dev/regex-tester" },
          { name: "Word Counter", href: "/text/word-counter" },
        ]}
        nextStep={{
          label: "Need to encode something?",
          description: "Base64 encode or decode text and files",
          href: "/dev/base64",
        }}
      >
        <JsonFormatterTool />
      </ToolLayout>
    </>
  );
}
