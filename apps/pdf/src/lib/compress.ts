import { PDFDocument } from 'pdf-lib';

export type CompressionQuality = 'low' | 'medium' | 'high';

/**
 * Compress a PDF by reloading and re-saving it through pdf-lib.
 *
 * Re-saving through pdf-lib strips orphaned objects and can reduce file size.
 * The `quality` parameter controls how aggressively metadata and auxiliary data
 * are stripped:
 *
 * - **high**   - Re-save only (preserves metadata).
 * - **medium** - Strip document metadata (title, author, subject, etc.).
 * - **high** quality with lowest aggression, **low** quality strips the most.
 * - **low**    - Strip metadata, producer, creator, and creation/modification dates.
 */
export async function compressPdf(
  pdfBuffer: ArrayBuffer,
  quality: CompressionQuality = 'medium',
): Promise<Uint8Array> {
  const sourcePdf = await PDFDocument.load(pdfBuffer, {
    // Ignore encryption so we can at least attempt to process protected files
    ignoreEncryption: true,
  });

  if (quality === 'medium' || quality === 'low') {
    sourcePdf.setTitle('');
    sourcePdf.setAuthor('');
    sourcePdf.setSubject('');
    sourcePdf.setKeywords([]);
  }

  if (quality === 'low') {
    sourcePdf.setProducer('');
    sourcePdf.setCreator('');
    sourcePdf.setCreationDate(new Date(0));
    sourcePdf.setModificationDate(new Date(0));
  }

  // Re-saving the document through pdf-lib rebuilds the cross-reference table
  // and drops unreferenced objects, which often reduces file size.
  return sourcePdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
    // pdf-lib will only include objects that are actually referenced,
    // effectively garbage-collecting unused data.
  });
}
