import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { QrCodeGeneratorTool } from "./QrCodeGeneratorTool";

const toolName = "QR Code Generator — Create QR Codes Free";
const description =
  "Generate QR codes for URLs, text, and more. Customize size and colors. Download as PNG. Free online QR code generator — no sign-up required.";
const keyword = "qr code generator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/qr-code-generator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Enter the URL or text you want to encode in the QR code",
  "Adjust the size using the slider (128px to 512px)",
  "Pick custom foreground and background colors if desired",
  "Preview the QR code in real time",
  "Click 'Download PNG' to save the QR code to your device",
];

const faqs = [
  {
    question: "What can I encode in a QR code?",
    answer:
      "You can encode any text, URL, email address, phone number, SMS message, Wi-Fi credentials, or vCard contact information. URLs are the most common use case.",
  },
  {
    question: "What size should my QR code be for print?",
    answer:
      "For print materials, a QR code should be at least 2 x 2 cm (about 0.8 x 0.8 inches) to ensure reliable scanning. Larger sizes are recommended for posters and billboards. Use the highest size setting (512px) for the best print quality.",
  },
  {
    question: "Can I use custom colors?",
    answer:
      "Yes. You can set both the foreground (the dark modules) and background colors. For best scanning reliability, maintain high contrast between the two colors. Dark foreground on a light background works best.",
  },
  {
    question: "Will the QR code work if I change the colors?",
    answer:
      "QR codes include error correction that allows them to be read even with some distortion. However, you should always maintain strong contrast between the foreground and background. Avoid using similar shades or very light foreground colors.",
  },
  {
    question: "Is there a character limit for QR codes?",
    answer:
      "Technically, a QR code can store up to 4,296 alphanumeric characters. However, more data means a denser code that can be harder to scan. For best results, keep your content concise — especially for URLs, use a URL shortener if needed.",
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

export default function QrCodeGeneratorPage() {
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
        title={toolName}
        subtitle="Generate customizable QR codes for any URL or text. Adjust size and colors, then download as PNG. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            QR codes are two-dimensional barcodes that can store URLs, text, contact information, and
            other data. When scanned with a smartphone camera, they instantly open the encoded content.
            <strong>QR codes</strong> are widely used in marketing materials, business cards, product
            packaging, restaurant menus, and event tickets.
          </p>
          <p>
            This <strong>QR code generator</strong> creates high-quality QR codes directly in your
            browser. You can customize the size from 128 to 512 pixels and choose custom foreground
            and background colors to match your brand. The generated QR code can be downloaded as a
            PNG image ready for print or digital use.
          </p>
          <p>
            All processing happens locally on your device. The text or URL you enter is never sent to
            any server, making this tool safe for encoding sensitive links, internal URLs, or
            unreleased content.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "UTM Builder", href: "/utm-builder" },
          { name: "Meta Tag Generator", href: "/meta-tag-generator" },
          { name: "Image to Base64", href: "https://peregrinepix.com/image-to-base64" },
          { name: "Open Graph Preview", href: "/open-graph-preview" },
        ]}
      >
        <QrCodeGeneratorTool />
      </ToolLayout>
    </>
  );
}
