"use client";

import { useEffect, useState, type MouseEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { walkTo } from "@/components/house/house-motion";

type Entrance = Dictionary["house"]["entrance"];
const KEY = "house.path";

function markDoor(room?: string) {
  document.querySelectorAll(".room.target").forEach((d) => d.classList.remove("target"));
  if (room) document.querySelector(`.room[data-slug="${room}"]`)?.classList.add("target");
}

/* ============================================================================
 * השאלה בכניסה. הבחירה מסמנת דלת במסדרון, והכפתור הולך אליה ברגל.
 * הבית זוכר את התשובה (localStorage בלבד). בלי JS יש "דלג" למסדרון.
 * ========================================================================== */
export function Paths({ lang, t, skipLabel }: { lang: Locale; t: Entrance; skipLabel: string }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      const p = t.paths.find((x) => x.id === saved);
      if (p) {
        setChosen(p.id);
        setReturning(true);
        markDoor(p.room);
      }
    } catch {
      /* פרטי או חסום: הבית פשוט לא זוכר */
    }
  }, [t.paths]);

  function choose(id: string | null) {
    setChosen(id);
    setReturning(false);
    markDoor(t.paths.find((p) => p.id === id)?.room);
    try {
      if (id) window.localStorage.setItem(KEY, id);
      else window.localStorage.removeItem(KEY);
    } catch {
      /* ראו למעלה */
    }
  }

  const path = t.paths.find((p) => p.id === chosen);

  if (path) {
    const walk = (e: MouseEvent) => {
      if (walkTo(path.room)) e.preventDefault();
    };
    return (
      <div role="status" aria-live="polite" className="reply">
        {returning && <p className="back">{t.returning}</p>}
        <p className="reply-text">{path.reply}</p>
        <a className="cta" href={`/${lang}/${path.room}`} onClick={walk}>
          <span>{path.cta}</span>
          <i aria-hidden>{lang === "he" ? "←" : "→"}</i>
        </a>
        <button type="button" className="quiet-link" onClick={() => choose(null)}>
          {t.changeAnswer}
        </button>
      </div>
    );
  }

  return (
    <>
      <ul className="chips" aria-labelledby="ask">
        {t.paths.map((p) => (
          <li key={p.id}>
            <button type="button" className="chip" onClick={() => choose(p.id)}>
              {p.label}
            </button>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 24 }}>
        <a className="quiet-link" href="#map">
          {skipLabel}
        </a>
      </p>
    </>
  );
}
