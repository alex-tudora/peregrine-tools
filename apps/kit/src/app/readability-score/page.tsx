import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { ReadabilityScoreTool } from "./ReadabilityScoreTool";

const toolName = "Readability Checker — Free Readability Score Tool";
const description =
  "Analyze text readability with Flesch-Kincaid Grade Level and Flesch Reading Ease scores. Visual gauge, sentence stats, and syllable analysis. Free online tool — no sign-up required.";
const keyword = "readability checker";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/readability-score";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste or type your text into the text area above",
  "View real-time readability scores as you type",
  "Check the Flesch Reading Ease score and visual gauge (green = easy, red = difficult)",
  "Review the Flesch-Kincaid Grade Level and other metrics to improve your writing",
];

const faqs = [
  {
    question: "What is a good Flesch Reading Ease score?",
    answer:
      "For general web content and blog posts, aim for 60-70 (Standard to Fairly Easy). Marketing copy and consumer-facing content should target 70-80. Academic or technical writing naturally scores lower at 30-50.",
  },
  {
    question: "What does the Flesch-Kincaid Grade Level mean?",
    answer:
      "It estimates the US school grade level needed to understand your text. A score of 8.0 means an 8th grader could understand it. Most popular online content is written at a 6th to 8th grade level.",
  },
  {
    question: "How are syllables counted?",
    answer:
      "The tool counts groups of consecutive vowels (a, e, i, o, u, y) in each word, with adjustments for common patterns like silent e. This heuristic is accurate for most English words.",
  },
  {
    question: "Does it work with languages other than English?",
    answer:
      "The Flesch-Kincaid formulas were designed for English text. While the tool will process text in other languages, the readability scores may not be meaningful because syllable counting and formula constants are calibrated for English.",
  },
  {
    question: "How can I improve my readability score?",
    answer:
      "Use shorter sentences, choose simpler words with fewer syllables, break long paragraphs into smaller ones, and use active voice instead of passive voice. Aim for an average sentence length of 15-20 words.",
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

export default function ReadabilityScorePage() {
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
        subtitle="Paste your text and see how readable it is with Flesch-Kincaid scoring. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>readability checker</strong> measures how easy your writing is to understand.
            Whether you are crafting blog posts, marketing copy, academic papers, or technical
            documentation, knowing your readability score helps you tailor your language to your
            target audience. Text that scores well on readability is more likely to be read completely,
            shared, and acted upon.
          </p>
          <p>
            This free <strong>readability checker</strong> calculates two industry-standard metrics:
            the Flesch Reading Ease score (0-100, where higher is easier) and the Flesch-Kincaid Grade
            Level (the US school grade needed to understand the text). It also displays average
            sentence length, average syllables per word, and total word, sentence, and syllable counts.
            A color-coded visual gauge gives you an instant snapshot: green for easy reading, yellow
            for moderate, and red for difficult.
          </p>
          <p>
            All analysis happens in real time as you type, directly in your browser. Your text is never
            sent to a server, making this <strong>readability checker</strong> safe for confidential
            documents and draft content. Syllable counting uses a vowel-group heuristic that is
            accurate for the vast majority of English words. There are no usage limits and no account
            required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Word Counter", href: "/word-counter" },
          { name: "Character Counter", href: "/character-counter" },
          { name: "Case Converter", href: "/case-converter" },
          { name: "Lorem Ipsum Generator", href: "/lorem-ipsum-generator" },
        ]}
      >
        <ReadabilityScoreTool />
      </ToolLayout>
    </>
  );
}
