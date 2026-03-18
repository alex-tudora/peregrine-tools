import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { ColorPickerTool } from "./ColorPickerTool";

const toolName = "Color Picker — HEX, RGB, HSL Converter Online Free";
const description =
  "Pick a color and instantly see HEX, RGB, HSL, and CMYK values. Generate complementary colors and shade palettes. Free online color picker — no sign-up required.";
const keyword = "color picker";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/color-picker";

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

export default function ColorPickerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Pick any color and see its HEX, RGB, HSL, and CMYK values with a shade palette and complementary color. Instantly. No sign-up required."
        keyword={keyword}
        howTo={[
          "Use the native color picker or type a color value in any format (HEX, RGB, HSL)",
          "View all color format values (HEX, RGB, HSL, CMYK) updated in real time",
          "Click 'Copy' next to any format to copy the value to your clipboard",
          "Explore the complementary color and lighter/darker shade palette below",
        ]}
        about={`
          <p>
            A <strong>color picker</strong> is an essential tool for web developers, designers, and
            anyone working with digital colors. It lets you select a color visually or enter it in
            any format and instantly see the equivalent values in HEX, RGB, HSL, and CMYK — the
            four most common color representations used in web development, graphic design, and
            print production.
          </p>
          <p>
            This free <strong>color picker</strong> accepts input in any format and auto-detects
            whether you are entering a HEX code, RGB values, or HSL values. It displays a large
            color preview swatch alongside the complementary color (the opposite on the color
            wheel). A shade palette shows five lighter and five darker variations of your selected
            color, which is useful for creating cohesive color schemes and ensuring sufficient
            contrast for accessibility.
          </p>
          <p>
            All calculations happen locally in your browser. No data is sent to a server, and
            there are no usage limits or account requirements. The tool works on any device with
            a modern browser.
          </p>
        `}
        faqs={[
          {
            question: "What color formats are supported?",
            answer:
              "The tool supports HEX (#ff5733), RGB (rgb(255, 87, 51)), HSL (hsl(14, 100%, 60%)), and CMYK values. You can input in any of these formats and the tool will display all four.",
          },
          {
            question: "What is a complementary color?",
            answer:
              "A complementary color is the color on the opposite side of the color wheel. It is calculated by rotating the hue by 180 degrees in HSL color space. Complementary colors create high contrast and visual impact when used together.",
          },
          {
            question: "How are the shade palettes generated?",
            answer:
              "The tool generates five lighter shades by progressively increasing the lightness in HSL color space, and five darker shades by decreasing it. This creates a smooth gradient from light to dark for your chosen hue.",
          },
          {
            question: "What is CMYK used for?",
            answer:
              "CMYK (Cyan, Magenta, Yellow, Key/Black) is the color model used in print production. The conversion shown here is an approximation — for precise print colors, use a color management system with ICC profiles.",
          },
          {
            question: "Is my data stored anywhere?",
            answer:
              "No. All color calculations happen locally in your browser. No data is sent to any server.",
          },
        ]}
        relatedTools={[
          { name: "Hex to RGB", href: "/hex-to-rgb" },
          { name: "CSS Minifier", href: "/css-minifier" },
          { name: "Base64 Encode/Decode", href: "/base64" },
          {
            name: "Image to Base64",
            href: "https://peregrinepix.com/image-to-base64",
          },
        ]}
      >
        <ColorPickerTool />
      </ToolLayout>
    </>
  );
}
