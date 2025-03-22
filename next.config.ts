import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",   // wildcard for ANY domain
        port: "",
        pathname: "/**",  // wildcard for all paths
      },
    ],
  },
};

export default nextConfig;
