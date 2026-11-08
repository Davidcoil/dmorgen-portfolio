"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* 404. בקובץ הזה אין גישה ל-params, ולכן השפה נקראת מהכתובת והטקסט יושב כאן. */
const COPY = {
  he: { title: "העמוד הזה לא פוטוגני.", sub: "יצא מהפריים.", back: "חזרה לכניסה" },
  en: { title: "This page wasn't photogenic.", sub: "It left the frame.", back: "Back to the entrance" },
};

export default function NotFound() {
  const lang = usePathname().startsWith("/en") ? "en" : "he";
  const t = COPY[lang];
  return (
    <section className="mx-auto max-w-3xl px-5 pt-40 pb-32">
      <p className="text-sm font-bold text-door">404</p>
      <h1 className="font-display mt-3 text-5xl text-paper md:text-7xl">{t.title}</h1>
      <p className="mt-4 text-2xl text-paper-dim">{t.sub}</p>
      <Link
        href={`/${lang}`}
        className="mt-12 inline-flex h-12 items-center rounded-full border border-line-strong px-7 font-bold text-paper hover:border-lamp hover:text-lamp"
      >
        {t.back}
      </Link>
    </section>
  );
}
