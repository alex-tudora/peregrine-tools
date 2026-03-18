import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import CropImageTool from "./CropImageTool";

const toolName = "Crop Image — Cut & Trim Online Free";
const description =
  "Crop images to any size or aspect ratio. Free online image cropper — no sign-up, no file limits. Process files in your browser.";
const keyword = "crop image";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/crop-image";

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

export default function CropImagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title="Crop Image — Cut & Trim Online Free"
        subtitle="Trim your image to the exact region you need. Instantly. No sign-up required."
        keyword="crop image"
        howTo={[
          "Upload your image file using the drop zone above",
          "Choose a preset aspect ratio or use free-form cropping",
          "Adjust the crop region using the X, Y, Width, and Height inputs",
          'Click "Crop Image" to extract the selected area',
          "Download your cropped image",
        ]}
        about={`
          <p>
            Need to trim a screenshot, cut a subject out of a photo, or reframe
            an image for social media? Our free online tool lets you
            <strong>crop image</strong> files with precision, giving you full
            control over the exact region you keep.
          </p>
          <p>
            Start by selecting a preset aspect ratio — 1:1 for profile pictures,
            16:9 for presentations, 4:3 for classic prints, or 3:2 for standard
            photos. Alternatively, choose Free mode and type in the exact pixel
            coordinates of the region you want. The visual preview updates in
            real time so you always know what your final image will look like.
          </p>
          <p>
            Like all Peregrine Pix tools, the cropper runs entirely in your
            browser using the Canvas API. Your images are never uploaded to a
            server, which means you can <strong>crop image</strong> files
            containing personal photos, confidential screenshots, or proprietary
            designs with complete privacy. There are no file-size limits, no
            watermarks, and no daily caps.
          </p>
          <p>
            Combine cropping with our resize and compress tools to prepare
            perfectly sized, optimized images for any platform — all without
            installing software or creating an account.
          </p>
        `}
        faqs={[
          {
            question: "Can I crop to a specific aspect ratio?",
            answer:
              "Yes. The tool offers preset ratios including 1:1, 4:3, 16:9, and 3:2. Select a preset and the crop region will automatically lock to that ratio. Choose Free to crop without any constraints.",
          },
          {
            question: "Does cropping reduce image quality?",
            answer:
              "No. Cropping extracts the selected region pixel-for-pixel from the original image. The output is the same quality as the source — no re-compression is applied unless you choose a lossy output format.",
          },
          {
            question: "What image formats are supported?",
            answer:
              "You can upload JPEG, PNG, and WebP files. The output is exported as PNG by default to preserve quality, but you can change the format if needed.",
          },
          {
            question: "Are my images uploaded to a server?",
            answer:
              "No. All processing happens locally in your browser using the Canvas API. Your image never leaves your device, making this tool safe for personal or confidential files.",
          },
          {
            question: "Can I crop multiple images at once?",
            answer:
              "This tool handles one image at a time to give you precise control over each crop. After downloading the result, click \"Crop another\" to process the next image.",
          },
        ]}
        relatedTools={[
          { name: "Resize Image", href: "/resize-image" },
          { name: "Compress Image", href: "/compress-image" },
          { name: "Flip & Rotate", href: "/flip-rotate" },
          { name: "Add Watermark", href: "/add-watermark" },
        ]}
      >
        <CropImageTool />
      </ToolLayout>
    </>
  );
}
