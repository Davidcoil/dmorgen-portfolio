/* ============================================================================
 * פנייה מהאתר (טופס או צ'אט): אימות, נרמול טלפון, זיהוי מקור, ונוסח ההתראה לדוד.
 * פונקציות טהורות בלי ייבוא, כדי ש-node --test יריץ אותן ישירות (tests/lead.test.mjs).
 * ========================================================================== */

/** מאיפה המבקר הגיע לאתר. נאסף בדפדפן שלו (lib/attribution.ts) ונשלח רק עם הפנייה. */
export interface Attribution {
  referrer: string;
  landing: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  firstSeen: string;
}

/** מה השרת יודע על הבקשה (כותרות Vercel), לא מה שהמבקר שלח. */
export interface LeadContext {
  country?: string;
  city?: string;
  userAgent?: string;
  now?: Date;
}

export interface Lead {
  id: string;
  receivedAt: string;
  source: "form" | "chat";
  name: string;
  phone: string;
  type: string;
  date: string;
  message: string;
  lang: "he" | "en";
  page: string;
  origin: string;
  attribution: Attribution;
  country: string;
  city: string;
  device: string;
}

const LIMITS = { name: 80, phone: 30, type: 60, date: 20, message: 1500, page: 200, attr: 300 };
const ATTR_KEYS = [
  "referrer", "landing", "utm_source", "utm_medium", "utm_campaign",
  "utm_term", "utm_content", "gclid", "fbclid", "firstSeen",
] as const;

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

function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** תווית אנושית למקור. כלי AI ראשונים: זה המדד לאסטרטגיה ש-AI ימליץ על דוד. */
export function classifySource(a: Partial<Attribution>): string {
  const src = (a.utm_source ?? "").toLowerCase();
  const med = (a.utm_medium ?? "").toLowerCase();
  const h = host(a.referrer ?? "");
  const any = (...needles: string[]) => needles.some((n) => h.includes(n) || src.includes(n));

  if (any("chatgpt", "openai")) return "ChatGPT";
  if (any("perplexity")) return "Perplexity";
  if (any("gemini.google", "bard.google") || src === "gemini") return "Gemini";
  if (any("claude.ai") || src === "claude") return "Claude";
  if (any("copilot.microsoft", "copilot")) return "Copilot";
  if (a.gclid || ((src === "google" || h.startsWith("google.")) && /cpc|ppc|paid/.test(med))) return "גוגל ממומן";
  if (a.fbclid || any("facebook", "instagram", "fb.com", "l.facebook")) {
    return any("instagram") ? "אינסטגרם" : "פייסבוק";
  }
  if (any("wa.me", "whatsapp")) return "וואטסאפ";
  if (any("t.me", "telegram")) return "טלגרם";
  if (h.startsWith("google.") || h.includes(".google.") || src === "google") return "גוגל (חיפוש)";
  if (any("bing.com", "duckduckgo")) return "חיפוש (Bing/DuckDuckGo)";
  if (any("youtube")) return "יוטיוב";
  if (any("linkedin", "lnkd.in")) return "לינקדאין";
  if (src) return a.utm_source!;
  if (h && !h.endsWith("dmorgen.com")) return h;
  return "ישיר (הקלידו כתובת, סימנייה או קישור בלי מקור)";
}

let seq = 0;
function makeId(now: Date): string {
  const d = now.toISOString().slice(0, 10).replace(/-/g, "");
  const r = (Math.random().toString(36).slice(2, 6) + (seq++).toString(36)).slice(0, 5);
  return `L-${d}-${r}`;
}

function deviceOf(ua: string): string {
  if (/ipad|tablet/i.test(ua)) return "טאבלט";
  if (/mobi|android|iphone/i.test(ua)) return "טלפון";
  return ua ? "מחשב" : "";
}

