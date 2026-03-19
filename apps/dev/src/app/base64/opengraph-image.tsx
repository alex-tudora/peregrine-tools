import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Base64 Encoder/Decoder — Free Online Tool | Peregrine Dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Base64 Encoder/Decoder",
    siteName: "Peregrine Dev",
    accentColor: "#D97706",
  });
}
