import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { CompressAudioTool } from "./CompressAudioTool";

const toolName = "Compress Audio — Reduce File Size Free Online";
const description =
  "Compress audio files to reduce file size. Choose your target bitrate for the perfect balance of quality and size. Free online tool — no uploads required.";
const keyword = "compress audio";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/compress-audio";

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

export default function CompressAudioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title={toolName}
        subtitle="Shrink your audio file size while preserving sound quality. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Upload your audio file using the drop zone above",
          "Choose your target bitrate",
          'Click "Compress Audio" to reduce the file size',
          "Compare the before and after sizes, then download",
        ]}
        about={`
          <p>
            Large audio files eat through email attachment limits and storage quotas. Our
            free <strong>compress audio</strong> tool re-encodes your audio at a lower
            bitrate, dramatically reducing file size while keeping the sound quality you
            need.
          </p>
          <p>
            Choose from four bitrate levels: 64 kbps for voice-only content, 128 kbps for
            a good balance, 192 kbps for high-quality music, or 256 kbps when you want the
            best possible compressed quality. The tool outputs MP3 for maximum compatibility.
          </p>
          <p>
            Everything runs in your browser via FFmpeg.wasm. Your audio files are never
            uploaded to any server. No watermarks, no daily limits, no account required.
          </p>
        `}
        faqs={[
          {
            question: "Which bitrate should I choose?",
            answer:
              "64 kbps works for voice recordings and podcasts. 128 kbps is good for general use. 192 kbps is great for music. 256 kbps gives near-transparent quality where most listeners cannot hear the compression.",
          },
          {
            question: "How much smaller will my audio be?",
            answer:
              "Results depend on the original file. A 320 kbps MP3 compressed to 128 kbps will be roughly 60% smaller. WAV and FLAC files will see 80-95% reduction.",
          },
          {
            question: "Which audio formats are supported?",
            answer:
              "The tool accepts MP3, WAV, OGG, FLAC, AAC, M4A, and WMA files. The output is always MP3 for maximum compatibility.",
          },
          {
            question: "Are my files uploaded to a server?",
            answer:
              "No. All compression happens locally in your browser using WebAssembly. Your files never leave your device.",
          },
          {
            question: "Will compressing an MP3 reduce quality?",
            answer:
              "Re-encoding an already compressed MP3 at a lower bitrate will reduce quality. For the best results, start from the highest quality source (WAV or FLAC) when possible.",
          },
        ]}
        relatedTools={[
          { name: "Compress Video", href: "/compress-video" },
          { name: "WAV to MP3", href: "/wav-to-mp3" },
          { name: "Audio to MP3", href: "/convert-to-mp3" },
          { name: "Extract Audio", href: "/extract-audio" },
        ]}
      >
        <CompressAudioTool />
      </ToolLayout>
    </>
  );
}
