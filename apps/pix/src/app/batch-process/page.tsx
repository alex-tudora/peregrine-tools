import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import BatchProcessTool from "./BatchProcessTool";

const toolName = "Batch Image Processor — Resize, Compress & Convert at Once";
const description =
  "Batch process images with a combined resize, compress, and convert pipeline. Free online tool — chain multiple operations in one step. No sign-up, no upload limits.";
const keyword = "batch image processor";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/batch-process";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload one or more image files using the drop zone above",
  "Toggle the pipeline steps you need: Resize, Compress, and/or Convert",
  "Configure each enabled step — set dimensions, quality, or output format",
  'Click "Process All" to run the pipeline on every image',
];

const faqs = [
  {
    question: "What does the batch image processor do?",
    answer:
      "It chains three image operations — resize, compress, and format conversion — into a single pipeline. You enable the steps you need, configure them once, and process all your images in one click.",
  },
  {
    question: "Do I have to enable all three steps?",
    answer:
      "No. You can enable any combination — just one, two, or all three. At least one step must be enabled to start processing.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All processing happens locally in your browser using the Canvas API. Your images never leave your device, making this tool safe for personal or confidential files.",
  },
  {
    question: "Can I resize by percentage instead of exact dimensions?",
    answer:
      "Yes. The resize step offers two modes: enter an exact width and height in pixels, or choose a percentage to scale relative to the original size. You can also lock the aspect ratio to prevent distortion.",
  },
  {
    question: "What output formats are supported?",
    answer:
      "You can convert to JPEG, PNG, or WebP. If you leave the Convert step disabled, each image keeps its original format. WebP typically produces the smallest files, while PNG is best when you need transparency.",
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

export default function BatchProcessPage() {
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
        title="Batch Image Processor — Resize, Compress & Convert at Once"
        subtitle="Chain resize, compress, and convert into one streamlined pipeline. Process all your images in a single click."
        keyword="batch image processor"
        howTo={howTo}
        about={`
          <p>
            Optimizing images one tool at a time is tedious. Our free
            <strong> batch image processor</strong> lets you chain resize, compress,
            and format conversion into a single pipeline that runs on all your
            images at once — no juggling between separate tools.
          </p>
          <p>
            Toggle the steps you need and configure them once. The tool processes
            each image through the enabled stages in sequence — resizing first,
            then compressing, then converting — all on a single canvas so there
            is no redundant re-encoding between steps. This means faster
            processing and better output quality compared to running each
            operation separately.
          </p>
          <p>
            Because everything runs inside your browser using the Canvas API,
            your images are never uploaded to a server. There are no file-size
            limits, no watermarks, and no daily caps. Whether you are preparing
            product photos for an e-commerce store, shrinking screenshots for
            documentation, or converting an entire folder to WebP, the
            <strong> batch image processor</strong> handles it in one step.
          </p>
          <p>
            Need finer control over a single step? Jump to our dedicated
            Compress Image, Resize Image, or format conversion tools for
            advanced options and before-and-after previews.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Compress Image", href: "/compress-image" },
          { name: "Resize Image", href: "/resize-image" },
          { name: "Crop Image", href: "/crop-image" },
          { name: "PNG to JPG", href: "/png-to-jpg" },
        ]}
        nextStep={{ label: "Need precise compression?", description: "Fine-tune quality with before/after preview", href: "/compress-image" }}
      >
        <BatchProcessTool />
      </ToolLayout>
    </>
  );
}
