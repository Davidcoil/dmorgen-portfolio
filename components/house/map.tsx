import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Room } from "@/lib/rooms/schema.ts";

/* ============================================================================
 * המפה: רשימת הדלתות, נגזרת מהרישום. בסלולר רשימה יפה, בלי תלת-ממד.
 * דלת סגורה מציגה את השלט שלה. דלת נעולה היא תוכן, לא חוסר.
 * העומק במחשב (CSS 3D) הוא שכבה שתתווסף בבריף map-depth, לא כאן.
 * ========================================================================== */
export function HouseMap({ lang, dict, rooms }: { lang: Locale; dict: Dictionary; rooms: Room[] }) {
  const t = dict.house.map;

  return (
    <section id="map" aria-labelledby="map-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <h2 id="map-title" className="font-display text-4xl text-paper md:text-5xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-paper-dim">{t.subtitle}</p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => {
            const open = room.door === "open";
            const label = t[room.door];
            const Inner = (
              <>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-paper">{room.name[lang]}</h3>
                  <span
                    className={
                      "shrink-0 rounded-full px-3 py-1 text-xs font-bold " +
                      (open ? "bg-lamp text-night" : room.door === "locked" ? "border border-door text-door" : "border border-line-strong text-paper-dim")
                    }
                  >
                    {label}
                  </span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-paper-dim">
                  {open ? room.summary[lang] : room.sign?.[lang]}
                </p>
                {open && <span className="mt-5 inline-block text-sm font-bold text-lamp">{t.enter}</span>}
              </>
            );
            return (
              <li key={room.slug}>
                <Link
                  href={`/${lang}/${room.slug}`}
                  aria-label={`${room.name[lang]}, ${label}`}
                  className="block h-full rounded-lg border border-line bg-night-2/60 p-6 transition-colors hover:border-lamp hover:bg-night-3"
                >
                  {Inner}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
