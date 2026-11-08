/* ============================================================================
 * llms.txt / llms-full.txt — תקציר האתר בשפת מודלים (GEO).
 * התוכן נבנה מהמילון הקיים (he/en) ומכתובת האתר ממשתנה הסביבה —
 * כך הוא נשאר מסונכרן עם הקופי באתר, בלי לשכפל מחרוזות ובלי לקבע דומיין.
 * נמסר כ־route handler (app/llms.txt/route.ts) כי קובץ סטטי ב־public/
 * לא יכול לקרוא משתני סביבה.
 * ========================================================================== */

import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { getRooms } from "@/lib/rooms/registry.ts";
import { cleanSeoText } from "./text";

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dmorgen.com").replace(/\/$/, "");
}

/* החדרים, מהרישום: פתוחים עם קישור, סגורים כשורה אחת על מה יהיה שם. */
function pagesSection(base: string): string {
  return getRooms()
    .map((r) => {
      const url = r.home ? `${base}/he` : `${base}/he/${r.slug}`;
      const state = r.door === "open" ? "" : ` (${r.door})`;
      return `- [${r.name.he} / ${r.name.en}](${url})${state}: ${cleanSeoText(r.summary.en)}`;
    })
    .join("\n");
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

  return [
    "# David Morgenstern (דוד מורגנשטרן)",
    "",
    "> " + cleanSeoText(he.hero.title) + " " + cleanSeoText(he.hero.subtitle),
    "",
    cleanSeoText(he.meta.description),
    "",
    "David Morgenstern is a photographer, copywriter and AI systems builder based in Jerusalem, " +
      "working with families and businesses in Israel and abroad. " +
      "Known for the principle \"there are no unphotogenic people\" and the belief that a good photo starts with feeling good. " +
      cleanSeoText(en.meta.description),
    "",
    "## Services",
    ...categories,
    "- Company events, conferences, business portraits and photo content for businesses.",
    "- Family events only (Bar and Bat Mitzvah, brit ceremonies, birthdays), family sessions, portraits and business photography.",
    "- Also builds AI tools and writes copy for everything around the shoot, for his own studio and for businesses.",
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
    "## Rooms of the house (dmorgen.com is built as a house: open rooms, locked doors, rooms still being built)",
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
        `${base}/he/galleries`,
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
    "## What clients get",
    ...he.home.trustStrip.items.map(
      (item) => `- **${cleanSeoText(item.title)}**: ${cleanSeoText(item.text)}`
    ),
    "",
    "## For businesses",
    cleanSeoText(he.home.corporate.subtitle),
    ...he.home.corporate.services.map(
      (s) => `- **${cleanSeoText(s.title)}**: ${cleanSeoText(s.text)}`
    ),
    ...he.home.corporate.trustItems.map((t) => `- ${cleanSeoText(t)}`),
    "",
    "## Contact",
    cleanSeoText(he.contact.subtitle),
    "- Phone / WhatsApp: +972-52-555-5970",
    `- Booking: ${base}/he/contact`,
    "",
  ].join("\n");
}
