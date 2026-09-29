/* ============================================================================
 * בסיס הידע של עוזר הצ'אט — תשובות דו־לשוניות לפי כוונה (intent).
 *
 * עקרונות:
 * - אפס עובדות מומצאות: מחירים "מותאמים אישית", זמני מסירה מטווח אמיתי.
 * - דוד לא מצלם חתונות — יש כוונת guard שמסיטה בנימוס לנישה.
 * - הקישורים נבנים דינמית לפי שפה; וואטסאפ דרך siteConfig (מושבת אם אין מספר).
 * ========================================================================== */

import type { Locale } from "@/lib/i18n/config";
import { whatsappLink } from "@/lib/site";

export type IntentId =
  | "greeting"
  | "events"
  | "family"
  | "portraits"
  | "business"
  | "pricing"
  | "booking"
  | "turnaround"
  | "clientArea"
  | "about"
  | "contact"
  | "wedding"
  | "callback"
  | "fallback";

export interface ChatAction {
  label: { he: string; en: string };
  href: string;
  external?: boolean;
  primary?: boolean;
}

export interface Intent {
  id: IntentId;
  keywords: { he: string[]; en: string[] };
  answer: { he: string; en: string };
  actions?: ChatAction[];
}

const wa = (message: string): ChatAction => {
  const href = whatsappLink(message);
  return {
    label: { he: "שליחה בוואטסאפ", en: "Send via WhatsApp" },
    href: href ?? "#",
    external: true,
    primary: true,
  };
};

