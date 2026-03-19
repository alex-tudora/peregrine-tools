import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { CompressVideoTool } from "./CompressVideoTool";

const toolName = "Compress Video — Reduce File Size Free Online";
const description =
  "Compress video files to reduce file size without losing quality. Choose from low, medium, or high compression. Free online tool — no uploads required.";
const keyword = "compress video";
const siteName = "Peregrine Vid";
const siteUrl = "https://peregrinevid.com";
const path = "/compress-video";

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
  "Select a compression level — low, medium, or high",
  'Click "Compress Video" to reduce the file size',
  "Compare the before and after sizes, then download",
];

const faqs = [
  {
    question: "What does the compression level mean?",
    answer:
      "The compression level controls the CRF (Constant Rate Factor) used by the H.264 encoder. Low compression (CRF 18) keeps nearly all visual detail. Medium (CRF 28) is a good balance — visually great with significant size savings. High (CRF 35) aggressively reduces size but may show some quality loss.",
  },
  {
    question: "How much smaller will my video be?",
    answer:
      "Results vary depending on the original file. Uncompressed or lightly compressed videos may see 50-90% reduction. Already compressed MP4 files may see 20-50% reduction at medium settings.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "There is no hard limit. Processing happens in your browser, so performance depends on your device's memory and processing power. Most videos under 500 MB work well.",
  },
  {
    question: "Are my videos uploaded to a server?",
    answer:
      "No. All compression happens locally in your browser using WebAssembly. Your video never leaves your device.",
  },
  {
    question: "Which compression level should I choose?",
    answer:
      "For sharing on social media or messaging, medium works great. For archival or professional use, choose low. For email attachments or very large files, high gives maximum reduction.",
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

export default function CompressVideoPage() {
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
        subtitle="Shrink your video file size while preserving visual quality. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Large video files are difficult to share via email, upload to social media, or
            store on limited devices. Our free <strong>compress video</strong> tool uses
            H.264 encoding with adjustable CRF (Constant Rate Factor) values to dramatically
            reduce file size while keeping excellent visual quality.
          </p>
          <p>
            Choose from three compression levels: low compression (CRF 18) for near-lossless
            quality, medium compression (CRF 28) for a great balance of size and quality, or
            high compression (CRF 35) for maximum size reduction. You will see the before and
            after file sizes immediately.
          </p>
          <p>
            All processing runs in your browser via FFmpeg.wasm. Your video is never uploaded
            to any server, making it safe for confidential or personal footage. No watermarks,
            no limits, no account needed.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Compress Audio", href: "/compress-audio" },
          { name: "Video to MP4", href: "/convert-to-mp4" },
          { name: "Trim Video", href: "/trim-video" },
          {
            name: "Compress PDF",
            href: "https://peregrinepdf.com/compress-pdf",
          },
        ]}
      >
        <CompressVideoTool />
      </ToolLayout>
    </>
  );
}
