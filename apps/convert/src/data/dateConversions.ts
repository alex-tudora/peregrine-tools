import type { ConversionDef } from "./conversions";

/**
 * Date-format conversion pages.
 *
 * Each entry targets a specific keyword (e.g. "US date to EU date",
 * "date to Unix timestamp"). The actual tool shows ALL formats at once,
 * but these pages give us SEO landing pages for specific conversions.
 */
export const dateConversions: ConversionDef[] = [
  {
    slug: "us-to-eu-date",
    from: "US Date",
    to: "EU Date",
    category: "date",
    toolName: "US to EU Date Converter",
    description:
      "Convert US date format (MM/DD/YYYY) to European format (DD/MM/YYYY) instantly. Auto-detects input and shows all common formats.",
    keyword: "US date to EU date",
    subtitle: "Switch from MM/DD/YYYY to DD/MM/YYYY in one click",
    componentKey: "DateFormatConverterTool",
    componentProps: { fromFormat: "us", toFormat: "eu" },
    acceptedExtensions: [],
    howTo: [
      "Type a US-format date like 03/26/2026 or use the date picker.",
      "The EU format (26/03/2026) and all other formats appear instantly.",
      "Click Copy next to any format to copy it to your clipboard.",
    ],
    about:
      '<p>The United States uses MM/DD/YYYY while most of Europe uses DD/MM/YYYY. This can cause confusion — is 03/04/2026 March 4th or April 3rd? This tool resolves ambiguity by showing every common date format side by side.</p><p>All processing happens in your browser. No data is sent anywhere.</p>',
    faqs: [
      {
        question: "Why do the US and Europe use different date formats?",
        answer:
          "The US inherited the month-first format from British colonial usage. Most other countries later adopted the day-first format, which reads from smallest to largest unit. ISO 8601 (YYYY-MM-DD) is the international standard designed to avoid ambiguity.",
      },
      {
        question: "How does the tool know which format I typed?",
        answer:
          "The tool auto-detects common formats. If the first number is greater than 12, it assumes DD/MM. For ambiguous dates (like 03/04/2026), it defaults to US format (MM/DD). Use the date picker for certainty.",
      },
      {
        question: "Can I paste a Unix timestamp?",
        answer:
          "Yes — paste a number like 1774588800 and the tool will convert it to all human-readable formats.",
      },
    ],
    relatedSlugs: ["eu-to-us-date", "date-to-iso", "date-to-timestamp"],
    requiresFFmpeg: false,
  },
  {
    slug: "eu-to-us-date",
    from: "EU Date",
    to: "US Date",
    category: "date",
    toolName: "EU to US Date Converter",
    description:
      "Convert European date format (DD/MM/YYYY) to US format (MM/DD/YYYY). Supports auto-detection and shows all formats at once.",
    keyword: "EU date to US date",
    subtitle: "Switch from DD/MM/YYYY to MM/DD/YYYY effortlessly",
    componentKey: "DateFormatConverterTool",
    componentProps: { fromFormat: "eu", toFormat: "us" },
    acceptedExtensions: [],
    howTo: [
      "Enter a European-format date like 26/03/2026 or pick from the calendar.",
      "The US format (03/26/2026) and all other formats appear instantly.",
      "Copy any format with one click.",
    ],
    about:
      '<p>Converts DD/MM/YYYY dates (used across Europe, South America, and much of Asia) to MM/DD/YYYY (used in the United States). The tool also shows ISO 8601, long date formats, Unix timestamps, and more.</p>',
    faqs: [
      {
        question: "What if my date is ambiguous?",
        answer:
          "For dates where both values are 12 or below (e.g. 03/04/2026), the tool defaults to US format. Use the date picker or ISO format (2026-04-03) to avoid ambiguity.",
      },
      {
        question: "Does this handle dates with dots (26.03.2026)?",
        answer:
          "Yes — the parser recognises DD.MM.YYYY as a European format when the day is greater than 12.",
      },
      {
        question: "Is the conversion instant?",
        answer: "Yes — all formats update as you type. Nothing is uploaded to a server.",
      },
    ],
    relatedSlugs: ["us-to-eu-date", "date-to-iso", "iso-to-date"],
    requiresFFmpeg: false,
  },
  {
    slug: "date-to-timestamp",
    from: "Date",
    to: "Unix Timestamp",
    category: "date",
    toolName: "Date to Unix Timestamp Converter",
    description:
      "Convert any date to a Unix timestamp (seconds since January 1, 1970). Supports multiple input formats and instant conversion.",
    keyword: "date to Unix timestamp",
    subtitle: "Get the Unix epoch timestamp for any date",
    componentKey: "DateFormatConverterTool",
    componentProps: { fromFormat: "any", toFormat: "timestamp" },
    acceptedExtensions: [],
    howTo: [
      "Type a date in any format or use the date picker.",
      "Find the Unix timestamp in the results below.",
      "Click Copy to grab the timestamp for your code or database.",
    ],
    about:
      '<p>A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC). It is the standard way to represent dates in most programming languages, databases, and APIs.</p><p>This tool converts human-readable dates to Unix timestamps and also shows all other common formats.</p>',
    faqs: [
      {
        question: "What is a Unix timestamp?",
        answer:
          "It is the count of seconds since the Unix epoch: midnight UTC on January 1, 1970. For example, 1774588800 represents March 26, 2026.",
      },
      {
        question: "Is the timestamp in seconds or milliseconds?",
        answer:
          "This tool outputs seconds. For milliseconds (as used by JavaScript), multiply by 1000.",
      },
      {
        question: "Does the timestamp account for time zones?",
        answer:
          "Unix timestamps are always UTC. The date you enter is treated as midnight UTC.",
      },
    ],
    relatedSlugs: ["timestamp-to-date", "date-to-iso", "us-to-eu-date"],
    requiresFFmpeg: false,
  },
  {
    slug: "timestamp-to-date",
    from: "Unix Timestamp",
    to: "Date",
    category: "date",
    toolName: "Unix Timestamp to Date Converter",
    description:
      "Convert a Unix timestamp to a human-readable date. Supports both seconds and milliseconds timestamps.",
    keyword: "Unix timestamp to date",
    subtitle: "Turn Unix epoch seconds into a readable date",
    componentKey: "DateFormatConverterTool",
    componentProps: { fromFormat: "timestamp", toFormat: "any" },
    acceptedExtensions: [],
    howTo: [
      "Paste a Unix timestamp (e.g. 1774588800) into the text field.",
      "All date formats appear instantly.",
      "Copy the format you need.",
    ],
    about:
      '<p>Converts Unix epoch timestamps to every common human-readable date format. Accepts both seconds (10 digits) and milliseconds (13 digits) timestamps. Useful for debugging APIs, database records, and log files.</p>',
    faqs: [
      {
        question: "How do I know if my timestamp is in seconds or milliseconds?",
        answer:
          "Seconds timestamps are 10 digits (e.g. 1774588800). Milliseconds are 13 digits (e.g. 1774588800000). The tool detects this automatically.",
      },
      {
        question: "What is the maximum timestamp supported?",
        answer:
          "JavaScript Date supports timestamps up to the year 275760. Any reasonable timestamp will work.",
      },
      {
        question: "Can I convert negative timestamps?",
        answer:
          "Negative timestamps represent dates before January 1, 1970. The tool may handle some negative values but results vary by browser.",
      },
    ],
    relatedSlugs: ["date-to-timestamp", "date-to-iso", "us-to-eu-date"],
    requiresFFmpeg: false,
  },
  {
    slug: "date-to-iso",
    from: "Date",
    to: "ISO 8601",
    category: "date",
    toolName: "Date to ISO 8601 Converter",
    description:
      "Convert any date to ISO 8601 format (YYYY-MM-DD). The international standard for unambiguous date representation.",
    keyword: "date to ISO 8601",
    subtitle: "Get the unambiguous ISO date for any input",
    componentKey: "DateFormatConverterTool",
    componentProps: { fromFormat: "any", toFormat: "iso" },
    acceptedExtensions: [],
    howTo: [
      "Enter a date in any format — US, EU, long form, or timestamp.",
      "The ISO 8601 format (YYYY-MM-DD) appears in the results.",
      "Copy the ISO date for your database, API, or code.",
    ],
    about:
      '<p>ISO 8601 (YYYY-MM-DD) is the international standard for date formatting, endorsed by ISO and adopted by most databases, APIs, and programming languages. It eliminates the MM/DD vs DD/MM ambiguity and sorts correctly as a string.</p>',
    faqs: [
      {
        question: "Why should I use ISO 8601?",
        answer:
          "It is unambiguous (no US vs EU confusion), sorts correctly as text, and is the default in JSON, SQL, and most APIs.",
      },
      {
        question: "Is ISO 8601 the same as YYYY-MM-DD?",
        answer:
          "YYYY-MM-DD is the date-only form of ISO 8601. The full standard also includes time (YYYY-MM-DDTHH:MM:SSZ).",
      },
      {
        question: "Does ISO 8601 use leading zeros?",
        answer: "Yes — months and days always use two digits: 2026-03-05, not 2026-3-5.",
      },
    ],
    relatedSlugs: ["iso-to-date", "date-to-timestamp", "us-to-eu-date"],
    requiresFFmpeg: false,
  },
  {
    slug: "iso-to-date",
    from: "ISO 8601",
    to: "Date",
    category: "date",
    toolName: "ISO 8601 to Date Converter",
    description:
      "Convert ISO 8601 dates (YYYY-MM-DD) to US, EU, long format, timestamps, and more. See every format at a glance.",
    keyword: "ISO 8601 to date",
    subtitle: "Convert YYYY-MM-DD to any date format you need",
    componentKey: "DateFormatConverterTool",
    componentProps: { fromFormat: "iso", toFormat: "any" },
    acceptedExtensions: [],
    howTo: [
      "Type an ISO date like 2026-03-26 in the text field.",
      "All date formats appear below — US, EU, long, timestamp, etc.",
      "Copy whichever format you need.",
    ],
    about:
      '<p>Takes ISO 8601 formatted dates and converts them to every common representation: US (MM/DD/YYYY), European (DD/MM/YYYY), long formats, Unix timestamps, day of week, week number, and more.</p>',
    faqs: [
      {
        question: "What if my ISO date includes a time?",
        answer:
          "The tool currently parses date-only ISO strings (YYYY-MM-DD). If your string includes a time (T14:30:00Z), the date portion will still be detected.",
      },
      {
        question: "Can I enter just a year and month?",
        answer:
          "The tool expects a full date with year, month, and day. Partial dates are not supported.",
      },
      {
        question: "Is the output always in English?",
        answer: "Yes — month and day names are in English (e.g. March, Thursday).",
      },
    ],
    relatedSlugs: ["date-to-iso", "timestamp-to-date", "eu-to-us-date"],
    requiresFFmpeg: false,
  },
];
