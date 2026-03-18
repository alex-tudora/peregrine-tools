import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { GpaCalculatorTool } from "./GpaCalculatorTool";

const toolName = "GPA Calculator";
const description =
  "Free online GPA calculator. Add your courses with credits and grades to calculate your weighted GPA on a 4.0 scale. Dynamic course list with add/remove. No sign-up required.";
const keyword = "gpa calculator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/gpa-calculator";

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
  "Enter a course name (optional, for your reference).",
  "Set the number of credits for each course.",
  "Select the letter grade you received from the dropdown.",
  "Add more courses using the 'Add Course' button.",
  "View your weighted GPA and total credits at the bottom.",
];

const about = `
  <p>
    A GPA (Grade Point Average) calculator determines your weighted average grade across
    all courses, accounting for the number of credits each course is worth. Courses with
    more credits have a greater impact on your overall GPA.
  </p>
  <p>
    This calculator uses the standard 4.0 scale: A+ and A = 4.0, A- = 3.7, B+ = 3.3,
    B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7,
    and F = 0.0. The weighted GPA is calculated by multiplying each course's grade points
    by its credits, summing those products, and dividing by total credits.
  </p>
`;

const faqs = [
  {
    question: "How is weighted GPA calculated?",
    answer:
      "Weighted GPA = Sum of (grade points x credits) / total credits. For example, an A (4.0) in a 3-credit course and a B (3.0) in a 4-credit course gives: (4.0x3 + 3.0x4) / (3+4) = 24/7 = 3.43.",
  },
  {
    question: "What GPA scale does this use?",
    answer:
      "The standard 4.0 scale used by most US colleges and universities. A+ and A = 4.0, A- = 3.7, down to F = 0.0.",
  },
  {
    question: "Can I calculate a cumulative GPA across multiple semesters?",
    answer:
      "Yes. Simply add all courses from all semesters into the table. The calculator will compute the overall weighted GPA across all entries.",
  },
];

const relatedTools = [
  { name: "Percentage Calculator", href: "/percentage-calculator" },
  { name: "Age Calculator", href: "/age-calculator" },
  { name: "Compound Interest", href: "/compound-interest" },
  { name: "Unit Converter", href: "/unit-converter" },
];

export default function GpaCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Add your courses, credits, and grades to calculate your weighted GPA on a 4.0 scale."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <GpaCalculatorTool />
      </ToolLayout>
    </>
  );
}
