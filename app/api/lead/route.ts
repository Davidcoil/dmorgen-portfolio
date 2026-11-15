import { NextResponse } from "next/server";
import { formatLead, leadSubject, parseLead, type Lead } from "@/lib/lead";

/* ============================================================================
 * /api/lead: כל פנייה מהטופס או מהצ'אט מגיעה לדוד בשני ערוצים במקביל,
 * עוד לפני שהפונה פותח וואטסאפ:
 *   1. טלגרם (התראה מיידית בטלפון)   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 *   2. מייל דרך Resend (בסיס לסוכני AI)  RESEND_API_KEY, LEAD_EMAIL_TO, LEAD_EMAIL_FROM
 * הפנייה נחשבת "נמסרה" אם לפחות ערוץ אחד הצליח. אף ערוץ? הפונה מקבל וואטסאפ וטלפון.
 * GET מחזיר אילו ערוצים מוגדרים (בלי סודות), לבדיקה אחרי הגדרה ב-Vercel.
 * ========================================================================== */

type Channel = { name: "telegram" | "email"; send: (lead: Lead) => Promise<void> };

function channels(): Channel[] {
  const list: Channel[] = [];
  const { TELEGRAM_BOT_TOKEN: tg, TELEGRAM_CHAT_ID: chat } = process.env;
  if (tg && chat) {
    list.push({
      name: "telegram",
      send: async (lead) => {
        const res = await fetch(`https://api.telegram.org/bot${tg}/sendMessage`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ chat_id: chat, text: formatLead(lead), disable_web_page_preview: true }),
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) throw new Error(`telegram ${res.status}: ${await res.text()}`);
      },
    });
  }
  const { RESEND_API_KEY: key, LEAD_EMAIL_TO: to } = process.env;
  if (key && to) {
    const from = process.env.LEAD_EMAIL_FROM || "פניות מהאתר <leads@dmorgen.com>";
    list.push({
      name: "email",
      send: async (lead) => {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
          body: JSON.stringify({
            from,
            to: to.split(",").map((s) => s.trim()),
            subject: leadSubject(lead),
            text: formatLead(lead),
          }),
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
      },
    });
  }
  return list;
}

export function GET() {
  const names = channels().map((c) => c.name);
  return NextResponse.json({ telegram: names.includes("telegram"), email: names.includes("email") });
}

// ponytail: no rate limit, honeypot only; add per-IP limiting if bots get through
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = parseLead(body);
  if ("bot" in parsed) return NextResponse.json({ ok: true }); // שקט לבוטים
  if ("error" in parsed) return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });

  const list = channels();
  if (!list.length) {
    console.error("[lead] no channel configured, lead NOT delivered:", parsed.lead.phone);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const results = await Promise.allSettled(list.map((c) => c.send(parsed.lead)));
  const delivered = list.filter((_, i) => results[i].status === "fulfilled").map((c) => c.name);
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] ${list[i].name} failed:`, r.reason, parsed.lead.phone);
  });

  if (!delivered.length) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, delivered });
}
