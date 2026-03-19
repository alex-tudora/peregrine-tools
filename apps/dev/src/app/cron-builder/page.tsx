import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { CronBuilderTool } from "./CronBuilderTool";

const toolName = "Cron Expression Generator — Visual Cron Builder";
const description =
  "Build and decode cron expressions visually. Generate cron schedules with a human-readable description and next execution times. Free online cron builder.";
const keyword = "cron expression generator";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/cron-builder";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Use the dropdowns to select values for each cron field (minute, hour, day of month, month, day of week)",
  "See the generated cron expression update in real time",
  "Or paste an existing cron expression into the input field to decode it",
  "Review the human-readable description and next 5 execution times",
];

const faqs = [
  {
    question: "What does * mean in a cron expression?",
    answer:
      "The asterisk (*) means 'every possible value' for that field. For example, * in the minute field means 'every minute', and * in the month field means 'every month'.",
  },
  {
    question: "What is the difference between 5-field and 6-field cron?",
    answer:
      "Standard Unix cron uses 5 fields (minute, hour, day of month, month, day of week). Some systems like Quartz add a sixth field for seconds. This tool uses the standard 5-field format.",
  },
  {
    question: "Can I use step values like */5?",
    answer:
      "Yes. The notation */5 in the minute field means 'every 5 minutes'. You can type any valid cron syntax into the expression input and the tool will parse it.",
  },
  {
    question: "How are the next execution times calculated?",
    answer:
      "The tool evaluates the cron expression against your local time zone and iterates forward minute by minute to find the next five matching times. This gives you a quick sanity check before deploying your schedule.",
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

export default function CronBuilderPage() {
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
        subtitle="Build cron expressions visually or paste one to decode it. See a human-readable description and the next 5 run times."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>cron expression</strong> is a compact string used by Unix-like schedulers (crontab,
            systemd timers, Kubernetes CronJobs, CI/CD pipelines) to define recurring schedules. The five
            fields represent minute, hour, day of month, month, and day of week, and together they can
            express nearly any repeating schedule from once per minute to once per year.
          </p>
          <p>
            Memorizing cron syntax is error-prone, especially for complex schedules involving ranges, step
            values, or combinations of fields. This visual <strong>cron builder</strong> lets you construct
            expressions by selecting from dropdowns and immediately see a plain-English description of what
            the schedule means. You can also paste an existing expression to verify it does what you expect.
          </p>
          <p>
            The next-execution preview calculates the upcoming five run times based on your current local
            time, so you can confirm the schedule before deploying it. All processing happens in your
            browser with no server calls.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Timestamp Converter", href: "/timestamp-converter" },
          { name: "Regex Tester", href: "/regex-tester" },
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "UUID Generator", href: "/uuid-generator" },
        ]}
      >
        <CronBuilderTool />
      </ToolLayout>
    </>
  );
}
