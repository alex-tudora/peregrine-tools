import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { CaseConverterTool } from "./CaseConverterTool";

const toolName = "Case Converter — Change Text Case Online Free";
const description =
  "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, or kebab-case instantly. Free online case converter — no sign-up required.";
const keyword = "case converter";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/case-converter";

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

export default function CaseConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Transform text between UPPERCASE, lowercase, Title Case, and programming cases. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Type or paste your text into the input text area",
          "Click the case conversion button you need (UPPERCASE, lowercase, Title Case, etc.)",
          "View the converted text in the output area below",
          "Click 'Copy to Clipboard' to copy the result",
        ]}
        about={`
          <p>
            A <strong>case converter</strong> saves you time when you need to change the
            capitalization of text without retyping it. Whether you accidentally left caps lock on,
            need to format a headline in Title Case, or want to transform a phrase into a
            programming-friendly format like camelCase or snake_case, this tool handles it in one
            click.
          </p>
          <p>
            Our free <strong>case converter</strong> supports eight transformation modes: UPPERCASE
            for emphasis and headings, lowercase for normalizing text, Title Case for headlines and
            titles, Sentence case for paragraph text, camelCase and PascalCase for variable names
            in JavaScript and other languages, snake_case for Python and database column names, and
            kebab-case for URLs and CSS class names. Each conversion is applied instantly with no
            delay.
          </p>
          <p>
            The tool runs entirely in your browser and never sends your text to a server. This makes
            the <strong>case converter</strong> safe to use with passwords, proprietary code, and
            confidential documents. There are no usage limits, no accounts to create, and it works
            on any device with a modern browser.
          </p>
        `}
        faqs={[
          {
            question: "What is Title Case?",
            answer:
              "Title Case capitalizes the first letter of every word. It is commonly used for headings, article titles, and book titles. For example, 'the quick brown fox' becomes 'The Quick Brown Fox'.",
          },
          {
            question: "What is the difference between camelCase and PascalCase?",
            answer:
              "In camelCase the first word is lowercase and subsequent words start with an uppercase letter (e.g., 'myVariableName'). PascalCase is the same except the first word also starts with an uppercase letter (e.g., 'MyVariableName'). camelCase is common for variables; PascalCase is common for class names.",
          },
          {
            question: "When should I use snake_case or kebab-case?",
            answer:
              "snake_case uses underscores to separate words and is standard in Python and SQL. kebab-case uses hyphens and is common in URLs, CSS class names, and file naming conventions.",
          },
          {
            question: "Does Sentence case handle proper nouns?",
            answer:
              "The tool capitalizes the first letter after sentence-ending punctuation (.!?) and at the start of the text. It does not detect proper nouns automatically, so names and places will be lowercase unless they start a sentence.",
          },
          {
            question: "Is my text stored or shared?",
            answer:
              "No. All processing happens locally in your browser. Your text is never transmitted to any server and is not stored or logged.",
          },
        ]}
        relatedTools={[
          { name: "Word Counter", href: "/word-counter" },
          { name: "Text to Slug", href: "/text-to-slug" },
          { name: "Remove Line Breaks", href: "/remove-line-breaks" },
          { name: "Character Counter", href: "/character-counter" },
        ]}
      >
        <CaseConverterTool />
      </ToolLayout>
    </>
  );
}
