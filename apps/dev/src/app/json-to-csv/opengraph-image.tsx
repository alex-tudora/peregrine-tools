import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "JSON to CSV Converter — Free Online Tool | Peregrine Dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "JSON to CSV Converter",
    siteName: "Peregrine Dev",
    accentColor: "#D97706",
  });
}
