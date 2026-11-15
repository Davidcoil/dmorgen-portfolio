/* ============================================================================
 * פנייה מהאתר (טופס או צ'אט): אימות, נרמול טלפון ונוסח ההתראה לדוד.
 * פונקציות טהורות בלי ייבוא, כדי ש-node --test יריץ אותן ישירות (tests/lead.test.mjs).
 * ========================================================================== */

export interface Lead {
  source: "form" | "chat";
  name: string;
  phone: string;
  type: string;
  date: string;
  message: string;
  lang: string;
  page: string;
}

const LIMITS = { name: 80, phone: 30, type: 60, date: 20, message: 1500, page: 200 };

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** 0525555970 / 052-555-5970 / +972 52 555 5970 → 972525555970. null אם זה לא נראה כמו טלפון. */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "").replace(/^\+/, "");
  if (!/^\d{9,15}$/.test(digits)) return null;
  if (digits.startsWith("972")) return digits;
  if (digits.startsWith("0")) return "972" + digits.slice(1);
  return digits;
}

/** מחזיר פנייה תקינה, או null לבוט (מלכודת מלאה) או לקלט חסר. */
export function parseLead(body: unknown): { lead: Lead } | { bot: true } | { error: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  if (str(b.website, 200)) return { bot: true }; // honeypot: אנשים לא רואים את השדה הזה
  const phone = str(b.phone, LIMITS.phone);
  if (!normalizePhone(phone)) return { error: "phone" };
  return {
    lead: {
      source: b.source === "chat" ? "chat" : "form",
      name: str(b.name, LIMITS.name),
      phone,
      type: str(b.type, LIMITS.type),
      date: str(b.date, LIMITS.date),
      message: str(b.message, LIMITS.message),
      lang: b.lang === "en" ? "en" : "he",
      page: str(b.page, LIMITS.page),
    },
  };
}

/** נוסח ההודעה שמגיעה לדוד. בעברית תמיד, עם קישור ישיר לוואטסאפ של הפונה. */
export function formatLead(lead: Lead): string {
  const intl = normalizePhone(lead.phone);
  const lines = [
    lead.source === "chat" ? "📩 מספר שהושאר בצ'אט באתר" : "📩 פנייה חדשה מהטופס באתר",
    lead.name && `שם: ${lead.name}`,
    `טלפון: ${lead.phone}`,
    lead.type && `מה מצלמים: ${lead.type}`,
    lead.date && `תאריך משוער: ${lead.date}`,
    lead.message && `${lead.source === "chat" ? "מה נכתב בצ'אט" : "פרטים"}: ${lead.message}`,
    lead.lang === "en" && "שפה: אנגלית",
    lead.page && `עמוד: ${lead.page}`,
    intl && `\nלענות בוואטסאפ: https://wa.me/${intl}`,
    intl && `להתקשר: +${intl}`,
  ];
  return lines.filter(Boolean).join("\n");
}
