import type { NextConfig } from "next";
import { securityHeaders } from "@peregrine/config/headers";

const nextConfig: NextConfig = {
  trailingSlash: false,
  transpilePackages: ["@peregrine/ui", "@peregrine/seo"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
