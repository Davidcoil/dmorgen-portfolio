"use client";

import { useState } from "react";
import { CalendarDays, CheckCircle2, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { siteConfig, telHref, whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "fallback";

/* טופס יצירת קשר: הפרטים נשלחים קודם לדוד (/api/lead → טלגרם),
   ורק אחר כך מוצע להמשיך בוואטסאפ. אם השליחה נכשלה, הפונה מקבל
   כפתור וואטסאפ עם הפרטים ומספר טלפון, כך ששום פנייה לא הולכת לאיבוד. */
export function BookingForm({ dict, lang }: { dict: Dictionary; lang: string }) {
  const t = dict.contact.form;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState(t.eventTypes[0]);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [phoneError, setPhoneError] = useState(false);
  const todayISO = new Date().toISOString().slice(0, 10);

  const inputCls =
    "w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25";

  const waText = [
    "היי דוד, אני רוצה לספר לך מה אנחנו מתכננים לצלם.",
    `שם: ${name}`,
    `טלפון: ${phone}`,
    `מה מצלמים: ${eventType}`,
    date && `תאריך משוער: ${date}`,
    message.trim() && `פרטים נוספים: ${message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
  const waHref = whatsappLink(waText);
  const tel = siteConfig.contactPhone;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 9) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "form",
          name,
          phone,
          type: eventType,
          date,
          message,
          website,
          lang,
          page: window.location.pathname,
        }),
      });
      setStatus(res.ok ? "sent" : "fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent" || status === "fallback") {
    const sent = status === "sent";
    return (
      <div
        role="status"
        className="rounded-lg border border-border bg-card/60 p-8 text-center md:p-10"
      >
        {sent && <CheckCircle2 className="mx-auto h-10 w-10 text-champagne-500" aria-hidden />}
        <h2 className="mt-4 font-display text-2xl text-foreground md:text-3xl">
          {sent ? t.sentTitle : t.fallbackTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          {sent ? t.sentText : t.fallbackText}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {waHref && (
            <Button asChild size="lg" variant={sent ? "secondary" : "default"}>
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden />
                {sent ? t.continueWhatsapp : t.sendWhatsapp}
              </a>
            </Button>
          )}
          {!sent && tel && (
            <a
              href={telHref(tel)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-champagne-400 decoration-2 underline-offset-8"
            >
              <Phone className="h-4 w-4" aria-hidden />
              <span>
                {t.callLabel} <span dir="ltr">{tel}</span>
              </span>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-card/60 p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-bold tracking-wider text-muted-foreground">
            {t.name}
          </span>
          <input
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold tracking-wider text-muted-foreground">
            {t.phone}
          </span>
          <input
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.phonePlaceholder}
            aria-invalid={phoneError}
            className={`${inputCls} text-start`}
          />
          {phoneError && (
            <span role="alert" className="mt-1.5 block text-xs text-red-700">
              {t.phoneInvalid}
            </span>
          )}
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold tracking-wider text-muted-foreground">
            {t.eventType}
          </span>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className={inputCls}
          >
            {t.eventTypes.map((et) => (
              <option key={et} value={et}>
                {et}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold tracking-wider text-muted-foreground">
            {t.eventDate}
          </span>
          <div className="relative">
            <input
              type="date"
              min={todayISO}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${inputCls} pe-11`}
            />
            <CalendarDays className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-xs font-bold tracking-wider text-muted-foreground">
            {t.message}
          </span>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.messagePlaceholder}
            className={`${inputCls} resize-none`}
          />
        </label>
        {/* מלכודת לבוטים: מוסתרת מאנשים ומקוראי מסך */}
        <label className="hidden" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full" disabled={status === "sending"}>
        <Send className="h-4 w-4 rtl:rotate-180" aria-hidden />
        {status === "sending" ? t.sending : t.submit}
      </Button>
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">{t.note}</p>
    </form>
  );
}
