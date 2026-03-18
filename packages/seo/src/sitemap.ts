export interface ToolEntry {
  path: string;
  priority?: number;
  changeFrequency?: string;
}

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

export function generateSitemapEntries(
  siteUrl: string,
  tools: ToolEntry[],
): SitemapEntry[] {
  const lastModified = new Date().toISOString().split("T")[0];

  const homepage: SitemapEntry = {
    url: siteUrl,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
  };

  const toolEntries: SitemapEntry[] = tools.map((tool) => ({
    url: `${siteUrl}${tool.path}`,
    lastModified,
    changeFrequency: tool.changeFrequency ?? "weekly",
    priority: tool.priority ?? 0.8,
  }));

  return [homepage, ...toolEntries];
}
