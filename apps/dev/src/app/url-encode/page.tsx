import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { UrlEncodeTool } from "./UrlEncodeTool";

const toolName = "URL Encode/Decode — Convert Online Free";
const description =
  "Encode or decode URLs and query strings instantly. Uses encodeURIComponent and encodeURI. Free online URL encoder — no sign-up required.";
const keyword = "url encode";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/url-encode";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Type or paste your URL or text into the input area",
  "Click 'Encode' to URL-encode the text or 'Decode' to decode it",
  "View both the encodeURIComponent and encodeURI results",
  "Click 'Copy' to copy the output to your clipboard",
];

const faqs = [
  {
    question: "What is the difference between encodeURI and encodeURIComponent?",
    answer:
      "encodeURI encodes a full URI but preserves characters that have special meaning in URLs (://?#[]@!$&'()*+,;=). encodeURIComponent encodes everything except unreserved characters, making it the right choice for encoding individual query parameter values.",
  },
  {
    question: "When should I use URL encoding?",
    answer:
      "Use URL encoding when passing data as URL query parameters, when building links that contain special characters, or when including user-generated text in URLs. Without encoding, characters like & or = could break the URL structure.",
  },
  {
    question: "Does it handle Unicode characters?",
    answer:
      "Yes. Both encodeURI and encodeURIComponent handle Unicode characters by first encoding them as UTF-8 bytes and then percent-encoding each byte. This works for any language or emoji.",
  },
  {
    question: "What does decoding do?",
    answer:
      "Decoding reverses the process, converting percent-encoded sequences back to their original characters. For example, %20 becomes a space and %26 becomes an ampersand.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All encoding and decoding happens locally in your browser. Your data is never sent to any server and is not stored or logged.",
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

export default function UrlEncodePage() {
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
        subtitle="Encode or decode URLs and query parameters with both encodeURIComponent and encodeURI modes. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            <strong>URL encoding</strong> (also called percent-encoding) converts special characters
            in URLs into a format that can be safely transmitted over the internet. Characters like
            spaces, ampersands, question marks, and non-ASCII characters are replaced with percent
            signs followed by their hexadecimal byte values.
          </p>
          <p>
            This free <strong>URL encode</strong> tool provides two encoding modes. The
            encodeURIComponent mode encodes everything except unreserved characters (letters, digits,
            hyphens, underscores, periods, and tildes), making it ideal for query parameter values.
            The encodeURI mode preserves URL structure characters like colons, slashes, and question
            marks, which is useful when encoding a complete URL.
          </p>
          <p>
            All processing happens locally in your browser. Your URLs and data are never sent to a
            server, making this <strong>URL encode</strong> tool safe for encoding URLs that contain
            API keys, tokens, or other sensitive query parameters. There are no usage limits and no
            account required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Base64 Encode/Decode", href: "/base64" },
          {
            name: "UTM Builder",
            href: "https://peregrinekit.com/utm-builder",
          },
          { name: "Hash Generator", href: "/hash-generator" },
          { name: "UUID Generator", href: "/uuid-generator" },
        ]}
        nextStep={{ label: "Base64 encode?", description: "Encode data for transport", href: "/base64" }}
      >
        <UrlEncodeTool />
      </ToolLayout>
    </>
  );
}
