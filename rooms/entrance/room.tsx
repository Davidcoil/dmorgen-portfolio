import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { Paths } from "./paths";

/* ============================================================================
 * הכניסה. הבית מסתכל עליך קודם.
 * ----------------------------------------------------------------------------
 * כל הטקסט מגיע מהשרת (תאום טקסטואלי), האור בחלון הוא CSS בלבד,
 * והשאלה היא כפתורים רגילים: עובדת בלי JavaScript, נזכרת איתו (paths.tsx).
 * הפניית הבית לפי מסלול (סדר חדרים, גלריה, טון) היא בריף entrance-paths.
 * ========================================================================== */
export default function EntranceRoom({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.house.entrance;

  return (
    <section
      aria-labelledby="entrance-title"
      className="relative isolate overflow-hidden"
    >
      <div className="lamp-glow" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-5 pt-28 pb-16 md:grid-cols-12 md:gap-12 md:pt-36 md:pb-24">
        <div className="animate-rise md:col-span-7">
          <h1
            id="entrance-title"
            className="font-display text-[2.6rem] leading-[1.05] text-paper sm:text-6xl md:text-7xl"
          >
            {t.title}
          </h1>
          <p className="mt-5 max-w-xl text-xl leading-snug text-paper-dim md:text-2xl">
            {t.subtitle}
          </p>

          <p className="mt-12 max-w-xl text-lg leading-relaxed text-lamp-soft md:text-xl">
            {t.question}
          </p>

          <Paths lang={lang} t={t} skipLabel={dict.house.skipQuestion} />
        </div>

        <figure className="animate-rise relative md:col-span-5 [animation-delay:120ms]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line-strong bg-night-2 shadow-[0_30px_80px_-30px_rgb(255_181_71/0.35)]">
            <Image
              src="/images/about-david-real.jpg"
              alt={t.photoAlt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
          <figcaption className="mt-4 font-display text-lg text-paper-dim">
            {t.signature}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
