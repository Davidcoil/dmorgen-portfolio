"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";

/* הקיר: מה שאנשים כתבו אחרי. ציטוטים אמיתיים מהודעות של לקוחות (2018 עד 2023),
   שמות פרטיים בלבד. הגרסה הראשונה של "הקיר" מהבית; בשלב B הוא נהיה חי
   (חותמות של מבקרים, ביקורות גוגל) ומקבל את העיצוב החדש. */
export function Wall({
  dict,
  limit,
  compact = false,
}: {
  dict: Dictionary;
  limit?: number;
  compact?: boolean;
}) {
  const t = dict.home.wall;
  const items = limit ? t.items.slice(0, limit) : t.items;

  return (
    <section className={compact ? "" : "border-y border-border bg-card/40"}>
      <div className={compact ? "" : "mx-auto max-w-6xl px-6 py-24 md:py-32"}>
        {!compact && (
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-champagne-600">
              <span className="h-px w-10 bg-champagne-500" aria-hidden />
              {t.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-3xl text-foreground md:text-5xl">
              {t.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.subtitle}
            </p>
          </div>
        )}

        <ul
          className={
            compact
              ? "mt-10 grid gap-6"
              : "mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
          }
        >
          {items.map((item, i) => (
            <motion.li
              key={item.who + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 border-s-2 border-champagne-300 ps-5"
            >
              <blockquote className="font-display text-lg leading-snug text-foreground md:text-xl">
                {item.quote}
              </blockquote>
              <footer className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground/80">{item.who}</span>
                {item.context ? <span>, {item.context}</span> : null}
              </footer>
            </motion.li>
          ))}
        </ul>

        {!compact && t.note ? (
          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
