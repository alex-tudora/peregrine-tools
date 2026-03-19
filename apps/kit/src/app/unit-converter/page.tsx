import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { UnitConverterTool } from "./UnitConverterTool";

const toolName = "Unit Converter";
const description =
  "Free online unit converter. Convert length, weight, temperature, volume, area, speed, and data units instantly. Supports metric and imperial. No sign-up required.";
const keyword = "unit converter";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/unit-converter";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Select a category tab: Length, Weight, Temperature, Volume, Area, Speed, or Data.",
  "Choose the unit you are converting from using the left dropdown.",
  "Choose the unit you are converting to using the right dropdown.",
  "Enter a value and see the converted result instantly.",
];

const about = `
  <p>
    This unit converter handles seven major categories of measurements, covering both metric
    and imperial systems. Whether you need to convert kilometers to miles, kilograms to pounds,
    Celsius to Fahrenheit, or gigabytes to megabytes, this tool provides instant, accurate results.
  </p>
  <p>
    All conversions are performed in real time as you type. The converter supports the most
    commonly used units in each category, making it a quick reference tool for students,
    professionals, travelers, and anyone who needs to switch between measurement systems.
    Everything runs locally in your browser with zero latency.
  </p>
`;

const faqs = [
  {
    question: "How accurate are the conversions?",
    answer:
      "Conversions use precise mathematical formulas and conversion factors. Results are displayed with up to 6 significant digits for maximum accuracy.",
  },
  {
    question: "Does the temperature converter handle negative values?",
    answer:
      "Yes. You can enter negative values for temperature conversions, which is common when converting Celsius or Fahrenheit values below zero.",
  },
  {
    question: "What data units are supported?",
    answer:
      "The data category supports Bits, Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), Terabytes (TB), and Petabytes (PB).",
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

const relatedTools = [
  { name: "Percentage Calculator", href: "/percentage-calculator" },
  { name: "Timezone Converter", href: "/timezone-converter" },
  { name: "BMI Calculator", href: "/bmi-calculator" },
  { name: "Tip Calculator", href: "/tip-calculator" },
];

export default function UnitConverterPage() {
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
        subtitle="Convert between metric and imperial units across seven categories. Real-time results."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <UnitConverterTool />
      </ToolLayout>
    </>
  );
}
