import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { RemoveBackgroundTool } from "./RemoveBackgroundTool";

const toolName = "Remove Background — Background Remover Online Free";
const description =
  "Remove backgrounds from images using AI. Upload a photo and get a transparent PNG in seconds. Free online tool — no sign-up required.";
const keyword = "remove background";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/remove-background";

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

export default function RemoveBackgroundPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ToolLayout
        title="Remove Background — Background Remover Online Free"
        subtitle="Automatically remove image backgrounds with AI. Get a clean transparent PNG. No sign-up required."
        keyword="remove background"
        howTo={[
          "Upload your image file using the drop zone above or click to browse",
          "The AI model will automatically detect and remove the background",
          "Preview the result with the transparent background",
          "Download your image as a transparent PNG",
        ]}
        about={`
          <p>
            Removing the background from a photo is one of the most common
            image editing tasks — whether you are creating product listings,
            designing social media graphics, making profile pictures, or
            compositing images for presentations. Our free
            <strong> remove background</strong> tool uses AI to detect the
            foreground subject and strip away everything behind it, leaving
            you with a clean transparent PNG.
          </p>
          <p>
            Traditional background removal requires careful manual selection
            with tools like the pen tool or magic wand. AI-powered removal
            handles complex edges — hair, fur, semi-transparent objects —
            automatically and in seconds. No design skills are needed: just
            upload your photo and let the model do the work.
          </p>
          <p>
            We are committed to processing your images with full privacy.
            Once the AI model integration is complete, the tool will process
            files as efficiently as possible while keeping your data secure.
            There will be no watermarks on the output and no account
            required to use the service.
          </p>
        `}
        faqs={[
          {
            question: "When will AI background removal be available?",
            answer:
              "We are actively integrating a specialized AI model for background removal. The feature is coming soon — bookmark this page and check back for updates.",
          },
          {
            question: "Will this tool be free?",
            answer:
              "Yes. The core background removal feature will be free to use with no account required, consistent with all other tools on Peregrine Pix.",
          },
          {
            question: "What image formats will be supported?",
            answer:
              "The tool will accept JPEG, PNG, and WebP images. The output will always be a PNG file to preserve the transparent background.",
          },
          {
            question: "Will my images be uploaded to a server?",
            answer:
              "AI background removal requires a specialized model. We will provide clear information about data handling when the feature launches. Your privacy remains our top priority.",
          },
          {
            question: "Can I remove backgrounds from multiple images?",
            answer:
              "The tool will process one image at a time for the best results. After downloading, you can immediately upload another image.",
          },
        ]}
        relatedTools={[
          { name: "Crop Image", href: "/crop-image" },
          { name: "Compress Image", href: "/compress-image" },
          { name: "PNG to JPG", href: "/png-to-jpg" },
          { name: "Add Watermark", href: "/add-watermark" },
        ]}
      >
        <RemoveBackgroundTool />
      </ToolLayout>
    </>
  );
}
