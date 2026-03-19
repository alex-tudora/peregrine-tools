import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "QR Code Generator — Free Online Tool | Peregrine Kit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "QR Code Generator",
    siteName: "Peregrine Kit",
    accentColor: "#059669",
  });
}
