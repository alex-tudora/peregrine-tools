export interface CropRegion {
  x: number;
  y: number;
  width: number;
  height: number;
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
 * Crop an image file to a specified rectangular region using the Canvas API.
 *
 * @param file    - The source image file
 * @param region  - The rectangular area to extract (x, y, width, height)
 * @param format  - Output MIME sub-type (default: "png")
 * @param quality - Export quality for lossy formats, 0-1
 * @returns A Blob containing the cropped image
 */
export async function cropImage(
  file: File,
  region: CropRegion,
  format?: string,
  quality?: number,
): Promise<Blob> {
  const img = await loadImage(file);

  const canvas = document.createElement('canvas');
  canvas.width = region.width;
  canvas.height = region.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas 2d context');
  }

  // Draw only the specified region onto the new canvas
  ctx.drawImage(
    img,
    region.x,
    region.y,
    region.width,
    region.height,
    0,
    0,
    region.width,
    region.height,
  );

  const mimeType = `image/${format ?? 'png'}`;
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
      quality,
    );
  });
}
