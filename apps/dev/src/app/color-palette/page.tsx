import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { ColorPaletteTool } from "./ColorPaletteTool";

const toolName = "Color Palette Generator — Create Color Schemes Free";
const description =
  "Generate harmonious color palettes instantly. Get complementary, analogous, triadic, split-complementary, and monochromatic schemes from any base color. Free and no sign-up.";
const keyword = "color palette generator";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/color-palette";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Choose a base color using the native color picker or type a HEX value (e.g. #3b82f6)",
  "View five palette types generated automatically: complementary, analogous, triadic, split-complementary, and monochromatic",
  "Click any color swatch to copy its HEX code to your clipboard",
  "Read the HEX, RGB, and HSL values shown below each swatch for use in your project",
];

const faqs = [
  {
    question: "What is a complementary color palette?",
    answer:
      "A complementary palette pairs colors that sit opposite each other on the color wheel (180° apart). These combinations create high contrast and strong visual impact, making them popular for call-to-action elements and logos.",
  },
  {
    question: "How does the analogous palette work?",
    answer:
      "Analogous palettes use colors that are neighbors on the color wheel, offset by 30° increments. Because the hues are close together, the result looks harmonious and natural — ideal for backgrounds, gradients, and cohesive UI themes.",
  },
  {
    question: "What is the difference between triadic and split-complementary?",
    answer:
      "A triadic palette uses three colors spaced evenly at 120° intervals, producing a vibrant balanced look. A split-complementary palette takes the complement of your base color and shifts it ±30°, which retains strong contrast but with less visual tension than a pure complementary pair.",
  },
  {
    question: "When should I use a monochromatic palette?",
    answer:
      "Monochromatic palettes vary the lightness and saturation of a single hue. They are excellent for creating clean, elegant designs where you want a cohesive feel without introducing competing hues — common in dashboards, cards, and minimalist interfaces.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All color calculations run entirely in your browser using HSL math. No data is sent to any server, and there are no usage limits or account requirements.",
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

export default function ColorPalettePage() {
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
        subtitle="Pick a base color and instantly generate five types of harmonious color schemes — complementary, analogous, triadic, split-complementary, and monochromatic. Click any swatch to copy."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>color palette generator</strong> is a must-have tool for designers, developers, and
            anyone building digital products. Choosing colors that work well together is one of the most
            impactful decisions in any design process, and understanding color theory makes that choice
            much easier. This tool applies the principles of the color wheel to produce five distinct
            palette types from a single base color.
          </p>
          <p>
            <strong>Complementary</strong> palettes offer maximum contrast by pairing opposite hues.
            <strong>Analogous</strong> palettes create smooth, natural progressions from neighboring hues.
            <strong>Triadic</strong> schemes balance vibrancy across three evenly spaced colors.
            <strong>Split-complementary</strong> palettes provide strong contrast with reduced tension. And
            <strong>monochromatic</strong> schemes keep everything in one hue family, varying only lightness
            and saturation for a polished, cohesive look.
          </p>
          <p>
            All calculations use HSL (Hue, Saturation, Lightness) math, converting your input to HSL,
            rotating the hue on the color wheel, and converting back. Everything runs in your browser —
            no server, no sign-up, no limits. Works on any device with a modern browser.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Color Picker", href: "/color-picker" },
          { name: "Hex to RGB", href: "/hex-to-rgb" },
        ]}
        nextStep={{ label: "Need a full color picker?", description: "Pick and convert colors in any format", href: "/color-picker" }}
      >
        <ColorPaletteTool />
      </ToolLayout>
    </>
  );
}
