import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { MortgageCalculatorTool } from "./MortgageCalculatorTool";

const toolName = "Mortgage Calculator";
const description =
  "Free online mortgage calculator. Enter home price, down payment, loan term, and interest rate to see monthly payments, total interest, and total cost. Visual principal vs interest breakdown.";
const keyword = "mortgage calculator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/mortgage-calculator";

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
  "Enter the home price.",
  "Set your down payment as a dollar amount or percentage.",
  "Choose the loan term: 15, 20, or 30 years.",
  "Enter the annual interest rate.",
  "View your monthly payment, total interest, and total cost with a visual breakdown.",
];

const about = `
  <p>
    A mortgage calculator helps you estimate monthly payments, total interest, and the overall
    cost of a home loan before you commit. By adjusting the home price, down payment, loan
    term, and interest rate, you can compare scenarios and find a payment plan that fits
    your budget.
  </p>
  <p>
    The calculator uses the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1],
    where M is the monthly payment, P is the loan principal, r is the monthly interest rate,
    and n is the number of payments. A visual bar shows the proportion of your total cost
    that goes toward principal versus interest, giving you an intuitive sense of the loan's
    true cost over time.
  </p>
`;

const faqs = [
  {
    question: "Does this include property tax and insurance?",
    answer:
      "This calculator computes principal and interest only. Property taxes, homeowner's insurance, PMI, and HOA fees are not included. Your actual monthly payment may be higher when these are added.",
  },
  {
    question: "What is a typical mortgage interest rate?",
    answer:
      "Mortgage rates vary by market conditions, credit score, loan type, and term length. As of recent years, rates have ranged roughly from 3% to 8%. Check with lenders for current rates.",
  },
  {
    question: "Should I choose a 15-year or 30-year loan?",
    answer:
      "A 15-year loan has higher monthly payments but significantly less total interest. A 30-year loan has lower monthly payments but costs more in interest over the life of the loan. Use this calculator to compare both.",
  },
];

const relatedTools = [
  { name: "Compound Interest", href: "/compound-interest" },
  { name: "Percentage Calculator", href: "/percentage-calculator" },
  { name: "Tip Calculator", href: "/tip-calculator" },
  { name: "Salary Calculator", href: "/salary-calculator" },
];

export default function MortgageCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Estimate monthly payments, total interest, and total cost of a home loan."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <MortgageCalculatorTool />
      </ToolLayout>
    </>
  );
}
