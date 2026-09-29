"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileText, Clock, Save } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";

const icons = {
  shield: ShieldCheck,
  contract: FileText,
  clock: Clock,
  backup: Save,
} as const;

/* רצועת ביטחון — היפוך־סיכון מוקדם. ארבעה עמודי אמון, קו שיער מפריד.
   יושבת מיד אחרי ההירו: לקוח הפרימיום צריך את זה לפני שהוא גולל. */
export function TrustStrip({ dict }: { dict: Dictionary }) {
  const t = dict.home.trustStrip;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-champagne-600"
        >
          <span className="h-px w-10 bg-champagne-500" aria-hidden />
          {t.eyebrow}
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {t.items.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? ShieldCheck;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex gap-4"
              >
                <span className="mt-1 shrink-0 text-champagne-500" aria-hidden>
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
