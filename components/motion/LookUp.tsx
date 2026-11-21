"use client";

import { useEffect, useRef } from "react";

/**
 * "Look up." A pinned scroll scene: the camera tilts from the Chapel Room
 * floor up into its painted sky. The markup (children) is complete without
 * JS; this only adds the camera move on large screens with motion allowed.
 */
export function LookUp({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (pointer: fine)");
    if (!mq.matches) return;
    let revert = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const room = el.querySelector<HTMLElement>("[data-room]");
        const sky = el.querySelector<HTMLElement>("[data-sky]");
        const words = el.querySelectorAll<HTMLElement>("[data-word]");
        const caption = el.querySelector<HTMLElement>("[data-caption]");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "+=180%", scrub: 0.6, pin: true, anticipatePin: 1 },
        });
        // 1. The room, framed from the floor; the camera tilts upward.
        tl.fromTo(room, { objectPosition: "50% 100%", scale: 1.3, transformOrigin: "50% 100%" }, { objectPosition: "50% 0%", scale: 1.0, duration: 1 })
          .fromTo(words, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.35 }, 0.15)
          // 2. Into the painted sky.
          .fromTo(sky, { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1.02, duration: 0.8 }, 0.75)
          .to(words, { opacity: 0, yPercent: -60, stagger: 0.05, duration: 0.3 }, 1.2)
          .fromTo(caption, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35 }, 1.3)
          .to(sky, { scale: 1.12, duration: 0.6 }, 1.3);
      }, el);
      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <div ref={root} className="relative">
      {children}
    </div>
  );
}
