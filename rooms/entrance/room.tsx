import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { Paths } from "./paths";

/* ============================================================================
 * הכניסה. הבית מסתכל עליך קודם.
 * הטקסט מגיע מהשרת. האור על הפנים הוא מסכת CSS שהולכת אחרי היד (house-motion.tsx):
 * שתי שכבות של אותה תמונה, עמומה ומוארת. בלי פילטר על עור בשכבה המוארת.
 * ========================================================================== */
const PHOTO = "/images/about-david-real.jpg";
const SIZES = "(max-width: 900px) 100vw, 62vw";

export default function EntranceRoom({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.house.entrance;

  return (
    <section aria-labelledby="entrance-title" className="arrival">
      <div className="curtain" aria-hidden>
        {dict.common.loading}
      </div>
      <div id="scene" className="scene">
        <Image className="base" src={PHOTO} alt="" fill sizes={SIZES} quality={85} priority />
        <Image className="lit" src={PHOTO} alt={t.photoAlt} fill sizes={SIZES} quality={85} priority />
      </div>
      <div className="copy">
        <h1 id="entrance-title">
          {t.titleLines[0]}
          <br />
          {t.titleLines[1]}
          <span className="dot">.</span>
        </h1>
        <p className="sub">{t.subtitle}</p>
        <p className="ask" id="ask">
          {t.question}
        </p>
        <Paths lang={lang} t={t} skipLabel={dict.house.skipQuestion} />
      </div>
    </section>
  );
}
