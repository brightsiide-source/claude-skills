import type { MetadataRoute } from "next";

// Robots policy — allow traditional search bots AND AI crawlers explicitly.
// Why each:
//   GPTBot         — OpenAI / ChatGPT
//   ChatGPT-User   — ChatGPT browse-with-bing user agent
//   OAI-SearchBot  — OpenAI Search
//   ClaudeBot      — Anthropic / Claude
//   anthropic-ai   — Anthropic legacy UA
//   PerplexityBot  — Perplexity
//   Perplexity-User — Perplexity user-on-demand
//   Google-Extended — Google AI Overviews / Gemini grounding
//   GoogleOther    — Google AI training/research
//   Bingbot        — Bing + Copilot grounding
//   CCBot          — Common Crawl (training data)
//   Applebot       — Apple Intelligence
//   Applebot-Extended — Apple Intelligence training
//   Bytespider     — ByteDance / Doubao
//   DuckAssistBot  — DuckDuckGo
//   YouBot         — You.com
//   Meta-ExternalAgent — Meta AI / Llama training

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — allow all
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account/"],
      },
      // Explicit allow for AI crawlers (some default to disallow)
      ...[
        "GPTBot",
        "ChatGPT-User",
        "OAI-SearchBot",
        "ClaudeBot",
        "anthropic-ai",
        "PerplexityBot",
        "Perplexity-User",
        "Google-Extended",
        "GoogleOther",
        "Applebot",
        "Applebot-Extended",
        "CCBot",
        "Bytespider",
        "DuckAssistBot",
        "YouBot",
        "Meta-ExternalAgent",
        "FacebookBot",
        "Cohere-Ai",
        "Diffbot",
      ].map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: ["/api/", "/account/"],
      })),
    ],
    sitemap: "https://doorhashnm.com/sitemap.xml",
    host: "https://doorhashnm.com",
  };
}
