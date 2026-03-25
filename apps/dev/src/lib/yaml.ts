/**
 * Simple YAML parser and serializer.
 * Handles the common 80% of YAML: key-value pairs, nested objects (indentation-based),
 * arrays (- item), strings (quoted and unquoted), numbers, booleans, null, and multiline strings.
 * Does not support anchors, tags, or flow sequences.
 */

function isNumber(value: string): boolean {
  if (value === "") return false;
  const n = Number(value);
  return !isNaN(n) && isFinite(n);
}

function parseScalar(value: string): unknown {
  const trimmed = value.trim();

  if (trimmed === "" || trimmed === "null" || trimmed === "~") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  // Quoted strings
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    const inner = trimmed.slice(1, -1);
    if (trimmed.startsWith('"')) {
      return inner
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "\t")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\");
    }
    return inner;
  }

  if (isNumber(trimmed)) return Number(trimmed);

  return trimmed;
}

interface Line {
  indent: number;
  raw: string;
  content: string;
}

function tokenize(input: string): Line[] {
  const lines = input.split("\n");
  const result: Line[] = [];

  for (const raw of lines) {
    // Skip empty lines and full-line comments
    if (raw.trim() === "" || raw.trim().startsWith("#")) continue;

    const match = raw.match(/^(\s*)/);
    const indent = match ? match[1].replace(/\t/g, "  ").length : 0;
    result.push({ indent, raw, content: raw.trim() });
  }

  return result;
}

function stripInlineComment(value: string): string {
  // Don't strip # inside quoted strings
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    if (ch === '"' && !inSingle) inDouble = !inDouble;
    if (ch === "#" && !inSingle && !inDouble && i > 0 && value[i - 1] === " ") {
      return value.slice(0, i).trimEnd();
    }
  }
  return value;
}

function parseBlock(lines: Line[], start: number, baseIndent: number): { value: unknown; nextIndex: number } {
  if (start >= lines.length) return { value: null, nextIndex: start };

  const line = lines[start];

  // Array item at current indent level
  if (line.content.startsWith("- ") || line.content === "-") {
    return parseArray(lines, start, line.indent);
  }

  // Object (key: value)
  if (line.content.includes(":")) {
    return parseObject(lines, start, line.indent);
  }

  // Scalar
  return { value: parseScalar(line.content), nextIndex: start + 1 };
}

function parseArray(lines: Line[], start: number, baseIndent: number): { value: unknown[]; nextIndex: number } {
  const result: unknown[] = [];
  let i = start;

  while (i < lines.length) {
    const line = lines[i];

    // Stop if indentation drops below base level
    if (line.indent < baseIndent) break;
    // Stop if indentation is at base but not an array item
    if (line.indent === baseIndent && !line.content.startsWith("- ") && line.content !== "-") break;

    if (line.indent === baseIndent && (line.content.startsWith("- ") || line.content === "-")) {
      const afterDash = line.content === "-" ? "" : line.content.slice(2).trim();

      if (afterDash === "" || afterDash === "|" || afterDash === ">") {
        // Check for nested block under array item
        if (i + 1 < lines.length && lines[i + 1].indent > baseIndent) {
          if (afterDash === "|" || afterDash === ">") {
            const { value, nextIndex } = parseMultilineString(lines, i + 1, lines[i + 1].indent, afterDash);
            result.push(value);
            i = nextIndex;
          } else {
            const { value, nextIndex } = parseBlock(lines, i + 1, lines[i + 1].indent);
            result.push(value);
            i = nextIndex;
          }
        } else {
          result.push(afterDash === "" ? null : afterDash);
          i++;
        }
      } else if (afterDash.includes(": ") || afterDash.endsWith(":")) {
        // Inline object start in array item: - key: value
        // Re-parse from next line with the inline key-value
        const colonIdx = afterDash.indexOf(":");
        const key = afterDash.slice(0, colonIdx).trim();
        const val = afterDash.slice(colonIdx + 1).trim();

        const obj: Record<string, unknown> = {};
        if (val === "" || val === "|" || val === ">") {
          if (i + 1 < lines.length && lines[i + 1].indent > baseIndent) {
            if (val === "|" || val === ">") {
              const { value, nextIndex } = parseMultilineString(lines, i + 1, lines[i + 1].indent, val);
              obj[key] = value;
              i = nextIndex;
            } else {
              const { value, nextIndex } = parseBlock(lines, i + 1, lines[i + 1].indent);
              obj[key] = value;
              i = nextIndex;
            }
          } else {
            obj[key] = null;
            i++;
          }
        } else {
          obj[key] = parseScalar(stripInlineComment(val));
          i++;
        }

        // Continue reading keys at nested indent
        while (i < lines.length && lines[i].indent > baseIndent) {
          if (lines[i].content.includes(":")) {
            const { value: nestedObj, nextIndex } = parseObject(lines, i, lines[i].indent);
            Object.assign(obj, nestedObj as Record<string, unknown>);
            i = nextIndex;
          } else {
            i++;
          }
        }

        result.push(obj);
      } else {
        result.push(parseScalar(stripInlineComment(afterDash)));
        i++;
      }
    } else {
      // Indented content that belongs to parent — stop
      break;
    }
  }

  return { value: result, nextIndex: i };
}

