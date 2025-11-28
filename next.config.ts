import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ilaw.or.th",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.geojson": {
        loaders: ["json-loader"],
        as: "*.json",
      },
    },
  },
};

export default nextConfig;