/** בונה את רשימת הכוונות לשפה — הקישורים מותאמים ל־locale. */
export function getIntents(lang: Locale): Intent[] {
  const L = (he: string, en: string) => ({ he, en });
  const inLang = (path: string) => `/${lang}${path}`;

  return [
    {
      id: "greeting",
      keywords: {
        he: ["היי", "שלום", "בוקר טוב", "ערב טוב", "צהריים טובים", "מה נשמע", "הי"],
        en: ["hello", "hi", "hey", "good morning", "good evening", "morning"],
      },
      answer: L(
        "היי! איזה כיף שבאתם. אני העוזר של דוד — שאלו אותי על סוגי הצילומים, מחירים, תהליך העבודה או קביעת תאריך.",
        "Hi! So glad you're here. I'm David's assistant — ask me about the photography services, pricing, the process, or booking a date."
      ),
    },
    {
      id: "events",
      keywords: {
        he: ["אירוע", "אירועים", "בר מצווה", "בת מצווה", "ברית", "יום הולדת", "חברה", "עסקי", "חגיגה"],
        en: ["event", "bar mitzvah", "bat mitzvah", "brit", "birthday", "corporate", "celebration", "party"],
      },
      answer: L(
        "דוד מצלם אירועים משפחתיים ועסקיים: בר/בת מצווה, בריתות, ימי הולדת ואירועי חברה. אתם חוגגים — הוא כבר דואג שהכל ייראה מעולה.",
        "David photographs family and corporate events: bar/bat mitzvahs, brit ceremonies, birthdays and company events. A cinematic, emotional style — an artistic eye with technological precision, so you celebrate and he takes care of the rest."
      ),
      actions: [
        {
          label: L("לגלריית האירועים", "View events gallery"),
          href: inLang("/galleries/events"),
          primary: true,
        },
      ],
    },
    {
      id: "family",
      keywords: {
        he: ["משפחה", "משפחתי", "ילדים", "טבע", "סטודיו נייד", "צילומי משפחה"],
        en: ["family", "kids", "children", "outdoor", "nature", "family shoot"],
      },
      answer: L(
        "צילומי משפחה בטבע או בסטודיו נייד — חוויה רגועה וכיפית, בלי פוזות מאולצות. התוצאה: תמונות טבעיות שמרגישות בדיוק כמו אתם.",
        "Family shoots in nature or with a mobile studio — a relaxed, fun experience with no forced poses. The result: natural photos that feel like a real memory."
      ),
      actions: [
        {
          label: L("לגלריית המשפחה", "View family gallery"),
          href: inLang("/galleries/family"),
          primary: true,
        },
      ],
    },
    {
      id: "portraits",
      keywords: {
        he: ["פורטרט", "אישי", "העצמה", "היריון", "הריון", "בוק"],
        en: ["portrait", "personal", "empowerment", "pregnancy", "maternity", "headshot"],
      },
      answer: L(
        "פורטרטים אישיים, צילומי העצמה והיריון — מפגש שמחזיר לאנשים את המבט הטוב על עצמם. אינטימי, מכבד, ועם תוצאה ששווה מסגרת.",
        "Personal portraits, empowerment and maternity shoots — a session that gives people back a kinder look at themselves. Intimate, respectful, and frame-worthy."
      ),
      actions: [
        {
          label: L("לגלריית הפורטרטים", "View portraits gallery"),
          href: inLang("/galleries/portraits"),
          primary: true,
        },
      ],
    },
    {
      id: "business",
      keywords: {
        he: ["עסק", "עסקי", "מיתוג", "תדמית", "צוות", "כנס", "חברה עסקית", "לינקדאין"],
        en: ["business", "branding", "corporate", "team", "conference", "headshots", "linkedin", "company"],
      },
      answer: L(
        "מיתוג עסקי: צילומי תדמית, צוות, כנסים ואירועי חברה. תמונות שגורמות לעסק להיראות כמו שהוא: רציני, אנושי ומקצועי.",
        "Business branding: executive portraits, team photos, conferences and corporate events. Images that make the business look the way it really is — serious, human and professional."
      ),
      actions: [
        {
          label: L("לגלריה העסקית", "View business gallery"),
          href: inLang("/galleries/business"),
          primary: true,
        },
      ],
    },
    {
      id: "pricing",
      keywords: {
        he: ["מחיר", "עולה", "עלות", "כמה", "תעריף", "חבילה", "מחירים"],
        en: ["price", "cost", "how much", "pricing", "package", "rate", "rates"],
      },
      answer: L(
        "כל אירוע מתומחר אישית לפי היקף, מיקום וצרכים — אין מחירון קבוע באתר. הדרך הכי מהירה להצעה מדויקת: לספר בקצרה על האירוע בוואטסאפ.",
        "Every event is quoted personally based on scope, location and needs — there's no fixed price list on the site. The fastest way to get an accurate quote: briefly describe the event on WhatsApp."
      ),
      actions: [wa(lang === "he" ? "היי דוד! אשמח לקבל הצעת מחיר לצילומים." : "Hi David! I'd love a quote for a photography session.")],
    },
    {
      id: "booking",
      keywords: {
        he: ["קביע", "תאריך", "להזמין", "שריון", "פנוי", "מתי"],
        en: ["book", "date", "schedule", "reserve", "available", "availability", "appointment"],
      },
      answer: L(
        "קובעים תאריך דרך עמוד צור הקשר באתר או ישירות בוואטסאפ — בשני המקרים ההודעה כבר מוכנה, רק לשלוח.",
        "Book a date through the booking form on the site or directly on WhatsApp — either way the message is pre-filled with the details, just send it."
      ),
      actions: [
        {
          label: L("לעמוד צור הקשר", "To the contact page"),
          href: inLang("/contact"),
          primary: true,
        },
        wa(lang === "he" ? "היי דוד! אשמח לקבוע תאריך לצילומים." : "Hi David! I'd like to book a photography date."),
      ],
    },
    {
      id: "turnaround",
      keywords: {
        he: ["מתי מקבלים", "זמן אספקה", "כמה זמן", "מוכן", "תמונות מוכנות", "עריכה"],
        en: ["delivery", "how long", "turnaround", "ready", "editing", "when will"],
      },
      answer: L(
        "התמונות עוברות מיון ועריכה מקצועית ומוכנות תוך מספר ימים עד שבוע — תלוי בהיקף האירוע. שווה לחכות.",
        "The photos go through professional sorting and editing and are ready within a few days up to a week — depending on the event's scope. Worth the wait."
      ),
    },
    {
      id: "clientArea",
      keywords: {
        he: ["אזור לקוחות", "בחיר", "לבחור תמונות", "גלריה שלי", "התמונות שלי", "bchira"],
        en: ["client area", "select", "choose photos", "my gallery", "my photos", "bchira"],
      },
      answer: L(
        "אזור הלקוחות (bchira.app) הוא המקום שבו בוחרים בנוחות את התמונות האהובות מהאירוע — מכל מכשיר, בכל זמן.",
        "The client area (bchira.app) is where you comfortably select your favorite photos from the event — from any device, at any time."
      ),
      actions: [
        {
          label: L("לאזור הלקוחות", "To the client area"),
          href: inLang("/client-gallery"),
          primary: true,
        },
      ],
    },
    {
      id: "about",
      keywords: {
        he: ["מי אתה", "מי זה דוד", "על דוד", "הצלם", "אודות", "מאחורי המצלמה"],
        en: ["who is", "about david", "the photographer", "behind the camera"],
      },
      answer: L(
        "דוד מורגנשטרן — צלם, יזם, אבא ואיש טכנולוגיה. מעבר לצילום הוא עוסק ב-AI, יצירת תוכן ומיתוג עסקי — וכל זה מרגישים בתמונות.",
        "David Morgenstern — photographer, entrepreneur, father and a technology person. Beyond photography he's into AI, content creation and business branding — and it all feeds the eye behind the camera."
      ),
      actions: [
        {
          label: L("בואו נכיר", "Let's meet"),
          href: inLang("/about"),
          primary: true,
        },
      ],
    },
    {
      id: "contact",
      keywords: {
        he: ["טלפון", "ליצור קשר", "לדבר", "וואטסאפ", "אימייל", "מייל", "קשר"],
        en: ["phone", "contact", "talk", "whatsapp", "email", "mail"],
      },
      answer: L(
        "הכי מהיר — וואטסאפ ישירות לדוד. אפשר גם דרך עמוד צור קשר באתר.",
        "Fastest — WhatsApp straight to David. You can also use the contact page on the site."
      ),
      actions: [
        wa(lang === "he" ? "היי דוד! הגעתי מהאתר, אשמח לדבר." : "Hi David! Coming from the website, I'd love to chat."),
        {
          label: L("לעמוד צור קשר", "To the contact page"),
          href: inLang("/contact"),
        },
      ],
    },
    {
      id: "wedding",
      keywords: {
        he: ["חתונה", "חתונות", "כלה", "חתן", "חופה"],
        en: ["wedding", "bride", "groom", "weddings"],
      },
      answer: L(
        "דוד לא מצלם חתונות — ההתמחות שלו היא אירועים משפחתיים ועסקיים וצילומי משפחה, ושם הוא נותן את הלב. אשמח לעזור בכל אחד מאלה!",
        "David doesn't photograph weddings — his expertise is family and corporate events plus family shoots, where he gives his whole heart. Happy to help with any of those!"
      ),
    },
    {
      id: "callback",
      keywords: { he: [], en: [] },
      answer: L(
        "קיבלתי מספר טלפון! רוצים שאעביר לדוד שיחזור אליכם? לחיצה אחת וההודעה נשלחת בוואטסאפ.",
        "Got a phone number! Want me to pass it to David so he calls you back? One tap and the message goes out on WhatsApp."
      ),
    },
    {
      id: "fallback",
      keywords: { he: [], en: [] },
      answer: L(
        "לא בטוח שהבנתי עד הסוף — אפשר לנסח אחרת? או פשוט לדבר עם דוד ישירות, הוא עונה מהר.",
        "Not sure I fully got that — could you rephrase? Or just talk to David directly, he replies fast."
      ),
      actions: [
        wa(lang === "he" ? "היי דוד! שאלה מהאתר." : "Hi David! A question from the website."),
      ],
    },
  ];
}
