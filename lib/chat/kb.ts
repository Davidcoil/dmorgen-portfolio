/* ============================================================================
 * בסיס הידע של עוזר הצ'אט: תשובות דו-לשוניות לפי כוונה (intent).
 *
 * קול V2 (15.11.2026): משפטים מלאים, מה שדוד עושה בצילום, בלי פאנצ'ים.
 * עובדות רק מתוך הקופי המאושר: אין זמני מסירה קבועים, אין מחירים,
 * אין הבטחה לבחירת תמונות, אין פרטים משפחתיים, אין חתונות.
 * כל מסלול נגמר בדרך ודאית להגיע לדוד: טופס, וואטסאפ, טלפון, או מספר שהושאר כאן.
 * ========================================================================== */

import type { Locale } from "@/lib/i18n/config";
import { siteConfig, telHref, whatsappLink } from "@/lib/site";

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

const wa = (message: string, primary = true): ChatAction => ({
  label: { he: "לכתוב לדוד בוואטסאפ", en: "Message David on WhatsApp" },
  href: whatsappLink(message) ?? "#",
  external: true,
  primary,
});

const call = (): ChatAction => ({
  label: {
    he: `להתקשר: ${siteConfig.contactPhone}`,
    en: `Call: ${siteConfig.contactPhone}`,
  },
  href: siteConfig.contactPhone ? telHref(siteConfig.contactPhone) : "#",
});

