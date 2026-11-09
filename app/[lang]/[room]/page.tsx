import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { getDoors, getRoom } from "@/lib/rooms/registry.ts";
import { ClosedDoor } from "@/components/house/closed-door";
import { resolveLocale } from "../layout";

type RoomParams = { params: Promise<{ lang: string; room: string }> };
type RoomComponent = ComponentType<{ lang: Locale; dict: Dictionary }>;

/* ============================================================================
 * /[lang]/[room]: הנתיב היחיד לכל החדרים.
 * דלת פתוחה טוענת את rooms/<slug>/room.tsx. דלת סגורה מציגה את השלט.
 * הכניסה מוגשת בשורש בלבד, ולכן /he/entrance מחזיר 404 (אין תוכן כפול).
 * ========================================================================== */
export function generateStaticParams() {
  return locales.flatMap((lang) => getDoors().map((r) => ({ lang, room: r.slug })));
}

export async function generateMetadata({ params }: RoomParams): Promise<Metadata> {
  const { lang, room: slug } = await params;
  const locale = resolveLocale(lang);
  const room = getRoom(slug);
  if (!room || room.home) return {};
  return {
    title: room.name[locale],
    description: room.summary[locale],
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: { he: `/he/${slug}`, en: `/en/${slug}` },
    },
    robots: room.door === "open" ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function RoomPage({ params }: RoomParams) {
  const { lang, room: slug } = await params;
  const locale = resolveLocale(lang);
  const room = getRoom(slug);
  if (!room || room.home) notFound();

  const dict = await getDictionary(locale);
  if (room.door !== "open") return <ClosedDoor lang={locale} dict={dict} room={room} />;

  /* סיומת מפורשת: בלעדיה הבאנדלר בוחר ב-room.json שיושב באותה תיקייה */
  const mod = (await import(`@/rooms/${slug}/room.tsx`)) as { default: RoomComponent };
  const Room = mod.default;
  return <Room lang={locale} dict={dict} />;
}
