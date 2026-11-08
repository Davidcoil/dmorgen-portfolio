"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";

type Entrance = Dictionary["house"]["entrance"];
const KEY = "house.path";

/* ============================================================================
 * השאלה בכניסה. חמישה כפתורים, תשובה אחת, והבית זוכר (localStorage, שורה אחת).
 * הכפתורים הם <button> אמיתיים, ולכן קוראי מסך ומקלדת מקבלים אותם כמו שהם.
 * ה-live region מקריא את התשובה למי שלא רואה אותה.
 * ========================================================================== */
export function Paths({ lang, t, skipLabel }: { lang: Locale; t: Entrance; skipLabel: string }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved && t.paths.some((p) => p.id === saved)) {
        setChosen(saved);
        setReturning(true);
      }
    } catch {
      /* פרטי או חסום: הבית פשוט לא זוכר */
    }
  }, [t.paths]);

  function choose(id: string) {
    setChosen(id);
    setReturning(false);
    try {
      window.localStorage.setItem(KEY, id);
    } catch {
      /* ראו למעלה */
    }
  }

  const path = t.paths.find((p) => p.id === chosen);

  return (
    <div className="mt-6">
      {path ? (
        <div role="status" aria-live="polite" className="animate-rise max-w-xl">
          {returning && <p className="mb-3 text-sm text-paper-dim">{t.returning}</p>}
          <p className="font-display text-2xl leading-snug text-paper md:text-3xl">{path.reply}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={`/${lang}/${path.room}`}
              className="inline-flex h-12 items-center rounded-full bg-door px-7 text-base font-bold text-night transition-colors hover:bg-lamp"
            >
              {path.cta}
            </Link>
            <button
              type="button"
              onClick={() => setChosen(null)}
              className="text-sm text-paper-dim underline decoration-line-strong underline-offset-4 hover:text-paper"
            >
              {t.changeAnswer}
            </button>
          </div>
        </div>
      ) : (
        <ul className="flex max-w-xl flex-col gap-3" aria-label={t.question}>
          {t.paths.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => choose(p.id)}
                className="w-full rounded-lg border border-line bg-night-2/70 px-5 py-4 text-start text-base leading-snug text-paper transition-colors hover:border-lamp hover:bg-night-3 md:text-lg"
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6">
        <a href="#map" className="text-sm text-paper-faint underline-offset-4 hover:text-paper hover:underline">
          {skipLabel}
        </a>
      </p>
    </div>
  );
}
