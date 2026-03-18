import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { VideoToGifTool } from "./VideoToGifTool";

const toolName = "Video to GIF — Convert Free Online";
const description =
  "Convert any video clip to an animated GIF. Control start time, duration, size, and frame rate. Free online tool — no uploads, complete privacy.";
const keyword = "video to gif";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/video-to-gif";

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

export default function VideoToGifPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title={toolName}
        subtitle="Create animated GIFs from your video clips. Control timing, size, and frame rate. No sign-up required."
        keyword={keyword}
        howTo={[
          "Upload your video file using the drop zone above",
          "Set the start time and duration for the GIF clip",
          "Adjust the width and frame rate to your liking",
          'Click "Create GIF" to generate the animated image',
          "Download your GIF file",
        ]}
        about={`
          <p>
            Animated GIFs are perfect for sharing short clips on social media, in chat
            messages, and on websites. Our free <strong>video to gif</strong> converter
            lets you extract a portion of any video and turn it into a compact animated GIF.
          </p>
          <p>
            You have full control over the output: choose the start time, set the clip
            duration (up to 30 seconds), adjust the width for the right file size, and dial
            in the frame rate for smooth or lightweight playback. Higher FPS and wider
            frames produce smoother GIFs but larger files.
          </p>
          <p>
            Everything runs in your browser via FFmpeg.wasm — no uploads, no server
            processing, no account required. Your videos remain private at all times.
          </p>
        `}
        faqs={[
          {
            question: "What video formats can I convert to GIF?",
            answer:
              "The tool accepts MP4, AVI, MOV, MKV, WebM, and most other common video formats.",
          },
          {
            question: "Why is my GIF file so large?",
            answer:
              "GIF files can be large because the format uses lossless frame-by-frame encoding. To reduce file size, try lowering the width, FPS, or duration. A 320px wide, 10 FPS, 5-second clip typically produces a manageable file.",
          },
          {
            question: "What is a good FPS for GIFs?",
            answer:
              "10-15 FPS works well for most purposes. Higher FPS (20-30) produces smoother animation but much larger files. Lower FPS (5-10) creates a choppier look but very small files.",
          },
          {
            question: "Is there a maximum duration?",
            answer:
              "The tool supports clips up to 30 seconds. Longer GIFs become extremely large and are better served as short video files instead.",
          },
          {
            question: "Are my files uploaded to a server?",
            answer:
              "No. All processing happens locally in your browser using WebAssembly. Your video never leaves your device.",
          },
        ]}
        relatedTools={[
          { name: "Trim Video", href: "/trim-video" },
          { name: "Compress Video", href: "/compress-video" },
          { name: "Video to MP4", href: "/convert-to-mp4" },
          { name: "Video to WebM", href: "/video-to-webm" },
        ]}
      >
        <VideoToGifTool />
      </ToolLayout>
    </>
  );
}
