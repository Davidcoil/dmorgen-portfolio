# ארכיטקטורת הפרויקט — שלב 1: שלד (Scaffolding)

> אתר פורטפוליו ותדמית יוקרתי לצילום פרימיום — דוד מורגנשטרן
> סטטוס: שלב 3 הושלם ונבדק · ממתין לאישור

---

## 1. עץ התיקיות

```
portfolio-website/
├── app/
│   ├── layout.tsx               # שורש — מעביר הלאה בלבד (בלי <html>)
│   ├── globals.css              # טוקני עיצוב: OLED שחור · זהב שמפניה · פונטי יוקרה
│   ├── sitemap.ts               # מפת אתר דו־לשונית אוטומטית
│   ├── robots.ts                # robots.txt דינמי
│   └── [lang]/
│       ├── layout.tsx           # בונה <html lang dir> + פונטים + SEO לכל שפה
│       └── page.tsx            # דף בית זמני (יוחלף ב־Hero אמיתי בשלב 2)
│
├── components/
│   └── ui/
│       └── button.tsx           # רכיב shadcn ראשון (new-york, מותאם למותג)
│
├── lib/
│   ├── utils.ts                # cn() — עזר שילוב קלאסים (shadcn)
│   └── i18n/
│       ├── config.ts           # רשימת שפות · ברירת מחדל · כיווניות
│       ├── dictionaries.ts     # טעינה עצלה של מילון לפי שפה
│       └── dictionaries/
│           ├── he.ts           # עברית — שפת המקור + טיפוס Dictionary
│           └── en.ts           # אנגלית — טיוטה מוכנה להדלקה
│
├── proxy.ts                   # ‎/‎ → ‎/he‎ · ‎/en/…‎ כבר עובד (קונבנציית Next 16)
├── next.config.ts              # מערך wixRedirects מוכן להפניות 301
│
├── public/
│   └── favicon.svg             # סמל זמני (טבעת זהב על שחור)
│
├── docs/
│   └── ARCHITECTURE.md         # המסמך הזה
│
├── components.json             # קונפיגורציית shadcn
├── package.json                # Next 16 · React 19 · Tailwind 4 · Framer Motion
├── tsconfig.json               # כינוי @/* לשורש הפרויקט
├── postcss.config.mjs
├── .env.example                # משתנים לשלבים 2–3 (bchira.app, צ'אטבוט)
└── .gitignore
```

---

## 2. איך עובדת הדו־לשוניות (i18n)

```
גולש נכנס ל־/  ──proxy──▶  ‎/he‎ (עברית, RTL)
                                    │
                    ┌───────────────┴───────────────┐
              app/[lang]/layout.tsx            getDictionary("he")
              <html lang="he" dir="rtl">   ◀──  lib/i18n/dictionaries/he.ts
```

- **הוספת שפה = הוספת קובץ מילון בלבד.** הנתיבים, ה־SEO, ה־sitemap וה־middleware כבר תומכים ב־`/en/`.
- הטיפוס `Dictionary` נגזר מהעברית — TypeScript יתריע בזמן קומפילציה אם מפתח חסר באנגלית.
- כל שפה נטענת בעצלנות (`import()` דינמי) — אפס עלות ביצועים לשפה שאינה בשימוש.

### להדלקת אנגלית בעתיד (3 צעדים, בלי לגעת בארכיטקטורה):
1. לערוך את המחרוזות ב־`lib/i18n/dictionaries/en.ts`
2. להוסיף כפתור מעבר שפה בתפריט (שלב 2)
3. לעדכן `NEXT_PUBLIC_SITE_URL` — ה־sitemap יכלול את שתי השפות אוטומטית

---

## 3. הפניות 301 מוויקס — שמירת הדירוג בגוגל

ב־`next.config.ts` יש מערך מוכן בשם `wixRedirects`. אחרי מיפוי הכתובות הישנות מוויקס:

```ts
{ source: "/about-me", destination: "/he/about", permanent: true },
```

- `permanent: true` = הפניית **301 קבועה** — גוגל מעביר את כוח הדירוג לכתובת החדשה.
- שים לב לקידומת `/he/` ביעד — כל כתובת חדשה חיה תחת שפה.

---

## 4. SEO מובנה מהיום הראשון

| מה | איפה |
|---|---|
| כותרת + תיאור דינמיים לכל שפה | `app/[lang]/layout.tsx` → `generateMetadata` |
| Open Graph לשיתופים (וואטסאפ/פייסבוק) | אותו קובץ |
| מפת אתר דו־לשונית | `app/sitemap.ts` → `/sitemap.xml` |
| robots.txt | `app/robots.ts` → `/robots.txt` |
| תמונות AVIF/WebP אוטומטיות | `next.config.ts` → `images.formats` |
| בלי `X-Powered-By` בכותרות | `poweredByHeader: false` |

שלב 3 יוסיף: Alt Tags עשירים לכל תמונה (תשתית כבר מתוכננת ב־`dictionaries`).

---

## 5. החלטות טכנולוגיות (שלב 1)

| החלטה | נימוק |
|---|---|
| **Next.js 16 (App Router)** | SSR/SSG מהיר, ניתוב מובנה, דפלוי טבעי ל־Vercel |
| **Tailwind CSS 4** | קומפילציה מהירה, טוקנים ב־CSS (`@theme`), בלי קובץ קונפיג |
| **shadcn (new-york)** | רכיבים נגישים וקלילים, מותאמים אישית למותג |
| **i18n עצמי קל** (בלי next-intl) | 3 קבצים קטנים במקום תלות כבדה — מהירות טעינה מקסימלית |
| **Heebo + Frank Ruhl Libre** | סנס־סריף נקי + סריף עברי יוקרתי, שניהם עם `display: swap` |
| **Framer Motion** (מותקן, יופעל בשלב 2) | מיקרו־אינטראקציות נוזליות בגלילה/ריחוף |

---

## 6. מפת השלבים

- [x] **שלב 1** — שלד: מבנה, i18n, עיצוב בסיסי, SEO, תשתית 301
- [x] **שלב 2** — דף בית + Hero + גלריות חכמות (אירועים / משפחה / פורטרטים / עסקים) + עמודי אודות וצור קשר + אזור לקוחות להטמעת bchira.app ← *הושלם, נבנה בהצלחה (22 עמודים) ועבר QA חזותי — ממתין לאישור*
- [x] **שלב 3** — AI Art Assistant צף + הרחבת Alt Tags למנועי AI ← *הושלם, נבנה בהצלחה (22 עמודים) ועבר QA חזותי — ממתין לאישור*

## 7. מה נשאר לך לעשות (אחרי האישור)

1. `npm install` → `npm run dev` → לפתוח `http://localhost:3000`
2. דחיפה לגיטהאב → Import ב־Vercel (אפס קונפיגורציה — הפרויקט Vercel-ready)
3. הגדרת `NEXT_PUBLIC_SITE_URL` בסביבת Vercel לכתובת האמיתית
