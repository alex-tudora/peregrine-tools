import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { CharacterCounterTool } from "./CharacterCounterTool";

const toolName = "Character Counter — Count Characters Online Free";
const description =
  "Count characters, characters without spaces, words, and sentences in real time. Set a character limit and track remaining count. Free online tool — no sign-up required.";
const keyword = "character counter";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/character-counter";

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
  "Optionally set a character limit to track how many characters remain",
  "View real-time statistics for characters, characters without spaces, words, and sentences",
  "Use the remaining count to stay within platform limits for social media or form fields",
];

const faqs = [
  {
    question: "What counts as a character?",
    answer:
      "Every keystroke counts as a character, including letters, numbers, punctuation marks, spaces, and special symbols. The 'No Spaces' count excludes all whitespace characters.",
  },
  {
    question: "Does it count emoji characters correctly?",
    answer:
      "The tool counts characters using JavaScript's string length property. Most single emoji count as 2 characters (due to UTF-16 encoding), which matches how many platforms measure character limits.",
  },
  {
    question: "What is the character limit for Twitter/X?",
    answer:
      "Twitter/X allows 280 characters per post. You can set 280 as your character limit in this tool to ensure your posts fit perfectly.",
  },
  {
    question: "Is there a difference between characters and bytes?",
    answer:
      "Yes. A character is a single symbol, while a byte is a unit of data. ASCII characters use 1 byte each, but characters from other scripts or emoji can use 2 to 4 bytes depending on the encoding.",
  },
  {
    question: "Can I use this tool offline?",
    answer:
      "Once the page has loaded, the character counting works without an internet connection because all processing happens locally in your browser.",
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

export default function CharacterCounterPage() {
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
        subtitle="Count characters, words, and sentences with an optional character limit. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A precise <strong>character counter</strong> is indispensable when you need to stay within
            strict length limits. Social media platforms like Twitter/X cap posts at 280 characters,
            meta descriptions perform best under 160 characters, and SMS messages split after 160
            characters. Our tool lets you monitor your character usage in real time so you can craft
            your message with confidence.
          </p>
          <p>
            Beyond simple counting, this <strong>character counter</strong> also displays characters
            without spaces, total words, and sentence count. You can set an optional character limit
            and the tool will show how many characters remain or how many you have exceeded. This is
            particularly useful when filling out online forms, writing advertising copy, or composing
            headlines where every character matters.
          </p>
          <p>
            All processing happens locally in your browser. Your text is never transmitted to a server,
            making this <strong>character counter</strong> safe for passwords, proprietary content, and
            any text you prefer to keep private. There are no usage limits, no accounts to create, and
            no software to install.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Word Counter", href: "/word-counter" },
          { name: "Case Converter", href: "/case-converter" },
          { name: "Text to Slug", href: "/text-to-slug" },
          { name: "Remove Duplicates", href: "/remove-duplicates" },
        ]}
        nextStep={{ label: "Count words too?", description: "Get detailed word and sentence stats", href: "/word-counter" }}
      >
        <CharacterCounterTool />
      </ToolLayout>
    </>
  );
}
