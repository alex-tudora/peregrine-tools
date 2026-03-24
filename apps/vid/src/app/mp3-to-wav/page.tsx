import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { Mp3ToWavTool } from "./Mp3ToWavTool";

const toolName = "MP3 to WAV — Convert Free Online";
const description =
  "Convert MP3 audio files to lossless WAV format online for free. Perfect for editing and professional audio workflows. No uploads — all processing in your browser.";
const keyword = "mp3 to wav";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/mp3-to-wav";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your MP3 file using the drop zone above",
  'Click "Convert to WAV" to start the conversion',
  "Download your WAV file",
];

const faqs = [
  {
    question: "Will converting MP3 to WAV improve audio quality?",
    answer:
      "No. MP3 to WAV conversion decodes the compressed audio to an uncompressed format, but it cannot restore data that was discarded during MP3 encoding. The WAV file will sound identical to the MP3 — just in an uncompressed container.",
  },
  {
    question: "Why would I want to convert MP3 to WAV?",
    answer:
      "WAV files are required by many audio editors and DAWs. Converting to WAV also prevents further quality loss if you need to edit and re-export the audio.",
  },
  {
    question: "Why is the WAV file so much larger?",
    answer:
      "WAV is uncompressed. A 5 MB MP3 file may become 30-50 MB as WAV. This is normal — you are trading space for universal compatibility and edit-friendliness.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. All conversion happens locally in your browser using WebAssembly. Your files never leave your device.",
  },
  {
    question: "What sample rate will the WAV file have?",
    answer:
      "The output WAV file matches the sample rate of the input MP3 — typically 44.1 kHz for music. No resampling is applied.",
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

export default function Mp3ToWavPage() {
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
        subtitle="Convert MP3 files to lossless WAV format for editing and professional use. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            WAV is the standard uncompressed audio format used in music production, video
            editing, and professional audio work. Our free <strong>mp3 to wav</strong>
            converter decodes your MP3 file and saves it as a PCM WAV file, ready for any
            audio editor or DAW.
          </p>
          <p>
            While converting from MP3 to WAV will not restore audio data that was lost during
            MP3 encoding, it does give you an uncompressed file that is compatible with
            virtually all professional audio software and avoids any further quality
            degradation from repeated lossy compression.
          </p>
          <p>
            All processing runs in your browser via FFmpeg.wasm. Your files are never
            uploaded anywhere. No watermarks, no limits, no account needed.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "WAV to MP3", href: "/wav-to-mp3" },
          { name: "Audio to MP3", href: "/convert-to-mp3" },
          { name: "Extract Audio", href: "/extract-audio" },
          { name: "Compress Audio", href: "/compress-audio" },
        ]}
        nextStep={{ label: "Trim the audio?", description: "Cut to the exact segment you need", href: "/trim-video" }}
      >
        <Mp3ToWavTool />
      </ToolLayout>
    </>
  );
}
