import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { AddPageNumbersTool } from "./AddPageNumbersTool";

const toolName = "Add Page Numbers to PDF — Free Online Tool";
const description =
  "Add page numbers to your PDF documents. Customize position, format, and starting number. Free online tool — no sign-up required.";
const keyword = "add page numbers to pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/add-page-numbers";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your PDF file using the drop zone above or click to browse",
  "Choose where the page numbers should appear and select a numbering format",
  "Adjust the starting number, font size, and whether to skip the first page",
  "Click \"Add Page Numbers\" and download your numbered PDF",
];

const about = `
  <p>
    Adding page numbers to a PDF is an essential step when preparing documents for printing,
    binding, or professional distribution. Whether you are finalizing a thesis, compiling a
    report for a board meeting, or assembling a manual, clearly numbered pages make it easy
    for readers to navigate and reference specific sections. This free online tool lets you
    add page numbers to pdf documents in seconds with full control over position, format,
    and starting number — no software to install and no account to create.
  </p>
  <p>
    This add page numbers to pdf tool runs entirely in your browser using client-side JavaScript
    and the pdf-lib library. Your files are never uploaded to a remote server — they stay on
    your device from start to finish. You can place numbers at the top or bottom of the page,
    align them left, center, or right, and choose from several common numbering formats
    including simple digits, "Page N" labels, "N of Total" counters, and dash-enclosed numbers.
    A handy option to skip the first page keeps title pages clean, and you can start numbering
    from any value you choose. There are no file-size limits beyond what your browser can
    handle, no daily usage caps, and no watermarks added to your output. It works on any
    modern browser across desktop and mobile devices.
  </p>
`;

const faqs = [
  {
    question: "Is this page numbering tool free?",
    answer:
      "Yes, it is completely free with no hidden fees, no premium tier, and no account required. You can add page numbers to as many PDFs as you need without any cost.",
  },
  {
    question: "Are my files safe when I use this tool?",
    answer:
      "Absolutely. All processing happens directly in your browser. Your PDF files are never uploaded to any server, so your documents remain private and secure on your own device.",
  },
  {
    question: "Can I skip numbering on the first page?",
    answer:
      "Yes. Simply check the \"Skip first page\" option. This is useful when your first page is a title or cover page that should not display a page number.",
  },
  {
    question: "What page number formats are available?",
    answer:
      "You can choose from four formats: simple numbers (1, 2, 3), \"Page\" prefix (Page 1, Page 2), \"N of Total\" (1 of 10, 2 of 10), or dash-enclosed (- 1 -, - 2 -).",
  },
  {
    question: "Can I start numbering from a number other than 1?",
    answer:
      "Yes. You can set any starting number you like using the \"Starting number\" input. For example, if your PDF is part of a larger document starting at page 15, simply enter 15.",
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

const relatedTools = [
  { name: "Merge PDF", href: "/merge-pdf" },
  { name: "Rotate PDF", href: "/rotate-pdf" },
  { name: "Watermark PDF", href: "/watermark-pdf" },
  { name: "Compress PDF", href: "/compress-pdf" },
];

export default function AddPageNumbersPage() {
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
        subtitle="Add page numbers to any PDF document. Customize position and format. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <AddPageNumbersTool />
      </ToolLayout>
    </>
  );
}
