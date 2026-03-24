export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  content: string;
  relatedTools: { name: string; href: string }[];
}

export const posts: BlogPost[] = [
  {
    slug: "how-to-reduce-pdf-file-size",
    title: "How to Reduce PDF File Size Without Losing Quality",
    description:
      "Learn 5 proven methods to compress PDF files while keeping text sharp and images clear. No software installation needed.",
    date: "2026-03-20",
    readingTime: "4 min read",
    relatedTools: [
      { name: "Compress PDF", href: "/compress-pdf" },
      { name: "Merge PDF", href: "/merge-pdf" },
    ],
    content: `
      <p>
        Large PDF files are a constant headache — they clog email attachments, slow down uploads,
        and eat through cloud storage. The good news is that you can dramatically reduce PDF file
        size without any visible loss in quality. Here are five proven approaches.
      </p>

      <h2>1. Use Browser-Based Compression</h2>
      <p>
        The fastest method is to use a browser-based PDF compressor like
        <a href="/compress-pdf">Peregrine PDF's Compress tool</a>. Unlike server-based tools,
        your file never leaves your device — it's processed entirely in your browser using the
        pdf-lib library. Choose between low, medium, and high compression levels depending on
        your needs.
      </p>
      <p>
        For most documents, medium compression reduces file size by 40-70% with no perceptible
        quality loss. High compression can achieve 70-90% reduction but may slightly affect
        image quality in photo-heavy documents.
      </p>

      <h2>2. Downscale Embedded Images</h2>
      <p>
        The #1 reason PDFs are large is embedded images. A single 4000×3000 photo at 300 DPI
        can add 5-10 MB to a PDF. If the document is meant for screen viewing (not print),
        images at 150 DPI or even 72 DPI are perfectly fine.
      </p>
      <p>
        PDF compression tools automatically downscale images as part of the process. If you
        need more control, extract the images first with a
        <a href="/pdf-to-jpg">PDF to JPG converter</a>, resize them, then rebuild the PDF.
      </p>

      <h2>3. Remove Unnecessary Pages</h2>
      <p>
        Before compressing, check if your PDF contains blank pages, duplicate pages, or sections
        you don't need. Use a <a href="/split-pdf">PDF splitter</a> to extract only the pages
        you need. Fewer pages = smaller file, even before compression.
      </p>

      <h2>4. Flatten Form Fields and Annotations</h2>
      <p>
        Interactive form fields, comments, and annotations add significant overhead to PDF files.
        If you no longer need the interactivity, flattening the PDF converts these elements into
        static content, reducing file size. Most PDF compression tools handle this automatically.
      </p>

      <h2>5. Choose the Right Compression Level</h2>
      <p>
        Not all PDFs are equal. A text-only contract might only compress by 10-20% (text is
        already compact), while a presentation full of photos could compress by 80%+. Here's
        a quick guide:
      </p>
      <ul>
        <li><strong>Text-heavy documents:</strong> Low compression — small savings, zero quality impact</li>
        <li><strong>Mixed content:</strong> Medium compression — best balance of size and quality</li>
        <li><strong>Photo-heavy presentations:</strong> High compression — biggest savings, slight image softening</li>
        <li><strong>Scanned documents:</strong> High compression — scans are essentially large images</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>
        For most people, the answer is simple: drag your PDF into a
        <a href="/compress-pdf">free compression tool</a>, pick "medium" quality, and download
        the result. It takes about 3 seconds and you'll typically see a 50%+ reduction. No
        software to install, no account to create, and your file stays private on your device.
      </p>
    `,
  },
  {
    slug: "merge-pdf-files-guide",
    title: "How to Merge PDF Files: The Complete Guide",
    description:
      "Step-by-step guide to combining multiple PDF files into one document. Covers reordering pages, file size tips, and common pitfalls.",
    date: "2026-03-18",
    readingTime: "3 min read",
    relatedTools: [
      { name: "Merge PDF", href: "/merge-pdf" },
      { name: "Split PDF", href: "/split-pdf" },
      { name: "Compress PDF", href: "/compress-pdf" },
    ],
    content: `
      <p>
        Whether you're assembling a report from multiple sources, combining scanned pages into
        one file, or packaging invoices for a client — merging PDFs is one of the most common
        document tasks. Here's everything you need to know.
      </p>

      <h2>The Quick Method (30 Seconds)</h2>
      <ol>
        <li>Open a <a href="/merge-pdf">PDF merge tool</a></li>
        <li>Drag and drop all your PDF files into the upload area</li>
        <li>Reorder the files by dragging them into the correct sequence</li>
        <li>Click "Merge" and download the combined PDF</li>
      </ol>
      <p>
        That's it. The entire process happens in your browser — no upload to any server, no
        account needed, no watermarks. The merged PDF preserves all formatting, bookmarks,
        and links from the original files.
      </p>

      <h2>Tips for Better Results</h2>
      <h3>Check Page Orientation</h3>
      <p>
        If some of your source PDFs have landscape pages mixed with portrait pages, the merge
        will preserve each page's original orientation. If you need to fix rotated pages first,
        use a <a href="/rotate-pdf">PDF rotation tool</a> before merging.
      </p>

      <h3>Compress After Merging</h3>
      <p>
        Merging multiple PDFs can create a large combined file, especially if the originals
        contain high-resolution images. After merging, run the result through a
        <a href="/compress-pdf">PDF compressor</a> to reduce the file size — often by 50%
        or more — without any visible quality loss.
      </p>

      <h3>Add Page Numbers</h3>
      <p>
        When you combine documents from different sources, the page numbering is often
        inconsistent. Use an <a href="/add-page-numbers">Add Page Numbers tool</a> to apply
        consistent numbering across the entire merged document.
      </p>

      <h2>Common Issues</h2>
      <p>
        <strong>Password-protected PDFs:</strong> You'll need to
        <a href="/unlock-pdf">unlock the PDF</a> before merging. Most merge tools can't process
        encrypted files directly.
      </p>
      <p>
        <strong>Very large files:</strong> Browser-based tools work best with files under 100 MB
        each. If you're merging dozens of high-resolution documents, consider compressing each
        one individually first.
      </p>

      <h2>Privacy Matters</h2>
      <p>
        Many PDF merge tools upload your files to a server. If you're working with contracts,
        financial documents, or anything confidential, use a browser-based tool like
        <a href="/merge-pdf">Peregrine PDF</a> where files never leave your device. The entire
        merge operation runs locally in your browser using JavaScript — no server involved.
      </p>
    `,
  },
  {
    slug: "pdf-vs-image-formats",
    title: "PDF vs JPG vs PNG: When to Use Each Format",
    description:
      "A clear guide to choosing between PDF, JPG, and PNG for documents, photos, and graphics. Includes conversion tips.",
    date: "2026-03-15",
    readingTime: "5 min read",
    relatedTools: [
      { name: "PDF to JPG", href: "/pdf-to-jpg" },
      { name: "PDF to PNG", href: "/pdf-to-png" },
      { name: "JPG to PDF", href: "/jpg-to-pdf" },
    ],
    content: `
      <p>
        Choosing the right file format can mean the difference between a crisp, professional
        document and a blurry, oversized mess. Here's when to use PDF, JPG, and PNG — and
        how to convert between them.
      </p>

      <h2>PDF — Best for Documents</h2>
      <p>
        <strong>Use PDF when:</strong> sharing multi-page documents, contracts, reports, forms,
        or anything that needs to look exactly the same on every device.
      </p>
      <ul>
        <li>Preserves exact layout, fonts, and formatting</li>
        <li>Supports text selection and search</li>
        <li>Can be password-protected</li>
        <li>Ideal for print-ready documents</li>
      </ul>

      <h2>JPG — Best for Photos</h2>
      <p>
        <strong>Use JPG when:</strong> sharing photographs, email attachments where file size
        matters, or any image where small quality loss is acceptable.
      </p>
      <ul>
        <li>Excellent compression for photographs (small file size)</li>
        <li>Universally supported — works everywhere</li>
        <li>No transparency support</li>
        <li>Lossy — each re-save degrades quality slightly</li>
      </ul>

      <h2>PNG — Best for Graphics</h2>
      <p>
        <strong>Use PNG when:</strong> you need transparency, sharp text/logos, screenshots,
        or images where every pixel matters.
      </p>
      <ul>
        <li>Lossless — no quality degradation</li>
        <li>Supports transparency (alpha channel)</li>
        <li>Ideal for logos, icons, screenshots, and text-heavy images</li>
        <li>Larger file size than JPG for photos</li>
      </ul>

      <h2>Quick Decision Guide</h2>
      <table>
        <thead>
          <tr><th>Scenario</th><th>Best Format</th></tr>
        </thead>
        <tbody>
          <tr><td>Multi-page report</td><td>PDF</td></tr>
          <tr><td>Vacation photo</td><td>JPG</td></tr>
          <tr><td>Company logo</td><td>PNG</td></tr>
          <tr><td>Contract to sign</td><td>PDF</td></tr>
          <tr><td>Website banner</td><td>JPG or PNG</td></tr>
          <tr><td>Screenshot</td><td>PNG</td></tr>
          <tr><td>Email attachment (photo)</td><td>JPG</td></tr>
          <tr><td>Print-ready design</td><td>PDF</td></tr>
        </tbody>
      </table>

      <h2>Converting Between Formats</h2>
      <p>
        Need to convert? Here are the most common scenarios:
      </p>
      <ul>
        <li><strong>PDF → JPG:</strong> Use a <a href="/pdf-to-jpg">PDF to JPG converter</a> to extract pages as images. Great for sharing individual pages on social media or in presentations.</li>
        <li><strong>PDF → PNG:</strong> Use a <a href="/pdf-to-png">PDF to PNG converter</a> when you need lossless quality or transparency.</li>
        <li><strong>JPG → PDF:</strong> Use a <a href="/jpg-to-pdf">JPG to PDF converter</a> to combine photos into a shareable document.</li>
        <li><strong>PNG → PDF:</strong> Same as above — useful for packaging screenshots or graphics.</li>
      </ul>

      <p>
        All conversions can be done instantly in your browser with
        <a href="/">Peregrine PDF</a> — no sign-up, no upload, completely free.
      </p>
    `,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}
