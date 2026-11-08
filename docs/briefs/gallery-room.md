# בריף 3: חדר הגלריה

**מי:** Opus 5.5. **תלוי ב:** כלום. התמונות והטקסטים כבר ברפו.

## מטרה
`/he/galleries` ו-`/he/galleries/<category>` חוזרים לחיים בעיצוב הבית. ארבע קטגוריות (`lib/content/galleries.ts`), תמונות אמיתיות, בלי להיות מרכז הבמה. בכל קטגוריה שורה אחת של "מה ראיתי פה" מהמילון (`galleries.categories[slug].description`).

## קבצים שמותר לגעת בהם
- `rooms/galleries/room.json` (door → open), `rooms/galleries/room.tsx` (חדש)
- `app/[lang]/galleries/[category]/page.tsx` (חדש) ו-`components/house/gallery-grid.tsx`, `components/house/lightbox.tsx` (חדשים)
- `lib/seo/jsonld.ts`: שימוש ב-`imageGalleryJsonLd` הקיים בלבד
- `app/sitemap.ts`: הוספת עמודי הקטגוריות (נגזר מ-`galleries.ts`, לא רשימה ידנית)
- `tests/galleries.test.ts` (חדש): כל קטגוריה עם 4+ תמונות וטקסט alt לכל אחת

## התנהגות
- גריד מסוני (masonry) בעזרת CSS columns, בלי ספרייה. `next/image` עם `sizes` נכון, `priority` רק לשתי הראשונות.
- לייטבוקס: `<dialog>` נייטיבי, חיצים במקלדת, Escape סוגר, פוקוס חוזר לתמונה. ללא ספרייה.
- קטגוריה: כותרת, השורה "מה ראיתי פה", הגריד, ובסוף שורה אחת מהקיר (ציטוט אחד מ-`home.wall.items` שמתאים לקטגוריה) וקישור לדלפק.
- הטקסט החלופי הקיים (ב-`galleries.ts`) נשאר, בלי קו מפריד ארוך.

## קריטריוני קבלה
- `npm run check` ירוק. Lighthouse ביצועים 90+ בסלולר על `/he/galleries/events` (זה העמוד הכבד).
- הפניות Wix ל-`/he/galleries` נוחתות על חדר פתוח (הבדיקה הקיימת).
- שום טקסט לא יושב על פרצוף.

## אסור
להוסיף ספריית גלריה או לייטבוקס. לשנות את `galleries.ts` חוץ מתיקון alt. להציג מחיר.
