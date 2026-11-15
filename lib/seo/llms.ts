/* ============================================================================
 * llms.txt / llms-full.txt — תקציר האתר בשפת מודלים (GEO).
 * התוכן נבנה מהמילון הקיים (he/en) ומכתובת האתר ממשתנה הסביבה —
 * כך הוא נשאר מסונכרן עם הקופי באתר, בלי לשכפל מחרוזות ובלי לקבע דומיין.
 * נמסר כ־route handler (app/llms.txt/route.ts) כי קובץ סטטי ב־public/
 * לא יכול לקרוא משתני סביבה.
 * ========================================================================== */

import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { cleanSeoText } from "./text";

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
}

function pagesSection(base: string): string {
  const pages: Array<[string, string]> = [
    ["עמוד הבית (עברית)", `${base}/he`],
    ["Homepage (English)", `${base}/en`],
    ["עבודות", `${base}/he/galleries`],
    ["גלריית אירועים", `${base}/he/galleries/events`],
    ["גלריית משפחה וילדים", `${base}/he/galleries/family`],
    ["פורטרטים", `${base}/he/galleries/portraits`],
    ["תדמית לעסקים", `${base}/he/galleries/business`],
    ["על דוד", `${base}/he/about`],
    ["דברו איתי", `${base}/he/contact`],
    ["Portfolio (English)", `${base}/en/galleries`],
    ["About David (English)", `${base}/en/about`],
    ["Contact (English)", `${base}/en/contact`],
  ];
  return pages.map(([label, url]) => `- [${label}](${url})`).join("\n");
}

function faqSection(dict: Dictionary): string {
  return dict.faq.items
    .map((item) => `### ${cleanSeoText(item.q)}\n${cleanSeoText(item.a)}`)
    .join("\n\n");
}

/** גרסה קצרה — מה זה האתר, מה השירותים, איך יוצרים קשר. */
export async function buildLlmsTxt(): Promise<string> {
  const base = siteUrl();
  const he = await getDictionary("he");
  const en = await getDictionary("en");
  const categories = (Object.keys(he.galleries.categories) as Array<
    keyof typeof he.galleries.categories
  >).map((slug) => {
    const cat = he.galleries.categories[slug];
    return `- ${cleanSeoText(cat.title)}: ${cleanSeoText(cat.description)}`;
  });

  const categoriesEn = (Object.keys(en.galleries.categories) as Array<
    keyof typeof en.galleries.categories
  >).map((slug) => {
    const cat = en.galleries.categories[slug];
    return `- ${cleanSeoText(cat.title)}: ${cleanSeoText(cat.description)} ${base}/en/galleries/${slug}`;
  });

  return [
    "# David Morgenstern (דוד מורגנשטרן)",
    "",
    "> " + cleanSeoText(he.hero.title) + " " + cleanSeoText(he.hero.subtitle),
    "",
    cleanSeoText(he.meta.description),
    "",
    "David Morgenstern is a photographer, copywriter and AI systems builder based in Jerusalem, " +
      "photographing families, events, portraits and businesses across Israel, in Hebrew or English. " +
      "Known for the principle \"there are no unphotogenic people\" and the belief that a good photo starts with feeling good. " +
      cleanSeoText(en.meta.description),
    "",
    "## Services",
    ...categories,
    "",
    "## Services (English)",
    ...categoriesEn,
    "",
    "Photography is what can be booked through this site today. David also writes copy and builds AI tools, but these are not offered as public services on the site.",
    "Price: set per job once the needs are clear, in a written proposal that lists scope, deliverables and delivery date. There is no public price list.",
    "Today David photographs the jobs himself.",
    "",
    "## How it works",
    ...he.home.howItWorks.steps.map(
      (step, i) => `${i + 1}. ${cleanSeoText(step.title)}: ${cleanSeoText(step.text)}`
    ),
    "",
    "## Contact",
    "- Phone / WhatsApp: +972-52-555-5970",
    `- Website: ${base}`,
    "",
    "## Pages",
    pagesSection(base),
    "",
    "## FAQ",
    faqSection(he),
    "",
    "## FAQ (English)",
    faqSection(en),
    "",
  ].join("\n");
}

/** גרסה מלאה — תקציר מורחב של כל עמוד, לשאילתות עומק של מודלים. */
export async function buildLlmsFullTxt(): Promise<string> {
  const base = siteUrl();
  const he = await getDictionary("he");
  const en = await getDictionary("en");
  const short = await buildLlmsTxt();

  const categoryDetails = (
    Object.keys(he.galleries.categories) as Array<
      keyof typeof he.galleries.categories
    >
  )
    .map((slug) => {
      const cat = he.galleries.categories[slug];
      const catEn = en.galleries.categories[slug];
      return [
        `### ${cleanSeoText(cat.title)}`,
        `${cleanSeoText(cat.description)}`,
        `${cleanSeoText(catEn.title)}: ${cleanSeoText(catEn.description)}`,
        `${base}/he/galleries/${slug}`,
        "",
      ].join("\n");
    })
    .join("\n");

  return [
    short,
    "---",
    "",
    "# Full details",
    "",
    "## About David",
    ...he.about.paragraphs.map((p) => cleanSeoText(p)),
    "",
    ...he.about.values.map(
      (v) => `- **${cleanSeoText(v.title)}**: ${cleanSeoText(v.text)}`
    ),
    "",
    "## Galleries in detail",
    categoryDetails,
    "## How it works",
    ...he.home.howItWorks.steps.map(
      (item) => `- **${cleanSeoText(item.title)}**: ${cleanSeoText(item.text)}`
    ),
    "",
    "## For businesses",
    cleanSeoText(he.home.corporate.subtitle),
    ...he.home.corporate.services.map(
      (s) => `- **${cleanSeoText(s.title)}**: ${cleanSeoText(s.text)}`
    ),
    "",
    "## Contact",
    cleanSeoText(he.contact.subtitle),
    "- Phone / WhatsApp: +972-52-555-5970",
    `- Booking: ${base}/he/contact`,
    "",
  ].join("\n");
}
