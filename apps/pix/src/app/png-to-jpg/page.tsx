import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { PngToJpgTool } from "./PngToJpgTool";

const toolName = "PNG to JPG — Convert Online Free";
const description =
  "Convert PNG images to JPG format online for free. Adjust quality, batch convert multiple files — all processing happens in your browser for complete privacy.";
const keyword = "png to jpg";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/png-to-jpg";

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
  'Click "Convert to JPG" to process your images',
  "Download individual files or all as a ZIP archive",
];

const faqs = [
  {
    question: "Is this PNG to JPG converter really free?",
    answer:
      "Yes, completely free with no hidden limits. Convert as many images as you like without creating an account or paying anything.",
  },
  {
    question: "Are my files safe?",
    answer:
      "Absolutely. All processing happens locally in your browser. Your images are never uploaded to any server, so your data stays entirely on your device.",
  },
  {
    question: "What quality should I choose?",
    answer:
      "The default quality of 85% offers a great balance between file size and image clarity. Use a higher value for print-quality images, or lower it to reduce file size for web use.",
  },
  {
    question: "Will I lose transparency when converting to JPG?",
    answer:
      "Yes, JPG does not support transparency. Transparent areas in your PNG will be replaced with a white background. If you need to preserve transparency, consider converting to WebP instead.",
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

export default function PngToJpgPage() {
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
        subtitle="Convert your PNG images to JPG format with adjustable quality. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Our free <strong>png to jpg</strong> converter transforms your PNG images into
            compact JPG files. This is perfect when you need smaller file sizes for web uploads,
            email attachments, or any situation where PNG transparency is not required.
          </p>
          <p>
            All <strong>png to jpg</strong> conversion happens entirely in your browser. Your
            images are never uploaded to any server, so your files remain completely private.
            There is nothing to install and no account to create — just drop your PNGs and get
            your JPGs.
          </p>
          <p>
            Use the quality slider to control the balance between file size and image clarity.
            A higher quality setting preserves more detail, while a lower setting produces
            significantly smaller files. You can batch convert multiple PNG files at once and
            download them all in a single ZIP archive.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "JPG to PNG", href: "/jpg-to-png" },
          { name: "PNG to WebP", href: "/png-to-webp" },
          { name: "Compress Image", href: "/compress-image" },
          {
            name: "PDF to JPG",
            href: "https://peregrinepdf.com/pdf-to-jpg",
          },
        ]}
        nextStep={{ label: "Compress the JPG?", description: "Reduce file size further", href: "/compress-image" }}
      >
        <PngToJpgTool />
      </ToolLayout>
    </>
  );
}
