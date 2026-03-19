import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { SvgToPngTool } from "./SvgToPngTool";

const toolName = "SVG to PNG — Convert SVG to PNG Online Free";
const description =
  "Convert SVG vector files to high-resolution PNG images at 1x, 2x, 3x, or 4x scale. Free online converter — no sign-up, no file limits. Process files in your browser.";
const keyword = "svg to png";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/svg-to-png";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your SVG file using the drop zone above or click to browse",
  "Select the output scale — 1x, 2x, 3x, or 4x the original SVG dimensions",
  'Click "Convert to PNG" to render the SVG as a raster image',
  "Download your PNG file",
];

const faqs = [
  {
    question: "What scale should I use for web images?",
    answer:
      "For standard-resolution screens, 1x is sufficient. For Retina and high-DPI displays, 2x is the most common choice. Use 3x or 4x if you need extra-large raster outputs for print or marketing assets.",
  },
  {
    question: "Will the PNG have a transparent background?",
    answer:
      "Yes. PNG supports transparency, so if your SVG has a transparent background, the converted PNG will too. No white fill is added unless your SVG itself includes one.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. All processing happens locally in your browser using the Canvas API. Your SVG file never leaves your device, making this tool safe for logos, icons, and confidential designs.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "There is no hard limit. Because the tool runs entirely in your browser, performance depends on your device's available memory. Most SVG files convert without any issues.",
  },
  {
    question: "Can I convert multiple SVGs at once?",
    answer:
      "This tool processes one SVG file at a time for the best control over scale settings. To convert another file, click \"Change file\" after downloading your PNG.",
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

export default function SvgToPngPage() {
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
        title="SVG to PNG — Convert SVG to PNG Online Free"
        subtitle="Turn your SVG vector files into crisp PNG images at any scale. Instantly. No sign-up required."
        keyword="svg to png"
        howTo={howTo}
        about={`
          <p>
            SVG files are perfect for scalable graphics, but many platforms,
            email clients, and design tools require raster images. Our free
            <strong> svg to png</strong> converter renders your vector file at
            the exact resolution you need — from 1x for standard screens to 4x
            for ultra-high-density displays and print workflows.
          </p>
          <p>
            The converter runs entirely in your browser using the Canvas API.
            Your SVG is loaded into an <code>&lt;img&gt;</code> element, drawn
            onto a canvas at the chosen scale, and exported as a lossless PNG.
            No server ever sees your file, so logos, icons, and proprietary
            illustrations stay completely private.
          </p>
          <p>
            Need a 2x version for Retina displays? Just select 2x and hit
            convert — the output dimensions are exactly twice the SVG's
            intrinsic width and height, ensuring pixel-perfect rendering
            without any manual math. There are no file-size limits, no
            watermarks, and no daily caps.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "PNG to JPG", href: "/png-to-jpg" },
          { name: "Resize Image", href: "/resize-image" },
          { name: "Compress Image", href: "/compress-image" },
          { name: "Favicon Generator", href: "/favicon-generator" },
        ]}
      >
        <SvgToPngTool />
      </ToolLayout>
    </>
  );
}
