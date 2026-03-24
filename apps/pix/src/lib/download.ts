import { saveAs } from 'file-saver';
import JSZip from 'jszip';

function brandFilename(filename: string): string {
  const dot = filename.lastIndexOf('.');
  if (dot === -1) return `${filename}-peregrine`;
  return `${filename.slice(0, dot)}-peregrine${filename.slice(dot)}`;
}

/**
 * Trigger a browser download for a single blob.
 *
 * @param blob     - The file contents as a Blob
 * @param filename - The name the browser will give the downloaded file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  saveAs(blob, brandFilename(filename));
}

/**
 * Bundle multiple files into a ZIP archive and trigger a browser download.
 *
 * @param files   - Array of objects containing blob data and filename
 * @param zipName - The name of the resulting ZIP file
 */
export async function downloadAsZip(
  files: { data: Blob; name: string }[],
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
  const formatted =
    unitIndex === 0 ? size.toString() : size.toFixed(2).replace(/\.?0+$/, '');
  return `${formatted} ${units[unitIndex]}`;
}

/**
 * Read a File object as a data URL string.
 *
 * @param file - A browser File (e.g. from an <input type="file">)
 * @returns A Promise resolving to a data URL string
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('FileReader did not produce a string'));
      }
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Load an HTMLImageElement from a URL or data URL string.
 *
 * @param src - The image source (URL, data URL, or object URL)
 * @returns A Promise resolving to the loaded HTMLImageElement
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image from: ${src}`));
    img.src = src;
  });
}
