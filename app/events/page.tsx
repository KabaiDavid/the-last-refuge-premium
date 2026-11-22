import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { EventList } from "@/components/ui/EventList";
import { JsonLd } from "@/components/ui/JsonLd";
import { img } from "@/content/images";
import { site } from "@/content/site";
import { getUpcomingEvents } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";

/** UTC offset in Louisville on a given date, e.g. "-05:00". */
function louisvilleOffset(date: string) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: "America/Kentucky/Louisville", timeZoneName: "longOffset" })
    .formatToParts(new Date(`${date}T17:00:00Z`))
    .find((p) => p.type === "timeZoneName")?.value;
  return name?.replace("GMT", "") || "-05:00";
}

export const metadata = pageMetadata({
  title: "Live Music & Whiskey Events",
  description:
    "Live music, Vinyl Revival all-vinyl DJ nights and whiskey events at The Last Refuge in Louisville’s NuLu. See what’s on and book a table.",
  path: "/events",
  image: "/images/courtyard-firepit.jpg",
});

export default async function EventsPage() {
  const events = await getUpcomingEvents(12);

  // Event schema only from the venue's live calendar, never invented.
  const ld = events.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.time ? `${e.date}T${e.time}:00${louisvilleOffset(e.date)}` : e.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: site.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
    },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
  }));

  return (
    <>
      <PageHero
        n={6}
        label="Hymns"
        title={
          <>
            Live <span className="italic text-amber">music</span> &amp; whiskey events
          </>
        }
        lede="Live sets, Vinyl Revival all-vinyl DJ nights and special whiskey evenings."
        photo={img["courtyard-dusk"]}
        position="50% 55%"
      >
        <Button href="/reservations" data-cta="reserve">Book a table</Button>
      </PageHero>

      <section aria-labelledby="calendar-title" className="bg-nave">
        <div className="shell section-y grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="calendar-title" className="t-h2">Coming up</h2>
            <p className="mt-4 text-parchment/75">Updated from the venue’s calendar. Book a table for the night you want.</p>
            <div className="mt-10">
              {events.length ? (
                <EventList events={events} />
              ) : (
                <p className="border-y border-oak py-8 font-serif text-xl italic text-parchment/80">
                  The full calendar is below.
                </p>
              )}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="t-label text-brass">Tickets &amp; details</p>
            <p className="mt-3 text-parchment/75">Ticketed events and full listings, from the venue’s calendar.</p>
            <div className="mt-6 overflow-hidden bg-parchment p-2">
              <iframe
                title="Upcoming events at The Last Refuge"
                src={site.links.eventsWidget}
                loading="lazy"
                className="h-[44rem] w-full border-0"
              />
            </div>
            <p className="mt-4 t-small text-vellum">
              Trouble viewing the calendar?{" "}
              <a href={site.links.eventsWidget} target="_blank" rel="noopener" className="underline decoration-brass/60 underline-offset-4 hover:text-amber">
                Open it in a new tab
              </a>
              , or follow{" "}
              <a href={site.links.instagram} target="_blank" rel="noopener" className="underline decoration-brass/60 underline-offset-4 hover:text-amber">
                {site.links.instagramHandle}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
    </>
  );
}
