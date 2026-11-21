"use client";

import { useEffect, useMemo, useState } from "react";
import { allAllergens, type Allergen, type MenuGroup, type MenuItem } from "@/content/menu";

function PriceList({ item }: { item: MenuItem }) {
  if (!item.prices.length) return null;
  if (item.prices.length === 1 && !item.prices[0].label)
    return <span className="font-display text-xl text-brass tabular">{item.prices[0].amount}</span>;
  return (
    <span className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-right">
      {item.prices.map((p) => (
        <span key={p.label} className="whitespace-nowrap">
          <span className="mr-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-vellum">{p.label}</span>
          <span className="font-display text-xl text-brass tabular">{p.amount}</span>
        </span>
      ))}
    </span>
  );
}

function Item({ item }: { item: MenuItem }) {
  return (
    <li className="group border-b border-oak/80 py-6">
      <div className="flex items-baseline gap-4">
        <h4 className="font-display text-[1.6rem] leading-tight transition-colors group-hover:text-amber">{item.name}</h4>
        <span className="leader max-sm:hidden" aria-hidden />
        <div className="ml-auto shrink-0">
          <PriceList item={item} />
        </div>
      </div>
      {item.description && <p className="mt-2 max-w-[60ch] text-[0.975rem] text-parchment/75">{item.description}</p>}
      {(item.allergens?.length || item.glutenFreeAvailable) && (
        <p className="mt-3 flex flex-wrap gap-2">
          {item.allergens?.map((a) => (
            <span key={a} className="border border-oak px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.12em] text-vellum">
              <span className="sr-only">Contains </span>
              {a}
            </span>
          ))}
          {item.glutenFreeAvailable && (
            <span className="border border-verdigris/60 px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.12em] text-[#9cc7ba]">
              Gluten-free available
            </span>
          )}
        </p>
      )}
    </li>
  );
}

export function MenuExplorer({ groups }: { groups: MenuGroup[] }) {
  const [avoid, setAvoid] = useState<Allergen[]>([]);
  const [active, setActive] = useState(groups[0].id);

  // Scroll-spy for the category rail.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    groups.forEach((g) => {
      const el = document.getElementById(g.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [groups]);

  const filtered = useMemo(
    () =>
      groups.map((g) => ({
        ...g,
        sections: g.sections.map((s) => ({
          ...s,
          items: s.items.filter((i) => !i.allergens?.some((a) => avoid.includes(a))),
        })),
      })),
    [groups, avoid],
  );
  const hidden = useMemo(
    () => groups.flatMap((g) => g.sections.flatMap((s) => s.items)).filter((i) => i.allergens?.some((a) => avoid.includes(a))).length,
    [groups, avoid],
  );

  const toggle = (a: Allergen) => setAvoid((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-10">
      {/* Category rail: sticky sidebar on desktop, snap-scrolling strip on mobile */}
      <nav
        aria-label="Menu sections"
        className="sticky top-0 z-20 -mx-[var(--gutter)] border-b border-oak bg-nave/95 backdrop-blur-md lg:top-[calc(var(--header-h)+2rem)] lg:col-span-3 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:backdrop-blur-none"
      >
        <ul className="flex snap-x gap-1 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
          {groups.map((g) => (
            <li key={g.id} className="snap-start">
              <a
                href={`#${g.id}`}
                aria-current={active === g.id ? "true" : undefined}
                className="flex min-h-12 items-center gap-3 whitespace-nowrap px-3 t-label text-parchment/70 transition-colors hover:text-amber aria-[current=true]:text-amber lg:border-l lg:border-oak lg:px-5 lg:aria-[current=true]:border-amber"
              >
                {g.title}
              </a>
            </li>
          ))}
          <li className="snap-start">
            <a href="/whiskey" className="flex min-h-12 items-center whitespace-nowrap px-3 t-label text-brass hover:text-amber lg:mt-4 lg:border-l lg:border-oak lg:px-5">
              Whiskey list →
            </a>
          </li>
        </ul>

        <fieldset className="mt-10 hidden border-t border-oak pt-8 lg:block">
          <legend className="t-label text-brass">Hide dishes containing</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {allAllergens.map((a) => (
              <label key={a} className="cursor-pointer">
                <input type="checkbox" className="peer sr-only" checked={avoid.includes(a)} onChange={() => toggle(a)} />
                <span className="inline-flex min-h-9 items-center border border-oak px-3 text-[0.75rem] uppercase tracking-[0.12em] text-vellum transition-colors peer-checked:border-communion peer-checked:bg-communion peer-checked:text-parchment peer-focus-visible:outline-2 peer-focus-visible:outline-amber">
                  {a}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-4 t-small text-vellum" aria-live="polite">
            {hidden ? `${hidden} dish${hidden === 1 ? "" : "es"} hidden.` : "Showing everything."}
          </p>
          <p className="mt-4 t-small text-vellum">
            Allergen notes are the kitchen’s own. Always tell your server about allergies before ordering.
          </p>
        </fieldset>
      </nav>

      <div className="lg:col-span-9">
        {/* Mobile allergen filter */}
        <details className="mt-8 border border-oak lg:hidden">
          <summary className="flex min-h-12 cursor-pointer items-center justify-between px-4 t-label text-brass">
            Allergen filter {avoid.length ? `(${avoid.length})` : ""}
          </summary>
          <div className="flex flex-wrap gap-2 px-4 pb-4">
            {allAllergens.map((a) => (
              <label key={a} className="cursor-pointer">
                <input type="checkbox" className="peer sr-only" checked={avoid.includes(a)} onChange={() => toggle(a)} />
                <span className="inline-flex min-h-10 items-center border border-oak px-3 text-[0.75rem] uppercase tracking-[0.12em] text-vellum peer-checked:border-communion peer-checked:bg-communion peer-checked:text-parchment peer-focus-visible:outline-2 peer-focus-visible:outline-amber">
                  {a}
                </span>
              </label>
            ))}
            <p className="w-full pt-2 t-small text-vellum">Always tell your server about allergies before ordering.</p>
          </div>
        </details>

        {filtered.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28 pt-16 first:pt-10 lg:first:pt-0">
            <p className="font-serif italic text-brass">{g.kicker}</p>
            <h2 id={`${g.id}-title`} className="t-display mt-2">{g.title}</h2>
            {g.sections.map((s) => (
              <div key={s.id} id={s.id} className="mt-14 scroll-mt-28">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-brass/50 pb-3">
                  <h3 className="t-label text-[0.8rem] text-amber">{s.title}</h3>
                  {s.note && <p className="font-serif text-[0.95rem] italic text-vellum">{s.note}</p>}
                </div>
                {s.items.length ? (
                  <ul>
                    {s.items.map((i) => (
                      <Item key={i.name} item={i} />
                    ))}
                  </ul>
                ) : (
                  <p className="py-6 font-serif italic text-vellum">Every dish here contains something you’ve asked us to hide.</p>
                )}
                {s.extras && (
                  <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                    {s.extras.map((x) => (
                      <div key={x.title}>
                        <dt className="t-label text-brass">{x.title}</dt>
                        <dd className="mt-2 text-[0.95rem] text-parchment/75">{x.items}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
