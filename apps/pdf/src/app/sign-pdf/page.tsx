import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { SignPdfTool } from "./SignPdfTool";

const toolName = "Sign PDF — Add Signature Online Free";
const description =
  "Add your signature to PDF documents. Draw or type your signature and place it on any page. Free online tool — no sign-up required.";
const keyword = "sign pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/sign-pdf";

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
  "Draw your signature on the canvas or type it using one of the signature fonts",
  "Click directly on the document preview to place your signature, then drag to reposition",
  "Click \"Sign PDF\" and download your signed document",
];

const about = `
  <p>
    Adding a signature to a PDF is one of the most common tasks in everyday document workflows.
    Whether you need to sign pdf contracts, authorize invoices, or approve internal memos, this
    free online tool lets you place your signature on any page of a PDF in seconds. You can
    draw your signature using a mouse or touchscreen for an authentic handwritten look, or type
    your name and choose from several elegant cursive-style fonts for a clean, professional result.
    Either way, the signature is embedded directly into the PDF so the document looks polished
    and ready to share.
  </p>
  <p>
    This sign pdf tool runs entirely in your browser using client-side JavaScript and the pdf-lib
    library. Your files are never uploaded to a remote server — they stay on your device from
    start to finish. That means sensitive contracts, financial documents, and personal paperwork
    remain completely private. There are no file-size restrictions beyond what your browser can
    handle, no daily usage limits, and no watermarks stamped onto your output. Simply upload your
    PDF, create your signature, pick a position on the page, and download the signed document.
    It works on any modern browser across desktop and mobile devices with no software installation
    or account creation required.
  </p>
`;

const faqs = [
  {
    question: "Is this PDF signing tool free?",
    answer:
      "Yes, it is completely free with no hidden fees, no premium tier, and no account required. You can sign as many PDFs as you need without any cost.",
  },
  {
    question: "Are my files safe when I use this tool?",
    answer:
      "Absolutely. All processing happens directly in your browser. Your PDF files are never uploaded to any server, so your documents and signature remain private and secure on your own device.",
  },
  {
    question: "Is the signature legally binding?",
    answer:
      "This tool adds a visual signature to your PDF. Whether that constitutes a legally binding signature depends on your jurisdiction and the agreement between parties. For formal legal requirements, consider using a certified digital signature service.",
  },
  {
    question: "Can I choose where the signature appears on the page?",
    answer:
      "Yes. After creating your signature, click directly on the document preview to place it exactly where you want. You can drag the signature to reposition it, and navigate between pages for multi-page documents.",
  },
  {
    question: "What is the difference between drawing and typing a signature?",
    answer:
      "Drawing lets you create a freehand signature using your mouse or touchscreen, which is embedded as an image. Typing lets you enter your name and select a cursive font style, which is rendered as styled text. Both produce a professional-looking result.",
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
  { name: "Watermark PDF", href: "/watermark-pdf" },
  { name: "Protect PDF", href: "/protect-pdf" },
  { name: "Merge PDF", href: "/merge-pdf" },
  { name: "Compress PDF", href: "/compress-pdf" },
];

export default function SignPdfPage() {
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
        subtitle="Add your signature to any PDF document. Draw or type it. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
        nextStep={{ label: "Compress the PDF?", description: "Reduce file size before sharing", href: "/compress-pdf" }}
      >
        <SignPdfTool />
      </ToolLayout>
    </>
  );
}
