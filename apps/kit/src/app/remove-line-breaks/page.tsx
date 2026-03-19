import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { RemoveLineBreaksTool } from "./RemoveLineBreaksTool";

const toolName = "Remove Line Breaks — Free Online Tool";
const description =
  "Remove line breaks from text and replace them with spaces, nothing, or commas. Free online tool to clean up copied text — no sign-up required.";
const keyword = "remove line breaks";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/remove-line-breaks";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste your text with unwanted line breaks into the input area",
  "Choose what to replace line breaks with: a space, nothing, or a comma",
  "Click 'Remove Line Breaks' to process the text",
  "Copy the cleaned-up result from the output area",
];

const faqs = [
  {
    question: "Why does copied text have unwanted line breaks?",
    answer:
      "PDFs, emails, and some web pages insert hard line breaks at the end of each visual line. When you copy this text, those breaks come along, splitting sentences mid-word or mid-phrase.",
  },
  {
    question: "What is the difference between the three replacement options?",
    answer:
      "Space joins words naturally (e.g., 'hello world'). Nothing concatenates without gaps (e.g., 'helloworld'). Comma creates a comma-separated list (e.g., 'hello, world').",
  },
  {
    question: "Does it handle Windows and Mac line endings?",
    answer:
      "Yes. The tool recognizes Windows-style (CRLF), Unix-style (LF), and legacy Mac-style (CR) line endings and removes all of them consistently.",
  },
  {
    question: "Will it remove paragraph breaks too?",
    answer:
      "Yes, all consecutive line breaks are replaced with a single instance of your chosen replacement. If you want to preserve paragraph breaks, consider using Find & Replace with a regex to target single line breaks only.",
  },
  {
    question: "Is my text private?",
    answer:
      "Completely. All processing happens locally in your browser. Your text is never sent to any server.",
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

export default function RemoveLineBreaksPage() {
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
        subtitle="Strip unwanted line breaks from copied text and join lines together. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Copying text from PDFs, emails, or web pages often introduces unwanted line breaks that
            split sentences and paragraphs in awkward places. This <strong>remove line breaks</strong>
            tool strips those breaks and joins your text into continuous paragraphs, saving you from
            tedious manual editing.
          </p>
          <p>
            You can choose how line breaks are replaced: with a space (the most common choice, which
            joins words naturally), with nothing (which concatenates words directly, useful for code or
            data), or with a comma (which turns each line into a comma-separated list). The tool
            handles all types of line endings including Windows (CRLF), Unix (LF), and legacy Mac (CR)
            formats.
          </p>
          <p>
            Whether you are cleaning up text copied from a PDF reader, preparing data for a
            spreadsheet, or formatting content for a CMS, this <strong>remove line breaks</strong>
            utility gets the job done in one click. All processing happens in your browser with no
            server involvement. Your text stays private, there are no usage limits, and no account is
            required. Simply paste, click, and copy the clean result.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Remove Duplicates", href: "/remove-duplicates" },
          { name: "Word Counter", href: "/word-counter" },
          { name: "Find & Replace", href: "/find-and-replace" },
          { name: "Text to Slug", href: "/text-to-slug" },
        ]}
      >
        <RemoveLineBreaksTool />
      </ToolLayout>
    </>
  );
}
