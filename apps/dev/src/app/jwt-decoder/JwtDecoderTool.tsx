"use client";

import { useState, useMemo } from "react";

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad) base64 += "=".repeat(4 - pad);
  try {
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return atob(base64);
  }
}

function decodeJwt(token: string): {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string;
  parts: string[];
  error?: string;
} {
  const trimmed = token.trim();
  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return { header: null, payload: null, signature: "", parts: [], error: "JWT must have three parts separated by dots" };
  }
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return { header, payload, signature: parts[2], parts };
  } catch {
    return { header: null, payload: null, signature: "", parts, error: "Failed to decode JWT. Ensure it is a valid token." };
  }
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
      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-amber-400 hover:text-amber-600"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function JsonBlock({
  label,
  data,
  colorClass,
}: {
  label: string;
  data: Record<string, unknown>;
  colorClass: string;
}) {
  const formatted = JSON.stringify(data, null, 2);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold uppercase tracking-wide ${colorClass}`}>{label}</span>
        <CopyButton text={formatted} />
      </div>
      <pre className={`rounded-xl border p-4 text-sm font-mono overflow-x-auto whitespace-pre-wrap ${colorClass} bg-opacity-5 border-current/10`}>
        {formatted}
      </pre>
    </div>
  );
}

export function JwtDecoderTool() {
  const [token, setToken] = useState("");

  const result = useMemo(() => {
    if (!token.trim()) return null;
    return decodeJwt(token);
  }, [token]);

  const expStatus = useMemo(() => {
    if (!result?.payload?.exp) return null;
    const exp = result.payload.exp as number;
    const now = Math.floor(Date.now() / 1000);
    const isExpired = now > exp;
    const expDate = new Date(exp * 1000);
    return { isExpired, expDate };
  }, [result]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          rows={4}
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono text-slate-700 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {/* Color-coded raw token */}
      {result?.parts && result.parts.length === 3 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 overflow-x-auto">
          <p className="text-xs font-medium text-slate-500 mb-2">Encoded Token</p>
          <p className="font-mono text-sm break-all leading-relaxed">
            <span className="text-red-600">{result.parts[0]}</span>
            <span className="text-slate-400">.</span>
            <span className="text-purple-600">{result.parts[1]}</span>
            <span className="text-slate-400">.</span>
            <span className="text-blue-600">{result.parts[2]}</span>
          </p>
        </div>
      )}

      {result?.error && (
        <p className="text-sm text-red-500">{result.error}</p>
      )}

      {result?.header && (
        <JsonBlock label="Header" data={result.header} colorClass="text-red-600" />
      )}

      {result?.payload && (
        <JsonBlock label="Payload" data={result.payload} colorClass="text-purple-600" />
      )}

      {result?.signature && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">Signature</span>
            <CopyButton text={result.signature} />
          </div>
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <code className="text-sm font-mono text-blue-700 break-all">{result.signature}</code>
          </div>
        </div>
      )}

      {/* Expiration status */}
      {expStatus && (
        <div
          className={`rounded-xl border p-4 ${
            expStatus.isExpired
              ? "border-red-200 bg-red-50"
              : "border-emerald-200 bg-emerald-50"
          }`}
        >
          <p className="text-sm font-medium">
            {expStatus.isExpired ? (
              <span className="text-red-700">Token is expired</span>
            ) : (
              <span className="text-emerald-700">Token is valid (not expired)</span>
            )}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Expires: {expStatus.expDate.toLocaleString()}
          </p>
        </div>
      )}

      {/* Claims table */}
      {result?.payload && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <p className="text-xs font-medium text-slate-500 px-4 pt-3 pb-2">Decoded Claims</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-4 py-2 text-xs font-medium text-slate-500">Claim</th>
                <th className="text-left px-4 py-2 text-xs font-medium text-slate-500">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.payload).map(([key, value]) => (
                <tr key={key} className="border-b border-slate-50 last:border-b-0">
                  <td className="px-4 py-2 font-mono text-slate-700 font-medium">{key}</td>
                  <td className="px-4 py-2 font-mono text-slate-600 break-all">
                    {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    {(key === "exp" || key === "iat" || key === "nbf") && typeof value === "number" && (
                      <span className="ml-2 text-xs text-slate-400">
                        ({new Date(value * 1000).toLocaleString()})
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
