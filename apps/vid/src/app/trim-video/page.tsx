import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { TrimVideoTool } from "./TrimVideoTool";

const toolName = "Trim Video Online — Cut Video Free";
const description =
  "Trim and cut video files online for free. Set start and end times to extract the exact clip you need. No uploads — all processing happens in your browser.";
const keyword = "trim video online";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/trim-video";

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
  "Enter the start time and end time in HH:MM:SS format",
  'Click "Trim Video" to extract the clip',
  "Download your trimmed video",
];

const faqs = [
  {
    question: "What time format should I use?",
    answer:
      "Enter times in HH:MM:SS format. For example, 00:00:30 for 30 seconds, 00:01:00 for 1 minute, or 01:30:00 for 1 hour 30 minutes. You can also use seconds with decimals like 00:00:05.5.",
  },
  {
    question: "Is the quality preserved?",
    answer:
      "Yes. The tool uses stream copy mode, which means the video and audio data is not re-encoded. The output has identical quality to the original — only the start and end points change.",
  },
  {
    question: "Why might the trim point be slightly off?",
    answer:
      "Stream copy can only cut at keyframes. If your start time falls between keyframes, the actual cut point may be a fraction of a second earlier. For frame-perfect cuts, the video would need re-encoding.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "There is no hard limit. Because processing happens in your browser, very large files may be slow depending on your device. Most videos under 500 MB trim without issues.",
  },
  {
    question: "Are my videos uploaded to a server?",
    answer:
      "No. All trimming happens locally in your browser using WebAssembly. Your video never leaves your device.",
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

export default function TrimVideoPage() {
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
        subtitle="Cut your video to the exact clip you need. Set start and end times. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Need to extract a specific portion of a video? Our free <strong>trim video online</strong>
            tool lets you set precise start and end times to cut out exactly the clip you want.
            The output preserves the original video and audio quality using stream copy mode.
          </p>
          <p>
            Enter times in HH:MM:SS format (e.g., 00:01:30 for 1 minute 30 seconds) and the
            tool will extract that segment. Because it uses stream copy (-c copy), the process
            is extremely fast — no re-encoding is needed.
          </p>
          <p>
            All processing runs in your browser via FFmpeg.wasm. Your video is never uploaded
            to any server, keeping your content completely private. No watermarks, no file
            limits, no account needed.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Compress Video", href: "/compress-video" },
          { name: "Video to GIF", href: "/video-to-gif" },
          { name: "Video to MP4", href: "/convert-to-mp4" },
          { name: "Extract Audio", href: "/extract-audio" },
        ]}
      >
        <TrimVideoTool />
      </ToolLayout>
    </>
  );
}
