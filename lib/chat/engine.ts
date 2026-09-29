/* ============================================================================
 * מנוע זיהוי כוונה — פונקציות טהורות, בלי תלות ב־DOM.
 *
 * - מזהה מספר טלפון לפני הכל (הצעת callback).
 * - guard לחתונות מקבל עדיפות על פני כוונות שירות.
 * - ניקוד לפי מילות מפתח; מילים קצרות (עד 3 תווים) נבדקות בגבול מילה.
 * ========================================================================== */

import type { Locale } from "@/lib/i18n/config";
import { getIntents, type Intent, type IntentId } from "./kb";

const PHONE_RE = /(?:\+?972[- ]?|0)?5\d(?:[- ]?\d){7}\b|\b\d{9,}\b/;

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

/** האם מילת המפתח מופיעה בטקסט — מילים קצרות רק בגבול מילה. */
function matches(text: string, keyword: string): boolean {
  const kw = keyword.toLowerCase();
  if (kw.length <= 3) {
    // גבול מילה שעובד גם בעברית (אין \b אמין ליוניקוד)
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}([^\\p{L}\\p{N}]|$)`, "u").test(text);
  }
  return text.includes(kw);
}

export function detectPhone(text: string): string | null {
  const m = text.match(PHONE_RE);
  return m ? m[0] : null;
}

export function detectIntent(raw: string, lang: Locale): { id: IntentId; phone?: string } {
  const text = normalize(raw);
  if (!text) return { id: "fallback" };

  const phone = detectPhone(raw);
  if (phone) return { id: "callback", phone };

  const intents = getIntents(lang);

  // guard לחתונות — לפני כוונות השירות
  const wedding = intents.find((i) => i.id === "wedding")!;
  if (wedding.keywords[lang].some((k) => matches(text, k))) {
    return { id: "wedding" };
  }

  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    if (intent.id === "wedding" || intent.id === "callback" || intent.id === "fallback") continue;
    const score = intent.keywords[lang].filter((k) => matches(text, k)).length;
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return { id: best && bestScore > 0 ? best.id : "fallback" };
}

export function getIntent(lang: Locale, id: IntentId): Intent {
  const found = getIntents(lang).find((i) => i.id === id);
  if (!found) throw new Error(`Unknown chat intent: ${id}`);
  return found;
}
