import { Button } from "@/components/ui/Button";
import { EventList } from "@/components/ui/EventList";
import { ServiceMark } from "@/components/ui/Liturgy";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/content/images";
import type { LiveEvent } from "@/lib/events";

/** 06 · Hymns. Live music and vinyl nights, pulled from the venue's own calendar. */
export function Hymns({ events }: { events: LiveEvent[] }) {
  return (
    <section aria-labelledby="hymns-title" className="relative isolate overflow-hidden bg-crypt">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-[-8%_0]" data-parallax="0.1">
          <Photo photo={img["courtyard-firepit"]} sizes="100vw" position="50% 60%" alt="" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-crypt via-crypt/90 to-crypt/40" />
      </div>
      <div className="shell section-y grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ServiceMark n={6} label="Hymns" />
          <h2 id="hymns-title" className="t-display mt-8" data-reveal>
            Late <span className="italic text-amber">hymns</span>
          </h2>
          <p className="t-lede mt-8 max-w-[34ch] text-parchment/80" data-reveal data-reveal-delay="0.1">
            Live sets in the evening, and Vinyl Revival nights when the DJ plays nothing but records.
          </p>
          <div className="mt-10 flex flex-wrap gap-4" data-reveal data-reveal-delay="0.2">
            <Button href="/events" variant="outline" arrow>
              Full calendar
            </Button>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:self-end" data-reveal>
          {events.length > 0 ? (
            <>
              <p className="mb-5 t-label text-brass">Coming up</p>
              <EventList events={events.slice(0, 4)} />
            </>
          ) : (
            <p className="border-y border-oak py-8 font-serif text-xl italic text-parchment/80">
              The calendar is being written. See what’s on at{" "}
              <a className="underline decoration-brass underline-offset-4 hover:text-amber" href="/events">
                Live Music
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
