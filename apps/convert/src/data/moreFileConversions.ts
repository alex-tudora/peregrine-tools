import type { ConversionDef } from "./conversions";

/**
 * Additional file-format conversions using existing tool components.
 *
 * These extend the original fileConversions array with more image, audio/video,
 * and text conversion pairs.
 */
export const moreFileConversions: ConversionDef[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // IMAGE — using ImageConverterTool
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "bmp-to-jpg",
    from: "BMP",
    to: "JPG",
    category: "image",
    toolName: "BMP to JPG Converter",
    description:
      "Convert BMP bitmap images to compact JPG format. Dramatically reduce file size while preserving visual quality — all in your browser.",
    keyword: "convert BMP to JPG",
    subtitle: "Shrink your BMP files by converting to JPG",
    componentKey: "ImageConverterTool",
    componentProps: { from: "BMP", to: "JPG", accept: [".bmp"], targetFormat: "jpeg", showQuality: true },
    acceptedExtensions: [".bmp"],
    howTo: [
      "Upload your BMP image.",
      "Adjust the quality slider to balance size and clarity.",
      "Download the compressed JPG file.",
    ],
    about:
      "<p>BMP (Bitmap) files are uncompressed and can be extremely large. Converting to JPG reduces file size by 90% or more while maintaining excellent visual quality. The conversion uses your browser's Canvas API — no data leaves your device.</p>",
    faqs: [
      { question: "How much smaller will the JPG be?", answer: "Typically 10-50x smaller. A 10 MB BMP photo might become 200-500 KB as JPG." },
      { question: "Will I lose quality?", answer: "JPG is lossy, so some quality is lost. At 85%+ quality settings, the difference is usually imperceptible." },
      { question: "Does BMP support transparency?", answer: "Some BMP variants do, but JPG does not. Transparent areas will be filled with white." },
    ],
    relatedSlugs: ["bmp-to-png", "jpg-to-png", "png-to-jpg"],
    requiresFFmpeg: false,
  },
  {
    slug: "bmp-to-png",
    from: "BMP",
    to: "PNG",
    category: "image",
    toolName: "BMP to PNG Converter",
    description:
      "Convert BMP images to lossless PNG format. Reduce file size while preserving every pixel — no quality loss.",
    keyword: "convert BMP to PNG",
    subtitle: "Convert your BMP to a smaller, lossless PNG",
    componentKey: "ImageConverterTool",
    componentProps: { from: "BMP", to: "PNG", accept: [".bmp"], targetFormat: "png", showQuality: false },
    acceptedExtensions: [".bmp"],
    howTo: [
      "Drop your BMP file onto the upload area.",
      "The conversion starts automatically.",
      "Download the lossless PNG result.",
    ],
    about:
      "<p>Converts uncompressed BMP images to PNG with lossless compression. PNG files are significantly smaller than BMP while preserving every pixel exactly. This is the ideal conversion when you need to reduce file size without any quality loss.</p>",
    faqs: [
      { question: "Is this conversion lossless?", answer: "Yes — PNG uses lossless compression. Every pixel is preserved exactly as in the BMP." },
      { question: "How much smaller will the PNG be?", answer: "Typically 3-10x smaller than BMP, depending on image content. Photos compress less; screenshots and graphics compress more." },
      { question: "Can I batch-convert?", answer: "Yes — drop multiple BMP files at once for batch conversion." },
    ],
    relatedSlugs: ["bmp-to-jpg", "png-to-jpg", "png-to-webp"],
    requiresFFmpeg: false,
  },
  {
    slug: "gif-to-png",
    from: "GIF",
    to: "PNG",
    category: "image",
    toolName: "GIF to PNG Converter",
    description:
      "Convert GIF images to lossless PNG format. Get better colour depth and transparency support — processed in your browser.",
    keyword: "convert GIF to PNG",
    subtitle: "Upgrade your GIF to full-colour PNG",
    componentKey: "ImageConverterTool",
    componentProps: { from: "GIF", to: "PNG", accept: [".gif"], targetFormat: "png", showQuality: false },
    acceptedExtensions: [".gif"],
    howTo: [
      "Upload your GIF image.",
      "The first frame is rendered to PNG automatically.",
      "Download the lossless PNG output.",
    ],
    about:
      "<p>Converts GIF images to PNG for better colour depth (24-bit vs 8-bit) and improved transparency. For animated GIFs, the first frame is extracted and converted. PNG is the better format for static images that need transparency.</p>",
    faqs: [
      { question: "What happens to animated GIFs?", answer: "The first frame of the animation is extracted and converted to PNG. The animation is not preserved." },
      { question: "Will the PNG be larger?", answer: "For simple graphics, PNG and GIF are similar in size. For complex images, PNG may be slightly larger but offers true 24-bit colour." },
      { question: "Is transparency preserved?", answer: "Yes — PNG supports alpha transparency, so GIF transparency carries over." },
    ],
    relatedSlugs: ["png-to-jpg", "png-to-webp", "jpg-to-png"],
    requiresFFmpeg: false,
  },
  {
    slug: "jpg-to-gif",
    from: "JPG",
    to: "GIF",
    category: "image",
    toolName: "JPG to GIF Converter",
    description:
      "Convert JPG images to GIF format. Create GIF-compatible images for legacy systems, email, and simple graphics.",
    keyword: "convert JPG to GIF",
    subtitle: "Convert your JPG photo to GIF format",
    componentKey: "ImageConverterTool",
    componentProps: { from: "JPG", to: "GIF", accept: [".jpg", ".jpeg"], targetFormat: "gif", showQuality: false },
    acceptedExtensions: [".jpg", ".jpeg"],
    howTo: [
      "Upload your JPG image.",
      "The image is converted to GIF automatically.",
      "Download the GIF result.",
    ],
    about:
      "<p>Converts JPEG images to GIF format. GIF uses an 8-bit colour palette (256 colours), so this is best for simple graphics and icons. Photos may lose some colour detail. The output is a static (non-animated) GIF.</p>",
    faqs: [
      { question: "Will my photo look different?", answer: "GIF is limited to 256 colours. Photos with smooth gradients may show visible banding. Simple graphics convert well." },
      { question: "Why would I want GIF instead of JPG?", answer: "GIF is useful for legacy email systems, simple web graphics, or when you need transparency support (though the original JPG has none)." },
      { question: "Can I create animated GIFs this way?", answer: "No — this creates static GIFs from JPG images. For animated GIFs from video, use the MP4 to GIF converter." },
    ],
    relatedSlugs: ["jpg-to-png", "jpg-to-webp", "mp4-to-gif"],
    requiresFFmpeg: false,
  },
  {
    slug: "tiff-to-jpg",
    from: "TIFF",
    to: "JPG",
    category: "image",
    toolName: "TIFF to JPG Converter",
    description:
      "Convert TIFF images to compact JPG for easy sharing and web use. Reduce large TIFF files to manageable sizes.",
    keyword: "convert TIFF to JPG",
    subtitle: "Compress your TIFF files to shareable JPGs",
    componentKey: "ImageConverterTool",
    componentProps: { from: "TIFF", to: "JPG", accept: [".tiff", ".tif"], targetFormat: "jpeg", showQuality: true },
    acceptedExtensions: [".tiff", ".tif"],
    howTo: [
      "Upload your TIFF file.",
      "Adjust the JPG quality slider.",
      "Download the compressed JPG.",
    ],
    about:
      "<p>TIFF files are commonly used in photography and scanning but are often very large and not web-friendly. Converting to JPG makes them easy to share, email, and use on websites. The browser renders the TIFF and re-encodes it as JPEG.</p>",
    faqs: [
      { question: "Why are TIFF files so large?", answer: "TIFF often stores uncompressed or losslessly compressed image data. A single high-resolution TIFF can be hundreds of megabytes." },
      { question: "Are all TIFF variants supported?", answer: "The browser handles common TIFF formats. Some specialised variants (CMYK, multi-page, 16-bit) may not render correctly in all browsers." },
      { question: "What quality setting should I use?", answer: "For photos: 80-85%. For scanned documents: 90%+. Lower values produce smaller files with more compression artefacts." },
    ],
    relatedSlugs: ["tiff-to-png", "jpg-to-png", "jpg-to-webp"],
    requiresFFmpeg: false,
  },
  {
    slug: "tiff-to-png",
    from: "TIFF",
    to: "PNG",
    category: "image",
    toolName: "TIFF to PNG Converter",
    description:
      "Convert TIFF images to lossless PNG. Preserve quality while making your images web-compatible and easier to share.",
    keyword: "convert TIFF to PNG",
    subtitle: "Turn your TIFF into a web-friendly PNG",
    componentKey: "ImageConverterTool",
    componentProps: { from: "TIFF", to: "PNG", accept: [".tiff", ".tif"], targetFormat: "png", showQuality: false },
    acceptedExtensions: [".tiff", ".tif"],
    howTo: [
      "Upload your TIFF file.",
      "The image is converted to lossless PNG automatically.",
      "Download the PNG output.",
    ],
    about:
      "<p>Converts TIFF images to PNG for web compatibility while preserving lossless quality. PNG files are universally supported and typically much smaller than TIFF. Ideal for scanned documents and high-quality graphics.</p>",
    faqs: [
      { question: "Is the conversion lossless?", answer: "Yes — PNG preserves every pixel from the rendered TIFF. No quality is lost." },
      { question: "Will the PNG be smaller than the TIFF?", answer: "Usually yes, especially for TIFF files with simple content. PNG uses efficient lossless compression." },
      { question: "Does this handle multi-page TIFFs?", answer: "The tool converts the first page. Multi-page TIFF support varies by browser." },
    ],
    relatedSlugs: ["tiff-to-jpg", "png-to-jpg", "png-to-webp"],
    requiresFFmpeg: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VIDEO & AUDIO — using FFmpegConverterTool
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "mp4-to-avi",
    from: "MP4",
    to: "AVI",
    category: "video",
    toolName: "MP4 to AVI Converter",
    description:
      "Convert MP4 video to AVI format for legacy software and devices. Browser-based conversion with FFmpeg WebAssembly.",
    keyword: "convert MP4 to AVI",
    subtitle: "Re-encode your MP4 as a classic AVI file",
    componentKey: "FFmpegConverterTool",
    componentProps: {
      accept: [".mp4"],
      ffmpegArgs: ["-c:v", "libx264", "-preset", "fast", "-crf", "23", "-c:a", "pcm_s16le"],
      outputExtension: "avi",
      outputMimeType: "video/x-msvideo",
      actionLabel: "Convert",
    },
    acceptedExtensions: [".mp4"],
    howTo: [
      "Upload your MP4 video file.",
      'Click "Convert" to begin processing.',
      "Wait for the conversion to complete.",
      "Download the AVI file.",
    ],
    about:
      "<p>Converts MP4 video to AVI (Audio Video Interleave) format using FFmpeg WebAssembly. AVI is an older container format still used by some legacy software, hardware players, and editing tools that don't support modern MP4.</p>",
    faqs: [
      { question: "Why convert to AVI?", answer: "Some older video editors, hardware players, and industrial systems only accept AVI. If your target device requires AVI, this tool handles the conversion." },
      { question: "Will the file be larger?", answer: "Usually yes — AVI with PCM audio is less efficient than MP4 with AAC. The video quality remains the same." },
      { question: "Is this processed locally?", answer: "Yes — FFmpeg runs in WebAssembly in your browser. No files are uploaded to any server." },
    ],
    relatedSlugs: ["avi-to-mp4", "mp4-to-webm", "mp4-to-mp3"],
    requiresFFmpeg: true,
  },
  {
    slug: "flv-to-mp4",
    from: "FLV",
    to: "MP4",
    category: "video",
    toolName: "FLV to MP4 Converter",
    description:
      "Convert Flash Video (FLV) files to modern MP4. Rescue old Flash videos and make them playable on any device.",
    keyword: "convert FLV to MP4",
    subtitle: "Modernise your Flash videos to universal MP4",
    componentKey: "FFmpegConverterTool",
    componentProps: {
      accept: [".flv"],
      ffmpegArgs: ["-c:v", "libx264", "-preset", "fast", "-crf", "23", "-c:a", "aac", "-b:a", "128k"],
      outputExtension: "mp4",
      outputMimeType: "video/mp4",
      actionLabel: "Convert",
    },
    acceptedExtensions: [".flv"],
    howTo: [
      "Upload your FLV file.",
      'Click "Convert" to re-encode as MP4.',
      "Download the modern MP4 video.",
    ],
    about:
      "<p>Flash Video (FLV) was the dominant web video format in the 2000s but is now obsolete since Adobe discontinued Flash. This tool converts FLV files to H.264 MP4, which plays everywhere — browsers, phones, and media players.</p>",
    faqs: [
      { question: "Are FLV files still used?", answer: "Rarely. Flash was discontinued in 2020. FLV files typically come from old archives, screen recordings, or downloaded web videos from the early internet era." },
      { question: "Will the quality be preserved?", answer: "The tool re-encodes at high quality (CRF 23). Since FLV was often low resolution, the MP4 will look identical to the original." },
      { question: "Can I convert large FLV files?", answer: "Browser memory is the limiting factor. Files up to a few hundred MB typically work fine." },
    ],
    relatedSlugs: ["avi-to-mp4", "mkv-to-mp4", "mov-to-mp4"],
    requiresFFmpeg: true,
  },
  {
    slug: "m4a-to-mp3",
    from: "M4A",
    to: "MP3",
    category: "audio",
    toolName: "M4A to MP3 Converter",
    description:
      "Convert M4A audio files to universal MP3 format. Perfect for Apple Music downloads, Voice Memos, and iTunes files.",
    keyword: "convert M4A to MP3",
    subtitle: "Turn your M4A audio into universally playable MP3",
    componentKey: "FFmpegConverterTool",
    componentProps: {
      accept: [".m4a"],
      ffmpegArgs: ["-vn", "-acodec", "libmp3lame", "-q:a", "2"],
      outputExtension: "mp3",
      outputMimeType: "audio/mpeg",
      actionLabel: "Convert",
    },
    acceptedExtensions: [".m4a"],
    howTo: [
      "Upload your M4A audio file.",
      'Click "Convert" to transcode to MP3.',
      "Download the MP3 result.",
    ],
    about:
      "<p>M4A is Apple's preferred audio format (AAC in an MP4 container). While excellent quality, not all devices and apps support it. This tool converts M4A to the universally supported MP3 format using FFmpeg's LAME encoder at high quality.</p>",
    faqs: [
      { question: "What is the difference between M4A and AAC?", answer: "They use the same codec. M4A is AAC audio in an MPEG-4 container. The tool handles both .m4a and .aac files." },
      { question: "Will I hear a difference?", answer: "At the default VBR quality (~190 kbps), the difference is inaudible for most listeners." },
      { question: "Does this work with Apple Voice Memos?", answer: "Yes — Voice Memos are saved as M4A files and convert perfectly." },
    ],
    relatedSlugs: ["aac-to-mp3", "wav-to-mp3", "flac-to-mp3"],
    requiresFFmpeg: true,
  },
  {
    slug: "ogg-to-wav",
    from: "OGG",
    to: "WAV",
    category: "audio",
    toolName: "OGG to WAV Converter",
    description:
      "Convert OGG Vorbis audio to uncompressed WAV. Get PCM audio for editing, production, or compatibility with any audio software.",
    keyword: "convert OGG to WAV",
    subtitle: "Decode your OGG audio to uncompressed WAV",
    componentKey: "FFmpegConverterTool",
    componentProps: {
      accept: [".ogg"],
      ffmpegArgs: ["-vn", "-acodec", "pcm_s16le"],
      outputExtension: "wav",
      outputMimeType: "audio/wav",
      actionLabel: "Convert",
    },
    acceptedExtensions: [".ogg"],
    howTo: [
      "Upload your OGG file.",
      'Click "Convert" to decode to WAV.',
      "Download the uncompressed WAV audio.",
    ],
    about:
      "<p>Decodes OGG Vorbis audio to uncompressed 16-bit PCM WAV. WAV is the most universally supported audio format for editing software, DAWs, and audio processing tools. Note that quality lost during OGG encoding cannot be recovered.</p>",
    faqs: [
      { question: "Will the WAV sound better than the OGG?", answer: "No — you cannot restore quality lost during OGG compression. The WAV is simply an uncompressed version of the same audio data." },
      { question: "Why is the WAV file so much larger?", answer: "WAV is uncompressed audio. A 3 MB OGG file might become 30+ MB as WAV. This is expected." },
      { question: "What sample rate is used?", answer: "The original sample rate from the OGG file is preserved." },
    ],
    relatedSlugs: ["ogg-to-mp3", "wav-to-mp3", "mp3-to-wav"],
    requiresFFmpeg: true,
  },
  {
    slug: "flac-to-wav",
    from: "FLAC",
    to: "WAV",
    category: "audio",
    toolName: "FLAC to WAV Converter",
    description:
      "Convert lossless FLAC audio to uncompressed WAV. Perfect for DAWs, audio editors, and systems that don't support FLAC.",
    keyword: "convert FLAC to WAV",
    subtitle: "Decompress your FLAC to universal WAV format",
    componentKey: "FFmpegConverterTool",
    componentProps: {
      accept: [".flac"],
      ffmpegArgs: ["-vn", "-acodec", "pcm_s16le"],
      outputExtension: "wav",
      outputMimeType: "audio/wav",
      actionLabel: "Convert",
    },
    acceptedExtensions: [".flac"],
    howTo: [
      "Upload your FLAC audio file.",
      'Click "Convert" to decompress to WAV.',
      "Download the uncompressed WAV.",
    ],
    about:
      "<p>FLAC and WAV are both lossless, so this conversion is truly lossless — no quality is lost. The difference is that WAV is uncompressed (larger files) but universally supported by every audio application, DAW, and operating system.</p>",
    faqs: [
      { question: "Is this conversion lossless?", answer: "Yes — both FLAC and WAV are lossless formats. The audio is bit-for-bit identical." },
      { question: "Why is the WAV larger?", answer: "FLAC uses lossless compression (like ZIP for audio). WAV stores raw uncompressed PCM data. The WAV will be 2-3x larger." },
      { question: "When should I use WAV over FLAC?", answer: "Use WAV when your software doesn't support FLAC, for CD burning, or when you need guaranteed compatibility with any audio tool." },
    ],
    relatedSlugs: ["flac-to-mp3", "wav-to-mp3", "mp3-to-wav"],
    requiresFFmpeg: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DATA/TEXT — using TextConverterTool
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "yaml-to-json",
    from: "YAML",
    to: "JSON",
    category: "data",
    toolName: "YAML to JSON Converter",
    description:
      "Convert YAML configuration files to JSON format. Supports nested objects, arrays, and common YAML features — all in the browser.",
    keyword: "convert YAML to JSON",
    subtitle: "Transform your YAML config into clean JSON",
    componentKey: "TextConverterTool",
    componentProps: {
      convertFn: "yamlToJson",
      inputLabel: "YAML Input",
      outputLabel: "JSON Output",
      placeholder: "name: John Doe\nage: 30\naddress:\n  city: London\n  country: UK\nhobbies:\n  - reading\n  - cycling",
      downloadExtension: "json",
      downloadMimeType: "application/json;charset=utf-8;",
    },
    acceptedExtensions: [".yaml", ".yml"],
    howTo: [
      "Paste your YAML content into the input area.",
      'Click "Convert" to generate JSON.',
      "Copy the result or download as a .json file.",
    ],
    about:
      '<p>Converts YAML (YAML Ain\'t Markup Language) to JSON. YAML is popular for configuration files (Docker, Kubernetes, CI/CD pipelines) while JSON is the standard for APIs and data interchange. This tool handles nested objects, arrays, strings, numbers, booleans, and null values.</p>',
    faqs: [
      { question: "What YAML features are supported?", answer: "Key-value pairs, nested objects, arrays (using - syntax), strings, numbers, booleans, and null values. Advanced features like anchors, aliases, and multi-line strings are not yet supported." },
      { question: "Can I convert JSON back to YAML?", answer: "Not with this tool currently. Use the JSON output and a YAML library in your preferred programming language." },
      { question: "Is this useful for Kubernetes configs?", answer: "Yes — many Kubernetes tools accept both YAML and JSON. Convert your YAML manifests to JSON for programmatic manipulation or API calls." },
    ],
    relatedSlugs: ["json-to-csv", "json-to-xml", "csv-to-json"],
    requiresFFmpeg: false,
  },
  {
    slug: "json-to-xml",
    from: "JSON",
    to: "XML",
    category: "data",
    toolName: "JSON to XML Converter",
    description:
      "Convert JSON data to well-formed XML. Generate XML from API responses, configuration data, and structured objects.",
    keyword: "convert JSON to XML",
    subtitle: "Transform your JSON into well-formed XML",
    componentKey: "TextConverterTool",
    componentProps: {
      convertFn: "jsonToXml",
      inputLabel: "JSON Input",
      outputLabel: "XML Output",
      placeholder: '{\n  "name": "John Doe",\n  "age": 30,\n  "address": {\n    "city": "London",\n    "country": "UK"\n  },\n  "hobbies": ["reading", "cycling"]\n}',
      downloadExtension: "xml",
      downloadMimeType: "application/xml;charset=utf-8;",
    },
    acceptedExtensions: [".json"],
    howTo: [
      "Paste your JSON in the input area.",
      'Click "Convert" to generate XML.',
      "Copy or download the well-formed XML output.",
    ],
    about:
      '<p>Converts JSON objects and arrays to well-formed XML with proper escaping. Objects become nested XML elements, arrays repeat the parent tag for each item, and special characters are escaped. The output includes an XML declaration and a root element.</p>',
    faqs: [
      { question: "How are JSON arrays converted?", answer: "Each array item is wrapped in a repeated element tag. For top-level arrays, each item becomes an <item> element under <root>." },
      { question: "Are special characters escaped?", answer: "Yes — characters like <, >, &, \", and ' are properly escaped to produce valid XML." },
      { question: "Can I customise the root element name?", answer: "Currently the root element is always <root>. Rename it in the output if needed." },
    ],
    relatedSlugs: ["yaml-to-json", "json-to-csv", "csv-to-json"],
    requiresFFmpeg: false,
  },
];
