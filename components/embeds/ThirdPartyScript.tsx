"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Injects a vendor's embed script *inside* a container, which is where
 * OpenTable's and Tripleseat's loaders render their widget (they look up
 * document.currentScript). Loads only when the container nears the viewport.
 * The fallback (direct link / phone) stays visible until the widget appears
 * and remains in the DOM for no-JS visitors.
 */
export function ThirdPartyScript({
  src,
  title,
  fallback,
  className = "",
  minHeight = 420,
}: {
  src: string;
  title: string;
  fallback: ReactNode;
  className?: string;
  minHeight?: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "failed">("idle");

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let timeout: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        setState("loading");
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onerror = () => setState("failed");
        el.appendChild(s);
        // Ready once the vendor has put anything visible next to its script.
        const mo = new MutationObserver(() => {
          if (el.querySelector("iframe, form, table")) {
            setState("ready");
            mo.disconnect();
          }
        });
        mo.observe(el, { childList: true, subtree: true });
        timeout = window.setTimeout(() => setState((st) => (st === "ready" ? st : "failed")), 12000);
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timeout) window.clearTimeout(timeout);
    };
  }, [src]);

  return (
    <div className={className}>
      <div
        ref={host}
        aria-label={title}
        role="region"
        aria-busy={state === "loading"}
        className="embed-frame relative"
        style={{ minHeight: state === "ready" ? undefined : state === "failed" ? 0 : minHeight }}
      >
        {state === "loading" && (
          <p className="absolute inset-0 flex items-center justify-center t-label text-vellum" aria-hidden>
            Loading…
          </p>
        )}
      </div>
      <div className={state === "ready" ? "mt-6" : "mt-0"}>{fallback}</div>
    </div>
  );
}
