import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

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
    title: `${dict.nav.about} · ${dict.meta.siteName}`,
    description: dict.about.paragraphs[0],
  };
}

/* עמוד “האדם מאחורי המצלמה” — החיבור האישי שמוכר. */
export default async function AboutPage({ params }: LangParams) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const t = dict.about;

  return (
    <div className="mx-auto max-w-6xl px-6 pt-36 pb-24 md:pt-44 md:pb-32">
      <SectionHeading level="h1" eyebrow={t.eyebrow} title={t.title} />

      <div className="mt-14 grid items-start gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-2">
          <figure className="overflow-hidden rounded-lg border border-border/50">
            <Image
              src="/images/about-david-real.jpg"
              alt={t.imageAlt}
              width={800}
              height={1000}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="aspect-[4/5] w-full object-cover"
              priority
            />
          </figure>
          <figcaption className="mt-3 text-xs tracking-wide text-muted-foreground">
            {t.imageAlt}
          </figcaption>
        </div>

        <div className="md:col-span-3">
          {t.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-display text-2xl leading-relaxed text-foreground/90 md:text-[1.7rem]"
                  : "mt-6 text-base leading-relaxed text-muted-foreground md:text-lg"
              }
            >
              {p}
            </p>
          ))}

          <div className="mt-12 divide-y divide-border border-y border-border">
            {t.values.map((v) => (
              <div key={v.title} className="py-6">
                <h3 className="font-display text-xl text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {v.text}
                </p>
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="mt-10">
            <Link href={`/${locale}/contact`}>{t.cta}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
