import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { PasswordGeneratorTool } from "./PasswordGeneratorTool";

const toolName = "Password Generator — Generate Secure Passwords Free";
const description =
  "Generate strong, random passwords instantly. Customize length, character sets, and bulk generate up to 50 passwords. Uses cryptographic randomness — no sign-up required.";
const keyword = "password generator";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/password-generator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Set the desired password length using the slider (8-128 characters)",
  "Choose which character sets to include: uppercase, lowercase, numbers, and symbols",
  "Click 'Generate Password' to create a cryptographically random password",
  "Click 'Copy' to copy the password to your clipboard, or use bulk generate for multiple passwords at once",
];

const faqs = [
  {
    question: "How are these passwords generated?",
    answer:
      "Passwords are generated using crypto.getRandomValues(), the browser's cryptographically secure random number generator (CSPRNG). This is the same source of randomness used in TLS, SSH key generation, and other security-critical applications. No server is involved — everything happens locally in your browser.",
  },
  {
    question: "How long should my password be?",
    answer:
      "For most accounts, 16 characters or more is recommended. A 16-character password using all character sets (uppercase, lowercase, numbers, symbols) has roughly 105 bits of entropy, making it infeasible to brute-force with current technology. For high-security applications, consider 20+ characters.",
  },
  {
    question: "What is password entropy?",
    answer:
      "Entropy measures the unpredictability of a password in bits. It is calculated as length multiplied by log2(pool size), where pool size is the number of possible characters. Higher entropy means more possible combinations. A password with 80+ bits of entropy is generally considered strong against offline attacks.",
  },
  {
    question: "Should I include symbols in my passwords?",
    answer:
      "Yes, when possible. Including symbols increases the character pool from 62 (letters + digits) to 92+, significantly raising entropy per character. However, some systems restrict which characters are allowed. If a service rejects symbols, a longer password using letters and numbers can achieve equivalent security.",
  },
  {
    question: "Are the generated passwords stored anywhere?",
    answer:
      "No. All password generation happens entirely in your browser using JavaScript. No passwords are transmitted to any server, logged, or stored. You can verify this by using the tool offline or inspecting network traffic in your browser's developer tools.",
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

export default function PasswordGeneratorPage() {
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
        subtitle="Generate cryptographically secure random passwords with customizable length, character sets, and bulk generation. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>password generator</strong> creates random, hard-to-guess passwords using
            cryptographically secure randomness. Strong passwords are essential for protecting online
            accounts, API keys, database credentials, and any system where unauthorized access must
            be prevented. This tool uses the browser's native crypto.getRandomValues() API to ensure
            every character is chosen with true randomness.
          </p>
          <p>
            You can customize every aspect of the generated passwords: set the length from 8 to 128
            characters, toggle uppercase letters, lowercase letters, numbers, and symbols on or off,
            and see a real-time strength indicator showing estimated security level. The strength
            meter calculates entropy based on your selected character pool and password length, giving
            you immediate feedback on how resistant your password is to brute-force attacks.
          </p>
          <p>
            Need multiple passwords at once? The bulk generation feature lets you create up to 50
            passwords in a single click, perfect for provisioning accounts, generating API tokens, or
            seeding test environments. All generation happens locally in your browser — no passwords
            are ever sent to a server or stored anywhere, ensuring complete privacy.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Hash Generator", href: "/hash-generator" },
          { name: "UUID Generator", href: "/uuid-generator" },
          { name: "Base64 Encode/Decode", href: "/base64" },
        ]}
        nextStep={{ label: "Generate a hash?", description: "Create MD5, SHA-1, or SHA-256 hashes from any input", href: "/hash-generator" }}
      >
        <PasswordGeneratorTool />
      </ToolLayout>
    </>
  );
}
