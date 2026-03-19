import { createOGImageResponse } from "@peregrine/seo";
import { conversionsBySlug } from "@/data/conversions";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata() {
  return [{ id: "og", alt: "Convert-a-Lot" }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const conversion = conversionsBySlug.get(slug);

  return createOGImageResponse({
    title: conversion?.toolName ?? "File Converter",
    siteName: "Convert-a-Lot",
    accentColor: "#EA580C",
    description: conversion?.description,
  });
}
