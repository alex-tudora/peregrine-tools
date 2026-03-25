import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Image Filters — Adjust Brightness, Contrast & More | Peregrine Pix";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Image Filters",
    siteName: "Peregrine Pix",
    accentColor: "#7C3AED",
  });
}
