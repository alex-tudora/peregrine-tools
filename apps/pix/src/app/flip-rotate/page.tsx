import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { FlipRotateTool } from "./FlipRotateTool";

const toolName = "Flip & Rotate Image — Rotate Image Online Free";
const description =
  "Flip images horizontally or vertically and rotate by 90, 180, 270, or any custom degree. Free online tool — no sign-up, no file limits. Process files in your browser.";
const keyword = "rotate image online";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/flip-rotate";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your image file using the drop zone above or click to browse",
  "Use the action buttons to flip horizontally, flip vertically, or rotate by preset angles",
  "Optionally enter a custom rotation degree for precise control",
  "Preview updates immediately after each action",
  "Click \"Download\" to save your transformed image",
];

const faqs = [
  {
    question: "Does rotating an image reduce its quality?",
    answer:
      "Rotations by 90, 180, or 270 degrees are effectively lossless. Arbitrary-angle rotations require interpolation, which can introduce slight softening. The effect is negligible for most use cases.",
  },
  {
    question: "Can I combine flip and rotate?",
    answer:
      "Yes. Each action is applied cumulatively. You can flip horizontally, then rotate 90 degrees, and the preview will show the combined result. Apply as many transformations as you need before downloading.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All processing happens locally in your browser using the Canvas API. Your image never leaves your device, making this tool safe for personal or confidential files.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "The tool accepts JPEG, PNG, and WebP images. The output is saved as a PNG to preserve quality and any transparency in the original image.",
  },
  {
    question: "Can I undo a transformation?",
    answer:
      "There is no undo button, but you can click \"Change file\" to start over with the original image and apply a different set of transformations.",
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

export default function FlipRotatePage() {
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
        title="Flip & Rotate Image — Rotate Image Online Free"
        subtitle="Flip or rotate your images to any angle with a live preview. Instantly. No sign-up required."
        keyword="rotate image online"
        howTo={howTo}
        about={`
          <p>
            Sometimes an image is almost perfect — it just needs to be flipped
            or rotated. Maybe your camera saved a photo upside-down, or you
            need a mirror image for a design layout. Our free online tool lets
            you <strong>rotate image online</strong> or flip it in any
            direction with a single click and instant preview.
          </p>
          <p>
            Choose from preset rotations — 90 degrees clockwise, 180 degrees,
            or 270 degrees clockwise — or type in any custom angle for precise
            control. Flip horizontally to create a mirror image, or flip
            vertically to invert top-to-bottom. Each transformation updates
            the preview immediately so you can see exactly what you will get
            before downloading.
          </p>
          <p>
            The tool runs entirely in your browser using the Canvas API. Your
            images are never uploaded to a server, making it safe to
            <strong> rotate image online</strong> files that contain personal
            photos, client work, or confidential content. There are no
            file-size limits, no watermarks, and no daily caps.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Crop Image", href: "/crop-image" },
          { name: "Resize Image", href: "/resize-image" },
          { name: "Compress Image", href: "/compress-image" },
          {
            name: "Rotate PDF",
            href: "https://peregrinepdf.com/rotate-pdf",
          },
        ]}
        nextStep={{ label: "Resize the image?", description: "Scale to exact dimensions", href: "/resize-image" }}
      >
        <FlipRotateTool />
      </ToolLayout>
    </>
  );
}
