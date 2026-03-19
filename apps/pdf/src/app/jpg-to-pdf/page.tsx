import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JpgToPdfTool } from "./JpgToPdfTool";

const toolName = "JPG to PDF — Convert Images to PDF Online Free";
const description =
  "Convert JPG and PNG images to PDF documents. Combine multiple images into a single PDF. Free, no sign-up, processed in your browser.";
const keyword = "jpg to pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/jpg-to-pdf";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your images (JPG, PNG) using the drop zone above",
  "Drag to reorder images in your preferred order",
  "Choose your page size (A4, Letter, or fit to image)",
  'Click "Create PDF" and download your document',
];

const faqs = [
  {
    question: "What image formats are supported?",
    answer:
      "You can upload JPG (JPEG) and PNG images. Both formats can be mixed within the same PDF — the converter handles them seamlessly.",
  },
  {
    question: "Can I reorder the images before creating the PDF?",
    answer:
      "Yes. After uploading, use the arrow buttons next to each file to move it up or down. The final PDF pages will match the order shown in the list.",
  },
  {
    question: "Which page size should I choose?",
    answer:
      "Use A4 or Letter for documents that will be printed on standard paper. Choose \"Fit to Image\" if you want each PDF page to match the original image dimensions exactly, which is great for photo books or portfolios.",
  },
  {
    question: "Is there a limit on the number of images?",
    answer:
      "There is no fixed limit. You can upload as many images as you like. Very large batches may take a bit longer since everything is processed locally in your browser.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All processing happens locally in your browser using JavaScript. Your images never leave your device, ensuring complete privacy.",
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

export default function JpgToPdfPage() {
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
        subtitle="Convert your images to a PDF document. Upload multiple images to create a multi-page PDF. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Need to turn a collection of photos or scanned documents into a single PDF? Our free
            <strong>jpg to pdf</strong> converter makes it simple. Upload one image or dozens,
            arrange them in the order you want, pick a page size, and generate a polished PDF in
            seconds.
          </p>
          <p>
            This <strong>jpg to pdf</strong> tool supports both JPG and PNG images, so you can mix
            formats freely within the same document. Choose from standard page sizes like A4 and US
            Letter, or select "Fit to Image" to let each page match the exact dimensions of its
            source image — ideal for artwork, infographics, or photo portfolios.
          </p>
          <p>
            Because the conversion runs entirely in your browser, your images are never uploaded to
            a remote server. That makes this tool perfect for private photos, confidential scans, or
            any situation where data privacy matters. There are no watermarks, no file-count limits,
            and no account required. Just drag, arrange, convert, and download.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "PDF to JPG", href: "/pdf-to-jpg" },
          { name: "Merge PDF", href: "/merge-pdf" },
          { name: "Compress PDF", href: "/compress-pdf" },
          {
            name: "Resize Image",
            href: "https://peregrinepix.com/resize-image",
          },
        ]}
      >
        <JpgToPdfTool />
      </ToolLayout>
    </>
  );
}
