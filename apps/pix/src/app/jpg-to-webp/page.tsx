import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JpgToWebpTool } from "./JpgToWebpTool";

const toolName = "JPG to WebP — Convert Online Free";
const description =
  "Convert JPG images to modern WebP format online for free. Smaller files with great quality — all processing happens in your browser for complete privacy.";
const keyword = "jpg to webp";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/jpg-to-webp";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload one or more JPG images using the drop zone above",
  "Adjust the image quality if needed",
  'Click "Convert to WebP" to process your images',
  "Download individual files or all as a ZIP archive",
];

const faqs = [
  {
    question: "Is this JPG to WebP converter really free?",
    answer:
      "Yes, completely free with no hidden limits. Convert as many images as you like without creating an account or paying anything.",
  },
  {
    question: "Are my files safe?",
    answer:
      "Absolutely. All processing happens locally in your browser. Your images are never uploaded to any server, so your data stays entirely on your device.",
  },
  {
    question: "Why convert to WebP?",
    answer:
      "WebP is a modern image format developed by Google that provides superior compression. At the same visual quality, WebP files are typically 25-35% smaller than JPGs, which means faster page loads and less bandwidth usage.",
  },
  {
    question: "Is WebP supported everywhere?",
    answer:
      "WebP is supported by all modern browsers including Chrome, Firefox, Safari, and Edge. Some older applications may not support it — in that case, JPG or PNG are safer choices.",
  },
  {
    question: "Can I convert multiple files at once?",
    answer:
      "Yes! You can drop multiple JPG files at once. After conversion, download them individually or grab all images in a single ZIP archive.",
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

export default function JpgToWebpPage() {
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
        subtitle="Convert your JPG images to modern, compact WebP format. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Our free <strong>jpg to webp</strong> converter transforms your JPG images into
            modern WebP files. WebP delivers significantly smaller file sizes than JPG at
            comparable visual quality, making it the preferred format for fast-loading websites.
          </p>
          <p>
            The entire <strong>jpg to webp</strong> conversion happens right in your browser.
            Your images are never uploaded to any server, so your files remain completely
            private. There is nothing to install and no account to create — just drop your
            JPGs and get your WebPs.
          </p>
          <p>
            Use the quality slider to control the balance between file size and image clarity.
            Even at moderate quality settings, WebP typically produces files 25-35% smaller
            than equivalent JPGs. You can batch convert multiple files at once and download
            them all in a single ZIP archive.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "WebP to JPG", href: "/webp-to-jpg" },
          { name: "PNG to WebP", href: "/png-to-webp" },
          { name: "Compress Image", href: "/compress-image" },
          { name: "JPG to PNG", href: "/jpg-to-png" },
        ]}
      >
        <JpgToWebpTool />
      </ToolLayout>
    </>
  );
}
