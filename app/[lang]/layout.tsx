import type { Metadata } from "next";
import { Secular_One, Rubik } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  defaultLocale,
  isRtlLocale,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChatAssistant } from "@/components/chat-assistant/chat-assistant";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { professionalServiceJsonLd } from "@/lib/seo/jsonld";

/* דיספליי גיאומטרי בטוח לכותרות — Secular One: עוצמה, יציבות, מודרניות.
   משקל יחיד 400 (כבד מטבעו) — היררכיה דרך גודל, לא דרך משקל.
   סנס שקט לגוף — Rubik. */
const fontSecular = Secular_One({
  subsets: ["hebrew", "latin"],
  variable: "--font-secular",
  display: "swap",
  weight: "400",
});

const fontRubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type LangParams = { params: Promise<{ lang: string }> };

function resolveLocale(lang: string): Locale {
  return (locales as readonly string[]).includes(lang)
    ? (lang as Locale)
    : defaultLocale;
}

/* SEO דינמי לפי שפה — כולל Open Graph לשיתופים */
export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
  ).replace(/\/$/, "");

  return {
    metadataBase: new URL(base),
    title: {
      default: dict.meta.title,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { he: "/he", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      siteName: dict.meta.siteName,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [
        {
          url: "/images/og-cover.jpg",
          width: 1200,
          height: 630,
          alt: dict.hero.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/images/og-cover.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({
  children,
  params,
}: LangParams & { children: React.ReactNode }) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={isRtlLocale(locale) ? "rtl" : "ltr"}
      className={`${fontRubik.variable} ${fontSecular.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <JsonLdScript
          data={professionalServiceJsonLd({
            lang: locale,
            name: dict.meta.siteName,
            description: dict.meta.description,
          })}
        />
        <SiteHeader lang={locale} dict={dict} />
        <main>{children}</main>
        <SiteFooter lang={locale} dict={dict} />
        <ChatAssistant lang={locale} chat={dict.chat} />
      </body>
    </html>
  );
}
