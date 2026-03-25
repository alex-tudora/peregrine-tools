import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { YamlFormatterTool } from "./YamlFormatterTool";

const toolName = "YAML Formatter — Format & Validate YAML Free";
const description =
  "Format and validate YAML data instantly. Consistent indentation, clean structure, and error detection. Free online YAML formatter — no sign-up required.";
const keyword = "yaml formatter";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/yaml-formatter";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste or type your raw YAML into the input text area",
  "Click 'Format' to beautify the YAML with consistent indentation",
  "Review the formatted output for structural correctness",
  "Click 'Copy' to copy the formatted YAML to your clipboard",
];

const faqs = [
  {
    question: "What happens if my YAML is invalid?",
    answer:
      "The tool will display a clear error message indicating what went wrong during parsing. This helps you quickly locate and fix syntax errors such as incorrect indentation, missing colons, or invalid nesting.",
  },
  {
    question: "What indentation does the formatter use?",
    answer:
      "The formatter uses 2-space indentation, which is the most common convention for YAML files. All output is normalized to this consistent style regardless of the input's original indentation.",
  },
  {
    question: "Does it support all YAML features?",
    answer:
      "The formatter supports the most commonly used YAML features: key-value pairs, nested objects, arrays, quoted and unquoted strings, numbers, booleans, null values, and multiline strings. Advanced features like anchors, aliases, and tags are not supported.",
  },
  {
    question: "Can I use this to validate YAML?",
    answer:
      "Yes. If your YAML contains syntax errors, the formatter will report them instead of producing output. Successfully formatted YAML confirms that the input is structurally valid.",
  },
  {
    question: "Is my YAML stored or sent anywhere?",
    answer:
      "No. All formatting happens locally in your browser. Your data is never transmitted to any server and is not stored or logged in any way.",
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

export default function YamlFormatterPage() {
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
        subtitle="Paste your YAML and get a cleanly formatted, validated output. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>YAML formatter</strong> transforms messy or inconsistently indented YAML data into
            a clean, human-readable format with uniform indentation and structure. Whether you are editing
            a Kubernetes manifest, a CI/CD pipeline configuration, or an application settings file,
            properly formatted YAML is essential for readability and avoiding parsing errors.
          </p>
          <p>
            This free <strong>YAML formatter</strong> parses your input and re-serializes it with
            consistent 2-space indentation. It validates the structure as it parses, so any syntax
            errors — such as incorrect indentation, missing colons, or invalid nesting — are reported
            immediately. This makes it a quick way to both format and validate YAML in one step.
          </p>
          <p>
            All processing happens locally in your browser. Your YAML is never sent to any server,
            making this <strong>YAML formatter</strong> safe for configuration files containing
            secrets, API keys, and other sensitive data. There are no usage limits, no account
            requirements, and no ads.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "JSON to YAML", href: "/json-to-yaml" },
        ]}
        nextStep={{ label: "Convert to JSON?", description: "Transform your YAML data into JSON format", href: "/json-to-yaml" }}
      >
        <YamlFormatterTool />
      </ToolLayout>
    </>
  );
}
