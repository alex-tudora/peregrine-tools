import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@peregrine/ui", "@peregrine/seo"],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
