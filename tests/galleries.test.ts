import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { galleryImages, gallerySlugs } from "../lib/content/galleries.ts";
import { gallerySizes } from "../lib/content/gallery-sizes.ts";
import { hang } from "../lib/content/hang.ts";

const ROOT = path.resolve(import.meta.dirname, "..");

test("every category has at least four photos, each with alt text, a real file and a known size", () => {
  for (const slug of gallerySlugs) {
    const images = galleryImages[slug];
    assert.ok(images.length >= 4, `${slug} has ${images.length} photos`);
    for (const i of images) {
      assert.ok(i.alt.he && i.alt.en, `${i.src}: missing alt`);
      assert.ok(fs.existsSync(path.join(ROOT, "public", i.src)), `${i.src}: file missing`);
      assert.ok(gallerySizes[i.src], `${i.src}: size missing`);
    }
  }
});

test("hang keeps every photo exactly once and in order", () => {
  for (const slug of gallerySlugs) {
    const images = galleryImages[slug];
    assert.deepEqual(hang(images).map((h) => h.image.src), images.map((i) => i.src));
  }
});

test("a photo under 1600px wide is never stretched across the wall", () => {
  for (const slug of gallerySlugs) {
    for (const h of hang(galleryImages[slug])) {
      if (h.col === "1 / -1") assert.ok(h.width >= 1600, `${h.image.src} is only ${h.width}px wide`);
    }
  }
});
