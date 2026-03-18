import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { Base64Tool } from "./Base64Tool";

const toolName = "Base64 Encode/Decode — Convert Online Free";
const description =
  "Encode text to Base64 or decode Base64 to text instantly. Supports Unicode characters. Free online Base64 tool — no sign-up required.";
const keyword = "base64 encode";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/base64";

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

export default function Base64Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Encode text to Base64 or decode Base64 back to text with full Unicode support. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Type or paste your text in the input area",
          "Click 'Encode' to convert text to Base64 or 'Decode' to convert Base64 back to text",
          "View the result in the output area",
          "Click 'Copy' to copy the output to your clipboard",
        ]}
        about={`
          <p>
            <strong>Base64 encoding</strong> converts binary data or text into an ASCII string
            representation using a set of 64 printable characters. It is widely used for embedding
            data in URLs, email attachments (MIME), JSON Web Tokens, data URIs in HTML and CSS,
            and anywhere binary data needs to be safely transmitted as text.
          </p>
          <p>
            This free <strong>Base64 encode</strong> tool handles Unicode text correctly using the
            TextEncoder API to convert characters to UTF-8 bytes before encoding. This means you
            can encode text in any language — including emoji, Chinese, Arabic, and other non-ASCII
            characters — without errors. Decoding reverses the process and restores the original
            text faithfully.
          </p>
          <p>
            All processing happens locally in your browser. Your data is never sent to a server,
            making this tool safe for encoding sensitive values like API keys, tokens, or
            credentials. There are no usage limits and no account required.
          </p>
        `}
        faqs={[
          {
            question: "What is Base64 encoding used for?",
            answer:
              "Base64 is used to represent binary data as ASCII text. Common uses include embedding images in HTML (data URIs), encoding credentials for HTTP Basic Auth, storing binary data in JSON, and encoding email attachments.",
          },
          {
            question: "Does it support Unicode and emoji?",
            answer:
              "Yes. The tool uses the TextEncoder API to properly convert Unicode text to UTF-8 bytes before Base64 encoding, so characters like accented letters, CJK characters, and emoji are all handled correctly.",
          },
          {
            question: "What is the difference between btoa and TextEncoder?",
            answer:
              "The native btoa() function only works with Latin-1 characters and throws an error on Unicode. This tool first converts text to UTF-8 bytes using TextEncoder, then encodes those bytes to Base64, avoiding the limitation.",
          },
          {
            question: "Is Base64 encryption?",
            answer:
              "No. Base64 is an encoding scheme, not encryption. It does not protect data — anyone can decode Base64 back to the original content. For security, use proper encryption algorithms.",
          },
          {
            question: "Is my data stored anywhere?",
            answer:
              "No. All encoding and decoding happens locally in your browser. Your data is never sent to any server and is not stored or logged.",
          },
        ]}
        relatedTools={[
          { name: "URL Encode/Decode", href: "/url-encode" },
          { name: "Hash Generator", href: "/hash-generator" },
          { name: "JWT Decoder", href: "/jwt-decoder" },
          {
            name: "Image to Base64",
            href: "https://peregrinepix.com/image-to-base64",
          },
        ]}
      >
        <Base64Tool />
      </ToolLayout>
    </>
  );
}
