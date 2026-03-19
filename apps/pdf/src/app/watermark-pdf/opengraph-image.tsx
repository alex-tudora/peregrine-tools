import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Watermark PDF Online — Free Online Tool | Peregrine PDF";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Watermark PDF Online",
    siteName: "Peregrine PDF",
    accentColor: "#2563EB",
  });
}
