import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import CompressImageTool from "./CompressImageTool";

const toolName = "Compress Image — Reduce File Size Online Free";
const description =
  "Compress JPEG, PNG, and WebP images to reduce file size without losing quality. Free online image compressor — no sign-up, no file limits. Process files in your browser.";
const keyword = "compress image";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/compress-image";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your image file using the drop zone above",
  "Adjust the quality slider to set the compression level",
  "Choose your preferred output format (JPEG, PNG, or WebP)",
  'Click "Compress Image" to reduce the file size',
  "Download your compressed image",
];

const faqs = [
  {
    question: "Does compressing an image reduce its quality?",
    answer:
      "Lossy compression (JPEG, WebP) removes some visual data to shrink file size. At quality 0.7 or above, the difference is usually imperceptible. PNG compression is lossless, so the image stays pixel-perfect but the size reduction is smaller.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "There is no hard limit. Because the tool runs entirely in your browser, performance depends on your device's available memory. Most images up to 50 MB compress without any issues.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All processing happens locally in your browser using the Canvas API. Your image never leaves your device, making this tool safe for personal or confidential files.",
  },
  {
    question: "Which output format should I choose?",
    answer:
      "WebP gives the best compression ratios and is supported by all modern browsers. JPEG is ideal for photographs when you need maximum compatibility. PNG is best when you need transparency or lossless quality.",
  },
  {
    question: "How much smaller will my image be?",
    answer:
      "Results vary depending on the original file and the quality setting. Typical reductions range from 30% to 80%. Photos saved at high quality in JPEG or PNG tend to see the biggest improvements when re-encoded as WebP.",
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

export default function CompressImagePage() {
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
        title="Compress Image — Reduce File Size Online Free"
        subtitle="Shrink your image file size while preserving visual quality. Instantly. No sign-up required."
        keyword="compress image"
        howTo={howTo}
        about={`
          <p>
            Oversized images slow down websites, bloat email attachments, and eat
            through storage quotas. Our free online tool lets you
            <strong>compress image</strong> files in seconds, dramatically
            reducing file size while keeping the visual quality you need.
          </p>
          <p>
            The compressor leverages the browser's built-in Canvas API to
            re-encode your image at a lower quality setting. You control the
            trade-off with a simple slider: drag it higher for sharper output or
            lower for maximum file-size savings. You can also pick a different
            output format — WebP typically delivers the smallest files, while
            PNG is ideal when you need lossless transparency.
          </p>
          <p>
            Because the entire process runs inside your browser, your images are
            never uploaded to a server. This makes it safe to
            <strong>compress image</strong> files that contain personal photos,
            proprietary designs, or confidential screenshots. There are no
            file-size limits, no watermarks, and no daily caps — just fast, free
            compression whenever you need it.
          </p>
          <p>
            Pair this tool with our other image utilities — resize, crop, and
            convert — to build a complete image optimization workflow without
            ever leaving your browser.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Resize Image", href: "/resize-image" },
          { name: "PNG to JPG", href: "/png-to-jpg" },
          { name: "JPG to WebP", href: "/jpg-to-webp" },
          {
            name: "Compress PDF",
            href: "https://peregrinepdf.com/compress-pdf",
          },
        ]}
      >
        <CompressImageTool />
      </ToolLayout>
    </>
  );
}
