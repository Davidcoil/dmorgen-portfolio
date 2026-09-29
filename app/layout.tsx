import type { ReactNode } from "react";

/* ============================================================================
 * Root layout — מעביר הלאה בלבד, בלי <html>.
 * תגית <html> עם lang/dir מדויקים לכל שפה נבנית ב־app/[lang]/layout.tsx.
 * ========================================================================== */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
