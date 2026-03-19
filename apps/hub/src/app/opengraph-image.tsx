import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Peregrine Tools — 89 Free Online Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "89 Free Online Tools",
    siteName: "Peregrine Tools",
    accentColor: "#2563EB",
    description: "Documents, images, video, text, and code. No sign-up, no uploads.",
  });
}
