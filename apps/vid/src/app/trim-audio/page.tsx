import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { TrimAudioTool } from "./TrimAudioTool";

const toolName = "Trim Audio — Cut Audio Files Online Free";
const description =
  "Trim and cut audio files online for free. Set start and end times to extract the exact segment you need. Supports MP3, WAV, OGG, FLAC, AAC, and M4A. No uploads — all processing happens in your browser.";
const keyword = "trim audio";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/trim-audio";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your audio file using the drop zone above",
  "Preview the audio and enter the start time and end time in HH:MM:SS format",
  "Choose your preferred output format (MP3 or WAV)",
  'Click "Trim Audio" to extract the segment',
];

const faqs = [
  {
    question: "What audio formats are supported?",
    answer:
      "You can upload MP3, WAV, OGG, FLAC, AAC, and M4A files. The tool can output in MP3 or WAV format. When the input and output formats match, stream copy is used for instant, lossless trimming.",
  },
  {
    question: "What time format should I use?",
    answer:
      "Enter times in HH:MM:SS format. For example, 00:00:30 for 30 seconds, 00:01:00 for 1 minute, or 01:30:00 for 1 hour 30 minutes. You can also use seconds with decimals like 00:00:05.5.",
  },
  {
    question: "Is the audio quality preserved?",
    answer:
      "When the output format matches the input, the tool uses stream copy mode, which means the audio data is not re-encoded. The output has identical quality to the original. If you convert formats during trimming, high-quality encoding settings are used.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "There is no hard limit. Because processing happens in your browser, very large files may be slow depending on your device. Most audio files under 200 MB trim without issues.",
  },
  {
    question: "Are my audio files uploaded to a server?",
    answer:
      "No. All trimming happens locally in your browser using WebAssembly. Your audio never leaves your device.",
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

export default function TrimAudioPage() {
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
        subtitle="Cut your audio to the exact segment you need. Set start and end times, pick your output format. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Need to extract a specific portion of an audio file? Our free <strong>trim audio</strong>
            tool lets you set precise start and end times to cut out exactly the segment you want.
            Upload MP3, WAV, OGG, FLAC, AAC, or M4A files and download the trimmed result instantly.
          </p>
          <p>
            When the input and output formats match, the tool uses stream copy mode (-c copy) for
            instant, lossless trimming with no re-encoding. If you switch formats, high-quality
            encoding ensures excellent audio fidelity.
          </p>
          <p>
            All processing runs in your browser via FFmpeg.wasm. Your audio is never uploaded
            to any server, keeping your content completely private. No watermarks, no file
            limits, no account needed.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Compress Audio", href: "/compress-audio" },
          { name: "Extract Audio", href: "/extract-audio" },
          { name: "WAV to MP3", href: "/wav-to-mp3" },
          { name: "Video to MP3", href: "/video-to-mp3" },
        ]}
        nextStep={{ label: "Compress the audio?", description: "Reduce file size of the trimmed audio", href: "/compress-audio" }}
      >
        <TrimAudioTool />
      </ToolLayout>
    </>
  );
}
