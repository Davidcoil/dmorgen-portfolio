import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMeta } from "@/lib/seo/meta";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import {
  gallerySlugs,
  getCategoryImages,
  type GalleryCategorySlug,
} from "@/lib/content/galleries";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/home/cta-section";
import { breadcrumbJsonLd, imageGalleryJsonLd } from "@/lib/seo/jsonld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { truncateDescription } from "@/lib/seo/text";

type PageParams = { params: Promise<{ lang: string; category: string }> };

function resolveLocale(lang: string): Locale {
  return (locales as readonly string[]).includes(lang)
    ? (lang as Locale)
    : defaultLocale;
}

function resolveCategory(category: string): GalleryCategorySlug | null {
  return (gallerySlugs as string[]).includes(category)
    ? (category as GalleryCategorySlug)
    : null;
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    gallerySlugs.map((category) => ({ lang, category }))
  );
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang, category } = await params;
  const locale = resolveLocale(lang);
  const slug = resolveCategory(category);
  if (!slug) return {};
  const dict = await getDictionary(locale);
  const meta = dict.galleries.categories[slug];
  return pageMeta(
    locale,
    `/galleries/${slug}`,
    meta.metaTitle,
    truncateDescription(meta.intro),
    dict.meta.siteName,
    getCategoryImages(slug)[0]?.alt[locale] ?? dict.hero.imageAlt
  );
}

/* עמוד גלריה לקטגוריה: כותרת SEO + גריד מייסונרי + לייטבוקס. */
export default async function CategoryPage({ params }: PageParams) {
  const { lang, category } = await params;
  const locale = resolveLocale(lang);
  const slug = resolveCategory(category);
  if (!slug) notFound();

  const dict = await getDictionary(locale);
  const meta = dict.galleries.categories[slug];
  const images = getCategoryImages(slug);

  const jsonLd = imageGalleryJsonLd({
    lang: locale,
    name: `${meta.title} · ${dict.meta.siteName}`,
    description: meta.intro,
    pagePath: `/${locale}/galleries/${slug}`,
    images,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 md:pt-44 md:pb-32">
      <JsonLdScript data={jsonLd} />
      <JsonLdScript
        data={breadcrumbJsonLd([
          [dict.meta.siteName, `/${locale}`],
          [dict.nav.galleries, `/${locale}/galleries`],
          [meta.title, `/${locale}/galleries/${slug}`],
        ])}
      />
      <Link
        href={`/${locale}/galleries`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
      >
        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
        {dict.galleries.backToGalleries}
      </Link>

      <div className="mt-8">
        <SectionHeading
          level="h1"
          align="start"
          eyebrow={meta.tagline}
          title={meta.title}
          subtitle={meta.intro}
        />
      </div>

      <div className="mt-12">
        <GalleryGrid images={images} lang={locale} dict={dict} />
      </div>

      <CtaSection
        lang={locale}
        dict={dict}
        copy={{ ...dict.galleries.cta, primary: meta.cta }}
      />
    </div>
  );
}
