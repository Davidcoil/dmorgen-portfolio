import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getDoors, getHomeRoom } from "@/lib/rooms/registry.ts";
import { Hallway } from "@/components/house/hallway";
import { resolveLocale } from "./layout";
import EntranceRoom from "@/rooms/entrance/room";

type LangParams = { params: Promise<{ lang: string }> };

/* דף הבית = חדר הכניסה + המסדרון. שניהם נגזרים מהרישום. */
export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  return { description: getHomeRoom().summary[locale] };
}

export default async function HomePage({ params }: LangParams) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);

  return (
    <>
      <EntranceRoom lang={locale} dict={dict} />
      <Hallway lang={locale} dict={dict} rooms={getDoors()} />
    </>
  );
}
