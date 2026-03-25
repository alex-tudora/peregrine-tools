import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { PdfToTextTool } from "./PdfToTextTool";

const toolName = "PDF to Text — Extract Text from PDF Free";
const description =
  "Extract text from digital PDFs instantly. Free online tool — no OCR needed, just direct text extraction. All processing happens in your browser.";
const keyword = "pdf to text";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/pdf-to-text";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your PDF using the drop zone above",
  'Click "Extract Text" to pull text from every page',
  "Review the extracted text, word count, and character count",
  "Copy the text to your clipboard or download it as a TXT file",
];

const faqs = [
  {
    question: "What is the difference between PDF to Text and OCR?",
    answer:
      "PDF to Text extracts text that is already embedded in a digital PDF — it reads the actual text data stored in the file, which is why it is instant. OCR (optical character recognition) is needed for scanned PDFs where the text exists only as an image of printed pages. If your PDF was created digitally (e.g. from Word, Google Docs, or a web page), this tool is all you need.",
  },
  {
    question: "What types of PDFs work with this tool?",
    answer:
      "This tool works with any PDF that contains embedded (digital) text. That includes PDFs exported from word processors, spreadsheets, presentation software, web browsers, and most modern applications. If the text in your PDF can be selected and highlighted in a PDF reader, this tool will extract it.",
  },
  {
    question: "Why is the extracted text empty or garbled?",
    answer:
      "If the result is empty, your PDF likely contains scanned images rather than digital text. Use our OCR PDF tool instead. Garbled text can occur when a PDF uses custom font encodings or embedded fonts without proper Unicode mappings — this is uncommon but can happen with older or specialized PDF generators.",
  },
  {
    question: "Are my files safe and private?",
    answer:
      "Yes. All processing happens entirely in your browser using pdfjs-dist. Your PDF is never uploaded to any server, which means your documents stay completely private on your device. Nothing is stored or transmitted.",
  },
  {
    question: "Is there a file size or page limit?",
    answer:
      "There is no hard limit. Since this tool extracts embedded text directly (no rendering or OCR), it is extremely fast even for large documents. A 500-page PDF typically takes just a few seconds. For very large files, performance depends on your device's available memory.",
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

export default function PdfToTextPage() {
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
        subtitle="Extract text from digital PDFs instantly. No OCR, no waiting, no sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Our free <strong>PDF to Text</strong> tool extracts text directly from digital PDF
            documents in milliseconds. Unlike OCR tools that need to scan and interpret images,
            this tool reads the actual text data embedded in your PDF file, making it virtually
            instant regardless of document length.
          </p>
          <p>
            This approach works with any PDF that was created digitally — from word processors,
            spreadsheets, web pages, or any modern application. The text is extracted exactly as
            it appears in the document, preserving the content across every page. You get clean,
            accurate text without the guesswork of optical character recognition.
          </p>
          <p>
            Everything runs locally in your browser using Mozilla's open-source pdfjs-dist library.
            Your files never leave your device, so confidential documents like contracts, reports,
            or financial statements stay completely private. There is nothing to install and no
            account to create. If your PDF is a scan or photograph, use our
            <a href="/ocr-pdf">OCR PDF</a> tool instead.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "OCR PDF", href: "/ocr-pdf" },
          { name: "Compress PDF", href: "/compress-pdf" },
          { name: "Split PDF", href: "/split-pdf" },
          { name: "Merge PDF", href: "/merge-pdf" },
        ]}
        nextStep={{
          label: "Have a scanned PDF?",
          description: "Use OCR to extract text from scanned or image-based PDFs",
          href: "/ocr-pdf",
        }}
      >
        <PdfToTextTool />
      </ToolLayout>
    </>
  );
}
