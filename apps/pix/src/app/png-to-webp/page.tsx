import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { PngToWebpTool } from "./PngToWebpTool";

const toolName = "PNG to WebP — Convert Online Free";
const description =
  "Convert PNG images to modern WebP format online for free. Dramatically smaller files with great quality — all processing happens in your browser for complete privacy.";
const keyword = "png to webp";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/png-to-webp";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload one or more PNG images using the drop zone above",
  "Adjust the image quality if needed",
  'Click "Convert to WebP" to process your images',
  "Download individual files or all as a ZIP archive",
];

const faqs = [
  {
    question: "Is this PNG to WebP converter really free?",
    answer:
      "Yes, completely free with no hidden limits. Convert as many images as you like without creating an account or paying anything.",
  },
  {
    question: "Are my files safe?",
    answer:
      "Absolutely. All processing happens locally in your browser. Your images are never uploaded to any server, so your data stays entirely on your device.",
  },
  {
    question: "Does WebP support transparency like PNG?",
    answer:
      "Yes! WebP supports both lossy and lossless compression with an alpha channel for transparency. Your transparent PNGs will retain their transparency when converted to WebP.",
  },
  {
    question: "How much smaller will the WebP files be?",
    answer:
      "WebP files are typically 25-35% smaller than equivalent PNGs. The exact savings depend on the image content and quality setting. Photos and complex graphics tend to see the biggest reductions.",
  },
  {
    question: "Can I convert multiple files at once?",
    answer:
      "Yes! You can drop multiple PNG files at once. After conversion, download them individually or grab all images in a single ZIP archive.",
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

export default function PngToWebpPage() {
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
        subtitle="Convert your PNG images to modern, compact WebP format. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Our free <strong>png to webp</strong> converter transforms your PNG images into
            modern WebP files. WebP delivers dramatically smaller file sizes than PNG while
            still supporting transparency, making it the ideal replacement for web graphics.
          </p>
          <p>
            The entire <strong>png to webp</strong> conversion happens right in your browser.
            Your images are never uploaded to any server, so your files remain completely
            private. There is nothing to install and no account to create — just drop your
            PNGs and get your WebPs.
          </p>
          <p>
            Use the quality slider to control the balance between file size and image clarity.
            WebP typically produces files that are 25-35% smaller than equivalent PNGs,
            sometimes even more. You can batch convert multiple files at once and download
            them all in a single ZIP archive.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "WebP to PNG", href: "/webp-to-png" },
          { name: "JPG to WebP", href: "/jpg-to-webp" },
          { name: "Compress Image", href: "/compress-image" },
          { name: "PNG to JPG", href: "/png-to-jpg" },
        ]}
      >
        <PngToWebpTool />
      </ToolLayout>
    </>
  );
}
