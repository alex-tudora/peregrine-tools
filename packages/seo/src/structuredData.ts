/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ToolStructuredDataOptions {
  toolName: string;
  description: string;
  url: string;
  siteName: string;
}

export interface WebApplicationStructuredData {
  "@context": "https://schema.org";
  "@type": "WebApplication";
  name: string;
  description: string;
  url: string;
  applicationCategory: "UtilityApplication";
  operatingSystem: "Any";
  offers: {
    "@type": "Offer";
    price: "0";
    priceCurrency: "USD";
  };
  publisher: {
    "@type": "Organization";
    name: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface HowToOptions {
  name: string;
  description: string;
  steps: string[];
  toolUrl: string;
}

export interface BreadcrumbOptions {
  siteName: string;
  siteUrl: string;
  toolName: string;
  toolPath: string;
}

export interface ToolPageStructuredDataOptions {
  toolName: string;
  description: string;
  keyword: string;
  url: string;
  siteName: string;
  siteUrl: string;
  path: string;
  faqs?: FAQ[];
  howTo?: string[];
}

/* ------------------------------------------------------------------ */
/*  WebApplication (existing)                                          */
/* ------------------------------------------------------------------ */

export function generateToolStructuredData({
  toolName,
  description,
  url,
  siteName,
}: ToolStructuredDataOptions): WebApplicationStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: toolName,
    description,
    url,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  FAQPage                                                            */
/* ------------------------------------------------------------------ */

export function generateFAQStructuredData({ faqs }: { faqs: FAQ[] }) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  HowTo                                                              */
/* ------------------------------------------------------------------ */

export function generateHowToStructuredData({
  name,
  description,
  steps,
  toolUrl,
}: HowToOptions) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "HowTo" as const,
    name,
    description,
    totalTime: "PT1M",
    tool: { "@type": "HowToTool" as const, name: "Web browser" },
    step: steps.map((text, i) => ({
      "@type": "HowToStep" as const,
      position: i + 1,
      text,
      url: toolUrl,
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbList                                                     */
/* ------------------------------------------------------------------ */

export function generateBreadcrumbStructuredData({
  siteName,
  siteUrl,
  toolName,
  toolPath,
}: BreadcrumbOptions) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      {
        "@type": "ListItem" as const,
        position: 1,
        name: siteName,
        item: siteUrl,
      },
      {
        "@type": "ListItem" as const,
        position: 2,
        name: toolName,
        item: `${siteUrl}${toolPath}`,
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Composite helper — all schemas for a tool page                     */
/* ------------------------------------------------------------------ */

export function generateToolPageStructuredData({
  toolName,
  description,
  url,
  siteName,
  siteUrl,
  path,
  faqs,
  howTo,
}: ToolPageStructuredDataOptions): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [
    generateToolStructuredData({ toolName, description, url, siteName }) as unknown as Record<string, unknown>,
    generateBreadcrumbStructuredData({ siteName, siteUrl, toolName, toolPath: path }) as unknown as Record<string, unknown>,
  ];

  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQStructuredData({ faqs }));
  }

  if (howTo && howTo.length > 0) {
    schemas.push(
      generateHowToStructuredData({
        name: `How to use ${toolName}`,
        description,
        steps: howTo,
        toolUrl: url,
      }),
    );
  }

  return schemas;
}

/* ------------------------------------------------------------------ */
/*  Organization                                                       */
/* ------------------------------------------------------------------ */

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Organization" as const,
    name: "Peregrine Tools",
    url: "https://peregrine-tools.com",
    logo: "https://peregrine-tools.com/icon.png",
    sameAs: [],
  };
}

/* ------------------------------------------------------------------ */
/*  WebSite (with SearchAction)                                        */
/* ------------------------------------------------------------------ */

export function generateWebSiteStructuredData() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebSite" as const,
    name: "Peregrine Tools",
    url: "https://peregrine-tools.com",
    potentialAction: {
      "@type": "SearchAction" as const,
      target: "https://peregrine-tools.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}
