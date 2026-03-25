import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peregrinevid.com';
  const lastModified = "2026-03-23";

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
    '/trim-audio',
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
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...['/blog/how-to-compress-video-without-losing-quality', '/blog/extract-audio-from-video', '/blog/mp4-vs-webm-vs-mov'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['/compare/convertio', '/compare/cloudconvert'].map((route) => ({
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
