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
