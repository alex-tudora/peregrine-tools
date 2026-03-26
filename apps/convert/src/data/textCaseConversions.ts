import type { ConversionDef } from "./conversions";

/**
 * Text case & encoding conversion pages.
 *
 * Each entry targets a specific keyword (e.g. "text to uppercase",
 * "base64 encode"). The converter is the TextCaseConverterTool component,
 * driven entirely by the `conversionType` prop.
 */
export const textCaseConversions: ConversionDef[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // CASE TRANSFORMATIONS
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "text-to-uppercase",
    from: "Text",
    to: "UPPERCASE",
    category: "text",
    toolName: "Text to Uppercase Converter",
    description:
      "Convert any text to UPPERCASE instantly. Free online tool — type or paste, get results in real-time.",
    keyword: "text to uppercase",
    subtitle: "Transform your text to ALL CAPS in one click",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "uppercase" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "The uppercase version appears instantly on the right.",
      "Click Copy to grab the result.",
      "Use Clear to start fresh.",
    ],
    about:
      "<p>Converts every letter in your text to its uppercase equivalent using JavaScript's <code>toUpperCase()</code> method. Numbers, symbols, and whitespace are left unchanged. Processing happens entirely in your browser — no data is sent anywhere.</p>",
    faqs: [
      { question: "Does this work with non-English characters?", answer: "Yes — the tool uses the browser's built-in Unicode-aware uppercasing, so accented characters (e, u, etc.) and letters from other scripts are handled correctly." },
      { question: "Is there a character limit?", answer: "No hard limit. The conversion runs in your browser, so very large texts (millions of characters) may slow down briefly." },
      { question: "Are numbers and symbols affected?", answer: "No — only alphabetic characters are converted. Numbers, punctuation, and whitespace remain unchanged." },
    ],
    relatedSlugs: ["text-to-lowercase", "text-to-titlecase", "text-to-slug"],
    requiresFFmpeg: false,
  },
  {
    slug: "text-to-lowercase",
    from: "Text",
    to: "lowercase",
    category: "text",
    toolName: "Text to Lowercase Converter",
    description:
      "Convert text to lowercase instantly. Free online tool for quick case conversion — no sign-up needed.",
    keyword: "text to lowercase",
    subtitle: "Transform your text to all lowercase letters",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "lowercase" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "The lowercase version appears instantly on the right.",
      "Click Copy to grab the result.",
      "Use Clear to start over.",
    ],
    about:
      "<p>Converts every letter in your text to lowercase using JavaScript's <code>toLowerCase()</code> method. Useful for normalizing text, preparing data for case-insensitive comparison, or cleaning up text that was accidentally typed in caps.</p>",
    faqs: [
      { question: "When would I need to convert text to lowercase?", answer: "Common use cases include normalizing user input, preparing text for search indexes, formatting email addresses, and cleaning data for processing." },
      { question: "Does this handle special characters?", answer: "Yes — Unicode-aware lowercasing handles accented and international characters correctly." },
      { question: "Can I undo the conversion?", answer: "The original casing cannot be recovered from lowercase text. Copy your original text before converting if you need to keep it." },
    ],
    relatedSlugs: ["text-to-uppercase", "text-to-titlecase", "text-to-slug"],
    requiresFFmpeg: false,
  },
  {
    slug: "text-to-titlecase",
    from: "Text",
    to: "Title Case",
    category: "text",
    toolName: "Text to Title Case Converter",
    description:
      "Convert text to Title Case instantly. Capitalize the first letter of every word — free online tool.",
    keyword: "text to title case",
    subtitle: "Capitalize the first letter of each word",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "titlecase" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "Each word is automatically capitalized as you type.",
      "Click Copy to grab the Title Case result.",
      "Use Clear to reset both panels.",
    ],
    about:
      "<p>Converts text to Title Case by capitalizing the first letter of every word and lowercasing the rest. This is commonly used for headings, titles, names, and formal formatting. Processing is instant and runs entirely in your browser.</p>",
    faqs: [
      { question: "Does this follow AP or Chicago style title case rules?", answer: "This tool capitalizes the first letter of every word equally. For style-guide-specific rules (like keeping articles lowercase), you may need to make manual adjustments." },
      { question: "What counts as a word?", answer: "Any sequence of alphanumeric characters separated by spaces or punctuation is treated as a word." },
      { question: "Does it handle acronyms?", answer: "Acronyms like 'HTML' or 'NASA' will be converted to 'Html' and 'Nasa'. If you need to preserve them, edit the output manually." },
    ],
    relatedSlugs: ["text-to-uppercase", "text-to-lowercase", "text-to-pascalcase"],
    requiresFFmpeg: false,
  },
  {
    slug: "text-to-camelcase",
    from: "Text",
    to: "camelCase",
    category: "text",
    toolName: "Text to camelCase Converter",
    description:
      "Convert text to camelCase for programming. Instant conversion — perfect for variable names and identifiers.",
    keyword: "text to camelCase",
    subtitle: "Transform text into camelCase naming convention",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "camelcase" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "The camelCase version appears instantly on the right.",
      "Copy the result and use it in your code.",
      "Works with spaces, hyphens, and underscores.",
    ],
    about:
      "<p>Converts text to camelCase — the naming convention where the first word is lowercase and each subsequent word starts with a capital letter, with no separators. Commonly used in JavaScript, Java, and TypeScript for variable and function names.</p>",
    faqs: [
      { question: "What is camelCase?", answer: "camelCase is a naming convention where words are joined without spaces, with each word after the first capitalized. Example: 'hello world' becomes 'helloWorld'." },
      { question: "How is this different from PascalCase?", answer: "In camelCase the first letter is lowercase (helloWorld), while in PascalCase the first letter is uppercase (HelloWorld)." },
      { question: "Does it handle special characters?", answer: "Special characters and punctuation are removed. Only alphanumeric characters are preserved in the output." },
    ],
    relatedSlugs: ["text-to-pascalcase", "text-to-snakecase", "text-to-kebabcase"],
    requiresFFmpeg: false,
  },
  {
    slug: "text-to-snakecase",
    from: "Text",
    to: "snake_case",
    category: "text",
    toolName: "Text to snake_case Converter",
    description:
      "Convert text to snake_case. Instant transformation — ideal for Python variables, database columns, and file names.",
    keyword: "text to snake_case",
    subtitle: "Transform text into snake_case naming convention",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "snakecase" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "The snake_case version appears instantly on the right.",
      "Copy the result for use in your code or database.",
      "Spaces, hyphens, and camelCase are all handled.",
    ],
    about:
      "<p>Converts text to snake_case — words are lowercased and separated by underscores. This is the standard naming convention in Python, Ruby, and many database systems. The tool handles spaces, hyphens, camelCase boundaries, and special characters.</p>",
    faqs: [
      { question: "What is snake_case?", answer: "snake_case is a naming convention where words are lowercase and separated by underscores. Example: 'Hello World' becomes 'hello_world'." },
      { question: "When should I use snake_case?", answer: "It's the standard in Python (PEP 8), Ruby, Rust, and is commonly used for database column names, file names, and API parameters." },
      { question: "Does it handle camelCase input?", answer: "Yes — 'myVariableName' is correctly converted to 'my_variable_name' by detecting uppercase letter boundaries." },
    ],
    relatedSlugs: ["text-to-camelcase", "text-to-kebabcase", "text-to-pascalcase"],
    requiresFFmpeg: false,
  },
  {
    slug: "text-to-kebabcase",
    from: "Text",
    to: "kebab-case",
    category: "text",
    toolName: "Text to kebab-case Converter",
    description:
      "Convert text to kebab-case instantly. Perfect for URLs, CSS classes, and HTML attributes.",
    keyword: "text to kebab-case",
    subtitle: "Transform text into kebab-case format",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "kebabcase" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "The kebab-case result appears instantly.",
      "Copy and use it for URLs, CSS classes, or identifiers.",
      "Handles spaces, underscores, and camelCase boundaries.",
    ],
    about:
      "<p>Converts text to kebab-case — words are lowercased and separated by hyphens. This format is widely used in URLs, CSS class names, HTML data attributes, and npm package names. The tool automatically handles various input formats.</p>",
    faqs: [
      { question: "What is kebab-case?", answer: "kebab-case is a naming convention where words are lowercase and separated by hyphens. Example: 'Hello World' becomes 'hello-world'." },
      { question: "Why is it called kebab-case?", answer: "Because the hyphens between words resemble a skewer through pieces of a kebab." },
      { question: "Where is kebab-case commonly used?", answer: "It's standard for URLs and URL slugs, CSS class names (BEM methodology), HTML attributes, npm package names, and Git branch names." },
    ],
    relatedSlugs: ["text-to-snakecase", "text-to-camelcase", "text-to-slug"],
    requiresFFmpeg: false,
  },
  {
    slug: "text-to-pascalcase",
    from: "Text",
    to: "PascalCase",
    category: "text",
    toolName: "Text to PascalCase Converter",
    description:
      "Convert text to PascalCase instantly. Ideal for class names, component names, and type definitions.",
    keyword: "text to PascalCase",
    subtitle: "Transform text into PascalCase naming convention",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "pascalcase" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "The PascalCase version appears instantly.",
      "Copy the result for use in your code.",
      "Works with spaces, hyphens, underscores, and mixed case.",
    ],
    about:
      "<p>Converts text to PascalCase (also called UpperCamelCase) — every word starts with a capital letter with no separators. This is the standard naming convention for classes, components, and types in languages like C#, Java, TypeScript, and React.</p>",
    faqs: [
      { question: "What is PascalCase?", answer: "PascalCase capitalizes the first letter of every word and joins them without separators. Example: 'hello world' becomes 'HelloWorld'." },
      { question: "How is PascalCase different from camelCase?", answer: "PascalCase capitalizes the first letter (HelloWorld) while camelCase keeps it lowercase (helloWorld)." },
      { question: "When should I use PascalCase?", answer: "It's standard for class names in most languages, React component names, TypeScript interfaces and types, and C# method names." },
    ],
    relatedSlugs: ["text-to-camelcase", "text-to-snakecase", "text-to-titlecase"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ENCODING / DECODING
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "text-to-base64",
    from: "Text",
    to: "Base64",
    category: "text",
    toolName: "Text to Base64 Encoder",
    description:
      "Encode text to Base64 instantly. Free online Base64 encoder — type or paste text and get the encoded result in real-time.",
    keyword: "text to base64",
    subtitle: "Encode your text into Base64 format",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "base64encode" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "The Base64-encoded version appears instantly.",
      "Click Copy to grab the encoded string.",
      "Use the Base64 to Text tool to decode it back.",
    ],
    about:
      "<p>Encodes text into Base64 format, which represents binary data as ASCII characters. Base64 is commonly used in email attachments (MIME), data URIs in HTML/CSS, embedding images in JSON, and basic authentication headers. This tool handles UTF-8 text correctly.</p>",
    faqs: [
      { question: "What is Base64 encoding?", answer: "Base64 is a binary-to-text encoding scheme that represents data using 64 ASCII characters (A-Z, a-z, 0-9, +, /). It's used to safely transmit binary data through text-only channels." },
      { question: "Does Base64 encrypt my text?", answer: "No — Base64 is an encoding, not encryption. Anyone can decode it. Do not use it to hide sensitive information." },
      { question: "Does this handle Unicode characters?", answer: "Yes — the tool encodes text as UTF-8 before Base64 encoding, so emoji, accented characters, and international text are supported." },
    ],
    relatedSlugs: ["base64-to-text", "text-to-url-encoded", "text-to-html-entities"],
    requiresFFmpeg: false,
  },
  {
    slug: "base64-to-text",
    from: "Base64",
    to: "Text",
    category: "text",
    toolName: "Base64 to Text Decoder",
    description:
      "Decode Base64 back to readable text instantly. Free online Base64 decoder — paste your encoded string and see the result.",
    keyword: "base64 to text",
    subtitle: "Decode Base64 strings back into readable text",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "base64decode" },
    acceptedExtensions: [],
    howTo: [
      "Paste your Base64-encoded string in the input panel.",
      "The decoded text appears instantly on the right.",
      "Click Copy to grab the decoded result.",
      "Invalid Base64 strings will show an error message.",
    ],
    about:
      "<p>Decodes Base64-encoded strings back into readable text. Useful for inspecting API responses, decoding email headers, reading data URIs, and debugging encoded payloads. Handles UTF-8 encoded content correctly.</p>",
    faqs: [
      { question: "What if the decoded result looks garbled?", answer: "The original content may have been binary data (like an image) rather than text. Base64 is used for all kinds of binary data, not just text." },
      { question: "How do I know if a string is Base64?", answer: "Base64 strings contain only A-Z, a-z, 0-9, +, and /, and often end with = or == padding. The string length is always a multiple of 4." },
      { question: "Does this handle URL-safe Base64?", answer: "Standard Base64 uses + and /. URL-safe Base64 uses - and _ instead. Replace those characters before decoding if needed." },
    ],
    relatedSlugs: ["text-to-base64", "url-encoded-to-text", "html-entities-to-text"],
    requiresFFmpeg: false,
  },
  {
    slug: "text-to-url-encoded",
    from: "Text",
    to: "URL Encoded",
    category: "text",
    toolName: "URL Encoder",
    description:
      "URL-encode text instantly. Encode special characters for safe use in URLs, query parameters, and form data.",
    keyword: "url encode text",
    subtitle: "Encode text for safe use in URLs",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "urlencode" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "The URL-encoded version appears instantly.",
      "Click Copy to grab the encoded string.",
      "Use this in URLs, query strings, or form submissions.",
    ],
    about:
      "<p>Encodes text using <code>encodeURIComponent()</code>, replacing special characters with their percent-encoded equivalents (e.g. space becomes <code>%20</code>). Essential for constructing safe URLs, query parameters, and form data.</p>",
    faqs: [
      { question: "What characters get encoded?", answer: "All characters except A-Z, a-z, 0-9, and - _ . ~ are encoded. Spaces become %20, ampersands become %26, etc." },
      { question: "What is the difference between encodeURI and encodeURIComponent?", answer: "This tool uses encodeURIComponent, which encodes all special characters including /, ?, &, and =. encodeURI leaves those intact because they have meaning in full URLs." },
      { question: "When do I need URL encoding?", answer: "Whenever you include user input in a URL query string, form action, or API call. Failing to encode can break the URL or create security vulnerabilities." },
    ],
    relatedSlugs: ["url-encoded-to-text", "text-to-base64", "text-to-html-entities"],
    requiresFFmpeg: false,
  },
  {
    slug: "url-encoded-to-text",
    from: "URL Encoded",
    to: "Text",
    category: "text",
    toolName: "URL Decoder",
    description:
      "Decode URL-encoded text instantly. Convert percent-encoded strings (%20, %26, etc.) back to readable text.",
    keyword: "url decode text",
    subtitle: "Decode percent-encoded strings back to readable text",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "urldecode" },
    acceptedExtensions: [],
    howTo: [
      "Paste your URL-encoded string in the input panel.",
      "The decoded text appears instantly on the right.",
      "Click Copy to grab the decoded result.",
      "Invalid percent-encoded sequences will show an error.",
    ],
    about:
      "<p>Decodes URL-encoded (percent-encoded) strings back into readable text using <code>decodeURIComponent()</code>. Useful for debugging URLs, reading query parameters, and inspecting form data.</p>",
    faqs: [
      { question: "What does %20 mean?", answer: "%20 is the URL-encoded representation of a space character. Each %XX sequence represents a byte value in hexadecimal." },
      { question: "Why does my URL have + signs instead of spaces?", answer: "In form data (application/x-www-form-urlencoded), + represents a space. Replace + with %20 before decoding, or replace + with spaces in the result." },
      { question: "Can I decode an entire URL?", answer: "This tool decodes the entire input. For best results, decode just the query parameter values rather than the full URL structure." },
    ],
    relatedSlugs: ["text-to-url-encoded", "base64-to-text", "html-entities-to-text"],
    requiresFFmpeg: false,
  },
  {
    slug: "text-to-html-entities",
    from: "Text",
    to: "HTML Entities",
    category: "text",
    toolName: "HTML Entity Encoder",
    description:
      "Encode text as HTML entities. Escape &, <, >, quotes, and other special characters for safe HTML output.",
    keyword: "html entity encode",
    subtitle: "Escape special characters for safe HTML output",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "htmlencode" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "HTML entities appear instantly on the right.",
      "Click Copy to grab the escaped output.",
      "Paste into your HTML source code safely.",
    ],
    about:
      '<p>Encodes special HTML characters into their entity equivalents: <code>&amp;</code> becomes <code>&amp;amp;</code>, <code>&lt;</code> becomes <code>&amp;lt;</code>, <code>&gt;</code> becomes <code>&amp;gt;</code>, <code>"</code> becomes <code>&amp;quot;</code>, and <code>\'</code> becomes <code>&amp;#39;</code>. Prevents XSS vulnerabilities and rendering issues when displaying user content in HTML.</p>',
    faqs: [
      { question: "Why do I need to encode HTML entities?", answer: "Unescaped special characters in HTML can break your page layout or create security vulnerabilities (XSS attacks). Encoding ensures characters are displayed literally rather than interpreted as HTML." },
      { question: "Which characters are encoded?", answer: "The five critical characters: & (ampersand), < (less than), > (greater than), \" (double quote), and ' (single quote / apostrophe)." },
      { question: "Should I encode all text in my HTML?", answer: "Any text that comes from user input or external sources should be encoded before inserting into HTML. Most frameworks do this automatically." },
    ],
    relatedSlugs: ["html-entities-to-text", "text-to-url-encoded", "text-to-base64"],
    requiresFFmpeg: false,
  },
  {
    slug: "html-entities-to-text",
    from: "HTML Entities",
    to: "Text",
    category: "text",
    toolName: "HTML Entity Decoder",
    description:
      "Decode HTML entities back to readable text. Convert &amp;amp;, &amp;lt;, &amp;gt;, and more to their original characters.",
    keyword: "html entity decode",
    subtitle: "Convert HTML entities back to readable characters",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "htmldecode" },
    acceptedExtensions: [],
    howTo: [
      "Paste your HTML-encoded text in the input panel.",
      "The decoded text appears instantly on the right.",
      "Click Copy to grab the decoded result.",
      "Supports common named entities and numeric references.",
    ],
    about:
      "<p>Decodes HTML entities back into their original characters. Handles named entities like <code>&amp;amp;</code>, <code>&amp;lt;</code>, <code>&amp;gt;</code>, <code>&amp;quot;</code>, <code>&amp;#39;</code>, and <code>&amp;nbsp;</code>. Useful when extracting text from HTML source code or processing scraped web content.</p>",
    faqs: [
      { question: "What HTML entities are supported?", answer: "Common named entities: &amp;, &lt;, &gt;, &quot;, &#39;, &#x27;, &apos;, and &nbsp;. For other entities, you may need to process the full HTML." },
      { question: "Why does my text have &amp;amp; in it?", answer: "This happens when HTML has been double-encoded. Run the decoder twice, or check the source that produced the text." },
      { question: "Does this decode all HTML entities?", answer: "This tool handles the most common entities. For full HTML entity support including all named entities and numeric character references, use a dedicated HTML parser." },
    ],
    relatedSlugs: ["text-to-html-entities", "url-encoded-to-text", "base64-to-text"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // OTHER TEXT TRANSFORMATIONS
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "text-to-slug",
    from: "Text",
    to: "URL Slug",
    category: "text",
    toolName: "Text to Slug Converter",
    description:
      "Convert text to a URL-friendly slug. Lowercase, hyphenated, and clean — perfect for URLs and permalinks.",
    keyword: "text to slug",
    subtitle: "Generate clean URL slugs from any text",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "slug" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text (e.g. a blog post title) in the input.",
      "A clean URL slug appears instantly on the right.",
      "Click Copy to grab the slug.",
      "Use it in your URL, file name, or database.",
    ],
    about:
      "<p>Converts text into a URL-friendly slug by lowercasing everything, replacing spaces and underscores with hyphens, removing special characters, and collapsing consecutive hyphens. The result is a clean, readable identifier suitable for URLs, file names, and database keys.</p>",
    faqs: [
      { question: "What is a URL slug?", answer: "A slug is the URL-friendly version of a title or name. For example, 'My Blog Post Title!' becomes 'my-blog-post-title'. It's used in the URL path for SEO and readability." },
      { question: "Are accented characters handled?", answer: "Currently, accented characters are removed. For full transliteration (e.g. u to u), you may need a specialized library." },
      { question: "What characters are removed?", answer: "Everything except letters, numbers, spaces, underscores, and hyphens is removed. Spaces and underscores become hyphens." },
    ],
    relatedSlugs: ["text-to-kebabcase", "text-to-lowercase", "text-to-url-encoded"],
    requiresFFmpeg: false,
  },
  {
    slug: "text-reverse",
    from: "Text",
    to: "Reversed Text",
    category: "text",
    toolName: "Reverse Text Tool",
    description:
      "Reverse any text string instantly. Flip characters, words, or entire paragraphs — free online tool.",
    keyword: "reverse text",
    subtitle: "Flip your text backwards character by character",
    componentKey: "TextCaseConverterTool",
    componentProps: { conversionType: "reverse" },
    acceptedExtensions: [],
    howTo: [
      "Type or paste your text in the input panel.",
      "The reversed text appears instantly on the right.",
      "Click Copy to grab the reversed result.",
      "Works with any language and special characters.",
    ],
    about:
      "<p>Reverses the character order of your text. Uses JavaScript's spread operator to correctly handle Unicode characters including emoji and multi-byte sequences. Useful for palindrome checking, text puzzles, creative effects, and data obfuscation.</p>",
    faqs: [
      { question: "Does it handle emoji correctly?", answer: "Yes — the tool uses Unicode-aware string splitting, so emoji and other multi-byte characters are reversed as whole units rather than being broken apart." },
      { question: "Can I reverse individual words instead of the whole string?", answer: "This tool reverses all characters. To reverse word order while keeping each word intact, you would need to split by spaces, reverse the array, and rejoin." },
      { question: "What are common uses for text reversal?", answer: "Checking palindromes, creating mirror text effects, simple text obfuscation, programming exercises, and generating backwards messages for fun." },
    ],
    relatedSlugs: ["text-to-uppercase", "text-to-lowercase", "text-to-slug"],
    requiresFFmpeg: false,
  },
];
