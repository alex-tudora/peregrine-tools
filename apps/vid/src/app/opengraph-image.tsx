import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Peregrine Vid — Free Online Video & Audio Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Free Online Video & Audio Tools",
    siteName: "Peregrine Vid",
    accentColor: "#E11D48",
    description: "Convert, compress, trim, and extract audio. 100% free, no sign-up.",
  });
}
