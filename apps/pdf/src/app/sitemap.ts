import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peregrinepdf.com';
  const lastModified = "2026-03-23";

  const toolRoutes = [
    '/merge-pdf',
    '/split-pdf',
    '/compress-pdf',
    '/pdf-to-jpg',
    '/jpg-to-pdf',
    '/pdf-to-png',
    '/png-to-pdf',
    '/rotate-pdf',
    '/watermark-pdf',
    '/unlock-pdf',
    '/protect-pdf',
    '/sign-pdf',
    '/add-page-numbers',
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
