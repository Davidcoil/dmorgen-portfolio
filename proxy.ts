import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "./lib/i18n/config";

/* ============================================================================
 * ניתוב שפות (i18n routing) — קונבנציית proxy של Next 16
 * ----------------------------------------------------------------------------
 * כל נתיב בלי קידומת שפה (‎/‎, ‎/about‎ …) מופנה אוטומטית ל־‎/he/…‎ —
 * עברית היא שפת המקור והברירת מחדל.
 *
 * להדלקת אנגלית בעתיד: שום שינוי כאן לא נדרש — הנתיבים ‎/en/…‎ כבר עובדים,
 * צריך רק למלא את המילון lib/i18n/dictionaries/en.ts ולקשר אליהם מהתפריט.
 * (אופציונלי: להחליף את defaultLocale בזיהוי אוטומטי לפי Accept-Language.)
 * ========================================================================== */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
