import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "PDF to PNG Converter — Free Online Tool | Peregrine PDF";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "PDF to PNG Converter",
    siteName: "Peregrine PDF",
    accentColor: "#2563EB",
  });
}
