"use client";

import { useState } from "react";
import { CalendarDays, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { siteConfig, whatsappLink } from "@/lib/site";

/* טופס קביעת תאריך — בונה הודעת וואטסאפ מוכנה ונפתח בצ'אט. בלי שרת, בלי מסד נתונים. */
export function BookingForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState(t.eventTypes[0]);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const todayISO = new Date().toISOString().slice(0, 10);

  const inputCls =
    "w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      "שלום דוד! אשמח לבדוק אם אנחנו מתאימים לצילום שלנו.",
      `שם: ${name}`,
      `טלפון: ${phone}`,
      `סוג אירוע: ${eventType}`,
    ];
    if (date) lines.push(`תאריך משוער: ${date}`);
    if (message.trim()) lines.push(`פרטים נוספים: ${message.trim()}`);
    const href = whatsappLink(lines.join("\n"));
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  }

  const ready = siteConfig.whatsappNumber !== "";

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
            className={`${inputCls} text-start`}
          />
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
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full" disabled={!ready}>
        <Send className="h-4 w-4 rtl:rotate-180" aria-hidden />
        {t.submit}
      </Button>
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        {ready ? t.note : t.missingNumber}
      </p>
    </form>
  );
}
