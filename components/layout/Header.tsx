"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Step aside while reading downward; return on any upward scroll.
      setHidden(y > 480 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const els = [toggleRef.current!, ...panel.querySelectorAll<HTMLElement>("a,button")];
        const first = els[0];
        const lastEl = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-parchment focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,transform,border-color] duration-500 ease-exhale ${
          solid ? "border-b border-oak/70 bg-nave/92 backdrop-blur-md" : "border-b border-transparent bg-gradient-to-b from-crypt/70 to-transparent"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label="The Last Refuge, home">
            <span className="mark-logo block h-10 w-[34px] text-parchment transition-colors group-hover:text-amber" aria-hidden />
            <span className="font-display text-[1.15rem] leading-none tracking-[0.02em] whitespace-nowrap">
              The Last Refuge
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative py-2 t-label transition-colors hover:text-amber ${active ? "text-amber" : "text-parchment/85"}`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-amber transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/reservations"
              data-cta="reserve"
              className="hidden min-h-11 items-center border border-parchment bg-parchment px-5 t-label text-ink transition-colors hover:border-amber hover:bg-amber sm:inline-flex"
            >
              Reserve
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative -mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span className={`absolute left-0 top-0 h-px w-6 bg-parchment transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-6 bg-parchment transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation: a full-height order of service */}
      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-nave pt-[var(--header-h)] glass-spill lg:hidden"
        style={{ ["--glass" as string]: "var(--color-ruby)", ["--spill-x" as string]: "80%" }}
      >
        <nav aria-label="Mobile" className="shell flex min-h-full flex-col pb-32 pt-8">
          <ol className="space-y-1">
            {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
              <li key={item.href} className="border-b border-oak/60">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex items-baseline gap-5 py-4 font-display text-[2rem] leading-tight aria-[current=page]:text-amber"
                >
                  <span className="w-8 font-sans text-xs tracking-[0.2em] text-brass tabular" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-10 space-y-2 t-small text-vellum">
            <p>{site.address.street}, {site.address.city}</p>
            <p>
              <a className="underline decoration-brass/50 underline-offset-4" href={site.phone.href}>{site.phone.display}</a>
            </p>
            <p>
              <a className="underline decoration-brass/50 underline-offset-4" href={site.links.giftCards} target="_blank" rel="noopener">
                Gift cards<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </nav>
      </div>

      {/* Mobile: the reservation is always one tap away. */}
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_1fr_1.4fr] border-t border-oak bg-nave/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <Link href="/menus" className="flex min-h-14 items-center justify-center t-label text-parchment/90">
          Menu
        </Link>
        <a href={site.phone.href} className="flex min-h-14 items-center justify-center border-l border-oak t-label text-parchment/90">
          Call
        </a>
        <Link href="/reservations" data-cta="reserve" className="flex min-h-14 items-center justify-center bg-parchment t-label text-ink">
          Reserve
        </Link>
      </nav>
    </>
  );
}
