import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "WAV to MP3 Converter — Free Online Tool | Peregrine Vid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "WAV to MP3 Converter",
    siteName: "Peregrine Vid",
    accentColor: "#E11D48",
  });
}
