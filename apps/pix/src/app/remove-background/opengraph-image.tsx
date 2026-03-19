import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Remove Image Background — Free Online Tool | Peregrine Pix";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Remove Image Background",
    siteName: "Peregrine Pix",
    accentColor: "#7C3AED",
  });
}
