import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { ConvertToMp4Tool } from "./ConvertToMp4Tool";

const toolName = "Convert Video to MP4 — Free Online Converter";
const description =
  "Convert AVI, MOV, MKV, WMV, FLV, and WebM videos to MP4 format online for free. No uploads — all processing happens in your browser for complete privacy.";
const keyword = "convert video to mp4";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/convert-to-mp4";

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

export default function ConvertToMp4Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title={toolName}
        subtitle="Convert your videos to MP4 format. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Upload your video file using the drop zone above",
          'Click "Convert to MP4" to start the conversion',
          "Download your converted MP4 file",
        ]}
        about={`
          <p>
            MP4 is the most widely supported video format, playable on virtually every
            device, browser, and media player. Our free <strong>convert video to mp4</strong>
            tool handles AVI, MOV, MKV, WMV, FLV, and WebM inputs, re-encoding them with
            the H.264 codec for maximum compatibility.
          </p>
          <p>
            The entire conversion runs inside your browser using FFmpeg.wasm — a WebAssembly
            build of the industry-standard FFmpeg toolkit. Your video files never leave your
            device, making it safe to <strong>convert video to mp4</strong> even with
            confidential or personal footage.
          </p>
          <p>
            There are no file-count limits, no watermarks, and no accounts to create. Just
            drop your video and get a ready-to-share MP4 in seconds.
          </p>
        `}
        faqs={[
          {
            question: "Which video formats can I convert?",
            answer:
              "You can convert AVI, MOV, MKV, WMV, FLV, and WebM files to MP4. The tool uses the H.264 video codec, which offers excellent quality and broad device compatibility.",
          },
          {
            question: "Is there a file size limit?",
            answer:
              "There is no hard limit, but because processing happens in your browser, very large files (over 500 MB) may be slow or cause memory issues depending on your device.",
          },
          {
            question: "Are my videos uploaded to a server?",
            answer:
              "No. All conversion happens locally in your browser using WebAssembly. Your video never leaves your device.",
          },
          {
            question: "Will there be quality loss?",
            answer:
              "Re-encoding always involves some generation loss, but the tool uses H.264 with a fast preset that maintains excellent visual quality. The output is suitable for sharing, streaming, and archiving.",
          },
          {
            question: "How long does conversion take?",
            answer:
              "Speed depends on the file size and your device. A typical 100 MB video takes 30-90 seconds on a modern computer.",
          },
        ]}
        relatedTools={[
          { name: "Compress Video", href: "/compress-video" },
          { name: "Video to MP3", href: "/video-to-mp3" },
          { name: "Video to GIF", href: "/video-to-gif" },
          { name: "Video to WebM", href: "/video-to-webm" },
        ]}
      >
        <ConvertToMp4Tool />
      </ToolLayout>
    </>
  );
}
