import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Trim Video Online — Free Online Tool | Peregrine Vid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Trim Video Online",
    siteName: "Peregrine Vid",
    accentColor: "#E11D48",
  });
}
