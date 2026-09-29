import type { Locale } from "./config";

/* טעינה עצלה של מילון לפי שפה — כל שפה נטענת רק כשהיא נצרכת בפועל. */
const dictionaries = {
  he: () => import("./dictionaries/he").then((m) => m.he),
  en: () => import("./dictionaries/en").then((m) => m.en),
} as const;

export const getDictionary = (locale: Locale) => dictionaries[locale]();
