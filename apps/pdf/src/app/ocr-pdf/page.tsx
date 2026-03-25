import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { OcrPdfTool } from "./OcrPdfTool";

const toolName = "OCR PDF — Extract Text from Scanned PDFs Free";
const description =
  "Extract text from scanned PDF documents using OCR. Free online tool — supports multiple languages. All processing happens in your browser.";
const keyword = "ocr pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/ocr-pdf";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your scanned PDF using the drop zone above",
  "Select the language of the text in your document",
  'Click "Extract Text" to run OCR on every page',
  "Copy the extracted text or download it as a TXT file",
];

const faqs = [
  {
    question: "How accurate is the OCR text extraction?",
    answer:
      "Accuracy depends on the quality of the scan. Clean, high-resolution scans with standard fonts typically produce excellent results. Handwritten text, low-resolution scans, or unusual fonts may reduce accuracy. Selecting the correct language improves recognition significantly.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "The tool supports English, Spanish, French, German, Italian, Portuguese, Chinese (Simplified), and Japanese. Select the language that matches your document before running the extraction for the best results.",
  },
  {
    question: "What is the difference between scanned and digital PDFs?",
    answer:
      "A digital (or native) PDF contains actual text data that can be selected and copied directly. A scanned PDF is essentially an image of a printed page — the text is embedded as pixels, not characters. OCR is needed to convert those pixel-based images back into selectable, searchable text.",
  },
  {
    question: "Are my files safe and private?",
    answer:
      "Yes. All processing happens entirely in your browser using Tesseract.js. Your PDF is never uploaded to any server, which means your documents stay completely private on your device. Nothing is stored or transmitted.",
  },
  {
    question: "Is there a page or file size limit?",
    answer:
      "There is no hard limit, but very large PDFs (over 50 pages or 100 MB) may take longer since OCR runs locally in your browser. For best performance, split very large documents using our Split PDF tool first.",
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

export default function OcrPdfPage() {
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
        subtitle="Extract text from scanned PDFs using optical character recognition. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Our free <strong>OCR PDF</strong> tool uses optical character recognition to extract
            text from scanned PDF documents. Whether you have a scanned contract, a photographed
            receipt, or a PDF created from paper documents, this tool converts the images back
            into editable, searchable text.
          </p>
          <p>
            The entire <strong>OCR PDF</strong> process runs locally in your browser using
            Tesseract.js, a powerful open-source OCR engine. Your files are never uploaded to
            any server, so sensitive documents like contracts, medical records, or financial
            statements remain completely private. There is nothing to install and no account
            to create.
          </p>
          <p>
            For best results, use high-resolution scans and select the correct document language
            before extracting. The tool supports eight major languages and handles multi-page
            documents with ease. Once extraction is complete, copy the text to your clipboard
            with one click or download it as a plain text file for further editing.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "PDF to JPG", href: "/pdf-to-jpg" },
          { name: "Compress PDF", href: "/compress-pdf" },
          { name: "Merge PDF", href: "/merge-pdf" },
          { name: "Split PDF", href: "/split-pdf" },
        ]}
        nextStep={{ label: "Compress your PDF?", description: "Reduce PDF file size without losing quality", href: "/compress-pdf" }}
      >
        <OcrPdfTool />
      </ToolLayout>
    </>
  );
}
