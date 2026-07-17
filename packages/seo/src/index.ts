export {
  generateToolMetadata,
  generateSiteMetadata,
  type ToolMetadataOptions,
  type SiteMetadataOptions,
} from "./metadata";

export {
  generateToolStructuredData,
  generateFAQStructuredData,
  generateHowToStructuredData,
  generateBreadcrumbStructuredData,
  generateToolPageStructuredData,
  generateOrganizationStructuredData,
  generateWebSiteStructuredData,
  type ToolStructuredDataOptions,
  type WebApplicationStructuredData,
  type FAQ,
  type HowToOptions,
  type BreadcrumbOptions,
  type ToolPageStructuredDataOptions,
} from "./structuredData";

export { createOGImageResponse, type OGImageOptions } from "./og";
