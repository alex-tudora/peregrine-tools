import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peregrinedev.com';
  const lastModified = "2026-03-23";

  const toolRoutes = [
    '/json-formatter',
    '/json-validator',
    '/json-to-csv',
    '/csv-to-json',
    '/regex-tester',
    '/base64',
    '/url-encode',
    '/hash-generator',
    '/uuid-generator',
    '/color-picker',
    '/hex-to-rgb',
    '/cron-builder',
    '/jwt-decoder',
    '/html-minifier',
    '/css-minifier',
    '/js-minifier',
    '/sql-formatter',
    '/diff-checker',
    '/timestamp-converter',
  ];

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...toolRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...['/blog/json-formatting-best-practices', '/blog/regex-cheat-sheet', '/blog/base64-encoding-explained'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['/compare/devtoys', '/compare/cyberchef'].map((route) => ({
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
}
