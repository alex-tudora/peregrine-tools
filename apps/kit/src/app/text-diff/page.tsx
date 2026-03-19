import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { TextDiffTool } from "./TextDiffTool";

const toolName = "Text Diff — Compare Text Online Free";
const description =
  "Compare two texts and highlight the differences line by line. See additions in green and removals in red. Free online text diff tool — no sign-up required.";
const keyword = "text diff";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/text-diff";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste the original text in the left text area",
  "Paste the modified text in the right text area",
  "Click 'Compare' to generate the diff",
  "Review the highlighted differences: green for additions, red for removals",
];

const faqs = [
  {
    question: "How does the comparison work?",
    answer:
      "The tool splits both texts into lines and uses the Longest Common Subsequence (LCS) algorithm to find the optimal alignment. Lines that differ are marked as additions (green) or removals (red), while matching lines are shown without highlighting.",
  },
  {
    question: "Does it detect changes within a single line?",
    answer:
      "The comparison is line-based. If any part of a line changes, the entire line is marked as removed from the original and added in the modified version. This makes it easy to spot which lines were edited.",
  },
  {
    question: "Can I compare large texts?",
    answer:
      "Yes. The tool handles large texts well, though very long documents (tens of thousands of lines) may take a moment to process since everything runs in your browser.",
  },
  {
    question: "Is whitespace considered in the comparison?",
    answer:
      "Yes, the comparison is exact. Differences in whitespace, including trailing spaces and indentation, will be flagged as changes. This is important for code comparisons where whitespace matters.",
  },
  {
    question: "Are my texts stored anywhere?",
    answer:
      "No. All processing happens locally in your browser. Your texts are never sent to any server and are not stored or logged in any way.",
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

export default function TextDiffPage() {
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
        subtitle="Compare two pieces of text and see exactly what changed. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>text diff</strong> tool lets you compare two pieces of text and immediately see
            what has changed between them. Whether you are reviewing edits to an article, verifying
            changes in a configuration file, or comparing two versions of a legal document, this tool
            highlights every addition and removal so nothing slips through unnoticed.
          </p>
          <p>
            This free <strong>text diff</strong> tool uses a line-by-line comparison powered by the
            Longest Common Subsequence (LCS) algorithm. Lines present only in the modified text are
            shown in green as additions, while lines present only in the original are shown in red as
            removals. Unchanged lines are displayed in their normal color for context. The result is a
            clear, easy-to-read summary of every difference between the two texts.
          </p>
          <p>
            All comparison happens in your browser. Neither text is transmitted to a server, making
            this <strong>text diff</strong> tool safe for sensitive content like contracts, source code,
            and private communications. There are no file size limits, no account requirements, and no
            watermarks on the output.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Find & Replace", href: "/find-and-replace" },
          { name: "Word Counter", href: "/word-counter" },
          { name: "Remove Duplicates", href: "/remove-duplicates" },
          { name: "Character Counter", href: "/character-counter" },
        ]}
      >
        <TextDiffTool />
      </ToolLayout>
    </>
  );
}
