/**
 * Canonical byte formatter for the whole suite.
 *
 * Previously this identical function was copy-pasted as `formatBytes` in
 * Dropzone.tsx, `formatFileSize` in FileList.tsx, and again in each app's
 * src/lib/download.ts and packages/converters. One definition now, re-exported
 * from @peregrine/ui so apps can `import { formatFileSize } from "@peregrine/ui"`.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
