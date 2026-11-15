/* ============================================================================
 * מקור הביקור, בצד הדפדפן. נשמר רק במכשיר של המבקר (localStorage, 30 יום),
 * ונשלח לדוד רק אם המבקר עצמו שולח פנייה. בלי עוגיות ובלי צד שלישי.
 * מודל: "המגע האחרון שאינו ישיר". ביקור עם מקור (גוגל, ChatGPT, קמפיין) מעדכן,
 * ביקור ישיר לא מוחק מקור קודם. firstSeen נשמר מהביקור הראשון.
 * ========================================================================== */

import type { Attribution } from "@/lib/lead";

const KEY = "dm_attribution";
const TTL_MS = 30 * 86_400_000;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export function captureAttribution(): void {
  try {
    const url = new URL(window.location.href);
    const ref = document.referrer;
    const external = ref && new URL(ref).host !== url.host ? ref : "";
    const fromUrl = Object.fromEntries(PARAMS.map((k) => [k, url.searchParams.get(k) ?? ""]));
    const hasSignal = Boolean(external || PARAMS.some((k) => fromUrl[k]));

    const prev = getAttribution();
    const fresh = prev.firstSeen && Date.now() - Date.parse(prev.firstSeen) < TTL_MS;
    if (fresh && !hasSignal) return;

    const next: Attribution = {
      referrer: external.slice(0, 300),
      landing: url.pathname,
      ...(fromUrl as Record<(typeof PARAMS)[number], string>),
      firstSeen: fresh && prev.firstSeen ? prev.firstSeen : new Date().toISOString(),
    };
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // פרטיות/מצב גלישה בסתר: בלי מקור, הפנייה עדיין נשלחת
  }
}

export function getAttribution(): Partial<Attribution> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<Attribution>;
  } catch {
    return {};
  }
}
