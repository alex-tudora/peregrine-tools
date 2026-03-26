import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import OptimizePdfTool from "./OptimizePdfTool";

const toolName = "Optimize PDF — Deep Compression with Image Optimization";
const description =
  "Optimize PDF files with deep image compression. Renders every page as a compressed JPEG and rebuilds the PDF for maximum file size reduction. Free, private, runs in your browser.";
const keyword = "optimize pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/optimize-pdf";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your PDF file using the drop zone above",
  "Choose an image quality level — Balanced for smallest size, High Quality for a good balance, or Maximum for near-lossless output",
  'Click "Optimize PDF" and watch each processing step complete in real time',
  "Download the optimized PDF once all steps finish",
];

const faqs = [
  {
    question: "How is this different from regular PDF compression?",
    answer:
      "Standard PDF compression strips metadata and rebuilds the internal structure, which helps with bloated files but cannot reduce the size of embedded images. This optimizer renders every page as a compressed JPEG at your chosen quality level, then rebuilds the PDF from those images. The result is dramatically smaller files, especially for image-heavy or scanned PDFs.",
  },
  {
    question: "What do the quality levels mean?",
    answer:
      "Balanced uses JPEG 75% quality for the smallest file size — ideal for email attachments and archiving. High Quality uses JPEG 85% for a great balance between size and clarity. Maximum uses JPEG 95% for near-lossless output where visual fidelity is critical.",
  },
  {
    question: "Will this affect text quality in my PDF?",
    answer:
      "Because the optimizer renders pages as images, text is rasterized at 2x resolution (typically 144 DPI equivalent). The result is visually sharp and perfectly readable, but the text is no longer selectable or searchable. If you need selectable text, use our standard Compress PDF tool instead.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. The entire optimization pipeline — rendering, compression, and PDF rebuilding — runs locally in your browser using JavaScript and HTML5 Canvas. Your files never leave your device.",
  },
  {
    question: "How much smaller will my PDF be?",
    answer:
      "Results depend on the original content. Image-heavy PDFs and scanned documents typically see 50-80% reductions at the Balanced setting. PDFs that are mostly vector graphics or already compressed may see smaller improvements. The tool always shows you the before and after sizes so you can judge the result.",
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

export default function OptimizePdfPage() {
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
        title="Optimize PDF — Deep Compression"
        subtitle="Render every page as a compressed image and rebuild for maximum file size reduction. Instantly. No sign-up required."
        keyword="optimize pdf"
        howTo={howTo}
        about={`
          <p>
            Standard PDF compression can only do so much — it strips metadata and
            rebuilds internal structures, but it cannot touch the images that make
            up most of a PDF's file size. Our <strong>optimize PDF</strong> tool
            goes further by rendering every page as a high-quality compressed JPEG,
            then rebuilding the entire document from those optimized images.
          </p>
          <p>
            This approach is especially effective for scanned documents, slide
            decks, and image-heavy reports where embedded images account for 90% or
            more of the file size. By re-encoding each page at your chosen quality
            level, the optimizer can achieve 50–80% reductions that simple
            metadata stripping cannot match.
          </p>
          <p>
            You stay in control with three quality presets: <em>Balanced</em> for
            maximum compression, <em>High Quality</em> for a great balance between
            size and clarity, and <em>Maximum</em> for near-lossless output. The
            processing pipeline runs entirely in your browser — your files are
            never uploaded to any server, making this tool safe for confidential
            documents.
          </p>
          <p>
            Watch each step of the optimization process in real time: PDF analysis,
            page rendering, image compression, and PDF rebuilding. When it finishes
            you will see the exact before-and-after file sizes so you can decide
            whether the trade-off is right for your use case.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Compress PDF", href: "/compress-pdf" },
          { name: "Merge PDF", href: "/merge-pdf" },
          { name: "PDF to JPG", href: "/pdf-to-jpg" },
        ]}
        nextStep={{
          label: "Need lighter compression?",
          description: "Use standard compression to keep selectable text and metadata",
          href: "/compress-pdf",
        }}
      >
        <OptimizePdfTool />
      </ToolLayout>
    </>
  );
}
