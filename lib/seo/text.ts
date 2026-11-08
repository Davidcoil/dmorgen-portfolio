/* עזרי טקסט לשכבת ה־SEO — מנרמלים מחרוזות מהמילון בלי לגעת בו.
   הכלל: אין מקף ארוך בטקסטים שמוצגים למשתמש, כולל תיאורי מטא ו־llms.txt. */

/** מחליף מקף ארוך בפסיק ומכווץ רווחים כפולים. */
export function cleanSeoText(text: string): string {
  return text
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

/** קוצר תיאור מטא לאורך נתון (ברירת מחדל 160 תווים) בגבול מילה. */
export function truncateDescription(text: string, maxLength = 160): string {
  const clean = cleanSeoText(text);
  if (clean.length <= maxLength) return clean;
  const cut = clean.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : maxLength).trim()}...`;
}
