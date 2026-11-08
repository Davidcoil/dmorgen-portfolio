import type { NextConfig } from "next";

/* ============================================================================
 * הפניות 301 מהאתר הישן ב-Wix (נשלף מה-sitemap שלו 2026-11-08).
 * ----------------------------------------------------------------------------
 * כל יעד חייב להיות חדר קיים: tests/rooms.test.ts בודק את זה.
 * כתובות בעברית מופיעות פעמיים (מפוענח + מקודד) כי הדפדפנים שולחים אותן בשתי הצורות.
 * ========================================================================== */
const wixRedirects: Array<{ source: string; destination: string; permanent: boolean }> = [
  { source: "/general-1", destination: "/he/galleries", permanent: true }, // צילומי דיוקן
  { source: "/general-6", destination: "/he/galleries", permanent: true }, // גרפיקה ומיתוג לעסקים
  { source: "/projects-7", destination: "/he/galleries", permanent: true }, // צילומי משפחות ואירועים
  { source: "/מה-אני-עושה", destination: "/he/about", permanent: true },
  { source: "/%D7%9E%D7%94-%D7%90%D7%A0%D7%99-%D7%A2%D7%95%D7%A9%D7%94", destination: "/he/about", permanent: true },
  { source: "/שירותים-נוספים", destination: "/he/galleries", permanent: true },
  { source: "/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D-%D7%A0%D7%95%D7%A1%D7%A4%D7%99%D7%9D", destination: "/he/galleries", permanent: true },
  { source: "/portfolio", destination: "/he/galleries", permanent: true },
  { source: "/portfolio/:slug*", destination: "/he/galleries", permanent: true },
  { source: "/blog", destination: "/he", permanent: true },
  { source: "/post/:slug*", destination: "/he", permanent: true },
];

/* ============================================================================
 * כותרות אבטחה (FOUNDATION §5). CSP מאפשר inline scripts כי Next מזריק אותם;
 * מעבר ל-nonce הוא החלטה נפרדת (docs/decisions). Supabase מותר ב-connect-src
 * כדי שהקיר והנוכחות יעבדו בשלב B בלי לגעת פה.
 * ========================================================================== */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co https://lh3.googleusercontent.com",
  "font-src 'self'",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "media-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=(), payment=(self)" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return wixRedirects;
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
