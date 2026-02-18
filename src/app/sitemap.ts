import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/env";

export default async function sitemap() {
  const base = getSiteUrl();
  const projects = await prisma.project.findMany({ select: { slug: true, updatedAt: true } });

  const staticRoutes = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/portfolio`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    { url: `${base}/legal`, lastModified: new Date() },
  ];

  const projectRoutes = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  return [...staticRoutes, ...projectRoutes];
}

