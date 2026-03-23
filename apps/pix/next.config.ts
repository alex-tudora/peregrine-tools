import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  transpilePackages: ["@peregrine/ui", "@peregrine/seo"],
};

export default nextConfig;
