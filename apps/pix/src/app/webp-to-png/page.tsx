import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { WebpToPngTool } from "./WebpToPngTool";

const toolName = "WebP to PNG — Convert Online Free";
const description =
  "Convert WebP images to lossless PNG format online for free. Batch convert multiple files — all processing happens in your browser for complete privacy.";
const keyword = "webp to png";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/webp-to-png";

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

export default function WebpToPngPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title={toolName}
        subtitle="Convert your WebP images to lossless PNG format. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Upload one or more WebP images using the drop zone above",
          'Click "Convert to PNG" to process your images',
          "Download individual files or all as a ZIP archive",
        ]}
        about={`
          <p>
            Our free <strong>webp to png</strong> converter transforms your WebP images into
            lossless PNG files. PNG is a universally supported format that preserves every pixel
            exactly, making it ideal for graphics, screenshots, and images that require
            transparency.
          </p>
          <p>
            The entire <strong>webp to png</strong> conversion happens right in your browser.
            Your images are never uploaded to any server, so your files remain completely
            private. There is nothing to install and no account to create — just drop your
            WebP files and get your PNGs.
          </p>
          <p>
            PNG is a lossless format, so there is no quality slider — your images are
            converted at full fidelity with transparency preserved. You can batch convert
            multiple WebP files at once and download them all in a single ZIP archive.
          </p>
        `}
        faqs={[
          {
            question: "Is this WebP to PNG converter really free?",
            answer:
              "Yes, completely free with no hidden limits. Convert as many images as you like without creating an account or paying anything.",
          },
          {
            question: "Are my files safe?",
            answer:
              "Absolutely. All processing happens locally in your browser. Your images are never uploaded to any server, so your data stays entirely on your device.",
          },
          {
            question: "Will transparency be preserved?",
            answer:
              "Yes! Both WebP and PNG support transparency. If your WebP image has transparent areas, they will be preserved in the converted PNG file.",
          },
          {
            question: "Why is the PNG file larger than the original WebP?",
            answer:
              "WebP typically achieves better compression than PNG. The converted PNG preserves full image quality using lossless compression, which often results in larger file sizes.",
          },
          {
            question: "Can I convert multiple files at once?",
            answer:
              "Yes! You can drop multiple WebP files at once. After conversion, download them individually or grab all images in a single ZIP archive.",
          },
        ]}
        relatedTools={[
          { name: "WebP to JPG", href: "/webp-to-jpg" },
          { name: "PNG to WebP", href: "/png-to-webp" },
          { name: "Compress Image", href: "/compress-image" },
          { name: "JPG to PNG", href: "/jpg-to-png" },
        ]}
      >
        <WebpToPngTool />
      </ToolLayout>
    </>
  );
}
