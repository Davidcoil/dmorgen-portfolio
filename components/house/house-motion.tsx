"use client";

import { useEffect } from "react";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** מוביל את המבקר ברגל עד לדלת. מחזיר false אם אין מסדרון או שביקשו פחות תנועה. */
export function walkTo(slug: string, smooth = true): boolean {
  const hall = document.getElementById("map");
  const stage = document.getElementById("stage");
  const door = document.querySelector<HTMLElement>(`.room[data-slug="${slug}"]`);
  if (!hall || !stage || !door || reduced()) return false;
  const t = Math.min(1, Math.max(0, (Number(door.dataset.z) - 760) / Number(stage.dataset.travel)));
  const top = hall.getBoundingClientRect().top + scrollY + (hall.offsetHeight - stage.offsetHeight) * t;
  scrollTo({ top, behavior: smooth ? "smooth" : "instant" });
  return true;
}

/* ============================================================================
 * כל התנועה של הבית, בלולאה אחת. בלי ספריות. מכבד פחות-תנועה.
 * עכבר: האור עוקב אחרי היד. מגע: האור עומד על הפנים והלולאה רק הולכת במסדרון,
 * כי אצבע שגוללת היא לא יד שמחזיקה פנס (והאור קפץ איתה).
 * ההחלקה לפי זמן ולא לפי פריים, כדי שתרגיש אותו דבר ב-60Hz וב-120Hz.
 * ========================================================================== */
export function HouseMotion() {
  useEffect(() => {
    if (reduced()) return;
    const root = document.documentElement;
    const touch = matchMedia("(hover: none)").matches;
    let tx = innerWidth * 0.3;
    let ty = innerHeight * 0.34;
    let x = tx;
    let y = ty;
    let last = -1e9;
    let cam = 0;
    let lookX = 0;
    let lookY = 0;
    let raf = 0;
    let prev = performance.now();
    let lastTransform = "";
    const written = new WeakMap<HTMLElement, string>();
    const ease = (dt: number, tau: number) => 1 - Math.exp(-dt / tau);

    const onPointer = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      last = performance.now();
    };

    function light(now: number, dt: number) {
      const vw = innerWidth;
      const vh = innerHeight;
      const scene = document.getElementById("scene")?.getBoundingClientRect();
      if (now - last > 3200) {
        if (scene && scene.bottom > vh * 0.35) {
          /* כשאין יד, האור חוזר לפנים */
          tx = scene.left + scene.width * 0.68;
          ty = scene.top + scene.height * 0.34;
        } else {
          const t = now / 1000;
          tx = vw * (0.5 + Math.sin(t * 0.4) * 0.2);
          ty = vh * (0.52 + Math.cos(t * 0.3) * 0.12);
        }
      }
      const k = ease(dt, 200);
      x += (tx - x) * k;
      y += (ty - y) * k;
      root.style.setProperty("--lx", `${x}px`);
      root.style.setProperty("--ly", `${y}px`);
      lookX += ((x / vw - 0.5) * 3 - lookX) * ease(dt, 260);
      lookY += ((0.5 - y / vh) * 1.6 - lookY) * ease(dt, 260);
      if (scene) {
        root.style.setProperty("--px", `${x - scene.left}px`);
        root.style.setProperty("--py", `${y - scene.top}px`);
        if (scene.bottom > 0) {
          document.querySelectorAll<HTMLElement>(".chip").forEach((c) => {
            const b = c.getBoundingClientRect();
            const d = Math.hypot(b.left + b.width / 2 - x, b.top + b.height / 2 - y);
            c.style.setProperty("--glow", Math.max(0, 1 - d / 260).toFixed(2));
          });
        }
      }
    }

    function walk(dt: number) {
      const hall = document.getElementById("map");
      const stage = document.getElementById("stage");
      const world = document.getElementById("world");
      if (!hall || !stage || !world) return;
      const h = hall.getBoundingClientRect();
      if (h.top >= innerHeight || h.bottom <= 0) return;
      const travel = Number(stage.dataset.travel);
      /* גובה הבמה ולא innerHeight: בטלפון סרגל הכתובת משנה את innerHeight תוך כדי גלילה */
      const p = Math.min(1, Math.max(0, -h.top / (h.height - stage.offsetHeight)));
      cam += (p * travel - cam) * ease(dt, touch ? 110 : 160);
      const transform = `rotateY(${(-lookX).toFixed(2)}deg) rotateX(${lookY.toFixed(2)}deg) translateZ(${cam.toFixed(1)}px)`;
      if (transform !== lastTransform) {
        world.style.transform = transform;
        lastTransform = transform;
      }
      stage.classList.toggle("walking", cam > 90);
      world.querySelectorAll<HTMLElement>("[data-z]").forEach((el) => {
        const d = Number(el.dataset.z) - cam;
        /* opacity ולא visibility: דלת שעברנו חייבת להישאר נגישה למקלדת */
        const opacity = d > 3000 ? 0 : d < 240 ? Math.max(0, (d - 70) / 170) : 1;
        const near = el.classList.contains("lit") && d > 120 && d < 1250;
        const key = `${opacity.toFixed(2)}|${near}`;
        if (written.get(el) === key) return;
        written.set(el, key);
        el.style.opacity = opacity.toFixed(2);
        el.style.pointerEvents = d < 70 ? "none" : "";
        if (el.classList.contains("lit")) el.classList.toggle("near", near);
      });
    }

    function frame(now: number) {
      const dt = Math.min(now - prev, 64);
      prev = now;
      if (!touch) light(now, dt);
      walk(dt);
      raf = requestAnimationFrame(frame);
    }

    /* נכנסים דרך דלת: האור מציף, ואז עוברים */
    const onClick = (e: MouseEvent) => {
      const door = (e.target as Element).closest<HTMLAnchorElement>("a.room");
      const flood = document.getElementById("flood");
      if (!door || !flood || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      flood.style.setProperty("--fx", `${e.clientX}px`);
      flood.style.setProperty("--fy", `${e.clientY}px`);
      flood.classList.add("on");
      setTimeout(() => (location.href = door.href), 620);
    };
    /* מקלדת: פוקוס על דלת הולך אליה */
    const onFocus = (e: FocusEvent) => {
      const door = (e.target as Element).closest?.<HTMLElement>("a.room");
      if (door?.dataset.slug) walkTo(door.dataset.slug, false);
    };
    const onShow = () => document.getElementById("flood")?.classList.remove("on");

    if (!touch) addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("pageshow", onShow);
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocus);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onPointer);
      removeEventListener("pageshow", onShow);
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);

  return null;
}
