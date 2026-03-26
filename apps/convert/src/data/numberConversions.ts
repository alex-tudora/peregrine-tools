import type { ConversionDef } from "./conversions";

/**
 * Number system conversion pages.
 *
 * Each entry targets a specific keyword (e.g. "decimal to binary",
 * "hex to decimal"). The converter is the NumberConverterTool, which
 * shows ALL bases simultaneously. The fromBase/toBase props control
 * the default input base and highlighted output.
 */
export const numberConversions: ConversionDef[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // DECIMAL <-> BINARY
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "decimal-to-binary",
    from: "Decimal",
    to: "Binary",
    category: "number",
    toolName: "Decimal to Binary Converter",
    description:
      "Convert decimal numbers to binary instantly. Free online tool shows binary, hex, octal, and Roman numeral equivalents.",
    keyword: "decimal to binary",
    subtitle: "Convert base-10 numbers to binary (base 2)",
    componentKey: "NumberConverterTool",
    componentProps: { fromBase: "decimal", toBase: "binary" },
    acceptedExtensions: [],
    howTo: [
      "Enter a decimal number in the input field.",
      "The binary equivalent and all other bases appear instantly.",
      "Use the base selector to switch your input format.",
      "Click Copy next to any result to grab it.",
    ],
    about:
      "<p>Converts decimal (base 10) numbers to binary (base 2) representation. Binary is the fundamental number system used by computers, where every value is expressed using only 0s and 1s. This tool also shows the equivalent in hexadecimal, octal, Roman numerals, and scientific notation.</p>",
    faqs: [
      { question: "How does decimal to binary conversion work?", answer: "Divide the decimal number by 2 repeatedly, recording the remainder each time. Read the remainders from bottom to top. For example, 13 in decimal is 1101 in binary." },
      { question: "What is the largest number this tool can convert?", answer: "JavaScript safely handles integers up to 2^53 - 1 (9,007,199,254,740,991). Numbers larger than this may lose precision." },
      { question: "Why is binary important?", answer: "Computers process all data as binary — sequences of 0s and 1s representing on/off states in transistors. Understanding binary is fundamental to computer science." },
    ],
    relatedSlugs: ["binary-to-decimal", "decimal-to-hex", "decimal-to-octal"],
    requiresFFmpeg: false,
  },
  {
    slug: "binary-to-decimal",
    from: "Binary",
    to: "Decimal",
    category: "number",
    toolName: "Binary to Decimal Converter",
    description:
      "Convert binary numbers to decimal instantly. Paste a binary string and see the decimal, hex, octal, and Roman equivalents.",
    keyword: "binary to decimal",
    subtitle: "Convert binary (base 2) numbers to decimal (base 10)",
    componentKey: "NumberConverterTool",
    componentProps: { fromBase: "binary", toBase: "decimal" },
    acceptedExtensions: [],
    howTo: [
      "Enter a binary number (0s and 1s only) in the input field.",
      "The decimal equivalent and all other bases appear instantly.",
      "Use the base selector to switch your input format.",
      "Click Copy next to any result to grab it.",
    ],
    about:
      "<p>Converts binary (base 2) numbers to decimal (base 10). Each binary digit represents a power of 2 — the rightmost digit is 2^0 (1), the next is 2^1 (2), then 2^2 (4), and so on. This tool validates your input and shows the result in all common number systems.</p>",
    faqs: [
      { question: "How do I read binary numbers?", answer: "Each position represents a power of 2, from right to left: 1, 2, 4, 8, 16, 32, etc. Add the values of positions that have a 1. For example, 1101 = 8 + 4 + 0 + 1 = 13." },
      { question: "What if my binary has spaces or prefixes?", answer: "Enter only 0s and 1s. Remove any 0b prefix, spaces, or other characters before converting." },
      { question: "What is the largest binary number I can enter?", answer: "You can enter binary numbers up to 53 digits long (2^53 - 1). Longer values may lose precision due to JavaScript's number handling." },
    ],
    relatedSlugs: ["decimal-to-binary", "hex-to-decimal", "octal-to-decimal"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // DECIMAL <-> HEXADECIMAL
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "decimal-to-hex",
    from: "Decimal",
    to: "Hex",
    category: "number",
    toolName: "Decimal to Hexadecimal Converter",
    description:
      "Convert decimal numbers to hexadecimal instantly. Free tool shows hex, binary, octal, and Roman numeral equivalents.",
    keyword: "decimal to hex",
    subtitle: "Convert base-10 numbers to hexadecimal (base 16)",
    componentKey: "NumberConverterTool",
    componentProps: { fromBase: "decimal", toBase: "hexadecimal" },
    acceptedExtensions: [],
    howTo: [
      "Enter a decimal number in the input field.",
      "The hexadecimal equivalent and all other bases appear instantly.",
      "Switch the input base if you want to convert from another format.",
      "Click Copy next to any result to use it.",
    ],
    about:
      "<p>Converts decimal (base 10) numbers to hexadecimal (base 16). Hexadecimal uses digits 0-9 and letters A-F to represent values, making it a compact way to express binary data. It's widely used in programming for memory addresses, color codes (#FF5733), and byte values.</p>",
    faqs: [
      { question: "What is hexadecimal?", answer: "Hexadecimal (hex) is a base-16 number system using digits 0-9 and letters A-F. Each hex digit represents 4 binary bits, making it a concise way to write binary values." },
      { question: "How do I convert decimal to hex manually?", answer: "Divide the decimal number by 16 repeatedly, recording the remainder (0-15, where 10=A, 11=B, etc.). Read the remainders from bottom to top." },
      { question: "Why do programmers use hexadecimal?", answer: "Hex is compact (one hex digit = 4 binary bits) and maps neatly to bytes (2 hex digits = 1 byte). It's used for color codes, memory addresses, and viewing binary data." },
    ],
    relatedSlugs: ["hex-to-decimal", "decimal-to-binary", "decimal-to-octal"],
    requiresFFmpeg: false,
  },
  {
    slug: "hex-to-decimal",
    from: "Hex",
    to: "Decimal",
    category: "number",
    toolName: "Hexadecimal to Decimal Converter",
    description:
      "Convert hexadecimal numbers to decimal instantly. Paste a hex value and see decimal, binary, octal, and Roman equivalents.",
    keyword: "hex to decimal",
    subtitle: "Convert hexadecimal (base 16) to decimal (base 10)",
    componentKey: "NumberConverterTool",
    componentProps: { fromBase: "hexadecimal", toBase: "decimal" },
    acceptedExtensions: [],
    howTo: [
      "Enter a hexadecimal value (0-9, A-F) in the input field.",
      "The decimal equivalent and all other bases appear instantly.",
      "You can include the 0x prefix or leave it out.",
      "Click Copy next to any result to use it.",
    ],
    about:
      "<p>Converts hexadecimal (base 16) values to decimal (base 10). Useful for interpreting color codes, memory addresses, ASCII values, and other hex-encoded data. The tool accepts both uppercase and lowercase hex digits and optionally the 0x prefix.</p>",
    faqs: [
      { question: "How do I convert hex to decimal manually?", answer: "Multiply each hex digit by its positional power of 16, then sum the results. For example, 1A = (1 x 16) + (10 x 1) = 26." },
      { question: "Does this accept the 0x prefix?", answer: "Yes — you can enter 0xFF or just FF. The tool strips the prefix automatically." },
      { question: "What does FF equal in decimal?", answer: "FF in hexadecimal equals 255 in decimal — it's the maximum value of a single byte." },
    ],
    relatedSlugs: ["decimal-to-hex", "binary-to-decimal", "octal-to-decimal"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // DECIMAL <-> OCTAL
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "decimal-to-octal",
    from: "Decimal",
    to: "Octal",
    category: "number",
    toolName: "Decimal to Octal Converter",
    description:
      "Convert decimal numbers to octal instantly. Free tool shows octal, binary, hex, and Roman numeral equivalents.",
    keyword: "decimal to octal",
    subtitle: "Convert base-10 numbers to octal (base 8)",
    componentKey: "NumberConverterTool",
    componentProps: { fromBase: "decimal", toBase: "octal" },
    acceptedExtensions: [],
    howTo: [
      "Enter a decimal number in the input field.",
      "The octal equivalent and all other bases appear instantly.",
      "Switch the input base if you want to convert from another format.",
      "Click Copy next to any result to use it.",
    ],
    about:
      "<p>Converts decimal (base 10) numbers to octal (base 8). Octal uses digits 0-7 and was historically important in computing because each octal digit maps to exactly 3 binary bits. It's still used today for Unix file permissions (chmod 755) and some programming contexts.</p>",
    faqs: [
      { question: "What is octal?", answer: "Octal is a base-8 number system using digits 0-7. Each octal digit represents 3 binary bits, making it a compact way to express groups of 3 bits." },
      { question: "Where is octal used today?", answer: "Primarily in Unix/Linux file permissions (e.g. chmod 755 means rwxr-xr-x). It also appears in some programming languages as number literals prefixed with 0 or 0o." },
      { question: "How do I convert decimal to octal manually?", answer: "Divide the decimal number by 8 repeatedly, recording the remainder each time. Read the remainders from bottom to top to get the octal representation." },
    ],
    relatedSlugs: ["octal-to-decimal", "decimal-to-binary", "decimal-to-hex"],
    requiresFFmpeg: false,
  },
  {
    slug: "octal-to-decimal",
    from: "Octal",
    to: "Decimal",
    category: "number",
    toolName: "Octal to Decimal Converter",
    description:
      "Convert octal numbers to decimal instantly. Enter an octal value and see the decimal, binary, hex, and Roman equivalents.",
    keyword: "octal to decimal",
    subtitle: "Convert octal (base 8) to decimal (base 10)",
    componentKey: "NumberConverterTool",
    componentProps: { fromBase: "octal", toBase: "decimal" },
    acceptedExtensions: [],
    howTo: [
      "Enter an octal number (digits 0-7 only) in the input field.",
      "The decimal equivalent and all other bases appear instantly.",
      "You can include the 0o prefix or leave it out.",
      "Click Copy next to any result to use it.",
    ],
    about:
      "<p>Converts octal (base 8) values to decimal (base 10). Useful for interpreting Unix file permissions, understanding legacy computing notation, and working with programming languages that use octal literals. The tool accepts the 0o prefix optionally.</p>",
    faqs: [
      { question: "How do I convert octal to decimal manually?", answer: "Multiply each octal digit by its positional power of 8, then sum the results. For example, 755 in octal = (7 x 64) + (5 x 8) + (5 x 1) = 493 in decimal." },
      { question: "What does 777 in octal mean?", answer: "In octal, 777 equals 511 in decimal. In Unix file permissions, chmod 777 grants read, write, and execute permissions to everyone." },
      { question: "Why do some numbers start with 0o?", answer: "The 0o prefix (zero followed by lowercase o) is used in JavaScript, Python, and other languages to indicate an octal literal, distinguishing it from decimal." },
    ],
    relatedSlugs: ["decimal-to-octal", "binary-to-decimal", "hex-to-decimal"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // DECIMAL <-> ROMAN
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "decimal-to-roman",
    from: "Decimal",
    to: "Roman",
    category: "number",
    toolName: "Decimal to Roman Numeral Converter",
    description:
      "Convert decimal numbers to Roman numerals instantly. Supports values from 1 to 3999 — free online tool.",
    keyword: "decimal to roman numerals",
    subtitle: "Convert numbers into Roman numeral notation",
    componentKey: "NumberConverterTool",
    componentProps: { fromBase: "decimal", toBase: "roman" },
    acceptedExtensions: [],
    howTo: [
      "Enter a decimal number between 1 and 3999.",
      "The Roman numeral equivalent appears instantly.",
      "All other number base equivalents are also shown.",
      "Click Copy next to the Roman numeral to use it.",
    ],
    about:
      '<p>Converts decimal numbers to Roman numerals using the standard notation (I, V, X, L, C, D, M). Supports values from 1 to 3999 — the traditional range of Roman numerals without extended notation. Uses subtractive notation (IV for 4, IX for 9, etc.) for compact results.</p>',
    faqs: [
      { question: "What is the range of Roman numerals?", answer: "Standard Roman numerals represent values from 1 (I) to 3999 (MMMCMXCIX). Values above 3999 require extended notation with overlines, which is not part of this tool." },
      { question: "What are the basic Roman numeral symbols?", answer: "I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. Subtractive pairs: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900." },
      { question: "Where are Roman numerals still used?", answer: "Clock faces, movie copyright dates, book chapters, Super Bowl numbering, monarch names (Elizabeth II), and formal outlines." },
    ],
    relatedSlugs: ["roman-to-decimal", "decimal-to-binary", "decimal-to-hex"],
    requiresFFmpeg: false,
  },
  {
    slug: "roman-to-decimal",
    from: "Roman",
    to: "Decimal",
    category: "number",
    toolName: "Roman Numeral to Decimal Converter",
    description:
      "Convert Roman numerals to decimal numbers instantly. Enter any Roman numeral (I to MMMCMXCIX) and see the numeric value.",
    keyword: "roman numerals to decimal",
    subtitle: "Convert Roman numerals back to decimal numbers",
    componentKey: "NumberConverterTool",
    componentProps: { fromBase: "roman", toBase: "decimal" },
    acceptedExtensions: [],
    howTo: [
      "Enter a Roman numeral (e.g. XLII) in the input field.",
      "The decimal equivalent and all other bases appear instantly.",
      "Both uppercase and lowercase input is accepted.",
      "Invalid Roman numerals will show an error message.",
    ],
    about:
      "<p>Converts Roman numerals to decimal (base 10) values. The tool validates the input by round-tripping: it converts the Roman numeral to a number, converts back to Roman, and confirms they match. This catches invalid sequences like 'IIII' or 'VV'.</p>",
    faqs: [
      { question: "How do I read Roman numerals?", answer: "Add the values of symbols from left to right. When a smaller value precedes a larger one, subtract it (IV = 5 - 1 = 4). Otherwise, add it (VI = 5 + 1 = 6)." },
      { question: "What makes a Roman numeral invalid?", answer: "Invalid patterns include: repeating V, L, or D; more than three consecutive I, X, or C; incorrect subtractive combinations (like IC or XM). The tool detects these by validation." },
      { question: "Is the input case-sensitive?", answer: "No — you can enter XLII, xlii, or Xlii. The tool normalises the input to uppercase before processing." },
    ],
    relatedSlugs: ["decimal-to-roman", "binary-to-decimal", "hex-to-decimal"],
    requiresFFmpeg: false,
  },
];
