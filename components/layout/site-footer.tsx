import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Locale } from "@/lib/i18n/config";
import { BrandLogo } from "@/components/brand/logo";
import { siteConfig } from "@/lib/site";

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const links = [
    { href: `/${lang}/galleries`, label: dict.nav.galleries },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/client-gallery`, label: dict.nav.clientArea },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="bg-espresso text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        {/* מותג */}
        <div>
          <Link href={`/${lang}`} aria-label={dict.meta.siteName}>
            <BrandLogo lang={lang} dark />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-champagne-200/70">
            {dict.footer.tagline}
          </p>
        </div>

        {/* ניווט */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.3em] text-champagne-200/70">
            {dict.footer.navTitle}
          </h3>
          <ul className="mt-5 space-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-background/80 transition-colors duration-300 hover:text-champagne-300"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* יצירת קשר */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.3em] text-champagne-200/70">
            {dict.footer.contactTitle}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {siteConfig.contactPhone && (
              <li>
                <a
                  href={`tel:${siteConfig.contactPhone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-background/80 transition-colors hover:text-champagne-300"
                >
                  <Phone className="h-4 w-4 text-champagne-400" />
                  <span dir="ltr">{siteConfig.contactPhone}</span>
                </a>
              </li>
            )}
            {siteConfig.contactEmail && (
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="flex items-center gap-3 text-background/80 transition-colors hover:text-champagne-300"
                >
                  <Mail className="h-4 w-4 text-champagne-400" />
                  <span dir="ltr">{siteConfig.contactEmail}</span>
                </a>
              </li>
            )}
            {siteConfig.whatsappNumber && (
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/80 transition-colors hover:text-champagne-300"
                >
                  <MessageCircle className="h-4 w-4 text-champagne-400" />
                  <span dir="ltr">+{siteConfig.whatsappNumber}</span>
                </a>
              </li>
            )}
            <li>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 font-semibold text-champagne-300 transition-all duration-300 hover:gap-3 hover:text-champagne-200"
              >
                {dict.nav.bookNow}
                <ArrowLeft className="h-4 w-4 ltr:rotate-180" aria-hidden />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-champagne-200/70 sm:flex-row">
          <span>
            © {year} {lang === "he" ? "דוד מורגנשטרן" : "David Morgenstern"} ·{" "}
            {dict.footer.rights}
          </span>
          <span className="font-semibold tracking-[0.2em]">
            {lang === "he" ? "צילום אירועים ומשפחה" : "EVENTS & FAMILY PHOTOGRAPHY"}
          </span>
        </div>
      </div>
    </footer>
  );
}
