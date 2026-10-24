export function getRequiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

/** Public URL of the site (canonical links, sitemap, structured data). Read at runtime. */
export function getSiteUrl(): string {
  const url = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

