import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { FindAndReplaceTool } from "./FindAndReplaceTool";

const toolName = "Find & Replace Text — Free Online Tool";
const description =
  "Find and replace text instantly with support for case sensitivity and regular expressions. Free online find and replace tool — no sign-up required.";
const keyword = "find and replace text";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/find-and-replace";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste your text into the input area",
  "Enter the text you want to find and the replacement text",
  "Toggle case sensitivity or regex mode as needed",
  "Click 'Replace All' and copy the result",
];

const faqs = [
  {
    question: "What are regular expressions?",
    answer:
      "Regular expressions (regex) are patterns that describe sets of strings. They allow you to match complex text patterns like email addresses, phone numbers, or any repeating structure. When regex mode is enabled, the 'Find' field is interpreted as a regular expression pattern.",
  },
  {
    question: "How do I replace with nothing (delete matches)?",
    answer:
      "Leave the 'Replace with' field empty. Every occurrence of the search term will be removed from the text.",
  },
  {
    question: "Does it support special regex groups?",
    answer:
      "Yes. When regex mode is enabled, you can use standard JavaScript regular expression syntax including capture groups, character classes, quantifiers, and lookaheads.",
  },
  {
    question: "What if my regex is invalid?",
    answer:
      "The tool will display an error message explaining the problem with your regular expression. Fix the pattern and try again.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All find and replace processing happens entirely in your browser. Your text is never transmitted, stored, or logged anywhere.",
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

export default function FindAndReplacePage() {
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
        subtitle="Search for specific text and replace it throughout your document. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            The ability to <strong>find and replace text</strong> in bulk is one of the most useful
            text editing operations. Whether you need to update a product name across an entire
            document, swap out old URLs for new ones, or correct a repeated typo, this tool lets you
            make every substitution at once instead of editing each instance by hand.
          </p>
          <p>
            Our free <strong>find and replace text</strong> tool supports both plain text search and
            regular expressions. Plain text mode is perfect for simple substitutions, while regex mode
            unlocks powerful pattern matching for advanced users. You can also toggle case sensitivity
            to control whether uppercase and lowercase letters are treated as identical during the
            search.
          </p>
          <p>
            After each operation, the tool reports exactly how many replacements were made, so you can
            verify the result before copying. All processing happens locally in your browser, meaning
            your text is never transmitted to a server. This makes it safe to <strong>find and replace
            text</strong> in confidential documents, source code, and private data. There are no usage
            limits and no account required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Text Diff", href: "/text-diff" },
          { name: "Remove Duplicates", href: "/remove-duplicates" },
          { name: "Case Converter", href: "/case-converter" },
          { name: "Word Counter", href: "/word-counter" },
        ]}
        nextStep={{ label: "Compare the diff?", description: "See what changed side by side", href: "/text-diff" }}
      >
        <FindAndReplaceTool />
      </ToolLayout>
    </>
  );
}
