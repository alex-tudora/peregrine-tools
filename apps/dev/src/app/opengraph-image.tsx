import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Peregrine Dev — Free Online Developer Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Free Online Developer Tools",
    siteName: "Peregrine Dev",
    accentColor: "#D97706",
    description: "JSON, regex, base64, hashing, and more. 100% free, no sign-up.",
  });
}
