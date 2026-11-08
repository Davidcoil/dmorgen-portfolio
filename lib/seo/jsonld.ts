/* ============================================================================
 * JSON-LD מובנה ל־SEO — מנועי חיפוש ומנועי AI קוראים את הסכמות האלה.
 * משלים את ה־alt העשיר שכבר קיים לכל תמונה (שלב 2) בהקשר סמנטי מלא.
 * ========================================================================== */

import type { Locale } from "@/lib/i18n/config";
import type { GalleryImage } from "@/lib/content/galleries";

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
}

interface ImageGalleryInput {
  lang: Locale;
  name: string;
  description: string;
  pagePath: string;
  images: GalleryImage[];
}

/** סכמת ImageGallery לעמודי קטגוריה — כל תמונה כ־ImageObject עם התיאור העשיר. */
export function imageGalleryJsonLd({ lang, name, description, pagePath, images }: ImageGalleryInput) {
  const base = siteUrl();
  const creator = {
    "@type": "ProfessionalService",
    name: "דוד מורגנשטרן",
    telephone: "+972525555970",
    url: `${base}/${lang}`,
  };
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    description,
    inLanguage: lang === "he" ? "he-IL" : "en-US",
    url: `${base}${pagePath}`,
    creator,
    datePublished: "2026-09-27",
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: `${base}${img.src}`,
      url: `${base}${pagePath}`,
      caption: img.alt[lang],
      description: img.alt[lang],
      creator,
      inLanguage: lang === "he" ? "he-IL" : "en-US",
    })),
  };
}

interface ProfessionalServiceInput {
  lang: Locale;
  name: string;
  description: string;
}

/** סכמת עסק — המנוף הגדול ל־local SEO ולציטוטים של מנועי AI. */
export function professionalServiceJsonLd({ lang, name, description }: ProfessionalServiceInput) {
  const base = siteUrl();
  const he = lang === "he";
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    description,
    url: `${base}/${lang}`,
    image: `${base}/images/og-cover.jpg`,
    telephone: "+972525555970",
    priceRange: "₪₪₪",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IL",
    },
    areaServed: {
      "@type": "Country",
      name: he ? "ישראל" : "Israel",
    },
    inLanguage: he ? "he-IL" : "en-US",
    knowsAbout: he
      ? ["צילום אירועים", "צילום משפחה", "צילום בר מצווה", "צילום פורטרטים", "צילום עסקי"]
      : [
          "Event photography",
          "Family photography",
          "Bar Mitzvah photography",
          "Portrait photography",
          "Business photography",
        ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+972525555970",
      contactType: "sales",
      availableLanguage: ["he", "en"],
    },
  };
}

interface PersonInput {
  lang: Locale;
  description: string;
}

/** סכמת Person לעמוד "האדם מאחורי המצלמה" — מי האדם מאחורי העסק. */
export function personJsonLd({ lang, description }: PersonInput) {
  const base = siteUrl();
  const he = lang === "he";
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "דוד מורגנשטרן",
    alternateName: "David Morgenstern",
    description,
    url: `${base}/${lang}/about`,
    image: `${base}/images/about-david-real.jpg`,
    telephone: "+972525555970",
    jobTitle: he ? "צלם אירועים ומשפחה" : "Events and family photographer",
    worksFor: {
      "@type": "ProfessionalService",
      name: "דוד מורגנשטרן",
      url: `${base}/${lang}`,
    },
    knowsAbout: he
      ? ["צילום אירועים", "צילום משפחה", "צילום בר מצווה"]
      : ["Event photography", "Family photography", "Bar Mitzvah photography"],
  };
}

interface FaqItem {
  q: string;
  a: string;
}

/** סכמת FAQPage — תוכן שעונה ישירות על שאלות; מנועי AI אוהבים לצטט אותו. */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
