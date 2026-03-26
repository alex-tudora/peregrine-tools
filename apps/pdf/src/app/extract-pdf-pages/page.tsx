import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import ExtractPdfPagesTool from "./ExtractPdfPagesTool";

const TOOL_NAME = "Extract PDF Pages — Select & Export Pages Free";
const DESCRIPTION =
  "Extract pages from a PDF with visual thumbnails. Select pages, then export as a new PDF, JPG images, or PNG images. Free online tool — no sign-up required.";
const KEYWORD = "extract pdf pages";
const SITE_NAME = "Peregrine PDF";
const SITE_URL = "https://peregrinepdf.com";
const PATH = "/extract-pdf-pages";

export const metadata = generateToolMetadata({
  toolName: TOOL_NAME,
  description: DESCRIPTION,
  keyword: KEYWORD,
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  path: PATH,
});

const howTo = [
  "Upload your PDF file using the drop zone above",
  "Browse the visual thumbnails and click pages to select or deselect them",
  "Choose your export format: new PDF, JPG images, or PNG images",
  "Click the Export button to download your selected pages",
];

const faqs = [
  {
    question: "Is this tool really free?",
    answer:
      "Yes, completely free with no hidden limits. You can extract pages from as many PDFs as you like, as many times as you want, without creating an account or paying anything.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. All processing happens directly in your browser using client-side technology. Your PDF never leaves your device, so your documents stay completely private.",
  },
  {
    question: "What export formats are available?",
    answer:
      "You can export selected pages as a new PDF document, as individual JPG images, or as individual PNG images. When exporting multiple images, they are automatically bundled into a ZIP archive for easy download.",
  },
  {
    question: "Can I select non-consecutive pages?",
    answer:
      "Absolutely. Click any thumbnail to toggle its selection. Use the Select All and Deselect All buttons for quick bulk actions, then fine-tune your selection by clicking individual pages.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "The tool accepts PDFs up to 100 MB. Because processing happens in your browser, performance depends on your device — most documents are ready in just a few seconds.",
  },
];

const schemas = generateToolPageStructuredData({
  toolName: TOOL_NAME,
  description: DESCRIPTION,
  keyword: KEYWORD,
  url: `${SITE_URL}${PATH}`,
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  path: PATH,
  faqs,
  howTo,
});

export default function ExtractPdfPagesPage() {
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
        title="Extract PDF Pages — Select & Export Pages Free"
        subtitle="See every page as a thumbnail, pick the ones you need, and export as PDF or images. No sign-up required."
        keyword="extract pdf pages"
        howTo={howTo}
        about={`
          <p>
            Need to pull specific pages out of a PDF? This free online tool gives you
            a visual way to do it. Upload any PDF and instantly see every page rendered
            as a thumbnail. Click to select the pages you want, choose your output
            format, and download in seconds.
          </p>
          <p>
            Export options are flexible. Combine your selected pages into a brand-new
            PDF document, or convert them to high-quality JPG or PNG images. When you
            export multiple images, they are automatically bundled into a convenient
            ZIP archive. Whether you need a single page as an image for a presentation
            or a trimmed-down PDF for sharing, this tool handles it effortlessly.
          </p>
          <p>
            Privacy is built in by design. Every step of the process runs entirely
            inside your browser using client-side JavaScript. Your documents are never
            uploaded to a server, never stored anywhere, and never seen by anyone but
            you. Once you close or refresh the page, the file data is gone. There are
            no accounts, no email gates, and no usage limits — just a fast, private
            way to extract PDF pages whenever you need to.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Split PDF", href: "/split-pdf" },
          { name: "PDF to JPG", href: "/pdf-to-jpg" },
          { name: "PDF to PNG", href: "/pdf-to-png" },
          { name: "Merge PDF", href: "/merge-pdf" },
        ]}
        nextStep={{
          label: "Need to combine pages later?",
          description: "Merge multiple PDF files into one document",
          href: "/merge-pdf",
        }}
      >
        <ExtractPdfPagesTool />
      </ToolLayout>
    </>
  );
}
