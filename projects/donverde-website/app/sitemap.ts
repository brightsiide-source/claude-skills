import type { MetadataRoute } from "next";
import { strains } from "@/content/strains";
import { cities } from "@/content/cities";
import { journalPosts } from "@/content/journal";

const BASE = "https://donverdefarms.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${BASE}/`, changeFrequency: "weekly", priority: 1.0 },
      { url: `${BASE}/strains`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${BASE}/the-farm`, changeFrequency: "monthly", priority: 0.85 },
      { url: `${BASE}/find-us`, changeFrequency: "weekly", priority: 0.85 },
      { url: `${BASE}/wholesale`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${BASE}/journal`, changeFrequency: "weekly", priority: 0.85 },
      { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${BASE}/lab-results`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
      { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 }
    ] as const
  ).map((r) => ({ ...r, lastModified: now }));

  const strainRoutes: MetadataRoute.Sitemap = strains.map((s) => ({
    url: `${BASE}/strains/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${BASE}/find-us/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map((p) => ({
    url: `${BASE}/journal/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticRoutes, ...strainRoutes, ...cityRoutes, ...journalRoutes];
}
