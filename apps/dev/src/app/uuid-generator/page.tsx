import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { UuidGeneratorTool } from "./UuidGeneratorTool";

const toolName = "UUID Generator — Generate UUIDs Online Free";
const description =
  "Generate UUID v4 values instantly. Options for bulk generation, uppercase/lowercase, and hyphens. Free online UUID generator — no sign-up required.";
const keyword = "uuid generator";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/uuid-generator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Click 'Generate UUID' to create a new UUID v4",
  "Set the quantity (1-100) to generate multiple UUIDs at once",
  "Toggle uppercase/lowercase and include/exclude hyphens to match your format",
  "Click 'Copy' to copy the generated UUIDs to your clipboard",
];

const faqs = [
  {
    question: "What is a UUID v4?",
    answer:
      "UUID v4 is a version of the Universally Unique Identifier standard that uses random or pseudo-random numbers. The standard format is 8-4-4-4-12 hexadecimal characters with hyphens, like 550e8400-e29b-41d4-a716-446655440000. The '4' in the third group indicates the version.",
  },
  {
    question: "Are these UUIDs truly unique?",
    answer:
      "UUID v4 uses 122 bits of randomness, giving over 5.3 x 10^36 possible values. The probability of generating two identical UUIDs is astronomically small — you would need to generate about a billion UUIDs per second for 85 years to have a 50% chance of a single collision.",
  },
  {
    question: "Are these UUIDs cryptographically secure?",
    answer:
      "Yes. The tool uses crypto.randomUUID() or crypto.getRandomValues(), both of which use the browser's cryptographically secure random number generator. These are suitable for security-sensitive applications.",
  },
  {
    question: "When should I remove hyphens?",
    answer:
      "Some systems and databases store UUIDs without hyphens to save space (32 hex characters instead of 36). The hyphenless format is common in URLs, file names, and compact storage formats. Both formats represent the same 128-bit value.",
  },
  {
    question: "Are the generated UUIDs stored anywhere?",
    answer:
      "No. All generation happens locally in your browser. No UUIDs are sent to any server and none are stored or logged.",
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

export default function UuidGeneratorPage() {
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
        subtitle="Generate cryptographically random UUID v4 values with options for bulk generation, case, and formatting. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>UUID generator</strong> creates universally unique identifiers — 128-bit
            values that are virtually guaranteed to be unique across all systems without a central
            registry. UUID v4 values are generated using cryptographically secure random numbers,
            making them ideal for database primary keys, session tokens, API request IDs, and
            distributed system identifiers.
          </p>
          <p>
            This free <strong>UUID generator</strong> uses the browser's crypto.randomUUID() API
            when available, with a fallback to crypto.getRandomValues() for older browsers. Both
            methods produce cryptographically secure random values. You can generate up to 100
            UUIDs at once, toggle between uppercase and lowercase, and choose whether to include
            or exclude hyphens depending on your project's requirements.
          </p>
          <p>
            All generation happens locally in your browser. No UUIDs are sent to a server or
            stored anywhere, ensuring that your identifiers remain private. There are no usage
            limits and no account required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Hash Generator", href: "/hash-generator" },
          { name: "Base64 Encode/Decode", href: "/base64" },
          { name: "Timestamp Converter", href: "/timestamp-converter" },
          { name: "URL Encode/Decode", href: "/url-encode" },
        ]}
      >
        <UuidGeneratorTool />
      </ToolLayout>
    </>
  );
}
