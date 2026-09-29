"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";

/* שלוש סיבות — רשימה עריכתית ממוספרת, קווי שיער במקום כרטיסים. */
export function ValueProps({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="divide-y divide-border">
          {dict.home.valueProps.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 py-10 md:grid-cols-[80px_1fr] md:gap-8 md:py-12"
            >
              <span
                className="font-display text-4xl text-champagne-400 md:text-5xl"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl text-foreground md:text-3xl">
                  {prop.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  {prop.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
