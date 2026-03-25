import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { JsonToTypescriptTool } from "./JsonToTypescriptTool";

const toolName = "JSON to TypeScript — Generate Types from JSON Free";
const description =
  "Convert JSON to TypeScript interfaces or type aliases instantly. Supports nested objects, arrays, optional and readonly properties. Free online tool — no sign-up required.";
const keyword = "json to typescript";
const siteName = "Peregrine Dev";
const siteUrl = "https://peregrinedev.com";
const path = "/json-to-typescript";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Paste your JSON data into the input text area",
  "Optionally set the root type name, output mode (interface or type), and property modifiers",
  "Click 'Convert' to generate TypeScript definitions",
  "Click 'Copy' to copy the generated types to your clipboard",
];

const faqs = [
  {
    question: "Does this tool handle nested objects?",
    answer:
      "Yes. The converter recursively walks your JSON and generates a separate interface or type for every nested object. Each nested type is named using PascalCase derived from its JSON key, and the root type references them by name.",
  },
  {
    question: "How are arrays converted?",
    answer:
      "If every element in an array is the same type, the output uses that type followed by []. If elements are mixed types, it produces a union array such as (string | number)[]. Empty arrays are typed as unknown[]. Arrays of objects merge all object shapes into a single interface.",
  },
  {
    question: "What is the difference between interface and type output?",
    answer:
      "TypeScript interfaces use the 'interface' keyword and can be extended or merged. Type aliases use the 'type' keyword and are more flexible for unions and intersections. Both are valid ways to define object shapes; the choice is largely a matter of project convention.",
  },
  {
    question: "Can I make all properties optional or readonly?",
    answer:
      "Yes. Toggle the 'Optional properties' checkbox to add a ? to every property, making them all optional. Toggle 'Readonly properties' to prepend the readonly modifier to each property, preventing reassignment in TypeScript.",
  },
  {
    question: "Is my JSON data sent to a server?",
    answer:
      "No. All conversion happens locally in your browser. Your data is never transmitted to any server and is not stored or logged in any way.",
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

export default function JsonToTypescriptPage() {
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
        subtitle="Paste your JSON and get TypeScript interfaces or types instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A <strong>JSON to TypeScript</strong> converter takes raw JSON data and produces
            TypeScript interface or type alias definitions that describe the shape of that data.
            This is useful when you receive JSON from an API and want to create type-safe code
            without manually writing every interface by hand.
          </p>
          <p>
            This free <strong>JSON to TypeScript</strong> tool recursively walks your JSON structure,
            generating a named interface or type for every nested object. Arrays are analyzed to
            determine whether all elements share the same type or require a union. You can customise
            the root type name, choose between interface and type output, and toggle optional or
            readonly modifiers on every property.
          </p>
          <p>
            All processing happens locally in your browser. Your JSON is never sent to any server,
            making this <strong>JSON to TypeScript</strong> converter safe for API responses containing
            tokens, credentials, or other sensitive data. There are no usage limits, no account
            requirements, and no ads.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "JSON Formatter", href: "/json-formatter" },
          { name: "JSON Validator", href: "/json-validator" },
          { name: "JSON to CSV", href: "/json-to-csv" },
        ]}
        nextStep={{ label: "Format the JSON?", description: "Beautify and syntax-highlight your JSON data", href: "/json-formatter" }}
      >
        <JsonToTypescriptTool />
      </ToolLayout>
    </>
  );
}
