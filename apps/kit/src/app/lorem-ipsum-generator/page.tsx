import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { LoremIpsumGeneratorTool } from "./LoremIpsumGeneratorTool";

const toolName = "Lorem Ipsum Generator — Free Placeholder Text";
const description =
  "Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Customizable count with optional classic opening. Free online tool — no sign-up required.";
const keyword = "lorem ipsum generator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/lorem-ipsum-generator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Choose the number of paragraphs, sentences, or words you need",
  "Select the output type from the dropdown",
  "Toggle the 'Start with Lorem ipsum...' checkbox if you want the classic opening",
  "Click 'Generate Lorem Ipsum' and copy the result",
];

const faqs = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is placeholder text derived from 'De Finibus Bonorum et Malorum' by Cicero, written in 45 BC. It has been used as standard dummy text in the printing and typesetting industry since the 1500s.",
  },
  {
    question: "Why use Lorem Ipsum instead of real text?",
    answer:
      "Using placeholder text allows designers and stakeholders to focus on layout, typography, and visual design without being distracted by the meaning of the content. It simulates the look and feel of real text while making it clear that the content is not final.",
  },
  {
    question: "Can I generate a specific number of words?",
    answer:
      "Yes. Select 'Words' from the type dropdown and enter the number of words you need (up to 500). The tool will generate exactly that many words of lorem ipsum text.",
  },
  {
    question: "Is the generated text truly random?",
    answer:
      "The words are drawn from the traditional Lorem Ipsum vocabulary but arranged in random combinations for each generation. If you enable 'Start with Lorem ipsum...', the first sentence uses the classic opening.",
  },
  {
    question: "Can I use the generated text commercially?",
    answer:
      "Yes. Lorem Ipsum text is in the public domain and can be used freely in any project, commercial or personal, without attribution.",
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

export default function LoremIpsumGeneratorPage() {
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
        subtitle="Generate placeholder text for designs, mockups, and prototypes. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>lorem ipsum generator</strong> produces dummy text that designers, developers,
            and content creators use as placeholder copy while building layouts and prototypes. The
            text, derived from a passage by Cicero written in 45 BC, has been the publishing
            industry's standard filler since the 1500s. Its near-random Latin structure distributes
            letters and word lengths in a way that mimics natural language, making it ideal for
            testing typography and layout without distracting readers with meaningful content.
          </p>
          <p>
            This free <strong>lorem ipsum generator</strong> lets you choose between paragraphs,
            sentences, or individual words, and set the exact count you need. You can optionally start
            with the classic "Lorem ipsum dolor sit amet..." opening that designers expect, or
            generate fully randomized Latin-style text. The output is ready to paste into Figma,
            Sketch, HTML templates, WordPress pages, or any design tool.
          </p>
          <p>
            All generation happens in your browser with no server requests. There are no usage limits,
            no watermarks on the output, and no accounts to create. Whether you need a single
            paragraph for a card component or twenty paragraphs for a long-form article mockup, this
            <strong> lorem ipsum generator</strong> delivers the text instantly.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Word Counter", href: "/word-counter" },
          { name: "Character Counter", href: "/character-counter" },
          { name: "Markdown to HTML", href: "/markdown-to-html" },
          { name: "Text Diff", href: "/text-diff" },
        ]}
      >
        <LoremIpsumGeneratorTool />
      </ToolLayout>
    </>
  );
}
