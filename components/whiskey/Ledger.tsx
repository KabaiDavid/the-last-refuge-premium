"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { ShelfId, Whiskey } from "@/lib/whiskey";

type Shelf = { id: ShelfId; label: string };
type Sort = "name" | "proof-desc" | "price-asc" | "price-desc";

const usd = (n?: number) => (n === undefined ? "—" : n % 1 ? n.toFixed(2) : String(n));
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "'");

/** The back bar as a ledger: search, shelves, sort. Server-rendered in full, so every bottle is indexable. */
export function Ledger({ items, shelves }: { items: Whiskey[]; shelves: Shelf[] }) {
  const [q, setQ] = useState("");
  const [shelf, setShelf] = useState<ShelfId | "all">("all");
  const [ready, setReady] = useState(false);

  // Read ?q= and ?shelf= after hydration so the full list stays in the static HTML.
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const s = sp.get("shelf");
    if (sp.get("q")) setQ(sp.get("q")!);
    if (s && shelves.some((x) => x.id === s)) setShelf(s as ShelfId);
    setReady(true);
  }, [shelves]);
  const [sort, setSort] = useState<Sort>("name");
  const [strong, setStrong] = useState(false);
  const dq = useDeferredValue(q);

  // Keep the URL shareable without adding history entries.
  useEffect(() => {
    if (!ready) return;
    const u = new URL(window.location.href);
    q ? u.searchParams.set("q", q) : u.searchParams.delete("q");
    shelf !== "all" ? u.searchParams.set("shelf", shelf) : u.searchParams.delete("shelf");
    window.history.replaceState(null, "", u);
  }, [q, shelf, ready]);

  const results = useMemo(() => {
    const terms = norm(dq).split(/\s+/).filter(Boolean);
    const wantsBarrelProof = terms.join(" ").includes("barrel proof");
    let list = items.filter((w) => {
      if (shelf !== "all" && w.shelf !== shelf) return false;
      if (strong && !(w.proofValue && w.proofValue >= 110)) return false;
      if (!terms.length) return true;
      const hay = norm(`${w.name} ${w.origin ?? ""} ${w.shelf}`);
      if (wantsBarrelProof && (hay.includes("barrel proof") || hay.includes("cask strength"))) return true;
      return terms.every((t) => hay.includes(t));
    });
    const price = (w: Whiskey) => w.twoOz ?? w.oneOz ?? w.bottle;
    list = [...list].sort((a, b) => {
      if (sort === "proof-desc") return (b.proofValue ?? 0) - (a.proofValue ?? 0);
      if (sort === "price-asc") return (price(a) ?? 1e9) - (price(b) ?? 1e9);
      if (sort === "price-desc") return (price(b) ?? -1) - (price(a) ?? -1);
      return a.name.localeCompare(b.name, "en", { numeric: true });
    });
    return list;
  }, [items, dq, shelf, sort, strong]);

  const grouped = useMemo(
    () => shelves.map((s) => ({ ...s, rows: results.filter((w) => w.shelf === s.id) })).filter((s) => s.rows.length),
    [results, shelves],
  );

  return (
    <div>
      <div className="z-20 -mx-[var(--gutter)] border-b border-oak bg-nave/95 px-[var(--gutter)] pb-4 pt-4 backdrop-blur-md lg:sticky lg:top-0">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <div role="search" className="lg:col-span-5">
            <label htmlFor="ledger-q" className="t-label text-brass">
              Search {items.length} whiskeys
            </label>
            <div className="mt-2 flex border-b border-parchment/40 focus-within:border-amber">
              <input
                id="ledger-q"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoComplete="off"
                placeholder="Distillery, age, “barrel proof”, country…"
                className="min-h-12 w-full bg-transparent font-serif text-lg italic text-parchment placeholder:text-parchment/40 focus:outline-none"
              />
              {q && (
                <button type="button" onClick={() => setQ("")} className="px-2 t-label text-vellum hover:text-amber">
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-3 lg:col-span-7 lg:justify-end">
            <label className="flex flex-col gap-1">
              <span className="t-label text-[0.65rem] text-vellum">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="min-h-11 border border-oak bg-pew px-3 text-sm text-parchment"
              >
                <option value="name">A–Z</option>
                <option value="proof-desc">Highest proof</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-oak px-3 text-sm">
              <input type="checkbox" checked={strong} onChange={(e) => setStrong(e.target.checked)} className="accent-amber" />
              110 proof &amp; up
            </label>
          </div>
        </div>
        <div className="mt-4 flex gap-1 overflow-x-auto [scrollbar-width:none]" role="group" aria-label="Shelves">
          {[{ id: "all" as const, label: "All shelves" }, ...shelves].map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={shelf === s.id}
              onClick={() => setShelf(s.id)}
              className="min-h-10 shrink-0 border border-oak px-4 t-label text-[0.7rem] text-parchment/75 transition-colors hover:text-amber aria-pressed:border-amber aria-pressed:bg-amber aria-pressed:text-ink"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 t-small text-vellum" aria-live="polite">
        {results.length === items.length ? `Showing the full list.` : `${results.length} of ${items.length} whiskeys.`} Prices per
        pour, in US dollars.
      </p>

      {grouped.length === 0 && (
        <p className="py-16 font-serif text-2xl italic text-parchment/80">
          Nothing on the shelf by that name. Ask your bartender. The list changes often.
        </p>
      )}

      {grouped.map((g) => {
        const layout = g.id === "heavens-door" ? "bottle" : g.id === "international" ? "intl" : "pour";
        return (
          <section key={g.id} aria-labelledby={`shelf-${g.id}`} className="mt-14">
            <h2 id={`shelf-${g.id}`} className="flex items-baseline justify-between border-b border-brass/50 pb-3">
              <span className="t-h3">{g.label}</span>
              <span className="t-small text-vellum tabular">{g.rows.length}</span>
            </h2>
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{g.label} whiskeys</caption>
              <thead>
                <tr className="t-label text-[0.65rem] text-vellum">
                  <th scope="col" className="py-3 pr-4 font-semibold">Whiskey</th>
                  {layout === "intl" && <th scope="col" className="hidden py-3 pr-4 font-semibold md:table-cell">Origin</th>}
                  <th scope="col" className="py-3 pr-4 text-right font-semibold">Proof</th>
                  {layout === "bottle" ? (
                    <th scope="col" className="py-3 text-right font-semibold">Price</th>
                  ) : (
                    <>
                      <th scope="col" className="py-3 pr-4 text-right font-semibold">1oz</th>
                      <th scope="col" className="py-3 text-right font-semibold">2oz</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="[content-visibility:auto]">
                {g.rows.map((w) => (
                  <tr key={w.id} className="border-t border-oak/70 transition-colors hover:bg-pew/70">
                    <th scope="row" className="py-3 pr-4 font-serif text-[1.02rem] font-normal leading-snug">
                      {w.name}
                      {layout === "intl" && w.origin && <span className="block t-small text-vellum md:hidden">{w.origin}</span>}
                    </th>
                    {layout === "intl" && <td className="hidden py-3 pr-4 t-small text-vellum md:table-cell">{w.origin}</td>}
                    <td className="py-3 pr-4 text-right t-small text-parchment/80 tabular whitespace-nowrap">{w.proof ?? "—"}</td>
                    {layout === "bottle" ? (
                      <td className="py-3 text-right font-display text-lg text-brass tabular">{w.bottle ? usd(w.bottle) : <span className="font-sans text-xs text-vellum">Ask</span>}</td>
                    ) : (
                      <>
                        <td className="py-3 pr-4 text-right font-display text-lg text-brass tabular">{usd(w.oneOz)}</td>
                        <td className="py-3 text-right font-display text-lg text-brass tabular">{usd(w.twoOz)}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
}
