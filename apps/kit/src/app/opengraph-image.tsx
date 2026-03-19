import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Peregrine Kit — Free Online Text & Calculator Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Text Tools, Calculators & SEO Utilities",
    siteName: "Peregrine Kit",
    accentColor: "#059669",
    description: "Word counter, case converter, calculators, and more. 100% free, no sign-up.",
  });
}
