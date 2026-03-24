"use client";

import { useState, useCallback } from "react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
  "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
  "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores",
  "quas", "molestias", "excepturi", "obcaecati", "cupiditate", "provident",
  "similique", "mollitia", "animi", "perspiciatis", "unde", "omnis", "iste",
  "natus", "error", "voluptatem", "accusantium", "doloremque", "laudantium",
  "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore",
  "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta", "explicabo",
  "nemo", "ipsam", "voluptas", "aspernatur", "aut", "odit", "fugit",
  "consequuntur", "magni", "ratione", "sequi", "nesciunt", "neque", "porro",
  "quisquam", "dolorem", "adipisci", "numquam", "eius", "modi", "tempora",
  "magnam", "quaerat",
];

const FIRST_SENTENCE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWord(): string {
  return LOREM_WORDS[randomInt(0, LOREM_WORDS.length - 1)];
}

function generateSentence(): string {
  const length = randomInt(6, 15);
  const words: string[] = [];
  for (let i = 0; i < length; i++) {
    words.push(randomWord());
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(): string {
  const sentenceCount = randomInt(4, 8);
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
}

function generate(
  count: number,
  type: "paragraphs" | "sentences" | "words",
  startWithLorem: boolean
): string {
  if (type === "words") {
    const words: string[] = [];
    if (startWithLorem) {
      const firstWords = FIRST_SENTENCE.replace(".", "").split(" ");
      for (let i = 0; i < Math.min(count, firstWords.length); i++) {
        words.push(firstWords[i]);
      }
    }
    while (words.length < count) {
      words.push(randomWord());
    }
    return words.slice(0, count).join(" ") + ".";
  }

  if (type === "sentences") {
    const sentences: string[] = [];
    if (startWithLorem) {
      sentences.push(FIRST_SENTENCE);
    }
    while (sentences.length < count) {
      sentences.push(generateSentence());
    }
    return sentences.slice(0, count).join(" ");
  }

  // paragraphs
  const paragraphs: string[] = [];
  if (startWithLorem) {
    const firstParagraph = FIRST_SENTENCE + " " + generateParagraph();
    paragraphs.push(firstParagraph);
  }
  while (paragraphs.length < count) {
    paragraphs.push(generateParagraph());
  }
  return paragraphs.slice(0, count).join("\n\n");
}

export function LoremIpsumGeneratorTool() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    setOutput(generate(count, type, startWithLorem));
  }, [count, type, startWithLorem]);

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
      <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label htmlFor="lorem-count" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
              Number
            </label>
            <input
              id="lorem-count"
              type="number"
              min={1}
              max={type === "words" ? 500 : 20}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(type === "words" ? 500 : 20, parseInt(e.target.value, 10) || 1)))}
              className="w-24 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="lorem-type" className="mb-1.5 block text-sm font-medium text-[color:var(--color-text-secondary)]">
              Type
            </label>
            <select
              id="lorem-type"
              value={type}
              onChange={(e) => setType(e.target.value as "paragraphs" | "sentences" | "words")}
              className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>

          <label className="flex items-center gap-2 pb-0.5">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="h-4 w-4 rounded border-[color:var(--color-border-hover)] text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-sm text-[color:var(--color-text-secondary)]">Start with &quot;Lorem ipsum...&quot;</span>
          </label>
        </div>

        <button
          onClick={handleGenerate}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          Generate Lorem Ipsum
        </button>
      </div>

      {output && (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="lorem-output" className="text-sm font-medium text-[color:var(--color-text-secondary)]">
              Generated text
            </label>
            <button
              onClick={handleCopy}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
          <textarea
            id="lorem-output"
            value={output}
            readOnly
            rows={12}
            className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      )}
    </div>
  );
}
