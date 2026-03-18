export interface ResizeOptions {
  width?: number;
  height?: number;
  percentage?: number;
  maintainAspectRatio: boolean;
  format?: 'jpeg' | 'png' | 'webp';
  quality?: number;
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
 * Resize an image file using the browser Canvas API.
 *
 * Supports resizing by explicit width/height or by percentage. When
 * `maintainAspectRatio` is true and only one dimension is provided, the
 * other dimension is computed automatically.
 *
 * @param file    - The source image file
 * @param options - Resize settings
 * @returns A Blob containing the resized image
 */
export async function resizeImage(
  file: File,
  options: ResizeOptions,
): Promise<Blob> {
  const img = await loadImage(file);

  let targetWidth: number;
  let targetHeight: number;

  if (options.percentage != null) {
    // Resize by percentage
    const scale = options.percentage / 100;
    targetWidth = Math.round(img.width * scale);
    targetHeight = Math.round(img.height * scale);
  } else if (options.maintainAspectRatio) {
    // Maintain aspect ratio: compute the missing dimension
    if (options.width && options.height) {
      // Both provided — fit within the box while maintaining ratio
      const ratioW = options.width / img.width;
      const ratioH = options.height / img.height;
      const scale = Math.min(ratioW, ratioH);
      targetWidth = Math.round(img.width * scale);
      targetHeight = Math.round(img.height * scale);
    } else if (options.width) {
      const scale = options.width / img.width;
      targetWidth = options.width;
      targetHeight = Math.round(img.height * scale);
    } else if (options.height) {
      const scale = options.height / img.height;
      targetWidth = Math.round(img.width * scale);
      targetHeight = options.height;
    } else {
      // No dimensions specified — keep original
      targetWidth = img.width;
      targetHeight = img.height;
    }
  } else {
    // Stretch to exact dimensions, falling back to the original if not given
    targetWidth = options.width ?? img.width;
    targetHeight = options.height ?? img.height;
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas 2d context');
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const mimeType = `image/${options.format ?? 'png'}`;
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas toBlob returned null'));
        }
      },
      mimeType,
      options.quality,
    );
  });
}
