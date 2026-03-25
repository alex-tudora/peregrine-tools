"use client";

import { useState, useCallback } from "react";
import { logActivity } from "@peregrine/ui";

type OutputMode = "interface" | "type";

interface ConvertOptions {
  rootName: string;
  mode: OutputMode;
  optionalProps: boolean;
  readonlyProps: boolean;
}

function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^[a-z]/, (c) => c.toUpperCase());
}

function inferType(
  value: unknown,
  key: string,
  collected: Map<string, Record<string, string>>,
  options: ConvertOptions
): string {
  if (value === null) return "null";
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";

  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";

    const elementTypes: string[] = [];
    let mergedObjectShape: Record<string, string> | null = null;

    for (const item of value) {
      if (item !== null && typeof item === "object" && !Array.isArray(item)) {
        const itemShape: Record<string, string> = {};
        for (const [k, v] of Object.entries(item as Record<string, unknown>)) {
          itemShape[k] = inferType(v, k, collected, options);
        }
        if (mergedObjectShape === null) {
          mergedObjectShape = { ...itemShape };
        } else {
          for (const [k, v] of Object.entries(itemShape)) {
            if (k in mergedObjectShape) {
              if (mergedObjectShape[k] !== v) {
                mergedObjectShape[k] = mergedObjectShape[k] + " | " + v;
              }
            } else {
              mergedObjectShape[k] = v;
            }
          }
        }
      } else {
        const t = inferType(item, key, collected, options);
        if (!elementTypes.includes(t)) {
          elementTypes.push(t);
        }
      }
    }

    if (mergedObjectShape !== null) {
      const typeName = toPascalCase(key) + "Item";
      collected.set(typeName, mergedObjectShape);
      if (elementTypes.length === 0) return `${typeName}[]`;
      elementTypes.push(typeName);
    }

    if (elementTypes.length === 1) return `${elementTypes[0]}[]`;
    return `(${elementTypes.join(" | ")})[]`;
  }

  if (typeof value === "object") {
    const typeName = toPascalCase(key);
    const shape: Record<string, string> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      shape[k] = inferType(v, k, collected, options);
    }
    collected.set(typeName, shape);
    return typeName;
  }

  return "unknown";
}

function generateOutput(
  shape: Record<string, string>,
  name: string,
  options: ConvertOptions,
  collected: Map<string, Record<string, string>>
): string {
  const blocks: string[] = [];

  // Nested types first (in insertion order)
  for (const [typeName, typeShape] of collected) {
    blocks.push(formatBlock(typeName, typeShape, options));
  }

  // Root type last
  blocks.push(formatBlock(name, shape, options));

  return blocks.join("\n\n");
}

function formatBlock(
  name: string,
  shape: Record<string, string>,
  options: ConvertOptions
): string {
  const { mode, optionalProps, readonlyProps } = options;
  const lines: string[] = [];
  const opt = optionalProps ? "?" : "";
  const ro = readonlyProps ? "readonly " : "";

  if (mode === "interface") {
    lines.push(`interface ${name} {`);
    for (const [key, type] of Object.entries(shape)) {
      lines.push(`  ${ro}${key}${opt}: ${type};`);
    }
    lines.push("}");
  } else {
    lines.push(`type ${name} = {`);
    for (const [key, type] of Object.entries(shape)) {
      lines.push(`  ${ro}${key}${opt}: ${type};`);
    }
    lines.push("};");
  }

  return lines.join("\n");
}

function convertJsonToTs(json: string, options: ConvertOptions): string {
  const parsed = JSON.parse(json);
  const collected = new Map<string, Record<string, string>>();

  if (typeof parsed !== "object" || parsed === null) {
    // Primitive at top level
    const t = inferType(parsed, options.rootName, collected, options);
    if (options.mode === "interface") {
      return `// Top-level value is a primitive: ${t}`;
    }
    return `type ${options.rootName} = ${t};`;
  }

  if (Array.isArray(parsed)) {
    const t = inferType(parsed, options.rootName, collected, options);
    if (options.mode === "type") {
      const blocks: string[] = [];
      for (const [typeName, typeShape] of collected) {
        blocks.push(formatBlock(typeName, typeShape, options));
      }
      blocks.push(`type ${options.rootName} = ${t};`);
      return blocks.join("\n\n");
    }
    const blocks: string[] = [];
    for (const [typeName, typeShape] of collected) {
      blocks.push(formatBlock(typeName, typeShape, options));
    }
    blocks.push(`// Root is an array: ${t}`);
    return blocks.join("\n\n");
  }

  const rootShape: Record<string, string> = {};
  for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
    rootShape[k] = inferType(v, k, collected, options);
  }

  return generateOutput(rootShape, options.rootName, options, collected);
}

export function JsonToTypescriptTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [rootName, setRootName] = useState("Root");
  const [mode, setMode] = useState<OutputMode>("interface");
  const [optionalProps, setOptionalProps] = useState(false);
  const [readonlyProps, setReadonlyProps] = useState(false);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError("");
      setOutput("");
      return;
    }
    try {
      const result = convertJsonToTs(input, {
        rootName: rootName.trim() || "Root",
        mode,
        optionalProps,
        readonlyProps,
      });
      setOutput(result);
      setError("");
      logActivity({
        tool: "JSON to TypeScript",
        toolHref: "/json-to-typescript",
        description: "Converted JSON to TypeScript types",
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
    }
  }, [input, rootName, mode, optionalProps, readonlyProps]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may not be available */
    }
  }, [output]);

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="json-input"
          className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]"
        >
          Input JSON
        </label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "John", "age": 30, "address": {"street": "123 Main", "city": "NYC"}}'
          rows={10}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label
            htmlFor="root-name"
            className="text-sm font-medium text-[color:var(--color-text-secondary)]"
          >
            Root type name:
          </label>
          <input
            id="root-name"
            type="text"
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            className="w-32 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="mode-select"
            className="text-sm font-medium text-[color:var(--color-text-secondary)]"
          >
            Output:
          </label>
          <select
            id="mode-select"
            value={mode}
            onChange={(e) => setMode(e.target.value as OutputMode)}
            className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="interface">interface</option>
            <option value="type">type</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
          <input
            type="checkbox"
            checked={optionalProps}
            onChange={(e) => setOptionalProps(e.target.checked)}
            className="h-4 w-4 rounded border-[color:var(--color-border-hover)] text-emerald-500 focus:ring-emerald-500"
          />
          Optional properties
        </label>

        <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
          <input
            type="checkbox"
            checked={readonlyProps}
            onChange={(e) => setReadonlyProps(e.target.checked)}
            className="h-4 w-4 rounded border-[color:var(--color-border-hover)] text-emerald-500 focus:ring-emerald-500"
          />
          Readonly properties
        </label>
      </div>

      <div>
        <button
          onClick={handleConvert}
          className="btn-action inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          Convert
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]">
          <span className="mr-2 font-semibold">Error:</span>
          {error}
        </div>
      )}

      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-[color:var(--color-text-secondary)]">
              TypeScript Output
            </label>
            <button
              onClick={handleCopy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={14}
            spellCheck={false}
            className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      )}
    </div>
  );
}
