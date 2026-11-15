// node --test tests/lead.test.mjs  (Node 24 strips the TypeScript types from lib/lead.ts on import)
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizePhone, parseLead, formatLead, leadSubject, classifySource, replyLink } from "../lib/lead.ts";

const now = new Date("2026-11-16T10:00:00Z");

test("normalizePhone handles Israeli and foreign formats", () => {
  assert.equal(normalizePhone("052-555-5970"), "972525555970");
  assert.equal(normalizePhone("+972 52 555 5970"), "972525555970");
  assert.equal(normalizePhone("02-6501234"), "97226501234");
  assert.equal(normalizePhone("+44 7700 900123"), "447700900123");
  assert.equal(normalizePhone("abc"), null);
  assert.equal(normalizePhone("12345"), null);
});

test("parseLead: honeypot, missing phone, caps, server context", () => {
  assert.deepEqual(parseLead({ phone: "0525555970", website: "spam" }), { bot: true });
  assert.deepEqual(parseLead({ name: "x" }), { error: "phone" });
  assert.deepEqual(parseLead(null), { error: "phone" });
  const { lead } = parseLead(
    { name: " דנה ", phone: "054-1234567", source: "chat", lang: "en", message: "a".repeat(5000), attribution: { firstSeen: "nonsense", referrer: 7 } },
    { country: "US", city: "New York", userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0)", now }
  );
  assert.equal(lead.name, "דנה");
  assert.equal(lead.source, "chat");
  assert.equal(lead.lang, "en");
  assert.equal(lead.message.length, 1500);
  assert.equal(lead.attribution.firstSeen, "");
  assert.equal(lead.attribution.referrer, "");
  assert.equal(lead.device, "טלפון");
  assert.match(lead.id, /^L-20261116-[a-z0-9]{3,5}$/);
});

test("classifySource puts AI assistants first", () => {
  assert.equal(classifySource({ referrer: "https://chatgpt.com/" }), "ChatGPT");
  assert.equal(classifySource({ utm_source: "chatgpt.com" }), "ChatGPT");
  assert.equal(classifySource({ referrer: "https://www.perplexity.ai/search" }), "Perplexity");
  assert.equal(classifySource({ referrer: "https://gemini.google.com/app" }), "Gemini");
  assert.equal(classifySource({ referrer: "https://claude.ai/chat/x" }), "Claude");
  assert.equal(classifySource({ referrer: "https://www.google.com/", gclid: "abc" }), "גוגל ממומן");
  assert.equal(classifySource({ referrer: "https://www.google.co.il/" }), "גוגל (חיפוש)");
  assert.equal(classifySource({ referrer: "https://l.instagram.com/" }), "אינסטגרם");
  assert.equal(classifySource({ fbclid: "x" }), "פייסבוק");
  assert.equal(classifySource({ utm_source: "newsletter" }), "newsletter");
  assert.equal(classifySource({ referrer: "https://some-blog.co.il/post" }), "some-blog.co.il");
  assert.match(classifySource({}), /^ישיר/);
});

test("formatLead tells David where, when and how to reply", () => {
  const { lead } = parseLead(
    {
      name: "דנה כהן",
      phone: "054-1234567",
      type: "פורטרט",
      page: "/he/contact",
      attribution: { referrer: "https://chatgpt.com/", landing: "/he/galleries/portraits", firstSeen: "2026-11-13T09:00:00Z" },
    },
    { country: "IL", city: "Jerusalem", userAgent: "Windows NT 10.0", now }
  );
  const text = formatLead(lead);
  assert.match(text, /פנייה חדשה מהטופס/);
  assert.match(text, /שם: דנה כהן/);
  assert.match(text, /🧭 מקור: ChatGPT/);
  assert.match(text, /נחת בעמוד: \/he\/galleries\/portraits/);
  assert.match(text, /ביקור ראשון באתר: לפני 3 ימים/);
  assert.match(text, /📍 ישראל, Jerusalem · מחשב/);
  assert.match(text, /מזהה: L-20261116-/);
  assert.doesNotMatch(text, /קמפיין|שפה: אנגלית|\n\n\n/);
  const reply = decodeURIComponent(replyLink(lead));
  assert.match(reply, /^https:\/\/wa\.me\/972541234567\?text=היי דנה, כאן דוד מורגנשטרן\. קיבלתי את הפנייה שלך מהאתר לגבי פורטרט\. $/);
});

test("replyLink: English, no name, 'something else' type", () => {
  const en = parseLead({ phone: "+44 7700 900123", lang: "en", type: "Something else" }, { now }).lead;
  assert.match(decodeURIComponent(replyLink(en)), /wa\.me\/447700900123\?text=Hi, this is David Morgenstern\./);
  const he = parseLead({ phone: "0541234567", type: "משהו אחר" }, { now }).lead;
  assert.match(decodeURIComponent(replyLink(he)), /text=היי, כאן דוד מורגנשטרן\. קיבלתי את הפנייה שלך מהאתר\. $/);
});

test("leadSubject keeps the stable prefix agents filter on", () => {
  assert.equal(leadSubject(parseLead({ name: "דנה", phone: "0541234567", type: "פורטרט" }, { now }).lead), "[dmorgen lead] דנה · פורטרט");
  assert.equal(leadSubject(parseLead({ phone: "0541234567", source: "chat" }, { now }).lead), "[dmorgen lead] 0541234567 · צ'אט");
});
