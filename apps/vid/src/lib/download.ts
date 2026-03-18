import { saveAs } from "file-saver";

/**
 * Trigger a browser download for a single blob.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  saveAs(blob, filename);
}

/**
 * Format a byte count as a human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 0) {
    throw new RangeError("Byte count must be non-negative");
  }

  const units = ["B", "KB", "MB", "GB"] as const;
  let unitIndex = 0;
  let size = bytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  const formatted =
    unitIndex === 0 ? size.toString() : size.toFixed(2).replace(/\.?0+$/, "");
  return `${formatted} ${units[unitIndex]}`;
}

/**
 * Read a File object as an ArrayBuffer.
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error("FileReader did not produce an ArrayBuffer"));
      }
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read file"));
    };
    reader.readAsArrayBuffer(file);
  });
}
