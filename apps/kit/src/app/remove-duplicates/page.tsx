import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { RemoveDuplicatesTool } from "./RemoveDuplicatesTool";

const toolName = "Remove Duplicate Lines — Free Online Tool";
const description =
  "Remove duplicate lines from text instantly. Options for case sensitivity, whitespace trimming, and sorting. Free online tool — no sign-up required.";
const keyword = "remove duplicate lines";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/remove-duplicates";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste your text with one item per line into the input area",
  "Configure options: case sensitivity, whitespace trimming, and sorting",
  "Click 'Remove Duplicates' to process the text",
  "Review the stats and copy the deduplicated result",
];

const faqs = [
  {
    question: "How does case sensitivity work?",
    answer:
      "When case-sensitive mode is on (default), 'Apple' and 'apple' are treated as different lines. When it is off, they are considered duplicates and only the first occurrence is kept.",
  },
  {
    question: "What does 'Trim whitespace' do?",
    answer:
      "When enabled, leading and trailing spaces and tabs are removed from each line before comparison. This prevents lines like '  hello' and 'hello' from being treated as different.",
  },
  {
    question: "Does sorting preserve the original order?",
    answer:
      "When the sort option is off (default), the unique lines appear in the same order as they first appeared in the input. When sorting is enabled, the output is arranged alphabetically.",
  },
  {
    question: "Can I handle very large lists?",
    answer:
      "Yes. The tool processes text locally in your browser and can handle lists with thousands of lines efficiently. Performance depends on your device's available memory.",
  },
  {
    question: "Are blank lines removed?",
    answer:
      "Blank lines are treated like any other line. If there are multiple blank lines, only the first one is kept. If you want to remove blank lines entirely, you can use the Find & Replace tool to replace empty lines.",
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

export default function RemoveDuplicatesPage() {
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
        subtitle="Paste your list and remove duplicate lines in one click. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            When you need to <strong>remove duplicate lines</strong> from a list, doing it manually is
            tedious and error-prone, especially with hundreds or thousands of entries. This tool
            processes your text line by line, keeps only the first occurrence of each unique line, and
            returns a clean, deduplicated list in seconds.
          </p>
          <p>
            Common use cases include cleaning up email lists, removing repeated entries from CSV data,
            deduplicating log files, and tidying up keyword lists for SEO research. The tool provides
            three configurable options: case-sensitive comparison (so "Apple" and "apple" are treated
            as distinct or identical, your choice), whitespace trimming to ignore leading and trailing
            spaces, and optional alphabetical sorting of the output.
          </p>
          <p>
            After processing, you see clear statistics: the original line count, how many duplicates
            were removed, and the final unique line count. All processing to <strong>remove duplicate
            lines</strong> runs entirely in your browser. Your data is never sent to a server, making
            this tool safe for proprietary lists, customer data, and sensitive information. There are
            no usage limits and no sign-up required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Remove Line Breaks", href: "/remove-line-breaks" },
          { name: "Text Diff", href: "/text-diff" },
          { name: "Word Counter", href: "/word-counter" },
          { name: "Find & Replace", href: "/find-and-replace" },
        ]}
      >
        <RemoveDuplicatesTool />
      </ToolLayout>
    </>
  );
}
