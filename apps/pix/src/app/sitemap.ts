import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peregrinepix.com';
  const lastModified = "2026-03-23";

  const toolRoutes = [
    '/compress-image',
    '/resize-image',
    '/crop-image',
    '/remove-background',
    '/png-to-jpg',
    '/jpg-to-png',
    '/webp-to-jpg',
    '/webp-to-png',
    '/jpg-to-webp',
    '/png-to-webp',
    '/svg-to-png',
    '/add-watermark',
    '/flip-rotate',
    '/favicon-generator',
    '/image-to-base64',
    '/image-filters',
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
    ...['/blog/jpeg-vs-png-vs-webp', '/blog/how-to-compress-images-for-web', '/blog/complete-guide-to-favicons'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['/compare/tinypng', '/compare/squoosh'].map((route) => ({
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
