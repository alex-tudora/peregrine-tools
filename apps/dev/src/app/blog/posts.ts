export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  content: string;
  relatedTools: { name: string; href: string }[];
}

export const posts: BlogPost[] = [
  {
    slug: "json-formatting-best-practices",
    title: "JSON Formatting Best Practices for Developers",
    description:
      "Learn how to write clean, valid JSON. Covers formatting conventions, common validation errors, and tools to make your life easier.",
    date: "2026-03-20",
    readingTime: "4 min read",
    relatedTools: [
      { name: "JSON Formatter", href: "/json-formatter" },
      { name: "JSON Validator", href: "/json-validator" },
    ],
    content: `
      <p>
        JSON (JavaScript Object Notation) is the universal data interchange format for modern
        applications. Whether you're building REST APIs, configuring tools, or passing data between
        services, writing clean and valid JSON is a fundamental skill. Yet even experienced
        developers regularly trip over formatting issues. Here are the best practices that save
        time and prevent headaches.
      </p>

      <h2>1. Always Validate Before Shipping</h2>
      <p>
        A single trailing comma, a missing quote, or an unescaped character can break an entire
        API response or config file. Before committing JSON to a repository or sending it to an
        API, run it through a <a href="/json-validator">JSON validator</a>. This catches syntax
        errors instantly, with clear line-by-line error messages so you know exactly what to fix.
      </p>

      <h2>2. Use Consistent Indentation</h2>
      <p>
        Two spaces, four spaces, or tabs — pick one and stick with it across your project. Most
        teams prefer 2-space indentation for JSON because it keeps deeply nested objects readable
        without excessive horizontal scrolling. A <a href="/json-formatter">JSON formatter</a>
        can automatically reformat messy or minified JSON into a clean, consistently indented
        structure.
      </p>

      <h2>3. Know the Common Errors</h2>
      <p>
        These are the mistakes that catch developers most often:
      </p>
      <ul>
        <li><strong>Trailing commas:</strong> JSON does not allow a comma after the last item in an array or object. Unlike JavaScript, <code>{"a": 1, "b": 2,}</code> is invalid JSON.</li>
        <li><strong>Single quotes:</strong> JSON requires double quotes for strings. <code>{'name': 'Alex'}</code> will fail — use <code>{"name": "Alex"}</code>.</li>
        <li><strong>Unescaped special characters:</strong> Backslashes, newlines, and tabs inside strings must be escaped (<code>\\n</code>, <code>\\t</code>, <code>\\\\</code>).</li>
        <li><strong>Comments:</strong> JSON does not support comments. If you need comments, consider JSONC or YAML instead.</li>
      </ul>

      <h2>4. Minify for Production, Pretty-Print for Debugging</h2>
      <p>
        When JSON is sent over the wire — API responses, config payloads, log entries — minified
        JSON saves bandwidth and parsing time. But when you're reading JSON in a terminal, log
        file, or debugger, pretty-printed JSON is essential for readability. Use a
        <a href="/json-formatter">formatting tool</a> to switch between the two instantly.
      </p>

      <h2>5. Use Meaningful Key Names</h2>
      <p>
        Keys should be descriptive and follow a consistent naming convention. Most JSON APIs use
        camelCase (<code>firstName</code>) or snake_case (<code>first_name</code>). Avoid
        abbreviations that only make sense to you — <code>usrNm</code> is not helpful six months
        later. Consistent naming makes your data self-documenting and easier to work with.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Clean JSON is not about aesthetics — it's about preventing bugs and making your codebase
        maintainable. Validate early, format consistently, and use a
        <a href="/json-formatter">browser-based formatter</a> to handle the tedious parts
        automatically. It takes seconds and saves hours of debugging.
      </p>
    `,
  },
  {
    slug: "regex-cheat-sheet",
    title: "Regex Cheat Sheet: The Most Useful Patterns",
    description:
      "A practical reference for the most common regular expressions. Covers email, URL, phone number, IP address patterns and more.",
    date: "2026-03-18",
    readingTime: "4 min read",
    relatedTools: [
      { name: "Regex Tester", href: "/regex-tester" },
    ],
    content: `
      <p>
        Regular expressions are one of the most powerful tools in a developer's arsenal — and
        one of the most frustrating to get right. This cheat sheet covers the patterns you'll
        actually use in real projects, with explanations for each.
      </p>

      <h2>Essential Syntax</h2>
      <p>Before diving into patterns, here's a quick refresher on the building blocks:</p>
      <ul>
        <li><code>.</code> — matches any single character (except newline)</li>
        <li><code>*</code> — zero or more of the preceding element</li>
        <li><code>+</code> — one or more of the preceding element</li>
        <li><code>?</code> — zero or one of the preceding element (makes it optional)</li>
        <li><code>^</code> — start of string, <code>$</code> — end of string</li>
        <li><code>[abc]</code> — character class (matches a, b, or c)</li>
        <li><code>[^abc]</code> — negated class (matches anything except a, b, or c)</li>
        <li><code>\\d</code> — digit, <code>\\w</code> — word character, <code>\\s</code> — whitespace</li>
        <li><code>(group)</code> — capturing group, <code>(?:group)</code> — non-capturing group</li>
      </ul>

      <h2>Email Address</h2>
      <p>
        A practical email regex that covers the vast majority of real-world addresses:
      </p>
      <p><code>^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$</code></p>
      <p>
        This matches standard email formats like <code>user@example.com</code> and
        <code>first.last+tag@sub.domain.co.uk</code>. For production validation, combine
        regex with server-side verification.
      </p>

      <h2>URL</h2>
      <p>
        Match HTTP and HTTPS URLs:
      </p>
      <p><code>https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\/\\w\\-._~:?#\\[\\]@!$&'()*+,;=]*</code></p>

      <h2>Phone Number (US)</h2>
      <p>
        Matches common US phone formats like (555) 123-4567, 555-123-4567, and 5551234567:
      </p>
      <p><code>^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$</code></p>

      <h2>IP Address (IPv4)</h2>
      <p>
        Matches valid IPv4 addresses like 192.168.1.1:
      </p>
      <p><code>^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$</code></p>

      <h2>Hex Color Code</h2>
      <p>
        Matches 3-digit and 6-digit hex colors like #fff and #1a2b3c:
      </p>
      <p><code>^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$</code></p>

      <h2>Password Strength</h2>
      <p>
        Requires at least 8 characters, one uppercase, one lowercase, one digit, and one special character:
      </p>
      <p><code>^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$</code></p>

      <h2>Date (YYYY-MM-DD)</h2>
      <p>
        Matches ISO 8601 date format:
      </p>
      <p><code>^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$</code></p>

      <h2>Testing Your Patterns</h2>
      <p>
        Writing regex is only half the battle — testing it with real data is essential. Use a
        <a href="/regex-tester">regex tester</a> to paste your pattern and test strings, see
        matches highlighted in real time, and catch edge cases before they reach production.
        Testing in a dedicated tool is dramatically faster than running your application
        repeatedly.
      </p>
    `,
  },
  {
    slug: "base64-encoding-explained",
    title: "Base64 Encoding Explained: When and Why to Use It",
    description:
      "Understand what Base64 encoding is, how it works, and when you should (and shouldn't) use it in your applications.",
    date: "2026-03-15",
    readingTime: "4 min read",
    relatedTools: [
      { name: "Base64 Encoder/Decoder", href: "/base64" },
      { name: "JWT Decoder", href: "/jwt-decoder" },
    ],
    content: `
      <p>
        Base64 encoding is everywhere in modern software — from embedding images in HTML to
        transmitting binary data in JSON APIs. Yet many developers use it without fully
        understanding what it does, when it's appropriate, and when it's not. Let's fix that.
      </p>

      <h2>What Is Base64?</h2>
      <p>
        Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable
        ASCII characters (A-Z, a-z, 0-9, +, /). It takes every 3 bytes of input and converts
        them into 4 ASCII characters. This means Base64-encoded data is always about 33% larger
        than the original — an important tradeoff to understand.
      </p>
      <p>
        The name "Base64" comes from the fact that it uses a 64-character alphabet. The padding
        character <code>=</code> is used when the input length isn't a multiple of 3.
      </p>

      <h2>When to Use Base64</h2>
      <p>Here are the legitimate, common use cases:</p>
      <ul>
        <li><strong>Embedding images in CSS/HTML:</strong> Data URIs like <code>data:image/png;base64,...</code> let you inline small images directly into markup, avoiding extra HTTP requests.</li>
        <li><strong>Email attachments (MIME):</strong> Email protocols only support text. Binary attachments (PDFs, images) are Base64-encoded for transmission.</li>
        <li><strong>JSON/XML payloads:</strong> When you need to include binary data in a text-based format, Base64 is the standard approach.</li>
        <li><strong>JWT tokens:</strong> JSON Web Tokens use Base64URL encoding for the header and payload sections. You can decode them with a <a href="/jwt-decoder">JWT decoder</a>.</li>
        <li><strong>Basic HTTP authentication:</strong> The <code>Authorization: Basic</code> header encodes credentials as Base64.</li>
      </ul>

      <h2>When NOT to Use Base64</h2>
      <p>Base64 is frequently misused. Avoid it in these cases:</p>
      <ul>
        <li><strong>As encryption or security:</strong> Base64 is NOT encryption. Anyone can decode it instantly. Never use it to "hide" passwords, tokens, or sensitive data.</li>
        <li><strong>Large files:</strong> The 33% size increase makes Base64 impractical for large files. Use proper binary transfer (multipart form data, binary protocols) instead.</li>
        <li><strong>Storing images in databases:</strong> Store files on disk or in object storage (S3) and reference them by URL. Base64 in a database is almost always a mistake.</li>
      </ul>

      <h2>How to Encode and Decode</h2>
      <p>
        In JavaScript, you can use <code>btoa()</code> to encode and <code>atob()</code> to
        decode. In Node.js, use <code>Buffer.from(str).toString('base64')</code> and
        <code>Buffer.from(b64, 'base64').toString()</code>. Python has the <code>base64</code>
        module, and most languages include built-in support.
      </p>
      <p>
        For quick one-off encoding and decoding, a <a href="/base64">browser-based Base64 tool</a>
        is the fastest option — paste your text, get the result instantly, no code needed.
      </p>

      <h2>Base64 vs Base64URL</h2>
      <p>
        Standard Base64 uses <code>+</code> and <code>/</code> characters, which are problematic
        in URLs and filenames. Base64URL replaces them with <code>-</code> and <code>_</code> and
        omits padding. This variant is used in JWTs, URL parameters, and filenames. Most
        <a href="/base64">encoding tools</a> support both variants.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        Base64 is a simple, essential tool for converting binary data to text. Use it when you
        need to embed binary content in text-based formats. Don't use it for security, large
        files, or database storage. And when you need to quickly encode or decode a string,
        a <a href="/base64">browser-based tool</a> gets it done in seconds.
      </p>
    `,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}
