import { Button } from "@/components/ui/Button";
import { ServiceMark } from "@/components/ui/Liturgy";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/content/images";
import { food, signatureCocktails, type MenuItem } from "@/content/menu";

const byName = (names: string[]) =>
  names.map((n) => food.sections.flatMap((s) => s.items).find((i) => i.name === n)).filter(Boolean) as MenuItem[];

/** 05 · Communion. The menu's own wit, given the room it deserves. */
export function Communion() {
  const readings = ["The Old American Way", "So Long, Honey Babe", "Stained Glass"].map(
    (n) => signatureCocktails.find((c) => c.name === n)!,
  );
  const sermon = byName(["Meat Jesus", "Judas Loved Chocolate", "The Devil’s Eggs", "Sin + Grits", "Friar’s Bacon", "Holy Grail Hummus"]);

  return (
    <section aria-labelledby="communion-title" className="relative bg-nave">
      <div className="shell section-y">
        <ServiceMark n={5} label="Communion" />
        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <h2 id="communion-title" className="t-display lg:col-span-7" data-reveal>
            Break bread. <span className="italic text-amber">Raise a glass.</span> Confess nothing.
          </h2>
          <p className="t-lede text-parchment/80 lg:col-span-4 lg:col-start-9 lg:pt-3" data-reveal data-reveal-delay="0.1">
            Tavern-style pizza, Southern plates to share and cocktails built on Heaven’s Door. The names are irreverent. The
            cooking isn’t.
          </p>
        </div>

        {/* The food, as a typeset litany */}
        <ul className="mt-20 border-t border-oak lg:mt-28">
          {sermon.map((item, i) => (
            <li key={item.name} className="group border-b border-oak" data-reveal data-reveal-delay={String(i * 0.04)}>
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:py-7">
                <p className="font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-none transition-colors duration-300 group-hover:text-amber">
                  {item.name}
                </p>
                <p className="col-span-2 row-start-2 t-small text-vellum md:col-span-1 md:row-start-1 md:col-start-2">{item.description}</p>
                <p className="font-display text-xl text-brass tabular md:col-start-3">{item.prices[0].amount}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/menus" variant="outline" arrow>
            The full menu
          </Button>
        </div>

        {/* The readings: three signature cocktails beside the glass in the window. */}
        <div className="mt-28 grid gap-12 lg:mt-40 lg:grid-cols-12 lg:gap-10">
          <div className="relative aspect-[4/5] overflow-hidden lg:col-span-5" data-reveal="mask">
            <div className="absolute inset-[-6%_0]" data-parallax="0.08">
              <Photo photo={img["stained-glass-cocktail"]} sizes="(min-width:1024px) 40vw, 100vw" position="50% 45%" />
            </div>
          </div>
          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <p className="t-label text-brass">The readings · Signature cocktails</p>
            <ol className="mt-8 space-y-10">
              {readings.map((c, i) => (
                <li key={c.name} className="grid grid-cols-[auto_1fr] gap-x-6" data-reveal data-reveal-delay={String(i * 0.08)}>
                  <span className="pt-2 font-display text-sm text-brass tabular" aria-hidden>
                    {["I", "II", "III"][i]}
                  </span>
                  <div>
                    <p className="flex items-baseline gap-3">
                      <span className="t-h3">{c.name}</span>
                      <span className="leader" aria-hidden />
                      <span className="font-display text-xl text-brass tabular">{c.prices[0].amount}</span>
                    </p>
                    <p className="mt-2 font-serif italic text-parchment/75">{c.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-12">
              <Button href="/menus#signature-cocktails" variant="ghost" arrow>
                All cocktails &amp; zero proof
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
