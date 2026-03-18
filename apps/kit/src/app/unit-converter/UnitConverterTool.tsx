"use client";

import { useState, useMemo } from "react";

type Category = "length" | "weight" | "temperature" | "volume" | "area" | "speed" | "data";

interface UnitDef {
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const categories: Record<Category, Record<string, UnitDef>> = {
  length: {
    mm: { label: "Millimeters (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    cm: { label: "Centimeters (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    m: { label: "Meters (m)", toBase: (v) => v, fromBase: (v) => v },
    km: { label: "Kilometers (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    in: { label: "Inches (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ft: { label: "Feet (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    yd: { label: "Yards (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    mi: { label: "Miles (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  weight: {
    mg: { label: "Milligrams (mg)", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    g: { label: "Grams (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    kg: { label: "Kilograms (kg)", toBase: (v) => v, fromBase: (v) => v },
    t: { label: "Metric Tons (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    oz: { label: "Ounces (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    lb: { label: "Pounds (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    st: { label: "Stones (st)", toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
  },
  temperature: {
    c: {
      label: "Celsius",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    f: {
      label: "Fahrenheit",
      toBase: (v) => (v - 32) * (5 / 9),
      fromBase: (v) => v * (9 / 5) + 32,
    },
    k: {
      label: "Kelvin",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  },
  volume: {
    ml: { label: "Milliliters (mL)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    l: { label: "Liters (L)", toBase: (v) => v, fromBase: (v) => v },
    m3: { label: "Cubic Meters", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    tsp: { label: "Teaspoons (tsp)", toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
    tbsp: { label: "Tablespoons (tbsp)", toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
    floz: { label: "Fluid Ounces (fl oz)", toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    cup: { label: "Cups", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    gal: { label: "Gallons (gal)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
  },
  area: {
    mm2: { label: "Square Millimeters", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    cm2: { label: "Square Centimeters", toBase: (v) => v / 1e4, fromBase: (v) => v * 1e4 },
    m2: { label: "Square Meters", toBase: (v) => v, fromBase: (v) => v },
    km2: { label: "Square Kilometers", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
    ha: { label: "Hectares", toBase: (v) => v * 1e4, fromBase: (v) => v / 1e4 },
    sqft: { label: "Square Feet", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    sqyd: { label: "Square Yards", toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
    ac: { label: "Acres", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    sqmi: { label: "Square Miles", toBase: (v) => v * 2.59e6, fromBase: (v) => v / 2.59e6 },
  },
  speed: {
    mps: { label: "Meters/second (m/s)", toBase: (v) => v, fromBase: (v) => v },
    kmh: { label: "Kilometers/hour (km/h)", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    mph: { label: "Miles/hour (mph)", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    fps: { label: "Feet/second (ft/s)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    kn: { label: "Knots (kn)", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  },
  data: {
    bit: { label: "Bits", toBase: (v) => v, fromBase: (v) => v },
    byte: { label: "Bytes", toBase: (v) => v * 8, fromBase: (v) => v / 8 },
    kb: { label: "Kilobytes (KB)", toBase: (v) => v * 8 * 1024, fromBase: (v) => v / (8 * 1024) },
    mb: { label: "Megabytes (MB)", toBase: (v) => v * 8 * 1024 ** 2, fromBase: (v) => v / (8 * 1024 ** 2) },
    gb: { label: "Gigabytes (GB)", toBase: (v) => v * 8 * 1024 ** 3, fromBase: (v) => v / (8 * 1024 ** 3) },
    tb: { label: "Terabytes (TB)", toBase: (v) => v * 8 * 1024 ** 4, fromBase: (v) => v / (8 * 1024 ** 4) },
    pb: { label: "Petabytes (PB)", toBase: (v) => v * 8 * 1024 ** 5, fromBase: (v) => v / (8 * 1024 ** 5) },
  },
};

const categoryLabels: Record<Category, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  volume: "Volume",
  area: "Area",
  speed: "Speed",
  data: "Data",
};

const defaultUnits: Record<Category, [string, string]> = {
  length: ["km", "mi"],
  weight: ["kg", "lb"],
  temperature: ["c", "f"],
  volume: ["l", "gal"],
  area: ["m2", "sqft"],
  speed: ["kmh", "mph"],
  data: ["mb", "gb"],
};

function formatResult(n: number): string {
  if (n === 0) return "0";
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 0.000001 && n !== 0)) {
    return n.toExponential(6);
  }
  const s = n.toPrecision(10);
  return parseFloat(s).toString();
}

export function UnitConverterTool() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState(defaultUnits.length[0]);
  const [toUnit, setToUnit] = useState(defaultUnits.length[1]);
  const [value, setValue] = useState("");

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setFromUnit(defaultUnits[cat][0]);
    setToUnit(defaultUnits[cat][1]);
    setValue("");
  };

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;
    const units = categories[category];
    const fromDef = units[fromUnit];
    const toDef = units[toUnit];
    if (!fromDef || !toDef) return null;
    const base = fromDef.toBase(num);
    return toDef.fromBase(base);
  }, [category, fromUnit, toUnit, value]);

  const units = categories[category];

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-1 rounded-lg bg-[color:var(--color-bg)] p-1">
        {(Object.keys(categories) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-md px-3 py-2 text-xs font-medium transition-all ${
              category === cat
                ? "bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] shadow-sm"
                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {/* From */}
        <div>
          <label className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
            From
          </label>
          <div className="flex gap-3">
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="flex-1 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            >
              {Object.entries(units).map(([key, def]) => (
                <option key={key} value={key}>
                  {def.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              setFromUnit(toUnit);
              setToUnit(fromUnit);
            }}
            className="rounded-full border border-[color:var(--color-border)] p-2 text-[color:var(--color-text-muted)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
            aria-label="Swap units"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 16V4m0 12l-3-3m3 3l3-3M17 8v12m0-12l3 3m-3-3l-3 3" />
            </svg>
          </button>
        </div>

        {/* To */}
        <div>
          <label className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
            To
          </label>
          <div className="flex gap-3">
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="flex-1 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            >
              {Object.entries(units).map(([key, def]) => (
                <option key={key} value={key}>
                  {def.label}
                </option>
              ))}
            </select>
            <div className="flex-1 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-3 py-2.5 text-sm font-medium text-[color:var(--color-text-primary)]">
              {result !== null ? formatResult(result) : "\u2014"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
