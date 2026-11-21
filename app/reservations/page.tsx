import { ThirdPartyScript } from "@/components/embeds/ThirdPartyScript";
import { HymnBoardHours } from "@/components/layout/HymnBoardHours";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { img } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Reservations",
  description:
    "Reserve a table at The Last Refuge, a bourbon bar and restaurant in a historic NuLu church at 600 E. Market St., Louisville. Book on OpenTable; patio seating on request.",
  path: "/reservations",
  image: "/images/bar-front.jpg",
});

const otWidget = `https://www.opentable.com/widget/reservation/loader?rid=${site.links.openTableRid}&type=standard&theme=wide&color=1&dark=true&iframe=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website`;

export default function ReservationsPage() {
  return (
    <>
      <PageHero
        n={1}
        label="Reservations"
        title={
          <>
            Save a seat <span className="italic text-amber">in the pews</span>
          </>
        }
        lede="Tables are booked through OpenTable, here or in the app."
        photo={img["bar-front"]}
        position="50% 55%"
      />

      <section className="bg-nave" aria-labelledby="book-title">
        <div className="shell section-y grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="book-title" className="t-h2">Book a table</h2>
            <p className="mt-4 max-w-[52ch] text-parchment/80">
              Want the patio? Make a note of it when you complete your reservation and the team will do their best to seat you
              outside.
            </p>
            <div className="mt-10 border border-oak bg-pew/60 p-4 sm:p-8">
              <ThirdPartyScript
                src={otWidget}
                title="OpenTable reservation widget"
                minHeight={360}
                fallback={
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="t-small text-vellum">Prefer the OpenTable site or app?</p>
                    <Button href={site.links.reserve} external arrow data-cta="reserve-opentable">
                      Book on OpenTable
                    </Button>
                  </div>
                }
              />
            </div>
          </div>

          <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
            <HymnBoardHours />
            <div className="border-t border-oak pt-8">
              <p className="t-label text-brass">Larger party?</p>
              <p className="mt-3 text-parchment/80">
                For groups and celebrations, the events team will plan the evening with you.
              </p>
              <div className="mt-5">
                <Button href="/private-events#enquire" variant="outline" arrow>
                  Private events
                </Button>
              </div>
            </div>
            <div className="border-t border-oak pt-8">
              <p className="t-label text-brass">Questions</p>
              <p className="mt-3 space-y-1">
                <a href={site.phone.href} className="block font-display text-2xl hover:text-amber">{site.phone.display}</a>
                <a href={`mailto:${site.email}`} className="block text-parchment/80 hover:text-amber">{site.email}</a>
              </p>
              <p className="mt-6 t-small text-vellum">{site.ageNotice}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
