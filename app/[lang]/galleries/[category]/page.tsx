import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales } from "@/lib/i18n/config";
import { getCategoryImages, gallerySlugs, type GalleryCategorySlug } from "@/lib/content/galleries";
import { hang } from "@/lib/content/hang.ts";
import { imageGalleryJsonLd } from "@/lib/seo/jsonld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { cleanSeoText } from "@/lib/seo/text";
import { whatsappLink } from "@/lib/site";
import { GalleryWall } from "@/components/house/gallery-wall";
import { resolveLocale } from "../../layout";

type Params = { params: Promise<{ lang: string; category: string }> };

/* קיר אחד. ציטוט אחד בסוף, במילים של מי שצולם. לעסקים עוד אין עדות מעסק, ולכן מוצג ציטוט על מקצועיות. */
const QUOTE: Record<GalleryCategorySlug, number> = { events: 2, family: 0, portraits: 3, business: 6 };

const isSlug = (s: string): s is GalleryCategorySlug => (gallerySlugs as string[]).includes(s);

export function generateStaticParams() {
  return locales.flatMap((lang) => gallerySlugs.map((category) => ({ lang, category })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, category } = await params;
  if (!isSlug(category)) return {};
  const locale = resolveLocale(lang);
  const c = (await getDictionary(locale)).galleries.categories[category];
  return {
    title: c.title,
    description: cleanSeoText(c.description),
    alternates: {
      canonical: `/${locale}/galleries/${category}`,
      languages: { he: `/he/galleries/${category}`, en: `/en/galleries/${category}` },
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { lang, category } = await params;
  if (!isSlug(category)) notFound();
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const t = dict.galleries;
  const c = t.categories[category];
  const images = getCategoryImages(category);
  const quote = dict.home.wall.items[QUOTE[category]];
  const next = gallerySlugs[(gallerySlugs.indexOf(category) + 1) % gallerySlugs.length];
  const wa = whatsappLink(locale === "he" ? `היי דוד, ראיתי את ${c.title} באתר.` : `Hi David, I saw ${c.title} on your site.`);

  return (
    <article className="gal">
      <JsonLdScript
        data={imageGalleryJsonLd({
          lang: locale,
          name: c.title,
          description: cleanSeoText(c.description),
          pagePath: `/${locale}/galleries/${category}`,
          images,
        })}
      />
      <nav className="gal-nav" aria-label={t.title}>
        {gallerySlugs.map((s) => (
          <Link key={s} href={`/${locale}/galleries/${s}`} aria-current={s === category ? "page" : undefined}>
            {t.categories[s].title}
          </Link>
        ))}
      </nav>
      <header className="gal-head">
        <h1>{c.title}</h1>
        <p>{c.description}</p>
      </header>

      <GalleryWall
        lang={locale}
        items={hang(images)}
        labels={{ close: t.closePreview, prev: t.prevImage, next: t.nextImage }}
      />

      <footer className="gal-end">
        <blockquote>
          {quote.quote}
          <cite>
            {quote.who}
            {quote.context ? `, ${quote.context}` : ""}
          </cite>
        </blockquote>
        <div className="gal-actions">
          {wa && (
            <a className="cta" href={wa} rel="noopener">
              <span>{dict.home.cta.primary}</span>
              <i aria-hidden>{locale === "he" ? "←" : "→"}</i>
            </a>
          )}
          <Link className="gal-next" href={`/${locale}/galleries/${next}`}>
            <small>{t.next}</small>
            {t.categories[next].title}
          </Link>
        </div>
      </footer>
    </article>
  );
}