function parseMultilineString(
  lines: Line[],
  start: number,
  baseIndent: number,
  style: string
): { value: string; nextIndex: number } {
  const parts: string[] = [];
  let i = start;

  while (i < lines.length && (lines[i].indent >= baseIndent || lines[i].content === "")) {
    if (lines[i].content === "") {
      parts.push("");
      i++;
      continue;
    }
    if (lines[i].indent < baseIndent) break;
    parts.push(lines[i].raw.slice(baseIndent));
    i++;
  }

  if (style === "|") {
    return { value: parts.join("\n") + "\n", nextIndex: i };
  }
  // Folded style (>)
  return { value: parts.join(" ").replace(/ {2,}/g, " ").trim() + "\n", nextIndex: i };
}

function parseObject(
  lines: Line[],
  start: number,
  baseIndent: number
): { value: Record<string, unknown>; nextIndex: number } {
  const result: Record<string, unknown> = {};
  let i = start;

  while (i < lines.length) {
    const line = lines[i];

    if (line.indent < baseIndent) break;
    if (line.indent > baseIndent) break;

    // Must be a key-value line
    const colonIdx = line.content.indexOf(":");
    if (colonIdx === -1) break;

    const key = line.content.slice(0, colonIdx).trim();
    const rawValue = line.content.slice(colonIdx + 1).trim();
    const value = stripInlineComment(rawValue);

    if (value === "|" || value === ">") {
      // Multiline string
      if (i + 1 < lines.length && lines[i + 1].indent > baseIndent) {
        const { value: str, nextIndex } = parseMultilineString(lines, i + 1, lines[i + 1].indent, value);
        result[key] = str;
        i = nextIndex;
      } else {
        result[key] = "";
        i++;
      }
    } else if (value === "") {
      // Check for nested block
      if (i + 1 < lines.length && lines[i + 1].indent > baseIndent) {
        const { value: nested, nextIndex } = parseBlock(lines, i + 1, lines[i + 1].indent);
        result[key] = nested;
        i = nextIndex;
      } else {
        result[key] = null;
        i++;
      }
    } else {
      result[key] = parseScalar(value);
      i++;
    }
  }

  return { value: result, nextIndex: i };
}

/**
 * Parse a YAML string into a JavaScript value.
 */
export function parseYaml(input: string): unknown {
  const trimmed = input.trim();
  if (trimmed === "") return null;

  const lines = tokenize(trimmed);
  if (lines.length === 0) return null;

  const { value } = parseBlock(lines, 0, lines[0].indent);
  return value;
}

/**
 * Convert a JavaScript value to a YAML string.
 */
export function stringifyYaml(obj: unknown, indent: number = 2): string {
  return serializeValue(obj, 0, indent, false).trimEnd() + "\n";
}

function serializeValue(value: unknown, depth: number, indent: number, inArray: boolean): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);

  if (typeof value === "string") {
    return serializeString(value);
  }

  if (Array.isArray(value)) {
    return serializeArray(value, depth, indent, inArray);
  }

  if (typeof value === "object") {
    return serializeObject(value as Record<string, unknown>, depth, indent, inArray);
  }

  return String(value);
}

