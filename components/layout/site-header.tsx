"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Locale } from "@/lib/i18n/config";
import { BrandLogo } from "@/components/brand/logo";
import { LanguageSwitcher } from "./language-switcher";

/* הדר עריכתי — שקט, מדויק, נעלם לתוך הדף. בלי צללים כבדים. */
export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { href: `/${lang}/galleries`, label: dict.nav.galleries },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/client-gallery`, label: dict.nav.clientArea },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/70 bg-background/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href={`/${lang}`} aria-label={dict.meta.siteName}>
            <BrandLogo lang={lang} />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-[13px] font-medium tracking-wide text-foreground/65 transition-colors duration-300 hover:text-foreground",
                  pathname === l.href && "text-foreground underline decoration-champagne-400 decoration-2 underline-offset-8"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <LanguageSwitcher lang={lang} />
            <Link
              href={`/${lang}/contact`}
              className="rounded-full border border-foreground/80 px-6 py-2.5 text-[13px] font-semibold text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
            >
              {dict.nav.bookNow}
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher lang={lang} />
            <Link
              href={`/${lang}/contact`}
              className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-colors hover:bg-champagne-600"
            >
              {dict.nav.bookNow}
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label={dict.nav.openMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/98 backdrop-blur-2xl"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <BrandLogo lang={lang} />
              <button
                onClick={() => setOpen(false)}
                aria-label={dict.nav.closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                >
                  <Link
                    href={l.href}
                    className="font-display text-4xl text-foreground transition-colors hover:text-champagne-600"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-4"
              >
                <Link
                  href={`/${lang}/contact`}
                  className="rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background"
                >
                  {dict.nav.bookNow}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
