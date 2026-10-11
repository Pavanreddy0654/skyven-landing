import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Hide the "N" dev-tools badge while developing (it never appears in production); errors still show
  devIndicators: false,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    // YouTube thumbnails, used as video posters when no local poster exists (§5.7)
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
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
