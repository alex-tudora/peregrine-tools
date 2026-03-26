import { createOGImageResponse } from "@peregrine/seo";

export const runtime = "edge";
export const alt = "Optimize PDF — Deep Compression with Image Optimization | Peregrine PDF";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createOGImageResponse({
    title: "Optimize PDF — Deep Compression",
    siteName: "Peregrine PDF",
    accentColor: "#2563EB",
  });
}