/** מחזיר פנייה תקינה, או סימון לבוט (מלכודת מלאה), או שגיאה לקלט חסר. */
export function parseLead(
  body: unknown,
  ctx: LeadContext = {}
): { lead: Lead } | { bot: true } | { error: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  if (str(b.website, 200)) return { bot: true }; // honeypot: אנשים לא רואים את השדה הזה
  const phone = str(b.phone, LIMITS.phone);
  if (!normalizePhone(phone)) return { error: "phone" };

  const rawAttr = (b.attribution ?? {}) as Record<string, unknown>;
  const attribution = Object.fromEntries(
    ATTR_KEYS.map((k) => [k, str(rawAttr[k], LIMITS.attr)])
  ) as unknown as Attribution;
  if (attribution.firstSeen && Number.isNaN(Date.parse(attribution.firstSeen))) attribution.firstSeen = "";

  const now = ctx.now ?? new Date();
  return {
    lead: {
      id: makeId(now),
      receivedAt: now.toISOString(),
      source: b.source === "chat" ? "chat" : "form",
      name: str(b.name, LIMITS.name),
      phone,
      type: str(b.type, LIMITS.type),
      date: str(b.date, LIMITS.date),
      message: str(b.message, LIMITS.message),
      lang: b.lang === "en" ? "en" : "he",
      page: str(b.page, LIMITS.page),
      origin: classifySource(attribution),
      attribution,
      country: str(ctx.country, 60),
      city: str(ctx.city, 80),
      device: deviceOf(ctx.userAgent ?? ""),
    },
  };
}

function countryName(code: string): string {
  if (!/^[A-Z]{2}$/.test(code)) return code;
  try {
    return new Intl.DisplayNames(["he"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

function sinceFirstVisit(firstSeen: string, receivedAt: string): string {
  if (!firstSeen) return "";
  const days = Math.floor((Date.parse(receivedAt) - Date.parse(firstSeen)) / 86_400_000);
  if (days <= 0) return "ביקור ראשון באתר: היום";
  if (days === 1) return "ביקור ראשון באתר: אתמול";
  return `ביקור ראשון באתר: לפני ${days} ימים`;
}

/** קישור וואטסאפ לפונה, עם פתיח מוכן שדוד ממשיך לכתוב ממנו. */
export function replyLink(lead: Lead): string | null {
  const intl = normalizePhone(lead.phone);
  if (!intl) return null;
  const first = lead.name.split(/\s+/)[0] ?? "";
  const about =
    lead.source === "form" && lead.type && !/אחר|else/i.test(lead.type) ? ` לגבי ${lead.type}` : "";
  const text =
    lead.lang === "en"
      ? `Hi${first ? ` ${first}` : ""}, this is David Morgenstern. I got your message from my website. `
      : `היי${first ? ` ${first}` : ""}, כאן דוד מורגנשטרן. קיבלתי את הפנייה שלך מהאתר${about}. `;
  return `https://wa.me/${intl}?text=${encodeURIComponent(text)}`;
}

/** נוסח ההודעה לדוד, בעברית תמיד. */
export function formatLead(lead: Lead): string {
  const intl = normalizePhone(lead.phone);
  const a = lead.attribution;
  const campaign = [a.utm_campaign, a.utm_term].filter(Boolean).join(" / ");
  const where = [countryName(lead.country), lead.city].filter(Boolean).join(", ");
  const lines = [
    lead.source === "chat" ? "📩 מספר שהושאר בצ'אט באתר" : "📩 פנייה חדשה מהטופס באתר",
    lead.name && `שם: ${lead.name}`,
    `טלפון: ${lead.phone}`,
    lead.type && `מה מצלמים: ${lead.type}`,
    lead.date && `תאריך משוער: ${lead.date}`,
    lead.message && `${lead.source === "chat" ? "מה נכתב בצ'אט" : "פרטים"}: ${lead.message}`,
    lead.lang === "en" && "שפה: אנגלית",
    "",
    `🧭 מקור: ${lead.origin}`,
    a.landing && `נחת בעמוד: ${a.landing}`,
    campaign && `קמפיין: ${campaign}`,
    sinceFirstVisit(a.firstSeen, lead.receivedAt),
    (where || lead.device) && `📍 ${[where, lead.device].filter(Boolean).join(" · ")}`,
    lead.page && `שלח מהעמוד: ${lead.page}`,
    `מזהה: ${lead.id}`,
    "",
    intl && `לענות בוואטסאפ: ${replyLink(lead)}`,
    intl && `להתקשר: +${intl}`,
  ];
  return lines
    .filter((l) => l !== false && l !== null && l !== undefined)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** שורת נושא קבועה למייל: הקידומת "[dmorgen lead]" היא מה שסוכני ה-AI וסינוני Gmail מחפשים. */
export function leadSubject(lead: Lead): string {
  const who = lead.name || lead.phone;
  const what = lead.source === "chat" ? "צ'אט" : lead.type || "טופס";
  return `[dmorgen lead] ${who} · ${what}`;
}
