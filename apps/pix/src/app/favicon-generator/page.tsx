import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { FaviconGeneratorTool } from "./FaviconGeneratorTool";

const toolName = "Favicon Generator — Create Favicons Online Free";
const description =
  "Generate favicons in all standard sizes (16x16 to 512x512) from any image. Download as a ZIP. Free online tool — no sign-up, no file limits. Process files in your browser.";
const keyword = "favicon generator";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/favicon-generator";

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

export default function FaviconGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title="Favicon Generator — Create Favicons Online Free"
        subtitle="Generate a complete set of favicons from a single image. Instantly. No sign-up required."
        keyword="favicon generator"
        howTo={[
          "Upload your source image or SVG using the drop zone above or click to browse",
          "Review the list of favicon sizes that will be generated (16x16 through 512x512)",
          'Click "Generate Favicons" to create all sizes at once',
          "Preview the generated favicons in the grid below",
          'Click "Download All as ZIP" to save every size in a single archive',
        ]}
        about={`
          <p>
            Every website needs favicons — the small icons shown in browser
            tabs, bookmarks, home screens, and search results. Our free
            <strong> favicon generator</strong> takes a single source image
            and produces all seven standard sizes in one click: 16x16, 32x32,
            48x48, 64x64, 128x128, 192x192, and 512x512 pixels.
          </p>
          <p>
            Upload a high-resolution logo, icon, or photo and the tool will
            scale it down using high-quality canvas resampling. The output is
            always PNG, which preserves transparency and sharp edges —
            essential for icons that need to look crisp at tiny sizes. Once
            generated, you can preview every size in a grid and download all
            of them as a single ZIP archive.
          </p>
          <p>
            The entire process runs in your browser using the Canvas API. No
            files are uploaded to any server, making this
            <strong> favicon generator</strong> safe for proprietary logos and
            brand assets. There are no file-size limits, no watermarks, and
            no daily caps.
          </p>
        `}
        faqs={[
          {
            question: "Which image format should I use as the source?",
            answer:
              "For best results, use a square image at least 512x512 pixels. SVG files work especially well because they scale without losing quality. JPEG, PNG, and WebP are also supported.",
          },
          {
            question: "Why are there so many favicon sizes?",
            answer:
              "Different platforms and devices use different icon sizes. 16x16 and 32x32 are used in browser tabs, 192x192 is used by Android home screens, and 512x512 is used by Progressive Web Apps (PWAs) and some social platforms.",
          },
          {
            question: "Are my files uploaded to a server?",
            answer:
              "No. All processing happens locally in your browser using the Canvas API. Your image never leaves your device, making this tool safe for brand assets and confidential logos.",
          },
          {
            question: "Can I use a non-square image?",
            answer:
              "Yes, but the output will be stretched to fit a square canvas. For the best results, crop your source image to a 1:1 aspect ratio before uploading, or use our Crop Image tool first.",
          },
          {
            question: "What format are the generated favicons?",
            answer:
              "All favicons are generated as PNG files. PNG is the recommended format for favicons because it supports transparency and produces crisp edges at small sizes.",
          },
        ]}
        relatedTools={[
          { name: "SVG to PNG", href: "/svg-to-png" },
          { name: "Resize Image", href: "/resize-image" },
          { name: "Compress Image", href: "/compress-image" },
          { name: "Image to Base64", href: "/image-to-base64" },
        ]}
      >
        <FaviconGeneratorTool />
      </ToolLayout>
    </>
  );
}
