import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { whatsappLink } from "@/lib/site";

/* הפוטר: כתובת, גילוי AI, השורה על העוגיות (שהיא גם אמת משפטית), וואטסאפ.
   קישורים לעמודי החוק נכנסים כשהעמודים קיימים (בריף legal-pages). */
export function HouseFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.house.footer;
  const wa = whatsappLink(lang === "he" ? "היי דוד, הגעתי מהבית." : "Hi David, I came from the house.");
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 text-sm text-paper-dim md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-lg text-paper">{t.address}</p>
          <p>{t.cookies}</p>
          <p>{t.ai}</p>
        </div>
        <div className="space-y-2 md:text-end">
          <p className="text-paper">{dict.meta.siteName}</p>
          {wa && (
            <a href={wa} className="inline-block font-bold text-lamp hover:text-lamp-soft" rel="noopener">
              {t.whatsapp}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
