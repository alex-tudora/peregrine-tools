import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JpgToPngTool } from "./JpgToPngTool";

const toolName = "JPG to PNG — Convert Online Free";
const description =
  "Convert JPG images to lossless PNG format online for free. Batch convert multiple files — all processing happens in your browser for complete privacy.";
const keyword = "jpg to png";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/jpg-to-png";

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

export default function JpgToPngPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title={toolName}
        subtitle="Convert your JPG images to lossless PNG format. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Upload one or more JPG images using the drop zone above",
          'Click "Convert to PNG" to process your images',
          "Download individual files or all as a ZIP archive",
        ]}
        about={`
          <p>
            Our free <strong>jpg to png</strong> converter transforms your JPG images into
            lossless PNG files. This is ideal when you need pixel-perfect quality, transparency
            support, or a format that does not degrade with repeated editing and saving.
          </p>
          <p>
            The entire <strong>jpg to png</strong> conversion happens right in your browser.
            Your images are never uploaded to any server, which means your files remain
            completely private. There is nothing to install and no account to create — just
            drop your JPGs and get your PNGs.
          </p>
          <p>
            PNG is a lossless format, so there is no quality slider — your images are
            converted at full fidelity. You can batch convert multiple JPG files at once
            and download them all in a single ZIP archive.
          </p>
        `}
        faqs={[
          {
            question: "Is this JPG to PNG converter really free?",
            answer:
              "Yes, completely free with no hidden limits. Convert as many images as you like without creating an account or paying anything.",
          },
          {
            question: "Are my files safe?",
            answer:
              "Absolutely. All processing happens locally in your browser. Your images are never uploaded to any server, so your data stays entirely on your device.",
          },
          {
            question: "Why is the PNG file larger than the original JPG?",
            answer:
              "PNG uses lossless compression, which preserves every pixel exactly. JPG uses lossy compression that discards some data to achieve smaller sizes. The trade-off is that PNG files are larger but pixel-perfect.",
          },
          {
            question: "Will my image gain transparency after conversion?",
            answer:
              "No. While PNG supports transparency, converting a JPG (which has no transparency) will not add it. The image will look identical — just stored in a lossless format.",
          },
          {
            question: "Can I convert multiple files at once?",
            answer:
              "Yes! You can drop multiple JPG files at once. After conversion, download them individually or grab all images in a single ZIP archive.",
          },
        ]}
        relatedTools={[
          { name: "PNG to JPG", href: "/png-to-jpg" },
          { name: "JPG to WebP", href: "/jpg-to-webp" },
          { name: "Compress Image", href: "/compress-image" },
          {
            name: "JPG to PDF",
            href: "https://peregrinepdf.com/jpg-to-pdf",
          },
        ]}
      >
        <JpgToPngTool />
      </ToolLayout>
    </>
  );
}
