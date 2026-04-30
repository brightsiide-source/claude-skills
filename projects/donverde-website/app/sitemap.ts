import type { MetadataRoute } from "next";
import { strains } from "@/content/strains";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://donverdefarms.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/strains",
    "/the-farm",
    "/find-us",
    "/wholesale",
    "/contact"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8
  }));

  const strainRoutes: MetadataRoute.Sitemap = strains.map((s) => ({
    url: `${base}/strains/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticRoutes, ...strainRoutes];
}
