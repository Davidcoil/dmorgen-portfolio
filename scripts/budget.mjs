/* ============================================================================
 * תקציב JavaScript לכניסה: 200KB אחרי gzip (FOUNDATION §3.7).
 * רץ אחרי `next build`: קורא את ה-HTML המוכן של /he, אוסף את קבצי ה-JS שהוא
 * טוען, מסכם gzip, ונופל אם עברנו. בלי ספריות, בלי תלות במניפסט של הבאנדלר.
 * ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const BUDGET_KB = 200;
const root = process.cwd();
const html = path.join(root, ".next", "server", "app", "he.html");

if (!fs.existsSync(html)) {
  console.error("budget: .next/server/app/he.html not found. Run `next build` first.");
  process.exit(1);
}

const src = fs.readFileSync(html, "utf8");
const chunks = [...new Set([...src.matchAll(/\/_next\/static\/chunks\/[^"'\s]+?\.js/g)].map((m) => m[0]))];
if (chunks.length === 0) {
  console.error("budget: no script chunks found in he.html");
  process.exit(1);
}

let total = 0;
const rows = [];
for (const url of chunks) {
  const file = path.join(root, ".next", url.replace(/^\/_next\//, ""));
  if (!fs.existsSync(file)) continue;
  const gz = zlib.gzipSync(fs.readFileSync(file)).length;
  total += gz;
  rows.push([path.basename(url), gz]);
}

rows.sort((a, b) => b[1] - a[1]);
for (const [name, gz] of rows) console.log(`${(gz / 1024).toFixed(1).padStart(7)} KB  ${name}`);
const kb = total / 1024;
console.log(`\nentrance JS (gzip): ${kb.toFixed(1)} KB of ${BUDGET_KB} KB`);

if (kb > BUDGET_KB) {
  console.error(`budget: over by ${(kb - BUDGET_KB).toFixed(1)} KB. Lazy-load it or cut it.`);
  process.exit(1);
}
