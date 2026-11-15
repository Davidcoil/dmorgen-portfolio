import { NextResponse } from "next/server";
import { formatLead, parseLead } from "@/lib/lead";

/* ============================================================================
 * POST /api/lead: כל פנייה מהטופס או מהצ'אט מגיעה לדוד כהתראת טלגרם,
 * עוד לפני שהפונה פותח וואטסאפ. כך שום פנייה לא נעלמת בטיוטה שלא נשלחה.
 * משתני סביבה (Vercel): TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
 * ========================================================================== */

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

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[lead] Telegram not configured, lead NOT delivered:", parsed.lead.phone);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatLead(parsed.lead),
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`telegram ${res.status}: ${await res.text()}`);
  } catch (err) {
    console.error("[lead] delivery failed:", err, parsed.lead.phone);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
