import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { WordCounterTool } from "./WordCounterTool";

/*
 * Consolidation PoC — identical to apps/kit/src/app/word-counter/page.tsx EXCEPT:
 *   siteName:  "Peregrine Kit"            -> "Peregrine Tools"
 *   siteUrl:   "https://peregrinekit.com" -> "https://peregrine-tools.com"
 *   path:      "/word-counter"            -> "/text/word-counter"
 * The tool component and all content are unchanged. That's the whole migration
 * cost per tool: three strings in the wrapper.
 */
const toolName = "Word Counter — Count Words Online Free";
const description =
  "Count words, characters, sentences, and paragraphs instantly. Free online word counter with reading time and speaking time estimates. No sign-up required.";
const keyword = "word counter";
const siteName = "Peregrine Tools";
const siteUrl = "https://peregrine-tools.com";
const path = "/text/word-counter";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Type or paste your text into the text area above",
  "View real-time statistics including word count, character count, and sentence count",
  "Check the reading time and speaking time estimates for your content",
  "Use the stats to meet word-count requirements for essays, articles, or social media posts",
];

const faqs = [
  {
    question: "How accurate is the word count?",
    answer:
      "The tool splits text on whitespace boundaries, which matches how most word processors count words. Hyphenated compounds like 'well-known' count as one word, consistent with standard conventions.",
  },
  {
    question: "Is my text stored anywhere?",
    answer:
      "No. All processing happens locally in your browser. Your text is never sent to any server and is not stored or logged in any way.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is estimated at approximately 200 words per minute, the average silent reading speed for adults. Speaking time uses roughly 130 words per minute.",
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

export default function WordCounterPage() {
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
        subtitle="Count words, characters, sentences, and paragraphs in real time. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A reliable <strong>word counter</strong> is an essential companion for writers, students,
            bloggers, and professionals who need to track the length of their content. This tool gives
            you the numbers you need at a glance — words, characters, sentences, paragraphs, reading
            time, and readability — updated live as you type.
          </p>
          <p>
            Because all processing happens locally in your browser, your text is never sent to a
            server. That makes it safe for confidential documents, academic work, and sensitive
            business communications.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Case Converter", href: "/text/case-converter" },
          { name: "Markdown to HTML", href: "/text/markdown-to-html" },
          { name: "JSON Formatter", href: "/dev/json-formatter" },
        ]}
        nextStep={{
          label: "Format some JSON?",
          description: "Pretty-print and validate JSON in your browser",
          href: "/dev/json-formatter",
        }}
      >
        <WordCounterTool />
      </ToolLayout>
    </>
  );
}
