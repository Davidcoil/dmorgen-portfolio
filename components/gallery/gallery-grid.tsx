"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/content/galleries";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Locale } from "@/lib/i18n/config";
import { Lightbox } from "./lightbox";

/* גריד מייסונרי לעמודי הגלריות — עם לייטבוקס ואנימציית כניסה בגלילה. */
export function GalleryGrid({
  images,
  lang,
  dict,
}: {
  images: GalleryImage[];
  lang: Locale;
  dict: Dictionary;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 md:gap-5 [&>*]:mb-4 md:[&>*]:mb-5">
        {images.map((image, i) => (
          <motion.button
            key={image.src}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setLightboxIndex(i)}
            className={cn(
              "group relative block w-full break-inside-avoid overflow-hidden rounded-lg border border-border/40",
              "transition-all duration-500 hover:border-primary/50",
              image.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
            )}
            aria-label={image.alt[lang]}
          >
            <Image
              src={image.src}
              alt={image.alt[lang]}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute bottom-4 end-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/85 text-champagne-700 opacity-0 shadow-lg backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <Expand className="h-4 w-4" />
            </span>
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={lightboxIndex}
        lang={lang}
        dict={dict}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
