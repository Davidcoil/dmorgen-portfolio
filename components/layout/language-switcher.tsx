"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/* מחליף שפה: מחליף את קידומת השפה בנתיב הנוכחי, שומר על שאר הנתיב. */
export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const other: Locale = lang === "he" ? "en" : "he";
  const rest = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), "");
  const href = `/${other}${rest || ""}`;

  return (
    <Link
      href={href}
      aria-label={other === "he" ? "מעבר לעברית" : "Switch to English"}
      className={cn(
        "text-[13px] font-semibold tracking-wide text-foreground/60 transition-colors duration-300",
        "hover:text-champagne-600"
      )}
    >
      {other === "he" ? "עברית" : "EN"}
    </Link>
  );
}

export function getOtherLocales(current: Locale): Locale[] {
  return locales.filter((l) => l !== current);
}
