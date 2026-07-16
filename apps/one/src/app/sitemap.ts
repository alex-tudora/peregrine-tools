import type { MetadataRoute } from "next";

/*
 * Consolidation PoC sitemap. In a full migration this would be generated from the
 * unified tool catalog (see Tier 3) so every /category/tool path is emitted from a
 * single source of truth. Here it lists the homepage plus the two live tools.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://peregrine-tools.com";
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "daily", priority: 1.0 },
    {
      url: `${baseUrl}/text/word-counter`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dev/json-formatter`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
