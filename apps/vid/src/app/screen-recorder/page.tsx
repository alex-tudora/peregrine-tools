import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { ScreenRecorderTool } from "./ScreenRecorderTool";

const toolName = "Online Screen Recorder — Free, No Install";
const description =
  "Record your screen directly from your browser. No downloads, no extensions, no sign-up. Optionally include audio. Download as WebM.";
const keyword = "online screen recorder";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/screen-recorder";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Choose whether to include audio in your recording",
  'Click "Start Recording" and select the screen, window, or tab to record',
  "A 3-second countdown will appear before recording begins",
  'Click "Stop Recording" when you are done',
  "Preview your recording and download as WebM",
];

const faqs = [
  {
    question: "Which browsers support screen recording?",
    answer:
      "Chrome, Edge, and Firefox all support screen recording via getDisplayMedia. Safari has limited support. For the best experience, use Chrome or Edge.",
  },
  {
    question: "Can I record system audio?",
    answer:
      "Yes, check the 'Include audio' option. When prompted by the browser, make sure to select 'Share audio' or 'Share system audio'. Note that audio capture support varies by browser and operating system.",
  },
  {
    question: "Is there a recording time limit?",
    answer:
      "There is no built-in time limit. However, very long recordings (over 30 minutes) may produce large files and use significant memory. For long recordings, consider using a desktop application.",
  },
  {
    question: "Can I record just one window or tab?",
    answer:
      "Yes. When the browser's screen sharing dialog appears, you can choose to share your entire screen, a specific application window, or a single browser tab.",
  },
  {
    question: "Is my recording uploaded to a server?",
    answer:
      "No. Everything happens locally in your browser. The recording is never sent anywhere — it stays on your device until you explicitly share or upload it yourself.",
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

export default function ScreenRecorderPage() {
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
        subtitle="Record your screen directly from your browser. No downloads, no extensions. Just click and record."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Need to record your screen for a tutorial, bug report, or presentation? Our free
            <strong>online screen recorder</strong> lets you capture your entire screen, a
            specific window, or a browser tab — all without installing anything.
          </p>
          <p>
            The tool uses the browser's built-in MediaRecorder API and getDisplayMedia to
            capture screen content in real time. You can optionally include system audio or
            microphone input. A 3-second countdown gives you time to prepare before recording
            starts.
          </p>
          <p>
            The recording is saved as a WebM file, which can be played in all modern browsers
            and imported into most video editors. If you need MP4, use our
            <a href="/convert-to-mp4" class="text-[color:var(--color-accent)] hover:underline">Video to MP4</a>
            tool to convert the recording after downloading.
          </p>
          <p>
            Nothing is uploaded to any server. The recording stays entirely on your device
            until you choose to share it.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Video to MP4", href: "/convert-to-mp4" },
          { name: "Compress Video", href: "/compress-video" },
          { name: "Video to GIF", href: "/video-to-gif" },
          { name: "Trim Video", href: "/trim-video" },
        ]}
      >
        <ScreenRecorderTool />
      </ToolLayout>
    </>
  );
}
