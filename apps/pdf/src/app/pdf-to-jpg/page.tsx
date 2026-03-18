import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { PdfToJpgTool } from "./PdfToJpgTool";

const toolName = "PDF to JPG — Convert PDF to Images Online Free";
const description =
  "Convert PDF pages to high-quality JPG images. Free online converter — no sign-up required. All processing happens in your browser for privacy.";
const keyword = "pdf to jpg";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/pdf-to-jpg";

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

export default function PdfToJpgPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title={toolName}
        subtitle="Convert each page of your PDF to a high-quality JPG image. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Upload your PDF file using the drop zone above",
          "Adjust the image quality if needed",
          'Click "Convert to JPG" to process your PDF',
          "Download individual images or all as a ZIP file",
        ]}
        about={`
          <p>
            Our free <strong>pdf to jpg</strong> converter turns every page of your PDF document
            into a crisp, high-quality JPG image. Whether you need to extract illustrations from a
            report, share individual slides from a presentation, or prepare images for a website,
            this tool makes the process effortless.
          </p>
          <p>
            Unlike many online converters, the entire <strong>pdf to jpg</strong> conversion
            happens right in your browser. Your files are never uploaded to a server, which means
            your sensitive documents stay completely private. There is nothing to install and no
            account to create — just drop your PDF and get your images.
          </p>
          <p>
            You can fine-tune the output by adjusting the quality slider. A higher quality setting
            produces larger, more detailed images that are ideal for printing, while a lower setting
            creates lightweight files perfect for web use or email attachments. Once the conversion
            is complete, download each page individually or grab every image at once in a convenient
            ZIP archive.
          </p>
        `}
        faqs={[
          {
            question: "Is this PDF to JPG converter really free?",
            answer:
              "Yes, completely free with no hidden limits. You can convert as many PDFs as you like without creating an account or paying anything.",
          },
          {
            question: "Are my files safe?",
            answer:
              "Absolutely. All processing happens locally in your browser. Your PDF is never uploaded to any server, so your data stays entirely on your device.",
          },
          {
            question: "What quality should I choose?",
            answer:
              "The default quality of 0.85 offers a great balance between file size and image clarity. Use a higher value (up to 1.0) for print-quality images, or lower it to reduce file size for web use.",
          },
          {
            question: "Is there a page limit?",
            answer:
              "There is no hard page limit. However, very large PDFs (hundreds of pages) may take longer to process since everything runs in your browser. For best results, keep files under 100 MB.",
          },
          {
            question: "Can I convert to PNG instead of JPG?",
            answer:
              "Yes! We also offer a dedicated PDF to PNG converter that produces lossless PNG images, which are ideal when you need pixel-perfect accuracy or transparency support.",
          },
        ]}
        relatedTools={[
          { name: "PDF to PNG", href: "/pdf-to-png" },
          { name: "JPG to PDF", href: "/jpg-to-pdf" },
          { name: "Compress PDF", href: "/compress-pdf" },
          {
            name: "Compress Image",
            href: "https://peregrinepix.com/compress-image",
          },
        ]}
      >
        <PdfToJpgTool />
      </ToolLayout>
    </>
  );
}
