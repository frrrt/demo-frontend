import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 852, 1704],
    imageSizes: [],
    domains: ["localhost", String(process.env.PAYLOAD_CMS_HOST)],
  },
};

export default nextConfig;
