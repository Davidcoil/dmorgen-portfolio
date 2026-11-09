import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { gallerySlugs, type GalleryCategorySlug } from "@/lib/content/galleries";

/* ============================================================================
 * הגלריה: ארבע מילים גדולות. בעכבר, המילה מדליקה את התמונה שלה.
 * בטלפון כל מילה יושבת מתחת לתמונה שלה. בלי JavaScript בכלל.
 * ========================================================================== */
const P = "/images/galleries/";
const COVERS: Record<GalleryCategorySlug, string> = {
  events: `${P}events/real-1.jpg`,
  family: `${P}family/family-whites-lineup.jpg`,
  portraits: `${P}portraits/real-3.jpg`,
  business: `${P}business/headshot-turtleneck-dark.jpg`,
};

export default function GalleriesRoom({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.galleries;
  return (
    <section className="gal" aria-labelledby="gal-title">
      <h1 id="gal-title" className="gal-title">
        {t.title}
      </h1>
      <ul className="walls">
        {gallerySlugs.map((slug, i) => (
          <li key={slug}>
            <Link href={`/${lang}/galleries/${slug}`} className="wall-link">
              <span className="wall-cover">
                <Image src={COVERS[slug]} alt="" fill sizes="(max-width: 900px) 100vw, 46vw" quality={85} priority={i === 0} />
              </span>
              <b>{t.categories[slug].title}</b>
              <small>{t.categories[slug].tagline}</small>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
