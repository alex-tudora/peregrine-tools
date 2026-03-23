import type { Metadata } from "next";

export interface ToolMetadataOptions {
  toolName: string;
  description: string;
  keyword: string;
  siteName: string;
  siteUrl: string;
  path: string;
}

export interface SiteMetadataOptions {
  siteName: string;
  description: string;
  siteUrl: string;
}

export function generateToolMetadata({
  toolName,
  description,
  keyword,
  siteName,
  siteUrl,
  path,
}: ToolMetadataOptions): Metadata {
  const title = `${toolName} — Free Online Tool | ${siteName}`;
  const canonicalUrl = `${siteUrl}${path}`;
  const ogImageUrl = `${siteUrl}${path}/opengraph-image`;

  return {
    title,
    description,
    keywords: [keyword, siteName, "free online tool", "no sign-up"],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: toolName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateSiteMetadata({
  siteName,
  description,
  siteUrl,
}: SiteMetadataOptions): Metadata {
  const ogImageUrl = `${siteUrl}/opengraph-image`;

  return {
    title: siteName,
    description,
    keywords: [siteName, "free online tools", "no sign-up"],
    openGraph: {
      title: siteName,
      description,
      url: siteUrl,
      siteName,
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "google-adsense-account": "ca-pub-2865991938661915",
    },
  };
}
