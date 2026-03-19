import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { MergePdfTool } from "./MergePdfTool";

const toolName = "Merge PDF Files Online — Free";
const description =
  "Combine multiple PDF files into one document instantly. Free online PDF merger — no sign-up, no watermarks. Files processed in your browser for maximum privacy.";
const keyword = "merge pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/merge-pdf";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your PDF files using the drop zone above or click to browse",
  "Drag to reorder the files in your preferred order",
  'Click "Merge PDFs" to combine them into one document',
  "Download your merged PDF file",
];

const about = `
  <p>
    PDF merging is the process of combining two or more separate PDF documents into a single,
    unified file. Whether you need to merge pdf reports for a quarterly review, consolidate
    invoices for bookkeeping, or assemble chapters of a manuscript into one cohesive document,
    this tool makes it effortless. Instead of juggling multiple attachments or flipping between
    files, you can merge pdf documents in seconds and share a single, polished file with
    colleagues, clients, or collaborators.
  </p>
  <p>
    Our merge pdf tool runs entirely in your browser using client-side JavaScript. That means
    your files are never uploaded to a remote server — they stay on your device from start to
    finish. This approach ensures maximum privacy and eliminates the risk of sensitive data
    being intercepted or stored by third parties. There are no file-size restrictions beyond
    what your browser can handle, no daily usage caps, and no watermarks stamped onto your
    output. Simply drag and drop your PDFs, arrange them in the order you want, click the merge
    button, and download the result. It works on any modern browser across desktop and mobile
    devices, with no software installation or account creation required.
  </p>
`;

const faqs = [
  {
    question: "Is this PDF merge tool completely free?",
    answer:
      "Yes, it is 100% free with no hidden fees, no premium tier, and no sign-up required. You can merge as many PDFs as you like without any cost.",
  },
  {
    question: "Is it safe to merge my PDF files here?",
    answer:
      "Absolutely. All processing happens directly in your browser. Your files are never uploaded to any server, so your data stays private and secure on your own device at all times.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "There is no hard file size limit imposed by the tool itself. The practical limit depends on your device's available memory and browser capabilities. Most modern devices can comfortably handle files up to several hundred megabytes.",
  },
  {
    question: "How many PDF files can I merge at once?",
    answer:
      "There is no fixed limit on the number of files. You can merge two files or dozens — the tool will combine them all into a single document in the order you specify.",
  },
  {
    question: "Does this tool work offline?",
    answer:
      "Once the page has loaded, the merge functionality works without an internet connection because all processing is done locally in your browser. However, you do need an initial connection to load the page.",
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
  { name: "Split PDF", href: "/split-pdf" },
  { name: "Compress PDF", href: "/compress-pdf" },
  { name: "PDF to JPG", href: "/pdf-to-jpg" },
  { name: "Rotate PDF", href: "/rotate-pdf" },
];

export default function MergePdfPage() {
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
        subtitle="Combine multiple PDF files into one document. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <MergePdfTool />
      </ToolLayout>
    </>
  );
}
