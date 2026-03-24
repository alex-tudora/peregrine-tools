import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { WatermarkPdfTool } from "./WatermarkPdfTool";

const toolName = "Watermark PDF — Add Watermark Online Free";
const description =
  "Add text watermarks to PDF documents. Customize text, size, color, and opacity. Free online tool — no sign-up required.";
const keyword = "watermark pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/watermark-pdf";

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
  "Enter your watermark text and customize the appearance — font size, opacity, color, and position",
  "Click \"Add Watermark\" to apply the watermark to every page",
  "Download your watermarked PDF file",
];

const about = `
  <p>
    Adding a watermark to a PDF is one of the most effective ways to protect your
    documents, mark them as drafts, or label them as confidential. Whether you are
    sharing contracts with clients, circulating internal reports, or distributing
    proofs that should not be redistributed, a visible text watermark clearly
    communicates the status and ownership of the document. This free watermark pdf
    tool lets you stamp any text across every page of your file in just a few clicks.
  </p>
  <p>
    Our watermark pdf tool processes everything directly in your browser using
    client-side JavaScript and the pdf-lib library. Your documents are never uploaded
    to a server, which means your sensitive files stay on your device at all times.
    You can customize the watermark text, font size, opacity, color, and positioning
    to get exactly the look you need. Choose a subtle diagonal watermark for drafts
    or a bold centered stamp for confidential documents. There are no file-size
    limits beyond what your browser can handle, no daily usage caps, no accounts
    to create, and no watermarks added by the tool itself — only the watermark
    text you choose will appear on your pages.
  </p>
`;

const faqs = [
  {
    question: "Is this watermark tool completely free?",
    answer:
      "Yes, it is 100% free with no hidden fees, no premium features locked behind a paywall, and no account required. You can watermark as many PDFs as you like at no cost.",
  },
  {
    question: "Are my files safe when I add a watermark here?",
    answer:
      "Absolutely. All processing happens directly in your browser using client-side JavaScript. Your PDF files are never uploaded to any server, so your data remains private and secure on your own device.",
  },
  {
    question: "Can I customize the watermark appearance?",
    answer:
      "Yes. You can change the watermark text, font size, opacity (transparency), color, and choose between a diagonal or centered horizontal position. This gives you full control over how the watermark looks on your pages.",
  },
  {
    question: "Does the watermark get added to every page?",
    answer:
      "Yes, the watermark is applied to every page of the PDF. This ensures consistent branding or labeling throughout the entire document.",
  },
  {
    question: "Can I remove a watermark after adding it?",
    answer:
      "The watermark is permanently embedded into the PDF. We recommend keeping a copy of your original file before adding a watermark, so you always have the unwatermarked version available.",
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
  { name: "Protect PDF", href: "/protect-pdf" },
  { name: "Sign PDF", href: "/sign-pdf" },
  { name: "Merge PDF", href: "/merge-pdf" },
  { name: "Compress PDF", href: "/compress-pdf" },
];

export default function WatermarkPdfPage() {
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
        subtitle="Add text watermarks to your PDF documents. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
        nextStep={{ label: "Protect with password?", description: "Add password protection to your watermarked PDF", href: "/protect-pdf" }}
      >
        <WatermarkPdfTool />
      </ToolLayout>
    </>
  );
}
