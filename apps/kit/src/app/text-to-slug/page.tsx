import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { TextToSlugTool } from "./TextToSlugTool";

const toolName = "Text to Slug — Generate URL Slugs Online Free";
const description =
  "Convert any text into a clean URL-friendly slug. Removes special characters, replaces spaces with hyphens or underscores. Free online tool — no sign-up required.";
const keyword = "text to slug";
const siteName = "Peregrine Kit";
const siteUrl = "https://peregrinekit.com";
const path = "/text-to-slug";

export const metadata = generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
});

const howTo = [
  "Type or paste your title, heading, or phrase into the input field",
  "Choose your preferred separator (hyphen or underscore) and case setting",
  "The slug is generated in real time as you type",
  "Click 'Copy to Clipboard' to use the slug in your project",
];

const faqs = [
  {
    question: "Should I use hyphens or underscores in URLs?",
    answer:
      "Google recommends hyphens (-) as word separators in URLs because they are treated as spaces between words. Underscores (_) are not treated as separators by search engines, so hyphens are generally the better choice for SEO.",
  },
  {
    question: "Does it handle accented characters?",
    answer:
      "Yes. Accented characters like e-acute, n-tilde, and u-umlaut are converted to their closest ASCII equivalents. For example, 'creme brulee' is produced from 'creme brulee' with accents.",
  },
  {
    question: "What characters are removed?",
    answer:
      "All characters that are not letters, numbers, spaces, hyphens, or underscores are removed. This includes punctuation, symbols, and special characters.",
  },
  {
    question: "Can I keep uppercase letters?",
    answer:
      "Yes. Uncheck the 'Lowercase' option to preserve the original capitalization. However, most URL conventions and SEO best practices recommend lowercase slugs.",
  },
  {
    question: "Is there a length limit?",
    answer:
      "The tool itself has no length limit. However, URLs should generally be kept under 2,048 characters for browser compatibility, and slugs under 60 characters are ideal for SEO readability.",
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

export default function TextToSlugPage() {
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
        subtitle="Turn any title or phrase into a clean, URL-friendly slug. Instantly. No sign-up required."
        keyword={keyword}
        howTo={howTo}
        about={`
          <p>
            A URL slug is the part of a web address that identifies a specific page in a human-readable
            format. Converting a page title to a slug means transforming it into a lowercase, hyphenated
            string with no special characters. For example, "My Blog Post Title!" becomes
            "my-blog-post-title". Our <strong>text to slug</strong> tool does this conversion instantly
            as you type.
          </p>
          <p>
            Clean slugs are important for both SEO and usability. Search engines use URL structure as a
            ranking signal, and users are more likely to click on a link that is readable and
            descriptive. This <strong>text to slug</strong> converter handles accented characters
            (converting "cafe" from "caf&eacute;"), strips punctuation and special symbols, collapses
            multiple separators, and trims leading and trailing separators to produce a polished result.
          </p>
          <p>
            You can choose between hyphens and underscores as the word separator, and toggle lowercase
            conversion on or off. The tool processes everything in your browser with no server requests,
            so your content stays private. Whether you are building a blog, setting up product pages, or
            creating URL routes for a web application, this <strong>text to slug</strong> tool saves you
            the effort of manual formatting.
          </p>
        `}
        faqs={faqs}
        relatedTools={[
          { name: "Case Converter", href: "/case-converter" },
          { name: "Remove Line Breaks", href: "/remove-line-breaks" },
          { name: "URL Encode/Decode", href: "https://peregrinedev.com/url-encode" },
          { name: "Meta Tag Generator", href: "/meta-tag-generator" },
        ]}
        nextStep={{ label: "Build a UTM link?", description: "Add campaign tracking to your URL", href: "/utm-builder" }}
      >
        <TextToSlugTool />
      </ToolLayout>
    </>
  );
}
