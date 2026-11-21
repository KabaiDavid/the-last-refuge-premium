"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One motion system for the whole site, driven by data attributes on
 * server-rendered markup:
 *   data-reveal            fade + rise   (data-reveal="mask" | "fade")
 *   data-reveal-delay="n"  stagger in seconds
 *   data-parallax="0.08"   slow vertical drift of a photo inside its frame
 *   data-hymn              hymn-board digits slide into their slots
 *
 * GSAP + Lenis load after first paint. Content is only hidden once the
 * libraries are ready and the visitor hasn't asked for reduced motion.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let cancelled = false;
    let cleanup = () => {};
    const html = document.documentElement;

    // Phones & tablets: a few-hundred-byte path. IntersectionObserver + CSS
    // transitions, no scroll-linked work, no layout reads on the main thread.
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      const vh = window.innerHeight;
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            el.style.transitionDelay = `${Math.min(Number(el.dataset.revealDelay ?? 0), 0.3)}s`;
            el.classList.add("is-in");
            io.unobserve(el);
          }),
        { rootMargin: "0px 0px -8% 0px" },
      );
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < vh) el.classList.add("is-in");
        else io.observe(el);
      });
      html.classList.add("motion-ok", "motion-lite");
      return () => {
        io.disconnect();
        html.classList.remove("motion-ok", "motion-lite");
        els.forEach((el) => el.classList.remove("is-in"));
      };
    }

    (async () => {
      // Desktop: wait for the browser to be idle before bringing in GSAP.
      await new Promise<void>((r) => ("requestIdleCallback" in window ? window.requestIdleCallback(() => r(), { timeout: 1500 }) : setTimeout(r, 200)));
      if (cancelled) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      let lenis: { raf: (t: number) => void; destroy: () => void; on: (e: string, f: () => void) => void } | undefined;
      let tick: ((t: number) => void) | undefined;
      const finePointer = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
      if (finePointer) {
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;
        lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 }) as unknown as typeof lenis;
        lenis!.on("scroll", ScrollTrigger.update);
        tick = (t: number) => lenis!.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      const ctx = gsap.context(() => {
        const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        // Anything already on screen at load is shown immediately so the
        // first view never waits on JavaScript.
        const vh = window.innerHeight;
        const below = els.filter((el) => el.getBoundingClientRect().top > vh * 0.92);
        html.classList.add("motion-ok");
        els.filter((el) => !below.includes(el)).forEach((el) => gsap.set(el, { clearProps: "all", opacity: 1, clipPath: "none", y: 0 }));

        below.forEach((el) => {
          const kind = el.dataset.reveal;
          const delay = Number(el.dataset.revealDelay ?? 0);
          const vars: gsap.TweenVars =
            kind === "mask"
              ? { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.out" }
              : { opacity: 1, y: 0, duration: 1.1, ease: "expo.out" };
          gsap.to(el, { ...vars, delay, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || 0.08) * 100;
          gsap.fromTo(
            el,
            { yPercent: -amount / 2 },
            {
              yPercent: amount / 2,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-hymn]").forEach((board) => {
          const digits = board.querySelectorAll("[data-hymn-digit]");
          gsap.from(digits, {
            yPercent: 110,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: board, start: "top 90%", once: true },
          });
        });
      });

      // Images that load late change layout; keep trigger positions honest.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t = window.setTimeout(refresh, 1200);

      cleanup = () => {
        window.clearTimeout(t);
        window.removeEventListener("load", refresh);
        ctx.revert();
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
        html.classList.remove("motion-ok");
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]);

  return null;
}
