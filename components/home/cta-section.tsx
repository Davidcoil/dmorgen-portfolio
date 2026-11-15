"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Locale } from "@/lib/i18n/config";
import { siteConfig, whatsappLink } from "@/lib/site";

/* סקשן סגירה — שקט ובטוח: כותרת סריף גדולה, CTA רך. בלי כרטיסים, בלי רעש. */
export function CtaSection({
  lang,
  dict,
  copy,
}: {
  lang: Locale;
  dict: Dictionary;
  /** בעמודי הגלריות: "צריכים צילום כזה?" במקום סגירת דף הבית */
  copy?: { title: string; subtitle: string; primary: string };
}) {
  const c = copy ?? dict.home.cta;
  const wa = whatsappLink(
    lang === "he"
      ? "היי דוד, אני רוצה לספר לך מה אנחנו מתכננים לצלם."
      : "Hi David, I'd like to tell you what we're planning to photograph."
  );

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 text-center md:pb-36">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="border-y border-border py-16 md:py-24"
      >
        <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.3em] text-champagne-600">
          <span className="h-px w-8 bg-champagne-500" aria-hidden />
          {dict.nav.contact}
          <span className="h-px w-8 bg-champagne-500" aria-hidden />
        </p>
        <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl leading-[1.18] text-balance text-foreground md:text-6xl">
          {c.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {c.subtitle}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Button asChild size="lg">
            <Link href={`/${lang}/contact`}>{c.primary}</Link>
          </Button>
          {wa && !copy && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center rounded-full border border-foreground/30 px-10 text-base font-semibold text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
            >
              {dict.home.cta.secondary}
            </a>
          )}
        </div>
        {!siteConfig.whatsappNumber && (
          <p className="mt-6 text-xs text-muted-foreground">
            {dict.contact.form.missingNumber}
          </p>
        )}
      </motion.div>
    </section>
  );
}
