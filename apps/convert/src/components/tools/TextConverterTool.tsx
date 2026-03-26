"use client";

import { useState, useCallback } from "react";
import { jsonToCsv, csvToJson, parseMarkdown, htmlToMarkdown, yamlToJson, jsonToXml, type Delimiter } from "@peregrine/converters";

interface TextConverterToolProps {
  convertFn: "jsonToCsv" | "csvToJson" | "parseMarkdown" | "htmlToMarkdown" | "yamlToJson" | "jsonToXml";
  inputLabel: string;
  outputLabel: string;
  placeholder: string;
  downloadExtension: string;
  downloadMimeType: string;
}

const converters = {
  jsonToCsv: (input: string) => jsonToCsv(input),
  csvToJson: (input: string, hasHeaders: boolean, delimiter: Delimiter) =>
    csvToJson(input, hasHeaders, delimiter),
  parseMarkdown: (input: string) => parseMarkdown(input),
  htmlToMarkdown: (input: string) => htmlToMarkdown(input),
  yamlToJson: (input: string) => yamlToJson(input),
  jsonToXml: (input: string) => jsonToXml(input),
};

const delimiterOptions: { value: Delimiter; label: string }[] = [
  { value: ",", label: "Comma (,)" },
  { value: "\t", label: "Tab" },
  { value: ";", label: "Semicolon (;)" },
  { value: "|", label: "Pipe (|)" },
];

export function TextConverterTool({
  convertFn,
  inputLabel,
  outputLabel,
  placeholder,
  downloadExtension,
  downloadMimeType,
}: TextConverterToolProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // CSV-specific options
  const [hasHeaders, setHasHeaders] = useState(true);
  const [delimiter, setDelimiter] = useState<Delimiter>(",");

  const isCsvToJson = convertFn === "csvToJson";
  const isLiveConvert = convertFn === "parseMarkdown" || convertFn === "htmlToMarkdown";

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError("");
      setOutput("");
      return;
    }
    try {
      let result: string;
      if (isCsvToJson) {
        result = converters.csvToJson(input, hasHeaders, delimiter);
      } else if (convertFn === "jsonToCsv") {
        result = converters.jsonToCsv(input);
      } else if (convertFn === "parseMarkdown") {
        result = converters.parseMarkdown(input);
      } else if (convertFn === "yamlToJson") {
        result = converters.yamlToJson(input);
      } else if (convertFn === "jsonToXml") {
        result = converters.jsonToXml(input);
      } else {
        result = converters.htmlToMarkdown(input);
      }
      setOutput(result);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid input");
      setOutput("");
    }
  }, [input, convertFn, isCsvToJson, hasHeaders, delimiter]);

  // Live conversion for markdown/html
  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      if (isLiveConvert && value.trim()) {
        try {
          const fn = convertFn === "parseMarkdown" ? converters.parseMarkdown : converters.htmlToMarkdown;
          const result = fn(value);
          setOutput(result);
          setError("");
        } catch (e) {
          setError(e instanceof Error ? e.message : "Invalid input");
          setOutput("");
        }
      } else if (isLiveConvert) {
        setOutput("");
        setError("");
      }
    },
    [convertFn, isLiveConvert]
  );

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

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: downloadMimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${downloadExtension}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [output, downloadExtension, downloadMimeType]);

  return (
    <div className="space-y-6">
      {isLiveConvert ? (
        // Side-by-side layout for live converters
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
              {inputLabel}
            </label>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeholder}
              rows={16}
              spellCheck={false}
              className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-[color:var(--color-text-secondary)]">
                {outputLabel}
              </label>
              {output && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="rounded-md px-2.5 py-1 text-xs font-medium text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent-light)]"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="rounded-md px-2.5 py-1 text-xs font-medium text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent-light)]"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              rows={16}
              placeholder={`${outputLabel} will appear here...`}
              className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
            />
          </div>
        </div>
      ) : (
        // Stacked layout with convert button
        <>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
              {inputLabel}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              rows={10}
              spellCheck={false}
              className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
            />
          </div>

          {isCsvToJson && (
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
                <input
                  type="checkbox"
                  checked={hasHeaders}
                  onChange={(e) => setHasHeaders(e.target.checked)}
                  className="h-4 w-4 rounded border-[color:var(--color-border)] text-[color:var(--color-accent)] focus:ring-[color:var(--color-accent)]"
                />
                Has header row
              </label>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-[color:var(--color-text-secondary)]">
                  Delimiter:
                </label>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value as Delimiter)}
                  className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
                >
                  {delimiterOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            onClick={handleConvert}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[color:var(--color-accent)] bg-transparent px-6 py-3 text-sm font-semibold text-[color:var(--color-accent)] transition-all duration-200 hover:bg-[color:var(--color-accent)] hover:text-white hover:-translate-y-px hover:shadow-[var(--shadow-warm-accent)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
          >
            Convert
          </button>

          {output && (
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-[color:var(--color-text-secondary)]">
                  {outputLabel}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="rounded-md px-2.5 py-1 text-xs font-medium text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent-light)]"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="rounded-md px-2.5 py-1 text-xs font-medium text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent-light)]"
                  >
                    Download .{downloadExtension}
                  </button>
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                rows={12}
                className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-accent)]"
              />
            </div>
          )}
        </>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]">
          <span className="mr-2 font-semibold">Error:</span>
          {error}
        </div>
      )}
    </div>
  );
}
