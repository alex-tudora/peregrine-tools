import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { ImageToBase64Tool } from "./ImageToBase64Tool";

const toolName = "Image to Base64 — Encode Images Online Free";
const description =
  "Convert any image to a Base64-encoded data URL string. Copy the result or use it directly in HTML and CSS. Free online tool — no sign-up, no file limits. Process files in your browser.";
const keyword = "image to base64";
const siteName = "Peregrine Pix";
const siteUrl = "https://peregrinepix.com";
const path = "/image-to-base64";

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
  "The Base64 string is generated immediately upon upload",
  "Copy the raw Base64 string, the HTML img tag, or the CSS background-image snippet",
  "Paste the code directly into your project",
];

const faqs = [
  {
    question: "When should I use Base64-encoded images?",
    answer:
      "Base64 embedding is ideal for small images (under 10 KB) like icons, logos, and simple graphics. For larger images, a regular file reference is usually more efficient because Base64 encoding increases the data size by about 33%.",
  },
  {
    question: "Does Base64 encoding increase file size?",
    answer:
      "Yes. Base64 encoding increases the data size by approximately 33% compared to the original binary file. This is a trade-off: you eliminate an HTTP request but add to the HTML/CSS payload size.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "The tool accepts JPEG, PNG, WebP, SVG, and GIF files. The output data URL includes the correct MIME type for each format.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All processing happens locally in your browser using the FileReader API. Your image never leaves your device, making this tool safe for personal or confidential files.",
  },
  {
    question: "Can I decode a Base64 string back to an image?",
    answer:
      "Yes — you can paste a Base64 data URL into a browser address bar to view the image, or use an online Base64-to-image decoder. The encoding is fully reversible.",
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

export default function ImageToBase64Page() {
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
        title="Image to Base64 — Encode Images Online Free"
        subtitle="Convert images to Base64 data URLs for embedding in HTML and CSS. Instantly. No sign-up required."
        keyword="image to base64"
        howTo={howTo}
        about={`
          <p>
            Embedding small images directly in HTML or CSS as Base64 data URLs
            eliminates extra HTTP requests and can speed up page loads for
            icons, logos, and UI sprites. Our free
            <strong> image to base64</strong> converter reads your file and
            produces the complete data URL string instantly — ready to paste
            into an <code>&lt;img&gt;</code> tag or a
            <code>background-image</code> CSS property.
          </p>
          <p>
            The tool shows you the raw Base64 string length and approximate
            file size so you can decide whether inline embedding makes sense
            for your use case. It also provides ready-to-use code snippets
            for both HTML and CSS, saving you from manual formatting.
          </p>
          <p>
            All processing happens in your browser using the FileReader API.
            Your images are never uploaded to a server, making this
            <strong> image to base64</strong> tool safe for proprietary
            graphics, brand assets, and confidential screenshots. There are
            no file-size limits, no watermarks, and no daily caps.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Compress Image", href: "/compress-image" },
          { name: "PNG to JPG", href: "/png-to-jpg" },
          { name: "SVG to PNG", href: "/svg-to-png" },
          { name: "Favicon Generator", href: "/favicon-generator" },
        ]}
      >
        <ImageToBase64Tool />
      </ToolLayout>
    </>
  );
}
