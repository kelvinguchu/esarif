import type { NextConfig } from "next";

// Import next-pwa with require to avoid TypeScript import issues
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

// Define your Next.js config
const config: NextConfig = {
  reactStrictMode: true,
  /* other config options here */
  turbopack: {
    // Configure SVG support
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

// Export the config with PWA functionality using type assertion
export default withPWA(config) as NextConfig;
