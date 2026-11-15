import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMeta } from "@/lib/seo/meta";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

/* מדיניות פרטיות. משקפת בדיוק את מה שהקוד עושה:
   lib/attribution.ts (מקור ביקור ב-localStorage, 30 יום), app/api/lead/route.ts (טלגרם, Resend, מדינה/עיר
   מכותרות Vercel), components/chat-assistant (הצ'אט רץ בדפדפן), @vercel/analytics (בלי עוגיות).
   משנים משהו באחד מהם? מעדכנים כאן ואת UPDATED. */
const UPDATED = { he: "16 בנובמבר 2026", en: "November 16, 2026" };

type Section = { title: string; body: string[] };

const content: Record<Locale, { title: string; description: string; intro: string; sections: Section[] }> = {
  he: {
    title: "מדיניות פרטיות",
    description: "מה האתר של דוד מורגנשטרן אוסף, למה, איפה זה נשמר ואיך מבקשים למחוק.",
    intro:
      "בקצרה: אני אוסף רק את מה שאתם בוחרים לשלוח לי, כדי לחזור אליכם. אין באתר עוגיות פרסום, אני לא מוכר מידע ולא משתמש בו לשיווק.",
    sections: [
      {
        title: "מי אחראי על המידע",
        body: [
          "דוד מורגנשטרן, צלם. אפשר לפנות אליי בכל שאלה על המידע שלכם בטלפון או בוואטסאפ, בפרטים שבתחתית העמוד.",
        ],
      },
      {
        title: "מה נאסף כשאתם שולחים פנייה",
        body: [
          "בטופס: שם, טלפון, סוג הצילום, תאריך משוער והודעה, אם מילאתם.",
          "בצ'אט: הצ'אט עונה מתוך הדפדפן שלכם, והשיחה לא נשמרת ולא נשלחת לשום מערכת בינה מלאכותית. רק אם כתבתם מספר טלפון ולחצתם לשלוח אותו אליי, נשלחים המספר ומה שכתבתם בצ'אט.",
          "יחד עם הפנייה נשלחים גם: העמוד ששלחתם ממנו, מאיפה הגעתם לאתר (למשל גוגל או ChatGPT), מדינה ועיר משוערות לפי החיבור לאינטרנט (כתובת ה-IP עצמה לא נשמרת), וסוג המכשיר (טלפון, מחשב או טאבלט).",
        ],
      },
      {
        title: "מקור הביקור נשמר אצלכם בדפדפן",
        body: [
          "כדי לדעת מאיפה הגעתם, האתר שומר בדפדפן שלכם (ב-localStorage, לא בעוגייה) את הכתובת שממנה הגעתם, עמוד הכניסה, פרמטרים של קמפיין אם היו בקישור, ותאריך הביקור הראשון. המידע הזה נשאר במכשיר שלכם עד 30 יום, ומגיע אליי רק אם אתם שולחים פנייה.",
          "אפשר למחוק אותו בכל רגע דרך ניקוי נתוני האתר בהגדרות הדפדפן. בגלישה בסתר הוא לא נשמר בכלל, והפנייה נשלחת כרגיל.",
        ],
      },
      {
        title: "מדידת ביקורים",
        body: [
          "האתר סופר ביקורים עם Vercel Web Analytics, בלי עוגיות ובלי זיהוי אישי. אני רואה רק נתונים מצטברים, כמו כמה אנשים ביקרו בעמוד מסוים.",
        ],
      },
      {
        title: "למה אני משתמש במידע",
        body: [
          "כדי לחזור אליכם, לתאם ולבצע את הצילום, ולהבין אילו דרכים מביאות אליי אנשים, כדי להשקיע בהן.",
          "אין חובה חוקית למסור את הפרטים. בלי מספר טלפון פשוט לא אוכל לחזור אליכם, ואפשר תמיד לפנות אליי ישירות בוואטסאפ או בטלפון במקום.",
        ],
      },
      {
        title: "מי עוד נוגע במידע",
        body: [
          "הפנייה מגיעה אליי כהודעה בטלגרם וכמייל לתיבת ה-Gmail שלי. בדרך היא עוברת דרך שירותים שמפעילים את האתר: Vercel (אחסון האתר), Telegram, Resend (שליחת המייל, שרתים באירופה) ו-Google (Gmail). המידע לא נמכר ולא מועבר לאף אחד אחר.",
        ],
      },
      {
        title: "כמה זמן זה נשמר, ומה הזכויות שלכם",
        body: [
          "אני שומר את הפנייה כל עוד היא נחוצה לעבודה בינינו. אתם רשאים לבקש לראות את המידע שלכם, לתקן אותו או למחוק אותו, בהודעה פשוטה בוואטסאפ או בטלפון. אטפל בבקשה בהקדם.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    description: "What David Morgenstern's website collects, why, where it is kept and how to have it deleted.",
    intro:
      "In short: I only collect what you choose to send me, so I can get back to you. There are no advertising cookies here, and I never sell your information or use it for marketing.",
    sections: [
      {
        title: "Who is responsible",
        body: [
          "David Morgenstern, photographer. For any question about your information, reach me by phone or WhatsApp using the details at the bottom of the page.",
        ],
      },
      {
        title: "What is collected when you contact me",
        body: [
          "The form: name, phone, type of shoot, approximate date and message, if you filled them in.",
          "The chat: it answers from inside your browser, and the conversation is not stored or sent to any AI service. Only if you type a phone number and choose to send it to me, the number and what you wrote in the chat are sent.",
          "Along with your message I also receive: the page you sent it from, how you reached the site (for example Google or ChatGPT), an approximate country and city based on your connection (the IP address itself is not stored), and your device type (phone, computer or tablet).",
        ],
      },
      {
        title: "Your visit source stays in your browser",
        body: [
          "To know how you found the site, it stores in your browser (in localStorage, not a cookie) the address you came from, your landing page, campaign parameters if the link had any, and the date of your first visit. This stays on your device for up to 30 days and reaches me only if you send a message.",
          "You can delete it at any time by clearing this site's data in your browser settings. In private browsing it is not stored at all, and your message is still sent.",
        ],
      },
      {
        title: "Visit statistics",
        body: [
          "The site counts visits with Vercel Web Analytics, without cookies and without identifying you. I only see totals, such as how many people visited a page.",
        ],
      },
      {
        title: "Why I use it",
        body: [
          "To get back to you, arrange and deliver your shoot, and learn which channels bring people to me so I can invest in them.",
          "You are not legally required to share these details. Without a phone number I simply cannot get back to you, and you can always reach me directly on WhatsApp or by phone instead.",
        ],
      },
      {
        title: "Who else handles it",
        body: [
          "Your message reaches me as a Telegram message and as an email to my Gmail inbox. On the way it passes through the services that run the site: Vercel (hosting), Telegram, Resend (email delivery, servers in Europe) and Google (Gmail). It is never sold or passed to anyone else.",
        ],
      },
      {
        title: "How long it is kept, and your rights",
        body: [
          "I keep your message for as long as it is needed for our work together. You may ask to see, correct or delete your information with a simple WhatsApp message or call, and I will handle it promptly.",
        ],
      },
    ],
  },
};

type LangParams = { params: Promise<{ lang: string }> };

function resolveLocale(lang: string): Locale {
  return (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = await getDictionary(locale);
  const c = content[locale];
  return pageMeta(locale, "/privacy", `${c.title} | ${dict.meta.siteName}`, c.description, dict.meta.siteName, dict.hero.imageAlt);
}

export default async function PrivacyPage({ params }: LangParams) {
  const locale = resolveLocale((await params).lang);
  const c = content[locale];

  return (
    <div className="mx-auto max-w-3xl px-6 pt-36 pb-24 md:pt-44 md:pb-32">
      <h1 className="font-display text-4xl text-foreground md:text-5xl">{c.title}</h1>
      <p className="mt-3 text-xs tracking-wide text-muted-foreground">
        {locale === "he" ? "עודכן: " : "Updated: "}
        {UPDATED[locale]}
      </p>
      <p className="mt-8 font-display text-xl leading-relaxed text-foreground/90 md:text-2xl">{c.intro}</p>

      <div className="mt-12 divide-y divide-border border-y border-border">
        {c.sections.map((s) => (
          <section key={s.title} className="py-7">
            <h2 className="font-display text-xl text-foreground">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        {locale === "he" ? "טלפון ווואטסאפ: " : "Phone and WhatsApp: "}
        <span dir="ltr">{siteConfig.contactPhone}</span>
      </p>
    </div>
  );
}
