export interface UnitDef {
  value: string;
  label: string;
  shortLabel: string;
  factor: number;
}

export interface UnitCategory {
  slug: string;
  name: string;
  icon: string;
  units: UnitDef[];
  convert?: (value: number, fromUnit: string, toUnit: string) => number;
}

// ── Length (base: meters) ──────────────────────────────────────────────
const lengthUnits: UnitDef[] = [
  { value: "m", label: "Meters", shortLabel: "m", factor: 1 },
  { value: "km", label: "Kilometers", shortLabel: "km", factor: 1000 },
  { value: "cm", label: "Centimeters", shortLabel: "cm", factor: 0.01 },
  { value: "mm", label: "Millimeters", shortLabel: "mm", factor: 0.001 },
  { value: "miles", label: "Miles", shortLabel: "mi", factor: 1609.344 },
  { value: "yards", label: "Yards", shortLabel: "yd", factor: 0.9144 },
  { value: "feet", label: "Feet", shortLabel: "ft", factor: 0.3048 },
  { value: "inches", label: "Inches", shortLabel: "in", factor: 0.0254 },
  { value: "nautical-miles", label: "Nautical Miles", shortLabel: "nmi", factor: 1852 },
];

// ── Weight (base: kilograms) ───────────────────────────────────────────
const weightUnits: UnitDef[] = [
  { value: "kg", label: "Kilograms", shortLabel: "kg", factor: 1 },
  { value: "g", label: "Grams", shortLabel: "g", factor: 0.001 },
  { value: "mg", label: "Milligrams", shortLabel: "mg", factor: 0.000001 },
  { value: "lbs", label: "Pounds", shortLabel: "lb", factor: 0.45359237 },
  { value: "oz", label: "Ounces", shortLabel: "oz", factor: 0.028349523125 },
  { value: "stones", label: "Stones", shortLabel: "st", factor: 6.35029318 },
  { value: "metric-tons", label: "Metric Tons", shortLabel: "t", factor: 1000 },
];

// ── Temperature (custom formulas) ─────────────────────────────────────
const temperatureUnits: UnitDef[] = [
  { value: "celsius", label: "Celsius", shortLabel: "\u00B0C", factor: 1 },
  { value: "fahrenheit", label: "Fahrenheit", shortLabel: "\u00B0F", factor: 1 },
  { value: "kelvin", label: "Kelvin", shortLabel: "K", factor: 1 },
];

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;
  // Convert to Celsius first
  let celsius: number;
  switch (from) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = (value - 32) * (5 / 9);
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
    default:
      return value;
  }
  // Convert from Celsius to target
  switch (to) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return celsius * (9 / 5) + 32;
    case "kelvin":
      return celsius + 273.15;
    default:
      return value;
  }
}

// ── Volume (base: liters) ─────────────────────────────────────────────
const volumeUnits: UnitDef[] = [
  { value: "liters", label: "Liters", shortLabel: "L", factor: 1 },
  { value: "ml", label: "Milliliters", shortLabel: "mL", factor: 0.001 },
  { value: "gallons-us", label: "Gallons (US)", shortLabel: "gal", factor: 3.785411784 },
  { value: "gallons-uk", label: "Gallons (UK)", shortLabel: "gal\u00A0UK", factor: 4.54609 },
  { value: "cups", label: "Cups", shortLabel: "cup", factor: 0.2365882365 },
  { value: "tablespoons", label: "Tablespoons", shortLabel: "tbsp", factor: 0.01478676478125 },
  { value: "teaspoons", label: "Teaspoons", shortLabel: "tsp", factor: 0.00492892159375 },
  { value: "fluid-oz", label: "Fluid Ounces (US)", shortLabel: "fl\u00A0oz", factor: 0.0295735295625 },
];

// ── Area (base: square meters) ────────────────────────────────────────
const areaUnits: UnitDef[] = [
  { value: "sqm", label: "Square Meters", shortLabel: "m\u00B2", factor: 1 },
  { value: "sqkm", label: "Square Kilometers", shortLabel: "km\u00B2", factor: 1_000_000 },
  { value: "sqft", label: "Square Feet", shortLabel: "ft\u00B2", factor: 0.09290304 },
  { value: "acres", label: "Acres", shortLabel: "ac", factor: 4046.8564224 },
  { value: "hectares", label: "Hectares", shortLabel: "ha", factor: 10_000 },
  { value: "sqmiles", label: "Square Miles", shortLabel: "mi\u00B2", factor: 2_589_988.110336 },
];

