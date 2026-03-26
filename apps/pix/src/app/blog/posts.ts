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
    slug: "jpeg-vs-png-vs-webp",
    title: "JPEG vs PNG vs WebP: Which Image Format Should You Use?",
    description:
      "A practical guide to choosing the right image format for every situation. Learn the strengths and trade-offs of JPEG, PNG, and WebP.",
    date: "2026-03-22",
    readingTime: "4 min read",
    relatedTools: [
      { name: "PNG to JPG", href: "/png-to-jpg" },
      { name: "JPG to WebP", href: "/jpg-to-webp" },
      { name: "WebP to JPG", href: "/webp-to-jpg" },
    ],
    content: `
      <p>
        Choosing the right image format can make or break your website's performance and visual
        quality. JPEG, PNG, and WebP each have distinct strengths, and using the wrong one means
        either bloated file sizes or unnecessary quality loss. Here's when to use each.
      </p>

      <h2>JPEG — The Photo Standard</h2>
      <p>
        JPEG (or JPG) has been the go-to format for photographs since the early web. It uses lossy
        compression, meaning it discards some visual data to achieve smaller file sizes. For photos,
        this trade-off is almost invisible to the human eye.
      </p>
      <p>
        <strong>Best for:</strong> photographs, social media images, email attachments, and any
        image where file size matters more than pixel-perfect accuracy. A typical photo compressed
        to quality 80 will look nearly identical to the original while being 60-80% smaller.
      </p>
      <p>
        <strong>Avoid when:</strong> you need transparency, sharp text overlays, or will re-edit
        the image repeatedly (each save degrades quality further).
      </p>

      <h2>PNG — Lossless and Transparent</h2>
      <p>
        PNG uses lossless compression — no data is discarded, ever. This makes it perfect for
        images where every pixel matters: logos, icons, screenshots, and graphics with text.
        PNG also supports full alpha transparency, letting you place images on any background.
      </p>
      <p>
        <strong>Best for:</strong> logos, icons, screenshots, illustrations, and any image requiring
        transparency. If you need to overlay an image on different backgrounds, PNG is the format
        to use.
      </p>
      <p>
        <strong>Avoid when:</strong> working with photographs. A PNG photo can be 5-10x larger than
        an equivalent JPEG with no visible quality improvement. Use a
        <a href="/png-to-jpg">PNG to JPG converter</a> to slim down photo-heavy pages.
      </p>

      <h2>WebP — The Modern All-Rounder</h2>
      <p>
        Developed by Google, WebP supports both lossy and lossless compression, plus transparency.
        It typically produces files 25-35% smaller than equivalent JPEG or PNG files with comparable
        quality. Browser support is now universal across Chrome, Firefox, Safari, and Edge.
      </p>
      <p>
        <strong>Best for:</strong> web performance. If your primary audience is on the web, WebP
        gives you smaller files without sacrificing quality. Convert your images with a
        <a href="/jpg-to-webp">JPG to WebP converter</a> for immediate performance gains.
      </p>
      <p>
        <strong>Avoid when:</strong> sharing images with people who may open them in older desktop
        software that lacks WebP support, or when your CMS does not accept WebP uploads.
      </p>

      <h2>Quick Decision Guide</h2>
      <table>
        <thead>
          <tr><th>Scenario</th><th>Best Format</th></tr>
        </thead>
        <tbody>
          <tr><td>Product photo for e-commerce</td><td>WebP (or JPEG fallback)</td></tr>
          <tr><td>Company logo</td><td>PNG (or SVG)</td></tr>
          <tr><td>Blog hero image</td><td>WebP or JPEG</td></tr>
          <tr><td>Screenshot for documentation</td><td>PNG</td></tr>
          <tr><td>Social media post</td><td>JPEG</td></tr>
          <tr><td>Icon or favicon</td><td>PNG</td></tr>
          <tr><td>Background with transparency</td><td>WebP or PNG</td></tr>
        </tbody>
      </table>

      <h2>The Bottom Line</h2>
      <p>
        For most web projects in 2026, WebP is the default choice — it's smaller, supports
        transparency, and works in every modern browser. Use JPEG when you need maximum
        compatibility with legacy systems, and PNG when you need lossless quality or transparency
        in contexts where WebP isn't supported. Converting between formats is instant with
        <a href="/">Peregrine Pix</a> — no upload, no sign-up, and your files stay on your device.
      </p>
    `,
  },
  {
    slug: "how-to-compress-images-for-web",
    title: "How to Compress Images for Web Without Losing Quality",
    description:
      "Learn proven techniques to reduce image file sizes by 50-80% while keeping them sharp and clear. No software installation needed.",
    date: "2026-03-19",
    readingTime: "4 min read",
    relatedTools: [
      { name: "Compress Image", href: "/compress-image" },
      { name: "Resize Image", href: "/resize-image" },
    ],
    content: `
      <p>
        Images are typically the heaviest assets on any webpage, often accounting for 50-70% of
        total page weight. Unoptimized images slow down load times, hurt search rankings, and
        frustrate users — especially on mobile. The good news: you can dramatically reduce image
        file sizes with little or no visible quality loss.
      </p>

      <h2>1. Resize Before You Compress</h2>
      <p>
        The single most effective step is to resize images to the dimensions they'll actually be
        displayed at. A 4000x3000 photo displayed at 800x600 on your website is wasting 95% of its
        pixels. Use a <a href="/resize-image">resize tool</a> to scale images to their target
        display size before compressing. This alone can reduce file size by 80% or more.
      </p>

      <h2>2. Choose the Right Format</h2>
      <p>
        Format choice has a massive impact on file size. For photographs, JPEG or WebP will be
        dramatically smaller than PNG. For graphics with flat colors and text, PNG is more
        efficient. WebP generally offers the best size-to-quality ratio for both types. Use a
        format converter to switch to the optimal format for each image.
      </p>

      <h2>3. Use Smart Lossy Compression</h2>
      <p>
        Modern compression algorithms can reduce file sizes by 50-80% with changes that are
        invisible to the human eye. The key is "smart" lossy compression — algorithms that
        selectively reduce detail in areas where the eye is least sensitive (smooth gradients,
        high-frequency noise) while preserving edges and important details.
      </p>
      <p>
        A quality setting of 75-85 is the sweet spot for most images. Below 70, compression
        artifacts become noticeable. Above 90, you're storing detail that no one can see. Try the
        <a href="/compress-image">Peregrine Pix compressor</a> with the quality slider to find
        the right balance for your images.
      </p>

      <h2>4. Strip Metadata</h2>
      <p>
        Photos from cameras and phones embed EXIF metadata — GPS coordinates, camera model,
        exposure settings, and sometimes thumbnail images. This metadata can add 10-50 KB per
        image. For web use, stripping metadata reduces file size and protects your privacy
        (no accidental location sharing). Most compression tools remove metadata automatically.
      </p>

      <h2>5. Serve Responsive Images</h2>
      <p>
        Don't serve the same large image to every device. Create multiple sizes and use the HTML
        <code>srcset</code> attribute to let browsers download only the size they need. A mobile
        phone on a 400px-wide viewport doesn't need a 2000px image. The
        <a href="/resize-image">resize tool</a> makes it easy to generate multiple sizes from a
        single source image.
      </p>

      <h2>Quick Compression Checklist</h2>
      <ul>
        <li><strong>Resize</strong> to actual display dimensions (not larger)</li>
        <li><strong>Convert</strong> to WebP for web use when possible</li>
        <li><strong>Compress</strong> at quality 75-85 for photos</li>
        <li><strong>Strip</strong> unnecessary metadata</li>
        <li><strong>Batch process</strong> all images at once to save time</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>
        For most people, the process is simple: drop your images into a
        <a href="/compress-image">free compression tool</a>, adjust the quality slider, and
        download the optimized versions. It takes seconds per image, works entirely in your
        browser, and typically cuts file sizes by 50-80%. Your site loads faster, your users are
        happier, and your hosting costs stay lower.
      </p>
    `,
  },
  {
    slug: "complete-guide-to-favicons",
    title: "The Complete Guide to Favicons in 2026",
    description:
      "Everything you need to know about favicons: sizes, formats, generation, and best practices for modern browsers and devices.",
    date: "2026-03-16",
    readingTime: "5 min read",
    relatedTools: [
      { name: "Favicon Generator", href: "/favicon-generator" },
      { name: "Resize Image", href: "/resize-image" },
      { name: "PNG to JPG", href: "/png-to-jpg" },
    ],
    content: `
      <p>
        Favicons are the small icons that appear in browser tabs, bookmarks, home screens, and
        search results. Despite their tiny size, they play a big role in brand recognition and
        professional appearance. Getting favicons right in 2026 means generating multiple sizes
        and formats to cover every platform. Here's everything you need to know.
      </p>

      <h2>What Sizes Do You Need?</h2>
      <p>
        Different platforms and devices expect different favicon sizes. Here are the essential ones:
      </p>
      <table>
        <thead>
          <tr><th>Size</th><th>Use Case</th></tr>
        </thead>
        <tbody>
          <tr><td>16x16</td><td>Browser tab (standard)</td></tr>
          <tr><td>32x32</td><td>Browser tab (Retina/HiDPI)</td></tr>
          <tr><td>48x48</td><td>Windows taskbar</td></tr>
          <tr><td>180x180</td><td>Apple Touch Icon (iOS home screen)</td></tr>
          <tr><td>192x192</td><td>Android Chrome (manifest icon)</td></tr>
          <tr><td>512x512</td><td>Android Chrome splash screen, PWA icon</td></tr>
        </tbody>
      </table>
      <p>
        At minimum, you need the 32x32 <code>favicon.ico</code> and the 180x180 Apple Touch Icon.
        For PWAs (Progressive Web Apps), include the 192x192 and 512x512 sizes in your web manifest.
      </p>

      <h2>Which Format Should You Use?</h2>
      <p>
        <strong>ICO:</strong> The classic format that supports multiple sizes in a single file.
        Place <code>favicon.ico</code> in your site root for maximum compatibility. Every browser
        supports it.
      </p>
      <p>
        <strong>PNG:</strong> The modern standard. Use PNG for Apple Touch Icons and web manifest
        icons. PNGs support transparency and are supported by all modern browsers.
      </p>
      <p>
        <strong>SVG:</strong> The newest option. SVG favicons scale perfectly to any size and
        support dark mode via CSS <code>prefers-color-scheme</code> media queries. Browser support
        is strong but not yet universal — always provide a PNG or ICO fallback.
      </p>

      <h2>How to Generate Favicons</h2>
      <p>
        The easiest approach is to start with a high-resolution source image (at least 512x512 PNG
        with a transparent background) and use a
        <a href="/favicon-generator">favicon generator</a> to produce all required sizes
        automatically. Upload your source image, and the tool creates every size you need in a
        single download.
      </p>
      <p>
        If your source is a photo or complex image, consider simplifying it first. Favicons are
        displayed at very small sizes, so detailed images become unreadable. Bold shapes, simple
        icons, and high-contrast colors work best.
      </p>

      <h2>Adding Favicons to Your Site</h2>
      <p>
        Place the following in your HTML <code>&lt;head&gt;</code>:
      </p>
      <ul>
        <li><code>&lt;link rel="icon" href="/favicon.ico" sizes="48x48"&gt;</code></li>
        <li><code>&lt;link rel="icon" href="/favicon.svg" type="image/svg+xml"&gt;</code> (if using SVG)</li>
        <li><code>&lt;link rel="apple-touch-icon" href="/apple-touch-icon.png"&gt;</code></li>
        <li>Reference 192x192 and 512x512 PNGs in your <code>manifest.json</code></li>
      </ul>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li><strong>Using only one size:</strong> A single 16x16 icon looks blurry on Retina displays and mobile home screens. Generate all required sizes.</li>
        <li><strong>Too much detail:</strong> Simplify your design. If it's not recognizable at 16x16 pixels, it won't work as a favicon.</li>
        <li><strong>No transparency:</strong> Most favicons benefit from a transparent background so they blend naturally with browser chrome.</li>
        <li><strong>Forgetting Apple Touch Icon:</strong> Without it, iOS uses a screenshot of your page for the home screen bookmark — not a great look.</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>
        Start with a clean, simple 512x512 PNG. Run it through a
        <a href="/favicon-generator">favicon generator</a> to get every size and format you need.
        Add the HTML tags, upload the files, and you're done. The whole process takes under a
        minute with <a href="/">Peregrine Pix</a> — no sign-up, no upload to external servers,
        and completely free.
      </p>
    `,
  },
  {
    slug: "resize-images-without-losing-quality",
    title: "How to Resize Images Without Losing Quality",
    description:
      "Resizing an image doesn't have to mean destroying it. Here's how downscaling, upscaling, and resampling actually work — and how to get sharp results every time.",
    date: "2026-03-25",
    readingTime: "5 min read",
    relatedTools: [
      { name: "Resize Image", href: "/resize-image" },
      { name: "Compress Image", href: "/compress-image" },
      { name: "Crop Image", href: "/crop-image" },
    ],
    content: `
      <p>
        "Resize this image to 800x600" sounds like a simple request. But depending on what
        your original image looks like and what you're resizing it to, the results can range
        from perfectly sharp to disturbingly blurry. Understanding why — and how to avoid the
        bad outcomes — takes about three minutes.
      </p>

      <h2>Downscaling: Almost Always Safe</h2>
      <p>
        Making an image smaller is the easy case. You're starting with more pixel data than you
        need and asking the computer to intelligently discard the excess. A 4000x3000 photo
        resized to 1200x900 will look nearly identical to the original — you simply can't see
        the missing pixels at the smaller size.
      </p>
      <p>
        The key word is "intelligently." The resampling algorithm matters. There are three
        common approaches:
      </p>
      <ul>
        <li>
          <strong>Nearest Neighbor</strong> — picks the closest pixel and drops the rest. Fast
          but jagged. Only use this for pixel art where you want hard edges preserved.
        </li>
        <li>
          <strong>Bilinear</strong> — averages neighboring pixels. Smooth results but can look
          slightly soft. Good for general use.
        </li>
        <li>
          <strong>Bicubic / Lanczos</strong> — samples a wider neighborhood of pixels with
          weighted math. The sharpest results for photographs. This is what professional tools
          and modern browsers use by default.
        </li>
      </ul>
      <p>
        When you use a <a href="/resize-image">resize tool</a>, it typically applies bicubic
        resampling automatically. You don't need to configure this — just enter your target
        dimensions and the algorithm handles the rest.
      </p>

      <h2>Upscaling: Here Be Dragons</h2>
      <p>
        Making an image larger is the hard case. You're asking the computer to invent pixel data
        that doesn't exist. A 400x300 image resized to 1600x1200 will always look worse than a
        photo that was originally shot at 1600x1200 — the detail simply isn't there.
      </p>
      <p>
        Traditional upscaling (bilinear/bicubic) smears pixels to fill the gaps, producing a
        soft, blurry result. The more you upscale, the worse it gets. Going from 400px to 800px
        (2x) is usually acceptable. Going from 400px to 1600px (4x) looks noticeably degraded.
        Going from 400px to 4000px (10x) looks like soup.
      </p>
      <p>
        <strong>Practical rule:</strong> if you need a larger image, always start with the
        largest source file available. Don't resize a thumbnail and expect poster quality.
      </p>

      <h2>The Aspect Ratio Trap</h2>
      <p>
        The most common resize mistake isn't the algorithm — it's distortion. If your original
        is 4:3 and you resize to 16:9 without cropping, the image stretches. Faces become wide,
        circles become ovals, and everything looks subtly wrong.
      </p>
      <p>
        Two ways to handle this:
      </p>
      <ul>
        <li>
          <strong>Lock aspect ratio</strong> — enter one dimension (width OR height) and let the
          tool calculate the other proportionally. Most resize tools have an "aspect ratio lock"
          toggle. Use it.
        </li>
        <li>
          <strong>Crop then resize</strong> — first <a href="/crop-image">crop the image</a> to
          your target aspect ratio, then resize it to your target dimensions. This gives you full
          control over what part of the image is kept.
        </li>
      </ul>

      <h2>Resize for Specific Use Cases</h2>
      <table>
        <thead>
          <tr><th>Use Case</th><th>Recommended Size</th><th>Format</th></tr>
        </thead>
        <tbody>
          <tr><td>Website hero image</td><td>1920x1080 or 1600x900</td><td>JPEG (80% quality) or WebP</td></tr>
          <tr><td>Blog post image</td><td>1200x630 (matches OG image spec)</td><td>JPEG or WebP</td></tr>
          <tr><td>Email header</td><td>600x200</td><td>JPEG or PNG</td></tr>
          <tr><td>Social media post</td><td>1080x1080 (square) or 1080x1350</td><td>JPEG</td></tr>
          <tr><td>Profile picture</td><td>400x400</td><td>JPEG or PNG</td></tr>
          <tr><td>Thumbnail</td><td>150x150 to 300x300</td><td>JPEG (70% quality)</td></tr>
          <tr><td>Print (300 DPI)</td><td>Width in inches × 300</td><td>TIFF or PNG</td></tr>
        </tbody>
      </table>

      <h2>Resize + Compress: The Winning Combination</h2>
      <p>
        Resizing alone reduces file size because there are fewer pixels. But for the smallest
        possible file, resize first, then <a href="/compress-image">compress the result</a>.
        A 4000x3000 photo at 5MB can become a 1200x900 image at 120KB — a 97% reduction —
        with no visible quality loss at the target display size.
      </p>
      <p>
        The order matters. Always resize first, compress second. Compressing a large image and
        then resizing it down wastes effort — you compressed pixels you're about to throw away.
      </p>
    `,
  },
  {
    slug: "remove-image-background-guide",
    title: "How to Remove Image Backgrounds: Techniques That Actually Work",
    description:
      "From simple solid-color backgrounds to complex hair-edge photos — here's what works, what doesn't, and when to use each approach.",
    date: "2026-03-23",
    readingTime: "6 min read",
    relatedTools: [
      { name: "Remove Background", href: "/remove-background" },
      { name: "Compress Image", href: "/compress-image" },
      { name: "PNG to JPG", href: "/png-to-jpg" },
    ],
    content: `
      <p>
        Removing the background from an image is one of those tasks that's either trivially easy
        or maddeningly difficult, depending on what's in the photo. A product on a white
        background? Three seconds. A person with wispy hair against a busy street scene? That's
        where things get interesting.
      </p>

      <h2>Why Background Removal Is Hard</h2>
      <p>
        At a fundamental level, removing a background means deciding, for every single pixel in
        the image, whether it belongs to the subject or the background. For most pixels this is
        obvious — the center of someone's face is clearly "subject," the sky behind them is
        clearly "background." The difficulty lives at the edges.
      </p>
      <p>
        Hair, fur, transparent objects (glasses, wine glasses), shadows, and motion blur all
        create pixels that are a blend of subject and background. These are the pixels that
        make or break the result. A crude removal tool draws a hard line and misses these
        transition pixels entirely. A good tool handles them with partial transparency.
      </p>

      <h2>Method 1: AI-Powered Automatic Removal</h2>
      <p>
        Modern background removal tools use machine learning models trained on millions of
        images. You upload a photo, the AI identifies the subject, and outputs a transparent
        PNG in seconds. No manual selection, no lasso tool, no edge refinement.
      </p>
      <p>
        <a href="/remove-background">Peregrine's background remover</a> works this way. For
        most common scenarios — portraits, product photos, pets, vehicles — the results are
        surprisingly good. The AI handles hair edges, semi-transparent areas, and complex
        outlines much better than you'd expect.
      </p>
      <p>
        <strong>Best for:</strong> portraits, product photos, animals, objects on reasonably
        distinct backgrounds.
      </p>
      <p>
        <strong>Struggles with:</strong> subjects that are the same color as the background,
        extremely fine details (individual hair strands), transparent or reflective objects.
      </p>

      <h2>Method 2: Manual Selection (Photoshop / GIMP)</h2>
      <p>
        For pixel-perfect results on difficult images, nothing beats manual selection with
        professional tools. Photoshop's "Select and Mask" workspace lets you paint over edges,
        adjust feathering, and preview the result against different backgrounds in real time.
      </p>
      <p>
        This produces the best results but takes 5-30 minutes per image. It's justified for
        commercial product photography, magazine covers, and professional compositing. It's
        overkill for a LinkedIn profile photo.
      </p>

      <h2>Method 3: Simple Color-Based Removal</h2>
      <p>
        If your image has a solid, uniform background color — a studio photo on pure white, a
        green screen shoot — you can remove it by simply deleting all pixels of that color.
        This is the "magic wand" approach. It's fast and perfect for controlled environments,
        but fails completely on natural photos where the background contains many colors.
      </p>

      <h2>After Removal: Choosing the Right Format</h2>
      <p>
        Once the background is gone, your image has transparency. This means you need to save
        it in a format that supports transparency:
      </p>
      <ul>
        <li>
          <strong>PNG</strong> — the standard choice. Supports full transparency with 256 levels
          of alpha per pixel. Larger file size. Use this for quality-critical work and when you
          need to composite the image later.
        </li>
        <li>
          <strong>WebP</strong> — modern web format. Supports transparency like PNG but at 25-35%
          smaller file sizes. Not supported in very old browsers but fine for everything built
          after 2020.
        </li>
      </ul>
      <p>
        Do NOT save a transparent image as JPEG. JPEG doesn't support transparency — the
        transparent areas will fill with white (or black, depending on the tool). If you need
        JPEG for a specific purpose, add a solid background color first, then
        <a href="/png-to-jpg">convert to JPG</a>.
      </p>

      <h2>Common Use Cases and Tips</h2>

      <h3>Product Photos for E-commerce</h3>
      <p>
        Amazon, Shopify, and most marketplaces require product images on pure white backgrounds.
        If you shot your product on white and it's not perfectly white (slightly gray, uneven
        lighting), AI removal + white background is actually better than trying to clean up the
        original.
      </p>

      <h3>Profile Pictures and Headshots</h3>
      <p>
        Remove the background, then either keep transparent (works well on most platforms) or
        add a subtle gradient or solid color. This creates a clean, professional look regardless
        of what was originally behind you.
      </p>

      <h3>Presentations and Marketing Materials</h3>
      <p>
        Cut out a person or product, place them on a branded background or alongside text. This
        is the classic use case for background removal — creating composite images where subjects
        from different photos coexist in one design.
      </p>

      <h2>File Size After Removal</h2>
      <p>
        Background removal often increases file size because PNG files with complex transparency
        data are larger than JPEGs. A 200KB JPEG portrait might become a 1.5MB PNG after
        background removal. If file size matters, <a href="/compress-image">compress the result</a>
        — you can typically reduce transparent PNGs by 40-60% without visible quality loss.
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
