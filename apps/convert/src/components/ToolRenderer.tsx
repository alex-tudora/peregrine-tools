"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ConversionDef } from "@/data/conversions";

/* eslint-disable @typescript-eslint/no-explicit-any */
const toolComponents: Record<string, ComponentType<any>> = {
  ImageConverterTool: dynamic(
    () => import("@/components/tools/ImageConverterTool").then((m) => m.ImageConverterTool) as any,
    { ssr: false }
  ),
  PdfToImageTool: dynamic(
    () => import("@/components/tools/PdfToImageTool").then((m) => m.PdfToImageTool) as any,
    { ssr: false }
  ),
  ImageToPdfTool: dynamic(
    () => import("@/components/tools/ImageToPdfTool").then((m) => m.ImageToPdfTool) as any,
    { ssr: false }
  ),
  FFmpegConverterTool: dynamic(
    () => import("@/components/tools/FFmpegConverterTool").then((m) => m.FFmpegConverterTool) as any,
    { ssr: false }
  ),
  TextConverterTool: dynamic(
    () => import("@/components/tools/TextConverterTool").then((m) => m.TextConverterTool) as any,
    { ssr: false }
  ),
  UnitConverterTool: dynamic(
    () => import("@/components/tools/UnitConverterTool").then((m) => ({ default: m.UnitConverterTool })),
    { ssr: false }
  ),
  CurrencyConverterTool: dynamic(
    () => import("@/components/tools/CurrencyConverterTool").then((m) => ({ default: m.CurrencyConverterTool })),
    { ssr: false }
  ),
  TextCaseConverterTool: dynamic(
    () => import("@/components/tools/TextCaseConverterTool").then((m) => ({ default: m.TextCaseConverterTool })),
    { ssr: false }
  ),
  NumberConverterTool: dynamic(
    () => import("@/components/tools/NumberConverterTool").then((m) => ({ default: m.NumberConverterTool })),
    { ssr: false }
  ),
  ColorConverterTool: dynamic(
    () => import("@/components/tools/ColorConverterTool").then((m) => ({ default: m.ColorConverterTool })),
    { ssr: false }
  ),
  TimezoneConverterTool: dynamic(
    () => import("@/components/tools/TimezoneConverterTool").then((m) => ({ default: m.TimezoneConverterTool })),
    { ssr: false }
  ),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

interface ToolRendererProps {
  componentKey: string;
  componentProps: ConversionDef["componentProps"];
}

export function ToolRenderer({ componentKey, componentProps }: ToolRendererProps) {
  const ToolComponent = toolComponents[componentKey];
  if (!ToolComponent) return null;
  return <ToolComponent {...componentProps} />;
}
