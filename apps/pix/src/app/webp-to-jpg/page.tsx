import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { WebpToJpgTool } from "./WebpToJpgTool";

const toolName = "WebP to JPG — Convert Online Free";
const description =
  "Convert WebP images to JPG format online for free. Adjust quality, batch convert multiple files — all processing happens in your browser for complete privacy.";
const keyword = "webp to jpg";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/webp-to-jpg";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload one or more WebP images using the drop zone above",
  "Adjust the image quality if needed",
  'Click "Convert to JPG" to process your images',
  "Download individual files or all as a ZIP archive",
];

const faqs = [
  {
    question: "Is this WebP to JPG converter really free?",
    answer:
      "Yes, completely free with no hidden limits. Convert as many images as you like without creating an account or paying anything.",
  },
  {
    question: "Are my files safe?",
    answer:
      "Absolutely. All processing happens locally in your browser. Your images are never uploaded to any server, so your data stays entirely on your device.",
  },
  {
    question: "Why convert WebP to JPG?",
    answer:
      "While WebP is a modern and efficient format, JPG has universal compatibility. Some older applications, email clients, and platforms do not support WebP, so converting to JPG ensures your images work everywhere.",
  },
  {
    question: "What quality should I choose?",
    answer:
      "The default quality of 85% offers a great balance between file size and image clarity. Use a higher value for print-quality images, or lower it to reduce file size for web use.",
  },
  {
    question: "Can I convert multiple files at once?",
    answer:
      "Yes! You can drop multiple WebP files at once. After conversion, download them individually or grab all images in a single ZIP archive.",
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

export default function WebpToJpgPage() {
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
        subtitle="Convert your WebP images to widely compatible JPG format. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Our free <strong>webp to jpg</strong> converter transforms your WebP images into
            universally compatible JPG files. While WebP offers excellent compression, not every
            application or platform supports it — JPG works everywhere.
          </p>
          <p>
            The entire <strong>webp to jpg</strong> conversion happens right in your browser.
            Your images are never uploaded to any server, so your files remain completely
            private. There is nothing to install and no account to create — just drop your
            WebP files and get your JPGs.
          </p>
          <p>
            Use the quality slider to control the balance between file size and image clarity.
            A higher quality setting preserves more detail, while a lower setting produces
            smaller files. You can batch convert multiple WebP files at once and download
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
        <WebpToJpgTool />
      </ToolLayout>
    </>
  );
}
