import { PageHero } from "@/components/layout/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Ledger } from "@/components/whiskey/Ledger";
import { img } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { getWhiskeyList, shelves } from "@/lib/whiskey";

export const metadata = pageMetadata({
  title: "The Back Bar: Whiskey & Bourbon List",
  description:
    "Search The Last Refuge’s full whiskey list: bourbon, rye, American, international and Heaven’s Door, with proof and 1oz and 2oz pour prices. Kept current by the bar team in Louisville’s NuLu.",
  path: "/whiskey",
  image: "/images/heavens-door-shelf.jpg",
});

export default async function WhiskeyPage() {
  const list = await getWhiskeyList();
  const shelfMeta = shelves.map(({ id, label }) => ({ id, label }));
  const hd = list.items.filter((w) => w.shelf === "heavens-door");

  return (
    <>
      <PageHero
        n={4}
        label="The Altar"
        title={
          <>
            The <span className="italic text-amber">back bar</span>
          </>
        }
        lede={
          <>
            {list.items.length} whiskeys, kept by the bar team and updated as bottles come and go. Poured by the ounce or two.
          </>
        }
        photo={img["library-room"]}
        position="50% 50%"
      />

      <section aria-labelledby="hd-title" className="relative overflow-hidden bg-crypt">
        <div className="shell grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
          <div className="relative aspect-[3/2] overflow-hidden lg:col-span-6" data-reveal="mask">
            <Photo photo={img["heavens-door-shelf"]} sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="t-label text-brass">A shelf of its own</p>
            <h2 id="hd-title" className="t-h2 mt-4">Heaven’s Door</h2>
            <p className="mt-6 text-parchment/80">
              Bob Dylan’s whiskey, from the flagship bourbons to the Decade Series and the Bootleg volumes. The house cocktails are
              built on it, and {hd.length} expressions are listed below.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Plain anchor: a full load lets the ledger pick up ?shelf= on this same route. */}
              <a
                href="/whiskey?shelf=heavens-door#ledger"
                className="inline-flex min-h-12 items-center gap-3 border border-brass/70 px-6 t-label transition-colors hover:border-brass hover:bg-brass hover:text-ink"
              >
                See the Heaven’s Door shelf <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="ledger" aria-label="Whiskey list" className="scroll-mt-20 bg-nave">
        <div className="shell pb-[var(--section)] pt-12">
          <Ledger items={list.items} shelves={shelfMeta} />
          <p className="mt-16 max-w-[60ch] t-small text-vellum">
            Availability changes nightly and the list may lag the shelf. Please drink
            responsibly. 21+ only.
          </p>
        </div>
      </section>
    </>
  );
}
