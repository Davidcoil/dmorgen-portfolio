import fs from "node:fs";
import path from "node:path";
import { validateHouse, validateRoom, type Room } from "./schema.ts";

/* ============================================================================
 * רישום החדרים: קורא את rooms/* פעם אחת ומחזיר את הבית ממוין.
 * ----------------------------------------------------------------------------
 * מכאן נגזרים המפה, ה-sitemap, ה-llms.txt והנתיבים. להוסיף חדר = להוסיף תיקייה.
 * מצב הדלת מגיע מ-room.json. בשלב B טבלת doors ב-Supabase תוכל לדרוס אותו
 * (בריף admin-doors), דרך getDoor בלבד, לא דרך הרישום.
 * ========================================================================== */

export const ROOMS_DIR = path.join(process.cwd(), "rooms");

let cache: Room[] | null = null;

export function readRoomsFromDisk(dir = ROOMS_DIR): Room[] {
  const folders = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  const rooms = folders.map((folder) => {
    const file = path.join(dir, folder, "room.json");
    if (!fs.existsSync(file)) throw new Error(`rooms/${folder}: missing room.json`);
    return validateRoom(JSON.parse(fs.readFileSync(file, "utf8")), folder);
  });
  return validateHouse(rooms);
}

export function getRooms(): Room[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  cache = readRoomsFromDisk();
  return cache;
}

export function getRoom(slug: string): Room | undefined {
  return getRooms().find((r) => r.slug === slug);
}

export function getHomeRoom(): Room {
  return getRooms().find((r) => r.home)!;
}

/** החדרים שמופיעים במפה: כולם חוץ מהכניסה */
export function getDoors(): Room[] {
  return getRooms().filter((r) => !r.home);
}
