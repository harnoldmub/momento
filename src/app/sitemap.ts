import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const projects = await prisma.project.findMany({ select: { slug: true, updatedAt: true } });
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/portfolio/mariages`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio/save_the_date`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
