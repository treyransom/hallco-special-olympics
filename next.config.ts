import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { loader: "custom", loaderFile: "./src/lib/imageLoader.ts", deviceSizes: [480, 960, 1440, 1920], imageSizes: [96, 192, 320] },
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
