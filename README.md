# דוד מורגנשטרן · אתר פורטפוליו פרימיום

אתר תדמית יוקרתי לצילום אירועים משפחתיים ועסקיים וצילומי משפחה.
עברית (RTL) כשפת מקור · תשתית דו־לשונית מוכנה · Vercel-ready.

> פירוט הארכיטקטורה המלא: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

## הרצה מקומית

```bash
npm install
npm run dev
# http://localhost:3000  →  מופנה אוטומטית ל־/he
```

## דפלוי ל־Vercel

1. לדחוף את התיקייה לריפו בגיטהאב.
2. ב־Vercel: **Add New → Project → Import** את הריפו (אפס קונפיגורציה — מזוהה אוטומטית כ־Next.js).
3. ב־Environment Variables להוסיף:
   - `NEXT_PUBLIC_SITE_URL` = כתובת האתר הציבורית (ל־sitemap וקישורים קנוניים)
4. Deploy.

## הפניות 301 מוויקס

לערוך את המערך `wixRedirects` ב־`next.config.ts`:

```ts
{ source: "/old-wix-path", destination: "/he/new-path", permanent: true },
```

כל דפלוי מחדש מחיל את ההפניות — בלי לאבד דירוג בגוגל.

## הוספת אנגלית (כשיגיע הזמן)

1. לערוך מחרוזות ב־`lib/i18n/dictionaries/en.ts` (הטיפוס `Dictionary` מוודא שאין מפתח חסר)
2. להוסיף בורר שפה בתפריט
3. זהו — הנתיבים `/en/…`, ה־SEO וה־sitemap כבר עובדים

## מבנה מהיר

| תיקייה | תפקיד |
|---|---|
| `app/[lang]/` | עמודים לפי שפה (RTL/LTR אוטומטי): בית, גלריות, אודות, צור קשר, אזור לקוחות |
| `components/` | `layout/` פריסה · `home/` דף הבית · `gallery/` גלריות ולייטבוקס · `contact/` טופס · `ui/` shadcn |
| `lib/` | `i18n/` שפות ומילונים · `content/galleries.ts` תמונות + alt עשיר · `site.ts` קבועים |
| `public/images/` | תמונות placeholder אמנותיות (יוחלפו בעבודות האמיתיות) |

## סטטוס

- [x] שלב 1 — שלד הפרויקט
- [x] שלב 2 — דף בית, Hero, גלריות חכמות, אודות, צור קשר, אזור לקוחות (bchira.app)
- [ ] שלב 3 — AI Art Assistant, הרחבת Alt Tags למנועי AI
