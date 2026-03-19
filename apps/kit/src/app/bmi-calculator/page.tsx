import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { BmiCalculatorTool } from "./BmiCalculatorTool";

const toolName = "BMI Calculator";
const description =
  "Free online BMI calculator. Enter your height and weight in metric or imperial units to calculate your Body Mass Index. Color-coded result with visual BMI scale. No sign-up required.";
const keyword = "bmi calculator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/bmi-calculator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Select your preferred unit system: Metric (cm, kg) or Imperial (ft/in, lbs).",
  "Enter your height.",
  "Enter your weight.",
  "View your BMI value, category, and position on the visual scale.",
];

const about = `
  <p>
    Body Mass Index (BMI) is a simple measure that uses your height and weight to estimate
    whether you are underweight, normal weight, overweight, or obese. While BMI does not
    directly measure body fat, it is widely used as a screening tool to identify potential
    weight-related health risks.
  </p>
  <p>
    The formula is: BMI = weight (kg) / height (m)^2. For imperial units, the calculation
    is: BMI = (weight in lbs / height in inches^2) x 703. This calculator supports both
    metric and imperial units and displays a color-coded visual scale for easy interpretation.
    Note that BMI is a general guideline and does not account for factors like muscle mass,
    bone density, age, or gender.
  </p>
`;

const faqs = [
  {
    question: "What are the BMI categories?",
    answer:
      "The standard WHO categories are: Underweight (BMI < 18.5), Normal weight (18.5 - 24.9), Overweight (25 - 29.9), and Obese (30 or above).",
  },
  {
    question: "Is BMI accurate for athletes?",
    answer:
      "BMI can overestimate body fat in athletes and people with high muscle mass. It is a screening tool, not a diagnostic measure. Consult a healthcare professional for a complete assessment.",
  },
  {
    question: "Does this calculator work for children?",
    answer:
      "This calculator is designed for adults (ages 20 and older). BMI for children and teens is calculated differently and requires age- and sex-specific percentile charts.",
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
  { name: "Age Calculator", href: "/age-calculator" },
  { name: "Unit Converter", href: "/unit-converter" },
];

export default function BmiCalculatorPage() {
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
        subtitle="Calculate your Body Mass Index using metric or imperial units. Visual scale and color-coded categories."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <BmiCalculatorTool />
      </ToolLayout>
    </>
  );
}
