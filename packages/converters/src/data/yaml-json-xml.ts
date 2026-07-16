/**
 * YAML -> JSON and JSON -> XML converters.
 *
 * YAML parsing is delegated to the spec-compliant `yaml` library. (It previously
 * used a hand-rolled indentation tokenizer that mishandled nested structures and
 * contained a no-op ternary bug — `t.isListItem ? t.indent : t.indent`.)
 */
import { parse as parseYaml } from "yaml";

// ─── YAML to JSON ────────────────────────────────────────────────────────────

export function yamlToJson(yaml: string): string {
  const trimmed = yaml.trim();
  if (!trimmed) throw new Error("Input is empty");

  const result = parseYaml(yaml);
  return JSON.stringify(result, null, 2);
}

// ─── JSON to XML ─────────────────────────────────────────────────────────────

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sanitizeTagName(name: string): string {
  // XML tag names cannot start with a number or contain spaces
  let tag = name.replace(/[^a-zA-Z0-9_.-]/g, "_");
  if (/^\d/.test(tag)) tag = `_${tag}`;
  return tag || "item";
}

function valueToXml(key: string, value: unknown, indent: string): string {
  const tag = sanitizeTagName(key);

  if (value === null || value === undefined) {
    return `${indent}<${tag} />\n`;
  }

  if (typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
    return `${indent}<${tag}>${escapeXml(String(value))}</${tag}>\n`;
  }

  if (Array.isArray(value)) {
    return value.map((item) => valueToXml(key, item, indent)).join("");
  }

  if (typeof value === "object") {
    let xml = `${indent}<${tag}>\n`;
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      xml += valueToXml(k, v, indent + "  ");
    }
    xml += `${indent}</${tag}>\n`;
    return xml;
  }

  return `${indent}<${tag}>${escapeXml(String(value))}</${tag}>\n`;
}

export function jsonToXml(jsonString: string): string {
  const trimmed = jsonString.trim();
  if (!trimmed) throw new Error("Input is empty");

  const data = JSON.parse(trimmed);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';

  if (Array.isArray(data)) {
    xml += "<root>\n";
    for (const item of data) {
      xml += valueToXml("item", item, "  ");
    }
    xml += "</root>\n";
  } else if (typeof data === "object" && data !== null) {
    xml += "<root>\n";
    for (const [key, value] of Object.entries(data)) {
      xml += valueToXml(key, value, "  ");
    }
    xml += "</root>\n";
  } else {
    xml += `<root>${escapeXml(String(data))}</root>\n`;
  }

  return xml;
}
