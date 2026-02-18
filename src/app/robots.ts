import { getSiteUrl } from "@/lib/env";

export default function robots() {
  const base = getSiteUrl();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}

