import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Peregrine PDF — Free Online PDF Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "The Fastest PDF Tools on the Web",
    siteName: "Peregrine PDF",
    accentColor: "#2563EB",
    description: "Merge, split, compress, and convert PDF files instantly. 100% free, no sign-up.",
  });
}
