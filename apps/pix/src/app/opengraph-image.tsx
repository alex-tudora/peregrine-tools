import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Peregrine Pix — Free Online Image Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Free Online Image Tools",
    siteName: "Peregrine Pix",
    accentColor: "#7C3AED",
    description: "Compress, resize, crop, and convert images instantly. 100% free, no sign-up.",
  });
}
