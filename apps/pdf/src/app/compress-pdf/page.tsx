import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import CompressPdfTool from "./CompressPdfTool";

const toolName = "Compress PDF — Reduce File Size Online Free";
const description =
  "Compress PDF files to reduce file size without losing quality. Free online PDF compressor — no sign-up, no file limits. Process files in your browser.";
const keyword = "compress pdf";
const siteName = "Peregrine PDF";
const siteUrl = "https://peregrinepdf.com";
const path = "/compress-pdf";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const structuredData = generateToolStructuredData({
  toolName,
  description,
  url: `${siteUrl}${path}`,
  siteName,
});

export default function CompressPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title="Compress PDF — Reduce File Size Online Free"
        subtitle="Reduce your PDF file size while maintaining quality. Instantly. No sign-up required."
        keyword="compress pdf"
        howTo={[
          "Upload your PDF file using the drop zone above",
          "Select your compression level (low, medium, or high)",
          'Click "Compress PDF" to reduce the file size',
          "Download your compressed PDF",
        ]}
        about={`
          <p>
            Large PDF files can be a headache — they clog up email attachments,
            slow down cloud uploads, and eat through storage quotas. Our free
            online tool lets you <strong>compress PDF</strong> documents in
            seconds, shrinking file size while preserving the content you care
            about.
          </p>
          <p>
            The compressor works by rebuilding the internal structure of your PDF,
            removing orphaned objects, stripping unnecessary metadata, and
            optimizing the cross-reference table. You choose the compression
            level: <em>low</em> keeps everything intact for minimal size
            reduction, <em>medium</em> strips document metadata like title and
            author for a balanced result, and <em>high</em> aggressively removes
            all non-essential data for the maximum possible reduction.
          </p>
          <p>
            Because the entire process runs inside your browser, your files are
            never uploaded to a server. This means you can <strong>compress
            PDF</strong> files that contain sensitive or confidential information
            without worrying about privacy. There are no file-size limits, no
            watermarks, and no daily caps — just fast, free compression whenever
            you need it.
          </p>
          <p>
            Whether you need to compress a single report or batch-process
            documents before archiving, this tool has you covered. Pair it with
            our other PDF utilities — merge, split, convert — to build a complete
            document workflow without leaving your browser.
          </p>
        `}
        faqs={[
          {
            question: "Does compressing a PDF reduce its quality?",
            answer:
              "Our compressor reduces file size by removing unused objects and metadata — it does not resample images or alter visible content. At the low and medium levels, the pages look identical to the original. The high level strips all metadata but still preserves page content.",
          },
          {
            question: "Is there a file size limit?",
            answer:
              "There is no hard limit. Because the tool runs entirely in your browser, performance depends on your device's available memory. Most files up to 100 MB compress without any issues.",
          },
          {
            question: "Are my files uploaded to a server?",
            answer:
              "No. All processing happens locally in your browser using JavaScript. Your PDF never leaves your device, making this tool safe for confidential or sensitive documents.",
          },
          {
            question: "How much smaller will my PDF be?",
            answer:
              "Results vary depending on the original file. PDFs with lots of unused objects, embedded metadata, or bloated cross-reference tables see the biggest reductions — sometimes 20-50%. Already-optimized files may see a smaller improvement.",
          },
          {
            question: "Can I compress password-protected PDFs?",
            answer:
              "The tool attempts to process protected files by ignoring encryption flags. It works in most cases, but heavily encrypted documents may not compress successfully. Try our Unlock PDF tool first if you run into issues.",
          },
        ]}
        relatedTools={[
          { name: "Merge PDF", href: "/merge-pdf" },
          { name: "Split PDF", href: "/split-pdf" },
          { name: "PDF to JPG", href: "/pdf-to-jpg" },
          {
            name: "Compress Image",
            href: "https://peregrinepix.com/compress-image",
          },
        ]}
      >
        <CompressPdfTool />
      </ToolLayout>
    </>
  );
}
