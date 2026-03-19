export function flattenObject(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, fullKey));
    } else if (Array.isArray(value)) {
      result[fullKey] = JSON.stringify(value);
    } else {
      result[fullKey] = value === null || value === undefined ? "" : String(value);
    }
  }
  return result;
}

export function escapeCsvField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export function jsonToCsv(jsonString: string): string {
  const data = JSON.parse(jsonString);
  if (!Array.isArray(data)) {
    throw new Error("Input must be a JSON array of objects");
  }
  if (data.length === 0) {
    throw new Error("Array is empty");
  }

  const flatRows = data.map((item) => {
    if (typeof item !== "object" || item === null) {
      throw new Error("Each item in the array must be an object");
    }
    return flattenObject(item as Record<string, unknown>);
  });

  const headerSet = new Set<string>();
  for (const row of flatRows) {
    for (const key of Object.keys(row)) {
      headerSet.add(key);
    }
  }
  const headers = Array.from(headerSet);

  const lines = [headers.map(escapeCsvField).join(",")];
  for (const row of flatRows) {
    const values = headers.map((h) => escapeCsvField(row[h] ?? ""));
    lines.push(values.join(","));
  }

  return lines.join("\n");
}

export type Delimiter = "," | "\t" | ";" | "|";

function parseCsvLine(line: string, delimiter: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === delimiter) {
        fields.push(current);
        current = "";
      } else {
        current += char;
      }
    }
  }
  fields.push(current);
  return fields;
}

export function csvToJson(csv: string, hasHeaders: boolean, delimiter: Delimiter): string {
  const lines = csv.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length === 0) throw new Error("No data found");

  const rows = lines.map((line) => parseCsvLine(line, delimiter));

  if (hasHeaders) {
    const headers = rows[0];
    const data = rows.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header.trim()] = (row[i] ?? "").trim();
      });
      return obj;
    });
    return JSON.stringify(data, null, 2);
  }

  return JSON.stringify(rows, null, 2);
}
