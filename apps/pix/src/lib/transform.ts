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
 * Convert a canvas to a Blob.
 */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  format?: string,
  quality?: number,
): Promise<Blob> {
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

/**
 * Flip an image horizontally or vertically using canvas transformations.
 *
 * @param file      - The source image file
 * @param direction - "horizontal" mirrors left-to-right; "vertical" mirrors top-to-bottom
 * @param format    - Output MIME sub-type (default: "png")
 * @param quality   - Export quality for lossy formats, 0-1
 * @returns A Blob containing the flipped image
 */
export async function flipImage(
  file: File,
  direction: 'horizontal' | 'vertical',
  format?: string,
  quality?: number,
): Promise<Blob> {
  const img = await loadImage(file);

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas 2d context');
  }

  if (direction === 'horizontal') {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
  }

  ctx.drawImage(img, 0, 0);

  return canvasToBlob(canvas, format, quality);
}

/**
 * Rotate an image by an arbitrary number of degrees using canvas transformations.
 *
 * For rotations that are not multiples of 90 degrees the output canvas is
 * enlarged to fully contain the rotated image.
 *
 * @param file    - The source image file
 * @param degrees - Clockwise rotation in degrees
 * @param format  - Output MIME sub-type (default: "png")
 * @param quality - Export quality for lossy formats, 0-1
 * @returns A Blob containing the rotated image
 */
export async function rotateImage(
  file: File,
  degrees: number,
  format?: string,
  quality?: number,
): Promise<Blob> {
  const img = await loadImage(file);

  const radians = (degrees * Math.PI) / 180;

  // Compute the bounding box of the rotated image
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const newWidth = Math.round(img.width * cos + img.height * sin);
  const newHeight = Math.round(img.width * sin + img.height * cos);

  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas 2d context');
  }

  // Move origin to the centre of the new canvas, rotate, then draw centred
  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(radians);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);

  return canvasToBlob(canvas, format, quality);
}