function serializeString(value: string): string {
  // Check if the string needs quoting
  if (value === "") return '""';

  const needsQuoting =
    value === "true" ||
    value === "false" ||
    value === "null" ||
    value === "~" ||
    isNumber(value) ||
    value.includes(": ") ||
    value.includes("#") ||
    value.startsWith("- ") ||
    value.startsWith("*") ||
    value.startsWith("&") ||
    value.startsWith("!") ||
    value.startsWith("{") ||
    value.startsWith("[") ||
    value.startsWith(",") ||
    value.startsWith('"') ||
    value.startsWith("'") ||
    value.endsWith(":") ||
    value.endsWith(" ") ||
    value.startsWith(" ") ||
    value.includes("\n");

  if (value.includes("\n")) {
    // Use literal block style for multiline strings
    // This will be handled by the caller with proper indentation
    return value.endsWith("\n")
      ? `|\n${value
          .split("\n")
          .slice(0, -1)
          .map((l) => `  ${l}`)
          .join("\n")}`
      : `|-\n${value
          .split("\n")
          .map((l) => `  ${l}`)
          .join("\n")}`;
  }

  if (needsQuoting) {
    const escaped = value
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"');
    return `"${escaped}"`;
  }

  return value;
}

function serializeArray(arr: unknown[], depth: number, indent: number, inArray: boolean): string {
  if (arr.length === 0) return "[]";

  const prefix = " ".repeat(depth * indent);
  const lines: string[] = [];

  for (const item of arr) {
    if (item !== null && typeof item === "object" && !Array.isArray(item)) {
      const entries = Object.entries(item as Record<string, unknown>);
      if (entries.length > 0) {
        const [firstKey, firstVal] = entries[0];
        const firstValStr = serializeValue(firstVal, depth + 1, indent, false);
        const isSimpleFirstVal =
          firstVal === null ||
          typeof firstVal === "boolean" ||
          typeof firstVal === "number" ||
          typeof firstVal === "string";

        if (isSimpleFirstVal) {
          lines.push(`${prefix}- ${firstKey}: ${firstValStr}`);
        } else {
          lines.push(`${prefix}- ${firstKey}:`);
          const nested = firstValStr
            .split("\n")
            .map((l) => `${" ".repeat((depth + 1) * indent)}${l}`)
            .join("\n");
          lines.push(nested);
        }

        for (let j = 1; j < entries.length; j++) {
          const [k, v] = entries[j];
          const valStr = serializeValue(v, depth + 1, indent, false);
          const isSimple =
            v === null || typeof v === "boolean" || typeof v === "number" || typeof v === "string";

          if (isSimple) {
            lines.push(`${prefix}${" ".repeat(indent)}${k}: ${valStr}`);
          } else {
            lines.push(`${prefix}${" ".repeat(indent)}${k}:`);
            const nested = valStr
              .split("\n")
              .map((l) => `${" ".repeat((depth + 2) * indent)}${l}`)
              .join("\n");
            lines.push(nested);
          }
        }
      } else {
        lines.push(`${prefix}- {}`);
      }
    } else if (Array.isArray(item)) {
      lines.push(`${prefix}-`);
      const nested = serializeArray(item, depth + 1, indent, true);
      lines.push(nested);
    } else {
      lines.push(`${prefix}- ${serializeValue(item, depth + 1, indent, true)}`);
    }
  }

  const result = lines.join("\n");
  return inArray ? result : result;
}

function serializeObject(obj: Record<string, unknown>, depth: number, indent: number, _inArray: boolean): string {
  const entries = Object.entries(obj);
  if (entries.length === 0) return "{}";

  const prefix = " ".repeat(depth * indent);
  const lines: string[] = [];

  for (const [key, value] of entries) {
    const isSimple =
      value === null ||
      typeof value === "boolean" ||
      typeof value === "number" ||
      typeof value === "string";

    if (isSimple) {
      lines.push(`${prefix}${key}: ${serializeValue(value, depth + 1, indent, false)}`);
    } else {
      lines.push(`${prefix}${key}:`);
      const nested = serializeValue(value, depth + 1, indent, false);
      const indented = nested
        .split("\n")
        .map((l) => {
          // Don't double-indent if the line is already indented enough
          if (l.startsWith(" ".repeat((depth + 1) * indent))) return l;
          return `${" ".repeat((depth + 1) * indent)}${l}`;
        })
        .join("\n");
      lines.push(indented);
    }
  }

  return lines.join("\n");
}

/**
 * Parse YAML input and re-serialize with consistent formatting.
 */
export function formatYaml(input: string): string {
  const parsed = parseYaml(input);
  return stringifyYaml(parsed);
}

/**
 * Parse YAML string and return pretty-printed JSON.
 */
export function yamlToJson(input: string): string {
  const parsed = parseYaml(input);
  return JSON.stringify(parsed, null, 2);
}

/**
 * Parse JSON string and return YAML.
 */
export function jsonToYaml(input: string): string {
  const parsed = JSON.parse(input);
  return stringifyYaml(parsed);
}
