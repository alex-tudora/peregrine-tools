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
  {
    slug: "digitally-sign-pdf-without-printing",
    title: "How to Digitally Sign a PDF Without Printing It",
    description:
      "Stop printing PDFs just to sign them. Learn how to add your signature digitally — drawn or typed — in seconds, for free.",
    date: "2026-03-25",
    readingTime: "5 min read",
    relatedTools: [
      { name: "Sign PDF", href: "/sign-pdf" },
      { name: "Protect PDF", href: "/protect-pdf" },
      { name: "Merge PDF", href: "/merge-pdf" },
    ],
    content: `
      <p>
        You receive a contract in your inbox. It needs your signature by end of day. The old
        way: print it, sign it with a pen, scan it back in, email it. That's three devices, five
        minutes of your life, and a sheet of paper you'll immediately throw away.
      </p>
      <p>
        The better way takes about ten seconds, and you never leave your browser.
      </p>

      <h2>What "Digitally Signing" Actually Means</h2>
      <p>
        There are two very different things people mean when they say "sign a PDF." The first is
        a <strong>visual signature</strong> — your name or handwriting placed on the document as
        an image. This is what most people need for everyday contracts, timesheets, permission
        slips, and internal approvals.
      </p>
      <p>
        The second is a <strong>cryptographic digital signature</strong> — a mathematically
        verified identity certificate embedded in the file. This is used for legal filings,
        government submissions, and regulated industries. It requires a certificate authority
        and specialized software like Adobe Acrobat or DocuSign.
      </p>
      <p>
        For 95% of everyday document signing, a visual signature is all you need. That's what
        this guide covers.
      </p>

      <h2>Method 1: Draw Your Signature</h2>
      <p>
        Open a <a href="/sign-pdf">PDF signing tool</a>, upload your document, and draw your
        signature directly on the page using your mouse or touchscreen. The tool renders your
        PDF as a preview, and you click exactly where the signature should go. You can resize
        and reposition it until it looks right.
      </p>
      <p>
        Drawing works best on tablets and touchscreens, where you can use a finger or stylus
        for a natural handwriting feel. On a desktop, a mouse signature will look a bit wobbly
        — that's normal and universally accepted.
      </p>

      <h2>Method 2: Type Your Signature</h2>
      <p>
        If you prefer a clean, consistent look, type your name and choose a cursive-style font.
        The tool renders it as a text element placed directly on the PDF. This produces a
        professional result that's perfectly legible — no one can complain they can't read your
        handwriting.
      </p>
      <p>
        Typed signatures are just as legally valid as drawn ones for most purposes. What matters
        is intent — that you deliberately placed your name on the document to indicate agreement.
      </p>

      <h2>Where to Place the Signature</h2>
      <p>
        Most tools let you click directly on the document to position your signature. For
        contracts, look for the designated signature line — usually at the bottom of the last
        page. For timesheets and forms, there's typically a labeled box.
      </p>
      <p>
        If there's no designated spot, the convention is bottom-right of the last page. But
        honestly, place it wherever makes sense for the document. The recipient will see it.
      </p>

      <h2>Is It Legally Binding?</h2>
      <p>
        In most jurisdictions — including the US (ESIGN Act), EU (eIDAS Regulation), UK, Canada,
        and Australia — electronic signatures are legally equivalent to handwritten ones for the
        vast majority of documents. The exceptions are typically wills, certain real estate deeds,
        and court orders, which may still require wet-ink signatures depending on local law.
      </p>
      <p>
        For employment contracts, NDAs, invoices, timesheets, consent forms, and general business
        agreements, a visual signature on a PDF is legally binding. The key legal requirement is
        that both parties agree to conduct business electronically — which, if someone sent you a
        PDF to sign, they implicitly have.
      </p>

      <h2>After Signing: Protect the Document</h2>
      <p>
        Once you've signed a PDF, consider <a href="/protect-pdf">password-protecting it</a> before
        sending it back. This prevents the recipient from modifying the document after your signature
        is on it. It's not legally required, but it's good practice for important agreements.
      </p>
      <p>
        If you're collecting multiple signatures — say, a contract that needs both parties — you can
        sign your copy, then <a href="/merge-pdf">merge</a> the signed pages with the rest of the
        document before sending the final version.
      </p>

      <h2>Privacy: Where Does Your Signature Go?</h2>
      <p>
        This is worth paying attention to. Many popular signing tools (DocuSign, Adobe Sign,
        HelloSign) upload your document and signature to their servers. That means your signed
        contract — which might contain salary figures, personal details, or confidential terms —
        lives on a third party's infrastructure.
      </p>
      <p>
        Browser-based tools like <a href="/sign-pdf">Peregrine PDF's signature tool</a> process
        everything locally. Your PDF never leaves your device. The signature is drawn or typed in
        your browser, embedded into the PDF using JavaScript, and downloaded directly to your
        computer. No upload, no server, no third-party access.
      </p>
      <p>
        For sensitive documents — employment contracts, financial agreements, medical forms —
        this distinction matters.
      </p>
    `,
  },
  {
    slug: "extract-text-from-pdf",
    title: "How to Extract Text from a PDF: OCR vs Direct Extraction",
    description:
      "Two methods to get text out of a PDF — one instant, one for scanned documents. Here's when to use each and how they work.",
    date: "2026-03-24",
    readingTime: "4 min read",
    relatedTools: [
      { name: "PDF to Text", href: "/pdf-to-text" },
      { name: "OCR PDF", href: "/ocr-pdf" },
      { name: "Compress PDF", href: "/compress-pdf" },
    ],
    content: `
      <p>
        You have a PDF. You need the text inside it — maybe to paste into an email, feed into a
        spreadsheet, or reuse in another document. Sounds simple, but PDFs are notoriously
        uncooperative about giving up their content. There are two fundamentally different ways
        to extract text, and choosing the wrong one wastes your time.
      </p>

      <h2>First: What Kind of PDF Do You Have?</h2>
      <p>
        This is the question that determines everything. PDFs come in two varieties:
      </p>
      <ul>
        <li>
          <strong>Digital PDFs</strong> — created from Word, Google Docs, a web page, or any
          application that "printed" to PDF. The text exists as actual text data inside the file.
          You can usually select and copy text from these in any PDF viewer.
        </li>
        <li>
          <strong>Scanned PDFs</strong> — created by scanning a physical document. The text is
          actually a photograph. To a computer, each page is just a picture of text, not actual
          text. You cannot select or copy anything.
        </li>
      </ul>
      <p>
        Quick test: open the PDF and try to select text with your cursor. If you can highlight
        individual words, it's digital. If clicking and dragging selects the entire page as one
        block (or nothing at all), it's scanned.
      </p>

      <h2>Method 1: Direct Extraction (Digital PDFs)</h2>
      <p>
        For digital PDFs, extraction is instant. A <a href="/pdf-to-text">PDF to Text tool</a>
        reads the text layer directly from the file structure — no image processing, no AI, no
        waiting. It literally reads the text data that's already encoded in the PDF.
      </p>
      <p>
        This method is:
      </p>
      <ul>
        <li><strong>Instant</strong> — processes in milliseconds, even for 100+ page documents</li>
        <li><strong>100% accurate</strong> — reproduces the exact text that's in the file</li>
        <li><strong>Preserves formatting clues</strong> — paragraphs, headings, and lists are
        generally maintained (though complex layouts like multi-column documents may jumble)</li>
      </ul>
      <p>
        If your PDF was created from any application (not scanned), always try direct extraction
        first. It's faster, more accurate, and uses fewer resources.
      </p>

      <h2>Method 2: OCR (Scanned PDFs)</h2>
      <p>
        For scanned PDFs, you need <strong>Optical Character Recognition (OCR)</strong>. This
        technology analyzes the image of each page, identifies letter shapes, and converts them
        into actual text. It's the digital equivalent of reading the page with your eyes.
      </p>
      <p>
        An <a href="/ocr-pdf">OCR tool</a> works in three steps:
      </p>
      <ol>
        <li>Renders each page of the PDF as a high-resolution image</li>
        <li>Runs OCR analysis on each image to identify text</li>
        <li>Outputs the recognized text, which you can copy or download</li>
      </ol>
      <p>
        Modern OCR (including Tesseract, which powers most browser-based tools) is remarkably
        accurate on clean, well-scanned documents — typically 95-99% accuracy for printed English
        text. Accuracy drops with:
      </p>
      <ul>
        <li>Handwritten text (highly variable, often 50-80%)</li>
        <li>Poor scan quality (shadows, skew, low resolution)</li>
        <li>Unusual fonts or decorative typography</li>
        <li>Non-Latin scripts (though modern OCR supports 100+ languages)</li>
        <li>Multi-column layouts where reading order is ambiguous</li>
      </ul>

      <h2>When Direct Extraction Fails on Digital PDFs</h2>
      <p>
        Sometimes a PDF looks digital but direct extraction produces garbled output — random
        characters, wrong letter ordering, or complete nonsense. This usually means the PDF uses
        <strong>custom font encoding</strong>. The creator embedded a font with non-standard
        character mappings, so the letter "A" might be stored internally as "7" or "◆".
      </p>
      <p>
        This is common with PDFs generated from InDesign, some accounting software, and
        government forms. When this happens, treat it like a scanned PDF and use OCR instead.
        The OCR engine reads the visual appearance of the characters, not the corrupted internal
        encoding.
      </p>

      <h2>Practical Decision Tree</h2>
      <table>
        <thead>
          <tr><th>Scenario</th><th>Method</th><th>Tool</th></tr>
        </thead>
        <tbody>
          <tr><td>PDF from Word/Docs/web</td><td>Direct extraction</td><td><a href="/pdf-to-text">PDF to Text</a></td></tr>
          <tr><td>Scanned document</td><td>OCR</td><td><a href="/ocr-pdf">OCR PDF</a></td></tr>
          <tr><td>Direct extraction gives garbage</td><td>OCR</td><td><a href="/ocr-pdf">OCR PDF</a></td></tr>
          <tr><td>Need to search within the PDF</td><td>Either (extract first, then Ctrl+F)</td><td><a href="/pdf-to-text">PDF to Text</a></td></tr>
          <tr><td>Foreign language document</td><td>OCR with language selection</td><td><a href="/ocr-pdf">OCR PDF</a></td></tr>
        </tbody>
      </table>

      <h2>Privacy Reminder</h2>
      <p>
        PDFs often contain sensitive content — contracts, medical records, financial statements.
        Before uploading to any tool, check whether it processes locally or uploads to a server.
        Both <a href="/pdf-to-text">Peregrine's text extraction</a> and
        <a href="/ocr-pdf">OCR tools</a> run entirely in your browser. Your documents never
        leave your device.
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
