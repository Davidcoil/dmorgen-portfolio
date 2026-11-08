import type { MetadataRoute } from "next";

/* זחלני AI מפורשים — חלקם מתעלמים מכלל "*" כללי, אז מציינים כל אחד בנפרד.
   האתר פתוח לקריאה מלאה: אין חסימות, אין דפי התחברות. */
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Applebot-Extended",
  "Meta-WebIndexer",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(
    /\/$/,
    ""
  );
  return {
    rules: [
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
