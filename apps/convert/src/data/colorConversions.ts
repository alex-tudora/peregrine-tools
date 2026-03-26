import type { ConversionDef } from "./conversions";

/**
 * Color conversion pages.
 *
 * Each entry targets a specific keyword (e.g. "HEX to RGB", "RGB to CMYK").
 * The converter shows ALL color formats simultaneously, but the fromFormat
 * and toFormat props highlight which conversion the page is about.
 */
export const colorConversions: ConversionDef[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // HEX <-> RGB
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "hex-to-rgb",
    from: "HEX",
    to: "RGB",
    category: "color",
    toolName: "HEX to RGB Converter",
    description:
      "Convert HEX color codes to RGB values instantly. Free online tool shows RGB, HSL, CMYK, and all other formats too.",
    keyword: "HEX to RGB",
    subtitle: "Convert hexadecimal color codes to RGB values",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "hex", toFormat: "rgb" },
    acceptedExtensions: [],
    howTo: [
      "Enter a HEX color code (e.g. #FF5733) in the input field.",
      "Or use the color picker to select a color visually.",
      "All color formats appear instantly below.",
      "Click Copy next to any format to grab the value.",
    ],
    about:
      "<p>Converts hexadecimal color codes to RGB (Red, Green, Blue) values. HEX colors use a six-digit code where pairs of digits represent red, green, and blue channels in base 16. For example, #FF5733 means red=255, green=87, blue=51.</p><p>This tool also shows HSL, HSB, CMYK, and OKLCH equivalents. Everything runs in your browser — no data is sent anywhere.</p>",
    faqs: [
      { question: "What is a HEX color code?", answer: "A HEX color code is a six-character string (preceded by #) that represents a color using hexadecimal notation. Each pair of characters encodes the red, green, or blue channel from 00 (0) to FF (255)." },
      { question: "Can I enter shorthand HEX codes?", answer: "Yes — three-character shorthand like #F53 is supported and expands to #FF5533." },
      { question: "Are the conversions exact?", answer: "Yes — HEX to RGB is a lossless conversion since both formats represent the same color space." },
    ],
    relatedSlugs: ["rgb-to-hex", "hex-to-hsl", "hex-to-cmyk", "hex-to-oklch"],
    requiresFFmpeg: false,
  },
  {
    slug: "rgb-to-hex",
    from: "RGB",
    to: "HEX",
    category: "color",
    toolName: "RGB to HEX Converter",
    description:
      "Convert RGB color values to HEX codes instantly. Free online tool for designers and developers — no sign-up needed.",
    keyword: "RGB to HEX",
    subtitle: "Convert RGB values to hexadecimal color codes",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "rgb", toFormat: "hex" },
    acceptedExtensions: [],
    howTo: [
      "Enter an RGB value like rgb(255, 87, 51) in the input field.",
      "Or use the color picker to select a color visually.",
      "The HEX code and all other formats appear instantly.",
      "Click Copy to grab any value.",
    ],
    about:
      "<p>Converts RGB (Red, Green, Blue) color values to hexadecimal codes. RGB defines colors by specifying the intensity of red, green, and blue channels from 0 to 255. The tool converts these to a compact six-digit HEX code used in CSS, HTML, and design tools.</p>",
    faqs: [
      { question: "How does RGB to HEX conversion work?", answer: "Each RGB channel (0-255) is converted to a two-digit hexadecimal number (00-FF). The three pairs are concatenated with a # prefix." },
      { question: "Is rgb(0, 0, 0) the same as #000000?", answer: "Yes — both represent pure black. Similarly, rgb(255, 255, 255) equals #FFFFFF (white)." },
      { question: "When should I use HEX vs RGB?", answer: "HEX is more compact in CSS and widely used in design. RGB is more intuitive when you need to reason about individual channel values or use rgba() for transparency." },
    ],
    relatedSlugs: ["hex-to-rgb", "rgb-to-hsl", "rgb-to-cmyk", "rgb-to-hsb"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // HEX <-> HSL
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "hex-to-hsl",
    from: "HEX",
    to: "HSL",
    category: "color",
    toolName: "HEX to HSL Converter",
    description:
      "Convert HEX color codes to HSL values instantly. See hue, saturation, and lightness for any hex color.",
    keyword: "HEX to HSL",
    subtitle: "Convert hexadecimal colors to HSL notation",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "hex", toFormat: "hsl" },
    acceptedExtensions: [],
    howTo: [
      "Enter a HEX color code like #3498DB in the input.",
      "The HSL value and all other formats appear instantly.",
      "Use the color picker for visual selection.",
      "Copy any format with one click.",
    ],
    about:
      "<p>Converts HEX color codes to HSL (Hue, Saturation, Lightness). HSL is a more intuitive color model where hue is the color angle (0-360 degrees), saturation is color intensity (0-100%), and lightness controls brightness (0-100%). It is widely used in CSS and makes it easy to create color variations.</p>",
    faqs: [
      { question: "Why use HSL over HEX?", answer: "HSL is more human-readable. You can easily adjust lightness to create tints and shades, or change saturation to make colors more or less vivid, without recalculating hex pairs." },
      { question: "Is HEX to HSL lossless?", answer: "Practically yes — both are representations of sRGB colors. Minor rounding may occur in the HSL percentages, but the visual difference is imperceptible." },
      { question: "What does hsl(0, 100%, 50%) look like?", answer: "Pure red. Hue 0 (or 360) is red, 120 is green, and 240 is blue." },
    ],
    relatedSlugs: ["hsl-to-hex", "hex-to-rgb", "rgb-to-hsl"],
    requiresFFmpeg: false,
  },
  {
    slug: "hsl-to-hex",
    from: "HSL",
    to: "HEX",
    category: "color",
    toolName: "HSL to HEX Converter",
    description:
      "Convert HSL color values to HEX codes instantly. Free online tool for CSS and web design color conversions.",
    keyword: "HSL to HEX",
    subtitle: "Convert HSL notation to hexadecimal color codes",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "hsl", toFormat: "hex" },
    acceptedExtensions: [],
    howTo: [
      "Enter an HSL value like hsl(11, 100%, 60%) in the input.",
      "The HEX code and all other formats appear instantly.",
      "Use the color picker for visual selection.",
      "Copy any result with one click.",
    ],
    about:
      "<p>Converts HSL (Hue, Saturation, Lightness) values to HEX color codes. HSL is popular in CSS for its intuitive color manipulation — change lightness for tints/shades or saturation for vibrancy. This tool gives you the corresponding HEX code for use in HTML, design tools, and anywhere hex colors are needed.</p>",
    faqs: [
      { question: "How do I write an HSL value?", answer: "Use the format hsl(hue, saturation%, lightness%). Hue is 0-360 degrees, saturation and lightness are 0-100%. Example: hsl(210, 80%, 50%) is a medium blue." },
      { question: "Can I use HSL in CSS?", answer: "Yes — modern CSS fully supports hsl() and hsla() (with alpha channel). It is a valid CSS color value just like HEX and RGB." },
      { question: "Is there any quality loss converting HSL to HEX?", answer: "No — both formats represent the same sRGB color space. There may be minor rounding since HEX uses integer values (0-255 per channel)." },
    ],
    relatedSlugs: ["hex-to-hsl", "rgb-to-hsl", "hsl-to-rgb"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // RGB <-> HSL
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "rgb-to-hsl",
    from: "RGB",
    to: "HSL",
    category: "color",
    toolName: "RGB to HSL Converter",
    description:
      "Convert RGB color values to HSL instantly. See hue, saturation, and lightness for any RGB color — free and private.",
    keyword: "RGB to HSL",
    subtitle: "Convert RGB values to HSL color notation",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "rgb", toFormat: "hsl" },
    acceptedExtensions: [],
    howTo: [
      "Enter an RGB value like rgb(52, 152, 219) in the input.",
      "HSL and all other color formats appear instantly.",
      "Use the color picker for visual selection.",
      "Copy any value with one click.",
    ],
    about:
      "<p>Converts RGB (Red, Green, Blue) to HSL (Hue, Saturation, Lightness). While RGB defines colors by mixing red, green, and blue light at different intensities, HSL represents the same colors in a more intuitive way — hue is the color itself, saturation is its purity, and lightness controls how bright or dark it appears.</p>",
    faqs: [
      { question: "When would I use HSL instead of RGB?", answer: "HSL is easier to work with when creating color palettes, adjusting brightness, or making colors more/less vivid. RGB is better for precise channel control and programmatic color manipulation." },
      { question: "What is the formula for RGB to HSL?", answer: "Normalize R, G, B to 0-1 range. Find max and min values. Lightness = (max+min)/2. If max=min, hue=saturation=0 (gray). Otherwise, saturation depends on lightness, and hue depends on which channel is the maximum." },
      { question: "Is this conversion reversible?", answer: "Yes — you can convert back from HSL to RGB without any meaningful loss. Minor rounding differences may occur." },
    ],
    relatedSlugs: ["hsl-to-rgb", "rgb-to-hex", "rgb-to-cmyk"],
    requiresFFmpeg: false,
  },
  {
    slug: "hsl-to-rgb",
    from: "HSL",
    to: "RGB",
    category: "color",
    toolName: "HSL to RGB Converter",
    description:
      "Convert HSL color values to RGB instantly. Free online converter for designers and developers.",
    keyword: "HSL to RGB",
    subtitle: "Convert HSL notation to RGB color values",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "hsl", toFormat: "rgb" },
    acceptedExtensions: [],
    howTo: [
      "Enter an HSL value like hsl(204, 70%, 53%) in the input.",
      "RGB and all other formats appear instantly.",
      "Use the color picker for visual selection.",
      "Copy any result with one click.",
    ],
    about:
      "<p>Converts HSL (Hue, Saturation, Lightness) values to RGB (Red, Green, Blue). This is useful when you have designed a color palette using HSL and need the RGB values for code, APIs, or tools that require RGB input.</p>",
    faqs: [
      { question: "How does HSL to RGB conversion work?", answer: "The algorithm uses hue to determine the base color, then applies saturation and lightness to calculate the final red, green, and blue channel values (each 0-255)." },
      { question: "What is hsl(0, 0%, 0%)?", answer: "Pure black — zero saturation and zero lightness. Similarly, hsl(0, 0%, 100%) is pure white." },
      { question: "Does hue wrap around?", answer: "Yes — hue is circular. 0 and 360 are both red. Values above 360 or below 0 wrap around." },
    ],
    relatedSlugs: ["rgb-to-hsl", "hex-to-hsl", "hsl-to-hex"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // RGB <-> CMYK
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "rgb-to-cmyk",
    from: "RGB",
    to: "CMYK",
    category: "color",
    toolName: "RGB to CMYK Converter",
    description:
      "Convert RGB color values to CMYK for print. Free online tool shows cyan, magenta, yellow, and key (black) values.",
    keyword: "RGB to CMYK",
    subtitle: "Convert screen colors to print-ready CMYK values",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "rgb", toFormat: "cmyk" },
    acceptedExtensions: [],
    howTo: [
      "Enter an RGB value like rgb(255, 87, 51) in the input.",
      "CMYK and all other color formats appear instantly.",
      "Use the color picker to select a color visually.",
      "Copy the CMYK value for your print workflow.",
    ],
    about:
      "<p>Converts RGB (screen colors) to CMYK (print colors). RGB is an additive color model used by screens — mixing red, green, and blue light. CMYK is a subtractive model used by printers — combining cyan, magenta, yellow, and black inks.</p><p>Note: This conversion is approximate. Professional print workflows use ICC color profiles for accurate color matching; this tool provides a good starting point.</p>",
    faqs: [
      { question: "Why do colors look different on screen vs print?", answer: "Screens use light (RGB, additive mixing) while printers use ink (CMYK, subtractive mixing). The CMYK color gamut is smaller than sRGB, so some bright screen colors cannot be exactly reproduced in print." },
      { question: "Is this CMYK conversion accurate for printing?", answer: "This provides a mathematical conversion without ICC profiles. For color-critical print work, use a professional tool with proper color management." },
      { question: "What does the K in CMYK stand for?", answer: "K stands for 'Key' (referring to the key plate in printing, which is typically black). It was chosen to avoid confusion with B for blue." },
    ],
    relatedSlugs: ["cmyk-to-rgb", "rgb-to-hex", "hex-to-cmyk"],
    requiresFFmpeg: false,
  },
  {
    slug: "cmyk-to-rgb",
    from: "CMYK",
    to: "RGB",
    category: "color",
    toolName: "CMYK to RGB Converter",
    description:
      "Convert CMYK print colors to RGB screen values instantly. See how your print colors will look on screen.",
    keyword: "CMYK to RGB",
    subtitle: "Convert print colors to screen-ready RGB values",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "cmyk", toFormat: "rgb" },
    acceptedExtensions: [],
    howTo: [
      "Enter a CMYK value like cmyk(0%, 66%, 80%, 0%) in the input.",
      "RGB and all other color formats appear instantly.",
      "Use the color picker for visual selection.",
      "Copy any result with one click.",
    ],
    about:
      "<p>Converts CMYK (Cyan, Magenta, Yellow, Key/Black) ink values to RGB (Red, Green, Blue) screen values. This is useful when you have print color specifications and need to see or use the color on screen, in CSS, or in digital design tools.</p>",
    faqs: [
      { question: "Will the RGB color look exactly like the printed CMYK color?", answer: "It will be close but not exact. Screen displays and printers use fundamentally different color technologies. The mathematical conversion gives a reasonable approximation." },
      { question: "How do I enter CMYK values?", answer: "Use the format cmyk(c%, m%, y%, k%) where each value is 0-100. Example: cmyk(100%, 0%, 0%, 0%) is pure cyan." },
      { question: "What is cmyk(0%, 0%, 0%, 100%)?", answer: "Pure black — 100% key (black) ink with no other colors." },
    ],
    relatedSlugs: ["rgb-to-cmyk", "hex-to-cmyk", "cmyk-to-rgb"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // HEX -> CMYK
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "hex-to-cmyk",
    from: "HEX",
    to: "CMYK",
    category: "color",
    toolName: "HEX to CMYK Converter",
    description:
      "Convert HEX color codes to CMYK values for print. Instantly see print-ready cyan, magenta, yellow, and black values.",
    keyword: "HEX to CMYK",
    subtitle: "Convert web hex colors to print-ready CMYK",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "hex", toFormat: "cmyk" },
    acceptedExtensions: [],
    howTo: [
      "Enter a HEX color code like #E74C3C in the input.",
      "CMYK and all other formats appear instantly.",
      "Use the color picker for visual selection.",
      "Copy the CMYK value for your print project.",
    ],
    about:
      "<p>Converts HEX color codes directly to CMYK values. HEX is the standard way to specify colors on the web; CMYK is the standard for print. This tool bridges the gap between digital design and print production, showing you the approximate CMYK equivalent of any hex color.</p>",
    faqs: [
      { question: "Can I use this for professional print work?", answer: "This gives a good mathematical approximation. For color-critical work, use a design tool with ICC color profiles for accurate CMYK conversion." },
      { question: "Why are some HEX colors impossible to print accurately?", answer: "The sRGB gamut (used by HEX) is larger than the CMYK gamut. Extremely bright or saturated screen colors may not have an exact CMYK equivalent." },
      { question: "What HEX color is pure cyan in CMYK?", answer: "cmyk(100%, 0%, 0%, 0%) is approximately #00FFFF in HEX, though the exact appearance depends on the printer and paper." },
    ],
    relatedSlugs: ["rgb-to-cmyk", "cmyk-to-rgb", "hex-to-rgb"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // RGB <-> HSB
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "rgb-to-hsb",
    from: "RGB",
    to: "HSB",
    category: "color",
    toolName: "RGB to HSB Converter",
    description:
      "Convert RGB color values to HSB (HSV) instantly. Free online tool for designers working with Photoshop and Figma colors.",
    keyword: "RGB to HSB",
    subtitle: "Convert RGB to HSB/HSV color notation",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "rgb", toFormat: "hsb" },
    acceptedExtensions: [],
    howTo: [
      "Enter an RGB value like rgb(41, 128, 185) in the input.",
      "HSB/HSV and all other formats appear instantly.",
      "Use the color picker for visual selection.",
      "Copy any result with one click.",
    ],
    about:
      "<p>Converts RGB (Red, Green, Blue) to HSB, also known as HSV (Hue, Saturation, Value). HSB is the color model used by Photoshop, Figma, and many design tools for their color pickers. Hue is the color angle (0-360), saturation is color purity (0-100%), and brightness/value is how bright the color is (0-100%).</p>",
    faqs: [
      { question: "What is the difference between HSB and HSV?", answer: "They are the same. HSB (Hue, Saturation, Brightness) and HSV (Hue, Saturation, Value) are two names for the identical color model." },
      { question: "How is HSB different from HSL?", answer: "In HSB, 100% brightness means the pure color. In HSL, 100% lightness means white. HSB/HSV is used more in design tools, while HSL is more common in CSS." },
      { question: "Which design tools use HSB?", answer: "Adobe Photoshop, Illustrator, Figma, Sketch, and many other design applications use HSB/HSV in their color pickers." },
    ],
    relatedSlugs: ["hsb-to-rgb", "rgb-to-hsl", "rgb-to-hex"],
    requiresFFmpeg: false,
  },
  {
    slug: "hsb-to-rgb",
    from: "HSB",
    to: "RGB",
    category: "color",
    toolName: "HSB to RGB Converter",
    description:
      "Convert HSB (HSV) color values to RGB instantly. Translate Photoshop and Figma colors to RGB for code and CSS.",
    keyword: "HSB to RGB",
    subtitle: "Convert HSB/HSV colors to RGB values",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "hsb", toFormat: "rgb" },
    acceptedExtensions: [],
    howTo: [
      "Enter an HSB value like hsb(204, 78%, 73%) in the input.",
      "RGB and all other formats appear instantly.",
      "Use the color picker for visual selection.",
      "Copy any result with one click.",
    ],
    about:
      "<p>Converts HSB (Hue, Saturation, Brightness) values to RGB. This is useful when you have picked a color in a design tool that shows HSB and need the RGB values for CSS, code, or another application. You can also use hsv() syntax — HSB and HSV are the same model.</p>",
    faqs: [
      { question: "How do I enter HSB values?", answer: "Use the format hsb(hue, saturation%, brightness%). Example: hsb(210, 80%, 70%) is a medium blue. You can also use hsv() — both are accepted." },
      { question: "What is hsb(0, 0%, 0%)?", answer: "Pure black — zero brightness. hsb(0, 0%, 100%) is pure white (zero saturation, maximum brightness)." },
      { question: "Why does my Photoshop color look different in CSS?", answer: "Make sure you are comparing the right color model. Photoshop uses HSB by default, while CSS uses HSL. This tool helps by showing all formats simultaneously." },
    ],
    relatedSlugs: ["rgb-to-hsb", "hex-to-rgb", "hsl-to-rgb"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // HEX -> OKLCH
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "hex-to-oklch",
    from: "HEX",
    to: "OKLCH",
    category: "color",
    toolName: "HEX to OKLCH Converter",
    description:
      "Convert HEX color codes to OKLCH values. Use the modern perceptually uniform color space for CSS and design.",
    keyword: "HEX to OKLCH",
    subtitle: "Convert hex colors to the modern OKLCH color space",
    componentKey: "ColorConverterTool",
    componentProps: { fromFormat: "hex", toFormat: "oklch" },
    acceptedExtensions: [],
    howTo: [
      "Enter a HEX color code like #2ECC71 in the input.",
      "OKLCH and all other formats appear instantly.",
      "Use the color picker for visual selection.",
      "Copy the OKLCH value for modern CSS.",
    ],
    about:
      "<p>Converts HEX colors to OKLCH — a perceptually uniform color space designed for CSS Color Level 4. OKLCH uses lightness (0-1), chroma (color intensity), and hue angle. Unlike HSL, equal steps in OKLCH lightness look equally different to the human eye, making it ideal for generating accessible color palettes.</p><p>The OKLCH values here use the sRGB-to-OKLab pipeline for conversion, which is a reasonable approximation suitable for web design.</p>",
    faqs: [
      { question: "What is OKLCH?", answer: "OKLCH is a perceptually uniform color space based on OKLab, designed by Bjorn Ottosson. It represents colors using lightness, chroma (saturation), and hue in a way that matches human perception." },
      { question: "Can I use OKLCH in CSS?", answer: "Yes — oklch() is supported in CSS Color Level 4 and works in all modern browsers (Chrome 111+, Firefox 113+, Safari 15.4+)." },
      { question: "Why use OKLCH over HSL?", answer: "OKLCH is perceptually uniform — changing lightness by the same amount always looks like the same visual change. HSL can produce different perceived brightness at the same lightness value for different hues." },
    ],
    relatedSlugs: ["hex-to-rgb", "hex-to-hsl", "rgb-to-hsl"],
    requiresFFmpeg: false,
  },
];
