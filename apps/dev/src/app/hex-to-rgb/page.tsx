import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { HexToRgbTool } from "./HexToRgbTool";

const toolName = "Hex to RGB Converter — Color Code Converter";
const description =
  "Convert hex color codes to RGB, RGBA, HSL, and HSLA values instantly. Also convert RGB to hex. Live color preview and one-click copy. Free, no sign-up required.";
const keyword = "hex to rgb";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/hex-to-rgb";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Enter a hex color code (e.g. #FF5733) in the hex input field",
  "View the converted RGB, RGBA, HSL, and HSLA values in real time",
  "Use the RGB inputs to convert in the reverse direction (RGB to hex)",
  "Click any copy button to copy a value to your clipboard",
];

const faqs = [
  {
    question: "Do I need to include the # symbol?",
    answer:
      "No. The tool automatically adds the # prefix if you omit it. You can type FF5733 or #FF5733 and both will work.",
  },
  {
    question: "What hex formats are supported?",
    answer:
      "The tool supports 3-character shorthand (e.g. #F00), 6-character standard (e.g. #FF0000), and 8-character hex with alpha (e.g. #FF0000FF). Shorthand values are automatically expanded.",
  },
  {
    question: "How is HSL calculated?",
    answer:
      "HSL values are calculated from the RGB components using the standard conversion algorithm. Hue is expressed in degrees (0-360), while saturation and lightness are percentages (0-100%).",
  },
  {
    question: "Is the alpha value preserved?",
    answer:
      "Yes. If you enter an 8-character hex code, the alpha channel is extracted and applied to the RGBA and HSLA outputs. You can also manually adjust the alpha slider.",
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

export default function HexToRgbPage() {
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
        subtitle="Convert between hex and RGB color formats in real time. Preview colors and copy values instantly."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            Converting between <strong>hex and RGB</strong> color codes is one of the most common tasks
            in front-end development and design. Hex codes are compact and widely used in CSS, while RGB
            values are often needed for JavaScript, design tools, and accessibility calculations. This
            converter handles both directions instantly.
          </p>
          <p>
            In addition to RGB, the tool converts to RGBA (with adjustable alpha), HSL, and HSLA formats.
            HSL is particularly useful for designers because it maps directly to human perception of hue,
            saturation, and lightness, making it easier to create harmonious color palettes.
          </p>
          <p>
            All processing happens entirely in your browser. No color data is sent to any server. The live
            preview swatch updates as you type, so you can visually confirm the color before copying the
            value into your code.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Color Picker", href: "/color-picker" },
          { name: "CSS Minifier", href: "/css-minifier" },
          { name: "Base64 Encode/Decode", href: "/base64" },
          { name: "Image to Base64", href: "https://peregrinepix.com/image-to-base64" },
        ]}
        nextStep={{ label: "Pick a new color?", description: "Visual color picker with all formats", href: "/color-picker" }}
      >
        <HexToRgbTool />
      </ToolLayout>
    </>
  );
}
