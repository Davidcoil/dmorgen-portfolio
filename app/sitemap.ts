import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { getRooms } from "@/lib/rooms/registry.ts";
import { gallerySlugs } from "@/lib/content/galleries";

/* מפת האתר נגזרת מהרישום: רק דלתות פתוחות, בשתי השפות. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dmorgen.com").replace(/\/$/, "");
  const now = new Date();
  return locales.flatMap((lang) => [
    ...getRooms()
      .filter((r) => r.door === "open")
      .map((r) => ({
        url: r.home ? `${base}/${lang}` : `${base}/${lang}/${r.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: r.home ? 1 : 0.8,
      })),
    ...gallerySlugs.map((s) => ({
      url: `${base}/${lang}/galleries/${s}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]);
}
