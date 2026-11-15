import { normalizePhone } from "@/lib/lead";

/* ============================================================================
 * קבועים כלל־אתריים — נטענים ממשתני סביבה (Vercel) עם ערכי ברירת מחדל בטוחים.
 * ראה .env.example לרשימה המלאה.
 * ========================================================================== */

export const siteConfig = {
  /** מספר וואטסאפ בפורמט בינלאומי ללא + (למשל 972501234567) — לטופס קביעת תאריך.
   *  ברירת המחדל היא המספר העסקי הציבורי; משתנה הסביבה (Vercel) גובר עליה. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "972525555970",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "052-555-5970",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** כתובת אפליקציית בחירת התמונות ללקוחות */
  bchiraUrl: process.env.NEXT_PUBLIC_BCHIRA_URL ?? "https://bchira.app/",
};

/** בונה קישור wa.me עם הודעה מוכנה. מחזיר null אם המספר לא הוגדר. */
export function whatsappLink(message: string): string | null {
  if (!siteConfig.whatsappNumber) return null;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** קישור חיוג בינלאומי (tel:+972...), כדי שיעבוד גם ללקוחות מחו"ל. */
export function telHref(phone: string): string {
  const intl = normalizePhone(phone);
  return intl ? `tel:+${intl}` : `tel:${phone.replace(/[^+\d]/g, "")}`;
}
