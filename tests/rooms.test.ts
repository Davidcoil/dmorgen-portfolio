/* ============================================================================
 * בדיקת חוזה החדר. רצה ב-Node בלי שום ספרייה: `npm test`.
 * נופלת אם: room.json לא תקין, אין בדיוק כניסה אחת, חדר בלי room.tsx,
 * או הפניה ישנה מ-Wix שמובילה לחדר שלא קיים.
 * ========================================================================== */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { validateHouse, validateRoom } from "../lib/rooms/schema.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const ROOMS = path.join(ROOT, "rooms");

function loadRooms() {
  const folders = fs
    .readdirSync(ROOMS, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  return validateHouse(
    folders.map((f) =>
      validateRoom(JSON.parse(fs.readFileSync(path.join(ROOMS, f, "room.json"), "utf8")), f)
    )
  );
}

test("every room.json is valid and the house has exactly one entrance", () => {
  const rooms = loadRooms();
  assert.ok(rooms.length >= 1);
  assert.equal(rooms.filter((r) => r.home).length, 1);
});

test("every open room has a room.tsx component", () => {
  for (const r of loadRooms()) {
    if (r.door !== "open") continue;
    assert.ok(
      fs.existsSync(path.join(ROOMS, r.slug, "room.tsx")),
      `rooms/${r.slug}/room.tsx is missing but the door is open`
    );
  }
});

test("the validator rejects a broken room", () => {
  assert.throws(() => validateRoom({ slug: "x", door: "open" }, "x"));
  assert.throws(() => validateRoom({ slug: "wall", name: { he: "א", en: "a" }, summary: { he: "א", en: "a" }, door: "locked", order: 1, phase: 1 }, "wall"), /sign/);
  assert.throws(() => validateHouse([]), /exactly one/);
});

test("old Wix redirects land on rooms that exist", async () => {
  const cfg = (await import("../next.config.ts")).default;
  const redirects = await cfg.redirects!();
  const slugs = new Set(loadRooms().map((r) => r.slug));
  for (const r of redirects) {
    const seg = r.destination.replace(/^\/(he|en)\/?/, "").split("/")[0];
    assert.ok(seg === "" || slugs.has(seg), `redirect ${r.source} -> ${r.destination}: no room "${seg}"`);
  }
});
