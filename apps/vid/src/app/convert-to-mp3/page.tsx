import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { ConvertToMp3Tool } from "./ConvertToMp3Tool";

const toolName = "Audio to MP3 — Convert Free Online";
const description =
  "Convert WAV, OGG, FLAC, AAC, M4A, and WMA audio files to MP3 format online for free. Choose your quality level. No uploads — all processing in your browser.";
const keyword = "convert to mp3";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/convert-to-mp3";

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

export default function ConvertToMp3Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title={toolName}
        subtitle="Convert your audio files to MP3 format with adjustable quality. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Upload your audio file using the drop zone above",
          "Choose your preferred quality level",
          'Click "Convert to MP3" to start the conversion',
          "Download your MP3 file",
        ]}
        about={`
          <p>
            MP3 is the most universally supported audio format. Our free <strong>convert to mp3</strong>
            tool transforms WAV, OGG, FLAC, AAC, M4A, and WMA files into high-quality MP3s
            that play everywhere — phones, computers, car stereos, and web browsers.
          </p>
          <p>
            Choose from four quality levels to balance file size and audio fidelity. Higher
            bitrates (256-320 kbps) are ideal for music, while lower bitrates (128 kbps)
            work well for speech and podcasts.
          </p>
          <p>
            Everything runs in your browser via FFmpeg.wasm. Your audio files are never
            uploaded to any server, keeping your content completely private. No watermarks,
            no daily limits, no account required.
          </p>
        `}
        faqs={[
          {
            question: "Which audio formats can I convert?",
            answer:
              "You can convert WAV, OGG, FLAC, AAC, M4A, and WMA files to MP3. These cover the vast majority of audio formats in use today.",
          },
          {
            question: "What quality level should I choose?",
            answer:
              "For music, 256 or 320 kbps gives near-CD quality. For podcasts and speech, 128 kbps is plenty. 192 kbps is a good all-around choice that balances quality and file size.",
          },
          {
            question: "Will converting FLAC to MP3 lose quality?",
            answer:
              "Yes. FLAC is lossless and MP3 is lossy, so some audio data is discarded. However, at 256 kbps or higher, most people cannot hear the difference in normal listening conditions.",
          },
          {
            question: "Are my audio files uploaded to a server?",
            answer:
              "No. All conversion happens locally in your browser using WebAssembly. Your files never leave your device.",
          },
          {
            question: "Is there a file size limit?",
            answer:
              "There is no hard limit. Processing happens in your browser, so performance depends on your device. Audio files are typically small enough to convert without issues.",
          },
        ]}
        relatedTools={[
          { name: "WAV to MP3", href: "/wav-to-mp3" },
          { name: "MP3 to WAV", href: "/mp3-to-wav" },
          { name: "Compress Audio", href: "/compress-audio" },
          { name: "Video to MP3", href: "/video-to-mp3" },
        ]}
      >
        <ConvertToMp3Tool />
      </ToolLayout>
    </>
  );
}
