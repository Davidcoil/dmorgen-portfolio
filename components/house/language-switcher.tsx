"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

/* מחליף שפה: מחליף רק את קידומת השפה, שומר על שאר הנתיב. */
export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const other: Locale = lang === "he" ? "en" : "he";
  const rest = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), "");
  return (
    <Link
      href={`/${other}${rest}`}
      lang={other}
      aria-label={other === "he" ? "מעבר לעברית" : "Switch to English"}
      className="text-paper-dim hover:text-paper"
    >
      {other === "he" ? "עברית" : "EN"}
    </Link>
  );
}
