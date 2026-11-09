"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Hung } from "@/lib/content/hang.ts";

interface Labels {
  close: string;
  prev: string;
  next: string;
}

/* ============================================================================
 * קיר התמונות והתצוגה המוגדלת.
 * <dialog> של הדפדפן: Escape, מלכודת פוקוס והחזרת פוקוס בחינם. בלי ספרייה.
 * בעברית "הבאה" היא שמאלה, גם בחצים וגם בהחלקה.
 * ========================================================================== */
export function GalleryWall({ lang, items, labels }: { lang: Locale; items: Hung[]; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [at, setAt] = useState<number | null>(null);
  const touchX = useRef(0);
  const rtl = lang === "he";
  const n = items.length;

  const open = (i: number) => {
    setAt(i);
    dialog.current?.showModal();
  };
  const go = (d: number) => setAt((a) => ((a ?? 0) + d + n) % n);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
    if (e.key === "ArrowRight") go(rtl ? -1 : 1);
  };
  const onTouchEnd = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go((dx > 0) === rtl ? 1 : -1);
  };

  const current = at === null ? null : items[at];

  return (
    <>
      <ol className="hang">
        {items.map((it, i) => (
          <li
            key={it.image.src}
            className={it.drop ? "pic drop" : "pic"}
            style={{ "--col": it.col, "--row": it.row } as CSSProperties}
          >
            <button type="button" onClick={() => open(i)} aria-haspopup="dialog">
              <Image
                src={it.image.src}
                alt={it.image.alt[lang]}
                width={it.width}
                height={it.height}
                sizes={it.sizes}
                quality={85}
                priority={i < 2}
              />
            </button>
          </li>
        ))}
      </ol>

      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setAt(null)}
        onKeyDown={onKey}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        {current && (
          <>
            <Image
              key={current.image.src}
              className="lb-img"
              src={current.image.src}
              alt={current.image.alt[lang]}
              fill
              sizes="100vw"
              quality={85}
              priority
            />
            <p className="lb-count" aria-live="polite">
              {at! + 1} / {n}
            </p>
            <button type="button" className="lb-btn lb-close" onClick={() => dialog.current?.close()} aria-label={labels.close}>
              ✕
            </button>
            <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label={labels.prev}>
              {rtl ? "→" : "←"}
            </button>
            <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label={labels.next}>
              {rtl ? "←" : "→"}
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
