import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { gallerySlugs, getCategoryImages } from "@/lib/content/galleries";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/home/cta-section";

type LangParams = { params: Promise<{ lang: string }> };

function resolveLocale(lang: string): Locale {
  return (locales as readonly string[]).includes(lang)
    ? (lang as Locale)
    : defaultLocale;
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  return {
    title: `${dict.galleries.title} · ${dict.meta.siteName}`,
    description: dict.galleries.subtitle,
  };
}

/* עמוד הסיפורים — אינדקס עריכתי ממוספר. הטקסט בשטח שלו, התמונה בשלה.
   שום מילה לא יושבת על פרצוף. */
export default async function GalleriesPage({ params }: LangParams) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-36 pb-24 md:pt-44 md:pb-32">
      <SectionHeading
        level="h1"
        eyebrow={dict.nav.galleries}
        title={dict.galleries.title}
        subtitle={dict.galleries.subtitle}
      />

      <div className="mt-16 divide-y divide-border border-y border-border">
        {gallerySlugs.map((slug, i) => {
          const meta = dict.galleries.categories[slug];
          const cover = getCategoryImages(slug)[0];
          return (
            <Link
              key={slug}
              href={`/${locale}/galleries/${slug}`}
              className="group grid items-center gap-8 py-10 md:grid-cols-[64px_1fr_220px] md:gap-12 md:py-12"
            >
              <span
                className="font-display text-4xl text-champagne-400 md:text-5xl"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-champagne-600">
                  {meta.tagline}
                </p>
                <h3 className="mt-3 font-display text-3xl text-foreground transition-colors group-hover:text-champagne-600 md:text-4xl">
                  {meta.title}
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                  {meta.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-champagne-400 decoration-2 underline-offset-8 transition-colors group-hover:text-champagne-600">
                  {dict.galleries.viewFullGallery}
                  <ArrowLeft className="h-4 w-4 ltr:rotate-180" aria-hidden />
                </span>
              </div>
              {cover && (
                <div className="hidden overflow-hidden rounded-md border border-border/50 md:block">
                  <Image
                    src={cover.src}
                    alt={cover.alt[locale]}
                    width={440}
                    height={330}
                    sizes="220px"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <CtaSection lang={locale} dict={dict} />
    </div>
  );
}
