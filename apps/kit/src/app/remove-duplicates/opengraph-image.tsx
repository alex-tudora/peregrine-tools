import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Remove Duplicates — Free Online Tool | Peregrine Kit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Remove Duplicates",
    siteName: "Peregrine Kit",
    accentColor: "#059669",
  });
}
