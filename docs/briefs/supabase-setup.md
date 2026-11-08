# בריף 1: הקמת Supabase

**מי:** Fable, בדפדפן של דוד (Claude in Chrome). דוד עושה רק את ההתחברות בגוגל.

## מטרה
פרויקט Supabase אחד, באזור אירופה, עם הסכמה מ-`supabase/migrations/0001_init.sql`, bucket אחד (`thoughts`, פרטי), ושלושת המשתנים ב-Vercel.

## צעדים
1. דוד: supabase.com, "Sign in with Google". זהו, החלק שלו נגמר.
2. Fable: New project, שם `dmorgen-house`, אזור `eu-central-1` (פרנקפורט), סיסמת DB שנוצרת ונשמרת רק ב-Supabase (לא מועתקת לשום מקום).
3. Fable: SQL Editor, הדבקת `0001_init.sql`, הרצה. לוודא: 7 טבלאות, RLS דולק על כולן, view `wall` קיים.
4. Fable: Storage, bucket `thoughts`, private.
5. Fable: Authentication, Providers: רק Email (magic link). Site URL: `https://dmorgen.com`. Redirect: `https://dmorgen.com/**`, וכתובת ה-preview של ענף house.
6. Fable: Project Settings > API: מעתיק `URL`, `anon key`, `service_role key` ישירות ל-Vercel (Settings > Environment Variables) בשמות:
   - `NEXT_PUBLIC_SUPABASE_URL` (Production + Preview)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Production + Preview)
   - `SUPABASE_SERVICE_ROLE_KEY` (Production + Preview, מסומן Sensitive)
   אף מפתח לא נכתב בצ'אט, בקובץ או בהודעה. אם מפתח נחשף בטעות, מסובבים אותו מיד ב-Supabase.
7. Fable: Supabase > Settings > Auth > MFA: מדליק דו-שלבי לחשבון. GitHub ו-Vercel: לבדוק שדו-שלבי דולק (דוד מאשר באפליקציה).
8. הוספת `.env.example` שורות עם השמות בלבד, בלי ערכים.

## קריטריוני קבלה
- `select count(*) from pg_tables where schemaname='public'` = 7.
- `select * from wall` כ-anon מחזיר 0 שורות ולא שגיאה.
- `insert into marks ...` כ-anon נכשל ב-RLS.
- שלושת המשתנים קיימים ב-Vercel ב-Production וב-Preview.

## אסור
להעתיק מפתח לכל מקום שאינו Vercel. לפתוח מדיניות INSERT ל-anon. להשתמש ב-service role בצד הלקוח.
