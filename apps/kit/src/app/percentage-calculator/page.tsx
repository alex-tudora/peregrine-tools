import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { PercentageCalculatorTool } from "./PercentageCalculatorTool";

const toolName = "Percentage Calculator";
const description =
  "Free online percentage calculator. Find what percent of a number is, what percentage one number is of another, and calculate percentage change between two values. Instant results, no sign-up.";
const keyword = "percentage calculator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/percentage-calculator";

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

const howTo = [
  "Choose one of the three calculation modes: find a percentage of a number, find what percent one number is of another, or calculate percentage change.",
  "Enter the required values into the input fields.",
  "View the result instantly — it updates in real time as you type.",
];

const about = `
  <p>
    A percentage calculator is an essential everyday math tool. Whether you're figuring out
    a discount while shopping, calculating a grade on a test, or analyzing year-over-year
    business growth, percentages are everywhere. This free online percentage calculator
    combines the three most common percentage operations into a single convenient interface.
  </p>
  <p>
    "What is X% of Y?" helps you find a portion of a number — ideal for computing tips,
    taxes, or discounts. "X is what % of Y?" determines the ratio between two values as
    a percentage — perfect for grades, statistics, or proportions. "Percentage change from
    X to Y" calculates the increase or decrease between two values, commonly used in finance,
    analytics, and reporting. All calculations happen instantly in your browser with no
    server round-trip.
  </p>
`;

const faqs = [
  {
    question: "How do I calculate a percentage of a number?",
    answer:
      "To find X% of Y, multiply Y by X and divide by 100. For example, 15% of 200 is (200 × 15) / 100 = 30. Our calculator does this for you instantly.",
  },
  {
    question: "How do I find what percentage one number is of another?",
    answer:
      "Divide the part by the whole and multiply by 100. For example, 30 is (30 / 200) × 100 = 15% of 200.",
  },
  {
    question: "How is percentage change calculated?",
    answer:
      "Percentage change = ((New Value - Old Value) / Old Value) × 100. A positive result indicates an increase, while a negative result indicates a decrease.",
  },
  {
    question: "Is this calculator free?",
    answer:
      "Yes, completely free with no sign-up, no ads, and no usage limits. All calculations happen in your browser.",
  },
];

const relatedTools = [
  { name: "Tip Calculator", href: "/tip-calculator" },
  { name: "Compound Interest", href: "/compound-interest" },
  { name: "Unit Converter", href: "/unit-converter" },
  { name: "Salary Calculator", href: "/salary-calculator" },
];

export default function PercentageCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Three calculators in one: find a percentage, determine ratios, and calculate percentage change."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <PercentageCalculatorTool />
      </ToolLayout>
    </>
  );
}
