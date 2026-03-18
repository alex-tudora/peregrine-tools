import { generateToolMetadata, generateToolStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { TimezoneConverterTool } from "./TimezoneConverterTool";

const toolName = "Timezone Converter";
const description =
  "Free online timezone converter. Convert times between UTC, EST, CST, MST, PST, GMT, CET, IST, JST, AEST, and more. Set current time with one click. No sign-up required.";
const keyword = "timezone converter";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/timezone-converter";

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
  "Select the source timezone from the dropdown.",
  "Select the target timezone from the dropdown.",
  "Enter a date and time, or click 'Now' to use the current time.",
  "View the converted time instantly.",
];

const about = `
  <p>
    The timezone converter lets you quickly translate a date and time from one timezone to
    another. It supports all major timezones worldwide, including UTC, EST, CST, MST, PST,
    GMT, CET, IST, JST, AEST, and many more. This is useful for scheduling international
    meetings, coordinating across remote teams, or planning travel.
  </p>
  <p>
    The "Now" button fills in the current date and time based on your device clock, saving
    you from manual entry. All conversions happen instantly in your browser with no server
    communication needed.
  </p>
`;

const faqs = [
  {
    question: "Does this tool handle Daylight Saving Time?",
    answer:
      "Yes. The converter uses the IANA timezone database via JavaScript's Intl API, which correctly accounts for DST transitions in all supported timezones.",
  },
  {
    question: "What timezones are supported?",
    answer:
      "The tool supports over 20 common timezones including UTC, EST, CST, MST, PST, AKST, HST, GMT, CET, EET, MSK, IST, ICT, CST (China), JST, KST, AEST, NZST, and more.",
  },
  {
    question: "Can I convert times in the past or future?",
    answer:
      "Yes. You can enter any date and time, past or future, and the tool will convert it accurately, including the correct DST offset for that specific date.",
  },
];

const relatedTools = [
  { name: "Date Difference", href: "/date-difference" },
  { name: "Age Calculator", href: "/age-calculator" },
  { name: "Unit Converter", href: "/unit-converter" },
  { name: "Percentage Calculator", href: "/percentage-calculator" },
];

export default function TimezoneConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ToolLayout
        title={toolName}
        subtitle="Convert times between timezones worldwide. Supports DST. Click 'Now' to start from the current time."
        keyword={keyword}
        howTo={howTo}
        about={about}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <TimezoneConverterTool />
      </ToolLayout>
    </>
  );
}
