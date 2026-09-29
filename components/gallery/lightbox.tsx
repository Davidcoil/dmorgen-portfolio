"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/content/galleries";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import type { Locale } from "@/lib/i18n/config";

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  lang: Locale;
  dict: Dictionary;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/* לייטבוקס: תצוגת תמונה מלאה עם ניווט מקלדת וחצים, כיתוב alt עשיר. */
export function Lightbox({ images, index, lang, dict, onClose, onNavigate }: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
    },
    [index, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = index !== null ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey, index]);

  const image = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {image && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt[lang]}
        >
          {/* סרגל עליון */}
          <div
            className="flex items-center justify-between px-6 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm text-white/60 tabular-nums">
              {index + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              aria-label={dict.galleries.closePreview}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-all duration-300 hover:border-champagne-400 hover:text-champagne-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* תמונה */}
          <div
            className="relative flex-1 px-4 pb-2 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={image.src}
                  alt={image.alt[lang]}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* חצים */}
            <button
              onClick={() => onNavigate((index - 1 + images.length) % images.length)}
              aria-label={dict.galleries.prevImage}
              className="absolute top-1/2 -translate-y-1/2 start-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/85 backdrop-blur transition-all duration-300 hover:border-champagne-400 hover:text-champagne-300 md:start-6"
            >
              <ChevronRight className="h-6 w-6 ltr:rotate-180" />
            </button>
            <button
              onClick={() => onNavigate((index + 1) % images.length)}
              aria-label={dict.galleries.nextImage}
              className="absolute top-1/2 -translate-y-1/2 end-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/85 backdrop-blur transition-all duration-300 hover:border-champagne-400 hover:text-champagne-300 md:end-6"
            >
              <ChevronLeft className="h-6 w-6 ltr:rotate-180" />
            </button>
          </div>

          {/* כיתוב */}
          <p className="px-6 pt-2 pb-3 text-center text-sm text-white/60">
            {image.alt[lang]}
          </p>
          <p className="pb-7 text-center">
            <Link
              href={`/${lang}/contact`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-semibold text-champagne-300/80 transition-colors hover:text-champagne-200"
            >
              {dict.nav.bookNow}{" "}
              <span aria-hidden className="inline-block ltr:-scale-x-100">
                ←
              </span>
            </Link>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
