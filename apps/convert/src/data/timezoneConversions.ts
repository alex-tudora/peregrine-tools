import type { ConversionDef } from "./conversions";

/**
 * Timezone conversion pages.
 *
 * Each entry targets a specific keyword (e.g. "EST to UTC", "PST to EST").
 * The converter lets users pick any timezone, but the fromTimezone and
 * toTimezone props set the defaults for the specific page.
 */
export const timezoneConversions: ConversionDef[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // EST <-> UTC
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "est-to-utc",
    from: "EST",
    to: "UTC",
    category: "timezone",
    toolName: "EST to UTC Converter",
    description:
      "Convert Eastern Time (EST/EDT) to UTC instantly. Free online time zone converter — see the current time in both zones.",
    keyword: "EST to UTC",
    subtitle: "Convert US Eastern Time to Coordinated Universal Time",
    componentKey: "TimezoneConverterTool",
    componentProps: { fromTimezone: "est", toTimezone: "utc" },
    acceptedExtensions: [],
    howTo: [
      "Enter the time in hours and minutes.",
      "Select a date if needed (defaults to today).",
      "The UTC equivalent appears instantly.",
      "Use the swap button to convert UTC to EST instead.",
    ],
    about:
      "<p>Converts US Eastern Time (EST/EDT) to Coordinated Universal Time (UTC). Eastern Time is UTC-5 during standard time and UTC-4 during daylight saving time. UTC is the global time standard used as the reference for all other time zones.</p><p>This tool uses <code>Intl.DateTimeFormat</code> with IANA timezone data, so it automatically handles daylight saving time transitions.</p>",
    faqs: [
      { question: "What is the difference between EST and EDT?", answer: "EST (Eastern Standard Time) is UTC-5, used from November to March. EDT (Eastern Daylight Time) is UTC-4, used from March to November. This tool handles the switch automatically." },
      { question: "Is EST always 5 hours behind UTC?", answer: "EST is always UTC-5. However, the US Eastern time zone switches to EDT (UTC-4) during daylight saving time. This tool accounts for that." },
      { question: "Which cities use Eastern Time?", answer: "New York, Washington DC, Miami, Atlanta, Toronto, and Montreal are all in the Eastern time zone." },
    ],
    relatedSlugs: ["utc-to-est", "pst-to-est", "est-to-gmt"],
    requiresFFmpeg: false,
  },
  {
    slug: "utc-to-est",
    from: "UTC",
    to: "EST",
    category: "timezone",
    toolName: "UTC to EST Converter",
    description:
      "Convert UTC to Eastern Time (EST/EDT) instantly. See what time it is on the US East Coast for any UTC time.",
    keyword: "UTC to EST",
    subtitle: "Convert Coordinated Universal Time to US Eastern Time",
    componentKey: "TimezoneConverterTool",
    componentProps: { fromTimezone: "utc", toTimezone: "est" },
    acceptedExtensions: [],
    howTo: [
      "Enter the UTC time in hours and minutes.",
      "Select a date if needed.",
      "The Eastern Time equivalent appears instantly.",
      "Use the swap button to convert EST to UTC instead.",
    ],
    about:
      "<p>Converts Coordinated Universal Time (UTC) to US Eastern Time (EST or EDT). UTC is the primary time standard by which the world regulates clocks. Eastern Time is UTC-5 (EST) or UTC-4 (EDT) depending on daylight saving time.</p>",
    faqs: [
      { question: "What is UTC?", answer: "UTC (Coordinated Universal Time) is the primary time standard used globally. It does not observe daylight saving time. It is the successor to Greenwich Mean Time (GMT) and is used as the reference point for all time zones." },
      { question: "How do I convert UTC to EST quickly?", answer: "Subtract 5 hours during standard time (November-March) or 4 hours during daylight saving time (March-November). This tool handles it automatically." },
      { question: "Is UTC the same as GMT?", answer: "For most practical purposes, yes. UTC and GMT differ by less than a second. GMT is a time zone while UTC is a time standard, but they share the same time." },
    ],
    relatedSlugs: ["est-to-utc", "utc-to-ist", "utc-to-jst"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PST <-> EST
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "pst-to-est",
    from: "PST",
    to: "EST",
    category: "timezone",
    toolName: "PST to EST Converter",
    description:
      "Convert Pacific Time (PST/PDT) to Eastern Time (EST/EDT) instantly. Perfect for scheduling across the US.",
    keyword: "PST to EST",
    subtitle: "Convert US Pacific Time to US Eastern Time",
    componentKey: "TimezoneConverterTool",
    componentProps: { fromTimezone: "pst", toTimezone: "est" },
    acceptedExtensions: [],
    howTo: [
      "Enter the Pacific Time in hours and minutes.",
      "Select a date if needed.",
      "The Eastern Time equivalent appears instantly.",
      "Use the swap button to convert EST to PST.",
    ],
    about:
      "<p>Converts US Pacific Time (PST/PDT) to US Eastern Time (EST/EDT). There is always a 3-hour difference — Eastern Time is 3 hours ahead of Pacific Time. Both zones switch to daylight saving time simultaneously, so the 3-hour gap is constant year-round.</p>",
    faqs: [
      { question: "How many hours ahead is EST from PST?", answer: "Eastern Time is always 3 hours ahead of Pacific Time. If it is 9 AM PST, it is 12 PM EST." },
      { question: "Do PST and EST change for daylight saving at the same time?", answer: "Yes — all US time zones switch to daylight saving time on the same date, so the 3-hour difference between Pacific and Eastern stays constant." },
      { question: "Which major cities use PST?", answer: "Los Angeles, San Francisco, Seattle, Portland, and Vancouver use Pacific Time." },
    ],
    relatedSlugs: ["est-to-pst", "pst-to-est", "est-to-utc"],
    requiresFFmpeg: false,
  },
  {
    slug: "est-to-pst",
    from: "EST",
    to: "PST",
    category: "timezone",
    toolName: "EST to PST Converter",
    description:
      "Convert Eastern Time (EST/EDT) to Pacific Time (PST/PDT) instantly. Schedule meetings across the US with ease.",
    keyword: "EST to PST",
    subtitle: "Convert US Eastern Time to US Pacific Time",
    componentKey: "TimezoneConverterTool",
    componentProps: { fromTimezone: "est", toTimezone: "pst" },
    acceptedExtensions: [],
    howTo: [
      "Enter the Eastern Time in hours and minutes.",
      "Select a date if needed.",
      "The Pacific Time equivalent appears instantly.",
      "Use the swap button to convert PST to EST.",
    ],
    about:
      "<p>Converts US Eastern Time to US Pacific Time. Pacific Time is always 3 hours behind Eastern Time. This is the most common timezone conversion within the United States, used daily for scheduling meetings, calls, and events across coasts.</p>",
    faqs: [
      { question: "If it is 3 PM EST, what time is it PST?", answer: "12 PM (noon) PST. Subtract 3 hours from Eastern Time to get Pacific Time." },
      { question: "What about Hawaii and Alaska?", answer: "Hawaii is UTC-10 (no DST), Alaska is UTC-9 (UTC-8 during DST). This tool supports those time zones too — just select them from the dropdown." },
      { question: "When do business hours overlap between EST and PST?", answer: "If both coasts work 9 AM to 5 PM, the overlap is 12 PM to 5 PM EST (9 AM to 2 PM PST) — five hours of shared working time." },
    ],
    relatedSlugs: ["pst-to-est", "est-to-utc", "est-to-gmt"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // GMT <-> EST
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "gmt-to-est",
    from: "GMT",
    to: "EST",
    category: "timezone",
    toolName: "GMT to EST Converter",
    description:
      "Convert Greenwich Mean Time (GMT/BST) to Eastern Time (EST/EDT) instantly. Bridge UK and US East Coast schedules.",
    keyword: "GMT to EST",
    subtitle: "Convert London time to US Eastern Time",
    componentKey: "TimezoneConverterTool",
    componentProps: { fromTimezone: "gmt", toTimezone: "est" },
    acceptedExtensions: [],
    howTo: [
      "Enter the GMT/London time in hours and minutes.",
      "Select a date if needed.",
      "The Eastern Time equivalent appears instantly.",
      "Use the swap button to convert EST to GMT.",
    ],
    about:
      "<p>Converts GMT (Greenwich Mean Time) or London time to US Eastern Time. The difference varies: during winter, EST is 5 hours behind GMT. During summer, the gap narrows because the UK (BST) and US (EDT) observe daylight saving at slightly different dates.</p>",
    faqs: [
      { question: "How many hours behind GMT is EST?", answer: "EST is 5 hours behind GMT. During daylight saving (EDT vs BST), it can be 4 or 5 hours depending on exact dates — the US and UK switch DST on different weekends." },
      { question: "Is GMT the same as UTC?", answer: "For practical purposes, yes. GMT and UTC are within a second of each other. GMT is technically a time zone (Europe/London in winter), while UTC is a time standard." },
      { question: "When do London and New York business hours overlap?", answer: "If both work 9-5 local time, they overlap from 2 PM to 5 PM London time (9 AM to 12 PM New York time) — about 3 hours in winter." },
    ],
    relatedSlugs: ["est-to-gmt", "gmt-to-est", "utc-to-est"],
    requiresFFmpeg: false,
  },
  {
    slug: "est-to-gmt",
    from: "EST",
    to: "GMT",
    category: "timezone",
    toolName: "EST to GMT Converter",
    description:
      "Convert Eastern Time (EST/EDT) to Greenwich Mean Time (GMT/BST) instantly. Coordinate across the Atlantic with ease.",
    keyword: "EST to GMT",
    subtitle: "Convert US Eastern Time to London time",
    componentKey: "TimezoneConverterTool",
    componentProps: { fromTimezone: "est", toTimezone: "gmt" },
    acceptedExtensions: [],
    howTo: [
      "Enter the Eastern Time in hours and minutes.",
      "Select a date if needed.",
      "The GMT/London time equivalent appears instantly.",
      "Use the swap button to convert GMT to EST.",
    ],
    about:
      "<p>Converts US Eastern Time (EST/EDT) to Greenwich Mean Time (GMT) or British Summer Time (BST). Add 5 hours to EST to get GMT during winter, or 4-5 hours depending on daylight saving transitions in spring and fall.</p>",
    faqs: [
      { question: "If it is 9 AM EST, what time is it in London?", answer: "2 PM GMT during standard time (winter). During summer months, it depends on whether both regions are observing daylight saving — this tool handles it automatically." },
      { question: "Does London observe daylight saving?", answer: "Yes — the UK uses BST (British Summer Time, GMT+1) from the last Sunday in March to the last Sunday in October." },
      { question: "Why does the time difference change during the year?", answer: "The US and UK switch to daylight saving on different dates. For a few weeks in spring and fall, the gap is 4 hours instead of the usual 5." },
    ],
    relatedSlugs: ["gmt-to-est", "est-to-utc", "est-to-pst"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // UTC <-> IST (India)
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "utc-to-ist",
    from: "UTC",
    to: "IST",
    category: "timezone",
    toolName: "UTC to IST Converter",
    description:
      "Convert UTC to India Standard Time (IST) instantly. IST is UTC+5:30 — this tool handles the 30-minute offset correctly.",
    keyword: "UTC to IST",
    subtitle: "Convert Coordinated Universal Time to India Standard Time",
    componentKey: "TimezoneConverterTool",
    componentProps: { fromTimezone: "utc", toTimezone: "ist" },
    acceptedExtensions: [],
    howTo: [
      "Enter the UTC time in hours and minutes.",
      "Select a date if needed.",
      "The IST equivalent appears instantly.",
      "Use the swap button to convert IST to UTC.",
    ],
    about:
      "<p>Converts UTC to India Standard Time (IST), which is UTC+5:30. India uses a single time zone with a 30-minute offset, which makes mental math trickier than whole-hour offsets. This tool handles it correctly, including date changes when the conversion crosses midnight.</p>",
    faqs: [
      { question: "What is the UTC to IST offset?", answer: "IST is UTC+5:30. Add 5 hours and 30 minutes to UTC to get IST. India does not observe daylight saving time, so this offset is constant year-round." },
      { question: "Why does India have a 30-minute offset?", answer: "India chose UTC+5:30 as a compromise between the solar times of its eastern and western extremes. Several countries have half-hour or 45-minute offsets." },
      { question: "Does India observe daylight saving time?", answer: "No — IST is UTC+5:30 year-round. This simplifies conversions since the offset never changes." },
    ],
    relatedSlugs: ["ist-to-utc", "utc-to-est", "utc-to-jst"],
    requiresFFmpeg: false,
  },
  {
    slug: "ist-to-utc",
    from: "IST",
    to: "UTC",
    category: "timezone",
    toolName: "IST to UTC Converter",
    description:
      "Convert India Standard Time (IST) to UTC instantly. Subtract 5 hours 30 minutes — or let this tool do it for you.",
    keyword: "IST to UTC",
    subtitle: "Convert India Standard Time to Coordinated Universal Time",
    componentKey: "TimezoneConverterTool",
    componentProps: { fromTimezone: "ist", toTimezone: "utc" },
    acceptedExtensions: [],
    howTo: [
      "Enter the IST time in hours and minutes.",
      "Select a date if needed.",
      "The UTC equivalent appears instantly.",
      "Use the swap button to convert UTC to IST.",
    ],
    about:
      "<p>Converts India Standard Time (IST) to Coordinated Universal Time (UTC). Subtract 5 hours and 30 minutes from IST to get UTC. Since India does not observe daylight saving time, this offset is constant throughout the year.</p>",
    faqs: [
      { question: "If it is 9:30 AM IST, what time is it UTC?", answer: "4:00 AM UTC. Subtract 5 hours and 30 minutes from IST." },
      { question: "What major IT hubs use IST?", answer: "Bangalore, Hyderabad, Pune, Chennai, Mumbai, and Delhi — all major Indian tech centers operate in IST." },
      { question: "How do I coordinate meetings between IST and US time zones?", answer: "IST is 10.5 hours ahead of EST and 13.5 hours ahead of PST. Morning meetings in India overlap with late evening in the US." },
    ],
    relatedSlugs: ["utc-to-ist", "est-to-utc", "ist-to-utc"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // UTC <-> JST (Japan)
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "utc-to-jst",
    from: "UTC",
    to: "JST",
    category: "timezone",
    toolName: "UTC to JST Converter",
    description:
      "Convert UTC to Japan Standard Time (JST) instantly. JST is UTC+9 — see the current time in Tokyo for any UTC time.",
    keyword: "UTC to JST",
    subtitle: "Convert Coordinated Universal Time to Japan Standard Time",
    componentKey: "TimezoneConverterTool",
    componentProps: { fromTimezone: "utc", toTimezone: "jst" },
    acceptedExtensions: [],
    howTo: [
      "Enter the UTC time in hours and minutes.",
      "Select a date if needed.",
      "The JST equivalent appears instantly.",
      "Use the swap button to convert JST to UTC.",
    ],
    about:
      "<p>Converts UTC to Japan Standard Time (JST), which is UTC+9. Japan does not observe daylight saving time, so the 9-hour offset is constant year-round. JST is shared by Japan and South Korea (as KST).</p>",
    faqs: [
      { question: "What is the UTC to JST offset?", answer: "JST is UTC+9. Add 9 hours to UTC to get JST. This offset never changes because Japan does not use daylight saving time." },
      { question: "Does Japan observe daylight saving time?", answer: "No — Japan Standard Time is UTC+9 year-round. Japan briefly used DST during the post-WWII occupation (1948-1951) but discontinued it." },
      { question: "Is JST the same as KST?", answer: "Yes — Japan Standard Time (UTC+9) and Korea Standard Time (UTC+9) have the same offset. Tokyo and Seoul are always the same time." },
    ],
    relatedSlugs: ["jst-to-utc", "utc-to-ist", "utc-to-est"],
    requiresFFmpeg: false,
  },
  {
    slug: "jst-to-utc",
    from: "JST",
    to: "UTC",
    category: "timezone",
    toolName: "JST to UTC Converter",
    description:
      "Convert Japan Standard Time (JST) to UTC instantly. Subtract 9 hours from Tokyo time to get UTC.",
    keyword: "JST to UTC",
    subtitle: "Convert Japan Standard Time to Coordinated Universal Time",
    componentKey: "TimezoneConverterTool",
    componentProps: { fromTimezone: "jst", toTimezone: "utc" },
    acceptedExtensions: [],
    howTo: [
      "Enter the JST time in hours and minutes.",
      "Select a date if needed.",
      "The UTC equivalent appears instantly.",
      "Use the swap button to convert UTC to JST.",
    ],
    about:
      "<p>Converts Japan Standard Time (JST) to Coordinated Universal Time (UTC). Subtract 9 hours from JST to get UTC. Since Japan does not observe daylight saving time, this calculation is the same year-round.</p>",
    faqs: [
      { question: "If it is 6 PM JST, what time is it UTC?", answer: "9 AM UTC. Subtract 9 hours from JST." },
      { question: "How far ahead is JST from US Eastern Time?", answer: "JST is 14 hours ahead of EST (13 hours ahead of EDT). A 9 AM meeting in Tokyo is 7 PM the previous day in New York." },
      { question: "What is the best time for meetings between Tokyo and London?", answer: "The overlap between JST (9 AM - 6 PM) and GMT (9 AM - 5 PM) is 6 PM - 2 AM JST, or 9 AM - 5 PM GMT. Morning in London is evening in Tokyo." },
    ],
    relatedSlugs: ["utc-to-jst", "ist-to-utc", "est-to-utc"],
    requiresFFmpeg: false,
  },
];
