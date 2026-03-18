export interface CompressOptions {
  quality: number; // 0-1
  maxWidth?: number;
  maxHeight?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export interface CompressResult {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
}

/**
 * Load a File as an HTMLImageElement.
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

/**
 * Compress an image file using the browser Canvas API.
 *
 * Optionally resizes the image to fit within `maxWidth` / `maxHeight` while
 * preserving the aspect ratio, then exports it as a blob at the requested
 * quality level.
 *
 * @param file    - The source image file
 * @param options - Compression settings (quality, optional max dimensions, format)
 * @returns A CompressResult with the output blob and size metadata
 */
export async function compressImage(
  file: File,
  options: CompressOptions,
): Promise<CompressResult> {
  const img = await loadImage(file);

  let { width, height } = img;
  const originalSize = file.size;

  // Resize to fit within max dimensions while maintaining aspect ratio
  if (options.maxWidth && width > options.maxWidth) {
    height = Math.round(height * (options.maxWidth / width));
    width = options.maxWidth;
  }

  if (options.maxHeight && height > options.maxHeight) {
    width = Math.round(width * (options.maxHeight / height));
    height = options.maxHeight;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas 2d context');
  }

  ctx.drawImage(img, 0, 0, width, height);

  const mimeType = `image/${options.format ?? 'jpeg'}`;
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) {
          resolve(b);
        } else {
          reject(new Error('Canvas toBlob returned null'));
        }
      },
      mimeType,
      options.quality,
    );
  });

  return {
    blob,
    width,
    height,
    originalSize,
    compressedSize: blob.size,
  };
}
