/**
 * YAML parse/serialize, backed by the `yaml` library.
 *
 * This replaces a ~470-line hand-rolled indentation parser that only handled
 * "the common 80%" (no anchors, tags, flow sequences, or reliable multiline) and
 * contained buggy dead code. The `yaml` package is a spec-compliant implementation,
 * so the dev-site YAML tools (formatter, JSON↔YAML) now handle real-world YAML.
 *
 * The exported API is unchanged so callers need no edits.
 */
import { parse, stringify } from "yaml";

/** Parse a YAML string into a JavaScript value. */
export function parseYaml(input: string): unknown {
  if (input.trim() === "") return null;
  return parse(input);
}

/** Convert a JavaScript value to a YAML string. */
export function stringifyYaml(obj: unknown, indent: number = 2): string {
  return stringify(obj, { indent });
}

/** Parse YAML input and re-serialize with consistent formatting. */
export function formatYaml(input: string): string {
  return stringifyYaml(parseYaml(input));
}

/** Parse YAML string and return pretty-printed JSON. */
export function yamlToJson(input: string): string {
  return JSON.stringify(parseYaml(input), null, 2);
}

/** Parse JSON string and return YAML. */
export function jsonToYaml(input: string): string {
  return stringifyYaml(JSON.parse(input));
}
