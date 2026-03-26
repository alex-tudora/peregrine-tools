import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateToolMetadata, generateToolPageStructuredData } from "@peregrine/seo";
import { ToolLayout } from "@peregrine/ui";
import { conversionsBySlug, allSlugs } from "@/data/conversions";
import { ToolRenderer } from "@/components/ToolRenderer";
import { KnightQuote } from "../KnightQuote";

const SITE_NAME = "Convert-a-Lot";
const SITE_URL = "https://convert-a-lot.com";

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const conversion = conversionsBySlug.get(slug);
  if (!conversion) return {};

  return generateToolMetadata({
    toolName: conversion.toolName,
    description: conversion.description,
    keyword: conversion.keyword,
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    path: `/${conversion.slug}`,
  });
}

export default async function ConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const conversion = conversionsBySlug.get(slug);
  if (!conversion) notFound();

  const schemas = generateToolPageStructuredData({
    toolName: conversion.toolName,
    description: conversion.description,
    keyword: conversion.keyword,
    url: `${SITE_URL}/${conversion.slug}`,
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    path: `/${conversion.slug}`,
    faqs: conversion.faqs,
    howTo: conversion.howTo,
  });

  const relatedTools = conversion.relatedSlugs
    .map((rs) => conversionsBySlug.get(rs))
    .filter(Boolean)
    .map((c) => ({ name: c!.toolName, href: `/${c!.slug}` }));

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ToolLayout
        title={conversion.toolName}
        subtitle={conversion.subtitle}
        afterSubtitle={<KnightQuote />}
        howTo={conversion.howTo}
        about={conversion.about}
        faqs={conversion.faqs}
        relatedTools={relatedTools}
        keyword={conversion.keyword}
      >
        <ToolRenderer
          componentKey={conversion.componentKey}
          componentProps={conversion.componentProps}
        />
      </ToolLayout>
    </>
  );
}
