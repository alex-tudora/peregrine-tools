import type { NextConfig } from "next";
import { securityHeaders } from "@peregrine/config/headers";

const nextConfig: NextConfig = {
  trailingSlash: false,
  transpilePackages: ["@peregrine/ui", "@peregrine/seo"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...securityHeaders,
          // ffmpeg.wasm needs cross-origin isolation for SharedArrayBuffer.
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
