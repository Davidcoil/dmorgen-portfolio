"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Locale } from "@/lib/i18n/config";

/* "מה אתם מתכננים?" ארבעה סוגי צילום מיד אחרי הפתיח, כל אחד מוביל לגלריה שלו. */
export function ShootTypes({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home.shootTypes;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <h2 className="font-display text-3xl text-foreground md:text-4xl">{t.title}</h2>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {t.items.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col border-t-2 border-champagne-300 pt-6"
            >
              <h3 className="font-display text-xl text-foreground">{item.title}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
              <Link
                href={`/${lang}/galleries/${item.slug}`}
                className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-foreground underline decoration-champagne-400 decoration-2 underline-offset-8 transition-colors hover:text-champagne-600 hover:decoration-champagne-600"
              >
                {t.cta}
                <ArrowLeft className="h-4 w-4 ltr:rotate-180" aria-hidden />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