// ── Speed (base: meters per second) ──────────────────────────────────
const speedUnits: UnitDef[] = [
  { value: "ms", label: "Meters per Second", shortLabel: "m/s", factor: 1 },
  { value: "kmh", label: "Kilometers per Hour", shortLabel: "km/h", factor: 1 / 3.6 },
  { value: "mph", label: "Miles per Hour", shortLabel: "mph", factor: 0.44704 },
  { value: "knots", label: "Knots", shortLabel: "kn", factor: 0.514444 },
  { value: "fts", label: "Feet per Second", shortLabel: "ft/s", factor: 0.3048 },
];

// ── Digital Storage (base: bytes) ────────────────────────────────────
const digitalUnits: UnitDef[] = [
  { value: "bytes", label: "Bytes", shortLabel: "B", factor: 1 },
  { value: "kb", label: "Kilobytes", shortLabel: "KB", factor: 1024 },
  { value: "mb", label: "Megabytes", shortLabel: "MB", factor: 1024 ** 2 },
  { value: "gb", label: "Gigabytes", shortLabel: "GB", factor: 1024 ** 3 },
  { value: "tb", label: "Terabytes", shortLabel: "TB", factor: 1024 ** 4 },
  { value: "pb", label: "Petabytes", shortLabel: "PB", factor: 1024 ** 5 },
];

// ── Cooking (base: milliliters) ──────────────────────────────────────
const cookingUnits: UnitDef[] = [
  { value: "cook-ml", label: "Milliliters", shortLabel: "mL", factor: 1 },
  { value: "cook-cups", label: "Cups", shortLabel: "cup", factor: 236.5882365 },
  { value: "cook-tbsp", label: "Tablespoons", shortLabel: "tbsp", factor: 14.78676478125 },
  { value: "cook-tsp", label: "Teaspoons", shortLabel: "tsp", factor: 4.92892159375 },
  { value: "cook-floz", label: "Fluid Ounces", shortLabel: "fl\u00A0oz", factor: 29.5735295625 },
];

// ── Time (base: seconds) ─────────────────────────────────────────────
const timeUnits: UnitDef[] = [
  { value: "seconds", label: "Seconds", shortLabel: "s", factor: 1 },
  { value: "minutes", label: "Minutes", shortLabel: "min", factor: 60 },
  { value: "hours", label: "Hours", shortLabel: "hr", factor: 3600 },
  { value: "days", label: "Days", shortLabel: "d", factor: 86400 },
  { value: "weeks", label: "Weeks", shortLabel: "wk", factor: 604800 },
  { value: "months", label: "Months", shortLabel: "mo", factor: 2629746 },
  { value: "years", label: "Years", shortLabel: "yr", factor: 31556952 },
];

// ── Export all categories ────────────────────────────────────────────
export const unitCategories: UnitCategory[] = [
  { slug: "length", name: "Length", icon: "\uD83D\uDCCF", units: lengthUnits },
  { slug: "weight", name: "Weight", icon: "\u2696\uFE0F", units: weightUnits },
  {
    slug: "temperature",
    name: "Temperature",
    icon: "\uD83C\uDF21\uFE0F",
    units: temperatureUnits,
    convert: convertTemperature,
  },
  { slug: "volume", name: "Volume", icon: "\uD83E\uDDEA", units: volumeUnits },
  { slug: "area", name: "Area", icon: "\u26F3", units: areaUnits },
  { slug: "speed", name: "Speed", icon: "\uD83C\uDFCE\uFE0F", units: speedUnits },
  { slug: "digital", name: "Digital Storage", icon: "\uD83D\uDCBE", units: digitalUnits },
  { slug: "cooking", name: "Cooking", icon: "\uD83E\uDDD1\u200D\uD83C\uDF73", units: cookingUnits },
  { slug: "time", name: "Time", icon: "\u231A", units: timeUnits },
];

/** Look up a category by slug */
export const categoriesBySlug = new Map(unitCategories.map((c) => [c.slug, c]));
