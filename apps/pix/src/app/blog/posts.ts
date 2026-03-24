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
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}
