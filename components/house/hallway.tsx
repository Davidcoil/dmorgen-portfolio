import type { CSSProperties } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Room } from "@/lib/rooms/schema.ts";

/* ============================================================================
 * המסדרון: נגזר מהרישום. כל חדר הוא דלת, לסירוגין ימין ושמאל, והאחרון בסוף המסדרון.
 * כל הטקסט מגיע מהשרת. התנועה ב-house-motion.tsx.
 * דלת עם `inside` (שאינה נעולה) נפתחת ומראה מי בפנים, גם לפני שהחדר עצמו מוכן.
 *
 * התמונות על הקירות: מבוגרים בלבד. לפני פתיחה לציבור צריך הסכמה מכל מי שמופיע
 * (docs/legal/consent-photo.md).
 * ========================================================================== */
const P = "/images/galleries/";
const FRAMES = [
  "business/headshot-blue-shirt.jpg",
  "business/headshot-suit-maroon-tie.jpg",
  "business/headshot-turtleneck-dark.jpg",
  "business/headshot-dentist-woman.jpg",
  "business/headshot-laptop-tech.jpg",
  "events/barmitzva-party-4.jpg",
  "business/headshot-doctor-woman.jpg",
  "family/tower-of-david-hug.jpg",
];
const FIRST = 620;
const STEP = 470;
const vars = (o: Record<string, string | number>) => o as CSSProperties;

function Door({ room, lang, z, s, i }: { room: Room; lang: Locale; z: number; s: number; i: number }) {
  const lit = !!room.inside && room.door !== "locked";
  const end = s === 0;
  return (
    <a
      className={`it room ${room.door} ${lit ? "lit" : ""} ${end ? "end" : ""}`}
      href={`/${lang}/${room.slug}`}
      data-slug={room.slug}
      data-z={z}
      style={vars({ "--s": s, transform: `translateZ(${-z}px)` })}
    >
      <div className="door" style={vars({ "--hinge": s === 1 ? "0%" : "100%" })}>
        <div className="inside">
          {lit && <Image src={room.inside!} alt="" width={340} height={620} />}
        </div>
        <div className="leaf">
          <span className="knob" style={vars({ "--knob": s === 1 ? "86%" : "8%" })} />
          {room.tape && (
            <span className="tape" style={vars({ "--t": i % 2 ? "3deg" : "-3deg" })}>
              {room.tape[lang]}
            </span>
          )}
        </div>
        <span className="seam" />
      </div>
      {lit && <div className="spillf" style={vars({ "--a": s === 1 ? "90deg" : "270deg" })} />}
      <div className="plate">
        <b>{room.name[lang]}</b>
        <small>{room.plate[lang]}</small>
      </div>
    </a>
  );
}

export function Hallway({ lang, dict, rooms }: { lang: Locale; dict: Dictionary; rooms: Room[] }) {
  const t = dict.house.map;
  const side = rooms.slice(0, -1);
  const last = rooms[rooms.length - 1];
  const depth = FIRST + (side.length - 1) * STEP + 790;

  return (
    <section id="map" className="hall" aria-labelledby="map-title" style={vars({ "--n": rooms.length })}>
      <noscript>
        <style>{`.stage{display:none}.hall{height:auto}.plain{display:grid}`}</style>
      </noscript>
      <div id="flood" className="flood" aria-hidden />
      <div id="stage" className="stage" data-travel={depth - 1150} style={vars({ "--D": `${depth}px` })}>
        <div className="hud">
          <h2 id="map-title">{t.title}</h2>
          <p>{t.walk}</p>
        </div>
        <div id="world" className="world">
          <div className="surf floor" />
          <div className="surf ceil" />
          <div className="surf wall r" />
          <div className="surf wall l" />
          <div className="surf endw" />
          {side.map((room, i) => {
            const s = i % 2 ? -1 : 1;
            const z = FIRST + i * STEP;
            return <Door key={room.slug} room={room} lang={lang} z={z} s={s} i={i} />;
          })}
          {side.map((room, i) => {
            const s = i % 2 ? 1 : -1;
            const z = FIRST + i * STEP - 40;
            return (
              <figure key={room.slug} className="it" data-z={z} style={vars({ "--s": s, transform: `translateZ(${-z}px)` })}>
                <div className="frame">
                  <Image src={P + FRAMES[i % FRAMES.length]} alt="" width={350} height={438} />
                </div>
              </figure>
            );
          })}
          <Door room={last} lang={lang} z={depth - 2} s={0} i={0} />
        </div>
      </div>
      <nav className="plain" aria-labelledby="map-title">
        {rooms.map((r) => (
          <a key={r.slug} href={`/${lang}/${r.slug}`}>
            {r.name[lang]}
            <small>{r.summary[lang]}</small>
          </a>
        ))}
      </nav>
    </section>
  );
}
