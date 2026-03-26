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
    '/ocr-pdf',
    '/pdf-to-text',
    '/extract-pdf-pages',
    '/optimize-pdf',
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
    ...['/blog/how-to-reduce-pdf-file-size', '/blog/merge-pdf-files-guide', '/blog/pdf-vs-image-formats', '/blog/digitally-sign-pdf-without-printing', '/blog/extract-text-from-pdf'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['/compare/ilovepdf', '/compare/smallpdf'].map((route) => ({
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
