import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { TimestampConverterTool } from "./TimestampConverterTool";

const toolName = "Unix Timestamp Converter — Epoch Time Converter";
const description =
  "Convert Unix timestamps to human-readable dates and vice versa. See UTC, local time, ISO 8601, and relative time. Live clock with current timestamp.";
const keyword = "unix timestamp converter";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/timestamp-converter";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Enter a Unix timestamp (in seconds or milliseconds) to see the corresponding date",
  "Or use the date picker to convert a date to a Unix timestamp",
  "Click 'Current Timestamp' to see the live-updating current epoch time",
  "Toggle between seconds and milliseconds as needed",
];

const faqs = [
  {
    question: "What is the Unix epoch?",
    answer:
      "The Unix epoch is January 1, 1970, 00:00:00 UTC. All Unix timestamps are measured as the number of seconds (or milliseconds) since this moment. It was chosen as an arbitrary but convenient starting point by early Unix developers.",
  },
  {
    question: "Seconds or milliseconds?",
    answer:
      "Standard Unix timestamps are in seconds (10 digits as of 2001). JavaScript's Date.now() and many APIs use milliseconds (13 digits). The tool auto-detects based on the number of digits, or you can toggle manually.",
  },
  {
    question: "Is the Year 2038 problem real?",
    answer:
      "Yes. 32-bit signed integers overflow on January 19, 2038. Most modern systems now use 64-bit integers for timestamps, which extends the range far beyond any practical concern. This tool uses JavaScript's 64-bit number type.",
  },
  {
    question: "Does it account for time zones?",
    answer:
      "Unix timestamps are always UTC. The tool shows both the UTC time and your local time (based on your browser's time zone setting) so you can compare them side by side.",
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

export default function TimestampConverterPage() {
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
        subtitle="Convert between Unix timestamps and human-readable dates. See the current timestamp update live."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>Unix timestamp</strong> (also called epoch time or POSIX time) is the number of
            seconds that have elapsed since January 1, 1970 at 00:00:00 UTC. It is the most common way
            to represent time in programming because it is a simple integer that is unambiguous across
            time zones.
          </p>
          <p>
            This converter translates timestamps to multiple human-readable formats: UTC date and time,
            your local date and time, ISO 8601 format (used in APIs and databases), and a relative
            description like "3 days ago" or "in 2 hours". It also converts in the reverse direction,
            turning a date and time into a Unix timestamp.
          </p>
          <p>
            The live clock shows the current timestamp updating every second, which is useful when you
            need to grab the current epoch time for testing or debugging. You can toggle between seconds
            and milliseconds precision, as some systems (like JavaScript's <code>Date.now()</code>) use
            milliseconds.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Cron Builder", href: "/cron-builder" },
          { name: "Date Difference", href: "https://peregrinekit.com/date-difference" },
          { name: "UUID Generator", href: "/uuid-generator" },
          { name: "Timezone Converter", href: "https://peregrinekit.com/timezone-converter" },
        ]}
      >
        <TimestampConverterTool />
      </ToolLayout>
    </>
  );
}
