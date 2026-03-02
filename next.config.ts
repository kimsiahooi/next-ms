import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "laravel-assets-uploader.test",
        port: "",
        pathname: "/storage/uploads/**",
      },
    ],
  },
};

export default nextConfig;
