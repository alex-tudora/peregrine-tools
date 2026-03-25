import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peregrinekit.com';
  const lastModified = "2026-03-23";

  const toolRoutes = [
    '/word-counter',
    '/character-counter',
    '/case-converter',
    '/lorem-ipsum-generator',
    '/text-diff',
    '/remove-duplicates',
    '/find-and-replace',
    '/text-to-slug',
    '/remove-line-breaks',
    '/markdown-to-html',
    '/html-to-markdown',
    '/readability-score',
    '/percentage-calculator',
    '/age-calculator',
    '/date-difference',
    '/unit-converter',
    '/timezone-converter',
    '/tip-calculator',
    '/bmi-calculator',
    '/mortgage-calculator',
    '/compound-interest',
    '/salary-calculator',
    '/gpa-calculator',
    '/meta-tag-generator',
    '/open-graph-preview',
    '/robots-txt-generator',
    '/sitemap-generator',
    '/utm-builder',
    '/qr-code-generator',
    '/heading-checker',
    '/text-to-speech',
    '/pomodoro-timer',
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
    ...['/blog/improve-your-writing-with-readability-scores', '/blog/meta-tags-seo-guide', '/blog/compound-interest-explained'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['/compare/counttool', '/compare/calculatorsoup'].map((route) => ({
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
