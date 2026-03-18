import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { CompoundInterestTool } from "./CompoundInterestTool";

const toolName = "Compound Interest Calculator";
const description =
  "Free online compound interest calculator. Enter principal, rate, time, compounding frequency, and monthly contributions. See final amount, total interest, and year-by-year breakdown.";
const keyword = "compound interest calculator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/compound-interest";

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
  "Enter your initial principal (starting amount).",
  "Set the annual interest rate as a percentage.",
  "Choose the time period in years.",
  "Select the compounding frequency (annually, semi-annually, quarterly, monthly, or daily).",
  "Optionally enter a monthly contribution amount.",
  "View the final amount, total interest earned, total contributions, and a year-by-year breakdown.",
];

const about = `
  <p>
    Compound interest is interest calculated on both the initial principal and the accumulated
    interest from previous periods. This "interest on interest" effect causes wealth to grow
    exponentially over time, making it one of the most powerful concepts in personal finance
    and investing.
  </p>
  <p>
    This calculator lets you model different scenarios by adjusting the principal, rate,
    compounding frequency, and monthly contributions. The year-by-year breakdown table
    shows you exactly how your money grows over time, making it easy to visualize the
    long-term impact of regular saving and compound growth.
  </p>
`;

const faqs = [
  {
    question: "What is the difference between compound and simple interest?",
    answer:
      "Simple interest is calculated only on the initial principal. Compound interest is calculated on the principal plus all previously accumulated interest, leading to exponential growth.",
  },
  {
    question: "How does compounding frequency affect returns?",
    answer:
      "The more frequently interest is compounded, the more total interest you earn. Daily compounding yields slightly more than monthly, which yields more than annually. However, the differences are usually small for typical rates.",
  },
  {
    question: "What is the compound interest formula?",
    answer:
      "A = P(1 + r/n)^(nt), where A is the final amount, P is principal, r is the annual rate (decimal), n is the number of times compounded per year, and t is years.",
  },
];

const relatedTools = [
  { name: "Mortgage Calculator", href: "/mortgage-calculator" },
  { name: "Percentage Calculator", href: "/percentage-calculator" },
  { name: "Salary Calculator", href: "/salary-calculator" },
  { name: "Tip Calculator", href: "/tip-calculator" },
];

export default function CompoundInterestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Calculate compound interest with optional monthly contributions. View a year-by-year growth breakdown."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <CompoundInterestTool />
      </ToolLayout>
    </>
  );
}
