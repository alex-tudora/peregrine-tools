import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).toString();

export interface RenderedPage {
  data: Blob;
  pageNumber: number;
  width: number;
  height: number;
}

export type ImageFormat = 'jpg' | 'png';

/**
 * Render every page of a PDF to images.
 *
 * @param pdfBuffer - The source PDF as an ArrayBuffer
 * @param format    - Output image format ('jpg' or 'png')
 * @param quality   - JPEG quality between 0 and 1 (ignored for PNG). Defaults to 0.85
 * @returns An array of rendered page objects containing a Blob, dimensions, and page number
 */
export async function pdfToImages(
  pdfBuffer: ArrayBuffer,
  format: ImageFormat = 'png',
  quality: number = 0.85,
): Promise<RenderedPage[]> {
  const pdfData = new Uint8Array(pdfBuffer);
  const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const results: RenderedPage[] = [];
  const scale = 2; // 2x for retina-quality output

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D canvas context');
    }

    await page.render({ canvasContext: context, viewport }).promise;

    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) {
            resolve(b);
          } else {
            reject(new Error(`Failed to convert page ${i} to ${format}`));
          }
        },
        mimeType,
        format === 'jpg' ? quality : undefined,
      );
    });

    results.push({
      data: blob,
      pageNumber: i,
      width: viewport.width,
      height: viewport.height,
    });
  }

  return results;
}

export type PageSize = 'a4' | 'letter' | 'fit';

export interface ImageInput {
  data: ArrayBuffer;
  width: number;
  height: number;
}

/** Standard page dimensions in points (1 point = 1/72 inch). */
const PAGE_SIZES: Record<Exclude<PageSize, 'fit'>, { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

/**
 * Create a PDF from an array of images, placing each image on its own page.
 *
 * @param images   - Array of image data with their original dimensions
 * @param pageSize - Page sizing strategy:
 *                   'a4' / 'letter' - standard page, image centred and scaled to fit
 *                   'fit' - page dimensions match the image
 * @returns The resulting PDF as a Uint8Array
 */
export async function imagesToPdf(
  images: ImageInput[],
  pageSize: PageSize = 'fit',
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  for (const image of images) {
    const imageBytes = new Uint8Array(image.data);

    // Detect format from magic bytes
    const embeddedImage = isPng(imageBytes)
      ? await pdfDoc.embedPng(imageBytes)
      : await pdfDoc.embedJpg(imageBytes);

    if (pageSize === 'fit') {
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    } else {
      const { width: pageWidth, height: pageHeight } = PAGE_SIZES[pageSize];
      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      // Scale image to fit within the page while preserving aspect ratio
      const imgAspect = image.width / image.height;
      const pageAspect = pageWidth / pageHeight;

      let drawWidth: number;
      let drawHeight: number;

      if (imgAspect > pageAspect) {
        // Image is wider relative to its height than the page
        drawWidth = pageWidth;
        drawHeight = pageWidth / imgAspect;
      } else {
        // Image is taller relative to its width than the page
        drawHeight = pageHeight;
        drawWidth = pageHeight * imgAspect;
      }

      // Centre the image on the page
      const x = (pageWidth - drawWidth) / 2;
      const y = (pageHeight - drawHeight) / 2;

      page.drawImage(embeddedImage, {
        x,
        y,
        width: drawWidth,
        height: drawHeight,
      });
    }
  }

  return pdfDoc.save();
}

/**
 * Check whether a byte array starts with the PNG magic number.
 */
function isPng(bytes: Uint8Array): boolean {
  return (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  );
}
