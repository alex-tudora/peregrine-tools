import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { PngToPdfTool } from "./PngToPdfTool";

const toolName = "PNG to PDF — Convert PNG Images to PDF Online Free";
const description =
  "Convert PNG images to PDF documents. Combine multiple PNG files into a single PDF. Free, no sign-up, processed in your browser.";
const keyword = "png to pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/png-to-pdf";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your PNG images using the drop zone above",
  "Drag to reorder images in your preferred order",
  "Choose your page size (A4, Letter, or fit to image)",
  'Click "Create PDF" and download your document',
];

const faqs = [
  {
    question: "What file formats are accepted?",
    answer:
      "This tool is designed specifically for PNG images. If you need to convert JPG images as well, try our JPG to PDF converter which supports both JPG and PNG formats.",
  },
  {
    question: "Can I reorder the images before creating the PDF?",
    answer:
      "Yes. After uploading, use the arrow buttons next to each file to move it up or down. The final PDF pages will match the order shown in the list.",
  },
  {
    question: "Which page size should I choose?",
    answer:
      "Use A4 or Letter for documents that will be printed on standard paper. Choose \"Fit to Image\" if you want each PDF page to match the original image dimensions exactly, which is great for design portfolios or screenshot collections.",
  },
  {
    question: "Is there a limit on the number of images?",
    answer:
      "There is no fixed limit. You can upload as many PNG files as you like. Very large batches may take a bit longer since everything is processed locally in your browser.",
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

export default function PngToPdfPage() {
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
        subtitle="Convert your PNG images to a PDF document. Upload multiple images to create a multi-page PDF. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Need to combine PNG screenshots, diagrams, or transparent graphics into a single
            document? Our free <strong>png to pdf</strong> converter makes it effortless. Upload one
            image or dozens, arrange them in the order you want, pick a page size, and generate a
            polished PDF in seconds.
          </p>
          <p>
            This <strong>png to pdf</strong> tool is purpose-built for PNG files, preserving their
            lossless quality and transparency throughout the conversion. Choose from standard page
            sizes like A4 and US Letter, or select "Fit to Image" to let each page match the exact
            dimensions of its source image — perfect for design portfolios, technical diagrams, or
            screenshot collections.
          </p>
          <p>
            Because the entire <strong>png to pdf</strong> conversion runs in your browser, your
            images are never uploaded to a remote server. That makes this tool ideal for confidential
            mockups, proprietary designs, or any situation where data privacy matters. There are no
            watermarks, no file-count limits, and no account required. Just drag, arrange, convert,
            and download.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "PDF to PNG", href: "/pdf-to-png" },
          { name: "JPG to PDF", href: "/jpg-to-pdf" },
          { name: "Merge PDF", href: "/merge-pdf" },
          {
            name: "Compress Image",
            href: "https://peregrinepix.com/compress-image",
          },
        ]}
        nextStep={{ label: "Compress the PDF?", description: "Reduce the file size of your new PDF", href: "/compress-pdf" }}
      >
        <PngToPdfTool />
      </ToolLayout>
    </>
  );
}
