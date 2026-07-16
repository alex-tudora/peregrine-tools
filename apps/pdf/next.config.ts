import type { NextConfig } from "next";
import { securityHeaders } from "@peregrine/config/headers";

const nextConfig: NextConfig = {
  trailingSlash: false,
  transpilePackages: ["@peregrine/ui", "@peregrine/seo"],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
