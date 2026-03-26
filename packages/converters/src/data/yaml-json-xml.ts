/**
 * YAML <-> JSON and JSON -> XML converters.
 *
 * These are intentionally simple, dependency-free implementations suitable for
 * common use-cases. They handle the subset of YAML/XML that users typically
 * paste into a web converter.
 */

// ─── YAML to JSON ────────────────────────────────────────────────────────────

function parseYamlValue(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed === "" || trimmed === "null" || trimmed === "~") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
  // Strip surrounding quotes if present
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

interface YamlLine {
  indent: number;
  key: string;
  value: string;
  isListItem: boolean;
  raw: string;
}

function tokenizeYaml(yaml: string): YamlLine[] {
  const lines = yaml.split(/\r?\n/);
  const result: YamlLine[] = [];

  for (const raw of lines) {
    // Skip empty lines and comments
    if (/^\s*(#|$)/.test(raw)) continue;

    const indentMatch = raw.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;
    let content = raw.slice(indent);

    const isListItem = content.startsWith("- ");
    if (isListItem) {
      content = content.slice(2);
    }

    const colonIdx = content.indexOf(": ");
    const endsWithColon = content.endsWith(":") && colonIdx === -1;

    if (colonIdx !== -1) {
      result.push({
        indent,
        key: content.slice(0, colonIdx).trim(),
        value: content.slice(colonIdx + 2).trim(),
        isListItem,
        raw,
      });
    } else if (endsWithColon) {
      result.push({
        indent,
        key: content.slice(0, -1).trim(),
        value: "",
        isListItem,
        raw,
      });
    } else {
      result.push({
        indent,
        key: "",
        value: content.trim(),
        isListItem,
        raw,
      });
    }
  }
  return result;
}

function buildYamlObject(
  tokens: YamlLine[],
  startIdx: number,
  baseIndent: number,
): [unknown, number] {
  // Determine whether this level is an array or object
  // by checking the first token at this indent level
  const firstToken = tokens[startIdx];
  if (!firstToken) return [{}, startIdx];

  if (firstToken.isListItem && firstToken.key === "" && firstToken.value !== "") {
    // Simple list of values
    const arr: unknown[] = [];
    let i = startIdx;
    while (i < tokens.length && tokens[i].indent >= baseIndent) {
      const t = tokens[i];
      if (t.indent === baseIndent && t.isListItem) {
        if (t.key !== "") {
          // List item with key:value — it's a list of objects
          const [obj, nextI] = buildObjectFromIndex(tokens, i, baseIndent);
          arr.push(obj);
          i = nextI;
        } else {
          arr.push(parseYamlValue(t.value));
          i++;
        }
      } else if (t.indent > baseIndent) {
        i++;
      } else {
        break;
      }
    }
    return [arr, i];
  }

  if (firstToken.isListItem && firstToken.key !== "") {
    // Array of objects
    const arr: unknown[] = [];
    let i = startIdx;
    while (i < tokens.length && tokens[i].indent >= baseIndent) {
      const t = tokens[i];
      if (t.indent === baseIndent && t.isListItem) {
        const [obj, nextI] = buildObjectFromIndex(tokens, i, baseIndent);
        arr.push(obj);
        i = nextI;
      } else {
        break;
      }
    }
    return [arr, i];
  }

  // Object
  return buildObjectFromIndex(tokens, startIdx, baseIndent);
}

function buildObjectFromIndex(
  tokens: YamlLine[],
  startIdx: number,
  baseIndent: number,
): [Record<string, unknown>, number] {
  const obj: Record<string, unknown> = {};
  let i = startIdx;

  while (i < tokens.length) {
    const t = tokens[i];
    if (t.indent < baseIndent) break;
    if (t.indent > baseIndent && !t.isListItem) {
      i++;
      continue;
    }

    // For list items at same indent used as object entries
    const effectiveIndent = t.isListItem ? t.indent : t.indent;
    if (effectiveIndent !== baseIndent && !t.isListItem) {
      break;
    }

    if (t.key) {
      if (t.value) {
        obj[t.key] = parseYamlValue(t.value);
        i++;
      } else {
        // Nested value — look ahead
        i++;
        if (i < tokens.length && tokens[i].indent > baseIndent) {
          const childIndent = tokens[i].indent;
          const [child, nextI] = buildYamlObject(tokens, i, childIndent);
          obj[t.key] = child;
          i = nextI;
        } else {
          obj[t.key] = null;
        }
      }
    } else {
      i++;
    }
  }

  return [obj, i];
}

export function yamlToJson(yaml: string): string {
  const trimmed = yaml.trim();
  if (!trimmed) throw new Error("Input is empty");

  const tokens = tokenizeYaml(trimmed);
  if (tokens.length === 0) throw new Error("No valid YAML content found");

  const baseIndent = tokens[0].indent;
  const [result] = buildYamlObject(tokens, 0, baseIndent);
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
