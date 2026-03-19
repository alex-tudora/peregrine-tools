import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { TipCalculatorTool } from "./TipCalculatorTool";

const toolName = "Tip Calculator";
const description =
  "Free online tip calculator. Enter your bill amount, choose a tip percentage, and split between people. Shows tip amount, total, and per-person breakdown. No sign-up required.";
const keyword = "tip calculator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/tip-calculator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Enter the total bill amount.",
  "Select a tip percentage using the quick buttons or adjust the slider (0-30%).",
  "Set the number of people splitting the bill (default is 1).",
  "View the tip amount, total, and per-person breakdown instantly.",
];

const about = `
  <p>
    The tip calculator makes it easy to figure out how much to tip at restaurants, cafes, bars,
    or for any service. Enter your bill, pick a tip percentage, and optionally split it between
    multiple people. The calculator shows the tip amount, the total including tip, and a
    per-person breakdown if you are splitting.
  </p>
  <p>
    Quick tip buttons for 10%, 15%, 18%, 20%, and 25% let you choose common tip amounts
    with one click, while the slider gives you fine-grained control from 0% to 30%.
    All calculations happen in real time as you adjust any input.
  </p>
`;

const faqs = [
  {
    question: "What is a standard tip percentage?",
    answer:
      "In the United States, 15-20% is considered standard for restaurant service. 18% is common for larger parties. For exceptional service, 25% or more is generous.",
  },
  {
    question: "How does splitting the bill work?",
    answer:
      "When you set more than 1 person, the calculator divides both the tip and the total evenly among all people, showing each person's share.",
  },
  {
    question: "Can I use this for other services besides restaurants?",
    answer:
      "Absolutely. This calculator works for any service where tipping is customary, such as hair salons, taxis, delivery, hotel staff, and more.",
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
  { name: "Salary Calculator", href: "/salary-calculator" },
  { name: "Mortgage Calculator", href: "/mortgage-calculator" },
  { name: "Compound Interest", href: "/compound-interest" },
];

export default function TipCalculatorPage() {
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
        subtitle="Calculate the tip, total bill, and per-person split in seconds."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <TipCalculatorTool />
      </ToolLayout>
    </>
  );
}
