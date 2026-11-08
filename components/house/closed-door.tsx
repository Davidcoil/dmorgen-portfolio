import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Room } from "@/lib/rooms/schema.ts";

/* דלת סגורה: השם, השלט, והתקציר (כדי שגוגל ומודלים יידעו מה יהיה פה). */
export function ClosedDoor({ lang, dict, room }: { lang: Locale; dict: Dictionary; room: Room }) {
  const t = dict.house;
  return (
    <section className="relative isolate overflow-hidden">
      <div className="lamp-glow" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-5 pt-32 pb-24 md:pt-44">
        <p className="text-sm font-bold tracking-widest text-door">{t.map[room.door]}</p>
        <h1 className="mt-3 font-display text-5xl text-paper md:text-7xl">{room.name[lang]}</h1>
        <p className="mt-8 max-w-xl font-display text-2xl leading-snug text-lamp-soft md:text-3xl">
          {room.sign?.[lang]}
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-dim">{room.summary[lang]}</p>
        <Link
          href={`/${lang}#map`}
          className="mt-12 inline-flex h-12 items-center rounded-full border border-line-strong px-7 text-base font-bold text-paper transition-colors hover:border-lamp hover:text-lamp"
        >
          {t.door.back}
        </Link>
      </div>
    </section>
  );
}
