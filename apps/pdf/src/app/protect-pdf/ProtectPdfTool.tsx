"use client";

import { useState, useCallback, useMemo } from "react";
import { Dropzone } from "@peregrine/ui";
import { formatFileSize, readFileAsArrayBuffer } from "@/lib/download";

interface PdfFile {
  buffer: ArrayBuffer;
  name: string;
  size: number;
}

type PasswordStrength = "weak" | "medium" | "strong";

function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password) return "weak";

  let score = 0;

  // Length checks
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Character variety checks
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
}

const STRENGTH_CONFIG: Record<
  PasswordStrength,
  { label: string; color: string; bg: string; width: string }
> = {
  weak: {
    label: "Weak",
    color: "text-red-600",
    bg: "bg-red-500",
    width: "w-1/3",
  },
  medium: {
    label: "Medium",
    color: "text-amber-600",
    bg: "bg-amber-500",
    width: "w-2/3",
  },
  strong: {
    label: "Strong",
    color: "text-emerald-600",
    bg: "bg-emerald-500",
    width: "w-full",
  },
};

export default function ProtectPdfTool() {
  const [file, setFile] = useState<PdfFile | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordStrength = useMemo(
    () => evaluatePasswordStrength(password),
    [password]
  );

  const passwordsMatch = password === confirmPassword;
  const canProtect =
    password.length > 0 && confirmPassword.length > 0 && passwordsMatch;

  const strengthConfig = STRENGTH_CONFIG[passwordStrength];

  const handleFiles = useCallback(async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;

    setError(null);
    setPassword("");
    setConfirmPassword("");

    try {
      const buffer = await readFileAsArrayBuffer(selected);
      setFile({ buffer, name: selected.name, size: selected.size });
    } catch {
      setError("Failed to read the selected file. Please try again.");
    }
  }, []);

  const handleReset = useCallback(() => {
    setFile(null);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Dropzone — only visible when no file is loaded */}
      {!file && (
        <Dropzone
          accept={[".pdf"]}
          multiple={false}
          onFiles={handleFiles}
          label="Drop your PDF file here"
        />
      )}

      {/* File info + controls */}
      {file && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          {/* Uploaded file summary */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {formatFileSize(file.size)}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Change file
            </button>
          </div>

          {/* Password input */}
          <div className="mt-5">
            <label
              htmlFor="protect-password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="protect-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-20 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition-colors hover:text-slate-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password strength indicator */}
            {password.length > 0 && (
              <div className="mt-2.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strengthConfig.bg} ${strengthConfig.width}`}
                  />
                </div>
                <p className={`mt-1 text-xs font-medium ${strengthConfig.color}`}>
                  {strengthConfig.label} password
                </p>
              </div>
            )}
          </div>

          {/* Confirm password input */}
          <div className="mt-4">
            <label
              htmlFor="protect-confirm-password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="protect-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter the password"
                className={`w-full rounded-lg border bg-white px-4 py-2.5 pr-20 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 ${
                  confirmPassword.length > 0 && !passwordsMatch
                    ? "border-red-300 focus:border-red-500"
                    : "border-slate-200 focus:border-sky-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition-colors hover:text-slate-700"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="mt-1 text-xs text-red-600">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Coming soon notice */}
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Coming soon
                </p>
                <p className="mt-1 text-sm text-amber-700">
                  Full PDF encryption requires server-side processing that we
                  are actively building. Client-side PDF libraries cannot apply
                  the AES encryption that modern PDF readers expect. We want to
                  do this right rather than offer a half-measure.
                </p>
                <p className="mt-2 text-sm text-amber-700">
                  In the meantime, you can use our{" "}
                  <a
                    href="/watermark-pdf"
                    className="font-medium text-amber-800 underline underline-offset-2 hover:text-amber-900"
                  >
                    Watermark PDF
                  </a>{" "}
                  tool to add visible ownership marks to your documents, or our{" "}
                  <a
                    href="/unlock-pdf"
                    className="font-medium text-amber-800 underline underline-offset-2 hover:text-amber-900"
                  >
                    Unlock PDF
                  </a>{" "}
                  tool to remove existing passwords.
                </p>
              </div>
            </div>
          </div>

          {/* Protect button (disabled with tooltip) */}
          <button
            disabled
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-sky-500/25 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            title={
              canProtect
                ? "PDF encryption is coming soon"
                : "Enter and confirm a password first"
            }
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Protect PDF
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}
