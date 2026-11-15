"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Locale } from "@/lib/i18n/config";

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* Hero טיפוגרפי עריכתי — הכותרת מובילה, התמונה נושמת לצידה.
   עקרון ברזל: אף מילה לא יושבת על פרצוף של אדם. */
export function Hero({
  lang,
  dict,
  variant = "a",
}: {
  lang: Locale;
  dict: Dictionary;
  variant?: "a" | "b";
}) {
  const copy = variant === "b" ? dict.hero.alt : dict.hero;
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-28 pb-24 md:pt-44 md:pb-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* טקסט — תמיד ראשון, תמיד נקי מתמונה */}
        <div>
          <motion.p
            variants={item}
            initial="hidden"
            animate="show"
            custom={0}
            className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-champagne-600"
          >
            <span
              className="h-px w-10 bg-champagne-500"
              aria-hidden
            />
            {dict.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-7 font-display text-[2.9rem] leading-[1.12] text-balance text-foreground md:text-6xl lg:text-[4.4rem]"
          >
            {copy.title}
          </motion.h1>

          <motion.p
            variants={item}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {copy.subtitle}
          </motion.p>

          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-wrap items-center gap-7"
          >
            <Link
              href={`/${lang}/galleries`}
              className="rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-all duration-300 hover:bg-champagne-600"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="text-sm font-semibold text-foreground underline decoration-champagne-400 decoration-2 underline-offset-8 transition-colors hover:text-champagne-600 hover:decoration-champagne-600"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* תצוגה מקדימה בלבד: מעבר בין שתי חלופות הכותרת */}
          <p className="mt-12 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {dict.hero.previewSwitch}
            {(["a", "b"] as const).map((v) => (
              <Link
                key={v}
                href={v === "a" ? `/${lang}` : `/${lang}?hero=b`}
                scroll={false}
                className={
                  v === variant
                    ? "rounded-full bg-foreground px-3 py-1 font-semibold text-background"
                    : "rounded-full border border-border px-3 py-1 hover:border-foreground"
                }
              >
                {v.toUpperCase()}
              </Link>
            ))}
          </p>
        </div>

        {/* תמונה — פריים שקט, כיתוב מתחת. שום טקסט עליה. */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/hero-real.jpg"
              alt={dict.hero.imageAlt}
              width={1200}
              height={1500}
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption className="mt-4 text-xs tracking-wide text-muted-foreground">
            {dict.hero.imageAlt}
          </figcaption>
        </motion.figure>
      </div>

      {/* קו שיער סוגר */}
      <div className="mx-auto max-w-7xl px-6" aria-hidden>
        <div className="border-t border-border" />
      </div>
    </section>
  );
}
