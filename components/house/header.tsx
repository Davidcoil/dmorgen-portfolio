import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { LanguageSwitcher } from "./language-switcher";

/* כותרת הבית: שם, מפה, שפה. שלושה דברים, לא תפריט. */
export function HouseHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav
        aria-label={dict.house.name}
        className="flex items-center justify-between px-[clamp(20px,4.5vw,64px)] py-6"
      >
        <Link href={`/${lang}`} className="font-display text-xl text-paper hover:text-lamp">
          <span className="wordmark-dot" aria-hidden />
          {dict.house.name}
        </Link>
        <div className="flex items-center gap-6 text-sm font-bold">
          <Link href={`/${lang}#map`} className="text-paper-dim hover:text-paper">
            {dict.house.map.title}
          </Link>
          <LanguageSwitcher lang={lang} />
        </div>
      </nav>
    </header>
  );
}
