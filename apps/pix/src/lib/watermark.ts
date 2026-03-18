export interface WatermarkOptions {
  text: string;
  fontSize: number;
  opacity: number; // 0-1
  color: string;
  position: 'diagonal' | 'center' | 'bottom-right';
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
 * Add a text watermark to an image using the Canvas API.
 *
 * The image is drawn first, then the watermark text is rendered on top
 * with the specified opacity via `globalAlpha`.
 *
 * @param file    - The source image file
 * @param options - Watermark appearance and placement settings
 * @returns A Blob containing the watermarked image
 */
export async function addWatermark(
  file: File,
  options: WatermarkOptions,
): Promise<Blob> {
  const img = await loadImage(file);

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas 2d context');
  }

  // Draw the original image
  ctx.drawImage(img, 0, 0);

  // Configure watermark style
  ctx.globalAlpha = options.opacity;
  ctx.fillStyle = options.color;
  ctx.font = `${options.fontSize}px sans-serif`;

  switch (options.position) {
    case 'center': {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(options.text, canvas.width / 2, canvas.height / 2);
      break;
    }

    case 'bottom-right': {
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      const padding = options.fontSize;
      ctx.fillText(
        options.text,
        canvas.width - padding,
        canvas.height - padding,
      );
      break;
    }

    case 'diagonal': {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(options.text, 0, 0);
      break;
    }
  }

  // Reset alpha before exporting
  ctx.globalAlpha = 1;

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
