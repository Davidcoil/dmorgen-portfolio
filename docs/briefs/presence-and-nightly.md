# בריף 10: נוכחות חיה ו-Cron לילי

**מי:** Opus 5.5. **תלוי ב:** בריף 1 (Supabase), בריף 4 (יש חותמות), בריף 6 (יש מחשבות). מדוד: מפתח Gemini מ-AI Studio, מועתק ישירות ל-Vercel כ-`GEMINI_API_KEY`.

## חלק א: "3 אנשים בבית עכשיו"
**קבצים:** `components/house/presence.tsx` (client, נטען עצלנית), `lib/supabase/public.ts` (שימוש, לא שינוי), `components/house/header.tsx` (שורה אחת).
- Supabase Realtime Presence, ערוץ `house`, מפתח אקראי לכל טאב (לא מזהה אדם).
- טקסט: "3 אנשים בבית עכשיו". לבד: "אתה לבד בבית עכשיו. תרגיש חופשי לגעת בכל דבר." (MAGNET). בלי מספרים מזויפים, אף פעם.
- נטען אחרי `requestIdleCallback`, לא חוסם את הכניסה. תוספת JS עד 10KB gzip (ללא ספריית supabase בכניסה: אם זה דורש אותה, טוענים אותה עצלנית אחרי 3 שניות).

## חלק ב: הלילה
**קבצים:** `app/api/cron/nightly/route.ts` (GET, מוגן `CRON_SECRET`), `lib/nightly/{cleaner,digest,moderate}.ts`, `vercel.json` (03:30 ירושלים), `rooms/toilets/room.json` נשאר locked (היומן מוצג בבריף של השירותים בשלב C; כאן רק מייצרים).
- `moderate`: כל חותם `pending` נשלח ל-Gemini Flash עם הנחיה קצרה: "האם זה פוגעני/משמיץ/פרסומת? JSON {flag, reason}". התוצאה ל-`marks.moderation`. **לא מאשר לבד.** דוד מאשר מהטלגרם (הודעת סיכום עם כפתורים, דרך `lib/telegram/client.ts`).
- `cleaner`: יומן לילי מהנתונים האמיתיים בלבד: כמה חותמות חדשות, כמה מחשבות, איזו שפה. Gemini Flash כותב 3 משפטים בקול המנקה (הנחיה מ-MAGNET §5 של BLUEPRINT), נשמר ב-`thoughts` כ-`kind='thought'`, `status='draft'`, מחבר "המנקה". דוד מאשר או לא.
- `digest`: הודעת בוקר לדוד בטלגרם, כתובה כמו חבר: מה קרה בלילה, מה מחכה לאישור.
- `scrub_ip_hashes()` מ-SQL.
- תקרה: עד 50 קריאות Gemini ללילה. מעבר לזה: עוצרים ומדווחים. זה הסוד לחשבון של עשרות שקלים.

## קריטריוני קבלה
- הרצה ידנית של `/api/cron/nightly` עם ה-secret: יומן טיוטה נוצר, הודעת טלגרם מגיעה, אף חותם לא השתנה ל-`approved` לבד.
- בלי secret → 401.
- `npm run check` ירוק. התקציב בכניסה לא עולה ביותר מ-10KB.

## אסור
AI בזמן רינדור. אישור אוטומטי. מספרי נוכחות מזויפים. יותר מקריאת Cron אחת ביום.
