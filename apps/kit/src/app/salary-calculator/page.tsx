import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { SalaryCalculatorTool } from "./SalaryCalculatorTool";

const toolName = "Salary Calculator";
const description =
  "Free salary to hourly converter. Enter a salary amount for any pay period and see instant conversions to hourly, daily, weekly, bi-weekly, monthly, and annual equivalents. Assumes 40 hrs/week, 52 weeks/year.";
const keyword = "salary to hourly";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/salary-calculator";

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
  "Enter a salary or wage amount.",
  "Select the pay period: hourly, daily, weekly, bi-weekly, monthly, or annually.",
  "View the equivalent amounts for all other pay periods instantly.",
];

const about = `
  <p>
    The salary calculator converts a pay amount from one period to all other standard pay periods.
    Whether you know your annual salary and want to find your hourly rate, or you have an hourly
    wage and want to know the yearly equivalent, this tool does it instantly. It uses the standard
    assumptions of 40 hours per week, 52 weeks per year, and 260 work days per year.
  </p>
  <p>
    This is useful for comparing job offers that use different pay structures, budgeting your
    income, or understanding what your time is really worth. All conversions happen in real time
    in your browser.
  </p>
`;

const faqs = [
  {
    question: "What assumptions does this calculator make?",
    answer:
      "It assumes a standard full-time schedule: 40 hours per week, 52 weeks per year, and 260 work days per year. Monthly is calculated as annual / 12. Bi-weekly is calculated as annual / 26.",
  },
  {
    question: "Does this account for taxes?",
    answer:
      "No, this calculator shows gross (pre-tax) conversions only. Your actual take-home pay will be lower after federal, state, and local taxes, as well as other deductions.",
  },
  {
    question: "How do I compare hourly and salaried jobs?",
    answer:
      "Enter the hourly rate or annual salary into this calculator to see the equivalent in all periods. This lets you compare offers directly, though you should also consider benefits, PTO, and other compensation factors.",
  },
];

const relatedTools = [
  { name: "Percentage Calculator", href: "/percentage-calculator" },
  { name: "Tip Calculator", href: "/tip-calculator" },
  { name: "Compound Interest", href: "/compound-interest" },
  { name: "Mortgage Calculator", href: "/mortgage-calculator" },
];

export default function SalaryCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Convert between hourly, daily, weekly, bi-weekly, monthly, and annual pay. Standard 40 hr/week."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <SalaryCalculatorTool />
      </ToolLayout>
    </>
  );
}
