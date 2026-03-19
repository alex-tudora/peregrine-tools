import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { PdfToPngTool } from "./PdfToPngTool";

const toolName = "PDF to PNG — Convert PDF to Images Online Free";
const description =
  "Convert PDF pages to high-quality PNG images with transparency support. Free online converter — no sign-up required. All processing in your browser.";
const keyword = "pdf to png";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/pdf-to-png";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your PDF file using the drop zone above",
  "Preview the file details and confirm your selection",
  'Click "Convert to PNG" to process your PDF',
  "Download individual images or all as a ZIP file",
];

const faqs = [
  {
    question: "Is this PDF to PNG converter really free?",
    answer:
      "Yes, completely free with no hidden limits. You can convert as many PDFs as you like without creating an account or paying anything.",
  },
  {
    question: "Why choose PNG over JPG?",
    answer:
      "PNG is a lossless format, so it preserves every detail without compression artifacts. It also supports transparency, making it ideal for design work, logos, and images that will be edited further.",
  },
  {
    question: "Are my files safe?",
    answer:
      "Absolutely. All processing happens locally in your browser. Your PDF is never uploaded to any server, so your data stays entirely on your device.",
  },
  {
    question: "Is there a page limit?",
    answer:
      "There is no hard page limit. However, very large PDFs (hundreds of pages) may take longer to process since everything runs in your browser. For best results, keep files under 100 MB.",
  },
  {
    question: "Can I convert to JPG instead of PNG?",
    answer:
      "Yes! We also offer a dedicated PDF to JPG converter that produces compressed JPG images, which are smaller in file size and ideal for sharing or web use.",
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

export default function PdfToPngPage() {
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
        subtitle="Convert each page of your PDF to a high-quality PNG image with transparency support. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Our free <strong>pdf to png</strong> converter transforms every page of your PDF document
            into a crisp, lossless PNG image. PNG is the ideal format when you need pixel-perfect
            accuracy, transparency support, or images destined for design work, presentations, or
            web graphics where quality cannot be compromised.
          </p>
          <p>
            The entire <strong>pdf to png</strong> conversion runs locally in your browser. Your
            files are never uploaded to any server, which means confidential reports, contracts, and
            personal documents remain completely private. There is nothing to install and no account
            to create — simply drop your PDF and get your images in seconds.
          </p>
          <p>
            Because PNG is a lossless format, every detail of the original page is preserved without
            compression artifacts. This makes the <strong>pdf to png</strong> tool especially useful
            for extracting charts, diagrams, and illustrations that will be edited further or
            embedded in other documents. Once conversion is complete, download each page individually
            or grab every image at once in a convenient ZIP archive.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "PDF to JPG", href: "/pdf-to-jpg" },
          { name: "PNG to PDF", href: "/png-to-pdf" },
          { name: "Compress PDF", href: "/compress-pdf" },
          {
            name: "Compress Image",
            href: "https://peregrinepix.com/compress-image",
          },
        ]}
      >
        <PdfToPngTool />
      </ToolLayout>
    </>
  );
}
