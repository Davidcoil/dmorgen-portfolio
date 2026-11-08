import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { CategoryTabs } from "@/components/home/category-tabs";
import { ValueProps } from "@/components/home/value-props";
import { HowItWorks } from "@/components/home/how-it-works";
import { Wall } from "@/components/home/wall";
import { Corporate } from "@/components/home/corporate";
import { AboutTeaser } from "@/components/home/about-teaser";
import { CtaSection } from "@/components/home/cta-section";

/* דף הבית: הירו טיפוגרפי → רצועת ביטחון → סיפורי לקוחות → ערכים →
   איך זה עובד → מסלול קורפורייט → טיזר אישי → סגירה שקטה.
   עקרון: הלקוח הוא הגיבור; שום טקסט לא יושבת על פרצוף. */
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = (locales as readonly string[]).includes(lang)
    ? (lang as Locale)
    : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero lang={locale} dict={dict} />
      <TrustStrip dict={dict} />
      <CategoryTabs lang={locale} dict={dict} />
      <ValueProps dict={dict} />
      <Wall dict={dict} limit={6} />
      <HowItWorks dict={dict} />
      <Corporate lang={locale} dict={dict} />
      <AboutTeaser lang={locale} dict={dict} />
      <CtaSection lang={locale} dict={dict} />
    </>
  );
}
