import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "PDF to Text — Extract Text from PDF | Peregrine PDF";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "PDF to Text — Text Extraction",
    siteName: "Peregrine PDF",
    accentColor: "#2563EB",
  });
}
