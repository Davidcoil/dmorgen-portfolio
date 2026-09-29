"use client";

/* ============================================================================
 * עוזר הצ'אט הצף — כפתור FAB + פאנל שיחה, דו־לשוני, מותאם RTL/LTR.
 * התשובות מגיעות מבסיס הידע המקומי (lib/chat) — בלי קריאות רשת, בלי מפתחות.
 * ========================================================================== */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/he";
import { detectIntent, getIntent } from "@/lib/chat/engine";
import { whatsappLink } from "@/lib/site";
import type { ChatAction, IntentId } from "@/lib/chat/kb";
import { cn } from "@/lib/utils";

interface Msg {
  id: number;
  from: "bot" | "user";
  text: string;
  actions?: ChatAction[];
  chips?: { label: string; intent: IntentId }[];
}

let nextId = 1;
const nid = () => nextId++;

export function ChatAssistant({
  lang,
  chat,
}: {
  lang: Locale;
  chat: Dictionary["chat"];
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const welcomed = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, open]);

  const pushBot = (text: string, actions?: ChatAction[], chips?: Msg["chips"]) => {
    const clean = (actions ?? []).filter((a) => a.href && a.href !== "#");
    setMessages((m) => [...m, { id: nid(), from: "bot", text, actions: clean.length ? clean : undefined, chips }]);
  };

  /** מענה של הבוט — משותף לשליחת טקסט חופשי ולחיצה על צ'יפ. */
  const respond = (intentId: IntentId, phone?: string) => {
    setTyping(true);
    window.setTimeout(() => {
      const intent = getIntent(lang, intentId);
      let actions = intent.actions;
      if (intentId === "callback" && phone) {
        const msg =
          lang === "he"
            ? `היי דוד! השארתי מספר באתר, אשמח שתחזור אלי: ${phone}`
            : `Hi David! I left my number on the site, please call me back: ${phone}`;
        const href = whatsappLink(msg);
        actions = href
          ? [{ label: { he: "שליחת המספר לדוד", en: "Send the number to David" }, href, external: true, primary: true }]
          : undefined;
      }
      pushBot(intent.answer[lang], actions);
      setTyping(false);
    }, 650);
  };

  /* שליחת הודעת משתמש — המנוע מנתח את הטקסט ומחזיר כוונה. */
  const sendText = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: nid(), from: "user", text }]);
    setInput("");
    const detected = detectIntent(text, lang);
    respond(detected.id, detected.phone);
  };

  const sendChip = (label: string, intent: IntentId) => {
    if (typing) return;
    setMessages((m) => [...m, { id: nid(), from: "user", text: label }]);
    respond(intent);
  };

  const toggle = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen && !welcomed.current) {
      welcomed.current = true;
      window.setTimeout(() => {
        pushBot(
          chat.welcome,
          undefined,
          chat.quickReplies.map((q) => ({ label: q.label, intent: q.intent as IntentId }))
        );
      }, 350);
    }
  };

  return (
    <>
      {/* כפתור צף */}
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={open ? chat.closeLabel : chat.fabLabel}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full",
          "bg-primary text-primary-foreground",
          "shadow-md transition-colors hover:bg-champagne-600"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* פאנל השיחה */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="dialog"
            aria-label={chat.title}
            className={cn(
              "fixed z-[70] flex flex-col overflow-hidden rounded-xl border border-border",
              "bg-card shadow-xl backdrop-blur-xl",
              "bottom-24 right-4 left-4 h-[min(600px,68dvh)]",
              "sm:right-6 sm:left-auto sm:w-[384px]"
            )}
          >
            {/* כותרת */}
            <div className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">{chat.title}</p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {chat.online}
                </p>
              </div>
              <button
                type="button"
                onClick={toggle}
                aria-label={chat.closeLabel}
                className="rounded-full p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* הודעות */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex flex-col gap-2", m.from === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.from === "user"
                        ? "rounded-br-md bg-secondary text-secondary-foreground"
                        : "rounded-bl-md border border-border bg-card text-foreground"
                    )}
                  >
                    {m.text.split("\n\n").map((p, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : undefined}>
                        {p}
                      </p>
                    ))}
                  </div>
                  {m.actions && (
                    <div className="flex max-w-[85%] flex-wrap gap-2">
                      {m.actions.map((a, i) =>
                        a.external ? (
                          <a
                            key={i}
                            href={a.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "rounded-full px-4 py-2 text-xs font-semibold transition",
                              a.primary
                                ? "bg-foreground text-background hover:bg-champagne-600"
                                : "border border-border bg-card text-muted-foreground hover:border-champagne-500 hover:text-foreground"
                            )}
                          >
                            {a.label[lang]}
                          </a>
                        ) : (
                          <Link
                            key={i}
                            href={a.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "rounded-full px-4 py-2 text-xs font-semibold transition",
                              a.primary
                                ? "bg-foreground text-background hover:bg-champagne-600"
                                : "border border-border bg-card text-muted-foreground hover:border-champagne-500 hover:text-foreground"
                            )}
                          >
                            {a.label[lang]}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                  {m.chips && (
                    <div className="flex max-w-full flex-wrap gap-2">
                      {m.chips.map((c) => (
                        <button
                          key={c.intent}
                          type="button"
                          onClick={() => sendChip(c.label, c.intent)}
                          className="inline-flex min-h-[44px] items-center rounded-full border border-champagne-500/50 bg-champagne-400/15 px-5 py-2 text-xs font-semibold text-champagne-700 transition hover:bg-champagne-400/25"
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex items-start">
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-champagne-500"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* קלט */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendText(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-card p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={chat.inputPlaceholder}
                aria-label={chat.inputPlaceholder}
                className="h-11 flex-1 rounded-full border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25"
              />
              <button
                type="submit"
                aria-label={chat.sendLabel}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-champagne-600"
              >
                <Send className="h-4 w-4 rtl:-scale-x-100" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
