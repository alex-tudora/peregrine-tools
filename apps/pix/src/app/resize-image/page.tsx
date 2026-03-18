import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import ResizeImageTool from "./ResizeImageTool";

const toolName = "Resize Image — Change Dimensions Online Free";
const description =
  "Resize images by exact dimensions or percentage. Free online image resizer — no sign-up, no file limits. Process files in your browser.";
const keyword = "resize image";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/resize-image";

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

export default function ResizeImagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title="Resize Image — Change Dimensions Online Free"
        subtitle="Scale your images to any size by pixels or percentage. Instantly. No sign-up required."
        keyword="resize image"
        howTo={[
          "Upload your image file using the drop zone above",
          "Choose a resize mode: by dimensions or by percentage",
          "Enter your desired width, height, or scale percentage",
          "Select an output format and click \"Resize Image\"",
          "Download your resized image",
        ]}
        about={`
          <p>
            Whether you need to fit an image into a specific layout, meet upload
            requirements for a platform, or simply reduce resolution for faster
            loading, our free online tool lets you <strong>resize image</strong>
            files in seconds with full control over the output dimensions.
          </p>
          <p>
            You can resize by exact pixel dimensions or by a percentage of the
            original size. The aspect ratio lock ensures your image stays
            proportional — change one dimension and the other updates
            automatically. If you need a non-proportional stretch, simply unlock
            the aspect ratio and type in both values.
          </p>
          <p>
            The tool supports JPEG, PNG, and WebP output, so you can resize and
            convert in one step. Because everything runs inside your browser
            using the Canvas API, your files are never uploaded to a server.
            This means you can <strong>resize image</strong> files containing
            personal photos, client work, or sensitive screenshots with
            complete privacy.
          </p>
          <p>
            Combine this tool with our compressor to first resize and then
            optimize file size, or use it alongside our crop and convert tools
            for a complete image editing workflow — all free, all in your
            browser.
          </p>
        `}
        faqs={[
          {
            question: "Does resizing an image reduce its quality?",
            answer:
              "Downscaling generally preserves visual quality well. Upscaling can introduce blurriness because the browser must interpolate new pixels. For best results when enlarging, keep the scale increase moderate (under 200%).",
          },
          {
            question: "Can I resize without changing the aspect ratio?",
            answer:
              "Yes. The \"Maintain aspect ratio\" checkbox is on by default. When enabled, changing the width automatically recalculates the height (and vice versa) to keep the original proportions.",
          },
          {
            question: "What is the maximum image size I can resize?",
            answer:
              "There is no hard limit. Performance depends on your browser and device memory. Most images up to 50 MP (e.g., 8000 x 6000 pixels) resize smoothly on modern devices.",
          },
          {
            question: "Are my images uploaded to a server?",
            answer:
              "No. All processing happens locally in your browser using the Canvas API. Your image never leaves your device, making this tool safe for personal or confidential files.",
          },
          {
            question: "Can I resize to a specific file size?",
            answer:
              "This tool resizes by pixel dimensions or percentage, not by target file size. To reduce file size, use our Compress Image tool after resizing — the combination gives you precise control over both dimensions and weight.",
          },
        ]}
        relatedTools={[
          { name: "Compress Image", href: "/compress-image" },
          { name: "Crop Image", href: "/crop-image" },
          { name: "PNG to JPG", href: "/png-to-jpg" },
          {
            name: "Resize PDF",
            href: "https://peregrinepdf.com/resize-pdf",
          },
        ]}
      >
        <ResizeImageTool />
      </ToolLayout>
    </>
  );
}
