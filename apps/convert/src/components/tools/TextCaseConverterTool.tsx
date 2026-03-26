"use client";

import { useState, useMemo, useCallback, useEffect } from "react";

type ConversionType =
  | "uppercase"
  | "lowercase"
  | "titlecase"
  | "camelcase"
  | "snakecase"
  | "kebabcase"
  | "pascalcase"
  | "base64encode"
  | "base64decode"
  | "urlencode"
  | "urldecode"
  | "htmlencode"
  | "htmldecode"
  | "reverse"
  | "slug";

interface TextCaseConverterToolProps {
  conversionType: ConversionType;
}

const knightMessages = [
  "The knight transformed your text faster than drawing a sword.",
  "Text reformed! The knight approves of your new style.",
  "Another text quest completed. The knight raises his banner.",
  "Characters rearranged at lightning speed. The knight nods.",
  "The knight once tried to write in camelCase. His quill broke.",
  "Encoding complete. Even the knight's cipher master is impressed.",
  "Decoded! The knight always finds the hidden message.",
  "Instant transformation. Faster than a knight's morning armor routine.",
  "The knight tip-toes through your text and rearranges every letter.",
  "Your text has been knighted — er, converted.",
];

function getRandomMessage() {
  return knightMessages[Math.floor(Math.random() * knightMessages.length)];
}

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const HTML_ENTITY_REVERSE: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

function convertText(text: string, type: ConversionType): string {
  if (!text) return "";

  switch (type) {
    case "uppercase":
      return text.toUpperCase();

    case "lowercase":
      return text.toLowerCase();

    case "titlecase":
      return text.replace(
        /\w\S*/g,
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );

    case "camelcase": {
      return text
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^[A-Z]/, (char) => char.toLowerCase());
    }

    case "snakecase":
      return text
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s\-]+/g, "_")
        .replace(/[^a-zA-Z0-9_]/g, "")
        .toLowerCase();

    case "kebabcase":
      return text
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase();

    case "pascalcase":
      return text
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^[a-z]/, (char) => char.toUpperCase());

    case "base64encode":
      try {
        return btoa(unescape(encodeURIComponent(text)));
      } catch {
        return "Error: Could not encode to Base64";
      }

    case "base64decode":
      try {
        return decodeURIComponent(escape(atob(text.trim())));
      } catch {
        return "Error: Invalid Base64 string";
      }

    case "urlencode":
      return encodeURIComponent(text);

    case "urldecode":
      try {
        return decodeURIComponent(text);
      } catch {
        return "Error: Invalid URL-encoded string";
      }

    case "htmlencode":
      return text.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char] ?? char);

    case "htmldecode":
      return text.replace(
        /&(?:amp|lt|gt|quot|#39|#x27|apos|nbsp);/g,
        (entity) => HTML_ENTITY_REVERSE[entity] ?? entity
      );

    case "reverse":
      return [...text].reverse().join("");

    case "slug":
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    default:
      return text;
  }
}

export function TextCaseConverterTool({ conversionType }: TextCaseConverterToolProps) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [knightMsg, setKnightMsg] = useState("");

  useEffect(() => {
    setKnightMsg(getRandomMessage());
  }, []);

  const output = useMemo(() => convertText(input, conversionType), [input, conversionType]);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      if (value.trim()) {
        setKnightMsg(getRandomMessage());
      }
    },
    []
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

  const handleClear = useCallback(() => {
    setInput("");
    setCopied(false);
  }, []);

  const inputClass =
    "w-full resize-y rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 font-mono text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] transition-all hover:border-[color:var(--color-border-hover)] focus:border-[color:var(--color-accent)] focus:ring-4 focus:ring-[color:var(--color-accent-glow)] focus:outline-none";

  return (
    <div className="space-y-6">
      {/* Side-by-side panels */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Input panel */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)]">
              Input
            </label>
            <span className="text-xs text-[color:var(--color-text-muted)]">
              {input.length} character{input.length !== 1 ? "s" : ""}
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Type or paste your text here..."
            rows={12}
            spellCheck={false}
            autoFocus
            className={inputClass}
          />
        </div>

        {/* Output panel */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-accent)]">
              Output
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[color:var(--color-text-muted)]">
                {output.length} character{output.length !== 1 ? "s" : ""}
              </span>
              {output && (
                <button
                  onClick={handleCopy}
                  className="rounded-md px-2.5 py-1 text-xs font-medium text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-accent-light)] cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            rows={12}
            placeholder="Converted text will appear here..."
            className={`${inputClass} bg-[color:var(--color-bg-elevated)] cursor-default`}
          />
        </div>
      </div>

      {/* Actions */}
      {input && (
        <div className="flex justify-center">
          <button
            onClick={handleClear}
            className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-light)] cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}

      {/* Knight personality message */}
      {knightMsg && output && (
        <p className="text-center text-sm text-[color:var(--color-text-muted)] italic">
          {knightMsg}
        </p>
      )}
    </div>
  );
}
