/* ============================================================================
 * JSON-LD. גרף אחד לכל האתר, עם מזהים קבועים (@id), כדי שגוגל ומנועי AI יבינו
 * שהאדם, העסק והאתר הם ישות אחת ולא שלוש:
 *   #website  WebSite
 *   #business ProfessionalService (העסק: שירותים, טלפון, אזור שירות)
 *   #david    Person (האדם שמאחורי העסק)
 * כללים: רק מה שמופיע באתר. בלי Review/AggregateRating על הודעות הלקוחות
 * (ביקורות שעסק מציג על עצמו לא זכאיות לכוכבים בגוגל). בלי מחיר עד שיוחלט.
 * sameAs נכנס רק לפרופיל שאומת שהוא של דוד.
 * ========================================================================== */

import type { Locale } from "@/lib/i18n/config";
import type { GalleryImage } from "@/lib/content/galleries";
import { gallerySlugs } from "@/lib/content/galleries";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { cleanSeoText } from "./text";

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
}

const PHONE = "+972525555970";
const ids = () => {
  const base = siteUrl();
  return { website: `${base}/#website`, business: `${base}/#business`, david: `${base}/#david` };
};

/** הגרף של האתר: נטען בכל עמוד מתוך ה-layout. */
export function siteGraphJsonLd({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const base = siteUrl();
  const id = ids();
  const he = lang === "he";
  const inLanguage = he ? "he-IL" : "en-US";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": id.website,
        url: `${base}/`,
        name: he ? "דוד מורגנשטרן" : "David Morgenstern",
        alternateName: he ? "David Morgenstern" : "דוד מורגנשטרן",
        inLanguage: ["he-IL", "en-US"],
        publisher: { "@id": id.business },
      },
      {
        "@type": "ProfessionalService",
        "@id": id.business,
        name: he ? "דוד מורגנשטרן, צילום" : "David Morgenstern Photography",
        alternateName: he ? "David Morgenstern Photography" : "דוד מורגנשטרן, צילום",
        description: cleanSeoText(dict.meta.description),
        url: `${base}/${lang}`,
        image: `${base}/images/og-cover.jpg`,
        telephone: PHONE,
        founder: { "@id": id.david },
        address: {
          "@type": "PostalAddress",
          addressLocality: he ? "ירושלים" : "Jerusalem",
          addressCountry: "IL",
        },
        areaServed: { "@type": "Country", name: he ? "ישראל" : "Israel" },
        availableLanguage: ["he", "en"],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE,
          contactType: "customer service",
          availableLanguage: ["he", "en"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: he ? "סוגי צילום" : "Photography services",
          itemListElement: gallerySlugs.map((slug) => {
            const c = dict.galleries.categories[slug];
            return {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: cleanSeoText(c.title),
                description: cleanSeoText(c.description),
                url: `${base}/${lang}/galleries/${slug}`,
                provider: { "@id": id.business },
                areaServed: { "@type": "Country", name: he ? "ישראל" : "Israel" },
              },
            };
          }),
        },
        inLanguage,
      },
      {
        "@type": "Person",
        "@id": id.david,
        name: he ? "דוד מורגנשטרן" : "David Morgenstern",
        alternateName: he ? "David Morgenstern" : "דוד מורגנשטרן",
        url: `${base}/${lang}/about`,
        image: `${base}/images/about-david-portrait.jpg`,
        jobTitle: he ? "צלם, כותב ובונה כלי AI" : "Photographer, copywriter and AI systems builder",
        description: cleanSeoText(dict.about.paragraphs[0]),
        worksFor: { "@id": id.business },
        homeLocation: { "@type": "City", name: he ? "ירושלים" : "Jerusalem" },
        knowsAbout: he
          ? ["צילום אירועים", "צילום בר מצווה", "צילום משפחה", "צילום פורטרטים", "צילום לעסקים", "קופירייטינג", "כלי AI"]
          : ["Event photography", "Bar Mitzvah photography", "Family photography", "Portrait photography", "Business photography", "Copywriting", "AI tools"],
      },
    ],
  };
}

interface ImageGalleryInput {
  lang: Locale;
  name: string;
  description: string;
  pagePath: string;
  images: GalleryImage[];
}

/** ImageGallery לעמודי קטגוריה. כל תמונה ImageObject עם קרדיט וזכויות. */
export function imageGalleryJsonLd({ lang, name, description, pagePath, images }: ImageGalleryInput) {
  const base = siteUrl();
  const creator = { "@id": ids().david };
  const inLanguage = lang === "he" ? "he-IL" : "en-US";
  const credit = lang === "he" ? "דוד מורגנשטרן" : "David Morgenstern";
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    description: cleanSeoText(description),
    inLanguage,
    url: `${base}${pagePath}`,
    creator,
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: `${base}${img.src}`,
      url: `${base}${pagePath}`,
      caption: img.alt[lang],
      creator,
      creditText: credit,
      copyrightNotice: `© ${credit}`,
      inLanguage,
    })),
  };
}

/** BreadcrumbList: [שם, נתיב] לפי הסדר. */
export function breadcrumbJsonLd(items: Array<[string, string]>) {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${base}${path}`,
    })),
  };
}

interface FaqItem {
  q: string;
  a: string;
}

/** FAQPage. גוגל מציג כמעט רק לאתרי ממשל ובריאות, אבל מנועי AI קוראים את המבנה. */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
