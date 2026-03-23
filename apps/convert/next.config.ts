import type { NextConfig } from "next";

const ffmpegRoutes =
  "/(mp4-to-mp3|mp4-to-gif|mp4-to-webm|avi-to-mp4|mov-to-mp4|mkv-to-mp4|webm-to-mp4|wav-to-mp3|mp3-to-wav|ogg-to-mp3|flac-to-mp3|aac-to-mp3)";

const nextConfig: NextConfig = {
  trailingSlash: false,
  transpilePackages: ["@peregrine/ui", "@peregrine/seo", "@peregrine/converters"],
  webpack: (config) => {
    // pdfjs-dist tries to require('canvas') in node — alias it away
    config.resolve.alias.canvas = false;
    return config;
  },
  async headers() {
    return [
      {
        source: ffmpegRoutes,
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
