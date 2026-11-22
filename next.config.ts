import type { NextConfig } from "next";

/**
 * Static export for Cloudflare Pages: `npm run build` writes the complete
 * site to `out/`.
 * - Images: pre-rendered at build (scripts/optimize-images.mjs) and served
 *   through a custom loader, because the runtime optimizer needs a server.
 * - Redirects and cache headers live in public/_redirects and public/_headers,
 *   which Cloudflare Pages applies natively.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Keep in sync with WIDTHS in scripts/optimize-images.mjs.
    deviceSizes: [390, 640, 828, 1080, 1440, 1920, 2400],
    imageSizes: [256, 384],
  },
};

export default nextConfig;
