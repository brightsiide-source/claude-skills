import type { MetadataRoute } from "next";

const BASE = "https://doorhashnm.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/menu", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/delivery", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/how-to-order", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/locations", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/farm", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/rewards", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/vs", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/vs/top-crop", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/vs/mango", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/careers", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
