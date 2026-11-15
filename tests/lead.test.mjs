// node --test tests/  (Node 24 strips the TypeScript types from lib/lead.ts on import)
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizePhone, parseLead, formatLead, leadSubject } from "../lib/lead.ts";

test("normalizePhone handles Israeli formats", () => {
  assert.equal(normalizePhone("052-555-5970"), "972525555970");
  assert.equal(normalizePhone("+972 52 555 5970"), "972525555970");
  assert.equal(normalizePhone("0525555970"), "972525555970");
  assert.equal(normalizePhone("02-6501234"), "97226501234");
  assert.equal(normalizePhone("abc"), null);
  assert.equal(normalizePhone("12345"), null);
});

test("parseLead: honeypot, missing phone, clean lead", () => {
  assert.deepEqual(parseLead({ phone: "0525555970", website: "spam" }), { bot: true });
  assert.deepEqual(parseLead({ name: "x" }), { error: "phone" });
  assert.deepEqual(parseLead(null), { error: "phone" });
  const r = parseLead({ name: " דנה ", phone: "054-1234567", type: "אירוע", source: "chat", lang: "en", message: "a".repeat(5000) });
  assert.equal(r.lead.name, "דנה");
  assert.equal(r.lead.source, "chat");
  assert.equal(r.lead.lang, "en");
  assert.equal(r.lead.message.length, 1500);
});

test("formatLead gives David a reply link", () => {
  const { lead } = parseLead({ name: "דנה", phone: "054-1234567", type: "פורטרט" });
  const text = formatLead(lead);
  assert.match(text, /פנייה חדשה מהטופס/);
  assert.match(text, /שם: דנה/);
  assert.match(text, /https:\/\/wa\.me\/972541234567/);
  assert.doesNotMatch(text, /שפה: אנגלית/);
});

test("leadSubject keeps the stable prefix agents filter on", () => {
  assert.equal(leadSubject(parseLead({ name: "דנה", phone: "0541234567", type: "פורטרט" }).lead), "[dmorgen lead] דנה · פורטרט");
  assert.equal(leadSubject(parseLead({ phone: "0541234567", source: "chat" }).lead), "[dmorgen lead] 0541234567 · צ'אט");
});
