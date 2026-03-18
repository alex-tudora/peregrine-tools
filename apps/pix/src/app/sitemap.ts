import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peregrinepix.com';
  const lastModified = new Date();

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
