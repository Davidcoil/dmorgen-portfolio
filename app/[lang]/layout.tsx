import type { Metadata } from "next";
import { Suez_One, Rubik } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, isRtlLocale, locales, type Locale } from "@/lib/i18n/config";
import { HouseHeader } from "@/components/house/header";
import { HouseFooter } from "@/components/house/footer";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { professionalServiceJsonLd } from "@/lib/seo/jsonld";

/* ============================================================================
 * שלד הבית לכל שפה: <html> עם lang ו-dir, גופנים, כותרת, פוטר, סכמה.
 * דיספליי: Suez One, כבד וחם, עברית שלא מתביישת. גוף: Rubik.
 * ========================================================================== */
const fontDisplay = Suez_One({
  subsets: ["hebrew", "latin"],
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

const fontBody = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type LangParams = { params: Promise<{ lang: string }> };

export function resolveLocale(lang: string): Locale {
  return (locales as readonly string[]).includes(lang) ? (lang as Locale) : defaultLocale;
}

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dmorgen.com").replace(/\/$/, "");
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: dict.meta.title, template: `%s · ${dict.meta.siteName}` },
    description: dict.meta.description,
    alternates: { canonical: `/${locale}`, languages: { he: "/he", en: "/en" } },
    openGraph: {
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      siteName: dict.meta.siteName,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: dict.hero.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({ children, params }: LangParams & { children: React.ReactNode }) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={isRtlLocale(locale) ? "rtl" : "ltr"}
      className={`${fontBody.variable} ${fontDisplay.variable}`}
    >
      <body className="min-h-screen bg-night text-paper">
        <a href="#content" className="skip-link">
          {dict.house.skipToContent}
        </a>
        <JsonLdScript
          data={professionalServiceJsonLd({
            lang: locale,
            name: dict.meta.siteName,
            description: dict.meta.description,
          })}
        />
        <HouseHeader lang={locale} dict={dict} />
        <main id="content">{children}</main>
        <HouseFooter lang={locale} dict={dict} />
      </body>
    </html>
  );
}
