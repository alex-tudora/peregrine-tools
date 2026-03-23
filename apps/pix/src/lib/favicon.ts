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

  // Pre-scale the source using step-down halving for high-quality downsampling.
  // Canvas drawImage produces poor results when jumping from a large source
  // directly to a small target (e.g. 1024→16). Halving iteratively avoids this.
  const steppedSource = stepDownScale(img, Math.max(...FAVICON_SIZES));

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

      // Pick the smallest stepped source that is >= target size
      const best =
        steppedSource.find((s) => s.width >= size && s.height >= size) ??
        steppedSource[steppedSource.length - 1];

      ctx.drawImage(best, 0, 0, size, size);

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

/**
 * Progressively halve an image source down to `minSize`, returning every
 * intermediate canvas. Each step is at most a 2× reduction so the browser's
 * bilinear/bicubic filter has enough data to work with.
 *
 * Returns canvases from smallest to largest.
 */
function stepDownScale(
  source: HTMLImageElement,
  minSize: number,
): HTMLCanvasElement[] {
  const results: HTMLCanvasElement[] = [];

  // Start from the original drawn onto a canvas
  let current = document.createElement('canvas');
  current.width = source.naturalWidth;
  current.height = source.naturalHeight;
  const ctx = current.getContext('2d')!;
  ctx.drawImage(source, 0, 0);
  results.push(current);

  // Halve until the shortest side is <= minSize
  while (current.width > minSize * 2 || current.height > minSize * 2) {
    const nextW = Math.max(minSize, Math.ceil(current.width / 2));
    const nextH = Math.max(minSize, Math.ceil(current.height / 2));

    const next = document.createElement('canvas');
    next.width = nextW;
    next.height = nextH;
    const nctx = next.getContext('2d')!;
    nctx.imageSmoothingEnabled = true;
    nctx.imageSmoothingQuality = 'high';
    nctx.drawImage(current, 0, 0, nextW, nextH);

    results.push(next);
    current = next;
  }

  // Return smallest first so .find() picks the smallest one >= target
  return results.reverse();
}
