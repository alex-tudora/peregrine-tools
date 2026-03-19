import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { RotatePdfTool } from "./RotatePdfTool";

const toolName = "Rotate PDF — Rotate Pages Online Free";
const description =
  "Rotate PDF pages 90\u00B0, 180\u00B0, or 270\u00B0. Rotate all pages or specific pages. Free online tool — no sign-up required.";
const keyword = "rotate pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/rotate-pdf";

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
  "Select the rotation angle: 90\u00B0 clockwise, 180\u00B0, or 270\u00B0 clockwise",
  "Choose whether to rotate all pages or select specific pages",
  "Click \"Rotate PDF\" and download your rotated file",
];

const about = `
  <p>
    Rotating PDF pages is a common need when working with scanned documents, photographs,
    or presentations that ended up in the wrong orientation. Whether a single page is
    sideways or an entire document needs to be flipped upside-down, this free online
    rotate pdf tool lets you fix the orientation in seconds. Simply upload your file,
    pick the rotation angle, and download the corrected PDF — no software installation
    or account creation required.
  </p>
  <p>
    This rotate pdf tool runs entirely in your browser using client-side JavaScript and
    the pdf-lib library. Your files are never uploaded to a remote server, ensuring
    complete privacy and security. You can rotate all pages at once or target specific
    pages, making it easy to fix mixed-orientation documents where only certain pages
    need adjustment. Choose from 90\u00B0 clockwise, 180\u00B0 (upside-down flip), or 270\u00B0
    clockwise (equivalent to 90\u00B0 counter-clockwise) rotation. The tool preserves all
    existing content, annotations, and formatting — it only changes the page orientation.
    There are no file-size limits beyond what your browser can handle, no daily usage
    caps, and no watermarks added to your output.
  </p>
`;

const faqs = [
  {
    question: "Is this PDF rotation tool free?",
    answer:
      "Yes, it is completely free with no hidden fees, no premium tier, and no account required. You can rotate as many PDFs as you need without any cost.",
  },
  {
    question: "Are my files safe when I use this tool?",
    answer:
      "Absolutely. All processing happens directly in your browser. Your PDF files are never uploaded to any server, so your documents remain private and secure on your own device.",
  },
  {
    question: "Can I rotate only specific pages in a PDF?",
    answer:
      "Yes. After uploading your file, you can switch from \"All pages\" to \"Select specific pages\" and check the individual pages you want to rotate. Only those pages will be affected.",
  },
  {
    question: "What rotation angles are available?",
    answer:
      "You can rotate pages by 90\u00B0 clockwise, 180\u00B0 (flips the page upside-down), or 270\u00B0 clockwise (which is the same as 90\u00B0 counter-clockwise).",
  },
  {
    question: "Does rotating a PDF change or remove any content?",
    answer:
      "No. Rotation only changes the orientation of the page. All text, images, annotations, and formatting are fully preserved in the output file.",
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
  { name: "Split PDF", href: "/split-pdf" },
  { name: "Compress PDF", href: "/compress-pdf" },
  { name: "Watermark PDF", href: "/watermark-pdf" },
];

export default function RotatePdfPage() {
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
        subtitle="Rotate PDF pages by 90\u00B0, 180\u00B0, or 270\u00B0. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <RotatePdfTool />
      </ToolLayout>
    </>
  );
}
