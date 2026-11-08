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
  const top = hall.getBoundingClientRect().top + scrollY + (hall.offsetHeight - innerHeight) * t;
  scrollTo({ top, behavior: smooth ? "smooth" : "instant" });
  return true;
}

/* ============================================================================
 * כל התנועה של הבית, בלולאה אחת: האור שעוקב אחרי היד, הצ'יפים שמגיבים אליו,
 * וההליכה במסדרון. נטען פעם אחת ב-layout. בלי ספריות. מכבד פחות-תנועה.
 * ========================================================================== */
export function HouseMotion() {
  useEffect(() => {
    if (reduced()) return;
    const root = document.documentElement;
    let tx = innerWidth * 0.3;
    let ty = innerHeight * 0.34;
    let x = tx;
    let y = ty;
    let last = -1e9;
    let cam = 0;
    let lookX = 0;
    let lookY = 0;
    let raf = 0;

    const move = (cx: number, cy: number) => {
      tx = cx;
      ty = cy;
      last = performance.now();
    };
    const onPointer = (e: PointerEvent) => move(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => move(e.touches[0].clientX, e.touches[0].clientY);

    function frame(now: number) {
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
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      root.style.setProperty("--lx", `${x}px`);
      root.style.setProperty("--ly", `${y}px`);

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

      const hall = document.getElementById("map");
      const stage = document.getElementById("stage");
      const world = document.getElementById("world");
      if (hall && stage && world) {
        const h = hall.getBoundingClientRect();
        if (h.top < vh && h.bottom > 0) {
          const travel = Number(stage.dataset.travel);
          const p = Math.min(1, Math.max(0, -h.top / (h.height - vh)));
          cam += (p * travel - cam) * 0.1;
          lookX += ((x / vw - 0.5) * 3 - lookX) * 0.06;
          lookY += ((0.5 - y / vh) * 1.6 - lookY) * 0.06;
          world.style.transform = `rotateY(${(-lookX).toFixed(3)}deg) rotateX(${lookY.toFixed(3)}deg) translateZ(${cam.toFixed(1)}px)`;
          stage.classList.toggle("walking", cam > 90);
          world.querySelectorAll<HTMLElement>("[data-z]").forEach((el) => {
            const d = Number(el.dataset.z) - cam;
            /* opacity ולא visibility: דלת שעברנו חייבת להישאר נגישה למקלדת */
            el.style.opacity = String(d > 3000 ? 0 : d < 240 ? Math.max(0, (d - 70) / 170) : 1);
            el.style.pointerEvents = d < 70 ? "none" : "";
            if (el.classList.contains("lit")) el.classList.toggle("near", d > 120 && d < 1250);
          });
        }
      }
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

    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("touchstart", onTouch, { passive: true });
    addEventListener("touchmove", onTouch, { passive: true });
    addEventListener("pageshow", onShow);
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocus);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onPointer);
      removeEventListener("touchstart", onTouch);
      removeEventListener("touchmove", onTouch);
      removeEventListener("pageshow", onShow);
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);

  return null;
}
