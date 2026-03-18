import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { VideoToMp3Tool } from "./VideoToMp3Tool";

const toolName = "Video to MP3 — Extract Audio Free Online";
const description =
  "Extract audio from any video file and save it as MP3. Free online tool — no uploads, no sign-up. All processing happens in your browser.";
const keyword = "video to mp3";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/video-to-mp3";

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

export default function VideoToMp3Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title={toolName}
        subtitle="Extract audio from any video and save it as an MP3 file. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Upload your video file using the drop zone above",
          'Click "Extract MP3" to pull the audio track',
          "Download your MP3 file",
        ]}
        about={`
          <p>
            Need just the audio from a video? Our free <strong>video to mp3</strong>
            converter extracts the audio track from any video file and encodes it as a
            high-quality MP3. Perfect for saving music from videos, creating podcasts from
            recordings, or archiving speech content.
          </p>
          <p>
            The tool uses FFmpeg.wasm running entirely in your browser. Your video is never
            uploaded to any server, so your content stays private. Works with MP4, AVI, MOV,
            MKV, WebM, and more.
          </p>
          <p>
            The output is encoded at high quality (VBR ~190 kbps) by default, giving you
            clean audio that is also space-efficient. No watermarks, no limits, no account
            needed.
          </p>
        `}
        faqs={[
          {
            question: "Which video formats are supported?",
            answer:
              "The tool accepts virtually any common video format including MP4, AVI, MOV, MKV, WMV, FLV, and WebM.",
          },
          {
            question: "What quality is the MP3 output?",
            answer:
              "The audio is encoded using LAME MP3 at VBR quality level 2, which typically produces files around 190 kbps — excellent quality for music and speech.",
          },
          {
            question: "Is the video uploaded to a server?",
            answer:
              "No. All processing happens locally in your browser using WebAssembly. Your video file never leaves your device.",
          },
          {
            question: "Can I extract audio from a YouTube video?",
            answer:
              "This tool works with video files stored on your device. You would need to first download the video file, then use this tool to extract the audio.",
          },
          {
            question: "How long does extraction take?",
            answer:
              "Audio extraction is typically faster than video conversion since only the audio stream is processed. A 100 MB video usually takes 10-30 seconds.",
          },
        ]}
        relatedTools={[
          { name: "Extract Audio", href: "/extract-audio" },
          { name: "Video to MP4", href: "/convert-to-mp4" },
          { name: "Compress Audio", href: "/compress-audio" },
          { name: "WAV to MP3", href: "/wav-to-mp3" },
        ]}
      >
        <VideoToMp3Tool />
      </ToolLayout>
    </>
  );
}
