/**
 * Markdown <-> HTML, backed by real libraries.
 *
 * Previously this was a hand-rolled regex parser (no nested lists, no tables, no
 * reliable inline handling). It now uses `marked` (Markdown -> HTML, GFM) and
 * `turndown` (HTML -> Markdown). The exported names are unchanged so callers
 * (apps/convert's TextConverterTool, and the kit markdown tools) need no edits.
 */
import { marked } from "marked";
import TurndownService from "turndown";

marked.setOptions({ gfm: true, breaks: false });

/** Escape HTML special characters. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Render inline markdown (no block wrapping) to HTML. */
export function processInline(text: string): string {
  return marked.parseInline(text, { async: false }) as string;
}

/** Render a full markdown document to HTML. */
export function parseMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

let turndownService: TurndownService | null = null;
function getTurndown(): TurndownService {
  if (!turndownService) {
    turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
    });
  }
  return turndownService;
}

/** Convert an HTML string to Markdown. */
export function htmlToMarkdown(html: string): string {
  return getTurndown().turndown(html);
}
