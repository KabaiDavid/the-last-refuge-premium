"use client";

import { useEffect } from "react";

/**
 * The venue's existing Google Tag Manager container, preserved. It loads
 * the venue's marketing tags, so it is deferred until the visitor first
 * interacts (or the page has been idle a few seconds) to keep it off the
 * critical path.
 */
export function Analytics({ id }: { id: string }) {
  useEffect(() => {
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      cleanup();
      const w = window as unknown as { dataLayer: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
      document.head.appendChild(s);
    };
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    const t = window.setTimeout(() => ("requestIdleCallback" in window ? window.requestIdleCallback(load) : load()), 5000);
    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, load));
      window.clearTimeout(t);
    }
    return cleanup;
  }, [id]);
  return null;
}
