import type { GalleryImage } from "./galleries.ts";
import { gallerySizes } from "./gallery-sizes.ts";

/* ============================================================================
 * תליית התמונות על הקיר. פונקציה טהורה: מקבלת רשימה, מחזירה איפה כל תמונה יושבת.
 * תמונה רחבה נפרסת רק אם יש לה מספיק פיקסלים: דוד יראה אם תמונה של 1000
 * פיקסלים נמתחת על כל המסך. שתי תמונות לאורך עומדות זו ליד זו, אחת נמוכה מהשנייה.
 * ========================================================================== */
export interface Hung {
  image: GalleryImage;
  width: number;
  height: number;
  /** grid-column בדסקטופ */
  col: string;
  row: number;
  /** היסט אנכי לתמונה השנייה בזוג */
  drop: boolean;
  sizes: string;
}

const MOBILE = "(max-width: 900px) 100vw";
const size = (src: string) => gallerySizes[src] ?? [1000, 1000];
const isWide = (i: GalleryImage) => i.orientation === "landscape" && size(i.src)[0] >= 1600;

export function hang(images: GalleryImage[]): Hung[] {
  const out: Hung[] = [];
  const put = (image: GalleryImage, col: string, row: number, vw: string, drop = false) => {
    const [width, height] = size(image.src);
    out.push({ image, width, height, col, row, drop, sizes: `${MOBILE}, ${vw}` });
  };

  let row = 1;
  let flip = false;
  for (let i = 0; i < images.length; row++) {
    const a = images[i];
    const b = images[i + 1];
    if (isWide(a)) {
      put(a, "1 / -1", row, "min(1500px, 96vw)");
      i += 1;
    } else if (a.orientation === "landscape") {
      put(a, flip ? "5 / span 8" : "1 / span 8", row, "62vw");
      flip = !flip;
      i += 1;
    } else if (b?.orientation === "portrait") {
      put(a, flip ? "8 / span 5" : "1 / span 5", row, "40vw");
      put(b, flip ? "2 / span 4" : "8 / span 4", row, "32vw", true);
      flip = !flip;
      i += 2;
    } else {
      put(a, "4 / span 6", row, "48vw");
      i += 1;
    }
  }
  return out;
}
