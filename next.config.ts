import type { NextConfig } from "next";

// next.config.js
const nextConfig = {
  reactStrictMode: true,
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
