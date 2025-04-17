import type { NextConfig } from "next";

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

export default nextConfig;
