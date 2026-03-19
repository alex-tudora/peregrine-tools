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
    },
    twitter: {
      card: "summary_large_image",
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
    },
    twitter: {
      card: "summary_large_image",
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
