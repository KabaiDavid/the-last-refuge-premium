import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920, 2400],
    qualities: [70, 80],
  },
  async redirects() {
    // Preserve the old Squarespace URLs.
    return [
      { source: "/whiskey-list", destination: "/whiskey", permanent: true },
      { source: "/photos", destination: "/sanctuary", permanent: true },
      { source: "/contact", destination: "/visit", permanent: true },
      { source: "/gift-cards", destination: "https://swipeit.com/co-branded/merchant/the-last-refuge-11350", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
