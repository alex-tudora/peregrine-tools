import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { AgeCalculatorTool } from "./AgeCalculatorTool";

const toolName = "Age Calculator";
const description =
  "Free online age calculator. Enter your date of birth and instantly see your exact age in years, months, and days. Also shows total months, weeks, days, and a countdown to your next birthday.";
const keyword = "age calculator";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/age-calculator";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Select your date of birth using the date picker.",
  "View your exact age broken down into years, months, and days.",
  "See additional details: total months, total weeks, total days, and a countdown to your next birthday.",
];

const about = `
  <p>
    The age calculator determines your exact age based on your date of birth and today's date.
    It provides a detailed breakdown including years, months, and days, as well as total months,
    total weeks, and total days you've been alive. It also counts down the days until your
    next birthday.
  </p>
  <p>
    This tool is useful for filling out forms that require exact age, determining eligibility for
    age-dependent services, or simply satisfying your curiosity about how many days you've lived.
    All calculations are performed instantly in your browser.
  </p>
`;

const faqs = [
  {
    question: "How does the age calculator handle leap years?",
    answer:
      "The calculator uses JavaScript's built-in Date object which correctly handles leap years, so February 29 birthdays and leap-year day counts are all accounted for accurately.",
  },
  {
    question: "Is the next birthday countdown accurate?",
    answer:
      "Yes, it calculates the exact number of days from today to your next birthday. If your birthday is today, it will show 0 days remaining and wish you a happy birthday.",
  },
  {
    question: "Can I calculate age for any date of birth?",
    answer:
      "Yes, you can enter any valid date. The calculator works for any past date, whether recent or historical.",
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
  { name: "Date Difference", href: "/date-difference" },
  { name: "Percentage Calculator", href: "/percentage-calculator" },
  { name: "BMI Calculator", href: "/bmi-calculator" },
  { name: "Timezone Converter", href: "/timezone-converter" },
];

export default function AgeCalculatorPage() {
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
        subtitle="Enter your date of birth to find your exact age, total days lived, and countdown to your next birthday."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
        nextStep={{ label: "Calculate date difference?", description: "Find the gap between any two dates", href: "/date-difference" }}
      >
        <AgeCalculatorTool />
      </ToolLayout>
    </>
  );
}
