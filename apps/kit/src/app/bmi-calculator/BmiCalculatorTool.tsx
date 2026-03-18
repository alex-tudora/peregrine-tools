"use client";

import { useState, useMemo } from "react";

type UnitSystem = "metric" | "imperial";

interface BmiResult {
  bmi: number;
  category: string;
  color: string;
}

function getBmiCategory(bmi: number): { category: string; color: string } {
  if (bmi < 18.5) return { category: "Underweight", color: "#3B82F6" };
  if (bmi < 25) return { category: "Normal weight", color: "#10B981" };
  if (bmi < 30) return { category: "Overweight", color: "#F59E0B" };
  return { category: "Obese", color: "#EF4444" };
}

export function BmiCalculatorTool() {
  const [unit, setUnit] = useState<UnitSystem>("metric");

  // Metric
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  // Imperial
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLbs, setWeightLbs] = useState("");

  const result: BmiResult | null = useMemo(() => {
    let heightM: number;
    let weightKgVal: number;

    if (unit === "metric") {
      const cm = parseFloat(heightCm);
      const kg = parseFloat(weightKg);
      if (isNaN(cm) || isNaN(kg) || cm <= 0 || kg <= 0) return null;
      heightM = cm / 100;
      weightKgVal = kg;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const lbs = parseFloat(weightLbs);
      const totalInches = ft * 12 + inches;
      if (totalInches <= 0 || isNaN(lbs) || lbs <= 0) return null;
      heightM = totalInches * 0.0254;
      weightKgVal = lbs * 0.453592;
    }

    const bmi = weightKgVal / (heightM * heightM);
    const { category, color } = getBmiCategory(bmi);
    return { bmi, category, color };
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  // Visual scale: map BMI 10-40 to percentage
  const scalePercent = result ? Math.min(100, Math.max(0, ((result.bmi - 10) / 30) * 100)) : 0;

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      {/* Unit toggle */}
      <div className="flex gap-1 rounded-lg bg-[color:var(--color-bg)] p-1 mb-6">
        <button
          onClick={() => setUnit("metric")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            unit === "metric"
              ? "bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] shadow-sm"
              : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]"
          }`}
        >
          Metric (cm, kg)
        </button>
        <button
          onClick={() => setUnit("imperial")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            unit === "imperial"
              ? "bg-[color:var(--color-bg-card)] text-[color:var(--color-text-primary)] shadow-sm"
              : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]"
          }`}
        >
          Imperial (ft/in, lbs)
        </button>
      </div>

      <div className="space-y-4">
        {/* Height */}
        {unit === "metric" ? (
          <div>
            <label
              htmlFor="height-cm"
              className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
            >
              Height (cm)
            </label>
            <input
              id="height-cm"
              type="number"
              min="0"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              placeholder="170"
              className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2">
              Height
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  placeholder="5"
                  className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 pr-8 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[color:var(--color-text-muted)]">
                  ft
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  placeholder="10"
                  className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 pr-8 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[color:var(--color-text-muted)]">
                  in
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Weight */}
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-[color:var(--color-text-secondary)] mb-2"
          >
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            id="weight"
            type="number"
            min="0"
            value={unit === "metric" ? weightKg : weightLbs}
            onChange={(e) =>
              unit === "metric"
                ? setWeightKg(e.target.value)
                : setWeightLbs(e.target.value)
            }
            placeholder={unit === "metric" ? "70" : "154"}
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
          />
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          <div className="rounded-lg bg-[color:var(--color-accent-light)] px-5 py-4 text-center">
            <p className="text-sm text-[color:var(--color-text-secondary)] mb-1">Your BMI</p>
            <p className="text-3xl font-bold" style={{ color: result.color }}>
              {result.bmi.toFixed(1)}
            </p>
            <p className="mt-1 text-sm font-medium" style={{ color: result.color }}>
              {result.category}
            </p>
          </div>

          {/* Visual BMI Scale */}
          <div>
            <div className="relative h-4 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="h-full bg-blue-400" style={{ width: "28.3%" }} />
                <div className="h-full bg-green-400" style={{ width: "21.7%" }} />
                <div className="h-full bg-yellow-400" style={{ width: "16.7%" }} />
                <div className="h-full bg-red-400" style={{ width: "33.3%" }} />
              </div>
              <div
                className="absolute top-0 h-full w-1 bg-[color:var(--color-text-primary)] rounded-full shadow-md transition-all duration-300"
                style={{ left: `${scalePercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-xs text-[color:var(--color-text-muted)]">
              <span>10</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
            <div className="flex justify-between mt-0.5 text-xs text-[color:var(--color-text-muted)]">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
