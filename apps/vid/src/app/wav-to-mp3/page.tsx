import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { WavToMp3Tool } from "./WavToMp3Tool";

const toolName = "WAV to MP3 — Convert Free Online";
const description =
  "Convert WAV audio files to MP3 with adjustable bitrate. Choose from 128, 192, 256, or 320 kbps. Free online tool — no uploads, complete privacy.";
const keyword = "wav to mp3";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/wav-to-mp3";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your WAV file using the drop zone above",
  "Select your preferred bitrate (128, 192, 256, or 320 kbps)",
  'Click "Convert to MP3" to start the conversion',
  "Download your MP3 file",
];

const faqs = [
  {
    question: "How much smaller will the MP3 be?",
    answer:
      "WAV files are uncompressed, so MP3 conversion typically reduces size by 80-90%. A 30 MB WAV file becomes roughly 3-5 MB as a 192 kbps MP3.",
  },
  {
    question: "Which bitrate should I choose?",
    answer:
      "320 kbps is the highest quality MP3 bitrate and is virtually indistinguishable from WAV in blind tests. 192 kbps is great for most purposes. 128 kbps is fine for spoken-word content.",
  },
  {
    question: "Will I lose audio quality?",
    answer:
      "MP3 is a lossy format, so some audio data is discarded. At 256 or 320 kbps, the difference from the original WAV is inaudible to most listeners in normal conditions.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. All conversion happens locally in your browser using WebAssembly. Your files never leave your device.",
  },
  {
    question: "Can I convert multiple WAV files at once?",
    answer:
      "Currently the tool processes one file at a time. Upload and convert each WAV file individually for the best results.",
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

export default function WavToMp3Page() {
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
        subtitle="Convert WAV files to compact MP3 format with your choice of bitrate. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            WAV files offer uncompressed, studio-quality audio — but they are enormous. A
            single 3-minute song can easily top 30 MB. Our free <strong>wav to mp3</strong>
            converter shrinks those files by 80-90% while preserving excellent audio quality.
          </p>
          <p>
            Choose from four bitrate options: 128 kbps for speech and podcasts, 192 kbps for
            a good all-round balance, 256 kbps for high-quality music, or 320 kbps for the
            absolute best MP3 quality. All encoding is handled by the LAME MP3 encoder
            running via FFmpeg.wasm.
          </p>
          <p>
            Everything runs in your browser. Your WAV files are never uploaded to any server.
            No watermarks, no daily limits, no account required.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "MP3 to WAV", href: "/mp3-to-wav" },
          { name: "Audio to MP3", href: "/convert-to-mp3" },
          { name: "Compress Audio", href: "/compress-audio" },
          { name: "Extract Audio", href: "/extract-audio" },
        ]}
      >
        <WavToMp3Tool />
      </ToolLayout>
    </>
  );
}
