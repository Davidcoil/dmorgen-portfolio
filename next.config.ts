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
  // דוגמאות — מחק את סימני ההערה ומלא כתובות אמיתיות אחרי מיפוי ה־URLs מוויקס:
  // { source: "/about-me", destination: "/he/about", permanent: true },
  // { source: "/gallery", destination: "/he/galleries/events", permanent: true },
  // { source: "/contact", destination: "/he/contact", permanent: true },
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
