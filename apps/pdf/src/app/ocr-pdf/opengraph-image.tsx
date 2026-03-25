import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "OCR PDF — Extract Text from Scanned PDFs | Peregrine PDF";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "OCR PDF — Text Extraction",
    siteName: "Peregrine PDF",
    accentColor: "#2563EB",
  });
}
