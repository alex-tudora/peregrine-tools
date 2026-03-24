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
    slug: "how-to-compress-video-without-losing-quality",
    title: "How to Compress Video Without Losing Quality",
    description:
      "Learn the best techniques for reducing video file size while maintaining visual quality. Covers codecs, bitrate, resolution, and free tools.",
    date: "2026-03-20",
    readingTime: "4 min read",
    relatedTools: [
      { name: "Compress Video", href: "/compress-video" },
      { name: "Convert to MP4", href: "/convert-to-mp4" },
    ],
    content: `
      <p>
        Video files are notoriously large. A single minute of 1080p footage can easily weigh in at
        100 MB or more, making it painful to share via email, upload to the web, or store on your
        device. The good news? You can dramatically reduce video file size without any visible loss
        in quality — if you know which levers to pull.
      </p>

      <h2>Understanding Video Compression</h2>
      <p>
        Video compression works by removing redundant data. There are two types:
        <strong>lossless</strong> (no quality loss, modest size reduction) and
        <strong>lossy</strong> (some data discarded, much smaller files). For most practical
        purposes, lossy compression with the right settings is indistinguishable from the original.
      </p>

      <h2>Choose the Right Codec</h2>
      <p>
        The codec is the algorithm that compresses your video. <strong>H.264</strong> is the most
        widely compatible codec and offers excellent compression. <strong>H.265 (HEVC)</strong>
        delivers roughly 50% better compression than H.264 at the same quality, but not all
        devices and browsers support it yet. For web use, <strong>VP9</strong> (used in WebM)
        is another excellent choice with broad browser support.
      </p>

      <h2>Lower the Bitrate Intelligently</h2>
      <p>
        Bitrate is the amount of data used per second of video. A 1080p video at 8 Mbps looks
        nearly identical to one at 20 Mbps for most content, but the file is 60% smaller.
        The key is to use <strong>variable bitrate (VBR)</strong> encoding, which allocates more
        data to complex scenes and less to simple ones — giving you the best quality per byte.
      </p>

      <h2>Scale the Resolution</h2>
      <p>
        If your video is 4K but will only be viewed on phones or embedded in a website, downscaling
        to 1080p or even 720p can cut file size by 50-75% with no perceived quality loss at
        typical viewing distances. Always match the resolution to the intended viewing context.
      </p>

      <h2>Use a Browser-Based Compressor</h2>
      <p>
        The easiest approach for most people is to use a browser-based tool like
        <a href="/compress-video">Peregrine Vid's Compress Video</a>. Drop your file in, choose
        a compression level, and download the result — all without uploading to any server. Your
        file stays on your device the entire time.
      </p>
      <p>
        For videos that are already in a suboptimal container format, converting to
        <a href="/convert-to-mp4">MP4 with H.264</a> often reduces file size on its own, since
        MP4 is one of the most efficient containers available.
      </p>

      <h2>The Bottom Line</h2>
      <p>
        For most videos, simply running them through a
        <a href="/compress-video">free compression tool</a> at medium quality will cut file size
        by 40-70% with no visible difference. No software to install, no account needed, and your
        files never leave your device.
      </p>
    `,
  },
  {
    slug: "extract-audio-from-video",
    title: "How to Extract Audio from Any Video File",
    description:
      "Step-by-step guide to pulling audio tracks from video files. Covers MP3 vs WAV, quality settings, and when to use each format.",
    date: "2026-03-18",
    readingTime: "4 min read",
    relatedTools: [
      { name: "Extract Audio", href: "/extract-audio" },
      { name: "Video to MP3", href: "/video-to-mp3" },
      { name: "Convert to MP3", href: "/convert-to-mp3" },
    ],
    content: `
      <p>
        Whether you want to grab the soundtrack from a concert video, pull dialogue from a lecture
        recording, or extract a voiceover from a presentation — extracting audio from video is one
        of the most common media tasks. Here's everything you need to know.
      </p>

      <h2>The Quick Method (30 Seconds)</h2>
      <ol>
        <li>Open an <a href="/extract-audio">audio extraction tool</a></li>
        <li>Drop your video file into the upload area</li>
        <li>Choose your output format (MP3, WAV, or other)</li>
        <li>Click "Extract" and download the audio file</li>
      </ol>
      <p>
        The entire process happens in your browser — no upload to any server, no account needed,
        no watermarks. The extracted audio preserves the original quality of the video's audio track.
      </p>

      <h2>MP3 vs WAV: Which Format Should You Choose?</h2>
      <h3>MP3 — Best for Sharing and Storage</h3>
      <p>
        MP3 is a lossy format that compresses audio significantly. A 3-minute song in MP3 at
        192 kbps is about 4 MB, compared to 30 MB for WAV. Use MP3 when file size matters —
        podcasts, background music, voice memos, or anything you'll share online. At 192 kbps
        or higher, most listeners can't tell the difference from the original.
      </p>

      <h3>WAV — Best for Editing and Quality</h3>
      <p>
        WAV is uncompressed, lossless audio. Every bit of the original sound is preserved. Use
        WAV when you plan to edit the audio further (mixing, effects, mastering) or when you
        need archival quality. The trade-off is much larger file sizes.
      </p>

      <h2>Direct Conversion vs Extraction</h2>
      <p>
        There's an important distinction: <strong>extraction</strong> pulls the existing audio
        stream from the video without re-encoding it, preserving the original quality.
        <strong>Conversion</strong> decodes the audio and re-encodes it into a new format, which
        can introduce minor quality loss but gives you control over the output format and bitrate.
      </p>
      <p>
        If you specifically need an MP3 file, use a <a href="/video-to-mp3">Video to MP3
        converter</a>. If you want the audio in its original format with no quality loss,
        use the <a href="/extract-audio">Extract Audio tool</a>.
      </p>

      <h2>Tips for Best Results</h2>
      <ul>
        <li><strong>Check the source quality first:</strong> Extracting audio from a low-quality video won't magically improve it. The output quality is limited by the input.</li>
        <li><strong>Trim before extracting:</strong> If you only need a portion of the audio, <a href="/trim-video">trim the video</a> first to save time and get a smaller output file.</li>
        <li><strong>Use 192 kbps or higher for MP3:</strong> Lower bitrates save space but can introduce audible artifacts, especially in music.</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>
        Extracting audio from video takes seconds with a browser-based tool. Choose MP3 for small,
        shareable files and WAV for lossless editing quality. No software to install, no sign-up,
        and your files stay completely private on your device.
      </p>
    `,
  },
  {
    slug: "mp4-vs-webm-vs-mov",
    title: "MP4 vs WebM vs MOV: Video Format Guide",
    description:
      "A clear guide to the three most common video formats. Learn the differences, when to use each, and how to convert between them.",
    date: "2026-03-15",
    readingTime: "4 min read",
    relatedTools: [
      { name: "Convert to MP4", href: "/convert-to-mp4" },
      { name: "Video to WebM", href: "/video-to-webm" },
      { name: "Compress Video", href: "/compress-video" },
    ],
    content: `
      <p>
        Choosing the right video format can be confusing. MP4, WebM, and MOV are the three formats
        you'll encounter most often, and each has distinct strengths. Here's a practical guide to
        help you pick the right one for every situation.
      </p>

      <h2>MP4 — The Universal Standard</h2>
      <p>
        <strong>Container:</strong> MPEG-4 Part 14<br/>
        <strong>Typical codecs:</strong> H.264 (video), AAC (audio)<br/>
        <strong>Best for:</strong> Almost everything
      </p>
      <p>
        MP4 is the most widely supported video format in existence. It plays on every smartphone,
        tablet, computer, smart TV, and web browser. It's the default format for YouTube uploads,
        social media, and most video streaming platforms. When in doubt, use MP4.
      </p>
      <ul>
        <li>Universal compatibility across all devices and platforms</li>
        <li>Excellent compression with H.264 codec</li>
        <li>Supports subtitles, chapters, and metadata</li>
        <li>Ideal for sharing, streaming, and archiving</li>
      </ul>

      <h2>WebM — Built for the Web</h2>
      <p>
        <strong>Container:</strong> WebM (based on Matroska)<br/>
        <strong>Typical codecs:</strong> VP9 or AV1 (video), Opus (audio)<br/>
        <strong>Best for:</strong> Web embedding and HTML5 video
      </p>
      <p>
        WebM was developed by Google specifically for web use. It offers excellent compression —
        often better than MP4 at the same quality — and is royalty-free. All modern browsers
        support WebM, making it ideal for websites that need fast-loading video.
      </p>
      <ul>
        <li>Smaller file sizes than MP4 at equivalent quality (with VP9/AV1)</li>
        <li>Royalty-free — no licensing costs for web publishers</li>
        <li>Excellent browser support (Chrome, Firefox, Edge, Safari 16+)</li>
        <li>Limited support on older devices and some media players</li>
      </ul>

      <h2>MOV — Apple's Professional Format</h2>
      <p>
        <strong>Container:</strong> QuickTime File Format<br/>
        <strong>Typical codecs:</strong> H.264 or ProRes (video), AAC (audio)<br/>
        <strong>Best for:</strong> Apple ecosystem and professional video editing
      </p>
      <p>
        MOV is Apple's native video container. It supports high-quality codecs like ProRes that
        are standard in professional video production. If you're editing in Final Cut Pro or
        working within the Apple ecosystem, MOV is a natural choice.
      </p>
      <ul>
        <li>Native support on macOS and iOS</li>
        <li>Supports professional codecs like ProRes</li>
        <li>Larger file sizes than MP4 for the same content</li>
        <li>Limited compatibility on Windows and Android without extra software</li>
      </ul>

      <h2>Quick Decision Guide</h2>
      <table>
        <thead>
          <tr><th>Scenario</th><th>Best Format</th></tr>
        </thead>
        <tbody>
          <tr><td>Sharing on social media</td><td>MP4</td></tr>
          <tr><td>Embedding on a website</td><td>WebM (with MP4 fallback)</td></tr>
          <tr><td>Sending via email or messaging</td><td>MP4</td></tr>
          <tr><td>Professional video editing</td><td>MOV (ProRes)</td></tr>
          <tr><td>YouTube / Vimeo upload</td><td>MP4</td></tr>
          <tr><td>Archiving footage</td><td>MP4 or MOV</td></tr>
          <tr><td>Web performance optimization</td><td>WebM (AV1)</td></tr>
          <tr><td>Cross-platform compatibility</td><td>MP4</td></tr>
        </tbody>
      </table>

      <h2>Converting Between Formats</h2>
      <p>
        Need to convert? Here are the most common scenarios:
      </p>
      <ul>
        <li><strong>MOV to MP4:</strong> Use a <a href="/convert-to-mp4">Convert to MP4 tool</a> to make your Apple videos universally compatible. This is the most common conversion people need.</li>
        <li><strong>MP4 to WebM:</strong> Use a <a href="/video-to-webm">Video to WebM converter</a> when you need smaller files for web embedding.</li>
        <li><strong>Any format to MP4:</strong> When in doubt, <a href="/convert-to-mp4">converting to MP4</a> is almost always the right move for maximum compatibility.</li>
      </ul>

      <p>
        All conversions can be done instantly in your browser with
        <a href="/">Peregrine Vid</a> — no sign-up, no upload, completely free.
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
