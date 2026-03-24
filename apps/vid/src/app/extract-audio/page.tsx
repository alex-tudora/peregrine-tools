import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { ExtractAudioTool } from "./ExtractAudioTool";

const toolName = "Extract Audio from Video — Free Online";
const description =
  "Extract audio from any video file and save as MP3, WAV, or AAC. Free online tool — no uploads, no sign-up. All processing happens in your browser.";
const keyword = "extract audio from video";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/extract-audio";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your video file using the drop zone above",
  "Choose your preferred output format — MP3, WAV, or AAC",
  'Click "Extract Audio" to pull the audio track',
  "Download your audio file",
];

const faqs = [
  {
    question: "Which output format should I choose?",
    answer:
      "MP3 is the safest choice for maximum compatibility — it plays everywhere. WAV is best for audio editing since it is lossless. AAC offers better quality than MP3 at the same file size and is used by Apple devices.",
  },
  {
    question: "Which video formats are supported?",
    answer:
      "The tool accepts MP4, AVI, MOV, MKV, WMV, FLV, WebM, and most other common video formats.",
  },
  {
    question: "Will the audio quality be the same as the original?",
    answer:
      "If you choose WAV, the audio is decoded to a lossless format. MP3 and AAC introduce some compression, but at the default settings the quality is excellent — easily good enough for music and speech.",
  },
  {
    question: "Are my videos uploaded to a server?",
    answer:
      "No. All extraction happens locally in your browser using WebAssembly. Your video never leaves your device.",
  },
  {
    question: "How long does extraction take?",
    answer:
      "Audio extraction is faster than video conversion since only the audio stream is processed. A 100 MB video typically takes 10-30 seconds depending on your device.",
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

export default function ExtractAudioPage() {
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
        subtitle="Pull the audio track from any video and save it in your preferred format. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Sometimes you only need the audio from a video — a song from a music video,
            dialogue from a recording, or a voiceover from a presentation. Our free
            <strong>extract audio from video</strong> tool separates the audio track and
            saves it in your choice of format.
          </p>
          <p>
            Choose from three output formats: MP3 for maximum compatibility and small file
            sizes, WAV for lossless quality ideal for editing, or AAC for excellent quality
            with efficient compression. The tool handles MP4, AVI, MOV, MKV, WebM, and
            virtually any other video format.
          </p>
          <p>
            Everything runs locally in your browser via FFmpeg.wasm. Your video is never
            uploaded to any server. No watermarks, no limits, no account required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Video to MP3", href: "/video-to-mp3" },
          { name: "Compress Audio", href: "/compress-audio" },
          { name: "WAV to MP3", href: "/wav-to-mp3" },
          { name: "Audio to MP3", href: "/convert-to-mp3" },
        ]}
        nextStep={{ label: "Compress the audio?", description: "Reduce file size of the extracted track", href: "/compress-audio" }}
      >
        <ExtractAudioTool />
      </ToolLayout>
    </>
  );
}
