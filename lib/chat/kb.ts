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
        "היי. אני העוזר של דוד, הוא כתב אותי, אז אם אני חצוף זה ממנו. שאלו על סוגי הצילומים, מחיר, איך זה עובד או תאריך.",
        "Hi. I'm David's assistant. He wrote me, so if I'm cheeky, blame him. Ask about the kinds of shoots, pricing, how it works, or a date."
      ),
    },
    {
      id: "events",
      keywords: {
        he: ["אירוע", "אירועים", "בר מצווה", "בת מצווה", "ברית", "יום הולדת", "חברה", "עסקי", "חגיגה"],
        en: ["event", "bar mitzvah", "bat mitzvah", "brit", "birthday", "corporate", "celebration", "party"],
      },
      answer: L(
        "בר ובת מצווה, בריתות, ימי הולדת ואירועי חברה. לפני האירוע דוד שואל מי חייב להיות בתמונות ומה אסור לפספס, ואז דואג שהם יהיו שם. אתם רק חוגגים.",
        "Bar and Bat Mitzvahs, brit ceremonies, birthdays and company events. Before the day, David asks who has to be in the photos and what can't be missed, then makes sure they're there. You just celebrate."
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
        "צילומי משפחה בטבע או במקום שאתם אוהבים. יש את התמונה שבה כולם מסתכלים למצלמה, ויש את מה שקורה ביניכם כשמפסיקים לחשוב עליה. דוד מחפש מקום לשניהם.",
        "Family sessions outdoors or at a place you love. There's the photo where everyone looks at the camera, and there's what happens between you when you stop thinking about it. David makes room for both."
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
        "פורטרטים, צילומי הריון ותדמית אישית. לא צריך לדעת להצטלם: איפה לעמוד, לאן להסתכל ומה לעשות, זה התפקיד של דוד. שלכם רק להרגיש בנוח, וגם בזה הוא עוזר.",
        "Portraits, maternity and personal branding. You don't need to know how to pose: where to stand, where to look and what to do is David's job. Yours is to feel comfortable, and he helps with that too."
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
        "פורטרטים לצוות, אירועי חברה ותוכן מצולם לאתר. דוד קודם שואל מי יראה את התמונות ומה הן צריכות לומר עליכם, ואז מצלם. לפני שמסבירים מי אתם, רואים אתכם.",
        "Team portraits, company events and photo content for your website. David first asks who will see the images and what they should say about you, then shoots. People see you before they read about you."
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
        "המחיר נקבע לפי סוג הצילום, ההיקף, המיקום ומה שתרצו לקבל בסוף. אחרי שיחה קצרה מקבלים הצעה כתובה עם כל מה שכלול. הדרך הכי מהירה: לספר בקצרה בוואטסאפ מה מצלמים.",
        "The price depends on the type of shoot, its scope, the location and what you want to receive. After a short call you get a written proposal with everything included. Fastest way: tell David briefly on WhatsApp what you're shooting."
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
        "קובעים תאריך דרך הטופס באתר או ישירות בוואטסאפ. בשני המקרים ההודעה כבר מוכנה, רק לשלוח. דוד קורא הכול בעצמו, גם בשתיים בלילה.",
        "Book a date through the form on the site or directly on WhatsApp. Either way the message is pre-filled, just send it. David reads everything himself, even at 2am."
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
        "בדרך כלל עד שבוע מהאירוע, אחרי מיון ועריכה. את המועד המדויק סוגרים לפני ההזמנה, כך שאף אחד לא צריך לנחש.",
        "Usually within a week of the event, after selection and editing. The exact date is set before booking, so nobody has to guess."
      ),
    },
    {
      id: "clientArea",
      keywords: {
        he: ["אזור לקוחות", "בחיר", "לבחור תמונות", "גלריה שלי", "התמונות שלי", "bchira"],
        en: ["client area", "select", "choose photos", "my gallery", "my photos", "bchira"],
      },
      answer: L(
        "באזור הלקוחות בוחרים את התמונות האהובות מהאירוע, מכל מכשיר ובכל שעה. אזהרה: כולם יצאו טוב, אז לבחור זה החלק הקשה.",
        "The client area is where you choose your favorite photos from the event, from any device, any time. Fair warning: everyone came out good, so choosing is the hard part."
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
        "דוד מורגנשטרן: מצלם אנשים, כותב, ובונה כלי AI לכל מה שקורה סביב הצילום. אבא. מאמין שלהצטלם טוב זה להרגיש טוב, והמצלמה היא החלק הקטן.",
        "David Morgenstern: photographs people, writes, and builds AI tools for everything around the shoot. A dad. Believes a good photo starts with feeling good, and the camera is the small part."
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
        "הכי מהיר: וואטסאפ ישירות לדוד. אפשר גם דרך הטופס באתר.",
        "Fastest: WhatsApp straight to David. The form on the site works too."
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
        he: ["חתונה", "חתונות", "כלה", "חופה"],
        en: ["wedding", "bride", "groom", "weddings"],
      },
      answer: L(
        "זה לא סוג האירוע שדוד מצלם. מה שכן: בר ובת מצווה, בריתות, ימי הולדת, צילומי משפחה, פורטרטים ועסקים. אשמח לעזור בכל אחד מאלה.",
        "That's not the kind of event David photographs. What he does: Bar and Bat Mitzvahs, brit ceremonies, birthdays, family sessions, portraits and business photography. Happy to help with any of those."
      ),
    },
    {
      id: "callback",
      keywords: { he: [], en: [] },
      answer: L(
        "קיבלתי מספר. רוצים שדוד יחזור אליכם? לחיצה אחת וההודעה אצלו בוואטסאפ.",
        "Got the number. Want David to call you back? One tap and the message reaches him on WhatsApp."
      ),
    },
    {
      id: "fallback",
      keywords: { he: [], en: [] },
      answer: L(
        "לא הבנתי עד הסוף, וזה עליי, לא עליכם. אפשר לנסח אחרת? או פשוט לכתוב לדוד ישירות, הוא עונה מהר.",
        "I didn't fully get that, and that's on me, not you. Could you rephrase? Or just write to David directly, he replies fast."
      ),
      actions: [
        wa(lang === "he" ? "היי דוד! שאלה מהאתר." : "Hi David! A question from the website."),
      ],
    },
  ];
}
