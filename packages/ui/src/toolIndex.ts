/**
 * Kept for backwards compatibility. The canonical data now lives in catalog.ts;
 * this file just re-exports it so existing `from "./toolIndex"` imports keep working.
 */
export { allTools, siteOrder, type ToolEntry } from "./catalog";
