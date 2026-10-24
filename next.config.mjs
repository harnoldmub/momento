/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Admin can add images by URL from any HTTPS host.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    // Disable caching in dev only (Replit preview proxy); production keeps Next defaults.
    if (process.env.NODE_ENV === "production") return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
