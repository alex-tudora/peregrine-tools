import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { DiffCheckerTool } from "./DiffCheckerTool";

const toolName = "Diff Checker — Compare Text Online Free";
const description =
  "Compare two texts side by side and see differences highlighted line by line. Additions in green, removals in red. Free online diff checker with inline and side-by-side views.";
const keyword = "diff checker";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/diff-checker";

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

export default function DiffCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Paste two texts and compare them line by line. See additions, removals, and modifications highlighted instantly."
        keyword={keyword}
        howTo={[
          "Paste your original text into the left textarea",
          "Paste the modified text into the right textarea",
          "Click the Compare button to see the differences",
          "Toggle between inline and side-by-side views for your preferred layout",
        ]}
        about={`
          <p>
            A <strong>diff checker</strong> highlights the differences between two pieces of text, making
            it easy to see what was added, removed, or changed. This is essential for code reviews,
            comparing configuration files, checking document revisions, and verifying database migrations.
          </p>
          <p>
            The tool performs a line-by-line comparison and color-codes the results: green for additions,
            red for removals, and yellow for modified lines. Line numbers are included for easy reference.
            You can switch between an inline unified view and a side-by-side split view depending on your
            preference.
          </p>
          <p>
            Statistics show the total number of added, removed, and unchanged lines, giving you a quick
            summary of how much changed between the two versions. All comparison happens in your browser
            with no data sent to any server.
          </p>
        `}
        faqs={[
          {
            question: "What algorithm does the diff use?",
            answer:
              "The tool uses a line-by-line comparison with a longest common subsequence (LCS) approach, similar to the classic Unix diff algorithm. It identifies the minimal set of changes between the two texts.",
          },
          {
            question: "Can I compare code files?",
            answer:
              "Yes. The tool works with any plain text including source code, configuration files, JSON, XML, SQL queries, and prose. Simply paste the contents of each file.",
          },
          {
            question: "What do the colors mean?",
            answer:
              "Green highlights indicate lines that were added in the modified text. Red highlights indicate lines that were removed from the original. Yellow indicates lines that exist in both but with changes.",
          },
          {
            question: "Is there a size limit?",
            answer:
              "There is no hard limit, but very large texts (over 100,000 lines) may cause the browser to slow down since the diff is computed in-browser. For typical use cases the tool handles texts of any reasonable size instantly.",
          },
        ]}
        relatedTools={[
          { name: "Text Diff", href: "https://peregrinekit.com/text-diff" },
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "SQL Formatter", href: "/sql-formatter" },
          { name: "Regex Tester", href: "/regex-tester" },
        ]}
      >
        <DiffCheckerTool />
      </ToolLayout>
    </>
  );
}
