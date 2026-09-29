import type { Metadata } from "next";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";
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
    title: `${dict.clientGallery.title} · ${dict.meta.siteName}`,
    description: dict.clientGallery.subtitle,
    robots: { index: false, follow: false }, // אזור פרטי ללקוחות — לא לאינדקס
  };
}

/* ============================================================================
 * אזור לקוחות — הטמעת אפליקציית בחירת התמונות (bchira.app).
 * הנתיב מאובטח: iframe מבודד עם sandbox, מאובטח וממותג כחלק מהאתר.
 * הכתובת נטענת מ־NEXT_PUBLIC_BCHIRA_URL (ברירת מחדל: https://bchira.app/).
 * ========================================================================== */
export default async function ClientGalleryPage({ params }: LangParams) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const t = dict.clientGallery;
  const url = siteConfig.bchiraUrl;

  return (
    <div className="pt-28 md:pt-32">
      <div className="mx-auto max-w-4xl px-6 pb-10 text-center">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="secondary">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" aria-hidden />
              {t.openInNewTab}
            </a>
          </Button>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary/70" aria-hidden />
            <span dir="ltr">{new URL(url).hostname}</span>
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="overflow-hidden rounded-lg border border-border/70 bg-card">
          <iframe
            src={url}
            title={t.title}
            className="h-[calc(100svh-16rem)] min-h-[560px] w-full"
            loading="lazy"
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
          />
        </div>
      </div>
    </div>
  );
}
