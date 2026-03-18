import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { HashGeneratorTool } from "./HashGeneratorTool";

const toolName = "Hash Generator — SHA-256, SHA-512 Online Free";
const description =
  "Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text using the Web Crypto API. Free online hash generator — no sign-up required.";
const keyword = "md5 hash generator";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/hash-generator";

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

export default function HashGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Enter text and instantly generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Type or paste your text into the input field",
          "All hash values (SHA-1, SHA-256, SHA-384, SHA-512) are generated automatically",
          "Click 'Copy' next to any hash value to copy it to your clipboard",
          "Use the hashes for checksums, data integrity verification, or password hashing workflows",
        ]}
        about={`
          <p>
            A <strong>hash generator</strong> computes a fixed-length fingerprint from any input
            text using cryptographic hash functions. These one-way functions are used extensively
            in software development for data integrity checks, password storage, digital signatures,
            and content addressing.
          </p>
          <p>
            This free <strong>hash generator</strong> uses the Web Crypto API (SubtleCrypto)
            built into every modern browser to compute SHA-1, SHA-256, SHA-384, and SHA-512 hashes.
            The Web Crypto API provides hardware-accelerated, standards-compliant implementations.
            Note that MD5 is not available through the Web Crypto API because it is considered
            cryptographically broken — the SHA family shown here provides far stronger security.
          </p>
          <p>
            All hashing happens locally in your browser. Your text is never sent to a server,
            making this tool safe for hashing sensitive values like passwords or tokens. There
            are no usage limits and no account required.
          </p>
        `}
        faqs={[
          {
            question: "Why is MD5 not included?",
            answer:
              "MD5 is not available in the Web Crypto API because it is considered cryptographically broken — collision attacks are practical and well-documented. SHA-256 and SHA-512 are the recommended alternatives for any security-sensitive use case.",
          },
          {
            question: "What is the difference between SHA-256 and SHA-512?",
            answer:
              "SHA-256 produces a 256-bit (32-byte) hash and SHA-512 produces a 512-bit (64-byte) hash. SHA-512 provides a larger output and higher collision resistance, but SHA-256 is sufficient for most applications and is the most widely used variant.",
          },
          {
            question: "Can I use these hashes for password storage?",
            answer:
              "Plain SHA hashes are not recommended for password storage because they are fast to compute, making brute-force attacks feasible. For passwords, use a dedicated algorithm like bcrypt, scrypt, or Argon2 that includes salting and key stretching.",
          },
          {
            question: "What is SHA-1 used for?",
            answer:
              "SHA-1 was widely used for digital signatures and certificate validation, but it is now deprecated for security purposes due to demonstrated collision attacks. It is still used in some legacy systems and for non-security purposes like Git commit hashes.",
          },
          {
            question: "Is my text stored anywhere?",
            answer:
              "No. All hashing happens locally in your browser using the Web Crypto API. Your text is never sent to any server and is not stored or logged.",
          },
        ]}
        relatedTools={[
          { name: "Base64 Encode/Decode", href: "/base64" },
          { name: "UUID Generator", href: "/uuid-generator" },
          { name: "JWT Decoder", href: "/jwt-decoder" },
          { name: "URL Encode/Decode", href: "/url-encode" },
        ]}
      >
        <HashGeneratorTool />
      </ToolLayout>
    </>
  );
}
