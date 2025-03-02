import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 852, 1704],
    imageSizes: [],
    domains: [
      "localhost",
      String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST).replace("https://", ""),
    ],
  },
};

export default nextConfig;
