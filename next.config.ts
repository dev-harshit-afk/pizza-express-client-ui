import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "pizzaexpress-project-307946636387-ap-south-1-an.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
