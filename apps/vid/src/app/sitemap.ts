import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peregrinevid.com';
  const lastModified = new Date();

  const toolRoutes = [
    '/convert-to-mp4',
    '/video-to-mp3',
    '/video-to-gif',
    '/compress-video',
    '/trim-video',
    '/convert-to-mp3',
    '/wav-to-mp3',
    '/mp3-to-wav',
    '/extract-audio',
    '/compress-audio',
    '/video-to-webm',
    '/screen-recorder',
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