/** בונה את רשימת הכוונות לשפה. הקישורים מותאמים ל-locale. */
export function getIntents(lang: Locale): Intent[] {
  const L = (he: string, en: string) => ({ he, en });
  const inLang = (path: string) => `/${lang}${path}`;
  const hi = (he: string, en: string) => (lang === "he" ? he : en);
  const contactPage: ChatAction = {
    label: L("לטופס יצירת קשר", "To the contact form"),
    href: inLang("/contact"),
  };

  return [
    {
      id: "greeting",
      keywords: {
        he: ["היי", "שלום", "בוקר טוב", "ערב טוב", "צהריים טובים", "מה נשמע", "הי"],
        en: ["hello", "hi", "hey", "good morning", "good evening", "morning"],
      },
      answer: L(
        "היי. אפשר לשאול על אירועים, משפחה, פורטרטים או צילום לעסק, על מחיר ועל איך מתקדמים. מה אתם מתכננים?",
        "Hi. Ask me about events, families, portraits or business photography, about pricing, or how it works. What are you planning?"
      ),
    },
    {
      id: "events",
      keywords: {
        he: ["אירוע", "אירועים", "בר מצווה", "בת מצווה", "ברית", "בריתה", "יום הולדת", "חגיגה"],
        en: ["event", "bar mitzvah", "bat mitzvah", "brit", "birthday", "celebration", "party"],
      },
      answer: L(
        "בר ובת מצווה, בריתות, ימי הולדת ואירועי חברה. באירוע כולם זזים ומתרגשים, ואי אפשר להיות בכל מקום באותו רגע. לכן דוד מברר מראש מי חשוב לכם ומה תרצו למצוא בתמונות אחר כך.",
        "Bar and Bat Mitzvahs, brit ceremonies, birthdays and company events. At an event everyone is moving and celebrating, and nobody can be everywhere at once. So David finds out in advance who matters to you and what you'd like to see in the photos afterwards."
      ),
      actions: [
        { label: L("לתמונות מאירועים", "See event photos"), href: inLang("/galleries/events"), primary: true },
        contactPage,
      ],
    },
    {
      id: "family",
      keywords: {
        he: ["משפחה", "משפחתי", "ילדים", "טבע", "צילומי משפחה", "נכדים"],
        en: ["family", "kids", "children", "outdoor", "nature", "family shoot", "grandchildren"],
      },
      answer: L(
        "קודם דוד דואג לתמונה המשפחתית החשובה, שבה כולם יחד. אחר כך אפשר להניע אנשים, לשחק עם העמדות ולתת לדברים להשתחרר. משפחה לא חייבת לעמוד כמו בול עץ בשביל לצאת טוב.",
        "First David makes sure you get the important family photo with everyone together. Then there's room to move around, try different arrangements and let everyone loosen up. Nobody has to stand like a statue to look good."
      ),
      actions: [
        { label: L("לתמונות משפחה", "See family photos"), href: inLang("/galleries/family"), primary: true },
        contactPage,
      ],
    },
    {
      id: "portraits",
      keywords: {
        he: ["פורטרט", "פורטרטים", "תדמית אישית", "תמונת פרופיל", "בוק", "פוטוגני"],
        en: ["portrait", "personal branding", "profile photo", "headshot", "photogenic"],
      },
      answer: L(
        "לא צריך לדעת להצטלם. דוד מכוון, בודק אור וזוויות ומשנה דברים קטנים עד שזה עובד. גם אם עד היום לא אהבתם את עצמכם בתמונות.",
        "You don't need to know how to pose. David guides you, tries different light and angles, and makes small changes until it works. Even if you've never liked photos of yourself."
      ),
      actions: [
        { label: L("לפורטרטים", "See portraits"), href: inLang("/galleries/portraits"), primary: true },
        contactPage,
      ],
    },
    {
      id: "business",
      keywords: {
        he: ["עסק", "עסקי", "עסקים", "מיתוג", "תדמית", "צוות", "כנס", "חברה", "לינקדאין", "שיווק"],
        en: ["business", "branding", "corporate", "team", "conference", "headshots", "linkedin", "company", "marketing"],
      },
      answer: L(
        "פורטרטים לצוות, אירועי חברה ותמונות לשיווק. דוד מתחיל במה שהתמונות צריכות לשמש: מי יראה אותן ואיפה הן יופיעו. משם מתכננים את הצילום.",
        "Team portraits, company events and marketing images. David starts with how the images will be used: who will see them and where they'll appear. The shoot is planned from there."
      ),
      actions: [
        { label: L("לצילום לעסקים", "See business photography"), href: inLang("/galleries/business"), primary: true },
        wa(hi("היי דוד, אני רוצה לדבר על צילום לעסק.", "Hi David, I'd like to talk about business photography."), false),
      ],
    },
    {
      id: "pricing",
      keywords: {
        he: ["מחיר", "עולה", "עלות", "כמה", "תעריף", "חבילה", "מחירים", "הצעת מחיר"],
        en: ["price", "cost", "how much", "pricing", "package", "rate", "rates", "quote"],
      },
      answer: L(
        "המחיר תלוי בסוג הצילום, בהיקף, במיקום ובמה שתרצו לקבל בסוף. אחרי שדוד מבין מה צריך, הוא שולח הצעה כתובה שמפרטת מה כלול. הכי מהיר: לספר לו בקצרה מה מתכננים, איפה ומתי.",
        "It depends on the type of shoot, the scope, the location and what you'd like to receive. Once David understands what you need, he sends a written proposal that spells out what's included. Fastest way: tell him briefly what you're planning, where and when."
      ),
      actions: [
        { ...contactPage, primary: true },
        wa(hi("היי דוד, אשמח להצעת מחיר. מה שאנחנו מתכננים:", "Hi David, I'd like a quote. Here's what we're planning:"), false),
      ],
    },
    {
      id: "booking",
      keywords: {
        he: ["קביע", "לקבוע", "תאריך", "להזמין", "שריון", "פנוי", "פנויים", "איך מתקדמים", "איך זה עובד"],
        en: ["book", "date", "schedule", "reserve", "available", "availability", "how does it work", "next step"],
      },
      answer: L(
        "מספרים לדוד מה מתכננים, איפה ומתי. הוא שולח הצעה כתובה עם היקף, מחיר ומועד מסירה, ורק אז סוגרים. אפשר דרך הטופס באתר, בוואטסאפ, או לכתוב כאן מספר טלפון ואעביר אותו לדוד.",
        "Tell David what you're planning, where and when. He sends a written proposal with the scope, price and delivery date, and only then do you book. Use the form on the site, WhatsApp, or type a phone number here and I'll pass it on."
      ),
      actions: [
        { ...contactPage, primary: true },
        wa(hi("היי דוד, אני רוצה לבדוק תאריך לצילום.", "Hi David, I'd like to check a date for a shoot."), false),
      ],
    },
    {
      id: "turnaround",
      keywords: {
        he: ["מתי מקבלים", "לקבל את התמונות", "מתי התמונות", "זמן אספקה", "כמה זמן", "מוכנות", "תמונות מוכנות", "עריכה", "מסירה"],
        en: ["delivery", "how long", "turnaround", "ready", "editing", "when will"],
      },
      answer: L(
        "את מועד המסירה מסכמים לפני ההזמנה, והוא כתוב בהצעה. התמונות נמסרות אחרי מיון ועריכה, כקבצים דיגיטליים.",
        "The delivery date is agreed before booking and written in the proposal. The photos are delivered as digital files after selection and editing."
      ),
    },
    {
      id: "clientArea",
      keywords: {
        he: ["אזור לקוחות", "בחיר", "לבחור תמונות", "גלריה שלי", "התמונות שלי", "bchira"],
        en: ["client area", "choose photos", "my gallery", "my photos", "bchira"],
      },
      answer: L(
        "באזור הלקוחות נכנסים לגלריה האישית שלכם וממשיכים לפי ההנחיות שמופיעות שם. נתקעתם? כתבו לדוד בוואטסאפ.",
        "The client area is where you open your private gallery and follow the instructions there. Stuck? Message David on WhatsApp."
      ),
      actions: [
        { label: L("לאזור הלקוחות", "To the client area"), href: inLang("/client-gallery"), primary: true },
        wa(hi("היי דוד, יש לי שאלה על הגלריה שלי.", "Hi David, I have a question about my gallery."), false),
      ],
    },
    {
      id: "about",
      keywords: {
        he: ["מי אתה", "מי זה דוד", "על דוד", "הצלם", "אודות", "מאחורי המצלמה", "ניסיון"],
        en: ["who is", "about david", "the photographer", "behind the camera", "experience"],
      },
      answer: L(
        "דוד מורגנשטרן מצלם אנשים כבר שנים: אירועים, משפחות, פורטרטים ועסקים. הוא מגיע מוכן, משנה לפי מה שקורה ביום עצמו, ודואג קודם לתמונות החשובות. היום הוא מצלם כל עבודה בעצמו.",
        "David Morgenstern has been photographing people for years: events, families, portraits and businesses. He comes prepared, adapts to what happens on the day, and gets the important photos first. Today he photographs every job himself."
      ),
      actions: [{ label: L("עוד על דוד", "More about David"), href: inLang("/about"), primary: true }],
    },
    {
      id: "contact",
      keywords: {
        he: ["טלפון", "ליצור קשר", "לדבר", "וואטסאפ", "אימייל", "מייל", "קשר", "להתקשר"],
        en: ["phone", "contact", "talk", "whatsapp", "email", "mail", "call"],
      },
      answer: L(
        "אפשר לכתוב לדוד בוואטסאפ, להתקשר, או למלא את הטופס באתר. ואם תכתבו כאן מספר טלפון, אעביר אותו אליו.",
        "You can message David on WhatsApp, call him, or fill in the form on the site. And if you type a phone number here, I'll pass it on to him."
      ),
      actions: [
        wa(hi("היי דוד, הגעתי מהאתר.", "Hi David, I found you through your website.")),
        call(),
        contactPage,
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
        "That's not the kind of event David photographs. What he does: Bar and Bat Mitzvahs, brit ceremonies, birthdays, family photos, portraits and business photography. Happy to help with any of those."
      ),
    },
    {
      id: "callback",
      keywords: { he: [], en: [] },
      answer: L(
        "קיבלתי את המספר. לשלוח אותו לדוד כדי שיחזור אליכם?",
        "Got the number. Shall I send it to David so he can get back to you?"
      ),
    },
    {
      id: "fallback",
      keywords: { he: [], en: [] },
      answer: L(
        "את זה לא הבנתי. אפשר לנסח אחרת, או לכתוב לדוד ישירות. ואם תכתבו כאן מספר טלפון, אעביר אותו אליו.",
        "I didn't catch that. Try rephrasing, or write to David directly. And if you type a phone number here, I'll pass it on to him."
      ),
      actions: [wa(hi("היי דוד, שאלה מהאתר:", "Hi David, a question from the website:")), contactPage],
    },
  ];
}
