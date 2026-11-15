import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { gallerySlugs } from "@/lib/content/galleries";

/* מפת אתר דו-לשונית עם hreflang לכל כתובת.
   CONTENT_UPDATED: התאריך שבו התוכן הציבורי השתנה באמת (קופי V2 עלה 15.11.2026).
   מעדכנים ידנית כשמשנים תוכן, לא בכל פריסה. גוגל ובינג סומכים על lastmod רק כשהוא אמין.
   priority ו-changefreq הוסרו: גוגל מתעלם מהם. */
const CONTENT_UPDATED = new Date("2026-11-15");

const paths = ["", "/galleries", ...gallerySlugs.map((s) => `/galleries/${s}`), "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${base}/${lang}${path}`,
      lastModified: CONTENT_UPDATED,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
      },
    }))
  );
}
