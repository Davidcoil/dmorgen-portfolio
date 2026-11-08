import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

/* מפת אתר דו־לשונית — נבנית אוטומטית לכל שפה. */
const LAST_MODIFIED = new Date("2026-09-27");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(
    /\/$/,
    ""
  );

  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/galleries", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/galleries/events", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/galleries/family", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/galleries/portraits", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/galleries/business", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" as const },
  ];

  const now = LAST_MODIFIED;
  return locales.flatMap((lang) =>
    routes.map((r) => ({
      url: `${base}/${lang}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    }))
  );
}
