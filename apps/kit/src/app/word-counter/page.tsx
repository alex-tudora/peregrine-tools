import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { WordCounterTool } from "./WordCounterTool";

const toolName = "Word Counter — Count Words Online Free";
const description =
  "Count words, characters, sentences, and paragraphs instantly. Free online word counter with reading time and speaking time estimates. No sign-up required.";
const keyword = "word counter";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/word-counter";

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
    question: "Does it count words in other languages?",
    answer:
      "Yes. The word counter works with any language that uses spaces to separate words, including English, Spanish, French, German, and many others. For languages without spaces such as Chinese or Japanese, character count is a more useful metric.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is estimated at approximately 200 words per minute, which is the average silent reading speed for adults. Speaking time uses roughly 130 words per minute, a comfortable pace for public speaking.",
  },
  {
    question: "Is my text stored anywhere?",
    answer:
      "No. All processing happens locally in your browser. Your text is never sent to any server and is not stored or logged in any way.",
  },
  {
    question: "Can I use this for social media character limits?",
    answer:
      "Absolutely. The character count (with and without spaces) helps you stay within limits for platforms like Twitter/X (280 characters), LinkedIn posts (3,000 characters), and Instagram captions (2,200 characters).",
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
            bloggers, and professionals who need to track the length of their content. Whether you are
            drafting a college essay with a strict word limit, composing a blog post optimized for
            search engines, or preparing a speech and need to estimate how long it will take to deliver,
            this tool gives you the numbers you need at a glance.
          </p>
          <p>
            Our free <strong>word counter</strong> runs entirely in your browser and analyzes your text
            in real time as you type. It counts words, characters (with and without spaces), sentences,
            and paragraphs. It also calculates the average word length, estimated reading time at
            roughly 200 words per minute, and speaking time at about 130 words per minute. These
            metrics help you gauge the complexity and delivery time of your writing without switching
            between multiple tools.
          </p>
          <p>
            Because all processing happens locally in your browser, your text is never sent to a
            server. This makes the <strong>word counter</strong> safe for confidential documents,
            academic work, and sensitive business communications. There are no ads that interrupt your
            workflow, no sign-up walls, and no daily usage limits.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Character Counter", href: "/character-counter" },
          { name: "Readability Score", href: "/readability-score" },
          { name: "Case Converter", href: "/case-converter" },
          { name: "Remove Line Breaks", href: "/remove-line-breaks" },
        ]}
      >
        <WordCounterTool />
      </ToolLayout>
    </>
  );
}
