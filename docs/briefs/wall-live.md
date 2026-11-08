# בריף 4: הקיר החי

**מי:** Opus 5.5. **תלוי ב:** בריף 1 (Supabase). מדוד: Place ID של פרופיל העסק בגוגל ומפתח Places API (מועתק ישירות ל-Vercel כ-`GOOGLE_PLACES_API_KEY`), ומפתחות Turnstile (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`).

## מטרה
`/he/wall` פתוח: תשעת הציטוטים הקיימים (`home.wall.items`) ממוסגרים כמכתבים, חותמות של מבקרים (מאושרות), וביקורות גוגל שנכנסות בלילה. טופס חותם עם Turnstile, מודרציה לפני פרסום, כל חותם מקבל כתובת משלו.

## קבצים שמותר לגעת בהם
- `rooms/wall/room.json` (door → open), `rooms/wall/room.tsx`, `rooms/wall/mark-form.tsx` (client), `rooms/wall/mark.tsx`
- `app/[lang]/wall/[id]/page.tsx` (עמוד לחותם בודד; OG מגיע מבריף 9)
- `app/api/marks/route.ts` (POST בלבד)
- `app/api/cron/google-reviews/route.ts` (GET, מוגן ב-`CRON_SECRET`), ו-`vercel.json` (cron יומי 03:00 ירושלים)
- `lib/supabase/server.ts` (חדש, service role, שרת בלבד), `lib/supabase/public.ts` (חדש, anon, קריאה בלבד)
- `lib/turnstile.ts` (חדש), `lib/rate-limit.ts` (חדש: hash של IP + מלח יומי, 1 חותם לדקה, 5 ליום)
- `lib/i18n/dictionaries/*`: רק בתוך `house.wall` (חדש)
- `tests/wall.test.ts`: אימות קלט (אורך, HTML מסונן, שפה), ו-rate-limit כפונקציה טהורה
- `package.json`: מותר להוסיף `@supabase/supabase-js` בלבד

## התנהגות
- טופס: שם (עד 40), טקסט (עד 280), Turnstile. שליחה → `pending`. הודעה: "קיבלתי. אני קורא הכול בעצמי, גם בשתיים בלילה. בעיקר בשתיים בלילה." (קיים ב-MAGNET).
- מודרציה: שלב B בלי AI. החותם מחכה ל-`approved` מ-/admin (בריף 8). `moderation` נשאר ריק עד בריף 10.
- ביקורות גוגל: Cron לילי שולף עד 5 ביקורות (Places Details, שדה `reviews`), שומר כ-`source='google'`, `external_id` = מזהה הביקורת, `status='approved'`. מטמון: לא קוראים ל-Places בזמן רינדור, אף פעם.
- תצוגה: קריאה דרך ה-view `wall` בלבד, ISR של 10 דקות. כל חותם: ציטוט, שם, מקור ("אורח", "לקוח", "גוגל"), תאריך יחסי, קישור לעמוד שלו, כפתור "דווח" (mailto בשלב זה) ו"הסר את החותם שלי" (mailto).
- תנאי הקיר (`docs/legal/wall-terms.md`) מקושרים מהטופס.

## קריטריוני קבלה
- `npm run check` ירוק. POST בלי Turnstile תקף → 400. POST שישי בדקה → 429.
- anon לא יכול לכתוב (RLS). ה-API משתמש ב-service role בשרת בלבד.
- Lighthouse נגישות 100: טופס עם תוויות, שגיאות מוקראות.
- אפס קריאות רשת ל-Google בזמן בקשת עמוד.

## אסור
לשמור IP גולמי. לפרסם חותם בלי `approved`. להמציא ביקורות או "מבקרים". לרנדר טקסט גולשים כ-HTML.
