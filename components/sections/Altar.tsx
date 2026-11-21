import Link from "next/link";
import { ServiceMark } from "@/components/ui/Liturgy";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/content/images";
import { shelves, type WhiskeyList } from "@/lib/whiskey";

/** 04 · The Altar. The back bar, counted live from the sheet the bartenders keep. */
export function Altar({ list }: { list: WhiskeyList }) {
  const counts = Object.fromEntries(shelves.map((s) => [s.id, list.items.filter((w) => w.shelf === s.id).length]));
  const total = list.items.length;

  return (
    <section aria-labelledby="altar-title" className="relative overflow-hidden bg-crypt glass-spill" style={{ ["--glass" as string]: "var(--color-amber)", ["--spill-x" as string]: "75%" }}>
      <div className="grid lg:min-h-[100svh] lg:grid-cols-2">
        <div className="relative min-h-[70svh] overflow-hidden lg:order-2 lg:min-h-0">
          <div className="absolute inset-[-8%_0]" data-parallax="0.12">
            <Photo photo={img["heavens-door-shelf"]} sizes="(min-width:1024px) 50vw, 100vw" position="50% 50%" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-crypt via-transparent to-transparent lg:bg-gradient-to-r" />
          <p className="absolute bottom-6 right-6 t-label text-parchment/70 max-lg:hidden">Heaven’s Door, on its own shelf</p>
        </div>

        <div className="shell relative flex flex-col justify-center py-20 lg:max-w-none lg:py-32 lg:pl-[max(var(--gutter),calc((100vw-var(--max))/2+var(--gutter)))] lg:pr-16">
          <ServiceMark n={4} label="The Altar" />
          <h2 id="altar-title" className="sr-only">The Back Bar</h2>
          <p className="mt-10 font-display leading-[0.85] text-amber tabular" data-reveal>
            <span className="block text-[clamp(5.5rem,3rem+12vw,13rem)]">{total}</span>
          </p>
          <p className="t-h2 mt-4 max-w-[16ch]" data-reveal data-reveal-delay="0.1">
            whiskeys on the list tonight<span className="text-amber">.</span>
          </p>
          <p className="mt-6 max-w-[42ch] text-parchment/75" data-reveal data-reveal-delay="0.15">
            Bourbon, rye, American and world whiskies, poured by the ounce or two. The list is kept by the bar team and updates
            here as bottles come and go.
          </p>

          <form action="/whiskey" method="get" role="search" className="mt-10 max-w-xl" data-reveal data-reveal-delay="0.2">
            <label htmlFor="altar-q" className="t-label text-brass">
              Search the back bar
            </label>
            <div className="mt-3 flex border-b border-parchment/40 focus-within:border-amber">
              <input
                id="altar-q"
                name="q"
                type="search"
                autoComplete="off"
                placeholder="Try “barrel proof”, “rye”, “Weller”…"
                className="min-h-14 w-full bg-transparent font-serif text-xl italic text-parchment placeholder:text-parchment/40 focus:outline-none"
              />
              <button type="submit" className="px-2 t-label text-amber hover:text-parchment">
                Search
              </button>
            </div>
          </form>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3" aria-label="Shelves">
            {shelves.map((s) => (
              <li key={s.id}>
                <Link href={`/whiskey?shelf=${s.id}`} className="group inline-flex items-baseline gap-2 py-1">
                  <span className="border-b border-transparent transition-colors group-hover:border-amber group-hover:text-amber">{s.label}</span>
                  <span className="t-small text-vellum tabular">{counts[s.id]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
