"use client";

import { useState, useCallback, useMemo } from "react";

const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "JOIN", "ON", "GROUP BY", "ORDER BY", "HAVING",
  "INSERT", "UPDATE", "DELETE", "CREATE", "ALTER", "DROP", "AND", "OR", "IN",
  "NOT", "NULL", "AS", "INNER", "LEFT", "RIGHT", "OUTER", "FULL", "CROSS",
  "UNION", "SET", "VALUES", "INTO", "LIMIT", "OFFSET", "DISTINCT", "BETWEEN",
  "LIKE", "EXISTS", "CASE", "WHEN", "THEN", "ELSE", "END", "ASC", "DESC",
  "IS", "ALL", "ANY", "TABLE", "INDEX", "VIEW", "TRIGGER", "PRIMARY", "KEY",
  "FOREIGN", "REFERENCES", "DEFAULT", "CHECK", "CONSTRAINT", "ADD", "COLUMN",
  "COUNT", "SUM", "AVG", "MIN", "MAX", "COALESCE", "CAST", "CONVERT",
  "IF", "IFNULL", "NULLIF", "WITH", "RECURSIVE", "RETURNING", "EXCEPT",
  "INTERSECT", "FETCH", "NEXT", "ROWS", "ONLY", "OVER", "PARTITION", "BY",
  "ROW_NUMBER", "RANK", "DENSE_RANK", "LAG", "LEAD",
];

const MAJOR_CLAUSES = [
  "SELECT", "FROM", "WHERE", "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN",
  "OUTER JOIN", "FULL JOIN", "CROSS JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN",
  "FULL OUTER JOIN", "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET",
  "UNION", "UNION ALL", "INSERT INTO", "UPDATE", "SET", "DELETE FROM",
  "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "VALUES", "RETURNING",
  "WITH", "EXCEPT", "INTERSECT", "FETCH",
];

function formatSql(sql: string): string {
  let formatted = sql.trim();

  // Normalize whitespace
  formatted = formatted.replace(/\s+/g, " ");

  // Uppercase keywords (word boundary matching)
  const keywordPattern = SQL_KEYWORDS
    .sort((a, b) => b.length - a.length)
    .map((kw) => kw.replace(/\s+/g, "\\s+"))
    .join("|");
  const keywordRegex = new RegExp(`\\b(${keywordPattern})\\b`, "gi");
  formatted = formatted.replace(keywordRegex, (match) => match.toUpperCase());

  // Add newlines before major clauses
  const clausePattern = MAJOR_CLAUSES
    .sort((a, b) => b.length - a.length)
    .map((c) => c.replace(/\s+/g, "\\s+"))
    .join("|");
  const clauseRegex = new RegExp(`\\s+(${clausePattern})\\b`, "gi");
  formatted = formatted.replace(clauseRegex, (match, clause) => `\n${clause.toUpperCase()}`);

  // Add newline after AND/OR within WHERE/HAVING
  formatted = formatted.replace(/\s+(AND|OR)\s+/gi, (match, kw) => `\n  ${kw.toUpperCase()} `);

  // Indent continuation lines (lines that don't start with a major clause)
  const lines = formatted.split("\n");
  const result: string[] = [];
  let indentLevel = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Check for closing paren reducing indent
    const openParens = (trimmedLine.match(/\(/g) || []).length;
    const closeParens = (trimmedLine.match(/\)/g) || []).length;

    if (closeParens > openParens && indentLevel > 0) {
      indentLevel = Math.max(0, indentLevel - (closeParens - openParens));
    }

    const isMajorClause = MAJOR_CLAUSES.some((c) =>
      trimmedLine.toUpperCase().startsWith(c)
    );

    const indent = isMajorClause ? "  ".repeat(indentLevel) : "  ".repeat(indentLevel + 1);
    result.push(indentLevel === 0 && isMajorClause ? trimmedLine : `${indent}${trimmedLine}`);

    if (openParens > closeParens) {
      indentLevel += openParens - closeParens;
    }
  }

  return result.join("\n");
}

function highlightSql(sql: string): string {
  // Escape HTML
  let html = sql
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Highlight strings (single-quoted)
  html = html.replace(/'([^']*)'/g, '<span style="color:#16a34a">\'$1\'</span>');

  // Highlight numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#ea580c">$1</span>');

  // Highlight keywords
  const keywordPattern = SQL_KEYWORDS
    .sort((a, b) => b.length - a.length)
    .map((kw) => kw.replace(/\s+/g, "\\s+"))
    .join("|");
  const keywordRegex = new RegExp(`\\b(${keywordPattern})\\b`, "g");
  html = html.replace(keywordRegex, '<span style="color:#2563eb;font-weight:600">$1</span>');

  return html;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-amber-400 hover:text-amber-600"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function SqlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleFormat = useCallback(() => {
    setOutput(formatSql(input));
  }, [input]);

  const highlighted = useMemo(() => {
    if (!output) return "";
    return highlightSql(output);
  }, [output]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Input SQL</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT u.id, u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id WHERE o.total > 100 ORDER BY o.total DESC"
          rows={8}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono text-slate-700 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleFormat}
          disabled={!input.trim()}
          className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Format
        </button>
        {output && <CopyButton text={output} />}
      </div>

      {output && (
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Formatted SQL</label>
          <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 overflow-x-auto">
            <pre
              className="text-sm font-mono leading-relaxed text-slate-100"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
