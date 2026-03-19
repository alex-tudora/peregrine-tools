import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Convert-a-Lot — Free Online File Converter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "The Fastest Free File Converter",
    siteName: "Convert-a-Lot",
    accentColor: "#EA580C",
    description: "Convert between PDF, images, video, audio, and data formats. No uploads.",
  });
}
