import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { AddWatermarkTool } from "./AddWatermarkTool";

const toolName = "Add Watermark to Image — Watermark Photos Online Free";
const description =
  "Add text watermarks to images with full control over font size, opacity, color, and position. Free online tool — no sign-up, no file limits. Process files in your browser.";
const keyword = "add watermark to image";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/add-watermark";

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

export default function AddWatermarkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title="Add Watermark to Image — Watermark Photos Online Free"
        subtitle="Stamp text watermarks onto your photos and images. Instantly. No sign-up required."
        keyword="add watermark to image"
        howTo={[
          "Upload your image file using the drop zone above or click to browse",
          "Enter your watermark text and customize the appearance — font size, opacity, color, and position",
          'Click "Add Watermark" to apply the watermark to your image',
          "Download your watermarked image",
        ]}
        about={`
          <p>
            Watermarking images is essential for photographers, designers, and
            content creators who want to protect their work or mark drafts
            before sharing. Our free online tool lets you
            <strong> add watermark to image</strong> files in seconds with full
            control over the text, size, transparency, color, and placement.
          </p>
          <p>
            Choose a subtle diagonal watermark for portfolio previews, a bold
            centered stamp for draft reviews, or a discreet bottom-right label
            for copyright notices. The opacity slider lets you dial in exactly
            how visible the watermark should be — from barely noticeable to
            impossible to miss.
          </p>
          <p>
            Because the entire process runs inside your browser using the
            Canvas API, your images are never uploaded to a server. This makes
            it safe to <strong>add watermark to image</strong> files that
            contain personal photos, client proofs, or proprietary designs.
            There are no file-size limits, no watermarks added by the tool
            itself, and no daily caps.
          </p>
        `}
        faqs={[
          {
            question: "Can I customize the watermark appearance?",
            answer:
              "Yes. You can change the watermark text, font size (16-72px), opacity (10-100%), color (gray, red, blue, or black), and position (diagonal, center, or bottom-right).",
          },
          {
            question: "Will the watermark be permanent?",
            answer:
              "Yes, the watermark is rendered directly onto the image pixels. We recommend keeping a copy of your original file before adding a watermark.",
          },
          {
            question: "Are my images uploaded to a server?",
            answer:
              "No. All processing happens locally in your browser using the Canvas API. Your image never leaves your device, making this tool safe for personal or confidential files.",
          },
          {
            question: "Which image formats are supported?",
            answer:
              "The tool accepts JPEG, PNG, and WebP images. The output is saved as a PNG to preserve quality and any transparency in the original image.",
          },
          {
            question: "Can I watermark multiple images at once?",
            answer:
              "This tool processes one image at a time for precise control over watermark settings. After downloading, click \"Change file\" to watermark another image with the same or different settings.",
          },
        ]}
        relatedTools={[
          { name: "Compress Image", href: "/compress-image" },
          { name: "Resize Image", href: "/resize-image" },
          { name: "Flip & Rotate", href: "/flip-rotate" },
          {
            name: "Watermark PDF",
            href: "https://peregrinepdf.com/watermark-pdf",
          },
        ]}
      >
        <AddWatermarkTool />
      </ToolLayout>
    </>
  );
}
