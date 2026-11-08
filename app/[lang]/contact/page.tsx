import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { siteConfig, whatsappLink } from "@/lib/site";
import { BookingForm } from "@/components/contact/booking-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";

type LangParams = { params: Promise<{ lang: string }> };

function resolveLocale(lang: string): Locale {
  return (locales as readonly string[]).includes(lang)
    ? (lang as Locale)
    : defaultLocale;
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  return {
    title: `${dict.nav.contact} · ${dict.meta.siteName}`,
    description:
      locale === "he"
        ? "בואו נבדוק אם אנחנו מתאימים. ספרו לדוד מה חוגגים, בר מצווה, ברית, יום הולדת או אירוע חברה, וקבלו הצעה מסודרת בלי לחץ ובלי התחייבות."
        : "Tell David what you're celebrating, a Bar Mitzvah, a brit, a birthday or a company event, and get a clear written quote. No pressure, no commitment.",
  };
}

/* עמוד צור קשר: טופס קביעת תאריך (נפתח בוואטסאפ) + פרטי קשר ישירים. */
export default async function ContactPage({ params }: LangParams) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);
  const t = dict.contact;

  const wa = whatsappLink(
    locale === "he"
      ? "שלום דוד! אשמח לשמוע פרטים על צילומים."
      : "Hi David! I'd love to hear details about photography for our event."
  );

  const directItems = [
    siteConfig.contactPhone && {
      icon: Phone,
      label: t.direct.phoneLabel,
      value: siteConfig.contactPhone,
      href: `tel:${siteConfig.contactPhone.replace(/[^+\d]/g, "")}`,
      ltr: true,
    },
    siteConfig.contactEmail && {
      icon: Mail,
      label: t.direct.emailLabel,
      value: siteConfig.contactEmail,
      href: `mailto:${siteConfig.contactEmail}`,
      ltr: true,
    },
    wa && {
      icon: MessageCircle,
      label: t.direct.whatsappLabel,
      value: t.direct.whatsappValue,
      href: wa,
      ltr: false,
    },
  ].filter(Boolean) as {
    icon: typeof Phone;
    label: string;
    value: string;
    href: string;
    ltr: boolean;
  }[];

  return (
    <div className="mx-auto max-w-6xl px-6 pt-36 pb-24 md:pt-44 md:pb-32">
      <SectionHeading
        level="h1"
        eyebrow={dict.nav.contact}
        title={t.title}
        subtitle={t.subtitle}
      />

      <div className="mt-14 grid items-start gap-8 lg:grid-cols-5">
        <div className="order-last lg:order-none lg:col-span-3">
          <BookingForm dict={dict} />
        </div>

        {directItems.length > 0 && (
          <aside className="order-first rounded-lg border border-border bg-card/60 p-8 lg:order-none lg:col-span-2">
            <h2 className="font-display text-2xl text-foreground">
              {t.direct.title}
            </h2>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {directItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 py-4 transition-colors duration-300"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-champagne-100 text-champagne-600 transition-colors group-hover:bg-champagne-200">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold tracking-wider text-muted-foreground">
                        {item.label}
                      </span>
                      <span
                        dir={item.ltr ? "ltr" : undefined}
                        className="block text-sm font-semibold text-foreground transition-colors group-hover:text-champagne-600"
                      >
                        {item.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      <JsonLdScript data={faqJsonLd([...dict.faq.items])} />
      <section className="mx-auto mt-24 max-w-3xl">
        <SectionHeading eyebrow={dict.nav.contact} title={dict.faq.title} />
        <div className="mt-10 divide-y divide-border border-y border-border">
          {dict.faq.items.map((item) => (
            <div key={item.q} className="py-6">
              <h3 className="font-display text-xl text-foreground md:text-2xl">
                {item.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
