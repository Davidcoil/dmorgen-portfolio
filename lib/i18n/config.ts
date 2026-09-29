/* ============================================================================
 * הגדרות שפות האתר
 * ----------------------------------------------------------------------------
 * עברית = שפת המקור וברירת המחדל (RTL).
 * אנגלית כבר רשומה כאן — הנתיבים ‎/en/…‎ עובדים מהיום הראשון.
 * להדלקה מלאה: למלא את lib/i18n/dictionaries/en.ts ולקשר מהתפריט. זהו.
 * ========================================================================== */

export const locales = ["he", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "he";

const rtlLocales: readonly Locale[] = ["he"];

/** האם השפה נכתבת מימין לשמאל (קובע את dir="" בתגית html) */
export const isRtlLocale = (locale: Locale): boolean =>
  rtlLocales.includes(locale);
