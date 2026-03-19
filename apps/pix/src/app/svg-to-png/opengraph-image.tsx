import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "SVG to PNG Converter — Free Online Tool | Peregrine Pix";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "SVG to PNG Converter",
    siteName: "Peregrine Pix",
    accentColor: "#7C3AED",
  });
}
