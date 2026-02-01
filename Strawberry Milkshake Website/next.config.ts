import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Disabled to support middleware
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
