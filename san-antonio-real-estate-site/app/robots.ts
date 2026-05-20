import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/*?submitted=true"] },
      ...aiBots.map((agent) => ({ userAgent: agent, allow: "/" })),
    ],
    sitemap: "https://sacashhomebuyers.co/sitemap.xml",
  };
}
