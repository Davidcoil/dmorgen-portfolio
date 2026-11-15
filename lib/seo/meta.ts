import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";

/* מטא-דאטה לכל עמוד: canonical ו-hreflang לכתובת של העמוד עצמו (לא לדף הבית),
   ו-Open Graph עם הכותרת והכתובת של העמוד. Next מחליף את openGraph של ה-layout
   במלואו כשעמוד מגדיר אותו, לכן התמונה המשותפת נבנית כאן. */
export function pageMeta(
  locale: Locale,
  path: string, // "" לדף הבית, או "/about", "/galleries/events" וכו'
  title: string,
  description: string,
  siteName: string,
  imageAlt: string
): Metadata {
  const url = `/${locale}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { he: `/he${path}`, en: `/en${path}`, "x-default": `/he${path}` },
    },
    openGraph: {
      type: "website",
      url,
      locale: locale === "he" ? "he_IL" : "en_US",
      siteName,
      title,
      description,
      images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: imageAlt }],
    },
  };
}
