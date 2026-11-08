# בריף 6: חדר המחשבות ובוט הטלגרם

**מי:** Codex (הבוט, מודול מבודד) ואז Opus (החדר). **תלוי ב:** בריף 1. מדוד: פתיחת בוט ב-BotFather (שולח `/newbot`, בוחר שם, מעתיק את הטוקן ישירות ל-Vercel כ-`TELEGRAM_BOT_TOKEN`), ומזהה הצ'אט שלו (`TELEGRAM_OWNER_CHAT_ID`, הבוט מדפיס אותו בהודעה הראשונה).

## חלק א, Codex: הבוט
**קבצים:** `app/api/telegram/route.ts` (webhook POST), `lib/telegram/{client,handlers,verify}.ts`, `tests/telegram.test.ts`, `scripts/telegram-set-webhook.mjs`.
- אימות: רק `TELEGRAM_WEBHOOK_SECRET` (header `X-Telegram-Bot-Api-Secret-Token`) ורק מ-`TELEGRAM_OWNER_CHAT_ID`. כל השאר → 200 ושקט.
- טקסט → שורה ב-`thoughts` (`kind='thought'`, `status='draft'`). תמונה → הורדה מטלגרם, העלאה ל-bucket `thoughts`, `kind='photo'`. הודעה קולית → `status='draft'` עם הערה "תמלול בבריף 10".
- תשובה לדוד: תצוגה מקדימה + שלושה כפתורים inline: "לפרסם", "לנעוץ בכניסה", "למחוק". לחיצה = callback → עדכון `status`/`pinned`/`published_at`.
- `/doors` → רשימת החדרים עם כפתור לכל אחד (פתוח/נעול/בקרוב), כותב ל-`doors`. זה ה-admin מהטלפון, בלי אתר.
- בדיקות: אימות ה-secret, דחיית chat id זר, פענוח callback.
- בלי ספריית טלגרם: `fetch` ל-`api.telegram.org`. אפס תלויות.

## חלק ב, Opus: החדר
**קבצים:** `rooms/thoughts/room.json` (door → open), `rooms/thoughts/room.tsx`, `app/[lang]/thoughts/[id]/page.tsx`, `lib/i18n/dictionaries/*` רק `house.thoughts`.
- רשימה כרונולוגית של `published`, מהחדש לישן. מחשבה = טקסט גדול; תמונה = `next/image` מ-Supabase Storage (signed URL בשרת, או bucket ציבורי לקריאה בלבד לפי החלטה ב-`docs/decisions`); "בניתי" = כותרת + שורה.
- נעוץ: מופיע גם בכניסה מתחת לשאלה, שורה אחת, עם "מחדר המחשבות".
- ISR 5 דקות. הנעוץ: `revalidateTag('thoughts')` מהבוט אחרי כל שינוי.
- RSS: `app/thoughts.xml/route.ts`. זה גם המזין של הניוזלטר בעתיד.

## קריטריוני קבלה
- דוד שולח משפט מהטלפון, לוחץ "לפרסם", ותוך 5 דקות הוא ב-`/he/thoughts` עם כתובת משלו.
- הודעה מצ'אט זר לא עושה כלום ולא נרשמת.
- `npm run check` ירוק.

## אסור
לפרסם בלי לחיצת אישור. לכתוב את הטוקן בכל מקום חוץ מ-Vercel. לפתוח את הבוט לאנשים אחרים (זה ממשק של דוד בלבד).
