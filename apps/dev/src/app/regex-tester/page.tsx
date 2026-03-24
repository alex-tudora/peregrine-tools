import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { RegexTesterTool } from "./RegexTesterTool";

const toolName = "Regex Tester — Test Regular Expressions Online Free";
const description =
  "Test regular expressions in real time with match highlighting, capture groups, and a common patterns reference. Free online regex tester — no sign-up required.";
const keyword = "regex tester";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/regex-tester";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Enter your regular expression pattern in the pattern input field",
  "Select the flags you need (global, case-insensitive, multiline, dotAll)",
  "Type or paste your test string in the text area below",
  "View highlighted matches, match count, and capture group details in real time",
];

const faqs = [
  {
    question: "Which regex flavor does this use?",
    answer:
      "The tool uses JavaScript's built-in RegExp engine. This is the same engine used in all modern browsers and Node.js. Syntax features specific to other flavors (like PCRE lookbehinds in older browsers) may not be available.",
  },
  {
    question: "What do the flag checkboxes do?",
    answer:
      "g (global) finds all matches instead of stopping at the first. i (case-insensitive) ignores letter case. m (multiline) makes ^ and $ match the start and end of each line. s (dotAll) makes the dot (.) match newline characters too.",
  },
  {
    question: "How are capture groups displayed?",
    answer:
      "Each match is listed with its full match text and any named or numbered capture groups. This makes it easy to verify that your groups are extracting the right portions of the text.",
  },
  {
    question: "Can I use the common patterns directly?",
    answer:
      "Yes. Click any pattern in the reference sidebar to load it into the pattern input field. You can then modify it to suit your specific needs.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All testing happens locally in your browser. Your patterns and test strings are never sent to any server and are not stored or logged.",
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

export default function RegexTesterPage() {
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
        subtitle="Write a regex pattern, paste your test string, and see matches highlighted in real time. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>regex tester</strong> lets you write and debug regular expressions
            interactively. Instead of running your code, waiting for output, and guessing what went
            wrong, you can see exactly which parts of your test string are matched and inspect each
            capture group as you refine your pattern.
          </p>
          <p>
            This free <strong>regex tester</strong> uses JavaScript's native RegExp engine, so the
            behavior matches exactly what you would get in a browser or Node.js environment. You
            can toggle flags including global (g), case-insensitive (i), multiline (m), and dotAll
            (s). Each match is highlighted in the test string, and a detailed list shows every match
            along with its capture groups and positions. A reference sidebar provides ready-to-use
            patterns for common tasks like validating emails, URLs, phone numbers, IP addresses,
            and dates.
          </p>
          <p>
            All processing happens locally in your browser. Your patterns and test data are never
            sent to a server, making this <strong>regex tester</strong> safe for testing against
            sensitive content. There are no usage limits and no account required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          {
            name: "Find & Replace",
            href: "https://peregrinekit.com/find-and-replace",
          },
          { name: "Diff Checker", href: "/diff-checker" },
          { name: "JSON Validator", href: "/json-validator" },
          { name: "Base64 Encode/Decode", href: "/base64" },
        ]}
        nextStep={{ label: "Test with a diff?", description: "Compare regex match results side by side", href: "/diff-checker" }}
      >
        <RegexTesterTool />
      </ToolLayout>
    </>
  );
}
