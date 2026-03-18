export interface FaviconResult {
  sizes: { size: number; blob: Blob; name: string }[];
}

/** Standard favicon sizes to generate. */
const FAVICON_SIZES = [16, 32, 48, 64, 128, 192, 512] as const;

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
 * Generate a set of favicons at standard sizes from a source image.
 *
 * Each icon is rendered at the target dimensions using the Canvas API with
 * `imageSmoothingQuality` set to "high" for the best downscaling quality.
 * Output format is always PNG.
 *
 * Generated sizes: 16x16, 32x32, 48x48, 64x64, 128x128, 192x192, 512x512
 *
 * @param file - The source image file
 * @returns A FaviconResult containing a blob and filename for each size
 */
export async function generateFavicons(file: File): Promise<FaviconResult> {
  const img = await loadImage(file);

  const sizes = await Promise.all(
    FAVICON_SIZES.map(async (size) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to get canvas 2d context');
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(img, 0, 0, size, size);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) {
              resolve(b);
            } else {
              reject(new Error('Canvas toBlob returned null'));
            }
          },
          'image/png',
        );
      });

      return {
        size,
        blob,
        name: `favicon-${size}x${size}.png`,
      };
    }),
  );

  return { sizes };
}
