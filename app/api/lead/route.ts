import { NextResponse } from "next/server";
import { formatLead, leadSubject, parseLead, replyLink, type Lead } from "@/lib/lead";

/* ============================================================================
 * /api/lead: כל פנייה מהטופס או מהצ'אט מגיעה לדוד בכל הערוצים שמוגדרים, במקביל,
 * עוד לפני שהפונה פותח וואטסאפ:
 *   1. טלגרם, התראה מיידית בטלפון + כפתור "לענות בוואטסאפ"  TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 *   2. מייל דרך Resend, עם בלוק JSON לסוכני AI               RESEND_API_KEY, LEAD_EMAIL_TO, LEAD_EMAIL_FROM
 *   3. webhook לכל מערכת עתידית (CRM, Sheets, Make, n8n)     LEAD_WEBHOOK_URL
 * הפנייה "נמסרה" אם לפחות ערוץ אחד הצליח. אף ערוץ? הפונה מקבל וואטסאפ וטלפון.
 * GET מחזיר אילו ערוצים מוגדרים (בלי סודות), לבדיקה אחרי הגדרה ב-Vercel.
 * ========================================================================== */

type ChannelName = "telegram" | "email" | "webhook";
type Channel = { name: ChannelName; send: (lead: Lead) => Promise<void> };

async function post(url: string, body: unknown, headers: Record<string, string> = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${new URL(url).host} ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

function channels(): Channel[] {
  const env = process.env;
  const list: Channel[] = [];

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    list.push({
      name: "telegram",
      send: (lead) => {
        const reply = replyLink(lead);
        return post(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          chat_id: env.TELEGRAM_CHAT_ID,
          text: formatLead(lead),
          disable_web_page_preview: true,
          ...(reply && {
            reply_markup: { inline_keyboard: [[{ text: "💬 לענות בוואטסאפ", url: reply }]] },
          }),
        });
      },
    });
  }

  if (env.RESEND_API_KEY && env.LEAD_EMAIL_TO) {
    list.push({
      name: "email",
      send: (lead) =>
        post(
          "https://api.resend.com/emails",
          {
            from: env.LEAD_EMAIL_FROM || "פניות מהאתר <leads@dmorgen.com>",
            to: env.LEAD_EMAIL_TO!.split(",").map((s) => s.trim()),
            subject: leadSubject(lead),
            text: `${formatLead(lead)}\n\n--- lead data (JSON) ---\n${JSON.stringify(lead, null, 2)}`,
            headers: { "X-Lead-Id": lead.id },
          },
          { authorization: `Bearer ${env.RESEND_API_KEY}` }
        ),
    });
  }

  if (env.LEAD_WEBHOOK_URL) {
    // ponytail: unsigned; add an HMAC header when a receiver needs to verify the sender
    list.push({ name: "webhook", send: (lead) => post(env.LEAD_WEBHOOK_URL!, { event: "lead.created", lead }) });
  }
  return list;
}

export function GET() {
  const names = channels().map((c) => c.name);
  return NextResponse.json({
    telegram: names.includes("telegram"),
    email: names.includes("email"),
    webhook: names.includes("webhook"),
  });
}

// ponytail: no rate limit, honeypot only; add per-IP limiting if bots get through
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const h = req.headers;
  const city = h.get("x-vercel-ip-city");
  const parsed = parseLead(body, {
    country: h.get("x-vercel-ip-country") ?? "",
    city: city ? decodeURIComponent(city) : "",
    userAgent: h.get("user-agent") ?? "",
  });
  if ("bot" in parsed) return NextResponse.json({ ok: true }); // שקט לבוטים
  if ("error" in parsed) return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  const { lead } = parsed;

  const list = channels();
  if (!list.length) {
    console.error("[lead] no channel configured, lead NOT delivered:", lead.id, lead.phone);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const results = await Promise.allSettled(list.map((c) => c.send(lead)));
  const delivered = list.filter((_, i) => results[i].status === "fulfilled").map((c) => c.name);
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] ${list[i].name} failed:`, r.reason, lead.id, lead.phone);
  });

  if (!delivered.length) {
    return NextResponse.json({ ok: false, error: "delivery_failed", id: lead.id }, { status: 502 });
  }
  return NextResponse.json({ ok: true, id: lead.id, delivered });
}
