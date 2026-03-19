import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "JPG to WebP Converter — Free Online Tool | Peregrine Pix";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "JPG to WebP Converter",
    siteName: "Peregrine Pix",
    accentColor: "#7C3AED",
  });
}
