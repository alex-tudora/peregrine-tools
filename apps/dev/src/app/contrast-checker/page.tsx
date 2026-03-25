import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { ContrastCheckerTool } from "./ContrastCheckerTool";

const toolName = "Color Contrast Checker — WCAG Accessibility Free";
const description =
  "Check color contrast ratios against WCAG AA and AAA standards. Enter text and background colors to see if your design meets accessibility guidelines. Free online tool — no sign-up required.";
const keyword = "color contrast checker";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/contrast-checker";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Enter a text color using the hex input field or the native color picker",
  "Enter a background color using the hex input field or the native color picker",
  "View the contrast ratio and WCAG AA/AAA pass or fail results instantly",
  "If failing, apply the suggested text color adjustment to meet the required threshold",
];

const faqs = [
  {
    question: "What is a WCAG contrast ratio?",
    answer:
      "The WCAG (Web Content Accessibility Guidelines) contrast ratio measures the difference in perceived brightness between two colors. It ranges from 1:1 (no contrast, identical colors) to 21:1 (maximum contrast, black on white). Higher ratios mean better readability for users, including those with visual impairments.",
  },
  {
    question: "What contrast ratio is required for WCAG AA compliance?",
    answer:
      "WCAG AA requires a minimum contrast ratio of 4.5:1 for normal-sized text (below 18pt or 14pt bold) and 3:1 for large text (18pt and above, or 14pt bold and above). These thresholds ensure content is readable by people with moderately low vision.",
  },
  {
    question: "What is the difference between WCAG AA and AAA?",
    answer:
      "WCAG AAA is a stricter standard than AA. AAA requires 7:1 for normal text and 4.5:1 for large text, while AA requires 4.5:1 and 3:1 respectively. AAA conformance provides better readability for users with more severe visual impairments, but it can be harder to achieve with brand colors.",
  },
  {
    question: "How is the contrast ratio calculated?",
    answer:
      "The contrast ratio is calculated using relative luminance values of the two colors. Each sRGB color channel is linearized using the sRGB transfer function, then combined using the formula L = 0.2126*R + 0.7152*G + 0.0722*B. The ratio is (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter color's luminance.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All contrast calculations happen locally in your browser using pure math. No color data is sent to any server, and there are no usage limits or account requirements.",
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

export default function ContrastCheckerPage() {
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
        subtitle="Check color contrast ratios against WCAG AA and AAA accessibility standards. Instantly see pass/fail results and get suggestions for compliant colors."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>color contrast checker</strong> is an essential accessibility tool for web developers
            and designers. It calculates the contrast ratio between a text color and a background color,
            then evaluates whether the combination meets WCAG (Web Content Accessibility Guidelines)
            standards for readability.
          </p>
          <p>
            The WCAG defines two conformance levels: <strong>AA</strong> (minimum) and <strong>AAA</strong>
            (enhanced). AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large
            text. AAA requires 7:1 for normal text and 4.5:1 for large text. Meeting these thresholds
            ensures that content is readable by users with low vision and color vision deficiencies.
          </p>
          <p>
            This free <strong>contrast checker</strong> performs all calculations in your browser using the
            official sRGB linearization formula and WCAG relative luminance definition. If your colors fail,
            the tool suggests an adjusted text color that would pass. No data leaves your browser.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Color Picker", href: "/color-picker" },
          { name: "Color Palette Generator", href: "/color-palette" },
          { name: "Hex to RGB", href: "/hex-to-rgb" },
        ]}
        nextStep={{ label: "Pick a color?", description: "Explore HEX, RGB, HSL values", href: "/color-picker" }}
      >
        <ContrastCheckerTool />
      </ToolLayout>
    </>
  );
}
