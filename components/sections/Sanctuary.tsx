import Image from "next/image";
import { LookUp } from "@/components/motion/LookUp";
import { Button } from "@/components/ui/Button";
import { ServiceMark } from "@/components/ui/Liturgy";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/content/images";

/** 03 · The Sanctuary. Brick, glass, the gym, and the one big moment: Look up. */
export function Sanctuary() {
  return (
    <section aria-labelledby="sanctuary-title" className="relative bg-nave">
      <div className="shell section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pt-24">
            <ServiceMark n={3} label="The Sanctuary" />
            <h2 id="sanctuary-title" className="t-display mt-8" data-reveal>
              Brick, glass <span className="italic text-amber">&amp;</span> a painted sky
            </h2>
            <p className="t-lede mt-8 max-w-[36ch] text-parchment/80" data-reveal data-reveal-delay="0.1">
              Red brick and lancet windows outside. Inside, a church, a gymnasium and a courtyard between them, each one
              turned to a new kind of worship.
            </p>
            <div className="mt-10" data-reveal data-reveal-delay="0.2">
              <Button href="/sanctuary" variant="outline" arrow>
                Walk the building
              </Button>
            </div>
          </div>

          {/* Editorial stack: one wide, one tall lancet, offset like a page spread. */}
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden" data-reveal="mask">
              <div className="absolute inset-[-6%_0]" data-parallax="0.1">
                <Photo photo={img["exterior-day"]} sizes="(min-width:1024px) 55vw, 100vw" position="50% 40%" />
              </div>
            </div>
            <div className="relative -mt-24 ml-auto w-[48%] max-w-[22rem] sm:-mt-40 lg:mr-6">
              <div className="lancet relative aspect-[3/4.4] overflow-hidden border-0" data-reveal="mask" data-reveal-delay="0.15">
                <Photo photo={img["windows-closeup"]} sizes="(min-width:1024px) 22rem, 48vw" position="50% 25%" />
              </div>
              <p className="mt-4 t-small text-vellum">The church’s lancet windows, East Market Street.</p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-12 lg:mt-36">
          <div className="relative aspect-[16/10] overflow-hidden md:col-span-8" data-reveal="mask">
            <div className="absolute inset-[-6%_0]" data-parallax="0.08">
              <Photo photo={img["gym-hall"]} sizes="(min-width:768px) 66vw, 100vw" />
            </div>
          </div>
          <div className="flex flex-col justify-end md:col-span-4" data-reveal>
            <p className="t-label text-brass">The Gym</p>
            <p className="mt-4 font-serif text-xl leading-relaxed text-parchment/90">
              Where the church once played basketball, there are now chandeliers, a steel mezzanine and a wall of bourbon two
              storeys high.
            </p>
          </div>
        </div>
      </div>

      <LookUp>
        <div className="relative h-[100svh] min-h-[36rem] overflow-hidden bg-crypt" aria-labelledby="lookup-title">
          <Image
            data-room
            src={img["chapel-room"].src}
            alt={img["chapel-room"].alt}
            fill
            sizes="100vw"
            quality={70}
            className="object-cover"
            style={{ objectPosition: "50% 30%" }}
          />
          <Image
            data-sky
            src={img["chapel-ceiling"].src}
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover opacity-0"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-crypt/50 via-transparent to-crypt/70" />
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            <h3 id="lookup-title" className="t-hero drop-shadow-[0_4px_40px_rgba(13,11,10,.65)]">
              <span className="inline-block overflow-hidden pb-[0.1em]">
                <span data-word className="inline-block">Look</span>
              </span>{" "}
              <span className="inline-block overflow-hidden pb-[0.1em]">
                <span data-word className="inline-block italic">up.</span>
              </span>
            </h3>
          </div>
          <div data-caption className="absolute inset-x-0 bottom-0 pb-24 sm:pb-12">
            <div className="shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-[30ch] font-serif text-xl italic leading-snug text-parchment">
                The Chapel Room, under a ceiling painted as an open sky.
              </p>
              <Button href="/private-events#chapel-room" variant="primary" arrow>
                Gather here
              </Button>
            </div>
          </div>
        </div>
      </LookUp>
    </section>
  );
}
