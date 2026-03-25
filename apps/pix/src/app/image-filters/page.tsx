import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { ImageFiltersTool } from "./ImageFiltersTool";

const toolName = "Image Filters — Adjust Brightness, Contrast & More Free";
const description =
  "Apply image filters online for free. Adjust brightness, contrast, saturation, blur, grayscale, and sepia in real time. No uploads — everything runs in your browser.";
const keyword = "image filters";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/image-filters";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Upload your image file using the drop zone above",
  "Use the sliders to adjust brightness, contrast, saturation, blur, grayscale, and sepia",
  "Preview the filtered result in real time on the canvas",
  "Click \"Download\" to save the adjusted image as a PNG file",
];

const faqs = [
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All filter processing happens locally in your browser using the Canvas API. Your image never leaves your device, making this tool completely private and safe for confidential files.",
  },
  {
    question: "Can I combine multiple filters at once?",
    answer:
      "Yes. All six adjustments — brightness, contrast, saturation, blur, grayscale, and sepia — are applied simultaneously. Move any combination of sliders to achieve the exact look you want.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "You can upload JPEG, PNG, and WebP images. The filtered output is always exported as a high-quality PNG file to preserve the adjustments without additional compression artifacts.",
  },
  {
    question: "Will applying filters reduce my image quality?",
    answer:
      "The filters are applied at the original resolution of your image, so there is no loss of detail. The output PNG is lossless, preserving every pixel of the filtered result.",
  },
  {
    question: "How do I undo my changes?",
    answer:
      "Click the \"Reset filters\" button to return all sliders to their default values instantly. You can also click \"Start over\" to clear the image entirely and upload a new one.",
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

export default function ImageFiltersPage() {
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
        title="Image Filters — Adjust Brightness, Contrast & More Free"
        subtitle="Fine-tune your images with real-time brightness, contrast, saturation, and more. Instantly. No sign-up required."
        keyword="image filters"
        howTo={howTo}
        about={`
          <p>
            Need to quickly adjust the look of a photo without installing heavy
            software? Our free online <strong>image filters</strong> tool lets
            you tweak brightness, contrast, saturation, blur, grayscale, and
            sepia in real time — right inside your browser.
          </p>
          <p>
            Every adjustment is applied live on a canvas preview so you can see
            the result before downloading. Drag the brightness slider to lighten
            a dark photo, crank up the contrast to make details pop, or desaturate
            to grayscale for a classic black-and-white look. Combine multiple
            filters at once to get the exact aesthetic you are after.
          </p>
          <p>
            Because the entire process runs locally using the browser's Canvas API,
            your images are never uploaded to a server. This makes it perfectly safe
            to apply <strong>image filters</strong> to personal photos, proprietary
            design assets, or confidential screenshots. There are no file-size limits,
            no watermarks, and no daily caps.
          </p>
          <p>
            Once you are happy with the result, download the filtered image as a
            high-quality PNG. Pair this tool with our compressor, resizer, and
            cropper to build a complete image editing workflow without ever leaving
            your browser.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Compress Image", href: "/compress-image" },
          { name: "Resize Image", href: "/resize-image" },
          { name: "Crop Image", href: "/crop-image" },
          { name: "Flip & Rotate", href: "/flip-rotate" },
        ]}
        nextStep={{ label: "Ready to optimize?", description: "Compress your filtered image to reduce file size", href: "/compress-image" }}
      >
        <ImageFiltersTool />
      </ToolLayout>
    </>
  );
}
