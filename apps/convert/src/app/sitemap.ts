import type { MetadataRoute } from 'next';
import { conversions } from '@/data/conversions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://convert-a-lot.com';
  const lastModified = "2026-03-23";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...['/blog/file-conversion-guide', '/blog/video-audio-format-differences', '/blog/image-format-conversion-tips'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['/compare/zamzar', '/compare/onlineconvert'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const conversionPages: MetadataRoute.Sitemap = conversions.map((c) => ({
    url: `${baseUrl}/${c.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...conversionPages];
}
