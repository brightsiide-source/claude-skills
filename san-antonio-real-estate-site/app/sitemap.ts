import type { MetadataRoute } from "next";

const BASE = "https://sacashhomebuyers.co";
const LASTMOD = new Date("2026-05-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/", changeFreq: "weekly", priority: 1.0 },
    // Brand pages
    { path: "/about", changeFreq: "monthly", priority: 0.7 },
    { path: "/how-it-works", changeFreq: "monthly", priority: 0.8 },
    { path: "/service-areas", changeFreq: "monthly", priority: 0.8 },
    { path: "/contact", changeFreq: "monthly", priority: 0.8 },
    { path: "/faq", changeFreq: "monthly", priority: 0.7 },
    // City pages
    { path: "/new-braunfels", changeFreq: "monthly", priority: 0.8 },
    { path: "/boerne", changeFreq: "monthly", priority: 0.7 },
    { path: "/schertz", changeFreq: "monthly", priority: 0.7 },
    { path: "/converse", changeFreq: "monthly", priority: 0.7 },
    { path: "/seguin", changeFreq: "monthly", priority: 0.7 },
    { path: "/helotes", changeFreq: "monthly", priority: 0.7 },
    // Situation pages
    { path: "/foreclosure", changeFreq: "monthly", priority: 0.9 },
    { path: "/inherited", changeFreq: "monthly", priority: 0.9 },
    { path: "/divorce", changeFreq: "monthly", priority: 0.8 },
    { path: "/as-is", changeFreq: "monthly", priority: 0.8 },
  ];

  return pages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: LASTMOD,
    changeFrequency: p.changeFreq,
    priority: p.priority,
  }));
}
