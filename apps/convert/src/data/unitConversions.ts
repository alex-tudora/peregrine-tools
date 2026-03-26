import type { ConversionDef } from "./conversions";

/**
 * High-traffic unit conversion pages.
 *
 * Each entry targets a specific keyword people search for (e.g. "kg to lbs",
 * "celsius to fahrenheit"). The converter itself is a thin wrapper around
 * the generic UnitConverterTool, so the real value is the SEO content:
 * title, description, howTo, faqs, and about copy.
 */
export const unitConversions: ConversionDef[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // LENGTH
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "km-to-miles",
    from: "km",
    to: "miles",
    category: "unit",
    toolName: "Kilometers to Miles Converter",
    description:
      "Convert kilometers to miles instantly. Free online km to miles calculator with formula, common conversions, and zero ads.",
    keyword: "km to miles",
    subtitle: "Convert any distance from kilometers to miles in a flash",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "km", toDefault: "miles" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of kilometers in the input field.",
      "The equivalent distance in miles appears instantly.",
      "Use the swap button to convert miles to kilometers instead.",
      "Click any common conversion for a quick reference.",
    ],
    about:
      "<p>One kilometer equals approximately 0.621371 miles. The kilometer is the standard unit of distance in the metric system used by most countries worldwide, while the mile is primarily used in the United States, the United Kingdom, and a handful of other nations.</p><p>The conversion formula is simple: <strong>miles = kilometers x 0.621371</strong>. This tool performs the calculation in your browser — no data is sent to any server.</p>",
    faqs: [
      { question: "How many miles is 1 km?", answer: "1 kilometer equals approximately 0.621371 miles." },
      { question: "How do I convert km to miles in my head?", answer: "A quick approximation: multiply by 0.6. For better accuracy, multiply by 5 and divide by 8 (since 5/8 = 0.625, close to the real factor)." },
      { question: "Why do some countries use miles and others use kilometers?", answer: "Most of the world adopted the metric system (kilometers) during the 19th and 20th centuries. The US, UK (for road distances), and a few other countries retained the mile from the older Imperial system." },
    ],
    relatedSlugs: ["miles-to-km", "feet-to-meters", "meters-to-feet"],
    requiresFFmpeg: false,
  },
  {
    slug: "miles-to-km",
    from: "miles",
    to: "km",
    category: "unit",
    toolName: "Miles to Kilometers Converter",
    description:
      "Convert miles to kilometers instantly. Free online miles to km calculator with formula and common conversions.",
    keyword: "miles to km",
    subtitle: "Find out how far that is in kilometers",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "miles", toDefault: "km" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of miles in the input field.",
      "The equivalent distance in kilometers appears instantly.",
      "Use the swap button to convert kilometers to miles instead.",
      "Click any quick-reference value below for common conversions.",
    ],
    about:
      "<p>One mile equals exactly 1.609344 kilometers. Miles are commonly used for road distances in the United States, the United Kingdom, and a few other countries, while most of the world uses kilometers.</p><p>The formula is: <strong>kilometers = miles x 1.609344</strong>.</p>",
    faqs: [
      { question: "How many km is 1 mile?", answer: "1 mile equals exactly 1.609344 kilometers." },
      { question: "How do I quickly estimate miles to km?", answer: "Multiply by 1.6 for a fast approximation. For even quicker mental math, add 60% to the miles value." },
      { question: "Is a mile longer than a kilometer?", answer: "Yes. One mile is about 1.6 times longer than one kilometer." },
    ],
    relatedSlugs: ["km-to-miles", "feet-to-meters", "yards-to-meters"],
    requiresFFmpeg: false,
  },
  {
    slug: "feet-to-meters",
    from: "feet",
    to: "meters",
    category: "unit",
    toolName: "Feet to Meters Converter",
    description:
      "Convert feet to meters instantly. Free ft to m calculator with formula, quick references, and no sign-up required.",
    keyword: "feet to meters",
    subtitle: "Translate feet into meters with one click",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "feet", toDefault: "m" },
    acceptedExtensions: [],
    howTo: [
      "Type the number of feet you want to convert.",
      "The result in meters appears automatically.",
      "Tap swap to go from meters to feet.",
      "Use the quick-reference buttons for common values.",
    ],
    about:
      "<p>One foot equals exactly 0.3048 meters. Feet are widely used in the US, UK, and Canada for measuring height and short distances, while meters are the global SI standard.</p><p>Formula: <strong>meters = feet x 0.3048</strong>.</p>",
    faqs: [
      { question: "How many meters is 6 feet?", answer: "6 feet equals 1.8288 meters, or roughly 1.83 m." },
      { question: "What is the exact conversion factor?", answer: "1 foot = 0.3048 meters exactly. This is an international standard defined since 1959." },
      { question: "How tall is 5'10\" in meters?", answer: "5 feet 10 inches equals approximately 1.778 meters." },
    ],
    relatedSlugs: ["meters-to-feet", "feet-to-cm", "inches-to-cm"],
    requiresFFmpeg: false,
  },
  {
    slug: "meters-to-feet",
    from: "meters",
    to: "feet",
    category: "unit",
    toolName: "Meters to Feet Converter",
    description:
      "Convert meters to feet instantly. Free m to ft calculator for height, distance, and construction measurements.",
    keyword: "meters to feet",
    subtitle: "See how many feet your meters measurement is",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "m", toDefault: "feet" },
    acceptedExtensions: [],
    howTo: [
      "Enter the value in meters.",
      "The feet equivalent is displayed instantly.",
      "Use swap to convert feet to meters instead.",
      "Click a common conversion for quick reference.",
    ],
    about:
      "<p>One meter equals approximately 3.28084 feet. Meters are the base unit of length in the International System of Units (SI), while feet remain the primary unit for everyday measurements in the US and UK.</p><p>Formula: <strong>feet = meters x 3.28084</strong>.</p>",
    faqs: [
      { question: "How many feet is 1 meter?", answer: "1 meter equals approximately 3.28084 feet." },
      { question: "How tall is 1.8 meters in feet?", answer: "1.8 meters is approximately 5.906 feet, or about 5 feet 11 inches." },
      { question: "Which is longer, a meter or a yard?", answer: "A meter is slightly longer — 1 meter equals about 1.094 yards." },
    ],
    relatedSlugs: ["feet-to-meters", "km-to-miles", "yards-to-meters"],
    requiresFFmpeg: false,
  },
  {
    slug: "inches-to-cm",
    from: "inches",
    to: "cm",
    category: "unit",
    toolName: "Inches to Centimeters Converter",
    description:
      "Convert inches to centimeters instantly. Free inches to cm calculator with formula and common conversion table.",
    keyword: "inches to cm",
    subtitle: "Quickly find out how many centimeters your inches are",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "inches", toDefault: "cm" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of inches.",
      "The centimeter equivalent appears instantly.",
      "Use swap to go from cm to inches.",
      "Click a common value for a quick lookup.",
    ],
    about:
      "<p>One inch equals exactly 2.54 centimeters. This conversion is essential for screen sizes, paper dimensions, and countless DIY projects that mix Imperial and metric measurements.</p><p>Formula: <strong>centimeters = inches x 2.54</strong>.</p>",
    faqs: [
      { question: "How many cm is 1 inch?", answer: "1 inch equals exactly 2.54 centimeters." },
      { question: "How do I convert a TV screen size from inches to cm?", answer: "Multiply the diagonal inches by 2.54. For example, a 55-inch TV has a 139.7 cm diagonal." },
      { question: "Why is an inch exactly 2.54 cm?", answer: "This was defined by international agreement in 1959 to standardize the inch across countries." },
    ],
    relatedSlugs: ["cm-to-inches", "feet-to-cm", "feet-to-meters"],
    requiresFFmpeg: false,
  },
  {
    slug: "cm-to-inches",
    from: "cm",
    to: "inches",
    category: "unit",
    toolName: "Centimeters to Inches Converter",
    description:
      "Convert centimeters to inches instantly. Free cm to inches calculator with exact formula and common conversions.",
    keyword: "cm to inches",
    subtitle: "Find the inches equivalent of any centimeter value",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "cm", toDefault: "inches" },
    acceptedExtensions: [],
    howTo: [
      "Enter the centimeter value.",
      "The inches equivalent is shown instantly.",
      "Swap to convert inches to centimeters.",
      "Use quick buttons for common values.",
    ],
    about:
      "<p>One centimeter equals approximately 0.393701 inches. This conversion is commonly needed for clothing sizes, furniture dimensions, and screen measurements when moving between metric and Imperial systems.</p><p>Formula: <strong>inches = centimeters / 2.54</strong>.</p>",
    faqs: [
      { question: "How many inches is 10 cm?", answer: "10 centimeters equals approximately 3.937 inches." },
      { question: "How do I convert my height from cm to feet and inches?", answer: "Divide your height in cm by 2.54 to get total inches, then divide by 12 for feet with the remainder as inches." },
      { question: "Is 2.54 cm per inch exact?", answer: "Yes, this is the exact international standard defined in 1959." },
    ],
    relatedSlugs: ["inches-to-cm", "feet-to-cm", "meters-to-feet"],
    requiresFFmpeg: false,
  },
  {
    slug: "feet-to-cm",
    from: "feet",
    to: "cm",
    category: "unit",
    toolName: "Feet to Centimeters Converter",
    description:
      "Convert feet to centimeters instantly. Free ft to cm calculator for height conversions and measurements.",
    keyword: "feet to cm",
    subtitle: "Get the exact centimeter value for any measurement in feet",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "feet", toDefault: "cm" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of feet.",
      "The centimeters equivalent appears immediately.",
      "Use swap to go from cm to feet.",
      "Try common values below for quick reference.",
    ],
    about:
      "<p>One foot equals exactly 30.48 centimeters. This conversion is particularly useful for height measurements, as many countries list heights in centimeters while the US and UK use feet and inches.</p><p>Formula: <strong>centimeters = feet x 30.48</strong>.</p>",
    faqs: [
      { question: "How many cm is 5 feet?", answer: "5 feet equals exactly 152.4 centimeters." },
      { question: "How tall is 6 feet in cm?", answer: "6 feet equals exactly 182.88 centimeters." },
      { question: "Why is the factor exactly 30.48?", answer: "One foot is defined as exactly 0.3048 meters, which is 30.48 centimeters." },
    ],
    relatedSlugs: ["cm-to-inches", "feet-to-meters", "inches-to-cm"],
    requiresFFmpeg: false,
  },
  {
    slug: "yards-to-meters",
    from: "yards",
    to: "meters",
    category: "unit",
    toolName: "Yards to Meters Converter",
    description:
      "Convert yards to meters instantly. Free yd to m calculator for sports, landscaping, and construction measurements.",
    keyword: "yards to meters",
    subtitle: "Convert yards to meters for any measurement",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "yards", toDefault: "m" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of yards.",
      "The meters equivalent appears instantly.",
      "Use swap to convert meters to yards.",
      "Click a quick-reference button for common values.",
    ],
    about:
      "<p>One yard equals exactly 0.9144 meters. Yards are commonly used in American football, golf, and property measurements. Converting to meters is essential when working with metric-based plans or international standards.</p><p>Formula: <strong>meters = yards x 0.9144</strong>.</p>",
    faqs: [
      { question: "How many meters is 100 yards?", answer: "100 yards equals 91.44 meters. A football field is slightly shorter than 100 meters." },
      { question: "Is a yard close to a meter?", answer: "Yes, a yard is about 91.4% of a meter — quite close but not identical." },
      { question: "How many yards in a mile?", answer: "There are 1,760 yards in one mile." },
    ],
    relatedSlugs: ["meters-to-feet", "feet-to-meters", "km-to-miles"],
    requiresFFmpeg: false,
  },
  {
    slug: "mm-to-inches",
    from: "mm",
    to: "inches",
    category: "unit",
    toolName: "Millimeters to Inches Converter",
    description:
      "Convert millimeters to inches instantly. Free mm to inches calculator for engineering, manufacturing, and DIY projects.",
    keyword: "mm to inches",
    subtitle: "Convert any millimeter measurement to inches",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "mm", toDefault: "inches" },
    acceptedExtensions: [],
    howTo: [
      "Enter the value in millimeters.",
      "The inches equivalent is displayed instantly.",
      "Use swap to convert inches to millimeters.",
      "Refer to common conversions below for quick lookups.",
    ],
    about:
      "<p>One millimeter equals approximately 0.03937 inches. This conversion is commonly used in engineering, 3D printing, and manufacturing where specifications may be given in either system.</p><p>Formula: <strong>inches = millimeters / 25.4</strong>.</p>",
    faqs: [
      { question: "How many inches is 10 mm?", answer: "10 millimeters equals approximately 0.3937 inches, which is just under 13/32 of an inch." },
      { question: "How many mm in an inch?", answer: "There are exactly 25.4 millimeters in one inch." },
      { question: "When do I need mm to inches conversion?", answer: "This comes up frequently in 3D printing, CNC machining, jewelry sizing, and any project mixing metric and Imperial specifications." },
    ],
    relatedSlugs: ["inches-to-cm", "cm-to-inches", "feet-to-cm"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // WEIGHT
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "kg-to-lbs",
    from: "kg",
    to: "lbs",
    category: "unit",
    toolName: "Kilograms to Pounds Converter",
    description:
      "Convert kilograms to pounds instantly. Free kg to lbs calculator with formula, common conversions, and zero tracking.",
    keyword: "kg to lbs",
    subtitle: "Find out how many pounds your kilograms weigh",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "weight", fromDefault: "kg", toDefault: "lbs" },
    acceptedExtensions: [],
    howTo: [
      "Enter the weight in kilograms.",
      "The pounds equivalent is shown immediately.",
      "Use the swap button to convert pounds to kilograms.",
      "Click a common value below for quick reference.",
    ],
    about:
      "<p>One kilogram equals approximately 2.20462 pounds. Kilograms are the standard unit of mass in the metric system, while pounds are used in the United States and for body weight in several other countries.</p><p>Formula: <strong>pounds = kilograms x 2.20462</strong>.</p>",
    faqs: [
      { question: "How many pounds is 1 kg?", answer: "1 kilogram equals approximately 2.20462 pounds." },
      { question: "How do I quickly estimate kg to lbs?", answer: "Double the kilograms and add 10%. For example, 70 kg: double is 140, add 10% (14) = 154 lbs (actual: 154.3 lbs)." },
      { question: "What weighs about 1 kg?", answer: "A liter of water weighs almost exactly 1 kg. A typical textbook also weighs about 1 kg." },
    ],
    relatedSlugs: ["lbs-to-kg", "oz-to-grams", "stones-to-kg"],
    requiresFFmpeg: false,
  },
  {
    slug: "lbs-to-kg",
    from: "lbs",
    to: "kg",
    category: "unit",
    toolName: "Pounds to Kilograms Converter",
    description:
      "Convert pounds to kilograms instantly. Free lbs to kg calculator with formula and common weight conversions.",
    keyword: "lbs to kg",
    subtitle: "Convert your weight from pounds to kilograms",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "weight", fromDefault: "lbs", toDefault: "kg" },
    acceptedExtensions: [],
    howTo: [
      "Enter the weight in pounds.",
      "The kilograms equivalent appears instantly.",
      "Use swap to convert kilograms to pounds.",
      "Click any common value for quick reference.",
    ],
    about:
      "<p>One pound equals approximately 0.453592 kilograms. Pounds are commonly used for body weight in the US and UK, while kilograms are the global standard for mass measurement.</p><p>Formula: <strong>kilograms = pounds x 0.453592</strong>.</p>",
    faqs: [
      { question: "How many kg is 150 lbs?", answer: "150 pounds equals approximately 68.04 kilograms." },
      { question: "How do I quickly estimate lbs to kg?", answer: "Divide by 2 and subtract 10%. For example, 200 lbs: half is 100, subtract 10% (10) = 90 kg (actual: 90.7 kg)." },
      { question: "Is a pound the same everywhere?", answer: "The international avoirdupois pound used today is standardized at exactly 0.45359237 kg worldwide." },
    ],
    relatedSlugs: ["kg-to-lbs", "oz-to-grams", "stones-to-kg"],
    requiresFFmpeg: false,
  },
  {
    slug: "oz-to-grams",
    from: "oz",
    to: "grams",
    category: "unit",
    toolName: "Ounces to Grams Converter",
    description:
      "Convert ounces to grams instantly. Free oz to g calculator for cooking, postage, jewelry, and more.",
    keyword: "ounces to grams",
    subtitle: "Find out how many grams your ounces weigh",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "weight", fromDefault: "oz", toDefault: "g" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of ounces.",
      "The grams equivalent is displayed instantly.",
      "Use swap to convert grams to ounces.",
      "Use common value buttons for quick reference.",
    ],
    about:
      "<p>One ounce equals approximately 28.3495 grams. Ounces are commonly used in the US for food packaging, postal weights, and precious metals, while grams are the standard small unit of mass worldwide.</p><p>Formula: <strong>grams = ounces x 28.3495</strong>.</p>",
    faqs: [
      { question: "How many grams is 1 oz?", answer: "1 ounce equals approximately 28.3495 grams." },
      { question: "Is a troy ounce the same?", answer: "No. A troy ounce (used for precious metals) is 31.1035 grams, heavier than a standard avoirdupois ounce." },
      { question: "How many ounces in a pound?", answer: "There are 16 ounces in one pound." },
    ],
    relatedSlugs: ["grams-to-oz", "kg-to-lbs", "lbs-to-kg"],
    requiresFFmpeg: false,
  },
  {
    slug: "grams-to-oz",
    from: "grams",
    to: "oz",
    category: "unit",
    toolName: "Grams to Ounces Converter",
    description:
      "Convert grams to ounces instantly. Free g to oz calculator for cooking, postage, and everyday measurements.",
    keyword: "grams to ounces",
    subtitle: "Convert grams to ounces for any measurement",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "weight", fromDefault: "g", toDefault: "oz" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of grams.",
      "The ounces equivalent appears automatically.",
      "Use swap to convert ounces to grams.",
      "Click common values for quick conversions.",
    ],
    about:
      "<p>One gram equals approximately 0.035274 ounces. Converting grams to ounces is common when adapting recipes between metric and Imperial systems, or when shipping packages internationally.</p><p>Formula: <strong>ounces = grams / 28.3495</strong>.</p>",
    faqs: [
      { question: "How many ounces is 100 grams?", answer: "100 grams equals approximately 3.527 ounces." },
      { question: "How many grams in a pound?", answer: "There are approximately 453.592 grams in one pound (16 ounces)." },
      { question: "When would I need to convert grams to ounces?", answer: "Common scenarios include adapting cooking recipes, calculating postage, and comparing nutrition labels between countries." },
    ],
    relatedSlugs: ["oz-to-grams", "kg-to-lbs", "lbs-to-kg"],
    requiresFFmpeg: false,
  },
  {
    slug: "stones-to-kg",
    from: "stones",
    to: "kg",
    category: "unit",
    toolName: "Stones to Kilograms Converter",
    description:
      "Convert stones to kilograms instantly. Free st to kg calculator, commonly used for body weight in the UK and Ireland.",
    keyword: "stones to kg",
    subtitle: "Convert your weight from stones to kilograms",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "weight", fromDefault: "stones", toDefault: "kg" },
    acceptedExtensions: [],
    howTo: [
      "Enter the weight in stones.",
      "The kilograms equivalent is shown immediately.",
      "Use swap to convert kilograms to stones.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One stone equals exactly 6.35029 kilograms, or 14 pounds. Stones are primarily used in the UK and Ireland for measuring body weight. Most other countries use kilograms.</p><p>Formula: <strong>kilograms = stones x 6.35029</strong>.</p>",
    faqs: [
      { question: "How many kg is 10 stone?", answer: "10 stone equals approximately 63.5 kilograms, or about 140 pounds." },
      { question: "Why do the British use stones?", answer: "The stone has been used for body weight in the British Isles for centuries. Despite metrication, it remains the most common unit for personal weight in the UK and Ireland." },
      { question: "How many pounds in a stone?", answer: "There are exactly 14 pounds in one stone." },
    ],
    relatedSlugs: ["kg-to-lbs", "lbs-to-kg", "oz-to-grams"],
    requiresFFmpeg: false,
  },
  {
    slug: "kg-to-stones",
    from: "kg",
    to: "stones",
    category: "unit",
    toolName: "Kilograms to Stones Converter",
    description:
      "Convert kilograms to stones instantly. Free kg to st calculator for UK and Irish body weight measurements.",
    keyword: "kg to stones",
    subtitle: "Find your weight in stones from kilograms",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "weight", fromDefault: "kg", toDefault: "stones" },
    acceptedExtensions: [],
    howTo: [
      "Enter your weight in kilograms.",
      "The stones equivalent is displayed instantly.",
      "Use swap to go from stones to kilograms.",
      "Use common values for quick reference.",
    ],
    about:
      "<p>One kilogram equals approximately 0.157473 stones. This conversion is particularly useful for people in the UK and Ireland who weigh themselves in stones but receive medical measurements in kilograms.</p><p>Formula: <strong>stones = kilograms / 6.35029</strong>.</p>",
    faqs: [
      { question: "How many stones is 70 kg?", answer: "70 kilograms equals approximately 11.02 stones." },
      { question: "How do I convert kg to stones and pounds?", answer: "Divide kg by 6.35029 to get stones. The decimal part times 14 gives the remaining pounds." },
      { question: "Is the stone still officially used?", answer: "The stone is not an official SI unit but remains widely used colloquially in the UK and Ireland for body weight." },
    ],
    relatedSlugs: ["stones-to-kg", "kg-to-lbs", "lbs-to-kg"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // TEMPERATURE
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "celsius-to-fahrenheit",
    from: "celsius",
    to: "fahrenheit",
    category: "unit",
    toolName: "Celsius to Fahrenheit Converter",
    description:
      "Convert Celsius to Fahrenheit instantly. Free C to F calculator with formula, common temperatures, and quick reference.",
    keyword: "celsius to fahrenheit",
    subtitle: "Find the Fahrenheit temperature for any Celsius value",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "temperature", fromDefault: "celsius", toDefault: "fahrenheit" },
    acceptedExtensions: [],
    howTo: [
      "Enter the temperature in Celsius.",
      "The Fahrenheit equivalent appears instantly.",
      "Use swap to convert Fahrenheit to Celsius.",
      "Click common temperatures below for quick reference.",
    ],
    about:
      '<p>The formula to convert Celsius to Fahrenheit is: <strong>F = (C x 9/5) + 32</strong>. Water freezes at 0\u00B0C (32\u00B0F) and boils at 100\u00B0C (212\u00B0F). Celsius is used by most of the world, while Fahrenheit is primarily used in the United States.</p><p>Fun fact: -40 is the only temperature where Celsius and Fahrenheit are equal.</p>',
    faqs: [
      { question: "What is 0 degrees Celsius in Fahrenheit?", answer: "0\u00B0C equals 32\u00B0F — the freezing point of water." },
      { question: "What is 100 degrees Celsius in Fahrenheit?", answer: "100\u00B0C equals 212\u00B0F — the boiling point of water at sea level." },
      { question: "How do I quickly estimate Celsius to Fahrenheit?", answer: "Double the Celsius value and add 30. For example, 20\u00B0C: double is 40, plus 30 = 70\u00B0F (actual: 68\u00B0F). Close enough for everyday use." },
      { question: "What is normal body temperature in both scales?", answer: "Normal body temperature is approximately 37\u00B0C or 98.6\u00B0F." },
    ],
    relatedSlugs: ["fahrenheit-to-celsius", "celsius-to-kelvin", "km-to-miles"],
    requiresFFmpeg: false,
  },
  {
    slug: "fahrenheit-to-celsius",
    from: "fahrenheit",
    to: "celsius",
    category: "unit",
    toolName: "Fahrenheit to Celsius Converter",
    description:
      "Convert Fahrenheit to Celsius instantly. Free F to C calculator with formula, common temperatures, and zero ads.",
    keyword: "fahrenheit to celsius",
    subtitle: "Convert any Fahrenheit temperature to Celsius",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "temperature", fromDefault: "fahrenheit", toDefault: "celsius" },
    acceptedExtensions: [],
    howTo: [
      "Enter the temperature in Fahrenheit.",
      "The Celsius equivalent is displayed instantly.",
      "Use swap to convert Celsius to Fahrenheit.",
      "Click common temperatures for quick lookups.",
    ],
    about:
      "<p>The formula to convert Fahrenheit to Celsius is: <strong>C = (F - 32) x 5/9</strong>. This conversion is essential for travelers between the US (Fahrenheit) and virtually every other country (Celsius), as well as for cooking and scientific applications.</p>",
    faqs: [
      { question: "What is 72\u00B0F in Celsius?", answer: "72\u00B0F equals approximately 22.2\u00B0C — a comfortable room temperature." },
      { question: "What is 32\u00B0F in Celsius?", answer: "32\u00B0F equals exactly 0\u00B0C — the freezing point of water." },
      { question: "How do I quickly estimate Fahrenheit to Celsius?", answer: "Subtract 30 and divide by 2. For example, 80\u00B0F: subtract 30 = 50, divide by 2 = 25\u00B0C (actual: 26.7\u00B0C)." },
    ],
    relatedSlugs: ["celsius-to-fahrenheit", "celsius-to-kelvin", "kg-to-lbs"],
    requiresFFmpeg: false,
  },
  {
    slug: "celsius-to-kelvin",
    from: "celsius",
    to: "kelvin",
    category: "unit",
    toolName: "Celsius to Kelvin Converter",
    description:
      "Convert Celsius to Kelvin instantly. Free C to K calculator for science, engineering, and academic work.",
    keyword: "celsius to kelvin",
    subtitle: "Convert Celsius temperatures to the Kelvin scale",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "temperature", fromDefault: "celsius", toDefault: "kelvin" },
    acceptedExtensions: [],
    howTo: [
      "Enter the temperature in Celsius.",
      "The Kelvin equivalent appears instantly.",
      "Use swap to convert Kelvin to Celsius.",
      "Click common values below for quick reference.",
    ],
    about:
      "<p>The formula to convert Celsius to Kelvin is simply: <strong>K = C + 273.15</strong>. The Kelvin scale starts at absolute zero (-273.15\u00B0C), the lowest possible temperature. Kelvin is the SI unit of temperature used in scientific research.</p>",
    faqs: [
      { question: "What is 0\u00B0C in Kelvin?", answer: "0\u00B0C equals 273.15 K — the freezing point of water on the Kelvin scale." },
      { question: "What is absolute zero?", answer: "Absolute zero is 0 K, which equals -273.15\u00B0C. It is the theoretical lowest possible temperature." },
      { question: "Does Kelvin use degree symbols?", answer: "No. Kelvin is written without a degree symbol: 300 K, not 300\u00B0K. This is an SI convention." },
    ],
    relatedSlugs: ["celsius-to-fahrenheit", "fahrenheit-to-celsius", "km-to-miles"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // VOLUME
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "liters-to-gallons",
    from: "liters",
    to: "gallons",
    category: "unit",
    toolName: "Liters to Gallons Converter",
    description:
      "Convert liters to US gallons instantly. Free liters to gallons calculator with formula and common conversions.",
    keyword: "liters to gallons",
    subtitle: "Find how many gallons your liters equal",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "volume", fromDefault: "liters", toDefault: "gallons-us" },
    acceptedExtensions: [],
    howTo: [
      "Enter the volume in liters.",
      "The US gallons equivalent is shown instantly.",
      "Use swap to convert gallons to liters.",
      "Click a common value for quick reference.",
    ],
    about:
      "<p>One liter equals approximately 0.264172 US gallons. Liters are the standard volume measurement worldwide, while gallons are primarily used in the United States for fuel, beverages, and liquid measurements.</p><p>Formula: <strong>US gallons = liters x 0.264172</strong>.</p>",
    faqs: [
      { question: "How many gallons is 1 liter?", answer: "1 liter equals approximately 0.264 US gallons, or roughly a quarter of a gallon." },
      { question: "What is the difference between US and UK gallons?", answer: "A US gallon is 3.785 liters while a UK (Imperial) gallon is 4.546 liters. The UK gallon is about 20% larger." },
      { question: "How many liters in a gallon of gas?", answer: "A US gallon of gasoline equals approximately 3.785 liters." },
    ],
    relatedSlugs: ["gallons-to-liters", "cups-to-ml", "ml-to-cups"],
    requiresFFmpeg: false,
  },
  {
    slug: "gallons-to-liters",
    from: "gallons",
    to: "liters",
    category: "unit",
    toolName: "Gallons to Liters Converter",
    description:
      "Convert US gallons to liters instantly. Free gallons to liters calculator for fuel, cooking, and everyday measurements.",
    keyword: "gallons to liters",
    subtitle: "Convert gallons to liters for any volume",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "volume", fromDefault: "gallons-us", toDefault: "liters" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of US gallons.",
      "The liters equivalent is displayed instantly.",
      "Use swap to convert liters to gallons.",
      "Click common values for quick conversions.",
    ],
    about:
      "<p>One US gallon equals exactly 3.785411784 liters. This conversion is essential when comparing fuel prices internationally, adapting American recipes, or understanding tank capacities.</p><p>Formula: <strong>liters = US gallons x 3.78541</strong>.</p>",
    faqs: [
      { question: "How many liters is 1 gallon?", answer: "1 US gallon equals approximately 3.785 liters." },
      { question: "How do I compare gas prices between the US and Europe?", answer: "US prices are per gallon, European prices are per liter. Multiply the per-liter price by 3.785 to get the per-gallon equivalent." },
      { question: "Is a gallon of milk the same as a gallon of water?", answer: "Same volume (3.785 liters), but milk is slightly heavier because it is denser than water." },
    ],
    relatedSlugs: ["liters-to-gallons", "cups-to-ml", "ml-to-cups"],
    requiresFFmpeg: false,
  },
  {
    slug: "cups-to-ml",
    from: "cups",
    to: "ml",
    category: "unit",
    toolName: "Cups to Milliliters Converter",
    description:
      "Convert cups to milliliters instantly. Free cups to mL calculator for cooking, baking, and recipe conversions.",
    keyword: "cups to ml",
    subtitle: "Find the exact milliliter measurement for any number of cups",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "volume", fromDefault: "cups", toDefault: "ml" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of cups.",
      "The milliliters equivalent appears instantly.",
      "Use swap to convert mL to cups.",
      "Click common values for quick recipe conversions.",
    ],
    about:
      "<p>One US cup equals approximately 236.588 milliliters. This conversion is indispensable for cooking and baking, especially when adapting American recipes that use cups to metric measurements.</p><p>Formula: <strong>milliliters = cups x 236.588</strong>.</p>",
    faqs: [
      { question: "How many mL is 1 cup?", answer: "One US cup equals approximately 236.588 mL, often rounded to 240 mL." },
      { question: "Is a metric cup different from a US cup?", answer: "Yes. A metric cup is exactly 250 mL, while a US cup is approximately 236.6 mL." },
      { question: "How many cups in a liter?", answer: "There are approximately 4.227 US cups in one liter." },
    ],
    relatedSlugs: ["ml-to-cups", "liters-to-gallons", "gallons-to-liters"],
    requiresFFmpeg: false,
  },
  {
    slug: "ml-to-cups",
    from: "ml",
    to: "cups",
    category: "unit",
    toolName: "Milliliters to Cups Converter",
    description:
      "Convert milliliters to cups instantly. Free mL to cups calculator for recipe conversions and cooking measurements.",
    keyword: "ml to cups",
    subtitle: "Convert milliliters to cups for easy recipe measurements",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "volume", fromDefault: "ml", toDefault: "cups" },
    acceptedExtensions: [],
    howTo: [
      "Enter the volume in milliliters.",
      "The cups equivalent is displayed instantly.",
      "Use swap to convert cups to mL.",
      "Use common values for quick recipe lookups.",
    ],
    about:
      "<p>One milliliter equals approximately 0.00423 US cups. This conversion is commonly needed when converting metric recipes for use with standard US measuring cups.</p><p>Formula: <strong>cups = milliliters / 236.588</strong>.</p>",
    faqs: [
      { question: "How many cups is 250 mL?", answer: "250 mL equals approximately 1.057 US cups, or just over one cup." },
      { question: "How many cups is 500 mL?", answer: "500 mL equals approximately 2.113 US cups, or just over two cups." },
      { question: "Should I use US cups or metric cups?", answer: "Check your recipe origin. American recipes use US cups (236.6 mL), Australian and some other recipes use metric cups (250 mL)." },
    ],
    relatedSlugs: ["cups-to-ml", "liters-to-gallons", "gallons-to-liters"],
    requiresFFmpeg: false,
  },
  {
    slug: "tablespoons-to-ml",
    from: "tablespoons",
    to: "ml",
    category: "unit",
    toolName: "Tablespoons to Milliliters Converter",
    description:
      "Convert tablespoons to milliliters instantly. Free tbsp to mL calculator for precise cooking and baking measurements.",
    keyword: "tablespoons to ml",
    subtitle: "Get exact milliliter measurements from tablespoons",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "volume", fromDefault: "tablespoons", toDefault: "ml" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of tablespoons.",
      "The milliliters equivalent appears instantly.",
      "Use swap to convert mL to tablespoons.",
      "Click common values for quick cooking references.",
    ],
    about:
      "<p>One US tablespoon equals approximately 14.787 milliliters. Tablespoons are a standard cooking measurement in American recipes, while milliliters are used in metric-based recipes worldwide.</p><p>Formula: <strong>milliliters = tablespoons x 14.787</strong>.</p>",
    faqs: [
      { question: "How many mL is 1 tablespoon?", answer: "One US tablespoon equals approximately 14.787 mL, commonly rounded to 15 mL." },
      { question: "How many tablespoons in a cup?", answer: "There are 16 tablespoons in one US cup." },
      { question: "Is an Australian tablespoon different?", answer: "Yes. An Australian tablespoon is 20 mL, while a US tablespoon is approximately 14.8 mL." },
    ],
    relatedSlugs: ["cups-to-ml", "ml-to-cups", "liters-to-gallons"],
    requiresFFmpeg: false,
  },
  {
    slug: "fluid-oz-to-ml",
    from: "fl oz",
    to: "ml",
    category: "unit",
    toolName: "Fluid Ounces to Milliliters Converter",
    description:
      "Convert fluid ounces to milliliters instantly. Free fl oz to mL calculator for beverage, cooking, and pharmaceutical measurements.",
    keyword: "fluid ounces to ml",
    subtitle: "Convert fluid ounces to milliliters for precise measurements",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "volume", fromDefault: "fluid-oz", toDefault: "ml" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of fluid ounces.",
      "The milliliters equivalent is shown instantly.",
      "Use swap to convert mL to fluid ounces.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One US fluid ounce equals approximately 29.574 milliliters. Fluid ounces are widely used in the US for beverages, medicine dosages, and cooking, while milliliters are the global standard.</p><p>Formula: <strong>milliliters = fluid ounces x 29.5735</strong>.</p>",
    faqs: [
      { question: "How many mL is 8 fl oz?", answer: "8 US fluid ounces equals approximately 236.6 mL, which is also one US cup." },
      { question: "Is a fluid ounce the same as a weight ounce?", answer: "No. A fluid ounce measures volume, while a weight ounce measures mass. They are not interchangeable." },
      { question: "Are US and UK fluid ounces the same?", answer: "No. A US fluid ounce is approximately 29.574 mL, while a UK fluid ounce is approximately 28.413 mL." },
    ],
    relatedSlugs: ["cups-to-ml", "ml-to-cups", "liters-to-gallons"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // AREA
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "acres-to-hectares",
    from: "acres",
    to: "hectares",
    category: "unit",
    toolName: "Acres to Hectares Converter",
    description:
      "Convert acres to hectares instantly. Free acres to ha calculator for real estate, farming, and land measurement.",
    keyword: "acres to hectares",
    subtitle: "Convert land area from acres to hectares",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "area", fromDefault: "acres", toDefault: "hectares" },
    acceptedExtensions: [],
    howTo: [
      "Enter the area in acres.",
      "The hectares equivalent is displayed instantly.",
      "Use swap to convert hectares to acres.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One acre equals approximately 0.404686 hectares. Acres are used primarily in the US and UK for measuring land area, while hectares are the global standard used in agriculture and real estate worldwide.</p><p>Formula: <strong>hectares = acres x 0.404686</strong>.</p>",
    faqs: [
      { question: "How many hectares is 1 acre?", answer: "1 acre equals approximately 0.4047 hectares." },
      { question: "How big is an acre?", answer: "An acre is about 4,047 square meters, or roughly the size of a football field without the end zones." },
      { question: "Which is bigger, an acre or a hectare?", answer: "A hectare is bigger. One hectare equals approximately 2.471 acres." },
    ],
    relatedSlugs: ["hectares-to-acres", "sqft-to-sqm", "sqm-to-sqft"],
    requiresFFmpeg: false,
  },
  {
    slug: "hectares-to-acres",
    from: "hectares",
    to: "acres",
    category: "unit",
    toolName: "Hectares to Acres Converter",
    description:
      "Convert hectares to acres instantly. Free ha to acres calculator for real estate, agriculture, and land surveys.",
    keyword: "hectares to acres",
    subtitle: "Find out how many acres your hectares cover",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "area", fromDefault: "hectares", toDefault: "acres" },
    acceptedExtensions: [],
    howTo: [
      "Enter the area in hectares.",
      "The acres equivalent appears instantly.",
      "Use swap to convert acres to hectares.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One hectare equals approximately 2.47105 acres. Hectares are used internationally for land measurement, particularly in agriculture, forestry, and urban planning.</p><p>Formula: <strong>acres = hectares x 2.47105</strong>.</p>",
    faqs: [
      { question: "How many acres is 1 hectare?", answer: "1 hectare equals approximately 2.471 acres." },
      { question: "How big is a hectare?", answer: "A hectare is 10,000 square meters, roughly the size of a rugby field or 2.5 American football fields." },
      { question: "Where are hectares used?", answer: "Hectares are used worldwide for measuring land area in agriculture, real estate, and environmental science. The US and UK also use acres." },
    ],
    relatedSlugs: ["acres-to-hectares", "sqft-to-sqm", "sqm-to-sqft"],
    requiresFFmpeg: false,
  },
  {
    slug: "sqft-to-sqm",
    from: "sqft",
    to: "sqm",
    category: "unit",
    toolName: "Square Feet to Square Meters Converter",
    description:
      "Convert square feet to square meters instantly. Free sq ft to sq m calculator for real estate and floor plans.",
    keyword: "square feet to square meters",
    subtitle: "Convert floor area from square feet to square meters",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "area", fromDefault: "sqft", toDefault: "sqm" },
    acceptedExtensions: [],
    howTo: [
      "Enter the area in square feet.",
      "The square meters equivalent is shown instantly.",
      "Use swap to convert square meters to square feet.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One square foot equals approximately 0.0929 square meters. This conversion is commonly used in real estate, interior design, and construction when working with property listings that use different measurement systems.</p><p>Formula: <strong>square meters = square feet x 0.0929</strong>.</p>",
    faqs: [
      { question: "How many square meters is 1000 sq ft?", answer: "1,000 square feet equals approximately 92.9 square meters." },
      { question: "How do I convert apartment sizes?", answer: "Multiply the square footage by 0.0929 to get square meters. A 1,500 sq ft apartment is about 139.4 m\u00B2." },
      { question: "Which unit is used for real estate internationally?", answer: "Most countries use square meters. The US, UK, and a few others use square feet for residential real estate." },
    ],
    relatedSlugs: ["sqm-to-sqft", "acres-to-hectares", "hectares-to-acres"],
    requiresFFmpeg: false,
  },
  {
    slug: "sqm-to-sqft",
    from: "sqm",
    to: "sqft",
    category: "unit",
    toolName: "Square Meters to Square Feet Converter",
    description:
      "Convert square meters to square feet instantly. Free sq m to sq ft calculator for property and floor plan conversions.",
    keyword: "square meters to square feet",
    subtitle: "Convert area from square meters to square feet",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "area", fromDefault: "sqm", toDefault: "sqft" },
    acceptedExtensions: [],
    howTo: [
      "Enter the area in square meters.",
      "The square feet equivalent appears instantly.",
      "Use swap to convert square feet to square meters.",
      "Click common values below for quick reference.",
    ],
    about:
      "<p>One square meter equals approximately 10.7639 square feet. This conversion helps when comparing international property listings or translating between architectural standards.</p><p>Formula: <strong>square feet = square meters x 10.7639</strong>.</p>",
    faqs: [
      { question: "How many square feet is 100 m\u00B2?", answer: "100 square meters equals approximately 1,076.4 square feet." },
      { question: "How big is 50 m\u00B2 in square feet?", answer: "50 square meters equals approximately 538.2 square feet." },
      { question: "Is a square meter bigger than a square foot?", answer: "Yes. One square meter is about 10.76 times larger than one square foot." },
    ],
    relatedSlugs: ["sqft-to-sqm", "acres-to-hectares", "hectares-to-acres"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SPEED
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "kmh-to-mph",
    from: "km/h",
    to: "mph",
    category: "unit",
    toolName: "km/h to mph Converter",
    description:
      "Convert kilometers per hour to miles per hour instantly. Free km/h to mph calculator for speed conversions.",
    keyword: "km/h to mph",
    subtitle: "Convert speed from kilometers per hour to miles per hour",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "speed", fromDefault: "kmh", toDefault: "mph" },
    acceptedExtensions: [],
    howTo: [
      "Enter the speed in km/h.",
      "The mph equivalent is shown instantly.",
      "Use swap to convert mph to km/h.",
      "Click common speeds for quick reference.",
    ],
    about:
      "<p>One kilometer per hour equals approximately 0.621371 miles per hour. This conversion is essential for drivers traveling between countries that use different speed measurement systems.</p><p>Formula: <strong>mph = km/h x 0.621371</strong>.</p>",
    faqs: [
      { question: "How fast is 100 km/h in mph?", answer: "100 km/h equals approximately 62.14 mph." },
      { question: "How fast is 120 km/h in mph?", answer: "120 km/h equals approximately 74.56 mph." },
      { question: "Which countries use km/h?", answer: "Most countries worldwide use km/h for speed limits. The US, UK (for speed limits), and a few others use mph." },
    ],
    relatedSlugs: ["mph-to-kmh", "km-to-miles", "miles-to-km"],
    requiresFFmpeg: false,
  },
  {
    slug: "mph-to-kmh",
    from: "mph",
    to: "km/h",
    category: "unit",
    toolName: "mph to km/h Converter",
    description:
      "Convert miles per hour to kilometers per hour instantly. Free mph to km/h calculator for speed conversions.",
    keyword: "mph to km/h",
    subtitle: "Convert speed from miles per hour to kilometers per hour",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "speed", fromDefault: "mph", toDefault: "kmh" },
    acceptedExtensions: [],
    howTo: [
      "Enter the speed in mph.",
      "The km/h equivalent appears instantly.",
      "Use swap to convert km/h to mph.",
      "Click common speeds for quick reference.",
    ],
    about:
      "<p>One mile per hour equals approximately 1.60934 kilometers per hour. This is the reverse of the km/h to mph conversion and is useful when driving in countries that use the metric system.</p><p>Formula: <strong>km/h = mph x 1.60934</strong>.</p>",
    faqs: [
      { question: "How fast is 60 mph in km/h?", answer: "60 mph equals approximately 96.56 km/h." },
      { question: "How fast is 70 mph in km/h?", answer: "70 mph equals approximately 112.65 km/h." },
      { question: "What is the speed limit in most European countries?", answer: "Highway speed limits in Europe are typically 110-130 km/h (68-81 mph), depending on the country." },
    ],
    relatedSlugs: ["kmh-to-mph", "km-to-miles", "miles-to-km"],
    requiresFFmpeg: false,
  },
  {
    slug: "knots-to-mph",
    from: "knots",
    to: "mph",
    category: "unit",
    toolName: "Knots to MPH Converter",
    description:
      "Convert knots to miles per hour instantly. Free knots to mph calculator for aviation, sailing, and weather forecasts.",
    keyword: "knots to mph",
    subtitle: "Convert wind and sailing speed from knots to mph",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "speed", fromDefault: "knots", toDefault: "mph" },
    acceptedExtensions: [],
    howTo: [
      "Enter the speed in knots.",
      "The mph equivalent is displayed instantly.",
      "Use swap to convert mph to knots.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One knot equals approximately 1.15078 miles per hour. Knots are the standard unit of speed in aviation and marine navigation, equal to one nautical mile per hour.</p><p>Formula: <strong>mph = knots x 1.15078</strong>.</p>",
    faqs: [
      { question: "Why do boats and planes use knots?", answer: "Knots are based on nautical miles, which relate directly to the latitude/longitude coordinate system. One nautical mile equals one minute of latitude, making navigation calculations simpler." },
      { question: "How fast is 30 knots in mph?", answer: "30 knots equals approximately 34.52 mph." },
      { question: "How fast is 1 knot?", answer: "1 knot equals approximately 1.151 mph or 1.852 km/h." },
    ],
    relatedSlugs: ["kmh-to-mph", "mph-to-kmh", "km-to-miles"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // DIGITAL STORAGE
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "mb-to-gb",
    from: "MB",
    to: "GB",
    category: "unit",
    toolName: "MB to GB Converter",
    description:
      "Convert megabytes to gigabytes instantly. Free MB to GB calculator for storage, downloads, and data plans.",
    keyword: "MB to GB",
    subtitle: "Find how many gigabytes your megabytes equal",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "digital", fromDefault: "mb", toDefault: "gb" },
    acceptedExtensions: [],
    howTo: [
      "Enter the size in megabytes.",
      "The gigabytes equivalent appears instantly.",
      "Use swap to convert GB to MB.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One gigabyte equals 1,024 megabytes (in binary, as used by operating systems) or 1,000 megabytes (in decimal, as used by storage manufacturers). This tool uses the binary definition (1 GB = 1,024 MB).</p><p>Formula: <strong>GB = MB / 1024</strong>.</p>",
    faqs: [
      { question: "How many MB in 1 GB?", answer: "1 GB equals 1,024 MB (binary) or 1,000 MB (decimal). This tool uses the binary definition." },
      { question: "Why does my 256 GB drive show less space?", answer: "Storage manufacturers use decimal (1 GB = 1,000 MB) while your operating system uses binary (1 GB = 1,024 MB), creating an apparent discrepancy." },
      { question: "How big is 1 MB?", answer: "1 MB can hold roughly one minute of MP3 audio, a medium-quality photo, or about 500 pages of plain text." },
    ],
    relatedSlugs: ["gb-to-tb", "kb-to-mb", "gb-to-mb"],
    requiresFFmpeg: false,
  },
  {
    slug: "gb-to-tb",
    from: "GB",
    to: "TB",
    category: "unit",
    toolName: "GB to TB Converter",
    description:
      "Convert gigabytes to terabytes instantly. Free GB to TB calculator for hard drives, cloud storage, and data planning.",
    keyword: "GB to TB",
    subtitle: "Convert gigabytes to terabytes for storage calculations",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "digital", fromDefault: "gb", toDefault: "tb" },
    acceptedExtensions: [],
    howTo: [
      "Enter the size in gigabytes.",
      "The terabytes equivalent appears instantly.",
      "Use swap to convert TB to GB.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One terabyte equals 1,024 gigabytes (binary). This conversion is useful when evaluating storage needs for hard drives, SSDs, and cloud storage plans.</p><p>Formula: <strong>TB = GB / 1024</strong>.</p>",
    faqs: [
      { question: "How many GB is 1 TB?", answer: "1 TB equals 1,024 GB (binary) or 1,000 GB (decimal)." },
      { question: "How much data is 1 TB?", answer: "1 TB can store approximately 250,000 photos, 500 hours of HD video, or 6.5 million document pages." },
      { question: "Is TB enough for most people?", answer: "For most personal use, 1-2 TB of storage is sufficient. Content creators and professionals may need more." },
    ],
    relatedSlugs: ["mb-to-gb", "kb-to-mb", "gb-to-mb"],
    requiresFFmpeg: false,
  },
  {
    slug: "kb-to-mb",
    from: "KB",
    to: "MB",
    category: "unit",
    toolName: "KB to MB Converter",
    description:
      "Convert kilobytes to megabytes instantly. Free KB to MB calculator for file sizes and data measurements.",
    keyword: "KB to MB",
    subtitle: "Convert kilobytes to megabytes for file size calculations",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "digital", fromDefault: "kb", toDefault: "mb" },
    acceptedExtensions: [],
    howTo: [
      "Enter the size in kilobytes.",
      "The megabytes equivalent is shown instantly.",
      "Use swap to convert MB to KB.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One megabyte equals 1,024 kilobytes (binary). This conversion is commonly needed when evaluating email attachment sizes, image file sizes, and web page resources.</p><p>Formula: <strong>MB = KB / 1024</strong>.</p>",
    faqs: [
      { question: "How many KB in 1 MB?", answer: "1 MB equals 1,024 KB (binary) or 1,000 KB (decimal)." },
      { question: "What is a kilobyte good for?", answer: "A few kilobytes can hold a short email or a small text file. A typical web page is 2,000-5,000 KB." },
      { question: "Why do some people say 1 MB = 1000 KB?", answer: "Storage manufacturers use decimal (SI) prefixes where 1 MB = 1,000 KB, while operating systems use binary where 1 MB = 1,024 KB." },
    ],
    relatedSlugs: ["mb-to-gb", "gb-to-tb", "gb-to-mb"],
    requiresFFmpeg: false,
  },
  {
    slug: "gb-to-mb",
    from: "GB",
    to: "MB",
    category: "unit",
    toolName: "GB to MB Converter",
    description:
      "Convert gigabytes to megabytes instantly. Free GB to MB calculator for storage and data size calculations.",
    keyword: "GB to MB",
    subtitle: "Find out how many megabytes are in your gigabytes",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "digital", fromDefault: "gb", toDefault: "mb" },
    acceptedExtensions: [],
    howTo: [
      "Enter the size in gigabytes.",
      "The megabytes equivalent is shown instantly.",
      "Use swap to convert MB to GB.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One gigabyte equals 1,024 megabytes (binary). This is useful when calculating how many files can fit in a given storage space or when comparing data plan allowances.</p><p>Formula: <strong>MB = GB x 1024</strong>.</p>",
    faqs: [
      { question: "How many MB is 5 GB?", answer: "5 GB equals 5,120 MB (binary)." },
      { question: "How many songs fit in 1 GB?", answer: "At typical MP3 quality (roughly 4 MB per song), about 250 songs fit in 1 GB." },
      { question: "How much video can 1 GB hold?", answer: "Approximately 30 minutes of HD video or 2 hours of standard-definition video, depending on compression." },
    ],
    relatedSlugs: ["mb-to-gb", "gb-to-tb", "kb-to-mb"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // COOKING
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "cups-to-tablespoons",
    from: "cups",
    to: "tablespoons",
    category: "unit",
    toolName: "Cups to Tablespoons Converter",
    description:
      "Convert cups to tablespoons instantly. Free cups to tbsp calculator for precise cooking and baking measurements.",
    keyword: "cups to tablespoons",
    subtitle: "Find the exact tablespoon measurement for any number of cups",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "cooking", fromDefault: "cook-cups", toDefault: "cook-tbsp" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of cups.",
      "The tablespoons equivalent is shown instantly.",
      "Use swap to convert tablespoons to cups.",
      "Click common values for quick cooking reference.",
    ],
    about:
      "<p>One US cup equals 16 tablespoons. This conversion is one of the most commonly needed in cooking and baking, especially when scaling recipes up or down.</p><p>Formula: <strong>tablespoons = cups x 16</strong>.</p>",
    faqs: [
      { question: "How many tablespoons in 1 cup?", answer: "There are exactly 16 tablespoons in one US cup." },
      { question: "How many tablespoons in half a cup?", answer: "Half a cup equals 8 tablespoons." },
      { question: "How many tablespoons in a quarter cup?", answer: "A quarter cup equals 4 tablespoons." },
    ],
    relatedSlugs: ["cups-to-ml", "tablespoons-to-ml", "ml-to-cups"],
    requiresFFmpeg: false,
  },
  {
    slug: "teaspoons-to-tablespoons",
    from: "teaspoons",
    to: "tablespoons",
    category: "unit",
    toolName: "Teaspoons to Tablespoons Converter",
    description:
      "Convert teaspoons to tablespoons instantly. Free tsp to tbsp calculator for cooking and baking precision.",
    keyword: "teaspoons to tablespoons",
    subtitle: "Convert between teaspoons and tablespoons for recipes",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "cooking", fromDefault: "cook-tsp", toDefault: "cook-tbsp" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of teaspoons.",
      "The tablespoons equivalent appears instantly.",
      "Use swap to convert tablespoons to teaspoons.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One tablespoon equals exactly 3 teaspoons. This is one of the most fundamental cooking conversions, used constantly when following recipes and adjusting seasoning amounts.</p><p>Formula: <strong>tablespoons = teaspoons / 3</strong>.</p>",
    faqs: [
      { question: "How many teaspoons in 1 tablespoon?", answer: "There are exactly 3 teaspoons in one tablespoon." },
      { question: "How many teaspoons in a cup?", answer: "There are 48 teaspoons in one US cup (16 tablespoons x 3)." },
      { question: "Does it matter if I use metric or US teaspoons?", answer: "For most recipes the difference is negligible. A US teaspoon is about 4.93 mL while a metric teaspoon is 5 mL." },
    ],
    relatedSlugs: ["cups-to-tablespoons", "cups-to-ml", "tablespoons-to-ml"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // TIME
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "hours-to-minutes",
    from: "hours",
    to: "minutes",
    category: "unit",
    toolName: "Hours to Minutes Converter",
    description:
      "Convert hours to minutes instantly. Free hours to minutes calculator for time tracking and scheduling.",
    keyword: "hours to minutes",
    subtitle: "Find the exact number of minutes in any number of hours",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "time", fromDefault: "hours", toDefault: "minutes" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of hours.",
      "The minutes equivalent is shown instantly.",
      "Use swap to convert minutes to hours.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One hour equals exactly 60 minutes. This conversion is commonly needed for time tracking, payroll calculations, project management, and converting decimal hours to minutes.</p><p>Formula: <strong>minutes = hours x 60</strong>.</p>",
    faqs: [
      { question: "How many minutes is 1.5 hours?", answer: "1.5 hours equals 90 minutes." },
      { question: "How do I convert 2 hours and 30 minutes to decimal?", answer: "2 hours and 30 minutes equals 2.5 hours (30 minutes / 60 = 0.5)." },
      { question: "How many minutes are in a work day?", answer: "A standard 8-hour work day contains 480 minutes." },
    ],
    relatedSlugs: ["minutes-to-hours", "days-to-hours", "weeks-to-days"],
    requiresFFmpeg: false,
  },
  {
    slug: "minutes-to-hours",
    from: "minutes",
    to: "hours",
    category: "unit",
    toolName: "Minutes to Hours Converter",
    description:
      "Convert minutes to hours instantly. Free minutes to hours calculator for time tracking, payroll, and scheduling.",
    keyword: "minutes to hours",
    subtitle: "Convert any number of minutes into hours",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "time", fromDefault: "minutes", toDefault: "hours" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of minutes.",
      "The hours equivalent appears instantly.",
      "Use swap to convert hours to minutes.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One minute equals 1/60 of an hour, or approximately 0.01667 hours. This conversion is especially useful for converting meeting durations, time logs, and payroll entries from minutes to decimal hours.</p><p>Formula: <strong>hours = minutes / 60</strong>.</p>",
    faqs: [
      { question: "How many hours is 90 minutes?", answer: "90 minutes equals 1.5 hours." },
      { question: "How many hours is 45 minutes?", answer: "45 minutes equals 0.75 hours." },
      { question: "How do I convert minutes to hours and minutes?", answer: "Divide by 60. The whole number is hours, the remainder is minutes. For example, 135 min = 2 hours 15 minutes." },
    ],
    relatedSlugs: ["hours-to-minutes", "days-to-hours", "weeks-to-days"],
    requiresFFmpeg: false,
  },
  {
    slug: "days-to-hours",
    from: "days",
    to: "hours",
    category: "unit",
    toolName: "Days to Hours Converter",
    description:
      "Convert days to hours instantly. Free days to hours calculator for project planning and time calculations.",
    keyword: "days to hours",
    subtitle: "Find the exact number of hours in any number of days",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "time", fromDefault: "days", toDefault: "hours" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of days.",
      "The hours equivalent is shown instantly.",
      "Use swap to convert hours to days.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One day equals exactly 24 hours. This conversion is used in project management, travel planning, and any situation where you need to express a duration in hours rather than days.</p><p>Formula: <strong>hours = days x 24</strong>.</p>",
    faqs: [
      { question: "How many hours is 7 days?", answer: "7 days equals 168 hours." },
      { question: "How many hours is 30 days?", answer: "30 days equals 720 hours." },
      { question: "How many work hours in a day?", answer: "A standard work day is 8 hours, though a calendar day is 24 hours." },
    ],
    relatedSlugs: ["hours-to-minutes", "weeks-to-days", "minutes-to-hours"],
    requiresFFmpeg: false,
  },
  {
    slug: "weeks-to-days",
    from: "weeks",
    to: "days",
    category: "unit",
    toolName: "Weeks to Days Converter",
    description:
      "Convert weeks to days instantly. Free weeks to days calculator for planning, pregnancy tracking, and scheduling.",
    keyword: "weeks to days",
    subtitle: "Convert weeks into the exact number of days",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "time", fromDefault: "weeks", toDefault: "days" },
    acceptedExtensions: [],
    howTo: [
      "Enter the number of weeks.",
      "The days equivalent is shown instantly.",
      "Use swap to convert days to weeks.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One week equals exactly 7 days. This conversion is commonly used in pregnancy tracking, project planning, and any scheduling scenario where you need to translate between weeks and days.</p><p>Formula: <strong>days = weeks x 7</strong>.</p>",
    faqs: [
      { question: "How many days is 6 weeks?", answer: "6 weeks equals 42 days." },
      { question: "How many days is 40 weeks?", answer: "40 weeks (a full-term pregnancy) equals 280 days." },
      { question: "How many weeks in a year?", answer: "There are approximately 52.18 weeks in a year." },
    ],
    relatedSlugs: ["days-to-hours", "hours-to-minutes", "minutes-to-hours"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ADDITIONAL HIGH-TRAFFIC CONVERSIONS
  // ═══════════════════════════════════════════════════════════════════════
  {
    slug: "kg-to-grams",
    from: "kg",
    to: "grams",
    category: "unit",
    toolName: "Kilograms to Grams Converter",
    description:
      "Convert kilograms to grams instantly. Free kg to g calculator for cooking, science, and everyday measurements.",
    keyword: "kg to grams",
    subtitle: "Convert kilograms to grams for precise measurements",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "weight", fromDefault: "kg", toDefault: "g" },
    acceptedExtensions: [],
    howTo: [
      "Enter the weight in kilograms.",
      "The grams equivalent is shown instantly.",
      "Use swap to convert grams to kilograms.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One kilogram equals exactly 1,000 grams. The kilogram is the base unit of mass in the International System of Units (SI), and the gram is its most commonly used subdivision.</p><p>Formula: <strong>grams = kilograms x 1000</strong>.</p>",
    faqs: [
      { question: "How many grams is 1 kg?", answer: "1 kilogram equals exactly 1,000 grams." },
      { question: "How many grams is 0.5 kg?", answer: "0.5 kilograms equals 500 grams." },
      { question: "When would I convert kg to grams?", answer: "Common in cooking (recipes often specify grams), scientific measurements, and postal weight calculations." },
    ],
    relatedSlugs: ["kg-to-lbs", "oz-to-grams", "grams-to-oz"],
    requiresFFmpeg: false,
  },
  {
    slug: "meters-to-cm",
    from: "meters",
    to: "cm",
    category: "unit",
    toolName: "Meters to Centimeters Converter",
    description:
      "Convert meters to centimeters instantly. Free m to cm calculator for height, distance, and everyday measurements.",
    keyword: "meters to cm",
    subtitle: "Convert meters to centimeters for precise measurements",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "m", toDefault: "cm" },
    acceptedExtensions: [],
    howTo: [
      "Enter the value in meters.",
      "The centimeters equivalent appears instantly.",
      "Use swap to convert centimeters to meters.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One meter equals exactly 100 centimeters. This is a fundamental metric conversion used in construction, tailoring, and everyday measurements where centimeters provide the appropriate level of precision.</p><p>Formula: <strong>centimeters = meters x 100</strong>.</p>",
    faqs: [
      { question: "How many cm is 1.8 meters?", answer: "1.8 meters equals 180 centimeters." },
      { question: "How tall is 1.75 meters in cm?", answer: "1.75 meters equals 175 centimeters." },
      { question: "Why use centimeters instead of meters?", answer: "Centimeters provide more precision for everyday measurements like body height, clothing sizes, and furniture dimensions." },
    ],
    relatedSlugs: ["cm-to-inches", "meters-to-feet", "feet-to-cm"],
    requiresFFmpeg: false,
  },
  {
    slug: "miles-to-feet",
    from: "miles",
    to: "feet",
    category: "unit",
    toolName: "Miles to Feet Converter",
    description:
      "Convert miles to feet instantly. Free miles to ft calculator for distance measurements in the Imperial system.",
    keyword: "miles to feet",
    subtitle: "Find the number of feet in any number of miles",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "length", fromDefault: "miles", toDefault: "feet" },
    acceptedExtensions: [],
    howTo: [
      "Enter the distance in miles.",
      "The feet equivalent is displayed instantly.",
      "Use swap to convert feet to miles.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One mile equals exactly 5,280 feet. This is a fundamental Imperial measurement conversion used in the US for distances, running tracks, and property surveys.</p><p>Formula: <strong>feet = miles x 5280</strong>.</p>",
    faqs: [
      { question: "How many feet is 1 mile?", answer: "1 mile equals exactly 5,280 feet." },
      { question: "Why is a mile 5,280 feet?", answer: "The statute mile was standardized in 1593 by English law as 8 furlongs of 660 feet each (8 x 660 = 5,280)." },
      { question: "How many feet is a half mile?", answer: "Half a mile equals 2,640 feet." },
    ],
    relatedSlugs: ["miles-to-km", "feet-to-meters", "km-to-miles"],
    requiresFFmpeg: false,
  },
  {
    slug: "fahrenheit-to-kelvin",
    from: "fahrenheit",
    to: "kelvin",
    category: "unit",
    toolName: "Fahrenheit to Kelvin Converter",
    description:
      "Convert Fahrenheit to Kelvin instantly. Free F to K calculator for science, engineering, and academic work.",
    keyword: "fahrenheit to kelvin",
    subtitle: "Convert Fahrenheit temperatures to the Kelvin scale",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "temperature", fromDefault: "fahrenheit", toDefault: "kelvin" },
    acceptedExtensions: [],
    howTo: [
      "Enter the temperature in Fahrenheit.",
      "The Kelvin equivalent appears instantly.",
      "Use swap to convert Kelvin to Fahrenheit.",
      "Click common temperatures for quick reference.",
    ],
    about:
      "<p>To convert Fahrenheit to Kelvin: first convert to Celsius using <strong>C = (F - 32) x 5/9</strong>, then add 273.15 to get Kelvin. This conversion is needed in scientific contexts where Kelvin is the standard but input data is in Fahrenheit.</p>",
    faqs: [
      { question: "What is 32\u00B0F in Kelvin?", answer: "32\u00B0F (the freezing point of water) equals 273.15 K." },
      { question: "What is 212\u00B0F in Kelvin?", answer: "212\u00B0F (the boiling point of water) equals 373.15 K." },
      { question: "Can Kelvin be negative?", answer: "No. The Kelvin scale starts at absolute zero (0 K = -459.67\u00B0F). There are no negative Kelvin values." },
    ],
    relatedSlugs: ["celsius-to-fahrenheit", "fahrenheit-to-celsius", "celsius-to-kelvin"],
    requiresFFmpeg: false,
  },
  {
    slug: "knots-to-kmh",
    from: "knots",
    to: "km/h",
    category: "unit",
    toolName: "Knots to km/h Converter",
    description:
      "Convert knots to kilometers per hour instantly. Free knots to km/h calculator for marine and aviation speed.",
    keyword: "knots to km/h",
    subtitle: "Convert nautical speed from knots to km/h",
    componentKey: "UnitConverterTool",
    componentProps: { categorySlug: "speed", fromDefault: "knots", toDefault: "kmh" },
    acceptedExtensions: [],
    howTo: [
      "Enter the speed in knots.",
      "The km/h equivalent appears instantly.",
      "Use swap to convert km/h to knots.",
      "Click common values for quick reference.",
    ],
    about:
      "<p>One knot equals exactly 1.852 kilometers per hour. Knots are the standard unit of speed for maritime and aviation use, while km/h is the standard for road vehicles in most countries.</p><p>Formula: <strong>km/h = knots x 1.852</strong>.</p>",
    faqs: [
      { question: "How fast is 20 knots in km/h?", answer: "20 knots equals 37.04 km/h." },
      { question: "Why is 1 knot exactly 1.852 km/h?", answer: "One knot is one nautical mile per hour, and one nautical mile is defined as exactly 1,852 meters." },
      { question: "How fast is a hurricane in knots?", answer: "A Category 1 hurricane has sustained winds of at least 64 knots (about 119 km/h)." },
    ],
    relatedSlugs: ["knots-to-mph", "kmh-to-mph", "mph-to-kmh"],
    requiresFFmpeg: false,
  },
];
