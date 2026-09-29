import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Locale } from "@/lib/i18n/config";

/* טיזר “האדם מאחורי המצלמה” — שקט, אנושי. כל “אני” מתורגם מיד ל־“מה זה נותן לכם”. */
export function AboutTeaser({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.home.aboutTeaser;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-36">
      <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-champagne-600">
            <span className="h-px w-8 bg-champagne-500" aria-hidden />
            {t.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.18] text-balance text-foreground md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.text}
          </p>
          <Link
            href={`/${lang}/about`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-champagne-400 decoration-2 underline-offset-8 transition-colors hover:text-champagne-600 hover:decoration-champagne-600"
          >
            {t.cta}
            <ArrowLeft className="h-4 w-4 ltr:rotate-180" aria-hidden />
          </Link>
        </div>

        <figure className="order-first md:order-last">
          <div className="overflow-hidden rounded-lg border border-border/60">
            <Image
              src="/images/about-photographer.jpg"
              alt={t.imageAlt}
              width={900}
              height={1125}
              sizes="(max-width: 768px) 100vw, 46vw"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.03]"
            />
          </div>
          <figcaption className="mt-4 text-xs tracking-wide text-muted-foreground">
            {t.imageAlt}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
