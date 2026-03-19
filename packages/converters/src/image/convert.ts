/**
 * Load a File as an HTMLImageElement via an object URL.
 */
function loadImageFromFile(file: File): Promise<HTMLImageElement> {
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
 * Convert an image file to a different format using the Canvas API.
 *
 * @param file         - The source image file
 * @param targetFormat - The desired output format
 * @param quality      - Export quality for lossy formats, 0-1
 * @returns A Blob in the target format
 */
export async function convertImage(
  file: File,
  targetFormat: 'jpeg' | 'png' | 'webp',
  quality?: number,
): Promise<Blob> {
  const img = await loadImageFromFile(file);

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas 2d context');
  }

  // Fill with white background for JPEG (which has no transparency)
  if (targetFormat === 'jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  const mimeType = `image/${targetFormat}`;
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
 * Render an SVG file to a PNG at the specified scale using the Canvas API.
 *
 * @param file  - An SVG file
 * @param scale - Multiplier for the SVG's intrinsic dimensions (e.g. 2 = 2x)
 * @returns A Blob containing the rendered PNG
 */
export async function svgToPng(file: File, scale: number): Promise<Blob> {
  const svgText = await file.text();
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG as image'));
    };
    image.src = url;
  });

  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas 2d context');
  }

  ctx.drawImage(img, 0, 0, width, height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas toBlob returned null'));
        }
      },
      'image/png',
    );
  });
}

/**
 * Read an image file and return its contents as a Base64-encoded data URL string.
 *
 * @param file - The image file to read
 * @returns A data URL string (e.g. "data:image/png;base64,...")
 */
export function imageToBase64(file: File): Promise<string> {
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
