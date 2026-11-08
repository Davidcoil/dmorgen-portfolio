/* ============================================================================
 * חוזה החדר. כל תיקייה ב-rooms/<slug>/ חייבת להכיל room.json שעובר כאן.
 * ----------------------------------------------------------------------------
 * בלי ספריות: האימות הוא קוד פשוט שגם Node (בבדיקות) וגם Next (בשרת) מריצים.
 * חדר שלא עובר את האימות מפיל את הבנייה. זה הכוונה.
 * ========================================================================== */

export type Localized = { he: string; en: string };
export type DoorState = "open" | "locked" | "soon";
export type Unlock = "everyone" | "marked" | "subscribed" | { from: string };

export interface Room {
  /** מזהה החדר = שם התיקייה = מקטע ה-URL אחרי השפה (/he/<slug>) */
  slug: string;
  name: Localized;
  /** התאום הטקסטואלי הקצר: meta description, llms.txt, המפה */
  summary: Localized;
  door: DoorState;
  /** השלט על הדלת כשהיא לא פתוחה. חובה ל-locked ו-soon */
  sign?: Localized;
  /** תנאי הפתיחה. ברירת מחדל: לכולם */
  unlock: Unlock;
  /** סדר במפה. קטן קודם */
  order: number;
  /** שלב הבנייה לפי FOUNDATION §7 */
  phase: 1 | 2 | 3;
  /** בדיוק חדר אחד הוא הכניסה ומוגש בשורש /he */
  home: boolean;
}

const SLUG = /^[a-z][a-z0-9-]{1,30}$/;
const DOORS: readonly DoorState[] = ["open", "locked", "soon"];
const UNLOCKS = ["everyone", "marked", "subscribed"] as const;

function fail(slug: string, msg: string): never {
  throw new Error(`rooms/${slug}/room.json: ${msg}`);
}

function localized(slug: string, field: string, v: unknown, max: number): Localized {
  if (!v || typeof v !== "object") fail(slug, `"${field}" must be {he, en}`);
  const o = v as Record<string, unknown>;
  for (const lang of ["he", "en"] as const) {
    const s = o[lang];
    if (typeof s !== "string" || !s.trim()) fail(slug, `"${field}.${lang}" is required`);
    if (s.length > max) fail(slug, `"${field}.${lang}" is longer than ${max} chars`);
  }
  return { he: o.he as string, en: o.en as string };
}

/** מאמת room.json גולמי ומחזיר Room מוקלד. folder = שם התיקייה בפועל. */
export function validateRoom(raw: unknown, folder: string): Room {
  if (!raw || typeof raw !== "object") fail(folder, "not an object");
  const r = raw as Record<string, unknown>;

  if (r.slug !== folder) fail(folder, `"slug" must equal the folder name ("${folder}")`);
  if (!SLUG.test(folder)) fail(folder, "slug: lowercase letters, digits and dashes only");

  const door = r.door as DoorState;
  if (!DOORS.includes(door)) fail(folder, `"door" must be one of ${DOORS.join(", ")}`);

  const name = localized(folder, "name", r.name, 40);
  const summary = localized(folder, "summary", r.summary, 220);

  let sign: Localized | undefined;
  if (r.sign !== undefined) sign = localized(folder, "sign", r.sign, 200);
  if (door !== "open" && !sign) fail(folder, `a ${door} door needs a "sign"`);

  let unlock: Unlock = "everyone";
  if (r.unlock !== undefined) {
    if (typeof r.unlock === "string") {
      if (!(UNLOCKS as readonly string[]).includes(r.unlock)) {
        fail(folder, `"unlock" must be ${UNLOCKS.join(" | ")} or {from: "YYYY-MM-DD"}`);
      }
      unlock = r.unlock as Unlock;
    } else if (r.unlock && typeof r.unlock === "object") {
      const from = (r.unlock as { from?: unknown }).from;
      if (typeof from !== "string" || Number.isNaN(Date.parse(from))) {
        fail(folder, `"unlock.from" must be an ISO date`);
      }
      unlock = { from };
    } else fail(folder, `"unlock" has the wrong shape`);
  }

  if (typeof r.order !== "number" || !Number.isInteger(r.order)) {
    fail(folder, `"order" must be an integer`);
  }
  if (r.phase !== 1 && r.phase !== 2 && r.phase !== 3) fail(folder, `"phase" must be 1, 2 or 3`);

  const home = r.home === true;

  const allowed = new Set(["slug", "name", "summary", "door", "sign", "unlock", "order", "phase", "home"]);
  for (const key of Object.keys(r)) {
    if (!allowed.has(key)) fail(folder, `unknown field "${key}"`);
  }

  return { slug: folder, name, summary, door, sign, unlock, order: r.order, phase: r.phase, home };
}

/** בדיקות על האוסף כולו: בדיוק כניסה אחת, סדר ייחודי. */
export function validateHouse(rooms: Room[]): Room[] {
  const homes = rooms.filter((r) => r.home);
  if (homes.length !== 1) {
    throw new Error(`exactly one room must have "home": true (found ${homes.length})`);
  }
  const orders = new Map<number, string>();
  for (const r of rooms) {
    const clash = orders.get(r.order);
    if (clash) throw new Error(`rooms "${clash}" and "${r.slug}" share order ${r.order}`);
    orders.set(r.order, r.slug);
  }
  return [...rooms].sort((a, b) => a.order - b.order);
}
