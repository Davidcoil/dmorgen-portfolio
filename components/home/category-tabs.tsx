"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  gallerySlugs,
  getCategoryImages,
  type GalleryCategorySlug,
} from "@/lib/content/galleries";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Locale } from "@/lib/i18n/config";
import { SectionHeading } from "@/components/ui/section-heading";
import { Lightbox } from "@/components/gallery/lightbox";

/* סיפורי לקוחות בדף הבית — אינדקס עריכתי לפי סוג הלקוח, לא טאבים רועשים.
   כל סיפור נפתח בהקדמה קצרה; התמונות נושמות בפריים שקט. */
export function CategoryTabs({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [active, setActive] = useState<GalleryCategorySlug>("events");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = getCategoryImages(active);
  const catMeta = dict.galleries.categories[active];

  return (
    <section id="galleries" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:py-36">
      <SectionHeading
        eyebrow={dict.home.galleriesEyebrow}
        title={dict.home.galleriesTitle}
        subtitle={dict.home.galleriesSubtitle}
      />

      {/* אינדקס סיפורים — טקסט עם קו תחתון, לא כפתורי פיל */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {gallerySlugs.map((slug, i) => {
          const isActive = slug === active;
          return (
            <button
              key={slug}
              onClick={() => {
                setActive(slug);
                setLightboxIndex(null);
              }}
              className={cn(
                "group cursor-pointer pb-2 text-sm font-semibold tracking-wide transition-colors duration-300",
                isActive
                  ? "text-foreground underline decoration-champagne-500 decoration-2 underline-offset-8"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="me-2 font-display text-xs text-champagne-400" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              {dict.galleries.categories[slug].title}
            </button>
          );
        })}
      </div>

      {/* פתיחת הסיפור */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="mx-auto mt-10 max-w-2xl text-center"
        >
          <p className="text-xs font-semibold tracking-[0.25em] text-champagne-600">
            {catMeta.tagline}
          </p>
          <p className="mt-4 font-display text-xl leading-relaxed text-foreground/85 md:text-2xl">
            {catMeta.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* תמונות — פריים שקט, בלי צללים כבדים */}
      <motion.div layout className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        <AnimatePresence mode="popLayout">
          {images.map((image, i) => (
            <motion.button
              layout
              key={image.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightboxIndex(i)}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-md border border-border/50 bg-card",
                image.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]",
                "col-span-1",
                i === 0 && "col-span-2 md:col-span-2",
                i === 0 && image.orientation === "portrait" && "aspect-[4/3] md:aspect-[16/10]"
              )}
              aria-label={image.alt[lang]}
            >
              <Image
                src={image.src}
                alt={image.alt[lang]}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute bottom-3 end-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-background/90 text-champagne-600 opacity-0 backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <Expand className="h-4 w-4" />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* קישור לסיפור המלא */}
      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">{dict.home.midCtaText}</p>
        <Link
          href={`/${lang}/contact`}
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-champagne-400 decoration-2 underline-offset-8 transition-colors hover:text-champagne-600 hover:decoration-champagne-600"
        >
          {dict.nav.bookNow}
          <span aria-hidden className="inline-block ltr:-scale-x-100">
            ←
          </span>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <Link
          href={`/${lang}/galleries/${active}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-champagne-400 decoration-2 underline-offset-8 transition-colors hover:text-champagne-600 hover:decoration-champagne-600"
        >
          {dict.galleries.viewFullGallery}
          <ArrowLeft className="h-4 w-4 ltr:rotate-180" aria-hidden />
        </Link>
      </div>

      <Lightbox
        images={images}
        index={lightboxIndex}
        lang={lang}
        dict={dict}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
