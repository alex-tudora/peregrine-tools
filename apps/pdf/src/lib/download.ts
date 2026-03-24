import { saveAs } from 'file-saver';
import JSZip from 'jszip';

function brandFilename(filename: string): string {
  const dot = filename.lastIndexOf('.');
  if (dot === -1) return `${filename}-peregrine`;
  return `${filename.slice(0, dot)}-peregrine${filename.slice(dot)}`;
}

/**
 * Trigger a browser download for a single file.
 *
 * @param data     - File contents as a Uint8Array or Blob
 * @param filename - The name the browser will give the downloaded file
 */
export function downloadFile(data: Uint8Array | Blob, filename: string): void {
  const blob = data instanceof Blob ? data : new Blob([data as BlobPart]);
  saveAs(blob, brandFilename(filename));
}

/**
 * Bundle multiple files into a ZIP archive and trigger a browser download.
 *
 * @param files   - Array of objects containing file data and name
 * @param zipName - The name of the resulting ZIP file
 */
export async function downloadAsZip(
  files: { data: Uint8Array | Blob; name: string }[],
  zipName: string,
): Promise<void> {
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.name, file.data);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, zipName);
}

/**
 * Format a byte count as a human-readable string.
 *
 * @param bytes - The number of bytes
 * @returns A formatted string such as "1.5 MB" or "320 KB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 0) {
    throw new RangeError('Byte count must be non-negative');
  }

  const units = ['B', 'KB', 'MB', 'GB'] as const;
  let unitIndex = 0;
  let size = bytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // Show decimals only for KB and above
  const formatted = unitIndex === 0 ? size.toString() : size.toFixed(2).replace(/\.?0+$/, '');
  return `${formatted} ${units[unitIndex]}`;
}

/**
 * Read a File object into an ArrayBuffer.
 *
 * @param file - A browser File (e.g. from an <input type="file">)
 * @returns A Promise resolving to the file's contents as an ArrayBuffer
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error('FileReader did not produce an ArrayBuffer'));
      }
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error('Failed to read file'));
    };
    reader.readAsArrayBuffer(file);
  });
}
