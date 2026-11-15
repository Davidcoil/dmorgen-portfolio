"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Locale } from "@/lib/i18n/config";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

/* מסלול קורפורייט — מדבר לקונה העסקית (מנהלת משרד / HR / שיווק)
   בשפה שלה: חשבונית מס, ספק מוכר של משרד הביטחון, לוחות זמנים.
   לא טוען לניסיון קורפורייט עשיר — מציע שירות, עם הוכחות אמיתיות. */
export function Corporate({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const t = dict.home.corporate;
  const wa = whatsappLink(t.waMessage);

  return (
    <section className="border-b border-border bg-champagne-50/60">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground"
        >
          {t.subtitle}
        </motion.p>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {t.services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border-t-2 border-champagne-300 pt-6"
            >
              <h3 className="font-display text-xl text-foreground">
                {service.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {service.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 border-y border-border py-10"
        >
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Button asChild size="lg">
              <Link href={`/${lang}/galleries/business`}>
                {t.ctaGallery}
                <ArrowLeft className="h-4 w-4 ltr:rotate-180" aria-hidden />
              </Link>
            </Button>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center rounded-full border border-foreground/30 px-10 text-base font-semibold text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {t.ctaTalk}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
