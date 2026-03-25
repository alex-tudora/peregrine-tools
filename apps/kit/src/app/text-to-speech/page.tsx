import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { TextToSpeechTool } from "./TextToSpeechTool";

const toolName = "Text to Speech — Read Text Aloud Free";
const description =
  "Convert any text to spoken audio using your browser's built-in voices. Adjust speed, pitch, and voice selection. Free text-to-speech tool with no sign-up required.";
const keyword = "text to speech";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/text-to-speech";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Type or paste the text you want to hear into the text area",
  "Choose a voice from the dropdown and adjust speed and pitch to your preference",
  "Click the Play button to start listening to your text read aloud",
  "Use Pause, Resume, or Stop to control playback at any time",
];

const faqs = [
  {
    question: "Which voices are available?",
    answer:
      "The available voices depend on your operating system and browser. Most systems include several English voices plus voices for other languages. Chrome typically offers the widest selection, while Safari uses the high-quality voices built into macOS and iOS.",
  },
  {
    question: "Does this tool support languages other than English?",
    answer:
      "Yes. The voice dropdown lists every voice installed on your device, including voices for Spanish, French, German, Japanese, Chinese, and many more. Select a voice that matches the language of your text for the best results.",
  },
  {
    question: "Which browsers support the SpeechSynthesis API?",
    answer:
      "The Web Speech API is supported in all modern browsers including Chrome, Edge, Safari, and Firefox. If your browser does not support it, the tool will display a compatibility message. For the best experience, use an up-to-date version of Chrome or Edge.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All speech synthesis happens locally in your browser using the built-in SpeechSynthesis API. Your text is never transmitted to any external server, making this tool safe for confidential or sensitive content.",
  },
  {
    question: "Can I adjust the speed and pitch of the voice?",
    answer:
      "Yes. Use the Speed slider to set the rate from 0.5x (half speed) to 2x (double speed), and the Pitch slider to adjust the tone from 0.5 (lower) to 2 (higher). The default values of 1.0 for both provide a natural-sounding output.",
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

export default function TextToSpeechPage() {
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
        subtitle="Convert text to speech using your browser's built-in voices. Adjust speed, pitch, and voice. Free and private."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A free <strong>text to speech</strong> tool lets you listen to any written content read
            aloud directly in your browser. Whether you are proofreading an article, studying notes,
            practicing pronunciation in a foreign language, or simply prefer listening over reading,
            this tool converts your words into natural-sounding audio with a single click.
          </p>
          <p>
            Powered by the Web Speech API built into modern browsers, this <strong>text to speech</strong>
            reader offers a selection of voices that varies by operating system and browser. You can
            choose from male and female voices in dozens of languages, then fine-tune the experience
            with speed and pitch controls. Slow the rate down to catch every word in a dense paragraph,
            or speed it up to fly through a long document.
          </p>
          <p>
            Because synthesis happens entirely on your device, your text is never sent to a remote
            server. That makes this <strong>text to speech</strong> tool suitable for confidential
            documents, personal journals, and sensitive business content. There are no usage limits,
            no account requirements, and no ads that interrupt playback. Just paste your text, pick a
            voice, and press Play.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Word Counter", href: "/word-counter" },
          { name: "Character Counter", href: "/character-counter" },
          { name: "Readability Score", href: "/readability-score" },
        ]}
        nextStep={{
          label: "Count your words?",
          description: "Get word count, reading time, and more",
          href: "/word-counter",
        }}
      >
        <TextToSpeechTool />
      </ToolLayout>
    </>
  );
}
