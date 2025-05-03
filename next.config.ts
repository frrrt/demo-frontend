import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 852, 1704],
    imageSizes: [],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
      {
        protocol: "https",
        hostname: String(process.env.NEXT_PUBLIC_PAYLOAD_CMS_HOST).replace("https://", ""),
      },
    ],
    minimumCacheTTL: 2678400,
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/en-US",
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
