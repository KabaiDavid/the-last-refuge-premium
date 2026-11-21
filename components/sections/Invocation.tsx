import { ServiceMark } from "@/components/ui/Liturgy";

/** 02 · Invocation. The paper of the order of service: parchment, the Dylan reading, the true story. */
export function Invocation() {
  return (
    <section id="invocation" aria-labelledby="invocation-title" className="on-parchment relative overflow-hidden bg-parchment text-ink">
      <span aria-hidden className="mark-crest pointer-events-none absolute -right-24 top-16 h-[34rem] w-[26rem] text-sepia/[0.07] max-lg:hidden" />
      <div className="shell section-y grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <ServiceMark n={2} label="Invocation" tone="light" />
        </div>

        <figure className="lg:col-span-7" data-reveal>
          <blockquote>
            <p id="invocation-title" className="t-display text-ink">
              <span className="block">It may be the devil</span>
              <span className="block">or it may be the Lord</span>
              <span className="mt-3 block font-serif text-[0.55em] italic leading-snug text-sepia">
                But you’re gonna have to serve somebody
              </span>
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4 t-label text-sepia">
            <span aria-hidden className="h-px w-10 bg-sepia/60" />
            Bob Dylan, “Gotta Serve Somebody,” 1979
          </figcaption>
        </figure>

        <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-ink/85 lg:col-span-4 lg:col-start-9 lg:pt-4" data-reveal data-reveal-delay="0.15">
          <p>
            <span className="font-display text-[1.6em] leading-none text-communion">In 1880</span> a congregation built a church on the corner of East Market and Hancock, and held its services in German,
            until the First World War put an end to that.
          </p>
          <p>
            Other congregations followed. One of them painted the words <em className="font-serif">refuge in Kentucky</em> across
            the floor of the gymnasium out back, and that is where this place found its name.
          </p>
          <p>
            The windows are still here, and so are the gym’s 25-foot ceilings. The hymnals are now whiskey lists, and Bob Dylan’s
            Heaven’s Door has a shelf of its own. The congregation is anyone of age looking for somewhere to land.
          </p>
          <p className="font-serif text-xl italic text-ink">The house calls it a High Church of Bourbon.</p>
        </div>
      </div>
    </section>
  );
}
