import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { VideoToWebmTool } from "./VideoToWebmTool";

const toolName = "Convert to WebM — Free Online Video Converter";
const description =
  "Convert video files to WebM format for web-optimized playback. Adjustable quality settings. Free online tool — no uploads, complete privacy.";
const keyword = "convert to webm";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/video-to-webm";

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

export default function VideoToWebmPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title={toolName}
        subtitle="Convert your videos to WebM format for optimized web playback. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Upload your video file using the drop zone above",
          "Choose your preferred quality level",
          'Click "Convert to WebM" to start the conversion',
          "Download your WebM file",
        ]}
        about={`
          <p>
            WebM is an open, royalty-free media format designed specifically for the web.
            It delivers excellent compression and is natively supported by all modern
            browsers, making it ideal for website videos, HTML5 video tags, and web
            applications.
          </p>
          <p>
            Our free <strong>convert to webm</strong> tool re-encodes your video using the
            VP9 video codec with Opus audio — the same codecs used by YouTube and other
            major platforms. Choose from three quality levels to balance file size and visual
            fidelity.
          </p>
          <p>
            All processing runs in your browser via FFmpeg.wasm. Your video is never uploaded
            to any server. No watermarks, no limits, no account required.
          </p>
        `}
        faqs={[
          {
            question: "Why choose WebM over MP4?",
            answer:
              "WebM is open-source and royalty-free. It often delivers better compression than H.264 MP4 at the same quality level, resulting in smaller files. It is the preferred format for web video on modern browsers.",
          },
          {
            question: "Which browsers support WebM?",
            answer:
              "All modern browsers support WebM: Chrome, Firefox, Edge, Opera, and Safari (version 14.1+). For maximum legacy compatibility, MP4 is still the safer choice.",
          },
          {
            question: "Which quality level should I choose?",
            answer:
              "High quality is best for presentations and detailed content. Medium gives a great balance of size and quality for most web videos. Low quality is useful for very large files where size matters most.",
          },
          {
            question: "Are my videos uploaded to a server?",
            answer:
              "No. All conversion happens locally in your browser using WebAssembly. Your video never leaves your device.",
          },
          {
            question: "Why does conversion take longer than MP4?",
            answer:
              "VP9 encoding (used in WebM) is more computationally intensive than H.264 (used in MP4). The tradeoff is better compression — the output file is typically smaller at the same visual quality.",
          },
        ]}
        relatedTools={[
          { name: "Video to MP4", href: "/convert-to-mp4" },
          { name: "Compress Video", href: "/compress-video" },
          { name: "Video to GIF", href: "/video-to-gif" },
          { name: "Trim Video", href: "/trim-video" },
        ]}
      >
        <VideoToWebmTool />
      </ToolLayout>
    </>
  );
}
