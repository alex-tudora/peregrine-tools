import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import SplitPdfTool from "./SplitPdfTool";

const TOOL_NAME = "Split PDF — Extract Pages Online Free";
const DESCRIPTION =
  "Split PDF files into individual pages or extract specific page ranges. Free online tool — no sign-up required. All processing happens in your browser.";
const KEYWORD = "split pdf";
const SITE_NAME = "Peregrine PDF";
const SITE_URL = "https://peregrinepdf.com";
const PATH = "/split-pdf";

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
  "Select which pages you want to extract",
  "Choose to download individual pages or all as a ZIP file",
  "Click the download button to get your files",
];

const faqs = [
  {
    question: "Is this tool really free?",
    answer:
      "Yes, completely free with no hidden limits. You can split as many PDFs as you like, as many times as you want, without creating an account or paying anything.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. All processing happens directly in your browser using client-side technology. Your PDF never leaves your device, so your documents stay completely private.",
  },
  {
    question: "Can I extract non-consecutive pages?",
    answer:
      "Absolutely. You can check individual page boxes or type a custom range like \"1, 3, 5-8, 12\" to extract any combination of pages you need.",
  },
  {
    question: "What is the difference between the two download options?",
    answer:
      "\"Extract Selected Pages\" combines all your chosen pages into a single PDF file. \"Download as ZIP\" creates a separate one-page PDF for each selected page and bundles them into a ZIP archive.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "The tool accepts PDFs up to 100 MB. Because processing happens in your browser, performance depends on your device — most documents split in just a few seconds.",
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

export default function SplitPdfPage() {
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
        title="Split PDF — Extract Pages Online Free"
        subtitle="Extract specific pages or split a PDF into individual files. Instantly. No sign-up required."
        keyword="split pdf"
        howTo={howTo}
        about={`
          <p>
            Need to split a PDF into separate pages or pull out just the ones you need?
            This free online tool makes it simple. Upload any PDF file, pick the pages
            you want, and download them in seconds — either as a single combined PDF or
            as individual files bundled in a ZIP archive.
          </p>
          <p>
            Whether you need to split PDF documents for work, school, or personal use,
            this tool handles it effortlessly. Select individual pages with checkboxes,
            use the convenient range input to specify pages like "1-3, 5, 7-10", or
            grab every page at once. The interface gives you full control over exactly
            which pages end up in your final download.
          </p>
          <p>
            Privacy is built in by design. When you split PDF files here, every step of
            the process runs entirely inside your browser using client-side JavaScript.
            Your documents are never uploaded to a server, never stored anywhere, and
            never seen by anyone but you. Once you close or refresh the page, the file
            data is gone. There are no accounts, no email gates, and no usage limits —
            just a fast, private way to split PDF pages whenever you need to.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Merge PDF", href: "/merge-pdf" },
          { name: "Compress PDF", href: "/compress-pdf" },
          { name: "Rotate PDF", href: "/rotate-pdf" },
          { name: "PDF to JPG", href: "/pdf-to-jpg" },
        ]}
        nextStep={{ label: "Need to merge later?", description: "Combine PDF files back into one document", href: "/merge-pdf" }}
      >
        <SplitPdfTool />
      </ToolLayout>
    </>
  );
}
