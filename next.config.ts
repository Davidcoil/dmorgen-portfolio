import type { NextConfig } from "next";

/* ============================================================================
 * 301 REDIRECTS — מעבר מוויקס בלי לאבד דירוג בגוגל
 * ----------------------------------------------------------------------------
 * כשתעביר את הדומיין מוויקס: ממפה כאן כל כתובת ישנה לכתובת החדשה.
 * כל רשומה = הפניית 301 קבועה (גוגל מעביר את ה״כוח״ של הדירוג לכתובת החדשה).
 *
 * פורמט:
 *   { source: "/old-wix-path", destination: "/he/new-path", permanent: true }
 *
 * שים לב: הכתובות החדשות כוללות קידומת שפה (‎/he/…‎), כי האתר דו־לשוני.
 * ========================================================================== */
const wixRedirects: Array<{
  source: string;
  destination: string;
  permanent: boolean;
}> = [
  // מופה מתוך sitemap.xml של האתר הישן ב-Wix (נשלף 2026-11-08). כותרות העמודים הישנים בהערות.
  // כתובות בעברית מופיעות פעמיים (מפוענח + מקודד) כי הדפדפנים שולחים אותן בשתי הצורות.
  { source: "/general-1", destination: "/he/galleries/portraits", permanent: true }, // צילומי דיוקן
  { source: "/general-6", destination: "/he/galleries/business", permanent: true }, // גרפיקה ומיתוג לעסקים
  { source: "/projects-7", destination: "/he/galleries/events", permanent: true }, // צילומי משפחות ואירועים
  { source: "/מה-אני-עושה", destination: "/he/about", permanent: true }, // צילום אישי וסדנאות
  { source: "/%D7%9E%D7%94-%D7%90%D7%A0%D7%99-%D7%A2%D7%95%D7%A9%D7%94", destination: "/he/about", permanent: true },
  { source: "/שירותים-נוספים", destination: "/he/galleries", permanent: true },
  { source: "/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D-%D7%A0%D7%95%D7%A1%D7%A4%D7%99%D7%9D", destination: "/he/galleries", permanent: true },
  { source: "/portfolio", destination: "/he/galleries", permanent: true },
  { source: "/portfolio/:slug*", destination: "/he/galleries/events", permanent: true }, // צילומי משפחה בר ובת מצווה
  { source: "/blog", destination: "/he", permanent: true }, // בלוג דמו של Wix, בלי תוכן אמיתי
  { source: "/post/:slug*", destination: "/he", permanent: true },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // מסתיר X-Powered-By — פחות רעש, יותר פרימיום
  images: {
    formats: ["image/avif", "image/webp"], // פורמטים מודרניים = טעינה מהירה
    // TODO (שלב 2): אם התמונות יישבו על אחסון חיצוני, להוסיף כאן:
    // remotePatterns: [{ protocol: "https", hostname: "images.example.com" }],
  },
  async redirects() {
    return wixRedirects;
  },
};

export default nextConfig;
