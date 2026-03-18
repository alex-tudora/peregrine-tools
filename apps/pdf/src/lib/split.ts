import { PDFDocument } from 'pdf-lib';

/**
 * Extract specific pages from a PDF by their 0-indexed page numbers.
 * Returns one Uint8Array per requested page, each being a standalone PDF.
 */
export async function splitPdf(
  pdfBuffer: ArrayBuffer,
  pageNumbers: number[],
): Promise<Uint8Array[]> {
  const sourcePdf = await PDFDocument.load(pdfBuffer);
  const results: Uint8Array[] = [];

  for (const pageIndex of pageNumbers) {
    if (pageIndex < 0 || pageIndex >= sourcePdf.getPageCount()) {
      throw new RangeError(
        `Page index ${pageIndex} is out of range. The PDF has ${sourcePdf.getPageCount()} pages (0-indexed).`,
      );
    }

    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageIndex]);
    newPdf.addPage(copiedPage);
    results.push(await newPdf.save());
  }

  return results;
}

/**
 * Split every page of a PDF into its own standalone PDF document.
 * Returns an array of Uint8Array, one per page in the original document order.
 */
export async function splitPdfToSingle(
  pdfBuffer: ArrayBuffer,
): Promise<Uint8Array[]> {
  const sourcePdf = await PDFDocument.load(pdfBuffer);
  const pageIndices = sourcePdf.getPageIndices();
  return splitPdf(pdfBuffer, pageIndices);
}

/**
 * Extract a contiguous range of pages from a PDF.
 *
 * @param pdfBuffer  - The source PDF as an ArrayBuffer
 * @param startPage  - Start page index (0-indexed, inclusive)
 * @param endPage    - End page index (0-indexed, inclusive)
 * @returns A single Uint8Array containing only the pages in the given range
 */
export async function extractPageRange(
  pdfBuffer: ArrayBuffer,
  startPage: number,
  endPage: number,
): Promise<Uint8Array> {
  const sourcePdf = await PDFDocument.load(pdfBuffer);
  const totalPages = sourcePdf.getPageCount();

  if (startPage < 0 || startPage >= totalPages) {
    throw new RangeError(
      `startPage ${startPage} is out of range. The PDF has ${totalPages} pages (0-indexed).`,
    );
  }
  if (endPage < startPage || endPage >= totalPages) {
    throw new RangeError(
      `endPage ${endPage} is out of range. Must be >= startPage (${startPage}) and < ${totalPages}.`,
    );
  }

  const indices: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    indices.push(i);
  }

  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(sourcePdf, indices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return newPdf.save();
}
