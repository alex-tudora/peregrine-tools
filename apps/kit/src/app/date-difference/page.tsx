import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { DateDifferenceTool } from "./DateDifferenceTool";

const toolName = "Date Difference Calculator";
const description =
  "Free online date difference calculator. Find the exact time between two dates in years, months, days, weeks, and hours. Toggle include/exclude end date. No sign-up required.";
const keyword = "date difference calculator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/date-difference";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Select the start date using the first date picker.",
  "Select the end date using the second date picker.",
  "Optionally toggle whether to include the end date in the count.",
  "View the difference in years, months, days, total days, total weeks, and total hours.",
];

const about = `
  <p>
    The date difference calculator computes the exact duration between any two dates. It breaks
    down the result into years, months, and days, and also provides totals in days, weeks,
    and hours. This is useful for project planning, tracking durations, calculating age at a
    specific date, or counting days until an event.
  </p>
  <p>
    The include/exclude end date toggle lets you choose whether the end date itself should be
    counted. For example, the difference between January 1 and January 3 is either 2 days
    (exclusive) or 3 days (inclusive), depending on your needs. All calculations run instantly
    in your browser.
  </p>
`;

const faqs = [
  {
    question: "Does this calculator account for leap years?",
    answer:
      "Yes. The calculator uses JavaScript's Date object which correctly handles leap years, so calculations spanning February in a leap year are accurate.",
  },
  {
    question: "What does 'include end date' mean?",
    answer:
      "When enabled, the end date itself is counted as a full day. This is useful for scenarios like hotel stays or rental periods where both the start and end dates count.",
  },
  {
    question: "Can I enter dates in any order?",
    answer:
      "Yes. The calculator automatically determines which date is earlier and calculates the absolute difference between them.",
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
  { name: "Age Calculator", href: "/age-calculator" },
  { name: "Timezone Converter", href: "/timezone-converter" },
  { name: "Percentage Calculator", href: "/percentage-calculator" },
  { name: "Unit Converter", href: "/unit-converter" },
];

export default function DateDifferencePage() {
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
        subtitle="Find the exact duration between two dates in years, months, days, weeks, and hours."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <DateDifferenceTool />
      </ToolLayout>
    </>
  );
}
