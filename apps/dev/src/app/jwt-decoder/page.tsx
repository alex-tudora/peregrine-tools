import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JwtDecoderTool } from "./JwtDecoderTool";

const toolName = "JWT Decoder — Decode JSON Web Tokens Online";
const description =
  "Decode JWT tokens instantly. View header, payload, and signature with syntax highlighting. Check expiration status. Free online JWT decoder, no sign-up required.";
const keyword = "jwt decoder";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/jwt-decoder";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste your JWT token into the text area",
  "View the decoded header and payload as formatted JSON",
  "Check the expiration status if the token contains an exp claim",
  "Click copy buttons to copy individual sections",
];

const faqs = [
  {
    question: "Does this tool verify the JWT signature?",
    answer:
      "No. Signature verification requires the signing secret (for HMAC) or the public key (for RSA/EC). This tool only decodes and displays the header and payload. Never rely on decoded data without server-side verification.",
  },
  {
    question: "Is it safe to paste my JWT here?",
    answer:
      "Yes. All decoding happens locally in your browser using JavaScript. Your token is never sent to any server. However, avoid sharing tokens in general as they may grant access to resources.",
  },
  {
    question: "What claims are shown?",
    answer:
      "The tool displays all claims present in the payload, including standard claims like iss (issuer), sub (subject), aud (audience), exp (expiration), iat (issued at), and nbf (not before), as well as any custom claims.",
  },
  {
    question: "Why does my token show as expired?",
    answer:
      "The exp claim is a Unix timestamp representing when the token expires. If the current time is past that timestamp, the tool marks it as expired. Short-lived tokens (e.g., 15 minutes) are common in OAuth flows.",
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

export default function JwtDecoderPage() {
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
        subtitle="Paste a JWT token to decode the header, payload, and signature instantly. Check token expiration in real time."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>JSON Web Token (JWT)</strong> is a compact, URL-safe format used to represent claims
            between two parties. JWTs are widely used for authentication, session management, and
            information exchange in modern web applications. Each token consists of three Base64URL-encoded
            parts separated by dots: header, payload, and signature.
          </p>
          <p>
            This <strong>JWT decoder</strong> splits the token and decodes the header and payload sections,
            displaying the JSON contents with proper formatting. It color-codes the three sections so you
            can easily identify which part is which. If the payload contains an <code>exp</code> (expiration)
            claim, the tool shows whether the token has expired.
          </p>
          <p>
            Note: this tool only <em>decodes</em> the token. It does not verify the signature, which would
            require the signing secret or public key. For security-sensitive verification, use your backend
            JWT library. All decoding happens locally in your browser and no token data is transmitted.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Base64 Encode/Decode", href: "/base64" },
          { name: "Hash Generator", href: "/hash-generator" },
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "URL Encode/Decode", href: "/url-encode" },
        ]}
        nextStep={{ label: "Base64 decode payload?", description: "Decode the JWT payload separately", href: "/base64" }}
      >
        <JwtDecoderTool />
      </ToolLayout>
    </>
  );
}
